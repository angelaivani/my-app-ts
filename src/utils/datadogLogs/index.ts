import SourceMap from 'source-map-js'
import { datadogLogs } from '@datadog/browser-logs'
import { datadogRum } from '@datadog/browser-rum'
import ErrorStackParser from 'error-stack-parser'

export const initDatadogLogs = () => {
  datadogLogs.init({    
    clientToken: 'pub39b777e4b13fc853f8df073ae3a9de03',
    env: 'development',
    service: 'my-ts-app',
    site: 'us5.datadoghq.com',
    forwardErrorsToLogs: false,
    sampleRate: 100,
  })  
}

export const initDatadogRum = () => {
  datadogRum.init({
    applicationId: 'f751ab6b-15c7-49fe-bb07-e24f95b86614',
    clientToken: 'pub2adfd6205348b86b3750b371febecb9d',
    site: 'us5.datadoghq.com',
    service:'my-ts-app',
    env:'my-ts-app-dev',    
    version: '1.0.0',
    sampleRate: 100,
    premiumSampleRate: 100,
    trackInteractions: true,
    defaultPrivacyLevel:'mask-user-input',
    sessionReplaySampleRate: 0,
    allowedTracingOrigins: ["https://angelaivani.github.io/my-app-ts/", (origin) => { console.log('ORIGIN', origin); return origin === "https://angelaivani.github.io/my-app-ts" || origin === "https://angelaivani.github.io" || origin === "http://localhost:3000"}]
});
}

type MapSourceMapFileType = {
  [k: string]: SourceMap.RawSourceMap
}

const initialSourceMapObj = {
  version: '3',
  sources: [],
  names: [],
  sourcesContent: [],
  mappings: '',
}

const getMapFileName = (fileName: string) => `${fileName}.map`

const getOriginalStackFrames = (stackFrames: StackFrame[]): Promise<string> =>
  new Promise(async (resolve, reject) => {
    const mapSourceMapFile: MapSourceMapFileType = {}

    // filter to distinct mapFileName
    stackFrames.forEach((stackFrame) => {
      const { fileName } = stackFrame
      const mapFileName = getMapFileName(String(fileName))

      if (fileName) {
        if (fileName in mapSourceMapFile) {
          return
        }

        // set to default shape
        mapSourceMapFile[mapFileName] = initialSourceMapObj
      }
    })

    console.log('mapSourceMapFile', mapSourceMapFile);

    // get related sourceMapFile
    const sourceMapObjPromises = Object.keys(mapSourceMapFile).map(async (mapFileName) => {
      const sourceMapObj = await fetch(mapFileName, {
        mode: 'no-cors',
      })
        .then((res) => res.json())
        .then((response) => response)
        .catch(() => reject(new Error(`Failed to fetch ${mapFileName}`)))

      return {
        mapFileName,
        sourceMap: sourceMapObj,
      }
    })

    const sourceMapObjs = await Promise.all(sourceMapObjPromises)

    sourceMapObjs.forEach((item) => {
      mapSourceMapFile[item.mapFileName] = item.sourceMap
    })

    const transformedStacks = stackFrames.map((stackFrame: StackFrame, idx: number) => {
      const { fileName } = stackFrame

      const mapFileName = getMapFileName(String(fileName))

      const sourceMapFileObj = mapSourceMapFile[mapFileName]

      const consumer = new SourceMap.SourceMapConsumer(sourceMapFileObj)

      const stackFrameOriginal = consumer.originalPositionFor({
        line: stackFrame.lineNumber as number,
        column: stackFrame.columnNumber as number,
      })

      const path = stackFrameOriginal.source?.includes('..')
        ? stackFrameOriginal.source.replace('..', '/static')
        : `${stackFrameOriginal.source}`

      return `${idx > 0 ? '\n' : ''}at ${stackFrameOriginal.name} ${path}:${
        stackFrameOriginal.line
      }:${stackFrameOriginal.column + 1}`
    })

    resolve(transformedStacks.join(''))
  })

export const parsedStackFrame = async (error: Error): Promise<string> => {
  const stackFrames = ErrorStackParser.parse(error)
  console.log('STACK FRAMES', stackFrames)

  try {
    return await getOriginalStackFrames(stackFrames)
  } catch ({ message }) {
    return message as string
  } 
}
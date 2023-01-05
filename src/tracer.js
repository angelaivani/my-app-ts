const bunyan = require('bunyan')
const tracer = require('dd-trace') 

const logger = bunyan.createLogger({
  name: 'dd-trace',
  level: 'trace'
})

tracer.init({
  service: 'my-ts-app',
  logger: {
    error: err => logger.error(err),
    warn: message => logger.warn(message),
    info: message => logger.info(message),
    debug: message => logger.trace(message),
  },
  profiling: true,
  env:'my-ts-app-dev',  
  version: '1.0.0'
})
export default tracer
import { useState } from 'react'
import { datadogLogs } from '@datadog/browser-logs'
import { Button } from '@mui/material'
import ErrorBoundary from '../../ErrorBoundary'
import * as logger from '../../telemetry-log' 


const BuggyPage = () => {
  logger.info("Example log line with trace correlation info")
  const [counter, setCounter] = useState(0)

  const handleAddCounter = () => {
    datadogLogs.logger.info('click counter in my-ts-app repo', { counter: counter+1})
    logger.info("Example log line with trace correlation info")
    setCounter(prev => prev + 1)
  }

  if(counter === 5) {    
    throw new Error('error')
  }

  return (
    <ErrorBoundary>
      <Button onClick={handleAddCounter}>Add counter</Button>
      <p>Current counter {counter}</p>
      <p>when counter reach 5, error will be thrown</p>
    </ErrorBoundary>    
  )
}
export default BuggyPage
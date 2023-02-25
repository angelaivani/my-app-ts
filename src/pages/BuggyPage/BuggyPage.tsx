import { useState } from 'react'
import { datadogLogs } from '@datadog/browser-logs'
import { Button } from '@mui/material'

const BuggyPage = () => {  
  const [counter, setCounter] = useState(0)

  const handleAddCounter = () => {
    datadogLogs.logger.info('click counter in my-ts-app repo', { counter: counter+1})    
    setCounter(prev => prev + 1)
  }

  if(counter === 5) {    
    throw new Error('error')
  }

  return (
    <>
    <Button onClick={handleAddCounter}>Add counter</Button>
      <p>Current counter {counter}</p>
      <p>when counter reach 5, error will be thrown</p>   
    </>
      
  )
}
export default BuggyPage
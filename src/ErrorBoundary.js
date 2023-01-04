import React from 'react'
import { datadogLogs } from '@datadog/browser-logs'

const ErrorComponent = () => <h1>ada error nie</h1>

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: { message: '', stack: '' },
    info: { componentStack: '' },
  }

  static getDerivedStateFromError = (error) => {    
    return { hasError: true }
  }

  componentDidCatch(error, info) {    
    datadogLogs.logger.error('ERROR BOUNDARY in my-ts-app repo', { error: error.toString(), info })
    this.setState({ error, info })
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props
    if(hasError) {
      console.log('MASUK PAGE ERROR')
      return <ErrorComponent />
    }
    return children    
  }
}
export default ErrorBoundary

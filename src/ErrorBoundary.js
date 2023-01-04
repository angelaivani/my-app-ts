import React from 'react'
import { datadogRum } from '@datadog/browser-rum'
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
    datadogRum.addError(error, { error, errorInfo: info, errorSource: 'ERROR BOUNDARY' });
    datadogLogs.logger.error('ERROR BOUNDARY in my-ts-app repo', { error: error, info })    
    this.setState({ error, info })
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props
    if(hasError) {      
      return <ErrorComponent />
    }
    return children    
  }
}
export default ErrorBoundary

import React from 'react'
import { datadogLogs } from '@datadog/browser-logs'

const ErrorComponent = () => <h1>ada error nie</h1>

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: { message: '', stack: '' },
    errorInfo: { componentStack: '' },
  }

  static getDerivedStateFromError = (error) => {    
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {    
    datadogLogs.logger.error('ERROR BOUNDARY in my-ts-app repo', {      
      errorInformation: errorInfo.componentStack,
      errorSource: 'ERROR BOUNDARY',
    })

    this.setState({ error, errorInfo })
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

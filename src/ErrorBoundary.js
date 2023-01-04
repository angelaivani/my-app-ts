import React from 'react'
// import { datadogLogs } from '@datadog/browser-logs'

const ErrorComponent = () => <h1>ada error nie</h1>

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: { message: '', stack: '' },
    info: { componentStack: '' },
  }

  static getDerivedStateFromError = (error) => {
    console.log('HEH ERROR', error)
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.log('ERR', error);
    console.log('INFO', info)
    // datadogLogs.logger.error('ERROR BOUNDARY', { error: error.toString(), info })
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

import React, { Component } from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import './ErrorBoundary.css'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <FaExclamationTriangle className="error-icon" />
            <h2>Something went wrong</h2>
            <p>We're having trouble loading this page. Please try refreshing.</p>
            <button 
              onClick={this.handleReload}
              className="error-retry"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

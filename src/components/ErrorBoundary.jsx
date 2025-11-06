import { Component } from 'react';

// Simple error boundary to isolate errors from third-party components (e.g., Spline)
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Optionally log the error to a monitoring service
    // console.error('ErrorBoundary caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-white/90" aria-hidden="true" />
      );
    }
    return this.props.children;
  }
}

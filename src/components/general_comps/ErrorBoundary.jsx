import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can log the error or send it to an error reporting service here
    console.error(error);
    console.error(info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <p>Something went wrong 😔</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

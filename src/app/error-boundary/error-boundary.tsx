import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return {
      hasError: true
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log('error:', error);
    console.log('errorInfo:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p>Что-то пошло не так!</p>;
    }
    return this.props.children;
  }
}

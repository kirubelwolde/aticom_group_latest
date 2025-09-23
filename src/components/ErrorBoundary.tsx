import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback || this.defaultFallback();
    }

    return this.props.children;
  }

  private defaultFallback() {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl">
          <Alert variant="destructive" className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <h3 className="font-medium">Something went wrong</h3>
            </div>
            <AlertDescription>
              <p>
                {this.state.error?.message || 'An unexpected error occurred.'}
              </p>
              {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                <details className="mt-2 text-sm">
                  <summary className="cursor-pointer font-medium mb-2">
                    View error details
                  </summary>
                  <pre className="bg-muted/50 p-2 rounded-md overflow-auto text-xs">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => window.location.reload()}
              >
                Reload Page
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;

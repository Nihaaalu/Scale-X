import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ScaleX Uncaught Error Caught by Boundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] w-full flex flex-col items-center justify-center p-8 text-center bg-[#0e1015] border border-[#232730] rounded-2xl m-4">
          <div className="w-12 h-12 rounded-full bg-red-950/40 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">
            {this.props.fallbackTitle || 'ScaleX Collector Portal Encountered an Issue'}
          </h3>
          <p className="text-sm text-zinc-400 max-w-md mb-6 leading-relaxed">
            The diecast showroom encountered a display sync exception. You can refresh to re-initialize the 3D gallery.
          </p>
          <button
            onClick={this.handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#e11d48] hover:bg-[#be123c] text-white font-mono-spec text-xs tracking-wider uppercase rounded-lg transition-colors"
          >
            <RotateCw className="w-4 h-4" />
            Reload Showroom
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

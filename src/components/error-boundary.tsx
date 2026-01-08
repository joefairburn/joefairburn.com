"use client";

import React, { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  silent?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component to catch JavaScript errors in child components,
 * log those errors, and either display a fallback UI or nothing.
 * Set silent=true to show nothing on error (default is false).
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error, hasError: true };
  }

  // eslint-disable-next-line class-methods-use-this -- React lifecycle method pattern
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // If fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // If silent mode is enabled, render nothing
      if (this.props.silent) {
        return null;
      }

      // Default minimal error UI
      return (
        <div className="p-4">
          <p className="text-sm text-neutral-500">Component failed to load</p>
        </div>
      );
    }

    return this.props.children;
  }
}

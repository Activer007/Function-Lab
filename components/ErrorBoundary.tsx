import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * 错误边界组件
 * 用于捕获演示组件中的错误，防止整个应用崩溃
 */
export class DemoErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // 可以将错误日志上报给服务器
    console.error('Demo component error caught by boundary:', error);
    console.error('Error Info:', errorInfo);
    console.error('Component Stack:', errorInfo.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // 自定义降级 UI
      return this.props.fallback || (
        <div className="flex items-center justify-center h-full bg-red-50 dark:bg-red-900/20 p-8">
          <div className="text-center max-w-md">
            <div className="mb-4">
              <svg
                className="mx-auto h-16 w-16 text-red-600 dark:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
              演示组件加载失败
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              抱歉，演示组件遇到了一些问题。请尝试切换到其他函数演示。
            </p>
            {this.state.error && (
              <details className="text-left text-xs text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 p-3 rounded cursor-pointer">
                <summary className="font-semibold mb-2 hover:text-gray-700 dark:hover:text-gray-300">
                  查看错误详情
                </summary>
                <pre className="overflow-auto max-h-32 mt-2">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

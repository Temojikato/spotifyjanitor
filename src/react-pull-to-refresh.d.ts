declare module 'react-pull-to-refresh' {
  import * as React from 'react';

  export interface ReactPullToRefreshProps {
    onRefresh: () => Promise<any>;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
  }

  const PullToRefresh: React.ComponentType<ReactPullToRefreshProps>;
  export default PullToRefresh;
}

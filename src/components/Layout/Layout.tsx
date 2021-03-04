import React, { ComponentType, FC, useMemo } from 'react';
import { DefaultLayoutWrapper } from './DefaultLayoutWrapper';

interface Props {
  type?: 'default';
}

export const Layout: FC<Props> = props => {
  const { type = 'default', children } = props;
  const LayoutWrapper = useMemo<ComponentType>(() => {
    switch (type) {
      case 'default':
      default:
        return DefaultLayoutWrapper;
    }
  }, [type]);

  return <LayoutWrapper>{children}</LayoutWrapper>;
};

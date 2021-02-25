import React, { ComponentType, FC, useCallback, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { DefaultLayoutWrapper } from './DefaultLayoutWrapper';

interface Props {
  isFullscreen?: boolean;
  type?: 'default';
}

export const Layout: FC<Props> = props => {
  const { isFullscreen, type = 'default', children } = props;
  const LayoutWrapper = useMemo<ComponentType>(() => {
    switch (type) {
      case 'default':
      default:
        return DefaultLayoutWrapper;
    }
  }, [type]);

  const handleFullscreenClick = useCallback(() => {
    if (isFullscreen) {
      document.documentElement.requestFullscreen();
    }
  }, []);

  return (
    <>
      <FullscreenClickListener isFullscreen={isFullscreen} onClick={handleFullscreenClick} />
      <LayoutWrapper>
        <main>{children}</main>
      </LayoutWrapper>
    </>
  );
};

const FullscreenClickListener = styled.div<{ isFullscreen?: boolean }>`
  ${props =>
    props.isFullscreen &&
    css`
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    `}
`;

import React, { FC } from 'react';
import styled from 'styled-components';

export const DefaultLayoutWrapper: FC = props => {
  const { children } = props;

  return <Root>{children}</Root>;
};

const Root = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
`;

import React, { FC, useMemo } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const Note: FC<Props> = props => {
  const { children, position } = props;

  const { top, right, bottom, left } = useMemo(() => {
    switch (position) {
      case 'top-left':
        return { top: '0', right: 'auto', bottom: 'auto', left: '0' };
      case 'bottom-left':
        return { top: 'auto', right: 'auto', bottom: '0', left: '0' };
      case 'top-right':
        return { top: '0', right: '0', bottom: 'auto', left: 'auto' };
      case 'bottom-right':
        return { top: 'auto', right: '0', bottom: '0', left: 'auto' };
    }
  }, [position]);

  return (
    <Container top={top} right={right} bottom={bottom} left={left}>
      {children}
    </Container>
  );
};

const Container = styled.div<{ top: string; right: string; bottom: string; left: string }>`
  position: absolute;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1vh;
  color: #373737;
  font-family: sans-serif;
  max-width: 40vh;
  font-size: 1.75vh;

  ${props => css`
    top: ${props.top};
    right: ${props.right};
    bottom: ${props.bottom};
    left: ${props.left};
  `}

  h1 {
    margin: 0;
    font-size: 3vh;
    font-weight: 400;
  }

  h2 {
    margin: 0;
    font-size: 2.5vh;
    font-weight: 400;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 2.5vh;
  }

  li {
    margin: 0;
    padding: 1.5vh 0;
    display: flex;
    align-items: center;
    width: 35vh;

    img {
      height: 4vh;
      margin-right: 2vh;
    }
  }

  a {
    color: #373737;

    &::hover,
    &::visited {
      color: #373737;
    }

    svg {
      width: 6vh;
      height: 6vh;
      stroke: #373737;
      stroke-width: 0.1vh;
    }
  }
`;

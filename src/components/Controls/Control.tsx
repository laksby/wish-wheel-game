import React, { FC, useCallback } from 'react';
import useKeyPressEvent from 'react-use/lib/useKeyPressEvent';
import styled, { css } from 'styled-components';
import useSound from 'use-sound';
import { ControlData } from './types';

interface Props {
  control: ControlData;
  onClick(type: string, payload: any): void;
}

export const Control: FC<Props> = props => {
  const { control, onClick } = props;

  const [playClick] = useSound('/sound/click.mp3', {
    volume: 0.4,
  });

  const handleClick = useCallback(() => {
    playClick();
    onClick(control.type, control.payload);
  }, [control, onClick, playClick]);

  useKeyPressEvent(control.key, () => {
    playClick();
    onClick(control.type, control.payload);
  });

  return (
    <Button isHighlighted={control.isHighlighted} color={control.color} onClick={handleClick}>
      {control.text}
    </Button>
  );
};

const Button = styled.div<{ isHighlighted?: boolean; color?: string }>`
  box-sizing: border-box;
  width: 8vh;
  height: 8vh;
  font-family: sans-serif;
  font-size: 4.5vh;
  border-radius: 50%;
  border: 0.5vh solid transparent;
  color: #373737;
  background-color: transparent;
  margin: 0.5vh;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  img,
  svg {
    width: 7vh;
    height: 7vh;
    pointer-events: none;
  }

  svg {
    stroke: #373737;
    stroke-width: 0.2vh;

    ${props =>
      props.color &&
      css`
        stroke-width: 0.1vh;
        fill: ${props.color};
      `}
  }

  &:hover {
    background-color: #f4f6f8;
    border-color: #ffd67b;
  }

  ${props =>
    props.isHighlighted &&
    css`
      background-color: #ffd67b;
      border-color: #ffd67b;

      &:hover {
        background-color: #ffd67b;
        border-color: #ffd67b;
      }
    `}
`;

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
    <Button
      isWide={control.isWide}
      isHighlighted={control.isHighlighted}
      color={control.color}
      onClick={handleClick}>
      {control.text}
    </Button>
  );
};

const Button = styled.div<{ isWide?: boolean; isHighlighted?: boolean; color?: string }>`
  box-sizing: border-box;
  width: ${props => (props.isWide ? '18vh' : '8vh')};
  height: 8vh;
  font-family: sans-serif;
  font-size: 4.5vh;
  border-radius: 1vh;
  border: 0.25vh solid #373737;
  color: #373737;
  background-color: #f4f6f8;
  margin: 1vh;
  cursor: pointer;
  transition: background-color 300ms;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  svg {
    width: 5vh;
    height: 5vh;
    stroke: #373737;
    stroke-width: 0.2vh;
    pointer-events: none;

    ${props =>
      props.color &&
      css`
        stroke-width: 0.1vh;
        fill: ${props.color};
      `}

    ${props =>
      props.isWide &&
      css`
        & + * {
          margin-left: 4vh;
        }
      `}
  }

  &:hover {
    background-color: #f5b945;
  }

  ${props =>
    props.isHighlighted &&
    css`
      background-color: #f5b945;
    `}
`;

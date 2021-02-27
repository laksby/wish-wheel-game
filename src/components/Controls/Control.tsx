import React, { FC, useCallback } from 'react';
import useKeyPressEvent from 'react-use/lib/useKeyPressEvent';
import styled, { css } from 'styled-components';
import { ControlData } from './types';

interface Props {
  control: ControlData;
  onClick(type: string, payload: any): void;
}

export const Control: FC<Props> = props => {
  const { control, onClick } = props;

  const handleClick = useCallback(() => {
    onClick(control.type, control.payload);
  }, [control, onClick]);

  useKeyPressEvent(control.key, () => {
    onClick(control.type, control.payload);
  });

  return (
    <Button isHighlighted={control.isHighlighted} onClick={handleClick}>
      {control.text}
    </Button>
  );
};

const Button = styled.div<{ isHighlighted?: boolean }>`
  box-sizing: border-box;
  width: 8vh;
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
    fill: #b3a4ee;
    stroke: #373737;
    stroke-width: 0.1vh;
    pointer-events: none;
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

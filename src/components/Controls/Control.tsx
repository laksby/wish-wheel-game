import React, { FC, useCallback } from 'react';
import useKeyPressEvent from 'react-use/lib/useKeyPressEvent';
import styled from 'styled-components';
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

  return <Button onClick={handleClick}>{control.text}</Button>;
};

const Button = styled.div`
  box-sizing: border-box;
  width: 8vh;
  height: 8vh;
  font-family: sans-serif;
  font-size: 4.5vh;
  border-radius: 50%;
  border: 4px solid transparent;
  color: #373737;
  background-color: transparent;
  margin: 0.5vh;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  transition: box-shadow 300ms;

  img,
  svg {
    width: calc(8vh - 8px);
    height: calc(8vh - 8px);
    pointer-events: none;
  }

  svg {
    stroke: #373737;
    stroke-width: 0.1vh;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px,
      rgb(0 0 0 / 12%) 0px 1px 8px 0px;
  }
`;

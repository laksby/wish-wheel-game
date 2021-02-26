import React, { FC, MouseEvent, useCallback } from 'react';
import styled from 'styled-components';
import { ControlData } from './types';

interface Props {
  controls: ControlData[];
  onClick(type: string, payload: any): void;
}

export const Controls: FC<Props> = props => {
  const { controls, onClick } = props;

  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLElement;
    const type = target.dataset.type as string;
    const payload = target.dataset.payload;
    onClick(type, payload);
  }, []);

  return (
    <Container>
      {controls.map((control, index) => (
        <Button
          key={index}
          onClick={handleClick}
          data-type={control.type}
          data-payload={control.payload}>
          {control.text}
        </Button>
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 10vh;
  overflow: hidden;
  z-index: 110;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const Button = styled.button`
  width: 8vh;
  height: 8vh;
  font-size: 4vh;
`;

import React, { FC } from 'react';
import styled from 'styled-components';
import { Control } from './Control';
import { ControlData } from './types';

interface Props {
  controls: ControlData[];
  onClick(type: string, payload: any): void;
}

export const Controls: FC<Props> = props => {
  const { controls, onClick } = props;

  return (
    <Container>
      {controls.map((control, index) => (
        <Control key={index} onClick={onClick} control={control} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 20vh;
  bottom: 20vh;
  left: 0;
  width: 20vh;
  z-index: 20;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  align-content: center;
`;

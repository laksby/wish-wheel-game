import React, { FC } from 'react';
import styled from 'styled-components';
import { SectorData } from '../../common';

interface Props {
  selectedSector?: SectorData;
}

export const Overlay: FC<Props> = props => {
  const { selectedSector } = props;

  if (!selectedSector) {
    return null;
  }

  return (
    <OverlayContainer>
      <OverlayBackground color={selectedSector.color} />
      <OverlayContentWrapper>
        <OverlayContent color={selectedSector.color}>{selectedSector.type}</OverlayContent>
      </OverlayContentWrapper>
    </OverlayContainer>
  );
};

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
`;

const OverlayBackground = styled.div<{ color: string }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: ${props => props.color};
  opacity: 0.3;
`;

const OverlayContentWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OverlayContent = styled.div<{ color: string }>`
  background-color: ${props => props.color};
  border-radius: 50%;
  width: 75vh;
  height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.5vh solid #373737;
  font-family: sans-serif;
  font-size: 4.5vh;
  box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px,
    rgb(0 0 0 / 12%) 0px 1px 8px 0px;
`;

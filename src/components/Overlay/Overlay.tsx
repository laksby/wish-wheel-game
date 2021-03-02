import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import useSound from 'use-sound';
import { RandomRoller, SectorData } from '../../common';

interface Props {
  selectedSector?: SectorData;
  roller: RandomRoller<string>;
  onClose(): void;
}

export const Overlay: FC<Props> = props => {
  const { selectedSector, roller, onClose } = props;
  const [messageToShow, setMessageToShow] = useState<string>();

  const [playHide] = useSound('/sound/hide.mp3', {
    volume: 0.4,
  });

  useEffect(() => {
    if (selectedSector) {
      const message = roller.draw(selectedSector.type) || 'Упс :(';

      switch (selectedSector.contentType) {
        case 'image':
          setMessageToShow('Image');
          break;

        default:
          setMessageToShow(message);
          break;
      }
    } else {
      if (messageToShow) {
        playHide();
      }
    }
  }, [selectedSector, playHide]);

  if (!selectedSector) {
    return null;
  }

  return (
    <OverlayContainer>
      <OverlayBackground color={selectedSector.color} />
      <OverlayContentWrapper>
        <OverlayContent color={selectedSector.color}>
          <SectorImage src={selectedSector.image} alt="Sector image" aria-hidden />
          <MessageText>{messageToShow}</MessageText>
          <CloseButton onClick={onClose} color={selectedSector.color}>
            Продолжить
          </CloseButton>
        </OverlayContent>
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
  box-sizing: border-box;
  padding: 4vh;
  background-color: ${props => props.color};
  border-radius: 50%;
  width: 75vh;
  height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 0.5vh solid #373737;
  font-family: sans-serif;
  font-size: 4.5vh;
  box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px,
    rgb(0 0 0 / 12%) 0px 1px 8px 0px;
`;

const SectorImage = styled.img`
  width: 16vh;
  height: 16vh;
`;

const MessageText = styled.div`
  color: #373737;
  text-align: center;
`;

const CloseButton = styled.div<{ color: string }>`
  padding: 1vh 2vh;
  background-color: #f4f6f8aa;
  border: 0.25vh solid #373737;
  font-family: sans-serif;
  color: #373737;
  font-size: 2vh;
  border-radius: 1vh;
  text-transform: uppercase;
  margin: 1vh;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  transition: background-color 300ms;
  margin-top: 10vh;

  &:hover {
    background-color: #f4f6f8;
  }
`;

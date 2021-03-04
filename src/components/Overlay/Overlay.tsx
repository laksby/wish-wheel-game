import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import useSound from 'use-sound';
import { RandomRoller, SectorData } from '../../common';

interface Props {
  slideIndex?: number;
  selectedSector?: SectorData;
  roller: RandomRoller<string>;
}

export const Overlay: FC<Props> = props => {
  const { slideIndex = 0, selectedSector, roller } = props;
  const [messageToShow, setMessageToShow] = useState<string | [string, string]>('');

  const [playHide] = useSound('/sound/hide.mp3', {
    volume: 0.4,
  });

  useEffect(() => {
    if (selectedSector) {
      const message = roller.draw(selectedSector.type) || 'Упс :(';

      switch (selectedSector.contentType) {
        case 'image':
          setMessageToShow(message.split(':') as [string, string]);
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
        <OverlayContent color={selectedSector.color} isPicture={typeof messageToShow === 'object'}>
          {typeof messageToShow === 'string' && (
            <SectorImage src={selectedSector.image} alt="Sector image" aria-hidden />
          )}
          {typeof messageToShow === 'string' ? (
            <MessageText>{messageToShow}</MessageText>
          ) : (
            <MessageImageWrapper>
              <img src={`/img/${messageToShow[slideIndex]}`} alt="" aria-hidden />
            </MessageImageWrapper>
          )}
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

const OverlayContent = styled.div<{ color: string; isPicture: boolean }>`
  box-sizing: border-box;
  padding: ${props => (props.isPicture ? '0' : '4vh')};
  background-color: ${props => props.color};
  border-radius: ${props => (props.isPicture ? '4vh' : '50%')};
  width: ${props => (props.isPicture ? 'auto' : '75vh')};
  height: ${props => (props.isPicture ? '90vh' : '75vh')};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0.5vh solid #373737;
  font-family: sans-serif;
  font-size: 4.5vh;
  box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px,
    rgb(0 0 0 / 12%) 0px 1px 8px 0px;
`;

const SectorImage = styled.img`
  width: 8vh;
  height: 8vh;
`;

const MessageText = styled.div`
  flex: 1 1 auto;
  color: #373737;
  text-align: center;
  display: flex;
  align-items: center;
  align-content: center;
  padding-bottom: 8vh;
`;

const MessageImageWrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #ffffff;

  img {
    height: 100%;
    object-position: center;
    object-fit: contain;
  }
`;

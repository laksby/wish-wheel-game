import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useSound from 'use-sound';
import { ModeData, SectorData } from '../../common';
import { getSectorCenter, getSectorPath } from './tools';

interface Props {
  isFaded: boolean;
  isFinal: boolean;
  stopSector: string;
  mode: ModeData;
  spinSound: string;
  onRunningToggle(): void;
  onFinal(): void;
  onSelect(sector: SectorData): void;
}

export const Wheel: FC<Props> = props => {
  const {
    isFaded,
    isFinal,
    stopSector,
    mode,
    spinSound,
    onRunningToggle,
    onFinal,
    onSelect,
  } = props;
  const sectorCount = mode.sectors.length;

  const [playSpin, { stop: stopSpin }] = useSound(spinSound, { volume: 0.4 });
  const [playDeath] = useSound('/sound/death.mp3', { volume: 0.4 });
  const [rotation, setRotation] = useState(0);
  const circleRef = useRef<SVGGElement>(undefined!);
  const prevSectorRef = useRef<string>();

  const animationSpeed = 300;
  const sectorStep = 360 / sectorCount;
  const sectorsStartPosition = -sectorStep / 2;
  const side = 300;
  const padding = 6;
  const center = side / 2;
  const strokeWidth = 1;
  const outerRadius = side / 2 - strokeWidth - padding;
  const outerRingWidth = 3;
  const innerRadius = outerRadius - outerRingWidth;
  const shadeCircleRadius = innerRadius * 0.95;
  const centerRadius = 30;
  const centerImageSize = centerRadius * 2 + strokeWidth;
  const imageSize = Math.min(((side / 8) * 7) / sectorCount, side / 8);
  const selectorHeight = 20;
  const selectorWidth = 16;
  const selectorInnerDepth = side - padding - selectorWidth + strokeWidth * 4;
  const selectorOuterDepth = selectorInnerDepth + selectorWidth;

  useEffect(() => {
    if (!circleRef.current) {
      return;
    }

    if (stopSector) {
      prevSectorRef.current = stopSector;
      playSpin();
      circleRef.current.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }], {
        duration: animationSpeed,
        iterations: Infinity,
      });
    } else {
      stopSpin();
      const [animation] = circleRef.current.getAnimations();
      if (animation) {
        if (isFinal) {
          playDeath();

          setTimeout(() => {
            animation.cancel();
            onFinal();
          }, 3000);
        } else {
          const requiredSectorIndex = mode.sectors.findIndex(s => s.type === prevSectorRef.current);

          if (requiredSectorIndex >= 0) {
            const requiresSectorRotation = requiredSectorIndex * sectorStep;

            onSelect(mode.sectors[requiredSectorIndex]);
            setRotation(requiresSectorRotation);
            animation.cancel();
          }
        }
      }
    }
  }, [stopSector, onSelect]);

  return (
    <Container scale={1} isFaded={isFaded}>
      <svg viewBox={`0 0 ${side} ${side}`} xmlns="http://www.w3.org/2000/svg">
        <Circle ref={circleRef} rotation={rotation}>
          <circle
            cx={center}
            cy={center}
            r={outerRadius}
            fill={mode.frameColor}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={center}
            cy={center}
            r={innerRadius}
            fill="#F4F6F8"
            strokeWidth={strokeWidth}
          />
          {mode.sectors.map((sector, index) => {
            const sectorCenter = getSectorCenter(
              center,
              center,
              outerRadius * 2 - imageSize * 3,
              sectorsStartPosition + sectorStep / 2 + index * sectorStep,
            );
            return (
              <g key={index}>
                <path
                  d={getSectorPath(
                    center,
                    center,
                    innerRadius,
                    sectorsStartPosition + index * sectorStep,
                    sectorsStartPosition + (index + 1) * sectorStep,
                  )}
                  fill={sector.color}
                  strokeWidth={strokeWidth}
                />
                <SectorImage
                  href={sector.image}
                  cx={sectorCenter[0]}
                  cy={sectorCenter[1]}
                  x={sectorCenter[0] - imageSize / 2}
                  y={sectorCenter[1] - imageSize / 2}
                  width={imageSize}
                  height={imageSize}
                  rotation={rotation}
                />
              </g>
            );
          })}
          <circle
            cx={center}
            cy={center}
            r={shadeCircleRadius}
            strokeWidth={0}
            fill="#f4f6f8"
            opacity={0.25}
          />
          <circle
            cx={center}
            cy={center}
            r={centerRadius}
            fill="#373737"
            strokeWidth={strokeWidth}
          />
          <image
            href={mode.centerButtonImage}
            x={center - centerImageSize / 2 + strokeWidth}
            y={center - centerImageSize / 2 + strokeWidth}
            width={centerImageSize - strokeWidth * 2}
            height={centerImageSize - strokeWidth * 2}
          />
          <Button
            cx={center}
            cy={center}
            r={centerRadius + strokeWidth / 2}
            strokeWidth={0}
            onClick={onRunningToggle}
          />
        </Circle>
        <polygon
          points={`${selectorInnerDepth},${center} ${selectorOuterDepth},${
            center - selectorHeight / 2
          } ${selectorOuterDepth},${center + selectorHeight / 2}`}
          fill="#FDCD56"
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      </svg>
    </Container>
  );
};

const Container = styled.figure<{ scale: number; isFaded: boolean }>`
  stroke: #373737;

  svg {
    width: calc(100vh * ${props => props.scale});
    opacity: ${props => (props.isFaded ? 0.5 : 1)};
  }
`;

const Circle = styled.g<{ rotation: number }>`
  backface-visibility: hidden;
  will-change: transform, rotate;
  transform-style: preserve-3d;
  transform-origin: center;
  transform: rotate(${props => props.rotation}deg);
`;

const SectorImage = styled.image<{ cx: number; cy: number; rotation: number }>`
  transform-origin: ${props => props.cx}px ${props => props.cy}px;
  transform: rotate(${props => -props.rotation}deg);
`;

const Button = styled.circle`
  cursor: pointer;
  transition: fill 300ms, opacity 300ms;
  opacity: 0;
  fill: #f4f6f8;

  &:hover {
    opacity: 0.1;
    fill: #373737;
  }
`;

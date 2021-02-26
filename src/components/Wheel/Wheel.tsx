import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import useKey from 'react-use/lib/useKey';
import styled, { keyframes } from 'styled-components';
import wheelButton from '../../images/wheel-button.svg';
import { getSectorCenter, getSectorPath } from './tools';
import { SectorData } from './types';

interface Props {
  sectorCount: number;
  sectors: SectorData[];
}

export const Wheel: FC<Props> = props => {
  const { sectorCount, sectors } = props;

  const [running, setRunning] = useState(false);
  const circleRef = useRef<SVGGElement>(undefined!);
  const visibleSectors = useMemo(() => sectors.slice(0, sectorCount), [sectorCount]);

  const sectorStep = 360 / sectorCount;
  const sectorPosition = -sectorStep / 2;
  const side = 300;
  const padding = 6;
  const center = side / 2;
  const strokeWidth = 1;
  const outerRadius = side / 2 - strokeWidth - padding;
  const outerRingWidth = 3;
  const innerRadius = outerRadius - outerRingWidth;
  const centerRadius = 30;
  const centerImageSize = centerRadius * 2 + strokeWidth;
  const imageSize = Math.min(((side / 8) * 6) / sectorCount, side / 8);
  const imageCircleRadius = imageSize * 1.1;
  const selectorHeight = 20;
  const selectorWidth = 20;
  const selectorInnerDepth = side - padding - selectorWidth + strokeWidth * 2;
  const selectorOuterDepth = selectorInnerDepth + selectorWidth;

  useKey(
    event => event.code === 'Space',
    () => runWheel(),
  );

  const runWheel = useCallback(() => {
    if (!circleRef.current) {
      return;
    }

    const [animation] = circleRef.current.getAnimations();

    if (!running) {
      animation.play();
    } else {
      animation.pause();
    }

    setRunning(r => !r);
  }, [running]);

  return (
    <Container scale={1}>
      <svg viewBox={`0 0 ${side} ${side}`} xmlns="http://www.w3.org/2000/svg">
        <Circle ref={circleRef} animationSpeed={300}>
          <circle
            cx={center}
            cy={center}
            r={outerRadius}
            fill="#B3A4EE"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={center}
            cy={center}
            r={innerRadius}
            fill="#F4F6F8"
            strokeWidth={strokeWidth}
          />
          {visibleSectors.map((sector, index) => {
            const sectorCenter = getSectorCenter(
              center,
              center,
              innerRadius + centerRadius,
              sectorPosition + sectorStep / 2 + index * sectorStep,
            );
            return (
              <g key={index}>
                <path
                  d={getSectorPath(
                    center,
                    center,
                    innerRadius,
                    sectorPosition + index * sectorStep,
                    sectorPosition + (index + 1) * sectorStep,
                  )}
                  fill={sector.color}
                  strokeWidth={strokeWidth}
                />
                <circle
                  cx={sectorCenter[0]}
                  cy={sectorCenter[1]}
                  r={imageCircleRadius}
                  strokeWidth={strokeWidth}
                  fill="#f4f6f8"
                  opacity={0.4}
                />
                <image
                  href={sector.image}
                  x={sectorCenter[0] - imageSize / 2}
                  y={sectorCenter[1] - imageSize / 2}
                  width={imageSize}
                  height={imageSize}
                />
              </g>
            );
          })}
          <circle
            cx={center}
            cy={center}
            r={centerRadius}
            fill="#373737"
            strokeWidth={strokeWidth}
          />
          <image
            href={wheelButton}
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
            onClick={runWheel}
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

const rotationAnimation = keyframes`
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.figure<{ scale: number }>`
  stroke: #373737;

  svg {
    width: calc(100vh * ${props => props.scale});
  }
`;

const Circle = styled.g<{ animationSpeed: number }>`
  backface-visibility: hidden;
  will-change: transform, rotate;
  transform-style: preserve-3d;
  transform-origin: center;
  animation: ${rotationAnimation} ${props => props.animationSpeed}ms linear infinite;
  animation-play-state: paused;
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

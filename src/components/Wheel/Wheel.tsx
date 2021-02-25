import React, { FC } from 'react';
import styled from 'styled-components';
import { getSectorPath } from './tools';
import { SectorData } from './types';

interface Props {
  sectors: SectorData[];
}

export const Wheel: FC<Props> = props => {
  const { sectors } = props;
  const sectorsCount = sectors.length;
  const sectorStep = 360 / sectorsCount;
  const sectorStart = -sectorStep / 2;
  const side = 100;
  const padding = 6;
  const center = side / 2;
  const strokeWidth = 1;
  const outerRadius = side / 2 - strokeWidth - padding;
  const outerRingWidth = 3;
  const innerRadius = outerRadius - outerRingWidth;
  const centerRadius = 6;
  const selectorHeight = 10;
  const selectorWidth = 10;
  const selectorInnerDepth = side - padding - 8;
  const selectorOuterDepth = selectorInnerDepth + selectorWidth;

  return (
    <WheelSVGFigure scale={1}>
      <svg viewBox={`0 0 ${side} ${side}`} xmlns="http://www.w3.org/2000/svg">
        <circle cx={center} cy={center} r={outerRadius} fill="#B3A4EE" strokeWidth={strokeWidth} />
        <circle cx={center} cy={center} r={innerRadius} fill="#F4F6F8" strokeWidth={strokeWidth} />
        {sectors.map((sector, index) => {
          return (
            <path
              key={index}
              d={getSectorPath(
                center,
                center,
                innerRadius,
                sectorStart + index * sectorStep,
                sectorStart + (index + 1) * sectorStep,
              )}
              fill={sector.color}
            />
          );
        })}
        <circle cx={center} cy={center} r={centerRadius} fill="#F4F6F8" strokeWidth={strokeWidth} />
        <polygon
          points={`${selectorInnerDepth},${center} ${selectorOuterDepth},${
            center - selectorHeight / 2
          } ${selectorOuterDepth},${center + selectorHeight / 2}`}
          fill="#FDCD56"
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      </svg>
    </WheelSVGFigure>
  );
};

const WheelSVGFigure = styled.figure<{ scale: number }>`
  stroke: #373737;

  svg {
    width: calc(100vh * ${props => props.scale});
  }
`;

import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { GitHub, Pause, Play } from 'react-feather';
import { RandomRoller, SectorData } from '../common';
import { Controls, Layout, Note, Overlay, SEO, Wheel } from '../components';
import { useRecords } from '../hooks';
import balloonImage from '../images/sectors/001-balloon.svg';
import discoBallImage from '../images/sectors/002-disco ball.svg';
import cocktailImage from '../images/sectors/003-cocktail.svg';
import prizeImage from '../images/sectors/008-prize.svg';
import champagneImage from '../images/sectors/009-champagne.svg';
import pizzaImage from '../images/sectors/012-pizza.svg';
import cakeImage from '../images/sectors/013-cake.svg';
import bbqImage from '../images/sectors/016-bbq.svg';
import iceCreamImage from '../images/sectors/018-ice cream.svg';
import hotdogImage from '../images/sectors/021-hotdog.svg';

const IndexPage: FC = () => {
  const records = useRecords();

  const [running, setRunning] = useState(false);
  const [selectedSector, setSelectedSector] = useState<SectorData>();
  const [sectorCount, setSectorCount] = useState(10);
  const roller = useMemo(() => new RandomRoller<string>(records), [records]);

  useEffect(() => {
    Reflect.set(window, '__ROLLER__', roller);
  }, [roller]);

  const toggleRunning = useCallback(() => {
    setRunning(r => !r);
  }, []);

  const clearSector = useCallback(() => {
    setSelectedSector(undefined);
  }, []);

  const handleControlClick = useCallback(
    (type: string, payload: any) => {
      switch (type) {
        case 'play':
          if (!selectedSector) {
            toggleRunning();
          } else {
            clearSector();
          }
          break;
        case 'set-sectors':
          setSectorCount(payload);
          break;
      }
    },
    [selectedSector],
  );

  return (
    <Layout>
      <SEO />
      <Wheel
        isFaded={!!selectedSector}
        isRunning={running}
        onRunningToggle={toggleRunning}
        onSelect={setSelectedSector}
        sectorCount={sectorCount}
        sectors={[
          { color: '#F4F6F8', image: cakeImage, type: 'cake' },
          { color: '#F5B945', image: balloonImage, type: 'balloon' },
          { color: '#F36A50', image: prizeImage, type: 'prize' },
          { color: '#EB86BE', image: cocktailImage, type: 'cocktail' },
          { color: '#5E9CEA', image: bbqImage, type: 'bbq' },
          { color: '#65D4F1', image: iceCreamImage, type: 'ice-cream' },
          { color: '#74B0F3', image: hotdogImage, type: 'hotdog' },
          { color: '#9579DA', image: champagneImage, type: 'champagne' },
          { color: '#FFD67B', image: pizzaImage, type: 'pizza' },
          { color: '#EB5463', image: discoBallImage, type: 'disco-ball' },
        ]}
      />
      <Note position="top-left">
        <h1>Колесо Желаний</h1>
      </Note>
      <Note position="bottom-left">Версия: v1.0.0</Note>
      <Note position="top-right">
        <h2>Горячие Клавиши</h2>
        <ul>
          <li>
            <em>[Пробел]</em> Вращать барабан; закрыть окно сектора
          </li>
          <li>
            <em>[Цифры: 4, 5, 6, 7, 8, 9, 0]</em> Выбрать число секторов на барабане (0 для 10)
          </li>
        </ul>
      </Note>
      <Note position="bottom-right">
        <a href="https://github.com/laksby/wish-wheel-game" target="_blank" rel="noreferrer">
          <GitHub />
        </a>
      </Note>
      <Controls
        onClick={handleControlClick}
        controls={[
          {
            text: running ? <Pause /> : <Play />,
            type: 'play',
            payload: null,
            key: event => event.code === 'Space',
          },
          {
            text: '4',
            type: 'set-sectors',
            payload: 4,
            key: '4',
            isHighlighted: sectorCount === 4,
          },
          {
            text: '5',
            type: 'set-sectors',
            payload: 5,
            key: '5',
            isHighlighted: sectorCount === 5,
          },
          {
            text: '6',
            type: 'set-sectors',
            payload: 6,
            key: '6',
            isHighlighted: sectorCount === 6,
          },
          {
            text: '7',
            type: 'set-sectors',
            payload: 7,
            key: '7',
            isHighlighted: sectorCount === 7,
          },
          {
            text: '8',
            type: 'set-sectors',
            payload: 8,
            key: '8',
            isHighlighted: sectorCount === 8,
          },
          {
            text: '9',
            type: 'set-sectors',
            payload: 9,
            key: '9',
            isHighlighted: sectorCount === 9,
          },
          {
            text: '10',
            type: 'set-sectors',
            payload: 10,
            key: '0',
            isHighlighted: sectorCount === 10,
          },
        ]}
      />
      <Overlay selectedSector={selectedSector} roller={roller} onClose={clearSector} />
    </Layout>
  );
};

export default IndexPage;

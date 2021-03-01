import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { GitHub, Music, Pause, Play, Sun, Zap } from 'react-feather';
import { ModeType, RandomRoller, SectorData } from '../common';
import { Controls, Layout, Note, Overlay, SEO, Wheel } from '../components';
import { useMode, useRecords } from '../hooks';

const IndexPage: FC = () => {
  const records = useRecords();

  const [running, setRunning] = useState(false);
  const [selectedSector, setSelectedSector] = useState<SectorData>();
  const [spinSound, setSpinSound] = useState('/sound/spin-1.mp3');
  const [sectorCount, setSectorCount] = useState(10);
  const [modeType, setModeType] = useState<ModeType>('light');
  const roller = useMemo(() => new RandomRoller<string>(records), [records]);

  const mode = useMode(modeType);

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
          if (!running) {
            setSectorCount(payload);
          }
          break;
        case 'set-sound':
          if (!running) {
            setSpinSound(payload);
          }
          break;
        case 'set-mode':
          if (!running) {
            setModeType(payload);
          }
          break;
      }
    },
    [selectedSector, running],
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
        spinSound={spinSound}
        mode={mode}
      />
      <Note position="top-left">
        <h1>Колесо Фортуны</h1>
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
          <li>
            <em>[Цифры: 1, 2, 3]</em> Выбрать звук вращения барабана
          </li>
          <li>
            <em>[Буква: q]</em> Выбрать жесткий режим игры
          </li>
          <li>
            <em>[Буква: w]</em> Выбрать легкий режим игры
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
            color: '#b3a4ee',
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
          {
            text: (
              <>
                <Music />
                <span>#1</span>
              </>
            ),
            type: 'set-sound',
            payload: '/sound/spin-1.mp3',
            key: '1',
            isWide: true,
            isHighlighted: spinSound === '/sound/spin-1.mp3',
          },
          {
            text: (
              <>
                <Music />
                <span>#2</span>
              </>
            ),
            type: 'set-sound',
            payload: '/sound/spin-2.mp3',
            key: '2',
            isWide: true,
            isHighlighted: spinSound === '/sound/spin-2.mp3',
          },
          {
            text: (
              <>
                <Music />
                <span>#3</span>
              </>
            ),
            type: 'set-sound',
            payload: '/sound/spin-3.mp3',
            key: '3',
            isWide: true,
            isHighlighted: spinSound === '/sound/spin-3.mp3',
          },
          {
            text: <Zap />,
            type: 'set-mode',
            payload: 'hard',
            key: 'q',
            color: '#EB5463',
            isHighlighted: modeType === 'hard',
          },
          {
            text: <Sun />,
            type: 'set-mode',
            payload: 'light',
            key: 'w',
            color: '#FFD67B',
            isHighlighted: modeType === 'light',
          },
        ]}
      />
      <Overlay selectedSector={selectedSector} roller={roller} onClose={clearSector} />
    </Layout>
  );
};

export default IndexPage;

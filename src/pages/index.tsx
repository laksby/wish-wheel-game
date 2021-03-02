import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { GitHub } from 'react-feather';
import { ModeType, RandomRoller, SectorData } from '../common';
import { Controls, Layout, Note, Overlay, SEO, Wheel } from '../components';
import { useMode, useRecords } from '../hooks';
import boyImage from '../images/boy.svg';
import musicImage from '../images/compact-disc.svg';
import girlImage from '../images/girl.svg';
import pauseImage from '../images/pause.svg';
import playImage from '../images/play-button.svg';

const IndexPage: FC = () => {
  const records = useRecords();
  const tracks = ['/sound/spin-1.mp3', '/sound/spin-2.mp3', '/sound/spin-3.mp3'];

  const [running, setRunning] = useState(false);
  const [selectedSector, setSelectedSector] = useState<SectorData>();
  const [trackIndex, setTrackIndex] = useState(0);
  const [modeType, setModeType] = useState<ModeType>('light');
  const roller = useMemo(() => new RandomRoller<string>(records), [records]);

  const mode = useMode(modeType);

  useEffect(() => {
    Reflect.set(window, '__ROLLER__', roller);
  }, [roller]);

  const toggleRunning = useCallback(() => {
    setRunning(r => !r);
  }, []);

  const toggleMode = useCallback(() => {
    setModeType(m => (m === 'light' ? 'hard' : 'light'));
  }, []);

  const toggleTrack = useCallback(() => {
    setTrackIndex(s => (s < tracks.length - 1 ? s + 1 : 0));
  }, []);

  const clearSector = useCallback(() => {
    setSelectedSector(undefined);
  }, []);

  const handleControlClick = useCallback(
    (type: string) => {
      switch (type) {
        case 'play':
          if (!selectedSector) {
            toggleRunning();
          } else {
            clearSector();
          }
          break;
        case 'set-sound':
          if (!running) {
            toggleTrack();
          }
          break;
        case 'set-mode':
          if (!running) {
            toggleMode();
          }
          break;
      }
    },
    [selectedSector, running, modeType],
  );

  return (
    <Layout>
      <SEO />
      <Wheel
        isFaded={!!selectedSector}
        isRunning={running}
        onRunningToggle={toggleRunning}
        onSelect={setSelectedSector}
        spinSound={tracks[trackIndex]}
        mode={mode}
      />
      <Note position="top-left">
        <h1>Колесо Фортуны</h1>
      </Note>
      <Note position="bottom-left">
        Трек {trackIndex}
        <br />
        Версия: v1.0.0
      </Note>
      <Note position="top-right">
        <h2>Горячие Клавиши</h2>
        <ul>
          <li>
            <em>[Пробел]</em> Вращать барабан; закрыть окно сектора
          </li>
          <li>
            <em>[M]</em> Сменить звук вращения барабана
          </li>
          <li>
            <em>[Q]</em> Сменить режим мальчик/девочка
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
            text: running ? (
              <img src={pauseImage} alt="" aria-hidden />
            ) : (
              <img src={playImage} alt="" aria-hidden />
            ),
            type: 'play',
            payload: null,
            key: event => event.code === 'Space',
          },
          {
            text:
              modeType === 'light' ? (
                <img src={boyImage} alt="" aria-hidden />
              ) : (
                <img src={girlImage} alt="" aria-hidden />
              ),
            type: 'set-mode',
            payload: null,
            key: 'q',
          },
          {
            text: <img src={musicImage} alt="" aria-hidden />,
            type: 'set-sound',
            payload: null,
            key: 'm',
          },
        ]}
      />
      <Overlay selectedSector={selectedSector} roller={roller} onClose={clearSector} />
    </Layout>
  );
};

export default IndexPage;

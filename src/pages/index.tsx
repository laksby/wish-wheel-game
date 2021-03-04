import React, { FC, useCallback, useEffect, useState } from 'react';
import { GitHub } from 'react-feather';
import { ModeType, SectorData } from '../common';
import { Controls, Layout, Note, Overlay, SEO, Wheel } from '../components';
import { useMode, useRecords, useRoller } from '../hooks';
import boyImage from '../images/boy.svg';
import musicImage from '../images/compact-disc.svg';
import girlImage from '../images/girl.svg';
import pauseImage from '../images/pause.svg';
import playImage from '../images/play-button.svg';

const IndexPage: FC = () => {
  const records = useRecords();
  const roller = useRoller(records);
  const tracks = ['/sound/spin-1.mp3', '/sound/spin-2.mp3', '/sound/spin-3.mp3'];

  const [slideIndex, setSlideIndex] = useState(0);
  const [sectorType, setSectorType] = useState('');
  const [selectedSector, setSelectedSector] = useState<SectorData>();
  const [trackIndex, setTrackIndex] = useState(0);
  const [modeType, setModeType] = useState<ModeType>('light');

  const mode = useMode(modeType);

  useEffect(() => {
    Reflect.set(window, '__ROLLER__', roller);
  }, [roller]);

  const toggleSectorType = useCallback(() => {
    setSectorType(r =>
      r ? '' : roller.draw(modeType === 'light' ? 'script-girl' : 'script-man') || '',
    );
  }, [roller, modeType]);

  const toggleMode = useCallback(() => {
    setModeType(m => (m === 'light' ? 'hard' : 'light'));
  }, []);

  const toggleTrack = useCallback(() => {
    setTrackIndex(s => (s < tracks.length - 1 ? s + 1 : 0));
  }, [tracks]);

  const clearSector = useCallback(() => {
    setSelectedSector(undefined);
  }, []);

  const handleSelectSector = useCallback((sector: SectorData) => {
    setSelectedSector(sector);
  }, []);

  const handleControlClick = useCallback(
    (type: string) => {
      switch (type) {
        case 'play':
          if (selectedSector) {
            if (selectedSector.contentType === 'image') {
              if (slideIndex < 1) {
                setSlideIndex(1);
              } else {
                setSlideIndex(0);
                clearSector();
              }
            } else {
              clearSector();
            }
          } else {
            toggleSectorType();
          }
          break;
        case 'set-sound':
          if (!sectorType) {
            toggleTrack();
          }
          break;
        case 'set-mode':
          if (!sectorType) {
            toggleMode();
          }
          break;
      }
    },
    [selectedSector, sectorType, modeType, slideIndex],
  );

  return (
    <Layout>
      <SEO />
      <Wheel
        isFaded={!!selectedSector}
        stopSector={sectorType}
        onRunningToggle={toggleSectorType}
        onSelect={handleSelectSector}
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
        <ul>
          {mode.sectors.map((sector, index) => (
            <li key={index}>
              <img src={sector.image} alt="" aria-hidden /> <span>{sector.title}</span>
            </li>
          ))}
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
            text: sectorType ? (
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
      <Overlay slideIndex={slideIndex} selectedSector={selectedSector} roller={roller} />
    </Layout>
  );
};

export default IndexPage;

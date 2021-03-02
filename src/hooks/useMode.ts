import { useMemo } from 'react';
import { ModeData, ModeType } from '../common';
import hmGuessImage from '../images/hard-mode/sectors/bandit.svg';
import hmTaskImage from '../images/hard-mode/sectors/cards.svg';
import hmDrinkImage from '../images/hard-mode/sectors/whisky.svg';
import hmWheelButton from '../images/hard-mode/wheel-button.svg';
import lmFoodImage from '../images/light-mode/sectors/candy.svg';
import lmTaskImage from '../images/light-mode/sectors/cards.svg';
import lmPrizeImage from '../images/light-mode/sectors/confetti.svg';
import lmDrinkImage from '../images/light-mode/sectors/drink.svg';
import lmManImage from '../images/light-mode/sectors/magician.svg';
import lmPhotoImage from '../images/light-mode/sectors/theater.svg';
import lmWheelButton from '../images/light-mode/wheel-button.svg';

export function useMode(modeType: ModeType): ModeData {
  return useMemo(() => {
    switch (modeType) {
      case 'light':
        return {
          centerButtonImage: lmWheelButton,
          frameColor: '#B3A4EE',
          sectors: [
            { color: '#F4F6F8', image: lmTaskImage, type: 'girl-task' },
            { color: '#FFD67B', image: lmDrinkImage, type: 'girl-drink' },
            { color: '#F4F6F8', image: lmTaskImage, type: 'girl-task' },
            { color: '#88C057', image: lmPhotoImage, type: 'girl-photo', contentType: 'image' },
            { color: '#F4F6F8', image: lmTaskImage, type: 'girl-task' },
            { color: '#EB86BE', image: lmFoodImage, type: 'girl-food' },
            { color: '#F4F6F8', image: lmTaskImage, type: 'girl-task' },
            { color: '#9579DA', image: lmPrizeImage, type: 'girl-prize' },
            { color: '#F4F6F8', image: lmTaskImage, type: 'girl-task' },
            { color: '#5E9CEA', image: lmManImage, type: 'girl-man' },
          ],
        };
      case 'hard':
        return {
          centerButtonImage: hmWheelButton,
          frameColor: '#384949',
          sectors: [
            { color: '#B6B7B9', image: hmDrinkImage, type: 'man-drink' },
            { color: '#A49F9C', image: hmTaskImage, type: 'man-task' },
            { color: '#B0BAC2', image: hmGuessImage, type: 'man-guess' },
            { color: '#CBCDCC', image: hmTaskImage, type: 'man-task' },
          ],
        };
    }
  }, [modeType]);
}

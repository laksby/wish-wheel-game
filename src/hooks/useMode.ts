import { useMemo } from 'react';
import { ModeData, ModeType } from '../common';
import hmGuessImage from '../images/hard-mode/sectors/bandit.svg';
import hmTask1Image from '../images/hard-mode/sectors/task1.svg';
import hmTask2Image from '../images/hard-mode/sectors/task2.svg';
import hmDrinkImage from '../images/hard-mode/sectors/whisky.svg';
import hmWheelButton from '../images/hard-mode/wheel-button.svg';
import lmFoodImage from '../images/light-mode/sectors/food.svg';
import lmTask1Image from '../images/light-mode/sectors/task1.svg';
import lmTask2Image from '../images/light-mode/sectors/task2.svg';
import lmTask3Image from '../images/light-mode/sectors/task3.svg';
import lmTask4Image from '../images/light-mode/sectors/task4.svg';
import lmTask5Image from '../images/light-mode/sectors/task5.svg';
import lmPrizeImage from '../images/light-mode/sectors/touch.svg';
import lmDrinkImage from '../images/light-mode/sectors/drink.svg';
import lmManImage from '../images/light-mode/sectors/man.svg';
import lmPhotoImage from '../images/light-mode/sectors/movie.svg';
import lmWheelButton from '../images/light-mode/wheel-button.svg';

export function useMode(modeType: ModeType): ModeData {
  return useMemo<ModeData>(() => {
    switch (modeType) {
      case 'light':
        return {
          centerButtonImage: lmWheelButton,
          frameColor: '#B3A4EE',
          sectors: [
            { color: '#F4F6F8', image: lmTask1Image, type: 'girl-task', title: 'Фант-сектор' },
            { color: '#66d3d0', image: lmDrinkImage, type: 'girl-drink', title: 'Коктейль-сектор' },
            { color: '#F4F6F8', image: lmTask2Image, type: 'girl-task', title: 'Фант-сектор' },
            {
              color: '#9579DA',
              image: lmPhotoImage,
              type: 'girl-photo',
              title: 'Кино/фото сектор',
              contentType: 'image',
            },
            { color: '#F4F6F8', image: lmTask3Image, type: 'girl-task', title: 'Фант-сектор' },
            { color: '#ffde55', image: lmFoodImage, type: 'girl-food', title: 'Гастро-сектор' },
            { color: '#F4F6F8', image: lmTask4Image, type: 'girl-task', title: 'Фант-сектор' },
            {
              color: '#bdebff',
              image: lmPrizeImage,
              type: 'girl-prize',
              title: 'Трогательный сектор',
            },
            { color: '#F4F6F8', image: lmTask5Image, type: 'girl-task', title: 'Фант-сектор' },
            { color: '#ff7956', image: lmManImage, type: 'girl-man', title: 'Мужской сектор' },
          ],
        };
      case 'hard':
        return {
          centerButtonImage: hmWheelButton,
          frameColor: '#384949',
          sectors: [
            { color: '#B6B7B9', image: hmDrinkImage, type: 'man-drink', title: 'Алко-сектор' },
            { color: '#CBCDCC', image: hmTask1Image, type: 'man-task', title: 'Фант-сектор' },
            { color: '#B0BAC2', image: hmGuessImage, type: 'man-guess', title: 'Угадай-ка сектор' },
            { color: '#CBCDCC', image: hmTask2Image, type: 'man-task', title: 'Фант-сектор' },
          ],
        };
    }
  }, [modeType]);
}

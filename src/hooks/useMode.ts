import { useMemo } from 'react';
import { ModeData, ModeType } from '../common';
import hmWeightImage from '../images/hard-mode/sectors/004-weight.svg';
import hmHorseImage from '../images/hard-mode/sectors/007-horse.svg';
import hmPlungerImage from '../images/hard-mode/sectors/008-plunger.svg';
import hmRocketImage from '../images/hard-mode/sectors/022-rocket.svg';
import hmExtinguisherImage from '../images/hard-mode/sectors/045-extinguisher.svg';
import hmDynamiteImage from '../images/hard-mode/sectors/046-dynamite.svg';
import hmCannonImage from '../images/hard-mode/sectors/054-cannon.svg';
import hmCampImage from '../images/hard-mode/sectors/057-camp.svg';
import hmBowImage from '../images/hard-mode/sectors/060-bow.svg';
import hmBombImage from '../images/hard-mode/sectors/062-bomb.svg';
import hmWheelButton from '../images/hard-mode/wheel-button.svg';
import lmFoodImage from '../images/light-mode/sectors/candy.svg';
import lmTaskImage from '../images/light-mode/sectors/cards.svg';
import lmPrizeImage from '../images/light-mode/sectors/confetti.svg';
import lmDrinkImage from '../images/light-mode/sectors/drink.svg';
import lmManImage from '../images/light-mode/sectors/magician.svg';
import lmPhotoImage from '../images/light-mode/sectors/reward.svg';
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
            { color: '#EB5463', image: lmPhotoImage, type: 'girl-photo' },
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
            { color: '#B6B7B9', image: hmWeightImage, type: 'weight' },
            { color: '#A49F9C', image: hmDynamiteImage, type: 'dynamite' },
            { color: '#B0BAC2', image: hmRocketImage, type: 'rocket' },
            { color: '#CBCDCC', image: hmCannonImage, type: 'cannon' },
            { color: '#AFAFAF', image: hmHorseImage, type: 'horse' },
            { color: '#C7C7C7', image: hmCampImage, type: 'camp' },
            { color: '#797979', image: hmBombImage, type: 'bomb' },
            { color: '#9B9EA4', image: hmBowImage, type: 'bow' },
            { color: '#B9B9B9', image: hmExtinguisherImage, type: 'extinguisher' },
            { color: '#CBCCCE', image: hmPlungerImage, type: 'plunger' },
          ],
        };
    }
  }, [modeType]);
}

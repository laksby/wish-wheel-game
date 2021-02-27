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
import lmBalloonImage from '../images/light-mode/sectors/001-balloon.svg';
import lmDiscoBallImage from '../images/light-mode/sectors/002-disco ball.svg';
import lmCocktailImage from '../images/light-mode/sectors/003-cocktail.svg';
import lmPrizeImage from '../images/light-mode/sectors/008-prize.svg';
import lmChampagneImage from '../images/light-mode/sectors/009-champagne.svg';
import lmPizzaImage from '../images/light-mode/sectors/012-pizza.svg';
import lmCakeImage from '../images/light-mode/sectors/013-cake.svg';
import lmBbqImage from '../images/light-mode/sectors/016-bbq.svg';
import lmIceCreamImage from '../images/light-mode/sectors/018-ice cream.svg';
import lmHotdogImage from '../images/light-mode/sectors/021-hotdog.svg';
import lmWheelButton from '../images/light-mode/wheel-button.svg';

export function useMode(modeType: ModeType): ModeData {
  return useMemo(() => {
    switch (modeType) {
      case 'light':
        return {
          centerButtonImage: lmWheelButton,
          frameColor: '#B3A4EE',
          sectors: [
            { color: '#F4F6F8', image: lmCakeImage, type: 'cake' },
            { color: '#F5B945', image: lmBalloonImage, type: 'balloon' },
            { color: '#F36A50', image: lmPrizeImage, type: 'prize' },
            { color: '#EB86BE', image: lmCocktailImage, type: 'cocktail' },
            { color: '#5E9CEA', image: lmBbqImage, type: 'bbq' },
            { color: '#65D4F1', image: lmIceCreamImage, type: 'ice-cream' },
            { color: '#74B0F3', image: lmHotdogImage, type: 'hotdog' },
            { color: '#9579DA', image: lmChampagneImage, type: 'champagne' },
            { color: '#FFD67B', image: lmPizzaImage, type: 'pizza' },
            { color: '#EB5463', image: lmDiscoBallImage, type: 'disco-ball' },
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

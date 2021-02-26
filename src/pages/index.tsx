import React, { FC, useCallback, useState } from 'react';
import { BooleanParam, useQueryParam } from 'use-query-params';
import { Controls, Layout, SEO, Wheel } from '../components';
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
  const [isFullscreen] = useQueryParam('f', BooleanParam);
  const [sectorCount, setSectorCount] = useState(6);

  const handleControlClick = useCallback((type: string, payload: any) => {
    switch (type) {
      case 'set-sectors':
        setSectorCount(payload);
        break;
    }
  }, []);

  return (
    <Layout isFullscreen={!!isFullscreen}>
      <SEO />
      <Wheel
        sectorCount={sectorCount}
        sectors={[
          { color: '#F4F6F8', image: cakeImage },
          { color: '#F5B945', image: balloonImage },
          { color: '#F36A50', image: prizeImage },
          { color: '#EB86BE', image: cocktailImage },
          { color: '#5E9CEA', image: bbqImage },
          { color: '#65D4F1', image: iceCreamImage },
          { color: '#74B0F3', image: hotdogImage },
          { color: '#9579DA', image: champagneImage },
          { color: '#FFD67B', image: pizzaImage },
          { color: '#EB5463', image: discoBallImage },
        ]}
      />
      <Controls
        onClick={handleControlClick}
        controls={[
          { text: '4', type: 'set-sectors', payload: 4 },
          { text: '5', type: 'set-sectors', payload: 5 },
          { text: '6', type: 'set-sectors', payload: 6 },
          { text: '7', type: 'set-sectors', payload: 7 },
          { text: '8', type: 'set-sectors', payload: 8 },
          { text: '9', type: 'set-sectors', payload: 9 },
          { text: '10', type: 'set-sectors', payload: 10 },
        ]}
      />
    </Layout>
  );
};

export default IndexPage;

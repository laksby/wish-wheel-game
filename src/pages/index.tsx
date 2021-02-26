import React, { FC } from 'react';
import { BooleanParam, useQueryParam } from 'use-query-params';
import { Layout, SEO, Wheel } from '../components';

const IndexPage: FC = () => {
  const [isFullscreen] = useQueryParam('f', BooleanParam);

  return (
    <Layout isFullscreen={!!isFullscreen}>
      <SEO />
      <Wheel
        sectorCount={6}
        sectors={[
          { color: '#F4F6F8' },
          { color: '#F5B945' },
          { color: '#F36A50' },
          { color: '#EB86BE' },
          { color: '#5E9CEA' },
          { color: '#65D4F1' },
          { color: '#74B0F3' },
          { color: '#9579DA' },
          { color: '#FFD67B' },
          { color: '#EB5463' },
        ]}
      />
    </Layout>
  );
};

export default IndexPage;

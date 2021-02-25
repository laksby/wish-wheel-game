import React, { FC } from 'react';
import { BooleanParam, useQueryParam } from 'use-query-params';
import { Layout, SEO, Wheel } from '../components';

const IndexPage: FC = () => {
  const [isFullscreen] = useQueryParam('f', BooleanParam);

  return (
    <Layout isFullscreen={!!isFullscreen}>
      <SEO />
      <Wheel
        sectors={[
          { color: '#F4F6F8' },
          { color: '#FFD67B' },
          { color: '#F5B945' },
          { color: '#F36A50' },
          { color: '#EB5463' },
          { color: '#EB86BE' },
          { color: '#9579DA' },
          { color: '#5E9CEA' },
          { color: '#74B0F3' },
          { color: '#65D4F1' },
        ]}
      />
    </Layout>
  );
};

export default IndexPage;

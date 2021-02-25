import React, { FC } from 'react';
import { BooleanParam, useQueryParam } from 'use-query-params';
import { Layout, SEO, Wheel } from '../components';

const IndexPage: FC = () => {
  const [isFullscreen] = useQueryParam('f', BooleanParam);

  return (
    <Layout isFullscreen={!!isFullscreen}>
      <SEO />
      <Wheel />
    </Layout>
  );
};

export default IndexPage;

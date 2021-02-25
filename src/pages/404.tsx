import React, { FC } from 'react';
import { Layout, SEO } from '../components';

const NotFoundPage: FC = () => {
  return (
    <Layout>
      <SEO />
      Страница не найдена :(
    </Layout>
  );
};

export default NotFoundPage;

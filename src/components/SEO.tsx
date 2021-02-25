import { graphql, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import favicon from '../images/favicon.svg';

export const SEO: FC = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `,
  );

  const title: string = site.siteMetadata.title;
  const description: string = site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang: 'ru',
      }}
      title={title}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: 'Саня',
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
      ]}
      link={[
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: favicon,
        },
      ]}
    />
  );
};

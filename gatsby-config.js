module.exports = {
  siteMetadata: {
    title: 'Колесо Желаний',
    description: 'Игра, подготовленная специально к празднованию 8 марта',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
  ],
};

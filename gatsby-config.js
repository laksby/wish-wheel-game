module.exports = {
  siteMetadata: {
    title: 'Колесо Желаний',
    description: 'Игра, подготовленная специально к празднованию 8 марта',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-netlify-cms',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: './data',
      },
    },
  ],
};

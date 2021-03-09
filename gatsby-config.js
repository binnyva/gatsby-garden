/**
 * Configure your Gatsby site with this file.
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
module.exports = {
  siteMetadata: {
    title: `Digital Zen Garden`,
    menu: [
      {
        type: 'tag', // type can be 'tag', 'note' or 'page'
        item: 'tech',
        title: 'Tech'
      },
      {
        type: 'tag',
        item: 'growth',
        menu: [
          {
            type: 'tag',
            item: 'learning',
            menu: [
              {
                type: 'tag',
                item: 'zettelkasten'
              },
            ]
          },
          {
            type: 'tag',
            item: 'productivity',
          },
        ]
      },
      {
        type: 'tag',
        item: 'mad',
        title: 'MAD'
      },
      {
        type: 'tag',
        item: 'philosophy'
      },
      {
        type: 'tag',
        item: 'psychology'
      },
      {
        type: 'tag',
        item: 'rationality'
      },
      {
        type: 'page',
        item: 'sitemap'
      }
    ]
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `notes`,
        path: `${__dirname}/_notes/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-wiki-links`,
            options: {
              slugify: `${__dirname}/src/utils/make-slug.js`,
              stripBrackets: true
            }
          },
        ],
      },
    }
  ],
}

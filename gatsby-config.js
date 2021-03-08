/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Digital Zen Garden`,
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
            resolve: `gatsby-remark-double-brackets-link`,
            options: {
              stripBrackets: true,
              titleToURLPath: `${__dirname}/src/utils/double-bracket-handling.js`
            }
          },
        ],
      },
    }
  ],
}

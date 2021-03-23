/**
 * Configure your Gatsby site with this file.
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
module.exports = {
  // pathPrefix: `/notes`,
  siteMetadata: {
    title: `Gatsby Garden`,
    description: `Digital Garden Tended by Gatsby`,
    // homeNote: `Home`, :TODO:
    // siteUrl: `http://localhost:8000/`,

    // headerMenu: [
    //   {type: 'page', item: '', title: 'Home'},
    //   {type: 'page', item: 'sitemap', title: 'Sitemap'},
    //   {type: 'page', item: 'rss.xml', title: 'RSS'},
    //   {
    //     type: 'page', item: 'tags', title: 'Tags',
    //     menu: [
    //       {type: 'tag',item: 'zettelkasten'},
    //       {type: 'tag',item: 'philosophy'},
    //       {type: 'tag',item: 'psychology'},
    //       {type: 'tag',item: 'rationality'},
    //     ]
    //   },
    // ],

    menu: [
      // type can be 'tag', 'note' or 'page'
      {
        type: 'tag',item: 'learning',
        menu: [
          {type: 'tag',item: 'zettelkasten'},
        ]
      },
      {type: 'tag',item: 'mad',title: 'MAD'},
      {type: 'tag',item: 'philosophy'},
      {type: 'tag',item: 'psychology'},
      {type: 'tag',item: 'rationality'},
      {type: 'page',item: 'sitemap'}
    ]
  },
  plugins: [
    {
      resolve: `gatsby-plugin-feed`
    },
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
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
          fonts: [
              `inter:300,400,500,600,700`       
          ], display: 'swap'       
      }
    }
  ],
}

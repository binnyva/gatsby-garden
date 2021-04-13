/**
 * Configure your Gatsby site with this file.
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
module.exports = {
  // pathPrefix: `/notes`, // If your Digital Garden is not published at the root of your website, use this.
  siteMetadata: {
    title: `Gatsby Garden`,
    description: `A Digital Garden Tended by Gatsby`,

    // siteUrl: `https://yoursite.com/notes/`, // URL at which your site will be published. This should be present if you want RSS feed.
    // headerMenu: [ // Top Navbar items
    //   {type: 'page', item: '', title: 'Home'}, // Type can be 'page', 'note', 'tag', or 'link'
    //   {type: 'page', item: 'sitemap', title: 'Sitemap'},
    //   {type: 'page', item: 'rss.xml', title: 'RSS'},
    //   {
    //     type: 'page', item: 'tags', title: 'Tags',
    //     menu: [ // Only one level depth, please.
    //       {type: 'tag',item: 'zettelkasten'},
    //       {type: 'tag',item: 'philosophy'},
    //       {type: 'tag',item: 'psychology'},
    //       {type: 'tag',item: 'rationality'},
    //     ]
    //   },
    // ],

    // menu: [ // This is the Table of Contents that comes in the home page if a Home Note is not specified. It can be much longer than the header menu.
    //   ... Same structure as headerMenu. You can have any depth level - multiple menus can be nested.
    // ]
  },
  plugins: [
    // { // Enable this if you want to have an RSS Feed. The `siteMetadata.siteUrl` property should be present as well.
    //   resolve: `gatsby-plugin-feed`
    // },
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

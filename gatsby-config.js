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
    "gatsby-plugin-dark-mode",
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
              stripBrackets: true,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`inter:300,400,500,600,700`],
        display: "swap",
      },
    },

    { // https://www.gatsbyjs.com/plugins/gatsby-plugin-local-search
      resolve: 'gatsby-plugin-local-search',
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: 'notes_index',

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: 'flexsearch',

        // Provide options to the engine. This is optional and only recommended
        // for advanced users.
        //
        // Note: Only the flexsearch engine supports options.
        engineOptions: 'speed',

        // GraphQL query used to fetch all data for the search index. This is
        // required.
        query: `
          {
            allMarkdownRemark {
              nodes {
                id
                fields {
                  title
                  slug
                }
                frontmatter {
                  tags
                }
                rawMarkdownBody
              }
            }
          }
        `,

        // Field used as the reference value for each document.
        // Default: 'id'.
        ref: 'id',

        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        index: ['title', 'body', 'tags'],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        store: ['id', 'slug', 'title'],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({ data }) =>
          data.allMarkdownRemark.nodes.map((node) => ({
            id: node.id,
            slug: node.fields.slug,
            title: node.fields.title,
            tags: node.frontmatter.tags,
            body: node.rawMarkdownBody,
          })),
      },
    },
  ],
}

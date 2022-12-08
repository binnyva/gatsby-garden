module.exports = {
  // Gatsby Config
  // pathPrefix: `/notes`, // If your Digital Garden is not published at the root of your website, use this. Use `npm run build -- --prefix-paths` when building.
  trailingSlash: 'never', // Remove all trailing slashes on each URL, e.g. /x/ to /x

  siteMetadata: {
    title: `Gatsby Garden`,
    description: `A Digital Garden tended by Gatsby`,

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
    // ],

    hoverPreview: true // If true, shows the content of an internal link in a tooltip when hovering over the link.
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-remark-images`,
    `gatsby-plugin-dark-mode`,
    // { // Enable this if you want to have an RSS Feed. The `siteMetadata.siteUrl` property should be present for this to work
    //   // Also, you'll need to install this library. To do that, run the command `npm install gatsby-plugin-feed-mdx --save` in the same directory as this gatsby-config.js file.
    //   resolve: `gatsby-plugin-feed`,
    //   options: {
    //     query: `
    //       {
    //         site {
    //           siteMetadata {
    //             title
    //             description
    //             siteUrl
    //             site_url: siteUrl
    //           }
    //         }
    //       }
    //     `,
    //     feeds: [
    //       {
    //         serialize: ({ query: { site, allMdx } }) => {
    //           return allMdx.edges.map(edge => {
    //             return Object.assign({}, edge.node.fields, {
    //               description: edge.node.excerpt,
    //               date: edge.node.fields.date,
    //               url: site.siteMetadata.siteUrl + edge.node.fields.slug,
    //               guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
    //               custom_elements: [{ "content:encoded": edge.node.html }]
    //             });
    //           });
    //         },
    //         query: `
    //           {
    //             allMdx(
    //               limit: 20,
    //               sort: { order: DESC, fields: [fields___date] },
    //             ) {
    //               edges {
    //                 node {
    //                   excerpt
    //                   html
    //                   fields { slug date title }
    //                 }
    //               }
    //             }
    //           }
    //         `,
    //         output: "/rss.xml",
    //         title: "RSS Feed",
    //       }
    //     ]
    //   }
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `notes`,
        path: `${__dirname}/_notes/`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          'gatsby-remark-mermaid',
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
          {
            resolve: 'gatsby-remark-obsidian',
            options: {
              titleToURL: require(`${__dirname}/src/utils/make-slug.js`)
            }
          }
        ],
      },
    },

    // {
    //   resolve: `gatsby-plugin-google-fonts`,
    //   options: {
    //     fonts: [`IBM Plex Sans:ital,wght@0,400;0,600;1,400;1,600`],
    //     display: `swap`,
    //   },
    // },

    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        // printRejected: true, // Print removed selectors and processed file names. Use for debugging.
        // develop: true, // Enable while using `gatsby develop`
        // tailwind: true, // Enable tailwindcss support
        ignore: ['tippy.js/', 'tooltip.css'], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
        purgeCSSOptions: {
          safelist: ['.tippy-box'], // Don't remove this selector
        },
        // More options defined here https://purgecss.com/configuration.html#options
      },
    },

    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: 'notes_index',

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: 'flexsearch',

        // Provide options to the engine. This is optional and only recommended for advanced users.
        // Note: Only the flexsearch engine supports options.
        engineOptions: {
            present: 'speed',
            tokenize: 'forward'
        },

        // GraphQL query used to fetch all data for the search index. This is required.
        query: `
          {
            allMdx(filter: {
                fields: { visibility: { eq: "public" } }
              }) {
              nodes {
                id
                fields {
                  title
                  slug
                  excerpt
                }
                frontmatter {
                  tags
                }
                rawBody
                excerpt
              }
            }
          }
        `,

        // Field used as the reference value for each document. Default: 'id'.
        ref: 'id',

        // List of keys to index. The values of the keys are taken from the normalizer function below.
        // Default: all fields
        index: ['title', 'body', 'tags'],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        store: ['id', 'slug', 'title', 'excerpt'],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({ data }) =>
          data.allMdx.nodes.map(node => ({
            id: node.id,
            slug: node.fields.slug,
            title: node.fields.title,
            excerpt: node.fields.excerpt ? node.fields.excerpt : node.excerpt,
            tags: node.frontmatter.tags,
            body: node.rawBody,
          })),
      },
    },
  ],
}

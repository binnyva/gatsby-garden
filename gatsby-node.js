const { paginate } = require('gatsby-awesome-pagination')
const path = require(`path`)
const makeSlug = require("./src/utils/make-slug")
const _ = require('lodash')
const { createFilePath } = require(`gatsby-source-filesystem`)
const siteConfig = require("./gatsby-config")

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === `MarkdownRemark`) {
  	const { createNodeField } = actions
    const title = node.frontmatter.title ? node.frontmatter.title : createFilePath({ node, getNode, basePath: `_notes` }).replace(/^\/(.+)\/$/, '$1')
    const slug = node.frontmatter.slug ? makeSlug(node.frontmatter.slug) : makeSlug(title)
    const fileNode = getNode(node.parent)
    const date = node.frontmatter.date ? node.frontmatter.date : fileNode.ctime

    createNodeField({
      node,
      name: `slug`,
      value: `/${slug}`
    })
    createNodeField({
      node,
      name: `date`,
      value: date
    })
    createNodeField({
      node,
      name: `title`,
      value: title.replace(/\//g,'')
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
              title
            }
            frontmatter {
              title
              tags
              date
              aliases
            }
            rawMarkdownBody
            excerpt
            fileAbsolutePath
          }
        }
      }
      tags: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)
  const allNotes = _.get(result, "data.allMarkdownRemark.edges")

  // Make a map of how notes link to other links. This is necessary to have back links and graph visualisation
  let referenceMap = {}
  let backLinkMap = {}

  // I didn't used the much more cleaner foreach because the `referenceMap` was not working well with that.
  for(let i = 0; i < result.data.allMarkdownRemark.edges.length; i++) {
    const node = result.data.allMarkdownRemark.edges[i].node
    const title = node.frontmatter.title ? node.frontmatter.title : node.fields.title
    
    if(backLinkMap[title] === undefined) backLinkMap[title] = [] // Create a element in the back link map if its already not made.

    // Go thru all the notes, create a map of how references map.
    const refersNotes = findReferences( node.rawMarkdownBody )
    referenceMap[title] = refersNotes

    for(let j = 0; j < refersNotes.length; j++) {
      const tle = refersNotes[j]

      if(backLinkMap[tle] === undefined) backLinkMap[tle] = [ title ]
      else backLinkMap[tle].push(title)
    }
  }

  for(let i = 0; i < result.data.allMarkdownRemark.edges.length; i++) {
    const node = result.data.allMarkdownRemark.edges[i].node
    const title = node.frontmatter.title ? node.frontmatter.title : node.fields.title
    const aliases = node.frontmatter.aliases ? node.frontmatter.aliases : []

    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/note.jsx`),
      context: {
        title: title,
        slug: node.fields.slug,
        refersTo: referenceMap[title] ? referenceMap[title] : [],
        referredBy: backLinkMap[title] ? backLinkMap[title] : []
      }
    })

    // Handling Aliases
    for(let j = 0; j < aliases.length; j++) {
      createRedirect({
        fromPath: `/${makeSlug(aliases[j])}`,
        toPath: node.fields.slug,
        redirectInBrowser: true,
        isPermanent: true,
      })
    }
  }

  createPage({
    path: `/note-map`,
    component: path.resolve('./src/templates/note-map.jsx'),
    context: {
      referenceMap,
      backLinkMap
    }
  })

  result.data.tags.group.forEach(( tag ) => {
    const taggedNotes = allNotes.filter(note => note.node.frontmatter.tags ? note.node.frontmatter.tags.includes(tag.fieldValue) : false)
    paginate({
      createPage,
      items: taggedNotes,
      itemsPerPage: 10,
      pathPrefix: `/tags/${makeSlug(tag.fieldValue)}`,
      component: path.resolve('./src/templates/tag.jsx'),
      context: {
        tag: tag.fieldValue
      }
    })
  })

  createPage({
    path: `/tags`,
    component: path.resolve(`./src/templates/tag-list.jsx`)
  })

  // Paginate Sitemap - that page has list of all notes
  paginate({
    createPage,
    items: allNotes,
    itemsPerPage: 10,
    pathPrefix: '/sitemap',
    component: path.resolve('./src/templates/sitemap.jsx')
  })
}

function findReferences( content ) {
  // Handles both [[Note Title]] and [[Note Title|text to show]] formats
  const linkRegex = /\[\[([^\]\|]+)(\|.+)?\]\]/g;
  let links = [...content.matchAll(linkRegex)]

  const matchedNotes = links.map( lnk => lnk[1] )

  // :TODO: Send a bit of text around the link back as well. Can be used in back links for context.
  // :TODO: This will break if custom slug is used. 

  return matchedNotes
}
const path = require(`path`)
const matter = require("gray-matter");
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === `MarkdownRemark`) {
  	const { createNodeField } = actions
    const title = createFilePath({ node, getNode, basePath: `_notes` })

    const refersNotes = findReferences( node.rawMarkdownBody )
    // :TODO: :NEXTUP: Go thru all the notes, create a map of how references map.

    // :TODO: Custom slug based on frontmatter 'slug' field.
    const slug = _.kebabCase(title)
    createNodeField({
      node,
      name: `slug`,
      value: `/${slug}`
    })
    createNodeField({
      node,
      name: `title`,
      value: title.replace(/\//g,'')
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
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

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/note.jsx`),
      context: {
        title: node.frontmatter.title ? node.frontmatter.title : node.fields.title,
        slug: node.fields.slug,
      },
    })
  })

  result.data.tags.group.forEach(( tag ) => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}`,
      component: path.resolve(`./src/templates/tag.jsx`),
      context: {
        tag: tag.fieldValue
      },
    })
  })

  createPage({
    path: `/tags`,
    component: path.resolve(`./src/templates/tag-list.jsx`)
  })
}

// exports.sourceNodes = require("./src/source-nodes");

function findReferences( content ) {
  // Handles both [[Note Title]] and [[Note Title|text to show]] formats
  const link_regex = /\[\[([^\]\|]+)(\|.+)?\]\]/g;
  let links = [...content.matchAll(link_regex)]

  const matched_notes = links.map( lnk => lnk[1] )

  // :TODO: Send a bit of text around the link back as well. Can be used in back links for context.

  return matched_notes
}
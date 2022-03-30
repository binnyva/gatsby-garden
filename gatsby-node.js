const { paginate } = require(`gatsby-awesome-pagination`)
const path = require(`path`)
const makeSlug = require(`./src/utils/make-slug`)
const _ = require(`lodash`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const siteConfig = require(`./gatsby-config`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === `Mdx`) {
    const { createNodeField } = actions

    const fileName = createFilePath({ node, getNode, basePath: `_notes` }).replace(/^\/(.+)\/$/, '$1')
    const title = node.frontmatter.title
      ? node.frontmatter.title
      : fileName
    const slug = node.frontmatter.slug
      ? makeSlug(node.frontmatter.slug)
      : makeSlug(fileName)
    const fileNode = getNode(node.parent)
    const date = node.frontmatter.date ? node.frontmatter.date : fileNode.mtime
    const visibility = node.frontmatter.visibility
      ? node.frontmatter.visibility
      : 'public'
    const excerpt = node.frontmatter.excerpt
      ? node.frontmatter.excerpt
      : node.excerpt

    // If you are adding new fields here, add it to createSchemaCustomization() as well.

    createNodeField({
      node,
      name: `slug`,
      value: `/${slug}`,
    })
    createNodeField({
      node,
      name: `fileName`,
      value: fileName,
    })
    createNodeField({
      node,
      name: `date`,
      value: date,
    })
    createNodeField({
      node,
      name: `title`,
      value: title.replace(/\//g, ``),
    })
    createNodeField({
      node,
      name: `excerpt`,
      value: excerpt,
    })
    createNodeField({
      node,
      name: `visibility`,
      value: visibility,
    })

    // :TODO: Add tags. Ideally, every supported frontmatter should be added as a field.
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  // Process for notes all public notes
  const result = await graphql(`
    query {
      allMdx(filter: { fields: { visibility: { eq: "public" } } }) {
        edges {
          node {
            fields {
              slug
              fileName
              title
              visibility
              excerpt
            }
            frontmatter {
              tags
              title
              date
              aliases
            }
            excerpt
            rawBody
            body
          }
        }
      }
      tags: allMdx(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)
  const allNotes = _.get(result, `data.allMdx.edges`)
  
  // Make a map of how notes link to other links. This is necessary to have back links and graph visualisation
  let refersTo = {} // refersTo['note title'] = ['note that "note title" linked to', 'another note that "note title" linked to', ...]
  let referredBy = {} // referredBy['note title'] = [{title: 'note that linked to "note title"' ...}, {title: 'another note that linked to "note title"', ...}, ...]

  let linkageCache = {} // Caches all linking. To prevent duplicate linking. Eg. linkageCache['note title->linked note'] = true

  const allNoteTitles = allNotes.map(note => note.node.fields.title) // A list of all note titles. Helps in finding the correct title in a case-insensitive manner.
  let allNotesByTitle = {}

  // I didn't used the much more cleaner foreach because the `refersTo` was not working well with that.
  for (let i = 0; i < result.data.allMdx.edges.length; i++) {
    const node = result.data.allMdx.edges[i].node

    const title = node.fields.title
    const slug = node.fields.slug
    const excerpt = node.fields.excerpt ? node.fields.excerpt : node.excerpt

    allNotesByTitle[title.toLowerCase()] = node

    // Go thru all the notes, create a map of how references map.

    const outgoingLinks = findReferences(node.rawBody) // All outgoing links from this note
    refersTo[title] = outgoingLinks.map(outTitle =>
      getPreExistingTitle(outTitle, allNoteTitles)
    )

    for (let j = 0; j < outgoingLinks.length; j++) {
      const tle = outgoingLinks[j]
      const linkTitle = getPreExistingTitle(tle, allNoteTitles)

      // Why this instead of just going thru the array to search? Optimizing. Might be premature. But, this function is already very slow.
      if (linkageCache[title + '->' + linkTitle] !== undefined) continue

      if (referredBy[linkTitle] === undefined) referredBy[linkTitle] = [] // If undefined, initialize

      referredBy[linkTitle].push({
        title: title,
        excerpt: excerpt,
        slug: slug,
        body: node.body
      })

      linkageCache[title + '->' + linkTitle] = true
    }
  }

  // Create page for all notes.
  for (let i = 0; i < result.data.allMdx.edges.length; i++) {
    const node = result.data.allMdx.edges[i].node
    const title = node.fields.title ? node.fields.title : node.frontmatter.title
    const aliases = node.frontmatter.aliases ? node.frontmatter.aliases : []

    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/note.jsx`),
      context: {
        title: title,
        slug: node.fields.slug,
        refersTo: refersTo[title] ? refersTo[title] : [],
        referredBy: referredBy[title] ? referredBy[title] : [],
        allNotesByTitle: allNotesByTitle
      },
    })

    // Handling Aliases
    for (let j = 0; j < aliases.length; j++) {
      createRedirect({
        fromPath: `/${makeSlug(aliases[j])}`,
        toPath: node.fields.slug,
        redirectInBrowser: true,
        isPermanent: true,
      })
    }

    if(node.fields.slug != '/' + makeSlug(node.fields.fileName)) { // If there is a custom slug, setup a redirect.
      createRedirect({
        fromPath: `/${makeSlug(node.fields.fileName)}`,
        toPath: node.fields.slug,
        redirectInBrowser: true,
        isPermanent: true,
      })
    }
  }

  createPage({
    path: `/note-map`,
    component: path.resolve(`./src/templates/note-map.jsx`),
    context: {
      allRefersTo: refersTo,
      allReferredBy: referredBy,
      allNotes: allNotes
    },
  })

  // Handle all tag pages.
  result.data.tags.group.forEach(tag => {
    const taggedNotes = allNotes.filter(note =>
      note.node.frontmatter.tags
        ? note.node.frontmatter.tags.includes(tag.fieldValue)
        : false
    )
    paginate({
      createPage,
      items: taggedNotes,
      itemsPerPage: 10,
      pathPrefix: `/tags/${makeSlug(tag.fieldValue)}`,
      component: path.resolve(`./src/templates/tag.jsx`),
      context: {
        tag: tag.fieldValue,
      },
    })
  })

  createPage({
    path: `/tags`,
    component: path.resolve(`./src/templates/tag-list.jsx`),
  })

  // Paginate Sitemap - that page has list of all notes
  paginate({
    createPage,
    items: allNotes,
    itemsPerPage: 10,
    pathPrefix: `/sitemap`,
    component: path.resolve(`./src/templates/sitemap.jsx`),
  })

  // Unlisted notes should be made a page.
  const privateNotes = await graphql(`
    query {
      allMdx(filter: { fields: { visibility: { eq: "unlisted" } } }) {
        edges {
          node {
            fields {
              slug
              title
              visibility
              excerpt
            }
            frontmatter {
              tags
              title
              date
              aliases
            }
            excerpt
            rawBody
          }
        }
      }
    }
  `)
  for (let i = 0; i < privateNotes.data.allMdx.edges.length; i++) {
    const node = privateNotes.data.allMdx.edges[i].node
    const title = node.fields.title ? node.fields.title : node.frontmatter.title

    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/note.jsx`),
      context: {
        title: title,
        slug: node.fields.slug,
        refersTo: refersTo[title] ? refersTo[title] : [],
        referredBy: referredBy[title] ? referredBy[title] : [],
      },
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    """
    Markdown Node
    """
    type Mdx implements Node @infer {
      frontmatter: Frontmatter
      fields: Fields
    }

    """
    Markdown Fields
    """
    type Fields @infer {
      title: String
      date: Date @dateformat
      slug: String
      visibility: String
      excerpt: String
    }

    """
    Markdown Frontmatter
    """
    type Frontmatter @infer {
      title: String
      fileName: String
      date: Date @dateformat
      tags: [String]
      aliases: [String]
      slug: String
      source: String
      visibility: String
      excerpt: String
    }
  `
  createTypes(typeDefs)
}

function findReferences(content) {
  // Handles both [[Note Title]] and [[Note Title|text to show]] formats
  const linkRegex = /\[\[([^\]\|]+)(\|.+)?\]\]/g
  const links = [...content.matchAll(linkRegex)]

  const matchedNotes = links.map(lnk => lnk[1])
  const uniqueNotes = _.uniqWith(
    matchedNotes,
    (a, b) => a.toLowerCase() === b.toLowerCase()
  ) // Returns only the unique notes - in an case insensitive manner

  // :TODO: Send a bit of text around the link back as well. Can be used in back links for context.
  // :TODO: This will break if custom slug is used.
  // :TODO: Handle # in the link - eg [[Note Title#section-3]]

  return matchedNotes
}

// This makes the keys case insensitive. [Permenent Notes] and [permenant notes] should be treated the same.
function getPreExistingTitle(title, obj) {
  const key = obj.find(key => key.toLowerCase() === title.toLowerCase())

  if (key === undefined) return title // If obj is empty(first time its called) or we didn't find any match.

  return key
}

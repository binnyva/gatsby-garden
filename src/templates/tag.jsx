import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../layout/layout"
import NoteList from "../components/note-list"

export default function Tag({ pageContext, data }) {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const heading = `${totalCount} note${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <Layout>
      <h1>{heading}</h1>

      <NoteList notes={edges} />

      <Link to="/tags">All tags</Link>
    </Layout>
  )
}

export const query = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
            title
            date(formatString: "DD MMMM, YYYY")
          }
          frontmatter {
            tags
          }
        }
      }
    }
  }
`
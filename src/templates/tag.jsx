import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../layout/layout"
import NoteList from "../components/note-list"
import Pager from "../components/pager"

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

      <Pager context={pageContext} />

      <p><Link to="/tags">See All tags</Link></p>
    </Layout>
  )
}

export const query = graphql`
  query($tag: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      skip: $skip
      limit: $limit
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
            title
            date
          }
          frontmatter {
            tags
          }
        }
      }
    }
  }
`
import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../layout/layout"
import NoteList from "../components/note-list"
import Pager from "../components/pager"

export default function Sitemap({ pageContext, data }) {

  return (
    <Layout>
      <h1>Sitemap</h1>

      <NoteList notes={data.notes.edges} />

      <Pager context={pageContext} />

      <Link to="/note-map">Map of All Notes</Link>
    </Layout>
  )
}

export const query = graphql`
query ($skip: Int!, $limit: Int!) {
  notes: allMarkdownRemark(
    skip: $skip
    limit: $limit
  ) {
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
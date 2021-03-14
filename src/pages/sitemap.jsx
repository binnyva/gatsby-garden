import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../layout/layout"
import NoteList from "../components/note-list"

export default function Sitemap({ data }) {
  return (
    <Layout>
      <h1>Sitemap</h1>
      
      <NoteList notes={data.allMarkdownRemark.edges} />

      <Link to="/note-map">Map of All Notes</Link>
    </Layout>
  )
}

export const query = graphql`
query {
  allMarkdownRemark {
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
import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../layout/layout'
import NoteList from '../components/note-list'
import Pager from '../components/pager'

export default function Sitemap({ pageContext, data }) {
  return (
    <Layout>
      <div className="column is-half">
        <h1>Sitemap</h1>

        <NoteList notes={data.notes.edges} />

        <Pager context={pageContext} />

        <Link to="/note-map">Map of All Notes</Link>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    notes: allMdx(
      skip: $skip
      limit: $limit
      filter: { fields: { visibility: { eq: "public" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            title
            date
            excerpt
          }
          frontmatter {
            tags
          }
        }
      }
    }
  }
`

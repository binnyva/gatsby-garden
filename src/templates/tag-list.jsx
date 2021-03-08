import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../layout/layout"
import kebabCase from "lodash/kebabCase"


export default function TagList({ data }) {
  return (
    <Layout>
      <h1>Tags</h1>

      <ul>
        {data.allMarkdownRemark.group.map(tag => (
          <li key={tag.fieldValue}>
            <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
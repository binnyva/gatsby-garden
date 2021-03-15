import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../layout/layout"
import kebabCase from "lodash/kebabCase"
import "../styles/tag-list.css"

export default function TagList({ data }) {
  let tagList = data.allMarkdownRemark.group
  tagList.sort((a, b) => { return b.totalCount - a.totalCount })

  return (
    <Layout>
      <h1>Tags</h1>

      <ul>
        {tagList.map(tag => (
          <li key={tag.fieldValue} className="tags">
            <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} <span className="badge">{tag.totalCount}</span>
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
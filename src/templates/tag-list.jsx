import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../layout/layout'
import kebabCase from 'lodash/kebabCase'
import '../styles/tag-list.css'

export default function TagList({ data }) {
  let tagList = data.allMdx.group
  tagList.sort((a, b) => {
    return b.totalCount - a.totalCount
  })

  return (
    <Layout title="All Tags" type="tag">
      <div className="column is-half">
        <h1>All Tags</h1>

        <ul>
          {tagList.map(tag => (
            <li key={tag.fieldValue} className="tag-name">
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} <span className="badge">{tag.totalCount}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`

import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../layout/layout"

export default function Tag({ pageContext, data }) {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const heading = `${totalCount} note${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <Layout>
      <h1>{heading}</h1>

      <ul>
        {edges.map(({ node }) => {
          const { slug,title } = node.fields
          return (
            <li key={ slug }>
              <Link to={ slug }>{ title }</Link>
            </li>
          )
        })}
      </ul>

      <Link to="/tags">All tags</Link>
    </Layout>
  )
}

export const query = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            title
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
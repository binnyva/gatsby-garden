import React from "react"
import { graphql,Link } from "gatsby"
import Layout from "../layout/layout"
import kebabCase from "lodash/kebabCase"

export default function Note({ pageContext, data }) {
  const post = data.markdownRemark
  return (
    <Layout>
      <h1>{ post.frontmatter.title ? post.frontmatter.title : pageContext.title }</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />

      { post.frontmatter.tags ? (
        <div id="tags">
          <h3>Tagged with:</h3>
          <ul>
          {post.frontmatter.tags.map((tag, index) => (
            <li key={index}><Link to={`/tags/${kebabCase(tag)}`}>{tag}</Link></li>
          ))}
          </ul>
        </div>
      ) : null }

      { pageContext.referredBy ? (
        <div id="back-links">
          <h3>Reffered By</h3>
          <ul>
          {pageContext.referredBy.map((title, index) => (
            <li key={index}><Link to={`/${kebabCase(title)}`}>{title}</Link></li>
          ))}
          </ul>
        </div>
        ) : null }
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        tags
        date(formatString: "DD MMMM, YYYY")
      }
    }
  }
`
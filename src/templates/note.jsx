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

      <div id="tags">
        <h3>Tagged with:</h3>
        <ul>
        {data.markdownRemark.frontmatter.tags.map((tag, index) => (
          <li key={index}><Link to={`/tags/${kebabCase(tag)}`}>{tag}</Link></li>
        ))}
        </ul>
      </div>
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
import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../layout/layout"

export default function Sitemap({ data }) {
  return (
    <Layout>
      <h1>Sitemap</h1>
      <Link to="/note-map">Map of All Notes</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Tags</th>
            <th>Published On</th>
          </tr>
        </thead>
        <tbody>
          {data.allMarkdownRemark.edges.map(( data, index ) => (
            <tr key={index}>
              <td><Link to={`${data.node.fields.slug}`}>{data.node.fields.title}</Link></td>
              <td>{data.node.frontmatter.tags ? 
                data.node.frontmatter.tags.map((tag, index) => (
                  <span key={index}>
                    <Link to={`\tags\${tag}`}>#{tag}</Link>
                    { index < data.node.frontmatter.tags.length - 1 ? ", " : "" }
                  </span>
                )) 
                : "No Tags" }</td>
              <td>{data.node.fields.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export const query = graphql`
query {
  allMarkdownRemark {
    edges {
      node {
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
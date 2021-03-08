import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../layout/layout"
export default function MyFiles({ data }) {
  console.log(data)

  return (
    <Layout>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Tags</th>
              <th>Updated Time</th>
            </tr>
          </thead>
          <tbody>
            {data.allMarkdownRemark.edges.map(( data, index ) => (
              <tr key={index}>
                <td><Link to={`/${data.node.fields.slug}/`}>{data.node.frontmatter.title}</Link></td>
                <td>{data.node.frontmatter.tags}</td>
                <td>{data.node.frontmatter.date}</td>
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
        }
        frontmatter {
          title
          tags
          date
        }
      }
    }
  }
}
`
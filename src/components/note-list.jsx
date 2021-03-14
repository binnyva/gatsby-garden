import React from "react"
import { Link, graphql } from "gatsby"

export default function NoteList({ notes }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Excerpt</th>
          <th>Tags</th>
          <th>Published</th>
        </tr>
      </thead>
      <tbody>
        {notes.map(( data, index ) => (
          <tr key={index}>
            <td><Link to={`${data.node.fields.slug}`}>{data.node.fields.title}</Link></td>
            <td>{data.node.excerpt}</td>
            <td>{data.node.frontmatter && data.node.frontmatter.tags ? 
              data.node.frontmatter.tags.map((tag, index) => (
                <span key={index}>
                  <Link to={`/tags/${tag}`}>#{tag}</Link>
                  { index < data.node.frontmatter.tags.length - 1 ? ", " : "" }
                </span>
              )) 
              : "No Tags" }</td>
            <td nowrap="nowrap">{data.node.fields.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
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
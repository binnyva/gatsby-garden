import React from "react"
import { Link } from "gatsby"
import "../styles/note.css"

export default function NoteList({ notes }) {
  return (<div className="note-list">{notes.map(( data, index ) => (
    <div className="note-area" key={index}>
      <h3><Link to={ `${data.node.fields.slug}` }>{data.node.fields.title}</Link></h3>
      <p>{ data.node.excerpt }</p>
      <p>Tagged with: { data.node.frontmatter && data.node.frontmatter.tags ?
        data.node.frontmatter.tags.map((tag, index) => (
          <span key={index}>
            <Link to={ `/tags/${tag}` }>#{tag}</Link>
            { index < data.node.frontmatter.tags.length - 1 ? ", " : "" }
          </span>
        ))
        : "No Tags" }</p>
      <p>Published on {data.node.fields.date}</p>
    </div>
  ))}</div>)
}

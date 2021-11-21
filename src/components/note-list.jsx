import React from 'react'
import { Link, navigate } from 'gatsby'
import '../styles/note.css'
const moment = require('moment')

export default function NoteList({ notes }) {
  return (
    <div className="block note-cards note-list">
      {notes.map((data, index) => (
        <div
          className="note-area box-feed"
          key={index}
          role="button"
          tabIndex={index}
          onClick={() => {
            navigate(data.node.fields.slug)
          }}
          onKeyDown={event => {
            if (event.keycode === 13) navigate(data.node.fields.slug)
          }}
        >
          <h4 className="note-title">
            <Link to={`${data.node.fields.slug}`}>
              {data.node.fields.title}
            </Link>
          </h4>
          <p className="note-excerpt">
            {data.node.fields.excerpt
              ? data.node.fields.excerpt
              : data.node.excerpt}
          </p>
          <p className="note-tag-list">
            Tagged with:{' '}
            {data.node.frontmatter && data.node.frontmatter.tags
              ? data.node.frontmatter.tags.map((tag, index) => (
                  <span key={index}>
                    <Link to={`/tags/${tag}`}>#{tag}</Link>
                    {index < data.node.frontmatter.tags.length - 1 ? ', ' : ''}
                  </span>
                ))
              : 'No Tags'}
          </p>
          <p className="note-date">
            Published on {moment(new Date(data.node.fields.date)).fromNow()}
          </p>
        </div>
      ))}
    </div>
  )
}

import React from 'react'
import { Link } from 'gatsby'
import '../styles/pager.css'

export default function Pager({ context }) {
  return (
    <div className="pager">
      {context.previousPagePath ? (
        <Link to={context.previousPagePath}>&lt; Previous </Link>
      ) : null}
      {context.nextPagePath ? (
        <Link to={context.nextPagePath}> Next &gt;</Link>
      ) : null}
    </div>
  )
}

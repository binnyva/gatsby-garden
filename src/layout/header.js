import React from "react"
import { useStaticQuery,graphql,Link } from "gatsby"

export default function Header({ title }) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  return <h1><Link to={`/`}>{data.site.siteMetadata.title } { title ? ` : ${title}` : null }</Link></h1>
}

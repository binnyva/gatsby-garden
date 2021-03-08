import React from "react"
import { useStaticQuery,graphql } from "gatsby"

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

  return <h1>{ data.site.siteMetadata.title } { title ? ` : ${title}` : null }</h1>
}

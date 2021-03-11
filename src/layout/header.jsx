import React from "react"
import { useStaticQuery,graphql,Link } from "gatsby"
import { Helmet } from "react-helmet"

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

  return (
    <>
      <Helmet>
          <meta charSet="utf-8" />
          <title>{data.site.siteMetadata.title }</title>
        </Helmet>
      <h1><Link to={`/`}>{data.site.siteMetadata.title } { title ? ` : ${title}` : null }</Link></h1>
    </>
  )
}

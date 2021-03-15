import React from "react"
import { useStaticQuery,graphql } from "gatsby"
import Layout from "../layout/layout"
import Menu from "../components/menu"

export default function Home() {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `)

  return (
    <Layout title="Home">
      <h1>{ data.site.siteMetadata.title }</h1>
      <p className="lead">{ data.site.siteMetadata.description }</p>

      <h3>Table Of Contents</h3>
      <Menu />

    </Layout>
  )
}

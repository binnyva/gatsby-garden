import React from "react"
import Layout from "../layout/layout"
import Menu from "../components/menu"
import siteConfig from "../../gatsby-config"

export default function Home() {
  // :TODO: Is there a siteConfig.siteMetadata.

  return (
    <Layout title="Home">
      <h1>{ siteConfig.siteMetadata.title }</h1>
      <p className="lead">{ siteConfig.siteMetadata.description }</p>

      <h3>Table Of Contents</h3>
      <Menu />

    </Layout>
  )
}

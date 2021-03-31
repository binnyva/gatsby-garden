import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../layout/layout"
import Menu from "../components/menu"
import siteConfig from "../../gatsby-config"

export default function Home() {
  const post = useStaticQuery(graphql`
		query HomeQuery {
			markdownRemark(fields: { slug: { eq: "/home" } }) {
		      html
		      fields {
		        title
		        date(formatString: "DD MMMM, YYYY")
		      }
		      frontmatter {
		        tags
		      }
		    }
		}`)

  console.log(post)

  return post.markdownRemark ? (
  		<Layout title={post.markdownRemark.fields.title}>
  			<div className="note-area">
	        <h1 className="note-title">{ post.markdownRemark.fields.title }</h1>
	        <div className="note-content" dangerouslySetInnerHTML={{ __html: post.markdownRemark.html }}></div>
        </div>
      </Layout>
  	) : (
	    <Layout title="Home">
	      <h1>{ siteConfig.siteMetadata.title }</h1>
	      <p className="lead">{ siteConfig.siteMetadata.description }</p>

	      <h3>Table Of Contents</h3>
	      <Menu />

	    </Layout>
  )
}

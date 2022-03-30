import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../layout/layout'
import siteConfig from '../../gatsby-config'
import NoteList from '../components/note-list'
import Search from '../components/search'
import '../styles/index.css'
import { DefaultMenuStructure, MenuRoot } from '../utils/menu-structure'

export default function Home() {
  const data = useStaticQuery(graphql`
    query HomeQuery {
      homeNote: mdx(frontmatter: {slug: {eq: "home"}}) {
        body
        fields {
          title
          date
        }
        frontmatter {
          tags
        }
      }
      notes: allMdx(
        filter: { fields: { visibility: { eq: "public" } } }
        limit: 5
        sort: { fields: fields___date, order: DESC }
      ) {
        edges {
          node {
            excerpt
            fields {
              slug
              title
              date
            }
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `)

  let tagList = DefaultMenuStructure('tag-list')
  tagList.push({ // Add a link to a page that shows all tags.
    type:'page',
    item:'tags',
    title: '...',
    liClassName: 'pill'
  })

  return data.homeNote ? (
    <Layout title={data.homeNote.fields.title} type="home">
      <div className="column is-half">
        <div className="note-area">
          <h1 className="note-title">{data.homeNote.fields.title}</h1>
          <div className="note-content">
            <MDXRenderer>{ data.homeNote.body }</MDXRenderer>
          </div>
        </div>
      </div>
    </Layout>
  ) : (
    <Layout title="Home" type="home">
      <div className="column is-half">
        <div className="block">
          <h1>{siteConfig.siteMetadata.title}</h1>
          <p className="lead">{siteConfig.siteMetadata.description}</p>
        </div>

        <div className="block tag-list">
          <MenuRoot menu={tagList} />
        </div>

        <div className="block">
          <Search size="medium" showExcerpt={true} />
        </div>

        <div className="block">
          <NoteList notes={data.notes.edges} />
        </div>

        <br />
        <Link to="/sitemap">All Notes...</Link>
      </div>
    </Layout>
  )
}

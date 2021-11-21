import React from 'react'
import { graphql, Link, navigate } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Graph } from 'react-d3-graph'
import Layout from '../layout/layout'
import '../styles/note.css'
import '../styles/graph.css'
const makeSlug = require('../utils/make-slug')
const moment = require('moment')

export default function Note({ pageContext, data }) {
  const post = data.mdx

  // Create the data for the graph visualisation for the note linking.
  const graphData = {
    nodes: [{ id: post.fields.title, color: 'black' }],
    links: [],
    focusedNodeId: post.fields.title,
  }

  // Links to the current Note
  for (let i = 0; i < pageContext.referredBy.length; i++) {
    const refNoteTitle = pageContext.referredBy[i].title
    graphData.nodes.push({ id: refNoteTitle })
    graphData.links.push({ source: refNoteTitle, target: post.fields.title })
  }

  // Links from the current Note
  for (let i = 0; i < pageContext.refersTo.length; i++) {
    const refNoteTitle = pageContext.refersTo[i]
    graphData.nodes.push({ id: refNoteTitle })
    graphData.links.push({ source: post.fields.title, target: refNoteTitle })
  }

  // If this is an orphan note(no links to and from other notes), we need some hackery to get it to work.
  if (graphData.nodes.length === 1) {
    graphData.nodes.push({ id: 'No Links', color: '#eee', fontColor: '#999' })
    graphData.links.push({
      source: post.fields.title,
      target: 'No Links',
      color: '#eee',
    })
  }

  const onClickNode = function (nodeId) {
    if (nodeId === 'Unlinked') return
    const slug = makeSlug(nodeId)
    navigate(`/${slug}`)
  }

  // the graph configuration, just override the ones you need
  const graphConfig = {
    automaticRearrangeAfterDropNode: true,
    directed: true,
    initialZoom: 1.4,
    // nodeHighlightBehavior: true,
    node: {
      color: 'gray',
      size: 120,
      fontSize: 10,
    },
  }

  return (
    <Layout title={post.fields.title} type="note">
      <div className="column is-three-fifths">
        <main>
          <div className="note-area note-page-section">
            <div className="buttons for-back-home">
              <Link className="button is-text button__page-back" to="/">
                <span className="icon is-small">
                  <svg
                    width="12"
                    height="20"
                    viewBox="0 0 12 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.0309 0.468998C11.1007 0.538667 11.1561 0.62143 11.1939 0.712548C11.2318 0.803665 11.2512 0.901347 11.2512 0.999998C11.2512 1.09865 11.2318 1.19633 11.1939 1.28745C11.1561 1.37857 11.1007 1.46133 11.0309 1.531L2.56038 10L11.0309 18.469C11.1717 18.6098 11.2508 18.8008 11.2508 19C11.2508 19.1992 11.1717 19.3902 11.0309 19.531C10.89 19.6718 10.699 19.7509 10.4999 19.7509C10.3007 19.7509 10.1097 19.6718 9.96887 19.531L0.968875 10.531C0.899031 10.4613 0.843616 10.3786 0.805806 10.2874C0.767997 10.1963 0.748535 10.0986 0.748535 10C0.748535 9.90135 0.767997 9.80367 0.805806 9.71255C0.843616 9.62143 0.899031 9.53867 0.968875 9.469L9.96887 0.468998C10.0385 0.399153 10.1213 0.343739 10.2124 0.305929C10.3035 0.26812 10.4012 0.248657 10.4999 0.248657C10.5985 0.248657 10.6962 0.26812 10.7873 0.305929C10.8784 0.343739 10.9612 0.399153 11.0309 0.468998Z"
                      fill="var(--text-main)"
                    />
                  </svg>
                </span>
              </Link>
            </div>

            <h1 className="note-title">{post.fields.title}</h1>
            <div className="note-content">
              <MDXRenderer>{post.body}</MDXRenderer>
            </div>

            <div className="note-meta">
              {pageContext.referredBy.length ? (
                <div className="related note-references">
                  <h5 className="block-title">Links to this note</h5>
                  <div className="related-wrapper">
                    {pageContext.referredBy.map((note, index) => (
                      <div key={index} className="related-group">
                        <Link to={`/${makeSlug(note.title)}`}>
                          <h4>{note.title}</h4>
                          <p className="related-excerpt">{note.excerpt}</p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="related block-area">
                <h5 className="block-title">Meta</h5>
                <div className="related-wrapper">
                  <div className="related-group">
                    <p>
                      <strong className="note-meta-title">Published on: </strong>{' '}
                      {moment(new Date(post.fields.date)).format('Do MMMM, YYYY')}
                    </p>
                    {post.frontmatter.source ? (
                      <Source src={post.frontmatter.source} />
                    ) : null}

                    {post.frontmatter.tags ? (
                      <div className="note-tags">
                        <strong className="note-meta-title">
                          Tagged With:{' '}
                        </strong>
                        <ul>
                          {post.frontmatter.tags.map((tag, index) => (
                            <li key={index}>
                              <Link to={`/tags/${makeSlug(tag)}`}>{tag}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="note-graph">
              <Graph
                id="note-link-graph"
                data={graphData}
                config={graphConfig}
                onClickNode={onClickNode}
              />
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}

function Source({ src }) {
  if (!src) return null

  // :TODO: Handle a list of sources and not just a single source

  let link = ''
  if (src.includes('<a ')) {
    // Source given as HTML Link
    link = <span dangerouslySetInnerHTML={{ __html: src }}></span>
  } else if (src.includes('](')) {
    // Source given as Markdown Link - [Text](url)
    const linkParts = src.match(/\[(.+)\]\((.+)\)/)
    if (linkParts) {
      link = (
        <a href={linkParts[2]} target="_blank" rel="noreferrer">
          {linkParts[1]}
        </a>
      )
    } else {
      return null
    }
  } else if (src.includes('[[')) {
    // Source given as Wiki Link - internal link - [[Text]]
    const titleParts = src.match(/(.+)\|(.+)/) // [[Note Name|Link Text]] format.
    if (titleParts) {
      link = <Link to={'/' + makeSlug(titleParts[2])}>{titleParts[1]}</Link>
    } else {
      const title = src.replace(new RegExp(/[\[\]]/, 'g'), '') // eslint-disable-line
      link = <Link to={'/' + makeSlug(title)}>{title}</Link>
    }
  } else {
    // Just an URL given as source
    link = (
      <a href={src} target="_blank" rel="noreferrer">
        Link to Source
      </a>
    )
  }

  return (
    <p>
      <strong className="note-meta-title">Source</strong>: {link}
    </p>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      fields {
        title
        date
      }
      frontmatter {
        tags
        source
      }
    }
  }
`

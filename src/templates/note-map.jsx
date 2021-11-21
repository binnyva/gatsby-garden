import React from 'react'
import { Link, navigate } from 'gatsby'
import { Graph } from 'react-d3-graph'
import Layout from '../layout/layout'
import '../styles/graph.css'
const makeSlug = require('../utils/make-slug')

export default function Note({ pageContext }) {
  // Create the data for the graph visualisation for the note linking.
  const graphData = {
    nodes: Object.keys(pageContext.allRefersTo).map((key, index) => {
      return { id: key }
    }),
    links: [],
  }

  graphData.nodes.push({ id: 'No Links', color: '#eee', fontColor: '#999' }) // All unlinked notes will link to this. So that the graphing library will render it properly.

  // Set up the linkages between the notes.
  for (let noteTitle in pageContext.allRefersTo) {
    const refNoteTitles = pageContext.allRefersTo[noteTitle]

    for (let i in refNoteTitles) {
      const refNoteTitle = refNoteTitles[i]

      // Show links to only the notes that exists. There will be some linking to non existing notes - that will break the graph.
      if (pageContext.allRefersTo[refNoteTitle] !== undefined) {
        graphData.links.push({ source: noteTitle, target: refNoteTitle })
      }
    }

    // If this is an orphan note(no links to and from other notes), we need some hackery to get it to work.
    if (
      !pageContext.allRefersTo[noteTitle]?.length &&
      !pageContext.allReferredBy[noteTitle]?.length
    ) {
      graphData.links.push({
        source: noteTitle,
        target: 'No Links',
        color: '#eee',
      })
    }
  }

  const onClickNode = function (nodeId) {
    const slug = makeSlug(nodeId)
    navigate(`/${slug}`)
  }

  // the graph configuration, just override the ones you need
  const graphConfig = {
    // automaticRearrangeAfterDropNode: true,
    directed: false, // If true, highlighting on mouseover will also be directed
    // initialZoom: 1.4,
    highlightDegree: 2,
    nodeHighlightBehavior: true,
    linkHighlightBehavior: true,
    collapsible: true,
    height: 800,
    width: 1100,

    node: {
      color: 'gray',
      size: 120,
      fontSize: 10,
      highlightFontSize: 10,
      highlightFontWeight: 'bold',
      highlightStrokeColor: 'black',
      highlightStrokeWidth: 1.5,
      labelPosition: 'top',
    },
    link: {
      highlightColor: 'black',
    },

    d3: {
      alphaTarget: 0.05,
      gravity: -250,
      linkLength: 120,
      linkStrength: 2,
      disableLinkForce: false,
    },
  }

  return (
    <Layout>
      <div className="column is-half">
        <h1>Knowledge Graph</h1>

        <p>
          Total Notes:{' '}
          <Link to="/sitemap">
            <strong>{Object.keys(pageContext.allRefersTo).length}</strong>
          </Link>
        </p>

        <div id="graph-container">
          <Graph
            id="all-note-link-graph"
            data={graphData}
            config={graphConfig}
            onClickNode={onClickNode}
          />
        </div>
      </div>
    </Layout>
  )
}

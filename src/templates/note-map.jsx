import React from 'react'
import { Link, navigate } from 'gatsby'
// import { Graph } from 'react-d3-graph'
import Graph from "react-graph-vis"
import Layout from '../layout/layout'
import '../styles/graph.css'

export default function NoteMap({ pageContext }) {

    // Create the data for the graph visualisation for the note linking.
  const graph = {
    nodes: Object.keys(pageContext.allRefersTo).map((title) => {
      return { id: title, label: title }
    }),
    edges: []
  }

  // Set up the linkages between the notes.
  for (let noteTitle in pageContext.allRefersTo) {
    const refNoteTitles = pageContext.allRefersTo[noteTitle]

    for (let i in refNoteTitles) {
      const refNoteTitle = refNoteTitles[i]

      // Show links to only the notes that exists. There will be some linking to non existing notes - that will break the graph.
      if (pageContext.allRefersTo[refNoteTitle] !== undefined) {
        // graphData.links.push({ source: noteTitle, target: refNoteTitle })
        graph.edges.push({ from: noteTitle, to: refNoteTitle })
      }
    }
  }

  const options = {
    nodes: {
      shape: "dot",
      size: 8,
      font: {
        color: "#999",
      },
      color: {
        border: "#aaa",
        background: "#aaa",
        highlight: {
          border: "#ddd",
          background: "#999",
        }
      }
    },
    edges: {
      color: {
        border: "#aaa"
      },
      arrows: "middle",
    },
    height: 600
  }

  const events = {
    select: function(event) {
      const { nodes } = event
      const nodeId = nodes[0].toLowerCase();
      const node = pageContext.allNotes.find(
        obj => obj.node.fields.title.toLowerCase() === nodeId
      )
      navigate(node.node.fields.slug)
    }
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
            graph={graph}
            options={options}
            events={events}
          />
        </div>
      </div>
    </Layout>
  )
}

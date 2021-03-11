import React from "react"
import { Link,navigate } from "gatsby"
import { Graph } from "react-d3-graph";
import Layout from "../layout/layout"
import "./graph.css"
const makeSlug = require("../utils/make-slug")

export default function Note({ pageContext }) {

  // Create the data for the graph visualisation for the note linking.
  const graphData = {
    nodes: Object.keys(pageContext.referenceMap).map( (key,index) => { return {id: key} } ),
    links: [],
  }

  for(let noteTitle in pageContext.referenceMap) {
    const refNoteTitles = pageContext.referenceMap[noteTitle]

    for(let i in refNoteTitles) {
      const refNoteTitle = refNoteTitles[i]
      graphData.links.push({source: noteTitle, target: refNoteTitle })
    }
  }

  const onClickNode = function(nodeId) {
    const slug = makeSlug(nodeId)
    navigate(`/${slug}`)
  };

  // the graph configuration, just override the ones you need
  const graphConfig = {
    // automaticRearrangeAfterDropNode: true,
    directed: false, // If true, highlighting on mouseover will also be directed
    // initialZoom: 1.4,
    highlightDegree: 2,
    nodeHighlightBehavior: true,
    linkHighlightBehavior: true,
    collapsible: true,
    
    node: {
      color: "gray",
      size: 120,
      fontSize: 10,
      highlightFontSize: 10,
      highlightFontWeight: "bold",
      highlightStrokeColor: "black",
      highlightStrokeWidth: 1.5,
      labelPosition: "top",
    },
    link: {
      highlightColor: "black",
    },

    d3: {
      alphaTarget: 0.05,
      gravity: -250,
      linkLength: 120,
      linkStrength: 2,
      disableLinkForce: false
    },
  };

  return (
    <Layout>
      <h1>All Notes</h1>

      <p>Total Notes: <Link to="/sitemap"><strong>{ pageContext.referenceMap.length }</strong></Link></p>

      <div id="graph-container">
        <Graph
          id="all-note-link-graph"
          data={graphData}
          config={graphConfig}
          onClickNode={onClickNode}
        />
      </div>
    </Layout>
  )
}

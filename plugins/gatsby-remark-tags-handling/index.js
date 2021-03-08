/// NOT USED ANYMORE. CAN DELETE
const visit = require("unist-util-visit")
// const toString = require("mdast-util-to-string")

module.exports = async ({ markdownAST }, pluginOptions = {}) => {
  console.log('video embed!', JSON.stringify(markdownAST))

  visit(markdownAST, "heading", node => {
    let { depth } = node
    // Skip if not an h1
    if (depth !== 1) return

    // console.log("Heading: ", JSON.stringify( node ) ) // .children[0].value )

    // Grab the innerText of the heading node
    // let text = toString(node.value)
    const html = `
        <pre style="color: rebeccapurple">
          y - ${node.value} - y
        </pre>
      `
    node.type = "html"
    node.children = undefined
    node.value = html
  })
  return markdownAST
}

module.exports = async (api, pluginOptions) => {
	console.log(api, pluginOptions);
	
	// const result = await graphql(`
	//     query {
	//       allMarkdownRemark {
	//         edges {
	//           node {
	//             fields {
	//               slug
	//               title
	//             }
	//             frontmatter {
	//               title
	//               tags
	//               date
	//             }
	//             rawMarkdownBody
	//             excerpt
	//             fileAbsolutePath
	//           }
	//         }
	//       }
	//       tags: allMarkdownRemark(limit: 2000) {
	//         group(field: frontmatter___tags) {
	//           fieldValue
	//         }
	//       }
	//     }
	//   `)

}
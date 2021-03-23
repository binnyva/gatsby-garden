import siteConfig from "../../gatsby-config"
import { useStaticQuery, graphql } from "gatsby"

export const DefaultMenuStructure = () => {
	let structure = [ // Default Menu.
	  {type: 'page',item: '',title: 'Home'},
	  {type: 'page',item: 'sitemap'},
	  {type: 'page',item: 'tags'},
	]

	// If nothing exists, use the default menu, with a few mods.
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query {
	    allMarkdownRemark(limit: 2000) {
	      group(field: frontmatter___tags) {
	        fieldValue
	        totalCount
	      }
	    }
	  }
    `
  )

	if(siteConfig.siteMetadata.menu !== undefined) { // If main menu exists in the config, use that.
	  structure = siteConfig.siteMetadata.menu
	} else if(siteConfig.siteMetadata.headerMenu !== undefined) { // If not, use the header menu.
	  structure = siteConfig.siteMetadata.headerMenu
	} else {
	  let tagList = allMarkdownRemark.group.sort((a, b) => { return b.totalCount - a.totalCount }).slice(0, 10) // Get the top 5 tags.
	  structure[2].menu = tagList.map((tag) => { return {type:'tag', item:tag.fieldValue} })
	}

	return structure
}

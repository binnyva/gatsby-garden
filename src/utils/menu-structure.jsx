import React from 'react'
import siteConfig from '../../gatsby-config'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { camelCase, startCase } from 'lodash'

export const DefaultMenuStructure = (menuType = 'main') => {
  const defaultStructure = [
    // Default Menu.
    { type: 'page', item: '', title: 'Home' },
    { type: 'page', item: 'sitemap' },
    { type: 'page', item: 'tags' },
  ]
  let structure = null

  // If nothing exists, use the default menu, with a few mods.
  const { allMdx } = useStaticQuery(
    graphql`
      query {
        allMdx(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
            totalCount
          }
        }
      }
    `
  )

  if (menuType === 'main') {
    if (siteConfig.siteMetadata.menu !== undefined) {
      structure = siteConfig.siteMetadata.menu
    } else if (siteConfig.siteMetadata.headerMenu !== undefined) {
      // If not, use the header menu.
      structure = siteConfig.siteMetadata.headerMenu
    }
  } else if (menuType === 'header') {
    if (siteConfig.siteMetadata.headerMenu !== undefined) {
      structure = siteConfig.siteMetadata.headerMenu
    } else if (siteConfig.siteMetadata.menu !== undefined) {
      structure = siteConfig.siteMetadata.menu
    }
  } else if (menuType === 'tag-list') {
    let tagList = allMdx.group
      .sort((a, b) => {
        return b.totalCount - a.totalCount
      })
      .slice(0, 20) // Get the top 20 tags.

    if (tagList.length) {
      structure = tagList.map(tag => {
        return { type: 'tag', item: tag.fieldValue, liClassName: 'pill' }
      })
    } else {
      structure = null
    }
  }

  // If no menu exists, create a custom menu.
  if (structure === null) {
    // Do NOT create a standard menu it structure === false
    structure = defaultStructure

    let tagList = allMdx.group
      .sort((a, b) => {
        return b.totalCount - a.totalCount
      })
      .slice(0, 10) // Get the top 10 tags.

    if (tagList.length) {
      structure[2].menu = tagList.map(tag => {
        return { type: 'tag', item: tag.fieldValue }
      })
    } else {
      // If no tags, don't show the tag section.
      structure.splice(2, 1)
    }
  }

  return structure
}

export function MenuRoot({ menu }) {
  return (
    <ul>
      {menu.map((item, index) => (
        <MenuItem item={item} key={index} />
      ))}
    </ul>
  )
}

export function MenuItem({ item, className }) {
  let itm
  if (item.type === 'page')
    itm = <MenuItemPage item={item} className={className} />
  else if (item.type === 'tag')
    itm = <MenuItemTag item={item} className={className} />
  else if (item.type === 'note')
    itm = <MenuItemNote item={item} className={className} />
  else if (item.type === 'link')
    itm = <MenuItemExternalLink item={item} className={className} />
  else if (item.type === 'text')
    itm = <MenuItemText item={item} className={className} />

  return (
    <li className={item.liClassName ? item.liClassName : null}>
      {itm}
      {item.menu ? <MenuRoot menu={item.menu} /> : null}
    </li>
  )
}

export function MenuItemPage({ item, className }) {
  return (
    <Link className={className} to={`/${item.item}`}>
      {item.title ? item.title : startCase(camelCase(item.item))}
    </Link>
  )
}

export function MenuItemNote({ item, className }) {
  return (
    <Link className={className} to={`/${item.item}`}>
      {item.title ? item.title : startCase(camelCase(item.item))}
    </Link>
  )
}

export function MenuItemTag({ item, className }) {
  return (
    <Link className={className} to={`/tags/${item.item.toLowerCase()}`}>
      {item.title ? item.title : startCase(camelCase(item.item))}
    </Link>
  )
}

export function MenuItemText({ item, className }) {
  return (
    <span className={className}>
      {item.title ? item.title : startCase(camelCase(item.item))}
    </span>
  )
}

export function MenuItemExternalLink({ item, className }) {
  return (
    <a className={className} href={item.item}>
      {item.title ? item.title : startCase(camelCase(item.item))}
    </a>
  )
}

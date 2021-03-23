import React from "react"
import { Link } from "gatsby"
import siteConfig from "../../gatsby-config"
import { camelCase, startCase } from "lodash"
import { DefaultMenuStructure } from "../utils/menu-structure"

export default function Menu() {
  let menuData = DefaultMenuStructure()

  if(siteConfig.siteMetadata.menu !== undefined) { // If main menu exists in the config, use that.
    menuData = siteConfig.siteMetadata.menu
  } else if(siteConfig.siteMetadata.headerMenu !== undefined) { // If not, use the header menu.
    menuData = siteConfig.siteMetadata.headerMenu
  }

  return (<div className="garden-menu">
    <RootMenu menu={menuData} />
  </div>)
}

function RootMenu({ menu }) {
  return (<ul>{ menu.map((item,index) => <MenuItem item={item} key={index} />) }</ul>)
}

function MenuItem({ item }) {
  let itm
  if(item.type === 'page') itm = <Page item={item} />
  else if(item.type === 'tag') itm = <Tag item={item} />
  else if(item.type === 'note') itm = <Note item={item} />
  else if(item.type === 'link') itm = <ExternalLink item={item} />

  return (<li>{ itm }{ item.menu ? <RootMenu menu={ item.menu } /> : null }</li>)
}

function Page({ item }) {
  return (<Link to={ `/${item.item}`}>{ item.title ? item.title : startCase(camelCase(item.item)) }</Link>)
}

function Note({ item }) {
  return (<Link to={ `/${item.item}`}>{ item.title ? item.title : startCase(camelCase(item.item)) }</Link>)
}

function Tag({ item }) {
  return (<Link to={ `/tags/${item.item}`}>{ item.title ? item.title : startCase(camelCase(item.item)) }</Link>)
}

function ExternalLink({ item }) {
  return (<a href={ `/tags/${item.item}`}>{ item.title ? item.title : startCase(camelCase(item.item)) }</a>)
}

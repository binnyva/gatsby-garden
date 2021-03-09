import React from "react"
import { Link } from "gatsby"
import site_config from "../../gatsby-config"
import { camelCase, startCase } from "lodash"

export default function Menu() {
  let menu_structure = [
    {
      type: 'page',
      item: '',
      title: 'Home'
    },
    {
      type: 'page',
      item: 'tags'
    },
    {
      type: 'page',
      item: 'sitemap'
    }
  ]

  if(site_config.siteMetadata.menu !== undefined) {
    menu_structure = site_config.siteMetadata.menu
  }

  return (<div className="garden-menu">
    <MenuStructure menu={menu_structure} />
  </div>)
}

function MenuStructure({ menu }) {
  return (<ul>{ menu.map((item,index) => <MenuItem item={item} key={index} />) }</ul>)
}

function MenuItem({ item }) {
  let itm
  if(item.type === 'page') itm = <Page item={item} />
  else if(item.type === 'tag') itm = <Tag item={item} />
  else if(item.type === 'note') itm = <Note item={item} />

  return (<li>{ itm }{ item.menu ? <MenuStructure menu={ item.menu } /> : null }</li>)
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

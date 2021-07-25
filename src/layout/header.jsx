import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import { startCase, camelCase } from "lodash"
import { useFlexSearch } from 'react-use-flexsearch'
import siteConfig from "../../gatsby-config"
import {
  DefaultMenuStructure,
  MenuItemPage,
  MenuItemText,
  MenuItemNote,
  MenuItemTag,
  MenuItemExternalLink,
} from "../utils/menu-structure"

import DarkMode from "../components/dark-mode"

export default function Header({ title }) {
  // Needed for search functionality
  const searchStore = useStaticQuery(graphql`
    {
      localSearchNotesIndex {
        index
        store
      }
    }`)

  const index = searchStore.localSearchNotesIndex.index
  const store = searchStore.localSearchNotesIndex.store

  const [query, setQuery] = React.useState('')
  const results = useFlexSearch(query, index, store)

  const menu = DefaultMenuStructure("header")

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {(siteConfig.siteMetadata.title || "Gatsby Garden") +
            (title ? ` : ${title}` : "")}
        </title>
      </Helmet>

      <span>{ searchStore.localSearchNotesIndex.publicStoreURL }</span>

      <nav className="navbar navbar-expand-md navbar fixed-top">
        <Link className="navbar-brand" to="/">
          {siteConfig.siteMetadata.title || "Gatsby Garden"}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#default-navbar"
          aria-controls="default-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">...</span>
        </button>

        <div className="collapse navbar-collapse" id="default-navbar">
          <ul className="navbar-nav mr-auto">
            {menu.map((item, index) => {
              return item.menu ? (
                <li className="nav-item dropdown" key={index}>
                  <Link
                    className="nav-link dropdown-toggle"
                    to={`/${item.item}`}
                    id={`dropdown-${item.item}`}
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {item.title ? item.title : startCase(camelCase(item.item))}
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby={`dropdown-${item.item}`}
                  >
                    {item.menu.map((sub_item, sub_index) => {
                      return (
                        <MenuItem
                          className="nav-link"
                          item={sub_item}
                          key={sub_index}
                        />
                      )
                    })}
                  </div>
                </li>
              ) : (
                <li className="nav-item" key={index}>
                  <MenuItem className="nav-link" item={item} />
                </li>
              )
            })}
            <li className="nav-link">
              <DarkMode />
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0" id="search-form" action="/">
            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search..." 
              name="filter" value={query} onChange={(event) => setQuery(event.target.value)} />
            { results.length ? 
              <div className="search-results">
                <ul>
                  {results.map((result) => (
                    <li key={result.slug}><Link to={result.slug}>{result.title}</Link></li>
                  ))}
                </ul>
                <button className="close-search button-link" onClick={() => setQuery("")}>Close</button>
              </div> : null }
          </form>
        </div>
      </nav>
    </>
  )
}

function MenuItem({ item, className }) {
  let itm
  if (item.type === "page")
    itm = <MenuItemPage item={item} className={className} />
  else if (item.type === "tag")
    itm = <MenuItemTag item={item} className={className} />
  else if (item.type === "note")
    itm = <MenuItemNote item={item} className={className} />
  else if (item.type === "link")
    itm = <MenuItemExternalLink item={item} className={className} />
  else if (item.type === "text")
    itm = <MenuItemText item={item} className={className} />

  return itm
}

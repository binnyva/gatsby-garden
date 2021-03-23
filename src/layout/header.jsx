import React from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import { startCase, camelCase } from "lodash"
import siteConfig from "../../gatsby-config"
import { DefaultMenuStructure } from "../utils/menu-structure"

export default function Header({ title }) {
  const menu = DefaultMenuStructure()

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{ (siteConfig.siteMetadata.title || "Gatsby Garden") + (title ? ` : ${title}` : "" ) }</title>
      </Helmet>

      <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
        <Link className="navbar-brand" to="/">{ siteConfig.siteMetadata.title || "Gatsby Garden" }</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#default-navbar" aria-controls="default-navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="default-navbar">
          <ul className="navbar-nav mr-auto">
            { menu.map((item, index) => {
              return item.menu ?
                (<li className="nav-item dropdown" key={index}>
                    <Link className="nav-link dropdown-toggle" to={`/${item.item}`} id={`dropdown-${item.item}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      { item.title ? item.title : startCase(camelCase(item.item)) }
                    </Link>
                    <div className="dropdown-menu" aria-labelledby={`dropdown-${item.item}`}>
                      {item.menu.map((sub_item, sub_index) => {
                        return (<MenuItem item={sub_item} key={sub_index} />)
                      })}
                    </div>
                  </li>)
                : (<li className="nav-item" key={index}>
                    <MenuItem item={item} />
                  </li>)
            })}
          </ul>
          {/* <form className="form-inline my-2 my-lg-0" action="/">
            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" name="filter" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form> */}
        </div>
      </nav>
    </>
  )
}

function MenuItem({ item }) {
  let itm
  if(item.type === 'page') itm = <Page item={item} />
  else if(item.type === 'tag') itm = <Tag item={item} />
  else if(item.type === 'note') itm = <Note item={item} />
  else if(item.type === 'link') itm = <ExternalLink item={item} />

  return itm
}

function Page({ item }) {
  return (<Link className="nav-link" to={ `/${item.item}`}>{ item.title ? item.title : startCase(camelCase(item.item)) }</Link>)
}

function Note({ item }) {
  return (<Link className="nav-link" to={ `/${item.item}`}>{ item.title ? item.title : startCase(camelCase(item.item)) }</Link>)
}

function Tag({ item }) {
  return (<Link className="nav-link" to={ `/tags/${item.item}`}>{ item.title ? item.title : startCase(camelCase(item.item)) }</Link>)
}

function ExternalLink({ item }) {
  return (<a className="nav-link" href={ item.item }>{ item.title ? item.title : startCase(camelCase(item.item)) }</a>)
}

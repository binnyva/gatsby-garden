import React from 'react'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import { startCase, camelCase } from 'lodash'
import siteConfig from '../../gatsby-config'
import Search from '../components/search'
import {
  DefaultMenuStructure,
  MenuItemPage,
  MenuItemText,
  MenuItemNote,
  MenuItemTag,
  MenuItemExternalLink,
} from '../utils/menu-structure'

import DarkMode from '../components/dark-mode'

export default function Header({ title, type, description }) {
  const menu = DefaultMenuStructure('header')
  const pageTitle =
    (siteConfig.siteMetadata.title || 'Gatsby Garden') +
    (title ? ` : ${title}` : '')

  const handleHamburgerMenuClick = e => {
    const target_id = e.currentTarget.getAttribute('data-target')
    const target = document.getElementById(target_id)

    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    e.currentTarget.classList.toggle('is-active')
    target.classList.toggle('is-active')
  }

  // :TODO:
  // <meta content="{{ site.url }}{{ page.url }}" property="og:url"> - NOTE: site.url might NOT be there in the config file.

  return (
    <>
      <Helmet>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content={siteConfig.siteMetadata.title} property="og:site_name" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,600;1,400;1,600&amp;display=swap"
          rel="stylesheet"
        />
        <meta content={title ? title : pageTitle} property="og:title" />
        {description ? (
          <meta content={description} property="og:description" />
        ) : null}

        {type === 'note' ? (
          <meta content="article" property="og:type"></meta>
        ) : (
          <meta content="website" property="og:type"></meta>
        )}

        <title>{pageTitle}</title>

        <link rel="apple-touch-icon" href="/img/favicon.png" />
        <link
          rel="icon"
          href="/img/favicon.png"
          type="image/png"
          sizes="16x16"
        />
        {/*
          These are included using gatsby-browser.js - if I include these like shown here, there is a horrible FOUC
        <link href="/css/style.css" rel="stylesheet" media="all" className="default" />
        <link href="/css/main.css" rel="stylesheet" media="all" className="default" />
        <link href="/css/custom.css" rel="stylesheet" media="all" className="default" />
        <link href="/css/Util.css" rel="stylesheet" media="all" className="default" />
        */}
      </Helmet>

      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <svg
              width="32"
              height="32"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M36.9477 13.7742C38.3043 11.4086 41.6957 11.4086 43.0523 13.7742L70.5226 61.6774C71.8791 64.043 70.1834 67 67.4703 67H12.5297C9.81658 67 8.12089 64.043 9.47744 61.6774L36.9477 13.7742ZM40 16.9677L13.7506 62.7419H66.2494L40 16.9677Z"
                fill="var(--text-main)"
              />
            </svg>
            <h4>{siteConfig.siteMetadata.title || 'Gatsby Garden'}</h4>
          </Link>
          <div className="navbar-item navbar-dark-mode__mobile is-hidden-tablet">
            <DarkMode />
          </div>
          <button
            className="navbar-burger button-link"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar-main"
            onClick={handleHamburgerMenuClick}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div className="navbar-menu" id="navbar-main">
          <div className="navbar-start">
            {menu.map((item, index) => {
              return item.menu ? (
                <span key={index} className="navbar-item dropdown">
                  <Link
                    to={`/${item.item}`}
                    id={`dropdown-${item.item}`}
                    className="dropdown-toggle"
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
                    {item.menu.map((subItem, subIndex) => {
                      return (
                        <MenuItem
                          className="navbar-item"
                          item={subItem}
                          key={subIndex}
                        />
                      )
                    })}
                  </div>
                </span>
              ) : (
                <MenuItem className="navbar-item" item={item} key={index} />
              )
            })}
          </div>
          <div className="navbar-end is-hidden-mobile">
            <div className="navbar-item">
              <Search size="small" showExcerpt={false} />
            </div>
            <div className="navbar-item">
              <DarkMode />
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

function MenuItem({ item, className }) {
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

  return itm
}

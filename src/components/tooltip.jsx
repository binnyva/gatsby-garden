import React from 'react'
import { Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from "@mdx-js/react"
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import '../styles/tooltip.css'
import siteConfig from '../../gatsby-config'

export default function Tooltip({ children, content}) {

  if(siteConfig.siteMetadata.hoverPreview) { // Show the preview only if enabled in the config - hoverPreview
    return (<Tippy content={ (<MDXProvider components={{ a: DefaultLink }}>
                <MDXRenderer>{ content }</MDXRenderer>
              </MDXProvider>) } interactive="true" allowHTML="true" placement="bottom-start" delay="300">
              { children }
            </Tippy>)
  } else {
    return children
  }
}

// This is to disable the tooltips with the tooltip.
const DefaultLink = (props) => {
  if(props.href.includes("http")) { // External link
    // eslint-disable-next-line
    return <a { ...props } />
  } else {
    return <Link { ...props } to={ `/${props.href}` } />
  }
}

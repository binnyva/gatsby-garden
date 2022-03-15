import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import siteConfig from '../../gatsby-config'

export default function Tooltip({ children, content}) {

  if(siteConfig.siteMetadata.hoverPreview) {
    return (<Tippy content={ (<MDXRenderer>{ content }</MDXRenderer>) } interactive="true" allowHTML="true" placement="bottom-start" delay="300">
              { children }
            </Tippy>)
  } else {
    return children
  }
}

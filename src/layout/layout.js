import React from "react"
import Header from "./header"

export default function Layout({ children, title }) {
  return (
		<div id="layout">
			<Header title={ title } />
			{ children }
		</div>
	)
}
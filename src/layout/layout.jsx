import React from "react"
import Header from "./header"

export default function Layout({ children, title }) {
  return (
    <>
      <Header title={title} />
      <main role="main" className="container mt-3">
        {children}
      </main>
    </>
  )
}

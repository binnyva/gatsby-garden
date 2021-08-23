import React from 'react'
import Header from './header'

export default function Layout({ children, title, type }) {
  return (
    <>
      <Header title={title} type={type} />
      <section className="section">
        <div className="columns is-centered">
          <div className="column is-half">
            {children}
          </div>
        </div>
      </section>
    </>
  )
}

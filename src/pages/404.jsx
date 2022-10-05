import React from 'react'
import Layout from '../layout/layout'
import Menu from '../components/menu'

export default function NotFound() {
  return (
    <Layout title="404 - Note Not Found 😉">
      <h3>Can't find the note you are looking for.</h3>

      <p class="lead">Try finding it using the menu, or use the search bar.</p>
      <Menu />
    </Layout>
  )
}

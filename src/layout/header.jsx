import React from "react"
import { useStaticQuery,graphql,Link } from "gatsby"
import { Helmet } from "react-helmet"

export default function Header({ title }) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{ (data.site.siteMetadata.title || "Gatsby Garden") + (title ? ` : ${title}` : "" ) }</title>
      </Helmet>

      <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
        <Link className="navbar-brand" to="/">{ data.site.siteMetadata.title || "Gatsby Garden" }</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#default-navbar" aria-controls="default-navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="default-navbar">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/sitemap">Sitemap</Link></li>
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

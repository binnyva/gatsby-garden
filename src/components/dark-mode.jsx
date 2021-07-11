import React from "react"
import { ThemeToggler } from "gatsby-plugin-dark-mode"

class DarkMode extends React.Component {
  render() {
    return (
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <label>
            <input
              type="checkbox"
              onChange={e => toggleTheme(e.target.checked ? "dark" : "light")}
              checked={theme === "dark"}
              hidden
            />
            {theme === "dark" ? 
              <div><span role="img" aria-label="sun">🌞</span> Mode </div> 
              : <div><span role="img" aria-label="moon">🌙</span> Mode</div>}
          </label>
        )}
      </ThemeToggler>
    )
  }
}

export default DarkMode

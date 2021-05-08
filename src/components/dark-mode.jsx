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
            {theme === "dark" ? (
              <div>
                <span role="img" aria-label="sun with face">
                  🌞
                </span>{" "}
                mode
              </div>
            ) : (
              <div>
                <span role="img" aria-label="crescent moon">
                  🌙
                </span>{" "}
                mode
              </div>
            )}
          </label>
        )}
      </ThemeToggler>
    )
  }
}

export default DarkMode

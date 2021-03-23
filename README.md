# Gatsby Garden

Gatsby Garden lets you create a static html version of your markdown notes. You can convert your Obsidian Zettelkasten Notes into a public Digital Garden.

## Features

- Support for wiki links - \[\[Note Name\]\]
- Graph visualization of linkages between notes
- Backlinks of all notes displayed at the bottom of the note
- Tagging supported
- Sitemap, RSS Feed, Home Page generated automatically

## Getting Started

Prerequisites

For this to work, you'll need node, npm, git and Gatsby. You can install gatsby using this command....

```
npm install -g gatsby-cli
```

Once you have install the necessary tools, you can create a new site using `gatsby-garden` using this command...

```
gatsby new my-garden https://github.com/binnyva/gatsby-garden
```

In this example, my-garden is the name of your site. You can test it using this command...

```
cd my-garden
gatsby develop
```

Add Notes to `_notes` folder

Edit `gatsby-config.js` file

Run command `gatsby develop` to see your digital garden. Go to http://localhost:8000/

To generate the static version of your site, run `gatsby build`





## Frontmatter Support

These properties are supported in the frontmatter of your notes...

- slug
- title
- date
- alias
- tags

## References

- <https://github.com/johno/digital-garden>
- <https://github.com/mathieudutour/gatsby-digital-garden>
- <https://www.gatsbyjs.com/plugins/@westegg/gatsby-theme-digital-garden/>
- <https://www.gatsbyjs.com/plugins/gatsby-theme-networked-thought/>
- <https://www.gatsbyjs.com/plugins/gatsby-theme-garden/>
- <https://www.gatsbyjs.com/plugins/@maiertech/gatsby-theme-digital-garden/>


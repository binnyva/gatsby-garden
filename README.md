# Gatsby Garden

Gatsby Garden lets you **create a static HTML version of your markdown notes**. You can convert your Obsidian Zettelkasten Notes into a public Digital Garden.

To see an example site built using Gatsby Garden, visit my [Digital Garden](https://notes.binnyva.com/)

## Features

- Support for wiki links - \[\[Note Name\]\]
- Graph visualization of linkages between notes
- Backlinks at the bottom of the note
- Tagging supported
- Sitemap, RSS Feed, Home Page generated automatically

## Getting Started

### Prerequisites

To use this tool, you'll need [node](https://nodejs.org/en/download/), [npm](https://www.npmjs.com/get-npm) and [git](https://git-scm.com/downloads) installed on your system.

### Installation

Once you have installed the necessary tools, you can **create a new site using `gatsby-garden` using this command**...

```
git clone https://github.com/binnyva/gatsby-garden my-garden
```

In this example, `my-garden` is the name of your site. You can test it using this command...

```
cd my-garden
npm install --legacy-peer-deps
npm run develop
```

If everything went fine, you should see `gatsby-garden` running in your browser at <http://localhost:8000/>.

### Configuration

Once gatsby-garden has been installed, **add your markdown notes to the `_notes` folder**. Make sure you delete all the sample notes there first. If you are using Obsidian to create notes, you can set the `_notes` folder to be a shortcut/link to the Obsidian vault. If you don't do that, you'll have to copy over all the notes from the vault to the `_notes` folder everytime you want to make a static build of your notes.

Edit `gatsby-config.js` file and add your site details to the `siteMetaData` section. Few supported values are...

```js
module.exports = {
  pathPrefix: `/notes`, // If your site has to be published at a non-root location, use this to specify the base folder. You'll see this in effect ONLY when you build the site with the 'gatsby build --prefix-paths' command. See <https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/> for more details.
  siteMetadata: {
    title: `Website Name`,
    description: `Short Description about the website`,
    siteUrl: `https://yoursite.com/notes/`, // URL at which your site will be published
    headerMenu: [ // Top Navbar items
      {type: 'page', item: '', title: 'Home'}, // Type can be 'page', 'note', 'tag', 'text' or 'link'
      {type: 'page', item: 'sitemap', title: 'Sitemap'},
      {type: 'page', item: 'rss.xml', title: 'RSS'},
      {
        type: 'page', item: 'tags', title: 'Tags',
        menu: [ // Only one level depth, please.
          {type: 'tag',item: 'programming'},
          {type: 'tag',item: 'philosophy'},
          {type: 'tag',item: 'psychology'},
          {type: 'tag',item: 'rationality'},
        ]
      },
    ],

    menu: [ // This is the Table of Contents that comes in the home page if a homeNote is not specified. It can be much longer than the header menu.
    //   ... Same structure as headerMenu. You can have any depth level - multiple menus can be nested.
    ]
  },
```

#### Home Page Customization

If you want to set any note as your Home Note(the first page that shows up when you open the site), just give the `home` slug. You can do this by adding this to that note's frontmatter...

```
slug: "home"
```

### Building

Once you are done with the configuration, you can **generate the static version of your site**. Use this command to do it...

```
npm run build
```

PS: You'll need to use `gatsby build --prefix-paths` if you are using a sub-directory for publishing your content.

### Modifying

If you want to change something, edit the code in the `src` folder. You'll need a bit of JavaScript knowledge to do this. To do this well, you'll need to know how [Gatsby works](https://www.gatsbyjs.com/docs/tutorial/).

You can test your modifications using this command...

```
npm run develop
```

## The Notes

The notes in the `_notes` folder have to be in markdown format. Ideally, in this format...

```markdown
---
title: 'Zettelkasten'
tags: ['zettelkasten', 'pkm', 'notes', 'learning']
date: 2021-01-20 19:30:00
---

Zettelkasten is a note taking process and a [[knowledge management system]].
```

The top part(within the `---`) is called frontmatter. Its the metadata about the note. This should be in YAML format. The following properties are supported...

- **slug** : This will show up in the URL of the note
- **title** : Title of the note. If not provided, uses the file name of the note
- **date** : Date the note was published.
- **aliases** : List of aliases of this note
- **tags** : List of tags that this note is tagged with.

[Obsidian](https://obsidian.md/) will create notes in this format.

## Contributing

One of the reasons I built this tool is to learn Gatsby. If you know what Gatsby and want to help with this project, I'm more than excited to get some expert help :-D. If you are interested in helping out, go to the [Contributing page](https://github.com/binnyva/gatsby-garden/blob/master/CONTRIBUTING.md).

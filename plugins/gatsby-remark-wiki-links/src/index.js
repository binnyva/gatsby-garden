/*
If you need to reenable this plugin, add...

```
gatsbyRemarkPlugins: [
    {
      resolve: require.resolve('./plugins/gatsby-remark-wiki-links'),
      options: {
        slugify: `${__dirname}/src/utils/make-slug.js`,
        stripBrackets: true
      }
    },

    OR this...

    {
       resolve: `gatsby-remark-wiki-links`,
       options: {
         slugify: `${__dirname}/src/utils/make-slug.js`,
         stripBrackets: true
       }
    },

```
in the `gatsby-config.js` file

Want to add more features? Get these things(<https://www.gatsbyjs.com/plugins/gatsby-remark-obsidian/>)...
- [] [[Internal link#heading]]
- [] [[Internal link#heading|With custom text]]
- [] ![[Embed note]]
- [] ![[Embed note#heading]]
*/

var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const visit = __importDefault(require('unist-util-visit'))
const _ = __importDefault(require('lodash'))

// Mostly Taken from https://github.com/mathieudutour/gatsby-digital-garden/tree/master/packages/gatsby-remark-double-brackets-link

const defaultSlugify = title => {
  const segments = title.split('/')
  let slugifiedTitle = _.kebabCase(segments.pop())
  slugifiedTitle = slugifiedTitle.replace(/^(.+)\|.+$/, '$1') // If the link is in format of [[Linked Note|Display Text]]
  return `${segments.join('/')}/${slugifiedTitle}`
}

module.exports = async ({ cache, markdownAST }, pluginOptions) => {
  const slugify = (
    pluginOptions === null || pluginOptions === void 0
      ? void 0
      : pluginOptions.slugify
  )
    ? require(pluginOptions.slugify)
    : defaultSlugify
  const definitions = {}

  visit.default(markdownAST, `definition`, node => {
    if (!node.identifier || typeof node.identifier !== 'string') {
      return
    }
    definitions[node.identifier] = true
  })

  visit.default(markdownAST, `linkReference`, (node, index, parent) => {
    if (
      node.referenceType !== 'shortcut' ||
      (typeof node.identifier === 'string' && definitions[node.identifier])
    ) {
      return
    }

    const siblings = parent.children
    if (!siblings || !Array.isArray(siblings)) {
      return
    }
    const previous = siblings[index - 1]
    const next = siblings[index + 1]
    if (!previous || !next) {
      return
    }
    if (
      previous.type !== 'text' ||
      previous.value[previous.value.length - 1] !== '[' ||
      next.type !== 'text' ||
      next.value[0] !== ']'
    ) {
      return
    }
    previous.value = previous.value.replace(/\[$/, '')
    next.value = next.value.replace(/^\]/, '')
    node.type = 'link'
    node.url = slugify(node.label)
    node.label = node.label.replace(/^.+\|(.+)$/, '$1') // If the link is in format of [[Linked Note|Display Text]]
    node.title = node.label

    if (
      !(pluginOptions === null || pluginOptions === void 0
        ? void 0
        : pluginOptions.stripBrackets) &&
      Array.isArray(node.children)
    ) {
      node.children[0].value = `[[${node.label}]]`
    } else if (Array.isArray(node.children)) {
      node.children[0].value = node.label
    }

    delete node.label
    delete node.referenceType
    delete node.identifier
  })

  return markdownAST
}

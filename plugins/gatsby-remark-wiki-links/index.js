const visit = require("unist-util-visit")
const _ = require("lodash")

const defaultSlugify = (title) => {
    const segments = title.split('/');
    let slugifiedTitle = _.kebabCase(segments.pop());
    slugifiedTitle = slugifiedTitle.replace(/^(.+)\|.+$/, '$1'); // If the link is in format of [[Linked Note|Display Text]]
    return `${segments.join('/')}/${slugifiedTitle}`;
};

module.exports = async ({ markdownAST }, pluginOptions) => {
  const slugify = (pluginOptions === null || pluginOptions === void 0 ? void 0 : pluginOptions.slugify) ? require(pluginOptions.slugify) : defaultSlugify;
  const definitions = {};

  visit(markdownAST, `definition`, (node) => {
      if (!node.identifier || typeof node.identifier !== "string") {
          return;
      }
      definitions[node.identifier] = true;
  });

  visit(markdownAST, `linkReference`, (node, index, parent) => {
    if (node.referenceType !== "shortcut" ||
        (typeof node.identifier === "string" && definitions[node.identifier])) {
        return;
    }
    const siblings = parent.children;
    if (!siblings || !Array.isArray(siblings)) {
        return;
    }
    const previous = siblings[index - 1];
    const next = siblings[index + 1];
    if (!previous || !next) {
        return;
    }
    if (previous.type !== "text" ||
        previous.value[previous.value.length - 1] !== "[" ||
        next.type !== "text" ||
        next.value[0] !== "]") {
        return;
    }
    previous.value = previous.value.replace(/\[$/, "");
    next.value = next.value.replace(/^\]/, "");
    node.type = "link";
    node.url = slugify(node.label);
    node.label = node.label.replace(/^.+\|(.+)$/, '$1'); // If the link is in format of [[Linked Note|Display Text]]
    node.title = node.label

    if (!(pluginOptions === null || pluginOptions === void 0 ? void 0 : pluginOptions.stripBrackets) && Array.isArray(node.children)) {
      node.children[0].value = `[[${ node.label }]]`;
    } else if(Array.isArray(node.children)) {
      node.children[0].value = node.label;
    }

    delete node.label;
    delete node.referenceType;
    delete node.identifier;
  });

  return markdownAST
}

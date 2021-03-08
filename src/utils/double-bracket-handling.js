const _ = require('lodash')

module.exports = (title) => {
	// console.log("IN", title, _.kebabCase(title))
	return `/${_.kebabCase(title)}`
}
var React = require('./react/index')
var extend = require('xtend')

module.exports = make_react_options

function make_react_options(render, _state, _props, _extra) {
	var state = _state || {}
	var props = _props || {}
	var result = {
			getInitialState: function() { return state },
			getDefaultProps: function() { return props },
			render: render || default_render
	}

	return extend(result, _extra)
}

function default_render() {
	return React.createElement('span')
}
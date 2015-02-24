var React = require('./react/index')
var extend = require('xtend')

module.exports = make_react_options

function make_react_options(render, _initial, _extra) {
	var result = {}
	var extra = _extra || {}
	var initial =  _initial || {}

	result.render = render || function () {
		return React.createElement('span')
	}

	result.getInitialState = extra.getInitialState || function() {
		return initial
	}

	return extend(result, extra)
}
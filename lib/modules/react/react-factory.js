var React = require('./')
var extend = require('xtend')

var make_react_options = require('../make-react-options')

module.exports = make_factory

function make_factory(render, _initial, _props, _extra) {
	var react_options = make_react_options(render, _initial, _props, _extra)
	react_options.unrender = unrender

	var _factory = React.createFactory(React.createClass(react_options))

	return react_factory

	function react_factory(el, props, children) {
		var args = [].slice.call(arguments, 1)
		return React.render(_factory(props, children), el)
	}

	function unrender() {
			React.unmountComponentAtNode(parent_el)
		}
}

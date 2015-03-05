var React = require('./')
var extend = require('xtend')
var make_react_options = require('../make-react-options')

module.exports = make_component

function make_component(parent_el, render, _initial, _props, _extra) {
	var react_options = make_react_options(render, _initial, _props, _extra)

	react_options.parent_el = parent_el
	react_options.unrender = unrender

	return React.render(React.createElement(
		React.createClass(react_options), null
	), parent_el)

	function unrender() {
		React.unmountComponentAtNode(parent_el)
	} 
}

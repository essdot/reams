var React = require('react')
var extend = require('xtend')

module.exports = make_component

function make_component(parent_el, render, _initial, _extra) {
	var react_options = extend({
		getInitialState: function() { return _initial || {} },
		render: render
	}, _extra)

	var component = React.render(React.createElement(
		React.createClass(react_options), null
	), parent_el)

	component.parent_el = parent_el
	component.unrender = function unrender() {
		React.unmountComponentAtNode(parent_el)
	} 

	return component
}

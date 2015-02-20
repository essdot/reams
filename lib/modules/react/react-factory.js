var React = require('./')
var extend = require('xtend')

module.exports = make_factory

function make_factory(render, _initial, _react_options) {
	var react_options = extend({
		getInitialState: function() { return _initial || {} },
		render: render,
		unrender: function unrender() {
			React.unmountComponentAtNode(parent_el)
		}
	}, _react_options)

	var _class = React.createClass(react_options)
	var _factory = React.createFactory(_class)

	return react_factory

	function react_factory(el, props, children) {
		var args = [].slice.call(arguments, 1)
		return React.render(_factory(props, children), el)
	}
}

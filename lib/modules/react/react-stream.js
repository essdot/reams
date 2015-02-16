var React = require('react')
var through = require('through')
var extend = require('xtend')

var make_component = require('./react-component')

module.exports = make_stream

function make_stream(el, render, _initial, _react_options) {
	var stream = through(write, end)
	var react_options = make_react_options(_react_options)
	var component = make_component(el, render, _initial, react_options)

	stream.component = component

	return stream

	function write(data) {
		component.setState(data)
	}

	function end() {
		component.unrender()
	}

	function make_react_options(_react_options) {
		return extend({
			componentDidMount: function() {
				stream.emit('componentDidMount', this)
			},
			componentWillMount: function() {
				stream.emit('componentWillMount', this)
			},
			componentWillUnmount: function() {
				stream.emit('componentWillUnmount', this)
			},
			componentWillReceiveProps: function(next_props) {
				stream.emit('componentWillReceiveProps', this, next_props)
			},
			componentWillUpdate: function(next_props, next_state) {
				stream.emit(
					'componentWillUpdate',
					this,
					next_props,
					next_state
				)
			},
			componentDidUpdate: function(prev_props, prev_state) {
				stream.emit(
					'componentDidUpdate',
					this,
					prev_props,
					prev_state
				)
			}
		}, _react_options)
	}
}
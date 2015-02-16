var React = require('react')
var through = require('through')
var extend = require('xtend')

var evs = require('dom-event-stream')
var values = require('dom-value-stream')

var react_stream = require('../modules/react/react-stream')

module.exports = react_slider

function react_slider(parent_el, _initial, _react_options) {
	var react = make_react_stream(parent_el, _initial, _react_options)
	var stream = through(write, end)

	evs(parent_el, 'change', '[type=range]')
		.pipe(values())
		.pipe(stream)

	react.on('componentDidUpdate', function(component, prevProps, prevState) {
		component.getDOMNode().value = '' + component.state.value
	})

	stream.component = react.component

	return stream

	function write(data) {
		react.write({value: data})
		stream.queue(data)
	}

	function end() {
		react.end()
	}
}

function render() {
	var val =  this.state.value
	var min =  this.props.min
	var max =  this.props.max

	return React.createElement('input', {
		type: 'range',
		defaultValue: val,
		min: min,
		max: max
	})
}

function make_react_stream(parent_el, _initial, _react_options) {
	var initial_state = {value: _initial || 0 }
	var react_options = extend({
		getDefaultProps: function() {
			return {min: 0, max: 100}
		}
	}, _react_options)

	return react_stream(parent_el, render, initial_state, react_options)
}

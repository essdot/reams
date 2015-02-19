var through = require('through')
var extend = require('xtend')

var evs = require('dom-event-stream')
var values = require('dom-value-stream')

var react_stream = require('../modules/react/react-stream')
var template = require('../templates/react-slider.rt')

module.exports = react_slider

function react_slider(parent_el, _initial) {
	var react = make_react_stream(parent_el, _initial)
	var stream = through(write, end)

	evs(parent_el, 'input', '[type=range]')
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

function make_react_stream(parent_el, _initial) {
	var initial_state = {value: _initial || 0 }
	var react_options = {
		getDefaultProps: function() {
			return {min: 0, max: 100}
		}
	}

	return react_stream(
		parent_el,
		template,
		initial_state,
		react_options
	)
}

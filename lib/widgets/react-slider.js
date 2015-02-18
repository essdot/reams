var through = require('through')
var extend = require('xtend')

var evs = require('dom-event-stream')
var values = require('dom-value-stream')

var react_template_stream = require('../modules/react/react-template-stream')
var template = require('../templates/react-slider.rt')

module.exports = react_slider

function react_slider(parent_el, _initial, _react_options) {
	var react = make_react_stream(parent_el, _initial, _react_options)
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

function make_react_stream(parent_el, _initial, _react_options) {
	var initial_state = {value: _initial || 0 }
	var react_options = extend({
		getDefaultProps: function() {
			return {min: 0, max: 100}
		}
	}, _react_options)

	return react_template_stream(
		parent_el,
		template,
		initial_state,
		react_options
	)
}

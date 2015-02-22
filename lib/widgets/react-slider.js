var through = require('through')
var extend = require('xtend')

var evs = require('dom-event-stream')
var values = require('dom-value-stream')

var react_stream = require('../modules/react/react-stream')
var template = require('../templates/react-slider.rt')

module.exports = react_slider

function react_slider(parent_el, _initial) {
	var initial = _initial || 0
	var react = make_react_stream(parent_el, initial)
	var stream = through(write, end)

	stream.component = react.component

	update_input(initial)

	return stream

	function write(data) {
		react.write({value: data})
		update_input(data)
		stream.queue(data)
	}

	function update_input(val) {
		react.component.refs.input.value = '' + val
	}

	function end() {
		react.end()
	}

	function make_react_stream(parent_el, initial) {
		var initial_state = {value: initial || 0 }
		var react_options = {
			getDefaultProps: function() {
				return {min: 0, max: 100}
			},
			handleChange: function(ev) {
				stream.write(ev.target.value)
			}
		}

		return react_stream(
			parent_el,
			template,
			initial_state,
			react_options
		)
	}
}
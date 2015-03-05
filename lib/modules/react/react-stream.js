var React = require('./')
var through = require('through')
var extend = require('xtend')

var react_component = require('./react-component')

module.exports = make_stream

function make_stream(el, render, _initial, _props, _extra) {
	var stream = through(write, end)
	var component = make_component(el, render, _initial, _props, _extra)

	stream.component = component

	return stream

	function write(data) {
		component.setState(data)
	}

	function end() {
		component.unrender()
	}

	function make_component(el, render, _initial, _props, _extra) {
		var listeners = {
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
		}

		var extra = extend(listeners, _extra)

		return react_component(el, render, _initial, _props, extra)
	}
}
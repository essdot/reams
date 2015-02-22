var through = require('through')
var objectstate = require('objectstate')

var react_stream = require('../modules/react/react-stream')
var template = require('../templates/autocomplete.rt')
var toggle_class = require('../dom-utils/toggle-class')

var initial_state = {
	results: [],
	query: null,
	loading: false
}

module.exports = create_autocomplete

function create_autocomplete(el, query_stream) {
	var stream = through(write, end)
	var state = objectstate(initial_state)
	var react = make_react_stream()

	query_stream.on('data', function(data) {
	  state.set('loading', false)
	  state.set('results', data)
	})

	react.on('componentDidUpdate', function(component) {
		toggle_class(component.parent_el, 'loading', component.state.loading)
	})

	state.pipe(react)

	stream.parent_el = el
	stream.component = react.component

	return stream

	function write(query) {
		state.wait(function() {
			state.set('query', query)
			state.set('loading', true)
			state.set('results', [])
		})

		query_stream.write(query)
	}

	function end() {
		react.end()
	}

	function select_result_handler(result) {
		return function(ev) {
			if(ev) {
				ev.preventDefault()
				ev.stopPropagation()
			}

			stream.queue(result)
		}
	}

	function make_react_stream() {
		var react_options = {
			select_result_handler: select_result_handler,
			handleChange: on_input
		}

		return react_stream(el, template, state.state(), react_options)
	}

	function on_input(ev) {
		write(ev.target.value)
	}
}
var through = require('through')
var evs = require('dom-event-stream')
var values = require('dom-value-stream')
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
	var input_stream = evs(el, 'input', '[name=query]').pipe(values())
	var react = make_react_stream(el, query_stream)

  state.listen(input_stream, 'query')
  state.listen(query_stream, 'results')

	input_stream.on('data', function() {
	  state.set('loading', true)
	  state.set('results', [])
	})

	query_stream.on('data', function() {
	  state.set('loading', false)
	})

	react.on('componentDidUpdate', function(component) {
		toggle_class(component.parent_el, 'loading', component.state.loading)
	})

	input_stream.pipe(query_stream)
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

	function make_react_stream(el) {
		var react_options = {
			select_result_handler: select_result_handler
		}

		return react_stream(el, template, state.state(), react_options)
	}
}
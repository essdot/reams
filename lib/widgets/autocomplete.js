var through = require('through')
var evs = require('dom-event-stream')
var values = require('dom-value-stream')
var objectstate = require('objectstate')

var react_stream = require('../modules/react/react-stream')
var render = require('./autocomplete-template.jsx')

var initial_state = {
		results: [],
		query: null,
		loading: false
	}

module.exports = create_autocomplete

function create_autocomplete(el, query_stream) {
	var react_options = {
		select_result: select_result
	}

	var stream = through(write)
	var state = objectstate(initial_state)
	var input_stream = evs(el, 'input', '[name=query]').pipe(values())
	var component_stream = react_stream(el, render, initial_state, react_options)

  state.listen(input_stream, 'query')
  state.listen(query_stream, 'results')

	input_stream.on('data', function() {
	  state.set('loading', true)
	  state.set('results', [])
	})

	query_stream.on('data', function() {
	  state.set('loading', false)
	})

	input_stream.pipe(query_stream)
	state.pipe(component_stream)

	stream.parent_el = el
	stream.component = component_stream.component

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
		component_stream.end()
	}

	function select_result(result) {
		stream.queue(result)
	}
}
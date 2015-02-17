var through = require('through')
var evs = require('dom-event-stream')
var values = require('dom-value-stream')
var objectstate = require('objectstate')

var react_template_stream = require('../modules/react/react-template-stream')
var render = require('../renderers/autocomplete-render.jsx')
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
	var react_stream =
		react_template_stream(el, template, initial_state)

  state.listen(input_stream, 'query')
  state.listen(query_stream, 'results')

	input_stream.on('data', function() {
	  state.set('loading', true)
	  state.set('results', [])
	})

	query_stream.on('data', function() {
	  state.set('loading', false)
	})

	react_stream.on('componentDidUpdate', function(component) {
		toggle_class(component.parent_el, 'loading', component.state.loading)
	})

	input_stream.pipe(query_stream)
	state.pipe(react_stream)

	stream.parent_el = el
	stream.component = react_stream.component
	stream.component.select_result_handler = select_result_handler

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
		react_stream.end()
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
}
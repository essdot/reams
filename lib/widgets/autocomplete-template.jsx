var React = require('react')
var toggle_class = require('../modules/toggle-class')

module.exports = autocomplete_render

module.exports = function() {
	return autocomplete_render(this)
}

function autocomplete_render(component) {
	var state = component.state
	var select_result = component.select_result

	var template = (
		<div className="autocomplete-content">
			<input className="autocomplete-query" type="search" name="query"/>
			<ul className="autocomplete-results">
				{get_result_nodes()}
			</ul>

			{get_no_results_found()}
		</div>
	)

	toggle_class(component.parent_el, 'loading', state.loading)

	return template

	function get_result_nodes() {
		if(!state.results || !state.results.length) {
			return []
		}

		return state.results.map(function(result) {
			var clickHandler = function(ev) {
				ev.stopPropagation()
				ev.preventDefault()

				select_result(result)
			}

			return (
				<li key={result.id}>
					<a href="#" onClick={clickHandler}>
						{result.name}
					</a>
				</li>
			)
		})
	}

	function get_no_results_found() {
		var no_results =
			!state.results.length &&
			typeof state.query === 'string' &&
			!state.loading
		
		if(no_results) {
			return (
				<span className="info">No results found.</span>
			)
		}

		return null
	}
}
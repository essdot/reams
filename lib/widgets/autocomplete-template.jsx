var React = require('react')
var toggle_class = require('../../dom-utils/toggle-class')

module.exports = autocomplete_render

module.exports = function() {
	return autocomplete_render(this)
}

function autocomplete_render(component) {
	var state = component.state
	var select_result = component.select_result || function() {}

	var template = (
		<div className="autocomplete-content">
			<input className="autocomplete-query" type="search" name="query"/>
			<ul className="autocomplete-results">
				{state.results.map(function(result){ return (
				<li key={result.id}>
					<a href="#" onClick={click_handler(result)}>
						{result.name}
					</a>
				</li>
				)})}
			</ul>

			{ !state.results.length && typeof state.query === 'string' && !state.loading ?
			<span className="info">No results found.</span>
			: null}
		</div>
	)

	toggle_class(component.parent_el, 'loading', state.loading)

	return template

	function click_handler(result) {
		return function(ev) {
			ev.stopPropagation()
			ev.preventDefault()

			select_result(result)
		}
	}
}
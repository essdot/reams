var react_component = require('../modules/react/react-component')
var react_slider = require('./react-slider')
var template = require('../templates/onion-skin-compare.rt')

module.exports = make_onion_skin_compare

function make_onion_skin_compare(parent_el, img_1, img_2) {
	var component = make_react_component()
	var slider = react_slider(
		parent_el.querySelector('.slider-wrapper'),
		component.state.percent * 100
	)
	slider.on('data', function(data) {
		component.set_percent(Number(data) / 100)
	})

	component.setProps({slider: slider})

	return component

	function make_react_component() {
		var initial_state = calculate_percentages(.5)
		var props = {
			image_1: img_1,
			image_2: img_2
		}
		var extra = {
			parent_el: parent_el,
			set_percent: set_percent
		}

		return react_component(parent_el, template, initial_state, props, extra)
	}
}

function calculate_percentages(percent) {
	return {
		percent: percent,
		big_percent: percent * 100,
		reverse_big_percent: (1 - percent) * 100,
		percent_string: (percent * 100).toFixed() + '%',
		reverse_percent_string: ((1 - percent) * 100).toFixed() + '%'
	}
}

function set_percent(new_percent) {
	if(new_percent === this.state.percent) {
		return
	}

	if(typeof new_percent !== 'number' || !isFinite(new_percent)) {
		return
	}

	new_percent = Math.min(1, new_percent)
	new_percent = Math.max(0, new_percent)

	this.setState(calculate_percentages(new_percent), function() {
		this.props.slider.write(new_percent * 100)
	})
}

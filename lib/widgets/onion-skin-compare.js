var react_component = require('../modules/react/react-component')
var react_slider = require('./react-slider')
var template = require('../templates/onion-skin-compare.rt')
var through = require('through')

module.exports = make_onion_skin_compare

function make_onion_skin_compare(parent_el, img_1, img_2) {
	var component = make_react_component()
	var slider = make_slider()
	var stream = through(write_percent)

	slider.pipe(stream)

	component.setProps({slider: slider})
	stream.component = component

	return stream

	function make_react_component() {
		var initial_state = calculate_percentages(.5)
		var props = {image_1: img_1, image_2: img_2}
		var extra = {parent_el: parent_el}

		return react_component(parent_el, template, initial_state, props, extra)
	}

	function make_slider() {
		var slider_el = parent_el.querySelector('.slider-wrapper')
		return react_slider(slider_el, component.state.percent, 0, 1)
	}

	function write_percent(new_percent) {
		new_percent = Number(new_percent)

		if(new_percent === component.state.percent || !isFinite(new_percent)) {
			return
		}

		new_percent = Math.min(1, new_percent)
		new_percent = Math.max(0, new_percent)

		component.setState(calculate_percentages(new_percent), function() {
			component.props.slider.write(new_percent)
			stream.queue(new_percent)
		})
	}
}

function calculate_percentages(percent) {
	return {
		percent: percent,
		percent_string: (percent * 100).toFixed() + '%'
	}
}

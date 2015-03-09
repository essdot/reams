var react_component = require('../modules/react/react-component')
var template = require('../templates/swipe-compare.rt')
var mouse_state = require('../dom-utils/mouse-state')

module.exports = swipe_compare

function swipe_compare(parent_el, img_1, img_2) {
	var component = make_react_component()

	// parent_el.addEventListener('mousemove', function(ev) {
	// 	var l = ev.clientX - parent_el.offsetLeft
	// 	var percent = l / component.props.dimensions.width

	// 	if(mouse_state.mouse_down) {
	// 		component.set_percent(percent)
	// 	}
	// })

	return component

	function make_react_component() {
		var initial_state = calculate_percentages(.5)
		var props = {
			image_1: img_1,
			image_2: img_2,
			dimensions: {
				width: 0,
				height: 0
			}
		}
		var extra = {
			get_image_dimensions: get_image_dimensions,
			image_load_handler: image_load_handler,
			mousemove_handler: mousemove_handler,
			parent_el: parent_el,
			ready: ready,
			set_percent: set_percent
		}

		return react_component(parent_el, template, initial_state, props, extra)
	}
}

function set_percent(new_percent) {
	if(typeof new_percent !== 'number') {
		return
	}

	new_percent = Math.min(1, new_percent)
	new_percent = Math.max(0, new_percent)

	this.setState(calculate_percentages(new_percent))
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

function ready() {
	this.setProps({dimensions: this.get_image_dimensions()})
	this.forceUpdate()
}

function get_image_dimensions() {
	var top_el = this.parent_el.querySelector('.swipe-compare-top')
	var bottom_el = this.parent_el.querySelector('.swipe-compare-bottom')

	return {
		width: Math.max(top_el.offsetWidth, bottom_el.offsetWidth),
		height: Math.max(top_el.offsetHeight, bottom_el.offsetHeight)
	}
}

function image_load_handler() {
	this.image_count = this.image_count || 0
	this.image_count++

	if(this.image_count === 2) {
		this.ready()
	}
}

function mousemove_handler(ev) {
	var l = ev.clientX - this.parent_el.offsetLeft
	var percent = l / this.props.dimensions.width

	if(mouse_state.mouse_down) {
		this.set_percent(percent)
	}
}

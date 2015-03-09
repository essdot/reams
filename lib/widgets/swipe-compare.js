var react_component = require('../modules/react/react-component')
var template = require('../templates/swipe-compare.rt')
var draggable = require('../modules/draggable')

module.exports = swipe_compare

function swipe_compare(parent_el, img_1, img_2) {
	var component = make_react_component()

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
			parent_el: parent_el,
			get_image_dimensions: get_image_dimensions,
			image_load_handler: image_load_handler,
			set_percent: set_percent,
			ready: ready,

			componentDidMount: function() {
				make_line_draggable(this)
			}
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

function get_image_dimensions() {
	var top_el = this.parent_el.querySelector('.swipe-compare-top')
	var bottom_el = this.parent_el.querySelector('.swipe-compare-bottom')

	return {
		width: Math.max(top_el.offsetWidth, bottom_el.offsetWidth),
		height: Math.max(top_el.offsetHeight, bottom_el.offsetHeight)
	}
}

function ready() {
	var dimensions = this.get_image_dimensions()
	var line_position = dimensions.width * this.state.percent

	this.props.line.setPosition(line_position, 0)
	this.setProps({dimensions: dimensions})
}

function image_load_handler() {
	image_load_handler.calls = image_load_handler.calls || 0
	image_load_handler.calls++

	if(image_load_handler.calls === 2) {
		this.ready()
	}
}

function make_line_draggable(component) {
	var line_el = component.parent_el.querySelector('.swipe-compare-line')

	component.setProps({
		line: draggable(line_el, validate_line_drag.bind(component))
	})
	component.props.line.on('drag_move', on_line_drag.bind(component))
}

function on_line_drag(position_obj) {
	var percent = position_obj.left / this.props.dimensions.width

	this.set_percent(percent)
}

function validate_line_drag(position_obj) {
	if(position_obj.left < 0) {
		return false
	}

	if(position_obj.left > this.props.dimensions.width) {
		return false
	}

	position_obj.dy = 0

	return position_obj
}

function set_percent(new_percent) {
	if(typeof new_percent !== 'number') {
		return
	}

	new_percent = Math.min(1, new_percent)
	new_percent = Math.max(0, new_percent)

	this.setState(calculate_percentages(new_percent))
}

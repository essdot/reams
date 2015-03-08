var react_component = require('../modules/react/react-component')
var template = require('../templates/drag-mirror.rt')
var draggable = require('../modules/draggable')

module.exports = drag_mirror

function drag_mirror(parent_el, image_url) {
	var component = make_react_component()

	return component

	function make_react_component() {
		var initial_state = calculate_percentages(.5)
		var props = {image_url: image_url}
		var extra = {
			parent_el: parent_el,
			on_image_load: on_image_load,
			set_percent: set_percent,

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

function on_image_load(ev) {
	var img_el = ev.target
	var img_width = img_el.offsetWidth
	var line_position = Math.floor(img_width * this.state.percent)

	this.setProps({img_width: img_width})
	this.props.line.setPosition(line_position, 0)
}

function make_line_draggable(component) {
	var line_el = component.parent_el.querySelector('.drag-mirror-line')

	component.setProps({
		line: draggable(line_el, validate_line_drag.bind(component))
	})
	component.props.line.on('drag_move', on_line_drag.bind(component))
}

function on_line_drag(position_obj) {
	var percent = position_obj.left / this.props.img_width

	this.setState(calculate_percentages(percent))
}

function validate_line_drag(position_obj) {
	if(position_obj.left < 0) {
		return false
	}

	if(position_obj.left > this.props.img_width) {
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

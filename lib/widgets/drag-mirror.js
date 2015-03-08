var react_component = require('../modules/react/react-component')
var template = require('../templates/drag-mirror.rt')
var draggable = require('../modules/draggable')

module.exports = drag_mirror

function drag_mirror(parent_el, image_url) {
	var component = make_react_component()

	return component

	function make_react_component() {
		var initial_state = {percent: .5, percent100base: 50}
		var props = {image_url: image_url}
		var extra = {
			parent_el: parent_el,
			make_line_draggable: make_line_draggable,
			position_images: position_images,
			get_bottom_percent: get_bottom_percent,

			componentDidMount: function() {
				this.make_line_draggable()
			},
			on_image_load: function() {
				this.position_images()
			}
		}

		return react_component(parent_el, template, initial_state, props, extra)
	}
}

function position_images() {
	var bottom_el = this.parent_el.querySelector('.drag-mirror-bottom')
	var img_width = bottom_el.offsetWidth

	this.setProps({img_width: img_width})
	this.props.line.setPosition(Math.floor(img_width * this.state.percent), 0)
}

function make_line_draggable() {
	if(this.props.line) {
		return
	}

	var line_el = this.parent_el.querySelector('.drag-mirror-line')

	this.setProps({
		line: draggable(line_el, validate_line_drag.bind(this))
	})
	this.props.line.on('drag_move', on_line_drag.bind(this))
}

function on_line_drag(position_obj) {
	var percent = position_obj.left / this.props.img_width

	this.setState({percent: percent, percent100base: percent * 100})
}

function get_bottom_percent() {
	var num = (1 - this.state.percent) * 100
	return num.toFixed()
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

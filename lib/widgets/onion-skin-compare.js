var react_component = require('../modules/react/react-component')
var react_slider = require('./react-slider')
var template = require('../templates/onion-skin-compare.rt')

module.exports = make_onion_skin_compare

function make_onion_skin_compare(parent_el, img_1, img_2) {
	var component = make_react_component()

	return component

	function make_react_component() {
		var initial_state = {percent: .5}
		var props = {
			img_1: img_1,
			img_2: img_2
		}

		var extra = {
			parent_el: parent_el,
			position_images: position_images,
			make_slider: make_slider,
			get_top_percent: get_top_percent,
			get_percent: get_percent,

			componentDidMount: function() {
				this.make_slider()
			},
			onImageLoad: function() {
				this.position_images()
			}
		}

		return react_component(parent_el, template, initial_state, props, extra)
	}
}

function make_slider() {
	var component = this
	var slider_el = this.parent_el.querySelector('.slider-wrapper')
	this.setProps({slider: react_slider(slider_el, this.state.percent * 100)})
	this.props.slider.on('data', function(data) {
		var percent = data / 100

		component.setState({percent: percent})
	})
}

function position_images() {
	var bottom_el =
		this.parent_el.querySelector('.onion-skin-compare-bottom-image')

	this.setProps({image_width: bottom_el.offsetWidth})
}

function get_top_percent() {
	var num = this.state.percent
	return num.toFixed(2)
}

function get_percent() {
	var num = this.state.percent * 100
	return num.toFixed()
}

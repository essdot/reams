var React = require('../modules/react')

module.exports = render_slider

function render_slider() {
	var val =  this.state.value
	var min =  this.props.min
	var max =  this.props.max

	return <input type="range" defaultValue={val} min={min} max={max} />
}
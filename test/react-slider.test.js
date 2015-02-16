var test = require('tape')
var dom = require('dom-sandbox')

var react_slider = require('../lib/widgets/react-slider')

test('slider', function(t) {
	var el = dom()
	var slider = react_slider(el)
	
	t.ok(slider)
	t.equal(el, slider.component.parent_el)
	t.end()
})

test('write sets value', function(t) {
	var el = dom()
	var slider = react_slider(el, 0)
	
	t.equal(slider.component.state.value, 0)
	t.equal(slider.component.getDOMNode().value, '0')

	slider.write(1.5)

	t.equal(slider.component.state.value, 1.5)
	t.equal(slider.component.getDOMNode().value, '1.5')
	t.end()
})
var test = require('tape')
var react_component = require('../lib/modules/react/react-component')
var render_stub = require('./render-stub')
var dom = require('dom-sandbox')

test('component', function(t) {
	var el = dom()
	var component = react_component(el, render_stub)
	
	t.ok(component)
	t.equal(el, component.parent_el)
	t.equal(component.getDOMNode(), el.children[0])

	component.unrender()
	t.end()
})

test('component passes initial', function(t) {
	var component = react_component(dom(), render_stub, {hello: true})
	
	t.ok(component.state.hello)

	component.unrender()
	t.end()
})

test('component passes react args', function(t) {
	var component = react_component(
		dom(),
		render_stub,
		{hello: true},
		{
			getInitialState: function() {
				return {goodbye: true}
			}
		}
	)
	
	t.ok(component.state.goodbye)
	t.notOk(component.state.hello)

	component.unrender()
	t.end()
})

test('unrender', function(t) {
	var el,
			component

	el = dom()
	t.notOk(el.children.length)
	
	component = react_component(el, render_stub)
	t.ok(el.children.length)

	component.unrender()
	t.notOk(el.children.length)

	t.end()
})
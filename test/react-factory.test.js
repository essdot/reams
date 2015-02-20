var test = require('tape')
var react_factory = require('../lib/modules/react/react-factory')
var dom = require('dom-sandbox')
var React = require('../lib/modules/react')

var render = function() {
	return React.createElement('div')
}

test('react factory returns react component', function(t) {
	var factory = react_factory(render)
	var el = dom()

	t.equal(factory(el).getDOMNode(), el.children[0])
	t.ok(factory(dom()).isMounted())
	t.end()
})

test('passes React options', function(t) {
	var factory = react_factory(render, {}, {
		pizza: function() {}
	})

	t.ok(typeof factory(dom()).pizza === 'function')
	t.end()
})

test('initial state', function(t) {
	var factory = react_factory(render, {nachos: true})

	t.ok(factory(dom()).state.nachos)
	t.end()
})
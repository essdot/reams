var React = require('react')
var test = require('tape')
var react_stream = require('../lib/modules/react/react-stream')
var dom = require('dom-sandbox')
var render_stub = require('./render-stub')

test('stream', function(t) {
	var el = dom()
	var rs = react_stream(el, render_stub, {})

	t.ok(rs)
	t.equal(rs.component.parent_el, el)

	rs.on('data', function(data) {
		t.equal(data, 'quack')

		rs.end()
		t.end()
	})

	rs.queue('quack')
})

test('stream write sets state', function(t) {
	var rs = react_stream(dom(), render_stub, {})

	rs.write({buh: 'wha'})
	t.equal(rs.component.state.buh, 'wha')

	rs.end()
	t.end()
})

test('stream end cleans up component', function(t) {
	var rs

	t.equal(document.querySelectorAll('.my-div').length, 0)

	rs = react_stream(dom(), render, {})
	t.equal(document.querySelectorAll('.my-div').length, 1)

	rs.end()
	t.equal(document.querySelectorAll('.my-div').length, 0)

	t.end()

	function render() {
		return React.createElement('div', {className: 'my-div'})
	}
})

test('lifecycle events', function(t) {
	var write_value = {thing: 'what'}
	var rs = react_stream(dom(), render_stub, {})

	t.plan(6)

	rs.once('componentWillUpdate', function(component, next_props, next_state) {
		t.equal(component.getDOMNode(), rs.component.getDOMNode())
		t.deepEqual(next_state, write_value)
	})

	rs.once('componentDidUpdate', function(component, prev_props, prev_state) {
		t.equal(component.getDOMNode(), rs.component.getDOMNode())
		t.deepEqual(prev_state, {})
		t.deepEqual(component.state, write_value)
	})

	rs.write(write_value)

	rs.on('componentWillUnmount', function(component) {
		t.equal(component.getDOMNode(), rs.component.getDOMNode())
		t.end()
	})

	rs.end()
})
var test = require('tape')
var dom = require('dom-sandbox')
var through = require('through')

var autocomplete = require('../lib/widgets/autocomplete')
var click = require('../lib/dom-utils/dom-click')

test('loads initial state', function(t) {
	var auto = autocomplete(dom(), through())

	t.ok(auto.parent_el)
	t.equal(auto.component.state.query, null)
	t.notOk(auto.component.state.loading)
	t.end()
})

test('writes to query stream', function(t) {
	var query_stream = through(write)
	var auto = autocomplete(dom(), query_stream)

	auto.write('quan')

	function write(data) {
		t.equal(data, 'quan')
		t.end()
	}
})

test('sets loading correctly', function(t) {
	var query_stream = through(write)
	var el = dom('<div class="autocomplete"></div>').children[0]
	var auto = autocomplete(el, query_stream)

	t.plan(6)

	auto.write('abc')

	t.ok(auto.component.state.loading)
	t.ok(auto.parent_el.className.indexOf('loading') !== -1)
	t.ok(auto.parent_el.className.indexOf('autocomplete') !== -1)

	function write() {
		process.nextTick(function() {
			query_stream.queue([])

			t.notOk(auto.component.state.loading)
			t.ok(auto.parent_el.className.indexOf('loading') === -1)
			t.ok(auto.parent_el.className.indexOf('autocomplete') !== -1)
			t.end()
		})
	}
})

test('click selects item', function(t) {
	var click_el
	var query_stream = through(write)
	var auto = autocomplete(dom(), query_stream)

	t.plan(3)

	auto.write('abc')
	t.equal(auto.component.state.results.length, 3)
	t.equal(auto.parent_el.querySelectorAll('.autocomplete-results a').length, 3)

	auto.on('data', function(data) {
		t.deepEqual(data, {id: 3, name: 'Lady'})
		t.end()
	})

	click(auto.parent_el.querySelectorAll('.autocomplete-results a')[2])

	function write() {
		this.queue([
			{id: 1, name: 'Baby'},
			{id: 2,	name: 'Man'},
			{id: 3,	name: 'Lady'}
		])
	}
})

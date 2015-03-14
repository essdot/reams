var test = require('tape')
var el_stream = require('../lib/dom-utils/element-stream')
var dom = require('dom-sandbox')

test('element-stream', function(t) {
	var el = dom('')
	var els = el_stream(el)

	t.notOk(el.innerHTML, 'innerHTML should be empty')

	els.write('heya')

	t.equal(el.innerHTML, 'heya', 'innerHTML should match written value')
	t.end()
})

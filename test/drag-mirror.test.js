var test = require('tape')
var dom = require('dom-sandbox')

var drag_mirror = require('../lib/widgets/drag-mirror')

function create_mirror() {
	var el = dom('<div class="drag-mirror-wrapper"></div>')
	var mirror = drag_mirror(el, 'img1.png', 'img2.png')
	mirror.get_image_dimensions = function() { return {height: 400, width: 750}}
	mirror.ready()

	return mirror
}

test('drag mirror', function(t) {
	var mirror = create_mirror()

	t.equal(mirror.state.percent, .5)
	t.deepEqual(mirror.props.dimensions, {height: 400, width: 750})
	t.equal(mirror.props.line.el.style.left, '375px')
	t.end()
})

test('calculates percentages correctly', function(t) {
	var mirror = create_mirror()

	mirror.set_percent(.3)

	t.equal(mirror.state.percent, .3)
	t.equal(mirror.state.big_percent, 30)
	t.equal(mirror.state.reverse_big_percent, 70)
	t.end()
})

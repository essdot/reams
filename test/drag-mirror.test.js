var test = require('tape')
var dom = require('dom-sandbox')

var drag_mirror = require('../lib/widgets/drag-mirror')

function create_mirror() {
	var el = dom('<div class="drag-mirror-wrapper"></div>')
	var fake_img = dom('<img src="../www/img.jpg" />')
	var mirror = drag_mirror(el, '../www/img.jpg')

	fake_img.offsetWidth = 750

	mirror.on_image_load({target: fake_img})

	return mirror
}

test('drag mirror', function(t) {
	var mirror = create_mirror()

	t.equal(mirror.state.percent, .5)
	t.equal(mirror.props.img_width, 750)
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

var test = require('tape')
var dom = require('dom-sandbox')

var swipe_compare = require('../lib/widgets/swipe-compare')

function create_swiper() {
	var el = dom('<div class="swiper-wrapper"></div>')
	var swiper = swipe_compare(el, 'img1.png', 'img2.png')
	swiper.component.get_image_dimensions = function() { return {height: 400, width: 750}}
	swiper.component.images_loaded()

	return swiper
}

test('swipe compare', function(t) {
	var swiper = create_swiper()

	t.equal(swiper.component.state.percent, .5)
	t.deepEqual(swiper.component.props.dimensions, {height: 400, width: 750})
	t.end()
})

test('write sets percent', function(t) {
	var swiper = create_swiper()

	t.equal(swiper.component.state.percent, .5)

	swiper.write(.7)
	t.equal(swiper.component.state.percent, .7)

	t.end()
})

test('calculates percentages correctly', function(t) {
	var swiper = create_swiper()

	swiper.write(.3)

	t.equal(swiper.component.state.percent, .3)
	t.equal(swiper.component.state.big_percent, 30)
	t.equal(swiper.component.state.reverse_big_percent, 70)
	t.equal(swiper.component.state.percent_string, '30%')
	t.equal(swiper.component.state.reverse_percent_string, '70%')
	t.end()
})

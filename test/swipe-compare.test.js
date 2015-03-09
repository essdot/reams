var test = require('tape')
var dom = require('dom-sandbox')

var swipe_compare = require('../lib/widgets/swipe-compare')

function create_swiper() {
	var el = dom('<div class="swiper-wrapper"></div>')
	var swiper = swipe_compare(el, 'img1.png', 'img2.png')
	swiper.get_image_dimensions = function() { return {height: 400, width: 750}}
	swiper.ready()

	return swiper
}

test('swipe compare', function(t) {
	var swiper = create_swiper()

	t.equal(swiper.state.percent, .5)
	t.deepEqual(swiper.props.dimensions, {height: 400, width: 750})
	t.end()
})

test('calculates percentages correctly', function(t) {
	var swiper = create_swiper()

	swiper.set_percent(.3)

	t.equal(swiper.state.percent, .3)
	t.equal(swiper.state.big_percent, 30)
	t.equal(swiper.state.reverse_big_percent, 70)
	t.equal(swiper.state.percent_string, '30%')
	t.equal(swiper.state.reverse_percent_string, '70%')
	t.end()
})

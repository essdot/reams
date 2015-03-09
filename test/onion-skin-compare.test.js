var test = require('tape')
var onion_skin = require('../lib/widgets/onion-skin-compare')
var dom = require('dom-sandbox')

test('onion skin', function(t) {
  var el = dom('<div class="onion-skin-wrapper"></div>')

  t.notOk(el.querySelector('.onion-skin-compare-top-wrapper'))
  t.notOk(el.querySelector('.onion-skin-compare-bottom-wrapper'))

  onion_skin(el, 'img/img1.png', 'img/img2.png')

  t.ok(el.querySelector('.onion-skin-compare-top-wrapper'))
  t.ok(el.querySelector('.onion-skin-compare-bottom-wrapper'))

  t.end()
})

test('writing to slider sets percent', function(t) {
  var el = dom('<div class="onion-skin-wrapper"></div>')
  var compare = onion_skin(el, 'img/img1.png', 'img/img2.png')

  t.equal(compare.state.percent, .5)
  t.equal(compare.props.slider.component.state.value, .5)

  compare.props.slider.write(.7)
  t.equal(compare.state.percent, .7)
  t.equal(compare.props.slider.component.state.value, .7)

  t.end()
})

test('set_percent updates slider', function(t) {
  var el = dom('<div class="onion-skin-wrapper"></div>')
  var compare = onion_skin(el, 'img/img1.png', 'img/img2.png')

  t.equal(compare.state.percent, .5)
  t.equal(compare.props.slider.component.state.value, .5)

  compare.set_percent(.7)
  t.equal(compare.state.percent, .7)
  t.equal(compare.props.slider.component.state.value, .7)

  t.end()
})

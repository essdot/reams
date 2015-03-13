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
  var slider = compare.component.props.slider

  t.plan(3)

  t.equal(compare.component.state.percent, .5)
  t.equal(slider.component.state.value, .5)

  compare.on('data', function(data) {
    t.equal(data, .7)
  })

  slider.write(.7)

  compare.on('end', function(data) {
    t.end()
  })

  compare.end()
})

test('write sets percent', function(t) {
  var el = dom('<div class="onion-skin-wrapper"></div>')
  var compare = onion_skin(el, 'img/img1.png', 'img/img2.png')
  var slider = compare.component.props.slider

  t.plan(4)

  t.equal(compare.component.state.percent, .5)
  t.equal(slider.component.state.value, .5)

  slider.on('data', function(data){
    t.equal(data, .7)
  })

  compare.on('data', function(data) {
    t.equal(data, .7)
  })

  compare.write(.7)

  compare.on('end', function(data) {
    t.end()
  })

  compare.end()
})

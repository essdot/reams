var autocomplete = require('./lib/widgets/autocomplete')
var queryStream = require('./lib/modules/query-stream')
var react_slider = require('./lib/widgets/react-slider')
var make_swiper = require('./lib/widgets/swipe-compare')
var make_onion_skin = require('./lib/widgets/onion-skin-compare')

var autocomplete_el = document.querySelector('[name=autocomplete]')
var autocomplete_el_2 = document.querySelector('[name=autocomplete2]')
var slider_el = document.querySelector('[name=slider-wrapper]')
var slider_display = document.querySelector('[name=slider-display]')
var swiper_el = document.querySelector('[name=swiper-wrapper]')
var swiper_el2 = document.querySelector('[name=swiper-wrapper2]')
var onion_skin_el = document.querySelector('[name=onion-skin-wrapper]')
var onion_skin_el2 = document.querySelector('[name=onion-skin-wrapper2]')

var img1_url = 'img/img-without-monocle.png'
var img2_url = 'img/img-with-monocle.png'
var img3_url = 'img/img-opaque.png'
var img4_url = 'img/img-trans-shadow.png'

var auto = autocomplete(autocomplete_el, queryStream())
var auto2 = autocomplete(autocomplete_el_2, queryStream())

var slider = react_slider(slider_el)

var swiper = make_swiper(swiper_el, img1_url, img2_url)
var swiper2 = make_swiper(swiper_el2, img3_url, img4_url)

var onion_skin = make_onion_skin(onion_skin_el, img2_url, img1_url)
var onion_skin2 = make_onion_skin(onion_skin_el2, img3_url, img4_url)

slider.on('data', function(data) {
  slider_display.innerHTML = data
})

slider.write(65)

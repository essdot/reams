var el_stream = require('./lib/dom-utils/element-stream')
var autocomplete = require('./lib/widgets/autocomplete')
var queryStream = require('./lib/modules/query-stream')
var make_slider = require('./lib/widgets/react-slider')
var make_swiper = require('./lib/widgets/swipe-compare')
var make_onion_skin = require('./lib/widgets/onion-skin-compare')

var img1_url = 'img/img-without-monocle.png'
var img2_url = 'img/img-with-monocle.png'
var img3_url = 'img/img-opaque.png'
var img4_url = 'img/img-trans-shadow.png'

var qs = document.querySelector.bind(document)

var auto = autocomplete(qs('[name=autocomplete]'), queryStream())
var auto2 = autocomplete(qs('[name=autocomplete2]'), queryStream())

var slider = make_slider(qs('[name=slider-wrapper]'))

var swiper = make_swiper(qs('[name=swiper-wrapper]'), img1_url, img2_url)
var swiper2 = make_swiper(qs('[name=swiper-wrapper2]'), img3_url, img4_url)

var onion_skin_el = qs('[name=onion-skin-wrapper]')
var onion_skin_el2 = qs('[name=onion-skin-wrapper2]')
var onion_skin = make_onion_skin(onion_skin_el, img2_url, img1_url)
var onion_skin2 = make_onion_skin(onion_skin_el2, img3_url, img4_url)

slider.pipe(el_stream(qs('[name=slider-display]')))

slider.write(65)

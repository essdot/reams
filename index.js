var autocomplete = require('./lib/widgets/autocomplete')
var queryStream = require('./lib/modules/query-stream')
var react_slider = require('./lib/widgets/react-slider')
var drag_mirror = require('./lib/widgets/drag-mirror')
var make_draggable = require('./lib/modules/draggable')
var make_onion_skin = require('./lib/widgets/onion-skin-compare')

var autocomplete_el = document.getElementById('autocomplete')
var autocomplete_el_2 = document.getElementById('autocomplete2')
var slider_el = document.getElementById('slider')
var drag_mirror_el = document.getElementById('drag-mirror-wrapper')
var onion_skin_el = document.getElementById('onion-skin-wrapper')
var auto = autocomplete(autocomplete_el, queryStream())
var auto2 = autocomplete(autocomplete_el_2, queryStream())
var slider = react_slider(slider_el)
var mirror = drag_mirror(drag_mirror_el, 'img.jpg')
var onion_skin = make_onion_skin(onion_skin_el, 'img.jpg', 'img.jpg')
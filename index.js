var autocomplete = require('./lib/widgets/autocomplete')
var queryStream = require('./lib/modules/query-stream')
var react_slider = require('./lib/widgets/react-slider')


var autocomplete_el = document.getElementById('autocomplete')
var autocomplete_el_2 = document.getElementById('autocomplete2')
var slider_el = document.getElementById('slider')
var auto = autocomplete(autocomplete_el, queryStream())
var auto2 = autocomplete(autocomplete_el_2, queryStream())
var slider = react_slider(slider_el)

window._auto = auto
window._auto2 = auto2
window._slider = slider
// window._auto.on('data', function(data) { console.log(data) })
window._slider.on('data', function(data) { console.log(data) })

var React = require('react')
var factory = React.createFactory()
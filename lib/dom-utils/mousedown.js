module.exports = mousedown

function mousedown(el, x, y) {
	var evt = new MouseEvent('mousedown')
	evt.initMouseEvent('mousedown', true, true, window, 0, 0, 0,
		x, y, false, false, false, false, 0, null)
	el.dispatchEvent(evt)
}

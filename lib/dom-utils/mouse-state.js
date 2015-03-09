var mouse_state = {mouse_down: false}

module.exports = mouse_state

if(document) {
	document.addEventListener('mousedown', mousedown)
	document.addEventListener('mouseup', mouseup)
}

function mousedown() {
	mouse_state.mouse_down = true
}

function mouseup() {
	mouse_state.mouse_down = false
}

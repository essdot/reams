var mouse_state = {mouse_down: false}

module.exports = mouse_state

if(document) {
	document.addEventListener('mousedown', mousedown)
	document.addEventListener('mouseup', mouseup)
}

// function mouse_state() {
// }

function mousedown(ev) {
	mouse_state.mouse_down = true
}

function mouseup(ev) {
	mouse_state.mouse_down = false
}
module.exports = toggle_class

function toggle_class(el, class_name, val) {
	val = !!val

	if(!el || !class_name) {
		return
	}

	if(!val) {
		el.classList.remove(class_name)
	} else {
		el.classList.add(class_name)
	}
}
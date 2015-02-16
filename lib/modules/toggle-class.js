

if(document.body.classList) {
	module.exports = toggle_class
} else {
	module.exports = toggle_class_noclasslist
}

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

function toggle_class_noclasslist(el, class_name, val) {
	val = !!val

	if(!el || !class_name) {
		return
	}

	var classArr = el.className.split(' ').filter(function(cn) {
		return cn !== class_name
	})

	if(val) {
		classArr.push(class_name)
	}

	el.className = classArr.join(' ')

	function hasClass(el, class_name) {
		var classArr = el.className.split(' ')
		return classArr.indexOf(class_name) !== -1
	}
}
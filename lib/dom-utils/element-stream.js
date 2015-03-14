var through = require('through')

module.exports = element_stream

function element_stream(element) {
	var stream = through(write)

	return stream

	function write(data) {
		element.innerHTML = '' + data
	}
}

var through = require('through')
var fakeData

module.exports = queryStream

function queryStream() {
	var stream = through(write)
	var timeoutId

	return stream

	function write(data) {
		var query = (data || '').toLowerCase()

		var result = fakeData.filter(function(item) {
			return item.name.toLowerCase().indexOf(query) !== -1
		})

		if(timeoutId) {
			clearTimeout(timeoutId)
		}

		timeoutId = setTimeout(function() {
			stream.queue(result)
		}, 150)
	}
}

fakeData = [
	{
		id: 1,
		name: "mens"
	},
	{
		id: 2,
		name: "womens"
	},
	{
		id: 3,
		name: "kids"
	},
	{
		id: 4,
		name: "furniture"
	},
]
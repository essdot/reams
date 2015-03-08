var util = require('util')
var EventEmitter = require('events').EventEmitter

module.exports = make_draggable

function make_draggable(el, _validate_position) {
	return new Draggable(el, _validate_position)
}

function Draggable(el, _validate_position) {
	EventEmitter.call(this)

	this.el = el
	this.dragDrop = null
	this.validate_position = _validate_position || function() { return true }

	this._dragMouseHandler = dragMouse.bind(this)
	this._mouseUpHandler = releaseElement.bind(this)

	this.el.className += ' draggable '
	this.el.addEventListener('mousedown', startDragMouse.bind(this))
}

util.inherits(Draggable, EventEmitter)

Draggable.prototype.maybeSetPosition = function maybeSetPosition(dx, dy) {
	var position_obj = {
		dx: dx,
		dy: dy,
		startX: this.dragDrop.startX,
		startY: this.dragDrop.startY,
		left: this.dragDrop.startX + dx,
		top: this.dragDrop.startY + dy
	}
	var validate_result = this.validate_position(position_obj)

	if(validate_result === false) {
		return
	} else if(typeof validate_result === 'object') {
		if(typeof validate_result.dx === 'number') {
			position_obj.dx	= validate_result.dx
		}

		if(typeof validate_result.dy === 'number') {
			position_obj.dy	= validate_result.dy
		}
	}

	this.setPosition(position_obj.dx, position_obj.dy)
	this.emit('drag_move', position_obj)
}

Draggable.prototype.setPosition = function setPosition(dx, dy) {
	var startX = 0
		, startY = 0

	if(this.dragDrop) {
		startX = this.dragDrop.startX
		startY = this.dragDrop.startY
	}

	this.el.style.left = startX + dx + 'px'
	this.el.style.top = startY + dy + 'px'
}

function startDragMouse(ev) {
	this.dragDrop = {}
	this.el.className += ' dragging'

	this.dragDrop.startX = this.el.offsetLeft
	this.dragDrop.startY = this.el.offsetTop

	this.dragDrop.initialMouseX = ev.clientX
	this.dragDrop.initialMouseY = ev.clientY

	addEventSimple(document, 'mousemove', this._dragMouseHandler)
	addEventSimple(document, 'mouseup', this._mouseUpHandler)

	this.emit('drag_start', this.dragDrop)
}

function dragMouse(ev) {
	var dX = ev.clientX - this.dragDrop.initialMouseX
	var dY = ev.clientY - this.dragDrop.initialMouseY
	this.maybeSetPosition(dX, dY)
}

function releaseElement() {
	removeEventSimple(document, 'mousemove', this._dragMouseHandler)
	removeEventSimple(document, 'mouseup', this._mouseUpHandler)
	this.el.className = this.el.className.replace(/dragging/, '')
	this.dragDrop = null
	this.emit('drag_end')
}

function addEventSimple(obj, evt, fn) {
	if(obj.addEventListener) {
		obj.addEventListener(evt, fn, false)
	}
	else if(obj.attachEvent){
		obj.attachEvent('on' + evt, fn)
	}
}

function removeEventSimple(obj, evt, fn) {
	if(obj.removeEventListener){
		obj.removeEventListener(evt, fn, false)
	}
	else if (obj.detachEvent){
		obj.detachEvent('on' + evt, fn)
	}
}

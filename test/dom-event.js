module.exports = trigger
module.exports.click = click
module.exports.keyup = keyup

function trigger(node, type) {
  var evt

  if(document.createEvent) {
    evt = document.createEvent('Event')
    evt.initEvent(type, true, true)

    return node.dispatchEvent(evt)
  }

  evt = document.createEventObject()
  node.fireEvent('on' + type, evt)
}

function click(node) {
  var evt = document.createEvent('MouseEvent')

  evt.initEvent('click', true, true)
  node.dispatchEvent(evt)
}

function keyup(node, code) {
  var evt = document.createEvent('KeyboardEvent')

  evt.initEvent('keyup', true, true)
  evt.keyCode = code
  node.dispatchEvent(evt)
}
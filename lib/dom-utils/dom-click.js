module.exports = click

function click(node) {
  var evt = document.createEvent('MouseEvent')

  evt.initEvent('click', true, true)
  node.dispatchEvent(evt)
}

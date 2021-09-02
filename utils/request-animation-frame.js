const defaultAnimationFrame = function (callback) {
  setTimeout(callback, 16)
}

const requestAnimationFrame = process.client
  ? window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    defaultAnimationFrame
  : defaultAnimationFrame

export default requestAnimationFrame

const defaultAnimationFrame = function (callback, element) {
  setTimeout(callback, 1000 / 60)
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

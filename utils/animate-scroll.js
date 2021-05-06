import requestAnimationFrame from '@/utils/request-animation-frame'

function scrollTop(el, end) {
  let start = 0
  const stepLength = (end - start) / 20
  const step = function () {
    start = start + stepLength
    if (Math.abs(start - end) < 1) {
      el.scrollTop = end
      return
    }
    el.scrollTop = start
    requestAnimationFrame(step)
  }
  step()
}

export default scrollTop

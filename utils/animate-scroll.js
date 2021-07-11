import requestAnimationFrame from '@/utils/request-animation-frame'

const cubic = (value) => Math.pow(value, 3)
const easeInOutCubic = (value) => (value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2)

function scrollTop(el, end) {
  const beginTime = Date.now()
  const beginValue = el.scrollTop
  const length = end - beginValue
  const frameFunc = () => {
    const progress = (Date.now() - beginTime) / 500
    if (progress < 1) {
      el.scrollTop = beginValue + length * easeInOutCubic(progress)
      requestAnimationFrame(frameFunc)
    } else {
      el.scrollTop = end
    }
  }
  requestAnimationFrame(frameFunc)
}

export default scrollTop

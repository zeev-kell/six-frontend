import requestAnimationFrame from '@/utils/request-animation-frame'

const cubic = (value) => Math.pow(value, 3)
const easeInOutCubic = (value) => (value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2)

function getScrollTop() {
  return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
}

function setScrollTop(scrollTop) {
  document.documentElement.scrollTop = scrollTop
  window.pageYOffset = scrollTop
  document.body.scrollTop = scrollTop
}

function scrollTop(end) {
  const beginTime = new Date().getTime()
  const beginValue = getScrollTop()
  const length = end - beginValue
  const frameFunc = () => {
    const progress = (new Date().getTime() - beginTime) / 500
    if (progress < 1) {
      setScrollTop(beginValue + length * easeInOutCubic(progress))
      requestAnimationFrame(frameFunc)
    } else {
      setScrollTop(end)
    }
  }
  requestAnimationFrame(frameFunc)
}

export default scrollTop

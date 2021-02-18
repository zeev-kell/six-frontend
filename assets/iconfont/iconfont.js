!(function (e) {
  var t,
    n,
    o,
    i,
    c,
    d,
    l =
      '<svg><symbol id="icon-fullscreen" viewBox="0 0 1024 1024"><path d="M445.89283789 631.82426773L388.04114121 573.97943024 231.03641771 730.98586812 74.02312063 573.97943024 74.02312063 954.10804167 454.15173209 954.10804167 297.14529419 797.09645898Z"  ></path><path d="M578.11230691 69.89024395L735.11874481 226.90354102 578.11230691 383.90826451 635.95714442 441.75996119 792.96872709 284.74666413 949.97516498 441.75996119 949.97516498 69.89024395Z"  ></path></symbol><symbol id="icon-ellipsis-vertical" viewBox="0 0 1024 1024"><path d="M512 287c61.875 0 112.5-50.625 112.5-112.5s-50.625-112.5-112.5-112.5-112.5 50.625-112.5 112.5 50.625 112.5 112.5 112.5z m0 112.5c-61.875 0-112.5 50.625-112.5 112.5s50.625 112.5 112.5 112.5 112.5-50.625 112.5-112.5-50.625-112.5-112.5-112.5z m0 337.5c-61.875 0-112.5 50.625-112.5 112.5s50.625 112.5 112.5 112.5 112.5-50.625 112.5-112.5-50.625-112.5-112.5-112.5z" fill="#262626" ></path></symbol></svg>',
    s = (s = document.getElementsByTagName('script'))[s.length - 1].getAttribute('data-injectcss')
  if (s && !e.__iconfont__svg__cssinject__) {
    e.__iconfont__svg__cssinject__ = !0
    try {
      document.write(
        '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
      )
    } catch (e) {
      console && console.log(e)
    }
  }
  function a() {
    c || ((c = !0), o())
  }
  ;(t = function () {
    var e, t, n, o
    ;((o = document.createElement('div')).innerHTML = l),
      (l = null),
      (n = o.getElementsByTagName('svg')[0]) &&
        (n.setAttribute('aria-hidden', 'true'),
        (n.style.position = 'absolute'),
        (n.style.width = 0),
        (n.style.height = 0),
        (n.style.overflow = 'hidden'),
        (e = n),
        (t = document.body).firstChild ? ((o = e), (n = t.firstChild).parentNode.insertBefore(o, n)) : t.appendChild(e))
  }),
    document.addEventListener
      ? ~['complete', 'loaded', 'interactive'].indexOf(document.readyState)
        ? setTimeout(t, 0)
        : ((n = function () {
            document.removeEventListener('DOMContentLoaded', n, !1), t()
          }),
          document.addEventListener('DOMContentLoaded', n, !1))
      : document.attachEvent &&
        ((o = t),
        (i = e.document),
        (c = !1),
        (d = function () {
          try {
            i.documentElement.doScroll('left')
          } catch (e) {
            return void setTimeout(d, 50)
          }
          a()
        })(),
        (i.onreadystatechange = function () {
          'complete' === i.readyState && ((i.onreadystatechange = null), a())
        }))
})(window)

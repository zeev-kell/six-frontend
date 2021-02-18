export default function CreateEnum(o = {}) {
  const keys = Object.keys(o)
  keys.forEach((k) => {
    const v = o[k]
    o[v] = k
  })
  return o
}

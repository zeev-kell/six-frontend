// 创建一个可以枚举的对象，返回 map 数据结构
export default function CreateEnum(o = []) {
  const map = new Map()
  o.forEach((keys) => {
    keys.forEach((k) => {
      map.set(k, o[k])
      map.set(o[k], k)
    })
  })
  return map
}

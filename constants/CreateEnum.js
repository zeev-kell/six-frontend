// 创建一个可以枚举的对象，返回 map 数据结构
export default function CreateEnum(o = []) {
  const map = new Map()
  o.forEach((v) => {
    map.set(v[0], v[1])
    map.set(v[1], v[0])
  })
  return map
}

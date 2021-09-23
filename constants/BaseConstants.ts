import { MapKey, Record, ItemList } from '@/types/constant'

export default class BaseConstants {
  items: Record

  Enum: Map<MapKey, MapKey>

  constructor(items: Record) {
    this.items = items
    this.Enum = BaseConstants.CreateEnum<MapKey, MapKey>(items)
  }

  // 获取对应的值，使用枚举
  get = (value: MapKey): MapKey => {
    return this.Enum.get(value) as MapKey
  }

  // 获取 {value label} 组成的列表
  get itemList(): ItemList {
    return Object.entries(this.items).map(([label, value]) => {
      return {
        value,
        label,
      }
    })
  }

  // 根据 prefix 获取 {value label} 组成的列表
  getItemsList(prefix?: string): ItemList {
    let items = Object.entries(this.items)
    if (prefix) {
      items = items.filter((item) => item[0].startsWith(prefix))
    }
    return items.map(([label, value]) => {
      return {
        value,
        label,
      }
    })
  }

  // 创建枚举，因为要用到生成列表，所以不用 ts 的 enum 定义
  static CreateEnum<K, V>(o: Record): Map<K, V> {
    // 有些字段是 int，所以使用 map 来存储数据
    const map = new Map<K, V>()
    Object.entries(o).forEach(([k, v]) => {
      map.set(k as unknown as K, v as unknown as V)
      map.set(v as unknown as K, k as unknown as V)
    })
    return map
  }
}

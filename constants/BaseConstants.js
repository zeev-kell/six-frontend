export default class BaseConstants {
  transition = new Map()

  translate(value) {
    return this.transition.get(value)
  }

  get items() {
    const items = []
    for (const [value, label] of this.transition) {
      items.push({
        value,
        label,
      })
    }
    return items
  }
}

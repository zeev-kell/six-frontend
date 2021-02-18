export default class BaseConstants {
  transition = {}

  filter(value) {
    return this.transition[value]
  }

  toItems() {
    return Object.keys(this.transition).map((t) => {
      return {
        value: t,
        label: this.transition[t],
      }
    })
  }
}

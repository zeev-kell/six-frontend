const navList = [1, 1, 4, 2, 5].map((r, index) => {
  return {
    level: r,
    text: r,
    index,
    children: [],
  }
})
const levelStack = []
const root = {
  level: 0,
  text: 0,
  index: '_root',
  children: [],
}
let preLevel
navList._root = root

navList.forEach((item) => {
  let levelIndex = levelStack.indexOf(item.level)
  if (levelIndex === -1) {
    if (levelStack.length === 0) {
      root.children.push(item)
      item.parent = '_root'
    } else {
      item.parent = preLevel.index
      preLevel.children.push(item)
    }
    levelStack.unshift(item.level)
  } else if (levelIndex === 0) {
    item.parent = preLevel.parent
    const parent = navList[item.parent]
    parent.children.push(item)
  } else {
    while (levelIndex--) {
      levelStack.shift()
      preLevel = navList[preLevel.parent]
    }
    const parent = navList[preLevel.parent]
    item.parent = parent.index
    parent.children.push(item)
  }
  preLevel = item
})

import { Workflow, DeletionPlugin } from 'cwl-svg'
import { PluginHelp } from '@/pages/_components/Graph/plugins/plugin-help'
import './menu-plugin.scss'

interface btnType {
  name: string // 名字类型
  icon: string // 图标
  text: string // 文字标题
}

export class MenuPlugin extends PluginHelp {
  PluginCss = '__plugin-menu'
  private css = {
    open: '__plugin-menu-open',
    menu: '__plugin-menu-box',
    label: '__plugin-menu-label',
  }
  private onClick: ((type: string, event: Event) => void) | undefined
  static BTN_WIDTH = 28
  static BTN_TYPE = {
    view: {
      name: 'view',
      icon: '\uE86A',
      text: 'View',
    },
    copy: {
      name: 'copy',
      icon: '\uE855',
      text: 'Copy',
    },
    edit: {
      name: 'edit',
      icon: '\uE867',
      text: 'Edit',
    },
    delete: {
      name: 'delete',
      icon: '\uE8DA',
      text: 'Delete',
    },
  }

  registerWorkflow(workflow: Workflow): void {
    super.registerWorkflow(workflow)
    this.addSvgEventListener('click', this.onShowMenu)
  }

  afterModelChange(): void {
    this.workflow.model.on('step.change', () => {
      this.closeMenu()
    })
    this.workflow.model.on('step.create', () => {
      this.closeMenu()
    })
    this.workflow.model.on('step.remove', () => {
      this.closeMenu()
    })
  }

  onShowMenu(event: Event): void {
    const target = event.target as Element
    // 删除其他打开的菜单
    Array.from(this.svg.querySelectorAll('.' + this.css.menu)).forEach((el) => el.remove())
    // 单击 节点
    const nodeElement = this.workflow.findParent(target, 'node')
    // 单击 边
    const edgeElement = this.workflow.findParent(target, 'edge')
    if (nodeElement === undefined && edgeElement === undefined) {
      return
    }
    // 创建菜单
    const menuElement = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    menuElement.classList.add(this.css.menu)
    if (nodeElement) {
      const nodeOuter = nodeElement.querySelector('.outer') as Element
      const btnList = [MenuPlugin.BTN_TYPE.delete]
      // 输入输出节点只有删除按钮
      // if (!nodeElement.classList.contains('input') && !nodeElement.classList.contains('output')) {
      // btnList.unshift(MenuPlugin.BTN_TYPE.view, MenuPlugin.BTN_TYPE.copy, MenuPlugin.BTN_TYPE.edit)
      // }
      menuElement.setAttribute(
        'transform',
        `matrix(1, 0, 0, 1, -${((btnList.length - 1) * MenuPlugin.BTN_WIDTH) / 2}, -${parseInt(nodeOuter.getAttribute('r') as string) + 24})`
      )
      btnList.forEach((type: btnType, index) => {
        const elem = this.createButton(type, index)
        menuElement.appendChild(elem)
      })
      nodeElement.appendChild(menuElement)
    } else if (edgeElement) {
      const edgeOuter = edgeElement.querySelector('.outer') as Element
      const d = (edgeOuter.getAttribute('d') as string).split(' ')
      const x = (~~d[1] + ~~d[8]) / 2
      const y = (~~d[2] + ~~d[7]) / 2
      menuElement.setAttribute('transform', `matrix(1 0 0 1 ${x} ${y})`)
      const deleteElem = this.createButton(MenuPlugin.BTN_TYPE.delete)
      menuElement.appendChild(deleteElem)
      edgeElement.appendChild(menuElement)
    }
  }

  destroy(): void {
    super.destroy()
    this.closeMenu()
  }

  private createButton(type: btnType, index = 0): SVGTextElement {
    const elem = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    const labelScale = this.workflow.labelScale
    elem.setAttribute('class', 'label ' + this.css.label)
    elem.setAttribute('transform', `matrix(${labelScale} 0 0 ${labelScale} ${index * MenuPlugin.BTN_WIDTH} 0)`)

    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'tspan')
    icon.setAttribute('class', 'feather')
    icon.appendChild(document.createTextNode(type.icon))
    elem.appendChild(icon)

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'tspan')
    text.setAttribute('x', '0')
    text.setAttribute('y', '16')
    text.setAttribute('font-size', '80%')
    text.appendChild(document.createTextNode(type.text))
    elem.appendChild(text)

    // 判断是否是自身方法
    const eventListener =
      typeof (this as any)[type.name + 'Action'] === 'function'
        ? (this as any)[type.name + 'Action'].bind(this)
        : (event: Event) => {
            // 停止事件传播
            event.stopPropagation()
            this.onClick && this.onClick(type.name, event)
          }
    elem.addEventListener('click', eventListener)
    return elem
  }

  registerOnMenuClick(fn: (type: string, event: Event) => void): void {
    this.onClick = fn
  }

  // 删除选择的节点或者线条
  private deleteAction(event: Event) {
    // 停止事件传播
    event.stopPropagation()
    this.workflow.getPlugin(DeletionPlugin).deleteSelection()
  }

  closeMenu(): void {
    // 删除其他打开的菜单
    Array.from(this.svg.querySelectorAll('.' + this.css.menu)).forEach((el) => el.remove())
  }
}

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'

@Component
export default class MavonEditorToc extends Vue {
  @Prop({ required: true })
  toc!: any[]
  navList = []
  @Watch('toc', { immediate: true })
  onWatchToc(value: string[]) {
    const toc: any[] = JSON.parse(JSON.stringify(value))
    const levelStack: any[] = []
    const root: any = {
      level: 0,
      text: 0,
      index: '_root',
      children: [],
    }
    let preLevel: any
    toc.forEach((item: any) => {
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
        const parent = toc[item.parent] || root
        parent.children.push(item)
      } else {
        while (levelIndex--) {
          levelStack.shift()
          preLevel = toc[item.parent] || root
        }
        const parent = toc[item.parent] || root
        item.parent = parent.index
        parent.children.push(item)
      }
      preLevel = item
    })
    this.navList = root.children
  }
  render(createElement: any): any {
    if (this.navList.length === 0) {
      return ''
    }
    function createUl(nav: any) {
      const children =
        nav.children.length > 0
          ? createElement(
              'ul',
              { class: 'md-nav__list', key: nav.id },
              nav.children.map((c: any) => createUl(c))
            )
          : ''
      return createElement('li', { class: 'md-nav__item' }, [
        createElement(
          'a',
          {
            class: 'md-nav__link',
            attrs: {
              href: `#${nav.id}`,
            },
          },
          nav.text
        ),
        children,
      ])
    }
    return createElement('nav', { class: 'md-nav markdown-toc' }, [
      createElement('h2', { class: 'md-nav__title' }, '目录'),
      createElement(
        'ul',
        { class: 'md-nav__list' },
        this.navList.map((c) => createUl(c))
      ),
    ])
  }
}
</script>

<style scoped lang="scss" rel="stylesheet">
.markdown-toc {
  padding: 5px 20px;
}
.md-nav__list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.md-nav__item {
  padding: 0 0.6rem;
  overflow-y: visible;
  .md-nav__item {
    padding-right: 0;
  }
}
.md-nav__link {
  color: var(--s-theme-color);
  display: block;
  margin-top: 0.625em;
  line-height: 1;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: color 125ms;
  scroll-snap-align: start;
}
</style>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class MenuItem extends Vue {
  @Prop({
    required: true,
    default() {
      return {}
    },
  })
  menu!: any
  render(createElement: any) {
    const menu = this.menu
    const isSubmenu = menu?.children.length > 0
    function createMenuItem(item: any) {
      return createElement(
        'el-menu-item',
        {
          props: {
            index: '/support-center/' + item.key,
          },
        },
        [createElement('template', { slot: 'title' }, item.title)]
      )
    }
    return createElement(
      isSubmenu ? 'el-submenu' : 'el-menu-item',
      {
        props: {
          index: '/support-center/' + menu.key,
        },
      },
      [
        createElement(
          'template',
          {
            slot: 'title',
          },
          menu.title
        ),
        ...[isSubmenu ? menu.children.map(createMenuItem) : []],
      ]
    )
  }
}
</script>

<script type="text/babel">
export default {
  name: 'MenuItem',
  props: {
    menu: {
      type: Object,
      require: true,
      default() {
        return {}
      },
    },
  },
  render(createElement) {
    const menu = this.menu
    const isSubmenu = menu?.children.length > 0
    function createMenuItem(item) {
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
  },
}
</script>

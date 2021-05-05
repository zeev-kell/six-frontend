export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: '六点了技术',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '六点了技术,生物分析,cwl' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/node_modules/normalize.css/normalize.css', '@/assets/scss/element.scss', '@/assets/scss/theme.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '@/plugins/element-ui', ssr: true },
    { src: '@/plugins/axios', ssr: true },
    { src: '@/plugins/axios-msg.js', mode: 'client' },
    { src: '@/plugins/nuxt-client-init.client.js' },
    { src: '@/plugins/components' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
  ],

  styleResources: {
    scss: ['./assets/scss/variables.scss', './assets/scss/mixins.scss'],
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    ...(process.env.NODE_ENV === 'development' ? ['@/modules/mockjs'] : []),
    // ...['@/modules/mockjs'],
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/dotenv',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    progress: true,
    // debug: process.env.NODE_ENV === 'development',
  },
  // auth-next
  auth: {
    strategies: {
      local: {
        token: {
          required: true,
          type: '',
          property: 'data.token',
        },
        endpoints: {
          login: {
            url: '/login',
            method: 'post',
            propertyName: 'data.token',
          },
          logout: { url: '/logout', method: 'get' },
          user: false,
        },
        user: {
          // 是否自动请求用户数据，目前没有该接口
          autoFetch: false,
          property: false,
        },
      },
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/application',
    },
    cookie: {
      options: {
        maxAge: 60 * 60 * 24 * 7,
      },
    },
  },

  router: {
    middleware: ['class'],
  },
  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/],
    cache: true,
    parallel: process.env.NODE_ENV === 'development',
  },
}

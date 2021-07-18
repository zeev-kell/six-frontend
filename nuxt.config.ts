import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
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
    { src: '@/plugins/i18n-router' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
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
    // ...(process.env.NODE_ENV === 'development' ? ['@/modules/mockjs'] : []),
    // ...['@/modules/mockjs'],
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/dotenv',
    // https://i18n.nuxtjs.org/setup
    'nuxt-i18n',
    [
      'nuxt-fontawesome',
      {
        component: 'fa',
        imports: [
          // import 2 icons from set
          // please note this is PRO set in this example,
          // you must have it in your node_modules to actually import
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: [
              'faObjectGroup',
              'faArchive',
              'faIdCard',
              'faArrowCircleDown',
              'faUserShield',
              'faCubes',
              'faChartLine',
              'faLightbulb',
              'faDesktop',
              'faDownload',
              'faBars',
            ],
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['faGithub', 'faWeixin', 'faWindows', 'faLinux'],
          },
        ],
      },
    ],
  ],

  // nuxt-i18n
  i18n: {
    locales: [
      { code: 'zh', iso: 'zh-CN', file: 'zh.js' },
      { code: 'en', iso: 'en-US', file: 'en.js' },
    ],
    defaultLocale: 'zh',
    lazy: true,
    langDir: '~/locales/',
    vueI18n: {
      fallbackLocale: 'zh',
    },
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    progress: true,
    // debug: process.env.NODE_ENV === 'development',
  },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL,
    },
  },
  // 只有在服务器上可用
  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL,
    },
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
            url: '/v1/login',
            method: 'post',
            propertyName: 'data.token',
          },
          logout: { url: '/v1/logout', method: 'get' },
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
      login: '/login', // 如果需要登录，用户将被重定向到此路径。
      logout: '/login', // 如果注销后当前路由受到保护，用户将被重定向到此路径。
      callback: '/login', // 用户登录后将被重定向到此路径。
      home: '/application', // 用户登录后将被身份提供者重定向到此路径。
    },
    plugins: ['~/plugins/auth.js'],
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
export default config

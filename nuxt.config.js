export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: '六点了协作云-数据分析从未如此便捷',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords', name: 'keywords', content: '生信分析,数据共享,技术教程,六点了科技,sixoclock' },
      {
        hid: 'description',
        name: 'description',
        content:
          '六点了协作云是一个专业的提供生物医疗数据、算法、知识等内容在线创作，使用，托管，共享，可视化计算的云协作平台。囊括生信流程可视化配置，在线运行，下载，免安装本地运行以及流程拖拽智能生成，标准数据下载，生物医疗挖掘知识库等全栈生物医疗相关服务，并提供本地基因云计算私有化部署的整套解决方案。',
      },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:title', name: 'og:title', content: '六点了协作云-sixoclock' },
      { hid: 'og:site_name', name: 'og:site_name', content: '六点了协作云-sixoclock' },
      { hid: 'og:description', name: 'og:description', content: '生信分析,数据共享,六点了科技' },
      { hid: 'og:url', name: 'og:url', content: 'http://www.sixoclock.net/' },
      { hid: 'og:image', name: 'og:image', content: 'http://www.sixoclock.net/images/logo-black.png' },
      { hid: 'og:image:alt', name: 'og:image:alt', content: 'sixoclock' },
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

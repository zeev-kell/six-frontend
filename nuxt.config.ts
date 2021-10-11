const config = {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  // og: https://www.cnblogs.com/chig/p/14086838.html
  head: {
    title: '六点了协作云-sixoclock-数据可视化分析云平台',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'author', content: '六点了科技-sixoclock' },
      { name: 'Copyright', content: '六点了科技-sixoclock版权所有' },
      { hid: 'keywords', name: 'keywords', content: 'sixoclock,六点了协作云,六点了科技,六点了,CWL,基因数据云服务' },
      {
        hid: 'description',
        name: 'description',
        content:
          '六点了协作云 sixoclock 是一个专业的提供生物医疗数据、算法、知识等内容在线创作，使用，托管，共享，可视化计算的云协作平台。' +
          '囊括生信流程可视化配置CWL(Common Workflow Language)，在线运行，下载，免安装本地运行以及流程拖拽智能生成，标准数据下载，生物医疗挖掘知识库等全栈生物医疗相关服务，并提供本地基因云计算私有化部署的整套解决方案。',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:title', property: 'og:title', content: '六点了协作云-sixoclock-数据可视化分析云平台' },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          '六点了协作云 sixoclock 是一个专业的提供生物医疗数据、算法、知识等内容在线创作，使用，托管，共享，可视化计算的云协作平台。' +
          '囊括生信流程可视化配置CWL(Common Workflow Language)，在线运行，下载，免安装本地运行以及流程拖拽智能生成，标准数据下载，生物医疗挖掘知识库等全栈生物医疗相关服务，并提供本地基因云计算私有化部署的整套解决方案。',
      },
      { hid: 'og:site_name', property: 'og:site_name', content: '六点了协作云-sixoclock' },
      { hid: 'og:url', property: 'og:url', content: 'http://www.sixoclock.net/' },
      { hid: 'og:image', property: 'og:image', content: 'http://www.sixoclock.net/images/logo-black.png' },
      { hid: 'og:image:alt', property: 'og:image:alt', content: 'sixoclock' },
      { hid: 'og:release_date', property: 'og:release_date', content: `${new Date().toLocaleDateString()} ${new Date().toTimeString()}` },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://hm.baidu.com/hm.js?ab3c74d0585f5c310923ae3663cdb4df',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/node_modules/normalize.css/normalize.css',
    '@/assets/element-ui/index.css',
    '@/node_modules/element-ui/lib/theme-chalk/display.css',
    '@/assets/scss/main.scss',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '@/plugins/element-ui' },
    { src: '@/plugins/axios' },
    { src: '@/plugins/axios-msg' },
    { src: '@/plugins/api' },
    { src: '@/plugins/nuxt-client-init.client' },
    { src: '@/plugins/components' },
    { src: '@/plugins/i18n-router' },
    { src: '@/directives/index', ssr: false },
    // { src: '@/plugins/vue-mavon-editor', ssr: false, mode: 'client' },
    { src: '@/plugins/vue-clipboard2', ssr: false },
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
    // https://github.com/Developmint/nuxt-purgecss
    // 'nuxt-purgecss',
  ],

  styleResources: {
    scss: ['./assets/scss/variables.scss', './assets/scss/mixins.scss'],
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    // ...(process.env.NODE_ENV === 'development' ? ['~/modules/mockjs.ts'] : []),
    // ...['@/modules/mockjs.ts'],
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
              'faTerminal',
              'faEraser',
            ],
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['faGithub', 'faWeixin', 'faWindows', 'faLinux'],
          },
        ],
      },
    ],
    '@nuxtjs/sitemap',
  ],

  // nuxt-i18n
  i18n: {
    locales: [
      { code: 'zh', iso: 'zh-CN', file: 'zh.ts' },
      { code: 'en', iso: 'en-US', file: 'en.ts' },
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
        scheme: 'refresh',
        token: {
          required: true,
          type: 'Bearer',
          property: 'data.token',
          maxAge: 3600,
          global: true,
        },
        refreshToken: {
          property: 'data.refresh_token',
          data: 'refresh_token',
          maxAge: 3600 * 24 * 30,
        },
        endpoints: {
          login: {
            url: '/v1/login',
            method: 'post',
            propertyName: 'data.token',
          },
          logout: { url: '/v1/logout', method: 'get' },
          user: {
            url: '/v1/user/info',
            method: 'get',
          },
          refresh: { url: '/v1/token/refresh', method: 'post' },
        },
        user: {
          // 是否自动请求用户数据， 默认 true
          // autoFetch: false,
          property: false,
        },
      },
    },
    redirect: {
      login: '/access', // 如果需要登录，用户将被重定向到此路径。
      logout: '/access', // 如果注销后当前路由受到保护，用户将被重定向到此路径。
      callback: '/access', // 用户登录后将被重定向到此路径。
      home: '/application', // 用户登录后将被身份提供者重定向到此路径。
    },
    plugins: ['@/plugins/auth.ts'],
  },

  // nuxt-sitemap (https://sitemap.nuxtjs.org/usage/sitemap)
  sitemap: {
    hostname: 'http://www.sixoclock.net/',
    gzip: true,
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
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]],
    },
    vendor: ['element-ui', 'vue-cropper'],
  },
}
export default config

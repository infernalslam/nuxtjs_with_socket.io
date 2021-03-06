module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  // css: ['~/assets/css/main.css'],
  css: [
    '~assets/css/main.css',
    'element-ui/lib/theme-default/index.css'
  ],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios', 'vue-youtube-embed'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [
    { src: '~plugins/vue-youtube-embed.js', ssr: false },
    { src: '~plugins/element-ui.js' }
  ]
}

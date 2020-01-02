export default {
  buildModules: ['@nuxt/typescript-build'],
  plugins: [
    '~/plugins/composition-api',
    '~/plugins/provide-apollo-client'
  ],
  modules: [
    '@nuxtjs/apollo'
  ],
apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://localhost:5000'
      }
    },
    includeNodeModules: true
},
}

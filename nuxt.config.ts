// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/macos-web-notes/', // baseURL: '/<repository>/'
    buildAssetsDir: 'assets' // don't use "_" at the begining of the folder name to avoids nojkill conflict
  },
  css: ['~/assets/scss/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/core/_variables.scss"; @import "@/assets/scss/utils/_mixins.scss";'
        }
      }
    }
  },
  imports: {
    dirs: ['store']
  },
  modules: ['@pinia/nuxt', '@nuxtjs/device'],
  pinia: {
    autoImports: ['defineStore', 'storeToRefs']
  },
  devtools: { enabled: false }
})

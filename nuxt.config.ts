// https://nuxt.com/docs/api/configuration/nuxt-config

import Aura from '@primeuix/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2025-05-30',
  app: {
    head: {
      title: 'Dogfy Diet',
      meta: [
        { name: 'description', content: 'Prueba técnica Cristian García Peirón' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  ssr: false,
  devtools: { enabled: false },
  modules: [
    "@nuxtjs/tailwindcss",
    '@primevue/nuxt-module',
    'nuxt-svgo',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],
  css: ['~/assets/css/main.css'],
  primevue: {
    components: {
      exclude: ['Form', 'FormField']
    },
    options: {
      theme: {
        preset: Aura
      }
    }
  }
})
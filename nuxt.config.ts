// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxtjs/tailwindcss',
    '@tresjs/nuxt',
    'nuxt-aos',
    'nuxt-bootstrap-icons'
  ],

  css: [
    '~/assets/css/main.css'
  ],

  app: {
    head: {
      title: 'Disney Pixar Cars | Official Steam Game Promotional Hub',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Rasakan sensasi balap arcade legendaris Disney Pixar Cars & Cars 2 di Steam! Eksplorasi 3D showroom 360°, suara mesin ikonik Ka-Chow, trailer sinematik, dan spesifikasi game lengkap.' },
        { name: 'theme-color', content: '#E11D2A' },
        { property: 'og:title', content: 'Disney Pixar Cars & Cars 2 - Steam Video Game Experience' },
        { property: 'og:description', content: 'Jelajahi panggung 3D interaktif Lightning McQueen, Tow Mater, Cruz Ramirez, dan Jackson Storm. Dapatkan gamenya di Steam sekarang!' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/logo.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
      ]
    }
  },

  site: {
    url: 'https://carsgame.com',
    name: 'Disney Pixar Cars Game Hub'
  }
})
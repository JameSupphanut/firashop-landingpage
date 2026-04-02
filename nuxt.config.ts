// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  ui: {
    colorMode: false,
  },
  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    'nuxt-lottie'
  ],
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'th',
    detectBrowserLanguage: false,
    locales: [
      { code: 'en', language: 'en-US', file: 'en-US.json', name: 'English' },
      { code: 'ja', language: 'ja-JP', file: 'ja-JP.json', name: '日本語' },
      { code: 'zh', language: 'zh-CN', file: 'zh-CN.json', name: '中文' },
      { code: 'th', language: 'th-TH', file: 'th-TH.json', name: 'ไทย' },
    ],
  },
})
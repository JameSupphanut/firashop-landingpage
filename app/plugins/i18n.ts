import { createI18n } from 'vue-i18n'
import en from '~/locales/en.json'
import th from '~/locales/th.json'
import zh from '~/locales/zh.json'
import ja from '~/locales/ja.json'

type MessageSchema = typeof en

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n<[MessageSchema], 'en' | 'th' | 'ja' | 'zh'>({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
      en,
      th,
      ja,
      zh
    }
  })

  nuxtApp.vueApp.use(i18n)
})
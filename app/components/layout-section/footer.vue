<template>
  <footer class="bg-[#f6f7fa] pt-12 pb-4 px-12 lg:px-22 xl:px-32 border-t border-transparent relative">
    <div class="container mx-auto px-4">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:[grid-template-columns:1.65fr_1fr_1fr_1.25fr] gap-y-8 gap-x-6 lg:gap-x-14 text-center lg:text-left">

        <!-- ข้อมูลบริษัท -->
        <div class="order-1">
          <NuxtImg src="/image/logo/logo-ldp.png" alt="Fira Shop Logo" width="260"
            class="mx-auto lg:mx-0 relative left-auto lg:-left-12 h-auto" />
          <p class="text-gray-600 mb-4 max-w-xs mx-auto lg:mx-0">
            {{ t('footer.company.description') }}
          </p>

          <div class="flex items-start justify-center lg:justify-start gap-2 mb-2 pt-2">
            <UIcon name="i-heroicons-map-pin-solid" class="w-6 h-6 text-gray-700 mt-1" />
            <span class="text-gray-700 text-sm text-left">
              {{ t('footer.company.address.line1') }}<br />
              {{ t('footer.company.address.line2') }}<br />
              {{ t('footer.company.address.line3') }}
            </span>
          </div>

          <div class="flex items-center justify-center lg:justify-start gap-2 pt-2">
            <UIcon name="i-heroicons-envelope-solid" class="w-6 h-6 text-gray-700" />
            <span class="text-gray-700 text-sm">support@wiselysource.com</span>
          </div>
        </div>

        <!-- ลงทะเบียนรับข่าวสาร -->
        <div class="order-2 lg:order-4">
          <div class="font-kanit font-semibold text-[18px] leading-[28px] text-gray-800 mb-3 pb-2">
            {{ t('footer.newsletter.title') }}
          </div>

          <form class="group flex w-full lg:max-w-[300px] xl:max-w-[520px] mx-auto lg:mx-0 rounded-full border border-gray-300
         overflow-hidden transition-colors duration-300
         hover:border-primary focus-within:border-primary" @submit.prevent="onSubscribe" novalidate>
            <input v-model.trim="email" :disabled="loading" type="email" autocomplete="email"
              class="min-w-0 flex-1 h-10 px-4 bg-transparent text-gray-700 text-sm font-kanit outline-none focus:ring-0"
              :placeholder="t('footer.newsletter.placeholder')" />
            <button type="submit" :disabled="loading" class="regis-btn h-10 md:h-11 px-6 md:px-8 min-w-[120px] md:min-w-[150px] shrink-0 bg-primary text-white text-sm font-kanit font-semibold transition-colors rounded-full
                     disabled:opacity-60 disabled:cursor-not-allowed hover:bg-[#000000]">
              <span v-if="!loading">{{ t('footer.newsletter.submit') }}</span>
              <span v-else class="inline-flex items-center gap-2">
                <svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" opacity=".2" stroke-width="4" />
                  <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" stroke-width="4" />
                </svg>
                {{ t('footer.newsletter.loading') }}
              </span>
            </button>
          </form>

          <!-- สถานะ -->
          <p v-if="msg" :class="['mt-2 text-sm font-kanit', msgType === 'success' ? 'text-emerald-600' : 'text-red-600']">
            {{ msg }}
          </p>
        </div>

        <!-- เมนู -->
        <div class="order-2 lg:mx-auto lg:w-max">
          <div class="font-bold text-lg mb-6 lg:mb-3 text-gray-800 lg:text-left pb-2">
            {{ t('footer.menu.title') }}
          </div>
          <ul class="space-y-6 lg:space-y-4 text-gray-700 lg:text-left">
            <li>
              <NuxtLink to="/" class="hover:text-primary transition-colors">
                {{ t('footer.menu.items.home') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/feature" class="hover:text-primary transition-colors">
                {{ t('footer.menu.items.features') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/product" class="hover:text-primary transition-colors">
                {{ t('nav.product') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/blog" class="hover:text-primary transition-colors">
                {{ t('footer.menu.items.blog') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact-us" class="hover:text-primary transition-colors">
                {{ t('footer.menu.items.contact') }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- ศูนย์ช่วยเหลือ -->
        <div class="order-3 lg:mx-auto lg:w-max">
          <div class="font-bold text-lg mb-6 lg:mb-3 text-gray-800 lg:text-left pb-2">
            {{ t('footer.help.title') }}
          </div>
          <ul class="space-y-6 lg:space-y-4 text-gray-700 lg:text-left">
            <li>
              <NuxtLink to="/policy" class="hover:text-primary transition-colors">
                {{ t('footer.help.items.privacy') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/terms" class="hover:text-primary transition-colors">
                {{ t('footer.help.items.terms') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/faq" class="hover:text-primary transition-colors">
                {{ t('footer.help.items.faq') }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-10 text-center">
      <div class="container mx-auto px-4">
        <p class="text-gray-400 text-sm pt-8 text-left">
          {{ t('footer.copyright', { year }) }}
        </p>
      </div>
    </div>
  </footer>
  <div class="h-2 bg-primary w-full left-0 bottom-8" />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'

const { t, locale } = useI18n({ useScope: 'global' })
const year = new Date().getFullYear()

// env
const BASE_URL = import.meta.env.VITE_API_URL
const API_PATH = import.meta.env.VITE_API_PATH

// form state
const email = ref('')
const loading = ref(false)
const msg = ref<string | null>(null)
const msgType = ref<'success' | 'error'>('success')

// locale to API field
const receiveLocale = computed<'en' | 'th'>(() => (String(locale.value).startsWith('th') ? 'th' : 'en'))

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

function buildApiUrl(endpoint: string) {
  return `${BASE_URL}/${API_PATH}/${endpoint}`
}

async function onSubscribe() {
  msg.value = null
  if (!isValidEmail(email.value)) {
    msg.value = t('footer.newsletter.invalidEmail') as string
    msgType.value = 'error'
    return
  }

  loading.value = true
  try {
    const res = await fetch(buildApiUrl('subscribers'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {
          email: email.value,
          receiveLocale: receiveLocale.value
        }
      })
    })

    // แปลง response เป็นข้อความถ้าจำเป็น (สำหรับ debug)
    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      // เผื่อกรณีซ้ำ/ข้อผิดพลาดจากแบ็กเอนด์
      const code = (data?.error?.status || res.status)
      if (code === 409) {
        msg.value = t('footer.newsletter.already') as string
      } else {
        msg.value = t('footer.newsletter.success') as string
      }
      msgType.value = 'success'
      return
    }

    // success
    msg.value = t('footer.newsletter.success') as string
    msgType.value = 'success'
    email.value = ''
  } catch (e) {
    msg.value = t('footer.newsletter.success') as string
    msgType.value = 'error'
  } finally {
    loading.value = false
  }
}
</script>
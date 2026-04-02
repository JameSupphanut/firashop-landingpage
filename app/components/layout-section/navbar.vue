<template>
  <!-- Sticky header (desktop: lg+) -->
  <header class="fixed inset-x-0 top-0 z-50 hidden min-[1440px]:flex items-center h-20
         bg-white/75 backdrop-blur border border-gray-200 rounded-full" style="margin: 20px 120px;">
    <div class="container mx-auto px-4 flex items-center justify-between">
      <NuxtLink to="/">
        <NuxtImg src="/image/logo/logo-ldp.png" width="280" height="auto" />
      </NuxtLink>

      <!-- Nav links -->
      <nav class="flex space-x-8">
        <NuxtLink v-for="link in rawLinks" :key="link.to" :to="link.to"
          class="px-2 py-1 font-medium rounded transition-colors"
          :class="$route.path === link.to ? 'text-primary font-bold' : 'text-gray-600 hover:text-primary'">
          {{ t(`nav.${link.key}`) }}
        </NuxtLink>
      </nav>

      <!-- Actions -->
      <div class="flex items-center space-x-4">
        <!-- Language dropdown (desktop) -->
        <div class="language-switchdropdown relative inline-block" ref="dropdownRef">
          <button class="inline-flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100" @click="toggleLang"
            aria-haspopup="menu" :aria-expanded="isLangOpen">
            <NuxtImg src="/image/lang-icon.png" width="20" height="20" alt="Language" />
            <span class="font-medium">{{ currentLangDisplay }}</span>
            <svg class="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div v-if="isLangOpen"
            class="dropdown-menu absolute right-0 top-[120%] min-w-[160px] bg-white rounded-xl shadow-lg z-50 py-2">
            <div v-for="lang in languages" :key="lang.value"
              class="px-4 py-2 cursor-pointer flex items-center justify-between hover:bg-gray-100"
              :class="{ 'bg-gray-50 font-semibold': lang.value === locale }" role="menuitem"
              @click="selectLanguage(lang.value)">
              <span class="text-sm">{{ lang.label }}</span>
              <svg v-if="lang.value === locale" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600"
                viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0L3.293 9.957a1 1 0 111.414-1.414l3.04 3.04 6.543-6.543a1 1 0 011.414 0z"
                  clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="mt-6 px-4 pb-6">
          <button
            class="group cta-button w-full h-12 font-semibold rounded-full flex items-center justify-center gap-2 bg-primary text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/30"
            @click="$router.push('/contact-us')">
            <span class="cta-icon-circle flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
              <svg class="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 20L20 4" />
                <path d="M10 4h10v10" />
              </svg>
            </span>
            <span class="leading-none">{{ t('navbar.ctaTrial') }}</span>
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile/Tablet top bar (show when < lg) -->
  <div v-if="!isMenuOpen" class="fixed top-5 left-0 right-0 mx-auto w-[90%] z-50 min-[1440px]:hidden
         flex items-center justify-between h-20 px-4
         bg-white/75 backdrop-blur border border-gray-200 rounded-full">
    <NuxtLink to="/">
      <NuxtImg src="/image/logo/logo-ldp.png" width="220" height="auto" />
    </NuxtLink>
    <button @click="toggleMenu" class="p-2 rounded-md hover:bg-gray-100">
      <svg v-if="!isMenuOpen" class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <svg v-else class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>

  <!-- Mobile/Tablet overlay panel (show when < lg) -->
  <transition name="fade">
    <div v-if="isMenuOpen"
      class="fixed inset-0 z-40 flex items-start justify-center bg-black/25 p-4 min-[1440px]:hidden">
      <div class="relative w-full max-w-sm sm:max-w-md md:max-w-4xl bg-white/90 backdrop-blur rounded-2xl shadow-xl overflow-auto"
        style="height: calc(100vh - 2rem); margin: 4px 0; border-radius: 40px;">
        <!-- Panel Header -->
        <div
          class="flex items-center justify-between h-20 px-4 bg-white/75 backdrop-blur border-b border-gray-200 rounded-t-2xl">
          <NuxtLink to="/">
            <img src="/image/logo/logo-ldp.png" width="160" height="auto" alt="Fira Shop" />
          </NuxtLink>
          <button @click="toggleMenu" class="p-2 rounded-full hover:bg-gray-100">
            <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Menu List -->
        <nav class="pt-4 px-4 pb-6 space-y-2">
          <NuxtLink v-for="link in rawLinks" :key="link.to" :to="link.to" @click="closeMenu"
            class="block h-12 px-4 rounded-lg text-lg font-semibold transition-colors" style="align-content: center;"
            :class="$route.path === link.to ? 'bg-[#FF2C55] text-white' : 'text-gray-800 hover:bg-orange-100'">
            {{ t(`nav.${link.key}`) }}
          </NuxtLink>

          <!-- Language Selector (mobile/tablet) -->
          <div class="mt-4 flex items-center justify-between h-12 px-4">
            <span class="font-kanit font-medium text-gray-700">{{ t('navbar.language') }}</span>

            <div class="language-switchdropdown relative inline-block" ref="dropdownRefMobile">
              <button class="inline-flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
                @click="toggleLangMobile" aria-haspopup="menu" :aria-expanded="isLangOpenMobile">
                <NuxtImg src="/image/lang-icon.png" width="20" height="20" alt="Language" />
                <span class="font-medium">{{ currentLangDisplay }}</span>
                <svg class="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div v-if="isLangOpenMobile"
                class="dropdown-menu absolute right-0 top-[120%] min-w-[160px] bg-white rounded-xl shadow-lg z-50 py-2">
                <div v-for="lang in languages" :key="lang.value"
                  class="px-4 py-2 cursor-pointer flex items-center justify-between hover:bg-gray-100"
                  :class="{ 'bg-gray-50 font-semibold': lang.value === locale }" role="menuitem"
                  @click="selectLanguage(lang.value); isLangOpenMobile = false">
                  <span class="text-sm">{{ lang.label }}</span>
                  <svg v-if="lang.value === locale" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600"
                    viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0L3.293 9.957a1 1 0 111.414-1.414l3.04 3.04 6.543-6.543a1 1 0 011.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- CTA Button -->
          <div class="mt-6 px-4 pb-6 justify-self-center">
            <button type="button"
              class="cta-button w-full h-12 font-semibold rounded-full flex items-center justify-center gap-2 bg-primary text-white"
              @click="goContact">
              <span class="cta-icon-circle flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
                <svg class="arrow-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </span>
              <span>{{ t('navbar.ctaTrial') }}</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCookie } from '#app'

type LocaleCode = 'en' | 'th' | 'zh' | 'ja'

const { t, locale } = useI18n<{ message: typeof import('~/locales/en.json') }, LocaleCode>({ useScope: 'global' })

// ลิงก์เมนู: เก็บ key/route แล้วค่อยแปลใน template
const rawLinks = [
  { key: 'home', to: '/' },
  { key: 'feature', to: '/feature' },
  { key: 'product', to: '/product' },
  { key: 'blog', to: '/blog' },
  { key: 'contact', to: '/contact-us' },
]

// ภาษา: dropdown states + cookie
const languages: { label: string; value: LocaleCode }[] = [
  { label: 'English', value: 'en' },
  { label: 'ไทย', value: 'th' },
  { label: '简体中文', value: 'zh' },
  { label: '日本語', value: 'ja' },
]
const dropdownRef = ref<HTMLElement | null>(null)
const dropdownRefMobile = ref<HTMLElement | null>(null)
const isLangOpen = ref(false)
const isLangOpenMobile = ref(false)
const router = useRouter()
const route = useRoute()

const currentLangDisplay = computed(() => (locale.value || 'en').toUpperCase())
const localeCookie = useCookie<LocaleCode | null>('locale', { maxAge: 60 * 60 * 24 * 365 })

function toggleLang() { isLangOpen.value = !isLangOpen.value }
function toggleLangMobile() { isLangOpenMobile.value = !isLangOpenMobile.value }

function selectLanguage(lang: LocaleCode) {
  locale.value = lang
  localeCookie.value = lang
  if (typeof document !== 'undefined') document.documentElement.setAttribute('lang', lang)
  isLangOpen.value = false
}

function handleClickOutside(e: MouseEvent) {
  const t = e.target as Node
  const outsideDesktop = dropdownRef.value && !dropdownRef.value.contains(t)
  const outsideMobile = dropdownRefMobile.value && !dropdownRefMobile.value.contains(t)
  if (outsideDesktop) isLangOpen.value = false
  if (outsideMobile) isLangOpenMobile.value = false
}

function closeMenu() {
  isMenuOpen.value = false
  isLangOpenMobile.value = false
}

async function goContact() {
  closeMenu()
  if (route.path !== '/contact-us') {
    await router.push('/contact-us')
  }
}

// mobile menu
const isMenuOpen = ref(false)
function toggleMenu() { isMenuOpen.value = !isMenuOpen.value }

// initial locale (โหลดจาก cookie ก่อน)
onMounted(() => {
  const saved = localeCookie.value
  if (saved === 'en' || saved === 'th' || saved === 'zh' || saved === 'ja') {
    locale.value = saved
  } else if (navigator?.language?.toLowerCase().startsWith('th')) {
    locale.value = 'th'
  } else if (navigator?.language?.toLowerCase().startsWith('zh')) {
    locale.value = 'zh'
  } else if (navigator?.language?.toLowerCase().startsWith('ja')) {
    locale.value = 'ja'
  } else {
    locale.value = 'en'
  }
  document.documentElement.setAttribute('lang', locale.value)

  document.addEventListener('mousedown', handleClickOutside)
})

watchEffect(() => {
  const el = document?.documentElement
  if (!el) return
  if (isMenuOpen.value) el.classList.add('overflow-hidden')
  else el.classList.remove('overflow-hidden')
})

onBeforeUnmount(() => {
  document?.documentElement.classList.remove('overflow-hidden')
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.hover\:text-primary:hover {
  color: var(--color-primary);
}

/* dropdown style (แบบเดียวกับตัวอย่าง) */
.dropdown-menu {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
}

.cta-button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #ff2c55;
  color: white;
  font-family: Kanit, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  padding: 0.25rem 0.25rem;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  width: 190px;
}

.cta-button:hover {
  background-color: #333333;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
}

.cta-icon-circle {
  background-color: var(--color-primary);
  border-radius: 999px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.cta-button:hover .cta-icon-circle {
  background-color: #333333;
}

.arrow-icon {
  transition: transform 0.3s ease;
  transform-origin: center;
}

/* hover แล้วหมุนลูกศร ↗ → */
.cta-button:hover .arrow-icon {
  transform: rotate(45deg);
}
</style>

<template>
    <section class="pt-12 pb-24">
      <div class="container mx-auto px-4">
        <div class="flex flex-col items-center text-center">
          <h1
            ref="headingRef"
            :class="[
              headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
              'transition-all duration-700 ease-out font-kanit font-semibold text-[32px] leading-[44px] mb-2'
            ]"
          >
            {{ t('section4.heading') }}
          </h1>
  
          <p
            :class="[
              headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
              'transition-all duration-700 ease-out delay-100 font-kanit font-normal text-[16px] leading-[24px] text-center'
            ]"
          >
            {{ t('section4.subtext') }}
          </p>
  
          <!-- Theme Image -->
          <div
            ref="imageRef"
            :class="[
              imageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
              'transition-all duration-700 ease-out delay-200 w-full max-w-3xl mb-8'
            ]"
          >
            <img :src="themeImage" :alt="t('section4.themePreviewAlt')" class="w-full" />
          </div>
  
          <h2
            ref="subheadingRef"
            :class="[
              subheadingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
              'transition-all duration-700 ease-out delay-300 text-xl font-bold mb-6 text-black'
            ]"
          >
            {{ t('section4.simulatorTitle') }}
          </h2>
  
          <!-- Theme Selection Cards -->
          <div
            ref="themesRef"
            :class="[
              themesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
              'transition-all duration-700 ease-out delay-400',
              'flex flex-wrap justify-center gap-4 sm:grid sm:grid-cols-5 sm:gap-4'
            ]"
          >
            <div
              v-for="theme in themes"
              :key="theme.key"
              @click="selectTheme(theme)"
              :class="[
                'w-1/4 sm:w-auto flex flex-col items-center justify-center rounded-xl p-4 cursor-pointer transition h-[100px] shadow-sm bg-white',
                selectedTheme === theme.key
                  ? 'border-2 border-primary'
                  : 'border-2 border-transparent hover:shadow-md hover:-translate-y-0.5'
              ]"
            >
              <div class="w-6 h-6 rounded-full mb-2" :style="{ backgroundColor: theme.color }"></div>
              <span class="text-sm font-medium capitalize text-gray-700">
                {{ t(`section4.themes.${theme.key}`) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  
  type ThemeKey = 'red' | 'blue' | 'orange' | 'pink' | 'green'
  interface ThemeDef {
    key: ThemeKey
    color: string
    image: string
  }
  
  const { t } = useI18n({ useScope: 'global' })
  
  const themes: ThemeDef[] = [
    { key: 'red',    color: '#EF4444', image: '/image/section4-redn-theme.png' },
    { key: 'blue',   color: '#3B82F6', image: '/image/section4-blue-theme.png' },
    { key: 'orange', color: '#FE9100', image: '/image/section4-orange-theme.png' },
    { key: 'pink',   color: '#EC4899', image: '/image/section4-pink-theme.png' },
    { key: 'green',  color: '#10B981', image: '/image/section4-green-theme.png' },
  ]
  
  const selectedTheme = ref<ThemeKey>('red')
  const themeImage   = ref<string>('/image/section4-redn-theme.png')
  
  const selectTheme = (theme: ThemeDef) => {
    selectedTheme.value = theme.key
    themeImage.value = theme.image
  }
  
  // IntersectionObserver logic
  const headingRef = ref<HTMLElement | null>(null)
  const imageRef = ref<HTMLElement | null>(null)
  const subheadingRef = ref<HTMLElement | null>(null)
  const themesRef = ref<HTMLElement | null>(null)
  
  const headingVisible = ref(false)
  const imageVisible = ref(false)
  const subheadingVisible = ref(false)
  const themesVisible = ref(false)
  
  function observeElement(elRef: { value: Element | null }, visibleRef: { value: boolean }, delay = 0) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => { visibleRef.value = true }, delay)
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.2 })
  
    if (elRef.value) observer.observe(elRef.value)
  }
  
  onMounted(() => {
    observeElement(headingRef, headingVisible)
    observeElement(imageRef, imageVisible)
    observeElement(subheadingRef, subheadingVisible)
    observeElement(themesRef, themesVisible)
  })
  </script>
  
  
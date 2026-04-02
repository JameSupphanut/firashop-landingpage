<template>
    <!-- Third Section -->
    <section class="section-content pt-12 bg-[#F4F5F9]">
      <div class="container max-w-1440 mx-auto">
        <div class="flex flex-col items-center gap-6">
  
          <!-- Heading -->
          <h1 ref="headingRef" :class="[
            headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
            'transition-all duration-700 ease-out text-center text-2xl md:text-3xl font-bold text-gray-800 max-w-3xl'
          ]">
            {{ t('section3.heading') }}
          </h1>
  
          <!-- Flex -->
          <div ref="gridRef" :class="[
            gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
            'transition-all duration-700 ease-out delay-100 flex flex-wrap justify-center items-center gap-x-12 lg:gap-x-8 gap-y-2 w-full max-w-4xl mx-auto'
          ]">
            <div class="flex items-center gap-1 text-gray-700 text-base md:text-lg">
              <svg-confirmcheck />
              <span>{{ t('section3.points.design') }}</span>
            </div>
            <div class="flex items-center gap-1 text-gray-700 text-base md:text-lg">
              <svg-confirmcheck />
              <span>{{ t('section3.points.easy') }}</span>
            </div>
            <div class="flex items-center gap-1 text-gray-700 text-base md:text-lg">
              <svg-confirmcheck />
              <span>{{ t('section3.points.salesReady') }}</span>
            </div>
          </div>
  
          <!-- Image -->
          <img ref="imageRef" src="/image/section3-hm-main.png" alt="Firashop main banner" :class="[
            imageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
            'transition-all duration-700 ease-out delay-300 mt-4 mx-auto w-full max-w-full object-contain'
          ]" />
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  
  const { t } = useI18n({ useScope: 'global' })
  
  // refs for DOM elements
  const headingRef = ref(null)
  const gridRef = ref(null)
  const bannerRef = ref(null)
  const imageRef = ref(null)
  
  // visibility control
  const headingVisible = ref(false)
  const gridVisible = ref(false)
  const bannerVisible = ref(false)
  const imageVisible = ref(false)
  
  // observer helper function
  function observeElement(elRef, visibleRef, options = { threshold: 0.2 }) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        visibleRef.value = true
        observer.unobserve(entry.target)
      }
    }, options)
  
    if (elRef.value) {
      observer.observe(elRef.value)
    }
  }
  
  // run on mount
  onMounted(() => {
    observeElement(headingRef, headingVisible)
    observeElement(gridRef, gridVisible)
    observeElement(bannerRef, bannerVisible)
    observeElement(imageRef, imageVisible)
  })
  </script>
  
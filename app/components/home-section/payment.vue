<template>
    <!-- Section 05 -->
    <section class="w-full py-20 relative bg-[#1D1D1D] overflow-hidden">
      <!-- gradient strip -->
      <div class="absolute inset-0 bg-gradient-to-r from-[#FF2C55] via-transparent to-[#FF2C55] opacity-20 pointer-events-none z-0"></div>
  
      <!-- Content -->
      <div
        ref="sectionRef"
        :class="[
          sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          'transition-all duration-700 ease-out relative z-10 mx-auto'
        ]"
        class="flex flex-col items-center px-4"
        style="max-width: 715px;"
      >
        <!-- JUST 4.8% -->
        <h2 class="font-kanit font-semibold uppercase text-[#FF2C55] text-[72px] leading-[88px] text-center mb-6">
          {{ t('section5.just') }}
          <span>{{ animatedNumber.toFixed(1) }}%</span>
        </h2>
  
        <!-- OF TRANSACTIONS -->
        <div class="font-kanit font-semibold uppercase text-white text-[72px] leading-[88px] text-center -mt-2 responsive-of-transactions">
          {{ t('section5.ofTransactions') }}
        </div>
  
        <!-- + COST OF CHANNEL -->
        <span class="font-kanit font-semibold uppercase text-white text-[32px] leading-[48px] text-center mt-2 responsive-cost-channel">
          {{ t('section5.costOfChannel') }}
        </span>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  
  const { t } = useI18n({ useScope: 'global' })
  
  const sectionRef = ref<HTMLElement | null>(null)
  const sectionVisible = ref(false)
  const animatedNumber = ref(0)
  
  function observeElement(
    elRef: { value: Element | null },
    visibleRef: { value: boolean },
    callback?: () => void
  ) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visibleRef.value = true
          observer.unobserve(entry.target)
          callback?.()
        }
      },
      { threshold: 0.2 }
    )
    if (elRef.value) observer.observe(elRef.value)
  }
  
  function animateNumber(target: number, step = 0.1) {
    const totalSteps = Math.ceil((target - animatedNumber.value) / step)
    let currentStep = 0
    function update() {
      if (currentStep < totalSteps) {
        animatedNumber.value += step
        currentStep++
        requestAnimationFrame(update)
      } else {
        animatedNumber.value = target
      }
    }
    update()
  }
  
  onMounted(() => {
    observeElement(sectionRef, sectionVisible, () => {
      animateNumber(4.8)
    })
  })
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@600;800&display=swap');
  
  /* ✅ Mobile responsive overrides */
  @media (max-width: 768px) {
    .responsive-of-transactions {
      font-size: 32px !important;
      line-height: 44px !important;
    }
    .responsive-cost-channel {
      font-size: 20px !important;
      line-height: 28px !important;
    }
  }
  </style>
  
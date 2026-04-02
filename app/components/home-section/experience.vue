<template>
    <section class="section-content px-4 py-16 bg-gradient-to-r from-[#fff] to-white">
      <div class="max-w-7xl mx-auto px-4 md:px-6">
  
        <!-- Heading -->
        <h2 ref="headingRef" :class="[
          headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          'transition-all duration-700 ease-out text-center font-kanit font-bold text-[24px] md:text-[32px] leading-snug text-primary mb-4'
        ]">
          {{ t('section2.heading') }}
        </h2>
  
        <!-- Subtext -->
        <p ref="subtextRef" :class="[
          subtextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          'transition-all duration-700 ease-out delay-100 text-center text-gray-700 text-base md:text-lg font-kanit font-normal mb-12'
        ]">
          {{ t('section2.subtext') }}
        </p>
  
        <!-- Icons Grid -->
        <div ref="iconsRef" class="icons-grid-wrapper relative" :class="[
          iconsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          'transition-all duration-700 ease-out delay-200 grid grid-cols-1 sm:grid-cols-2 gap-6'
        ]">
          <div class="blur-circle" />
          <div class="feature-card">
            <img src="/image/hm02-1.gif" alt="icon1" class="mb-4 w-20 h-20 object-contain" />
            <span class="feature-text">{{ t('section2.features.onlineShop') }}</span>
          </div>
  
          <div class="feature-card">
            <img src="/image/hm02-2.gif" alt="icon2" class="mb-4 w-20 h-20 object-contain" />
            <span class="feature-text">{{ t('section2.features.backend') }}</span>
          </div>
  
          <div class="feature-card">
            <img src="/image/hm02-3.gif" alt="icon3" class="mb-4 w-20 h-20 object-contain" />
            <span class="feature-text">{{ t('section2.features.marketing') }}</span>
          </div>
  
          <div class="feature-card">
            <img src="/image/hm02-4.gif" alt="icon4" class="mb-4 w-20 h-20 object-contain" />
            <span class="feature-text">{{ t('section2.features.security') }}</span>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  
  const { t } = useI18n()
  
  const headingRef = ref(null)
  const subtextRef = ref(null)
  const iconsRef = ref(null)
  
  const headingVisible = ref(false)
  const subtextVisible = ref(false)
  const iconsVisible = ref(false)
  
  function observeElement(elRef, visibleRef) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visibleRef.value = true
          observer.unobserve(entry.target) // ถ้าต้องการเล่นแค่ครั้งเดียว
        }
      },
      {
        threshold: 0.2, // ปรากฏ 20% แล้วเริ่ม animation
      }
    )
  
    if (elRef.value) {
      observer.observe(elRef.value)
    }
  }
  
  onMounted(() => {
    observeElement(headingRef, headingVisible)
    observeElement(subtextRef, subtextVisible)
    observeElement(iconsRef, iconsVisible)
  })
  </script>
  
  <style>
  .icons-grid-wrapper {
    position: relative;
    padding: 60px 30px 20px 30px;
  }
  
  .blur-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 340px;
    height: 340px;
    background: rgba(255, 44, 85, 0.8);
    /* เดิมคือ 0.8 (cc), ปรับเหลือ 0.2 */
    filter: blur(120px);
    /* ทำให้แสงฟุ้งแบบนุ่ม */
    border-radius: 50%;
    z-index: 0;
    pointer-events: none;
  }
  
  .feature-card {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2.5rem 0.5rem;
    border-radius: 1rem;
    background-color: rgba(255, 255, 255, 0.75);
    backdrop-filter: saturate(180%) blur(10px);
    transition: all 0.4s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    /* ทำให้ border ไม่ล้น */
  }
  
  .feature-card::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 2px;
    border-radius: 1rem;
    background: linear-gradient(270deg, #3e3e3e, #FF2C55, #3e3e3e);
    background-size: 600% 600%;
    animation: none;
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
    z-index: 0;
  }
  
  .feature-card:hover::before {
    opacity: 1;
    animation: animated-gradient 3s linear infinite;
  }
  
  @keyframes animated-gradient {
    0% {
      background-position: 0% 50%;
    }
  
    50% {
      background-position: 100% 50%;
    }
  
    100% {
      background-position: 0% 50%;
    }
  }
  
  .feature-text {
    font-family: 'Kanit', sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    letter-spacing: 0;
    text-align: center;
    display: block;
  }
  
  @media (max-width: 768px) {
    .icons-grid-wrapper {
      position: relative;
      padding: 60px 0px 20px 0px;
    }
  }
  </style>
  
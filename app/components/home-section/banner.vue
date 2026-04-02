<template>
    <section class="banner-main relative overflow-hidden">
        <!-- Background Video -->
        <video autoplay muted loop playsinline class="banner-bg-video" src="/image/hm01-bg.mp4"></video>

        <!-- Content -->
        <div class="banner-content relative z-10">
            <div class="banner-text">
                <h1 class="heading-main">{{ t('hero.headingMain') }}</h1>

                <div class="webshop-mask" :style="maskStyle">
                    <video autoplay muted loop playsinline class="webshop-video" src="/image/hm01-text-bg.mp4"></video>
                </div>


                <p class="sub-heading">{{ t('hero.subHeading') }}</p>

                <button class="cta-button" @click="$router.push('/contact-us')">
                    <span class="cta-icon-circle">
                        <svg class="arrow-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 20L20 4" />
                            <path d="M10 4h10v10" />
                        </svg>
                    </span>
                    <span>{{ t('hero.cta') }}</span>
                </button>
            </div>

            <div class="banner-image relative">
                <Lottie name="hero-banner" />
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'


const { t } = useI18n({ useScope: 'global' })
const animContainer = ref<HTMLDivElement | null>(null)

const textLabel = computed(() => 'Webshop')

const BOX_W = 304
const BOX_H = 88

const MASK_W = 304
const MASK_H = 110
const OFFSET_Y = BOX_H - MASK_H

const maskSvg = computed(() => {
    const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${MASK_W}" height="${MASK_H}" viewBox="0 0 ${MASK_W} ${MASK_H}">
    <style>
      text{
        font-family: 'Kanit', sans-serif;
        font-weight: 600;
        font-style: normal;
        font-size: 68px;
        letter-spacing: 0;
        text-rendering: geometricPrecision;
      }
    </style>
    <!-- baseline วางที่ 84px ภายในผืน 110px -->
    <text x="0" y="84" fill="white">${textLabel.value}</text>
  </svg>`
    return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`
})

const maskStyle = computed(() => ({
    WebkitMaskImage: maskSvg.value,
    maskImage: maskSvg.value,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskSize: `${MASK_W}px ${MASK_H}px`,
    maskSize: `${MASK_W}px ${MASK_H}px`,
    WebkitMaskPosition: `0 ${OFFSET_Y}px`,
    maskPosition: `0 ${OFFSET_Y}px`,
    WebkitMaskMode: 'luminance',
    maskMode: 'luminance',
}))
</script>


<style scoped>
.banner-main {
    position: relative;
    padding: 6% 1rem;
    overflow: hidden;
}

.banner-bg-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
}

.banner-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 48px;
    padding-bottom: 48px;
}

.banner-text {
    flex: 1 1 300px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-left: 28px;
}

.webshop-mask {
    width: 304px;
    height: 88px;
    display: block;
    position: relative;
    overflow: hidden;
    -webkit-mask-mode: luminance;
    mask-mode: luminance;
}

.webshop-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.heading-main {
    font-family: Kanit, sans-serif;
    font-weight: 600;
    font-size: 72px;
    line-height: 88px;
    margin: 0;
    color: #2b2b2b;
}

.webshop-svg-wrapper {
    width: 304px;
    height: 88px;
}

.video-clip-svg {
    width: 100%;
    height: 100%;
    display: block;
}

.sub-heading {
    font-size: 32px;
    font-weight: 600;
    line-height: 44px;
    margin: 0;
    color: var(--color-primary);
    padding-bottom: 20px;
}

.cta-button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background-color: #ff2c55;
    color: white;
    font-family: Kanit, sans-serif;
    font-size: 18px;
    font-weight: 600;
    padding: 0.25rem 0.25rem;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    transition: filter 0.3s ease;
    width: 190px;
    transition-duration: 600ms;
}

.cta-button:hover {
    background-color: #333333;
}

.cta-icon-circle {
    background-color: #1e1e1e;
    border-radius: 999px;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cta-button:hover .cta-icon-circle {
  background-color: var(--color-primary);
}

.arrow-icon {
    width: 16px;
    height: 16px;
}

.arrow-icon {
  transition: transform 0.3s ease;
  transform-origin: center;
}

/* hover แล้วหมุนลูกศร ↗ → */
.cta-button:hover .arrow-icon {
  transform: rotate(45deg);
}

.banner-image {
    flex: 1 1 300px;
    display: flex;
    justify-content: center;
    position: relative;
}

.banner-image img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
    z-index: 2;
}

@media (max-width: 1439px) {
    .banner-content {
        max-width: 900px;
    }
}

/* ✅ Mobile Responsive */
@media (max-width: 768px) {
    .banner-content {
        flex-direction: column;
        text-align: center;
        padding-top: 8rem;
    }

    .banner-text {
        align-items: center;
        padding-left: 0;
    }

    .heading-main {
        font-size: 72px;
        line-height: 88px;
    }

    .webshop-svg-wrapper {
        width: 360px;
        height: 84px;
    }

    .sub-heading {
        font-size: 32px;
        line-height: 48px;
    }

    .cta-button {
        font-size: 14px;
        padding: 0.5rem 1.5rem;
        gap: 0.5rem;
    }

    .cta-icon-circle {
        width: 28px;
        height: 28px;
    }

    .arrow-icon {
        width: 14px;
        height: 14px;
    }
}
</style>
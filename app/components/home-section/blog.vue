<template>
    <section class="bg-[#F4F5F9] py-12 overflow-x-hidden">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6">
  
          <!-- กล่องข้อความซ้าย -->
          <div
            ref="leftBoxRef"
            :class="[
              leftBoxVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10',
              'transition-all duration-700 ease-out w-full lg:w-1/5 text-center lg:text-left'
            ]"
          >
            <h4 class="font-kanit font-semibold text-[20px] leading-[28px] tracking-normal mb-2 text-primary">
              {{ t('homeArticles.badge') }}
            </h4>
  
            <!-- Mobile heading -->
            <h2
              class="font-kanit font-semibold text-[32px] leading-[44px] tracking-normal 
                     text-gray-800 mb-6 whitespace-pre-line max-w-md mx-auto lg:mx-0 block md:hidden"
            >
              {{ t('homeArticles.headingMobile') }}
            </h2>
  
            <!-- Desktop heading (3 บรรทัด) -->
            <h2
              class="font-kanit font-semibold text-[32px] leading-[44px] tracking-normal 
                     text-gray-800 mb-6 whitespace-pre-line max-w-md mx-auto lg:mx-0 hidden md:block"
            >
              {{ t('homeArticles.headingDesktop') }}
            </h2>
            <button
              @click="$router.push('/blog')"
              class="read-more-btn px-6 py-3 text-base md:text-lg"
            >
              {{ t('homeArticles.readAll') }}
            </button>
          </div>
  
          <!-- การ์ดบทความด้านขวา -->
          <div
            ref="rightBoxRef"
            :class="[
              rightBoxVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10',
              'transition-all duration-700 ease-out w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
            ]"
          >
            <div
              v-for="(article, index) in articles"
              :key="index"
              class="group bg-white rounded-[16px] shadow-md overflow-hidden transition hover:shadow-lg hover:bg-black/90 cursor-pointer"
              @click="$router.push(`/blog-details/${article.id}`)"
            >
              <div class="relative rounded-t-[16px] overflow-hidden">
                <img :src="article.coverUrl" :alt="article.title" class="w-full h-36 object-cover" />
                <!-- ป้าย category -->
                <div
                  class="absolute top-2 right-2 px-2 py-1 rounded-full shadow select-none bg-black/90 text-white text-xs font-medium"
                >
                  {{ article.category }}
                </div>
              </div>
              <div class="p-4">
                <h3 class="font-semibold text-base whitespace-pre-line mb-2 transition-colors group-hover:text-white">
                  {{ article.title }}
                </h3>
                <p class="text-sm text-gray-400 transition-colors group-hover:text-gray-300">
                  {{ article.date }}
                </p>
              </div>
            </div>
          </div>
  
        </div>
      </div>
    </section>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted, computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  
  interface Article {
    id: number
    title: string
    category: string
    coverUrl: string
    date: string
  }
  
  const { t, locale } = useI18n({ useScope: 'global' })
  const articles = ref<Article[]>([])
  
  // DOM refs & visible states
  const leftBoxRef = ref<HTMLElement | null>(null)
  const rightBoxRef = ref<HTMLElement | null>(null)
  const leftBoxVisible = ref(false)
  const rightBoxVisible = ref(false)
  
  function observeElement(elRef: any, visibleRef: any) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        visibleRef.value = true
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.2 })
    if (elRef.value) observer.observe(elRef.value)
  }
  
  const BASE_URL = import.meta.env.VITE_API_URL
  const API_PATH = import.meta.env.VITE_API_PATH
  
  function buildApiUrl(endpoint: string, query: Record<string, any> = {}) {
    const url = new URL(`${BASE_URL}/${API_PATH}/${endpoint}`)
    Object.entries(query).forEach(([key, value]) => url.searchParams.append(key, String(value)))
    return url.toString()
  }
  
  // map locale → Intl locale (format วันที่)
  const dateLocale = computed(() => {
    switch (locale.value) {
      case 'en': return 'en-US'
      case 'ja': return 'ja-JP'
      default: return 'th-TH'
    }
  })
  
  // ถ้า path รูปจาก API ไม่ใช่ absolute ให้เติม BASE_URL
  function resolveImageUrl(path: string): string {
    if (!path) return ''
    return path.startsWith('http') ? path : `${BASE_URL}${path}`
  }
  
  async function fetchLatestArticles() {
    try {
      const url = buildApiUrl('blogs', {
        'pagination[page]': 1,
        'pagination[pageSize]': 3,
        populate: '*',
        locale: locale.value,          // ✅ ดึงตามภาษา UI
        sort: 'createdAt:desc',
      })
      const res = await fetch(url)
      const json = await res.json()
  
      const otherLabel = t('homeArticles.other') // ✅ คำแปล “อื่นๆ / Others / その他”
  
      articles.value = json.data.map((item: any) => ({
        id: item.documentId,
        title: item.title,
        category: item.category?.name || otherLabel,
        coverUrl: resolveImageUrl(item.cover?.formats?.medium?.url || item.cover?.url || ''),
        date: new Date(item.createdAt).toLocaleDateString(dateLocale.value, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      }))
    } catch (err) {
      console.error('❌ โหลดบทความล้มเหลว:', err)
    }
  }
  
  onMounted(() => {
    observeElement(leftBoxRef, leftBoxVisible)
    observeElement(rightBoxRef, rightBoxVisible)
    fetchLatestArticles()
  })
  </script>
  
  
  <style scoped>
  .read-more-btn {
    background: var(--color-primary);
    color: white;
    padding: 0.75rem 2rem;
    border-radius: 9999px;
    font-size: 1rem;
    font-weight: 600;
    transition: background 0.3s ease, color 0.3s ease, transform 0.2s ease;
    cursor: pointer;
    display: inline-block;
    text-align: center;
    white-space: nowrap;
  }
  
  .read-more-btn:hover {
    background: #000;
    color: #fff;
    transform: translateY(-2px);
  }
  
  </style>
  
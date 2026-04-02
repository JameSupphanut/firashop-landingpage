<template>
  <footer class="relative border-t border-transparent bg-[#f6f7fa] pt-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 text-center md:grid-cols-2 lg:[grid-template-columns:1.65fr_1fr_1fr_1.25fr] lg:gap-x-14 lg:text-left">

        <!-- ข้อมูลบริษัท -->
        <div class="order-1">
          <NuxtImg
            src="/image/logo/logo-ldp.png"
            alt="Fira Shop Logo"
            width="260"
            class="relative left-auto mx-auto h-auto lg:-left-12 lg:mx-0"
          />

          <p class="mx-auto mb-4 max-w-xs text-gray-600 lg:mx-0">
            {{ t('footer.company.description') }}
          </p>

          <div class="mb-2 flex items-start justify-center gap-2 pt-2 lg:justify-start">
            <UIcon name="i-heroicons-map-pin-solid" class="mt-1 h-6 w-6 text-gray-700" />
            <span class="text-left text-sm text-gray-700">
              {{ t('footer.company.address.line1') }}<br />
              {{ t('footer.company.address.line2') }}<br />
              {{ t('footer.company.address.line3') }}
            </span>
          </div>

          <div class="flex items-center justify-center gap-2 pt-2 lg:justify-start">
            <UIcon name="i-heroicons-envelope-solid" class="h-6 w-6 text-gray-700" />
            <span class="text-gray-700 text-sm">support@wiselysource.com</span>
          </div>
        </div>

        <!-- ลงทะเบียนรับข่าวสาร -->
        <div class="order-2 lg:order-4">
          <div class="mb-3 pb-2 text-[18px] font-semibold leading-[28px] text-gray-800 font-kanit">
            {{ t('footer.newsletter.title') }}
          </div>

          <form
            class="group mx-auto flex w-full overflow-hidden rounded-full border border-gray-300 transition-colors duration-300 hover:border-primary focus-within:border-primary lg:mx-0 lg:max-w-[300px] xl:max-w-[520px]"
            @submit.prevent="onSubscribe"
            novalidate
          >
            <input
              v-model.trim="email"
              :disabled="loading"
              type="email"
              autocomplete="email"
              class="h-10 min-w-0 flex-1 bg-transparent px-4 text-sm text-gray-700 outline-none focus:ring-0 font-kanit"
              :placeholder="t('footer.newsletter.placeholder')" />

            <button
              type="submit"
              :disabled="loading"
              class="regis-btn h-10 min-w-[120px] shrink-0 rounded-full bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-[#000000] disabled:cursor-not-allowed disabled:opacity-60 font-kanit md:h-11 md:min-w-[150px] md:px-8"
            >
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
          <div class="mb-6 pb-2 text-lg font-bold text-gray-800 lg:mb-3 lg:text-left">
            {{ t('footer.menu.title') }}
          </div>
          <ul class="space-y-6 text-gray-700 lg:space-y-4 lg:text-left">
            <li>
              <NuxtLink to="/" class="transition-colors hover:text-primary">
                {{ t('footer.menu.items.home') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/feature" class="transition-colors hover:text-primary">
                {{ t('footer.menu.items.features') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/product" class="transition-colors hover:text-primary">
                {{ t('nav.product') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/blog" class="transition-colors hover:text-primary">
                {{ t('footer.menu.items.blog') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact-us" class="transition-colors hover:text-primary">
                {{ t('footer.menu.items.contact') }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- ศูนย์ช่วยเหลือ -->
        <div class="order-3 lg:mx-auto lg:w-max">
          <div class="mb-6 pb-2 text-lg font-bold text-gray-800 lg:mb-3 lg:text-left">
            {{ t('footer.help.title') }}
          </div>
          <ul class="space-y-6 text-gray-700 lg:space-y-4 lg:text-left">
            <li>
              <NuxtLink to="/policy" class="transition-colors hover:text-primary">
                {{ t('footer.help.items.privacy') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/terms" class="transition-colors hover:text-primary">
                {{ t('footer.help.items.terms') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/refund" class="transition-colors hover:text-primary">
                {{ t('footer.help.items.refund') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/faq" class="transition-colors hover:text-primary">
                {{ t('footer.help.items.faq') }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-10">
      <div class="container mx-auto px-4">
        <p class="pt-8 text-left text-sm text-gray-400">
          {{ t('footer.copyright', { year }) }}
        </p>
      </div>
    </div>

    <div class="mt-6 h-2 w-full bg-primary" />
  </footer>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const year = new Date().getFullYear()

// form state
const email = ref('')
const loading = ref(false)
const msg = ref<string | null>(null)
const msgType = ref<'success' | 'error'>('success')

//script function
function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

function onSubscribe() {
  if (!isValidEmail(email.value)) {
    msgType.value = 'error'
    msg.value = t('footer.newsletter.error')
  }
}

function onSubscribeSuccess() {
  msgType.value = 'success'
  msg.value = t('footer.newsletter.success')
}


</script>

<style>

</style>
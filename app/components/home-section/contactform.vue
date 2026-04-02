<template>
    <!-- Contact Section -->
    <section class="w-full bg-[#333333] py-16">
      <div class="max-w-7xl mx-auto px-14">
        <div class="flex flex-col lg:flex-row items-start gap-8">
  
          <!-- Left: Title + Buttons -->
          <div class="w-full lg:w-1/3 text-white">
            <h2
              class="font-kanit font-semibold text-[32px] leading-[44px] mb-2 pb-4 text-center lg:text-left justify-self-center lg:justify-self-start">
              {{ t('contact.left.titleLine1') }}<br />
              {{ t('contact.left.titleLine2') }}<br />
              {{ t('contact.left.titleLine3') }}
            </h2>
            <p class="font-kanit text-[16px] leading-[28px] text-gray-400 pb-6 mb-5 justify-self-center lg:justify-self-start"
              style="color: #828282;">
              {{ t('contact.left.subtitle') }}
            </p>
  
            <div class="flex flex-col gap-3 max-w-full lg:max-w-xs justify-self-center lg:justify-self-start">
              <!-- Email -->
              <a href="mailto:info@firashop.com"
                class="social-btn mail-btn relative flex items-center justify-center md:justify-start px-6 py-3 rounded-full bg-white shadow-md">
                <svg-mailicon class="absolute left-4 md:static" />
                <span class="w-full text-center md:text-left">
                  info@firashop.com
                </span>
              </a>
  
              <!-- Line -->
              <a href="https://lin.ee/mHQEgzlr" target="_blank"
                class="social-btn line-btn relative flex items-center justify-center md:justify-start px-6 py-3 rounded-full bg-white shadow-md">
                <svg-lineicon class="absolute left-4 md:static" />
                <span class="w-full text-center md:text-left">
                  Line OA
                </span>
              </a>
  
              <!-- Facebook -->
              <div
                class="social-btn fb-btn relative flex items-center justify-center md:justify-start px-6 py-3 rounded-full bg-white shadow-md">
                <svg-facebookicon class="absolute left-4 md:static" />
                <span class="w-full text-center md:text-left">
                  Facebook
                </span>
              </div>
                <!-- IG -->
                <a href="https://www.instagram.com/firashop_official/" target="_blank"
                class="social-btn ig-btn relative flex items-center justify-center md:justify-start px-6 py-3 rounded-full bg-white shadow-md">
                <svg-igicon class="absolute left-4 md:static" />
                <span class="w-full text-center md:text-left">
                  Instagram
                </span>
              </a>
            </div>
          </div>
  
          <!-- Right: Form -->
          <div class="w-full lg:w-2/3">
            <div
              class="bg-[#3F3F3F] border border-[#3D3D3D] rounded-[32px] px-8 py-10 shadow-xl max-w-[790px] mx-auto lg:mx-0">
              <form @submit.prevent="handleSubmit" ref="contactForm" action="https://formspree.io/f/mnnvowdk"
                method="POST" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <!-- Form Title -->
                <h3
                  class="col-span-full font-kanit font-semibold text-[28px] leading-[36px] text-primary mb-6 text-center sm:text-left">
                  {{ t('contact.form.title') }}
                </h3>
  
                <!-- First Name -->
                <div>
                  <label for="first-name" class="block font-kanit text-[14px] text-gray-300 mb-1">
                    {{ t('contact.form.firstName.label') }}
                  </label>
                  <input id="first-name" name="first-name" type="text" class="input"
                    :placeholder="t('contact.form.firstName.placeholder')" required />
                </div>
  
                <!-- Last Name -->
                <div>
                  <label for="last-name" class="block font-kanit text-[14px] text-gray-300 mb-1">
                    {{ t('contact.form.lastName.label') }}
                  </label>
                  <input id="last-name" name="last-name" type="text" class="input"
                    :placeholder="t('contact.form.lastName.placeholder')" required />
                </div>
  
                <!-- Email -->
                <div>
                  <label for="email" class="block font-kanit text-[14px] text-gray-300 mb-1">
                    {{ t('contact.form.email.label') }}
                  </label>
                  <input id="email" name="email" type="email" class="input"
                    :placeholder="t('contact.form.email.placeholder')" required />
                </div>
  
                <!-- Phone -->
                <div>
                  <label for="phone" class="block font-kanit text-[14px] text-gray-300 mb-1">
                    {{ t('contact.form.phone.label') }}
                  </label>
                  <input id="phone" name="phone" type="tel" class="input"
                    :placeholder="t('contact.form.phone.placeholder')" required />
                </div>
  
                <!-- Message -->
                <div class="sm:col-span-2">
                  <label for="message" class="block font-kanit text-[14px] text-gray-300 mb-1">
                    {{ t('contact.form.message.label') }}
                  </label>
                  <textarea id="message" name="message" rows="4" class="input resize-none"
                    :placeholder="t('contact.form.message.placeholder')" required></textarea>
                </div>
  
                <!-- Submit -->
                <div class="sm:col-span-2">
                  <button type="submit" class="w-full font-kanit font-semibold text-[16px] leading-[24px] 
             bg-primary text-white py-3 rounded-[16px] transition-colors
             hover:bg-white hover:text-gray-700 border border-primary" :disabled="submitting">
                    {{ submitting ? t('contact.form.submitting') : t('contact.form.submit') }}
                  </button>
                </div>
              </form>
            </div>
          </div>
  
        </div>
      </div>
  
      <!-- Popup -->
      <transition name="fade">
        <div v-if="showPopup" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div class="bg-white rounded-[16px] p-6 max-w-sm w-full text-center shadow-lg">
            <h4 class="font-kanit font-semibold text-[20px] leading-[28px] text-primary mb-4">
              {{ t('contact.popup.title') }}
            </h4>
            <p class="font-kanit text-[16px] leading-[24px] mb-6">
              {{ t('contact.popup.body') }}
            </p>
            <button @click="showPopup = false"
              class="font-kanit font-semibold text-[16px] leading-[24px] bg-primary text-white px-6 py-2 rounded-[16px] hover:bg-[#e08800] transition">
              {{ t('contact.popup.ok') }}
            </button>
          </div>
        </div>
      </transition>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  
  const { t } = useI18n({ useScope: 'global' })
  
  const showPopup = ref(false)
  const submitting = ref(false)
  const contactForm = ref<HTMLFormElement | null>(null)
  
  async function handleSubmit() {
    if (!contactForm.value) return
    submitting.value = true
    const formData = new FormData(contactForm.value)
    try {
      const res = await fetch(contactForm.value.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })
      if (res.ok) {
        showPopup.value = true
        contactForm.value.reset()
      } else {
        alert(t('contact.form.error'))
      }
    } catch {
      alert(t('contact.form.error'))
    } finally {
      submitting.value = false
    }
  }
  </script>
  
  <style scoped>
  .input {
    width: 100%;
    padding: 0.75rem 1rem;
    background: #444;
    border: 1px solid #515151;
    border-radius: 0.75rem;
    color: #fff;
    font-family: 'Kanit', sans-serif;
    font-size: 1rem;
    line-height: 1.5rem;
    outline: none;
    transition: background 0.2s, border-color 0.2s;
  }
  
  .input:hover {
    background: #333;
    border-color: #FF2C55;
  }
  
  .input:focus {
    background: #333;
    border-color: #FF2C55;
  }
  
  .forminput {
    background-color: #3f3f3f;
    border: 1px solid #3d3d3d;
    border-radius: 32px;
    max-width: 690px;
    width: 100%;
    box-shadow: 0 4px 32px rgba(0, 0, 0, 0.12);
  }
  
  .bg-primary {
    background: #FF2C55;
  }
  
  .bg-primary:hover {
    background: #FFFFFF;
    border-color: #3f3f3f;
  }
  
  .text-primary {
    color: #FF2C55;
    justify-self: center;
  }
  
  .gradient-btn {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 0.75rem;
    padding: 0.5rem 1rem;
    font-weight: 600;
    font-size: 0.875rem;
    color: white;
    background: linear-gradient(90deg, #FF2C55, #ffc7d3);
    border-radius: 9999px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;
  }
  
  .gradient-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
  
  /* Animation for popup fade */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  .social-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    /* 12px */
    width: 330px;
    padding: 0.75rem 1rem;
    /* py-3 px-4 */
    background: linear-gradient(90deg, #FF2C55, #6D1224);
    /* พื้นฐาน */
    color: #fff;
    font-family: 'Kanit', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    /* 14px */
    line-height: 1.25rem;
    /* 20px */
    border-radius: 9999px;
    /* cursor: pointer; */
    transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    .social-btn {
      width: 320px;
      padding: 12px 22px;
    }
  }
  
  @media (max-width: 767px) {
    .social-btn {
      width: 320px;
      padding: 22px 0px;
    }
  }
  
  /* Mail (อีเมล) hover — สีส้มเข้ม → ส้มอ่อน */
  .mail-btn:hover {
    background: linear-gradient(90deg,
        #e08800 0%,
        /* ส้มเข้มขึ้นนิด */
        #ffb85a 100%
        /* ส้มอ่อนขึ้นนิด */
      );
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
  
  /* LINE hover — เขียวเข้ม → เขียวอ่อน */
  .line-btn:hover {
    background: linear-gradient(90deg,
        #009a00 0%,
        /* เขียวเข้มขึ้นเล็กน้อย */
        #6fcf97 100%
        /* เขียวอ่อนขึ้นเล็กน้อย */
      );
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
  
  /* Facebook hover — ฟ้าเข้ม → ฟ้าอ่อน */
  .fb-btn:hover {
    background: linear-gradient(90deg,
        #155ad1 0%,
        /* ฟ้าเข้มขึ้นเล็กน้อย */
        #97bbff 100%
        /* ฟ้าอ่อนขึ้นเล็กน้อย */
      );
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
  
  /* Instagram hover — สีชมพูเข้ม → สีชมพูอ่อน */
  .ig-btn:hover {
    background: linear-gradient(45deg, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
  </style>
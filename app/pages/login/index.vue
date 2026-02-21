<template>
  <div class="min-h-screen bg-[#F8F8F8] flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Decorative shape (dome/arch) bottom-left -->
    <div
      class="absolute bottom-0 left-0 w-64 h-64 opacity-[0.08] pointer-events-none"
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 200" fill="none" class="w-full h-full text-accent">
        <path
          d="M0 200V80c0-22 18-40 40-40 22 0 40 18 40 40v120M80 200V60c0-33 27-60 60-60 33 0 60 27 60 60v140"
          stroke="currentColor"
          stroke-width="2"
        />
      </svg>
    </div>

    <div class="w-full max-w-md relative z-10">
      <!-- Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <!-- Language selector (top-right in RTL) -->
        <div class="flex justify-start mb-6">
          <LanguageButton @click="showLanguageModal = true" />
        </div>
        <LanguageModal v-model="showLanguageModal" />

        <!-- Logo -->
        <div class="flex flex-col items-center mb-6">
          <img
            src="~/assets/images/logo.png"
            :alt="t('common.appName')"
            class="h-16 w-auto max-w-[160px] object-contain mb-2"
          />
          <p class="text-lg font-semibold text-accent">{{ t('common.appName') }}</p>
        </div>

        <!-- Title -->
        <h1 class="text-xl font-bold text-gray-900 text-center mb-1">
          {{ t('login.title') }}
        </h1>
        <p class="text-sm text-gray-500 text-center mb-6">
          {{ t('login.subtitle') }}
        </p>

        <!-- Form -->
        <form @submit.prevent="onSubmit" class="space-y-4">
          <!-- Phone -->
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-1.5 text-right">
              {{ t('login.phoneLabel') }}
            </label>
            <div
              class="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary"
            >
              <span class="w-5 h-5 text-gray-400 shrink-0" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
              </span>
              <input
                id="phone"
                v-model="phone"
                type="tel"
                :placeholder="t('login.phonePlaceholder')"
                class="flex-1 min-w-0 bg-transparent border-none py-0.5 text-sm placeholder:text-gray-400 focus:outline-none"
              />
              <span class="flex items-center gap-1.5 text-gray-500 text-sm shrink-0">
                <span class="text-base" aria-hidden="true">🇸🇦</span>
                +966
              </span>
            </div>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1.5 text-right">
              {{ t('login.passwordLabel') }}
            </label>
            <div
              class="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary"
            >
              <span class="w-5 h-5 text-gray-400 shrink-0" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </span>
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :placeholder="t('login.passwordPlaceholder')"
                class="flex-1 min-w-0 bg-transparent border-none py-0.5 text-sm placeholder:text-gray-400 focus:outline-none"
              />
              <button
                type="button"
                class="shrink-0 p-0.5 text-gray-400 hover:text-gray-600 focus:outline-none"
                :aria-label="showPassword ? t('login.passwordHide') : t('login.passwordShow')"
                @click="showPassword = !showPassword"
              >
                <span class="w-5 h-5 block">
                  <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3l3.764 3.764m3.43-3.431 3.43 3.43M3 3l3.764 3.764" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          <!-- Forgot password -->
          <div class="text-right">
            <NuxtLink
              to="#"
              class="text-sm text-gray-600 hover:text-gray-900"
            >
              {{ t('login.forgotPassword') }}
            </NuxtLink>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            class="w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors"
          >
            {{ t('login.submit') }}
          </button>
        </form>

        <!-- Register link -->
        <p class="text-center text-sm text-gray-600 mt-6">
          {{ t('login.noAccount') }}
          <NuxtLink to="/register" class="text-accent font-semibold hover:underline">
            {{ t('login.registerLink') }}
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'blank' })

const { t } = useI18n()

const phone = ref('')
const password = ref('')
const showPassword = ref(false)
const showLanguageModal = ref(false)

function onSubmit() {
  // Placeholder: no API yet
  console.log('Login', { phone: phone.value, password: password.value })
}
</script>

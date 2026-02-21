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

    <div class="w-full max-w-4xl relative z-10 flex flex-col items-center justify-center">
      <!-- Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 w-full max-w-xl">
        <!-- Language selector (top-right in RTL) -->
          <div class="flex justify-between items-center mb-6">
             <!-- Logo -->
        <div class="flex flex-col items-start mb-6">
          <img
            src="~/assets/images/logo.png"
            :alt="t('common.appName')"
            class="h-28 sm:h-32 w-auto max-w-[200px] sm:max-w-[240px] object-contain"
          />
          <!-- <p class="text-lg font-semibold text-accent">{{ t('common.appName') }}</p> -->
        </div>

          <LanguageButton @click="showLanguageModal = true" />
        </div>
        <LanguageModal v-model="showLanguageModal" />

     
        <!-- Title -->
         <div class="flex flex-col items-start mb-6">
        <h1 class="text-xl font-bold text-gray-900 text-start mb-1">
          {{ t('login.title') }}
        </h1>
        <p class="text-sm text-gray-500 text-start mb-6">
          {{ t('login.subtitle') }}
        </p>
      </div>

        <!-- Form -->
        <form @submit.prevent="onSubmit" class="space-y-4">
          <PhoneInput v-model="phone" />
          <PasswordInput v-model="password" />

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
definePageMeta({ layout: 'blank', title: 'login.title' })

const { t } = useI18n()

const phone = ref('')
const password = ref('')
const showLanguageModal = ref(false)

function onSubmit() {
  // Placeholder: no API yet
  console.log('Login', { phone: phone.value, password: password.value })
}
</script>

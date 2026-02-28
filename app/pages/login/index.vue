<template>
  <div
    class="min-h-screen bg-[#F8F8F8] flex items-start sm:items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-4 relative overflow-hidden"
  >
    <!-- Decorative shape (dome/arch) bottom-left -->
    <div
      class="absolute -bottom-24 sm:-bottom-20 left-0 w-40 h-40 sm:w-64 sm:h-64 opacity-[0.08] pointer-events-none"
      aria-hidden="true"
    >
      <img
        src="~/assets/images/auth-pic.png"
        alt="Login Shape"
        class="w-full h-full object-cover"
      >
    </div>

    <div class="w-full max-w-5xl relative z-10 flex flex-col items-center justify-center px-0 sm:px-4">
      <!-- Card -->
      <div
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-8 w-full max-w-2xl sm:max-w-3xl"
      >
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

        <!-- Login view -->
        <template v-if="!showForgotPassword">
          <div class="flex flex-col items-start mb-6">
            <h1 class="text-xl font-bold text-gray-900 text-start mb-1">
              {{ t('login.title') }}
            </h1>
            <p class="text-sm text-gray-500 text-start mb-6">
              {{ t('login.subtitle') }}
            </p>
          </div>

          <form @submit.prevent="onSubmit" class="space-y-4">
            <PhoneInput v-model="phone" />
            <PasswordInput v-model="password" />

            <div class="text-right">
              <button
                type="button"
                class="text-sm text-gray-600 hover:text-gray-900"
                @click.prevent="showForgotPassword = true"
              >
                {{ t('login.forgotPassword') }}
              </button>
            </div>

            <button
              type="submit"
              :disabled="loginLoading"
              class="w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {{ loginLoading ? t('common.loading') : t('login.submit') }}
            </button>
          </form>

          <p class="text-center text-sm text-gray-600 mt-6">
            {{ t('login.noAccount') }}
            <NuxtLink :to="localePath('/register')" class="text-accent font-semibold hover:underline">
              {{ t('login.registerLink') }}
            </NuxtLink>
          </p>
        </template>

        <!-- Forgot password (phone) view -->
        <template v-else-if="showForgotPassword && forgotStep === 'phone'">
          <div class="flex flex-col items-start mb-6">
            <h1 class="text-xl font-bold text-gray-900 text-start mb-1">
              {{ t('login.changePasswordTitle') }}
            </h1>
            <p class="text-sm text-gray-500 text-start mb-6">
              {{ t('login.changePasswordSubtitle') }}
            </p>
          </div>

          <form @submit.prevent="onForgotSubmit" class="space-y-4">
            <PhoneInput v-model="phone" />
            <button
              type="submit"
              class="w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors"
            >
              {{ t('login.next') }}
            </button>
          </form>

          <p class="text-center text-sm text-gray-600 mt-6">
            <button
              type="button"
              class="text-accent font-semibold hover:underline"
              @click.prevent="backToLogin"
            >
              {{ t('login.backToLogin') }}
            </button>
          </p>
        </template>

        <!-- OTP view -->
        <template v-else>
          <div class="flex flex-col items-start mb-6">
            <h1 class="text-xl font-bold text-gray-900 text-start mb-1" id="otp-title">
              {{ t('login.otpTitle') }}
            </h1>
            <p class="text-sm text-gray-500 text-start mb-6" id="otp-subtitle">
              {{ t('login.otpSubtitle') }}
            </p>
          </div>

          <form @submit.prevent="onOtpVerify" class="space-y-4">
            <div
              ref="otpContainerRef"
              class="flex gap-2 justify-center"
              role="group"
              aria-labelledby="otp-title"
              aria-describedby="otp-subtitle"
            >
              <input
                v-for="i in OTP_LENGTH"
                :key="i"
                :value="otp[i - 1]"
                type="text"
                inputmode="numeric"
                maxlength="1"
                class="w-11 h-12 text-center text-lg font-semibold rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
                :aria-label="'Digit ' + i"
                @input="(e) => setOtpDigit(i - 1, e.target.value)"
                @keydown="(e) => onOtpKeydown(i - 1, e)"
                @paste="onOtpPaste"
              >
            </div>

            <button
              type="submit"
              class="w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors"
            >
              {{ t('login.verify') }}
            </button>

            <p class="text-center text-sm text-gray-600">
              <button
                type="button"
                class="text-gray-600 hover:text-gray-900"
                @click.prevent="onResendCode"
              >
                {{ t('login.resendCode') }}
              </button>
            </p>
          </form>

          <p class="text-center text-sm text-gray-600 mt-6">
            <button
              type="button"
              class="text-accent font-semibold hover:underline"
              @click.prevent="backToPhoneStep"
            >
              {{ t('login.back') }}
            </button>
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: 'blank', title: 'login.title' })

const { t } = useI18n()
const localePath = useLocalePath()
const authStore = useAuthStore()

const phone = ref('')
const password = ref('')
const loginLoading = ref(false)
const showLanguageModal = ref(false)
const showForgotPassword = ref(false)
const forgotStep = ref('phone')
const otp = ref('')
const otpContainerRef = ref(null)

const OTP_LENGTH = 6

async function onSubmit() {
  if (loginLoading.value) return
  loginLoading.value = true
  try {
    // TODO: Replace with real API call; mock success for now
    authStore.login({ phone: phone.value })
    await navigateTo(localePath('/'))
  } finally {
    loginLoading.value = false
  }
}

function backToLogin() {
  showForgotPassword.value = false
  forgotStep.value = 'phone'
}

function backToPhoneStep() {
  forgotStep.value = 'phone'
  otp.value = ''
}

function setOtpDigit(index, value) {
  const digit = value.replace(/\D/g, '').slice(-1)
  const arr = otp.value.split('')
  arr[index] = digit
  otp.value = arr.join('').slice(0, OTP_LENGTH)
  if (digit && index < OTP_LENGTH - 1) {
    nextTick(() => {
      const inputs = otpContainerRef.value?.querySelectorAll('input')
      inputs?.[index + 1]?.focus()
    })
  }
}

function onOtpKeydown(index, e) {
  if (e.key === 'Backspace' && !otp.value[index] && index > 0) {
    const arr = otp.value.split('')
    arr[index - 1] = ''
    otp.value = arr.join('')
    nextTick(() => {
      const inputs = otpContainerRef.value?.querySelectorAll('input')
      inputs?.[index - 1]?.focus()
    })
  }
}

function onOtpPaste(e) {
  e.preventDefault()
  const pasted = e.clipboardData?.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH) ?? ''
  otp.value = pasted
  const nextIndex = Math.min(pasted.length, OTP_LENGTH - 1)
  nextTick(() => {
    const inputs = otpContainerRef.value?.querySelectorAll('input')
    inputs?.[nextIndex]?.focus()
  })
}

async function onForgotSubmit() {
  forgotStep.value = 'otp'
  otp.value = ''
  await nextTick()
  otpContainerRef.value?.querySelector('input')?.focus()
}

function onOtpVerify() {
  console.log('Verify OTP', { phone: phone.value, otp: otp.value })
}

function onResendCode() {
  console.log('Resend code', { phone: phone.value })
}
</script>

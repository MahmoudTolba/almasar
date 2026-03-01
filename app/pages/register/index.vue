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
        alt="Auth Shape"
        class="w-full h-full object-cover"
      >
    </div>

    <div class="w-full max-w-5xl relative z-10 flex flex-col items-center justify-center px-0 sm:px-4">
      <!-- Card -->
      <div
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-8 w-full max-w-2xl sm:max-w-3xl"
      >
        <!-- Header: Logo + Language -->
        <div class="flex justify-between items-center mb-6">
          <img
            src="~/assets/images/logo.png"
            :alt="t('common.appName')"
            class="h-28 sm:h-32 w-auto max-w-[200px] sm:max-w-[240px] object-contain"
          >
          <LanguageButton @click="showLanguageModal = true" />
        </div>
        <LanguageModal v-model="showLanguageModal" />
        <RegisterStatusModal
          v-model="showRegisterModal"
          :state="registerModalState"
          @closed="onRegisterModalClosed"
        />

        <!-- Step 1: Basic Info -->
        <template v-if="step === 1">
          <div class="flex flex-col items-start mb-6">
            <h1 class="text-xl font-bold text-gray-900 text-start mb-1">
              {{ t('register.title') }}
            </h1>
            <p class="text-sm text-gray-500 text-start mb-6">
              {{ t('register.subtitle') }}
            </p>
          </div>

          <form @submit.prevent="onSubmit" class="space-y-4">
          <div class="grid gap-4 md:grid-cols-2 md:gap-x-6">
            <!-- Right column (RTL): Office Name, Official Email, Password -->
            <div class="flex flex-col gap-4">
              <!-- Office Name -->
              <div class="flex flex-col gap-1">
                <label for="officeName" class="block text-sm font-medium text-gray-700 mb-1.5 text-right">
                  {{ t('register.officeNameLabel') }}
                </label>
                <div
                  class="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-accent/30 focus-within:border-accent"
                  :class="{ 'border-red-500': errors.officeName }"
                >
                  <span class="w-5 h-5 text-gray-400 shrink-0" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998-3.875 7.5 7.5 0 0 1 1.5 4.983 7.5 7.5 0 0 1-6.5 7.374 7.5 7.5 0 0 1-9.998-8.482Z" />
                    </svg>
                  </span>
                  <input
                    id="officeName"
                    v-model="form.officeName"
                    type="text"
                    :placeholder="t('register.officeNamePlaceholder')"
                    class="flex-1 min-w-0 bg-transparent border-none py-0.5 text-sm placeholder:text-gray-400 focus:outline-none"
                  >
                </div>
                <p v-if="errors.officeName" class="text-xs text-red-500 mt-1">
                  {{ errors.officeName }}
                </p>
              </div>

              <!-- Official Email (optional) -->
              <div class="flex flex-col gap-1">
                <label for="officialEmail" class="block text-sm font-medium text-gray-700 mb-1.5 text-right">
                  {{ t('register.officialEmailLabel') }}
                </label>
                <div
                  class="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-accent/30 focus-within:border-accent"
                  :class="{ 'border-red-500': errors.officialEmail }"
                >
                  <span class="w-5 h-5 text-gray-400 shrink-0" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  <input
                    id="officialEmail"
                    v-model="form.officialEmail"
                    type="email"
                    :placeholder="t('register.officialEmailPlaceholder')"
                    class="flex-1 min-w-0 bg-transparent border-none py-0.5 text-sm placeholder:text-gray-400 focus:outline-none"
                  >
                </div>
                <p v-if="errors.officialEmail" class="text-xs text-red-500 mt-1">
                  {{ errors.officialEmail }}
                </p>
              </div>

              <!-- Password -->
              <div>
                <PasswordInput
                  v-model="form.password"
                  label-key="register.passwordLabel"
                  placeholder-key="register.passwordPlaceholder"
                  input-id="password"
                />
                <p v-if="errors.password" class="text-xs text-red-500 mt-1">
                  {{ errors.password }}
                </p>
              </div>
            </div>

            <!-- Left column (RTL): Phone, Address, Confirm Password -->
            <div class="flex flex-col gap-4">
              <!-- Phone -->
              <div>
                <PhoneInput
                  v-model="form.phone"
                  label-key="register.phoneLabel"
                  placeholder-key="register.phonePlaceholder"
                  input-id="registerPhone"
                />
                <p v-if="errors.phone" class="text-xs text-red-500 mt-1">
                  {{ errors.phone }}
                </p>
              </div>

              <!-- Address -->
              <div class="flex flex-col gap-1">
                <label for="address" class="block text-sm font-medium text-gray-700 mb-1.5 text-right">
                  {{ t('register.addressLabel') }}
                </label>
                <div
                  class="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-accent/30 focus-within:border-accent"
                  :class="{ 'border-red-500': errors.address }"
                >
                  <span class="w-5 h-5 text-gray-400 shrink-0" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </span>
                  <input
                    id="address"
                    v-model="form.address"
                    type="text"
                    :placeholder="t('register.addressPlaceholder')"
                    class="flex-1 min-w-0 bg-transparent border-none py-0.5 text-sm placeholder:text-gray-400 focus:outline-none"
                  >
                </div>
                <p v-if="errors.address" class="text-xs text-red-500 mt-1">
                  {{ errors.address }}
                </p>
              </div>

              <!-- Confirm Password -->
              <div>
                <PasswordInput
                  v-model="form.confirmPassword"
                  label-key="register.confirmPasswordLabel"
                  placeholder-key="register.confirmPasswordPlaceholder"
                  input-id="confirmPassword"
                />
                <p v-if="errors.confirmPassword" class="text-xs text-red-500 mt-1">
                  {{ errors.confirmPassword }}
                </p>
              </div>
            </div>
          </div>

          <!-- Full width: Description -->
          <div class="flex flex-col gap-1">
            <label for="description" class="block text-sm font-medium text-gray-700 mb-1.5 text-right">
              {{ t('register.descriptionLabel') }}
            </label>
            <div
              class="rounded-xl border border-gray-200 bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-accent/30 focus-within:border-accent"
            >
              <div class="flex gap-2">
                <span class="w-5 h-5 text-gray-400 shrink-0 mt-0.5" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
                  </svg>
                </span>
                <textarea
                  id="description"
                  v-model="form.description"
                  rows="3"
                  :placeholder="t('register.descriptionPlaceholder')"
                  class="flex-1 min-w-0 bg-transparent border-none py-0.5 text-sm placeholder:text-gray-400 focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {{ t('register.continueButton') }}
          </button>
        </form>

          <p class="text-center text-sm text-gray-600 mt-6">
            {{ t('register.hasAccount') }}
            <NuxtLink :to="localePath('/login')" class="text-accent font-semibold hover:underline">
              {{ t('register.loginLink') }}
            </NuxtLink>
          </p>
        </template>

        <!-- Step 2: Complete Data -->
        <template v-else-if="step === 2">
          <div class="flex flex-col items-start mb-6">
            <h1 class="text-xl font-bold text-gray-900 text-start mb-1">
              {{ t('register.step2Title') }}
            </h1>
            <p class="text-sm text-gray-500 text-start mb-6">
              {{ t('register.step2Subtitle') }}
            </p>
          </div>

          <form @submit.prevent="onSubmitStep2" class="space-y-6">
            <!-- Required Official Documents -->
            <section class="space-y-4">
              <h3 class="text-sm font-semibold text-gray-900">
                {{ t('profile.officialDocumentsSectionTitle') }}
              </h3>
              <div class="flex flex-col gap-2">
                <label class="block text-sm font-medium text-gray-700 text-right">
                  {{ t('profile.commercialRegisterLabel') }}
                </label>
                <button
                  type="button"
                  @click="commercialRegisterInput?.click()"
                  class="flex w-full items-center justify-between rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 hover:border-accent hover:bg-amber-50/50 transition-colors"
                >
                  <span class="flex items-center gap-2 truncate">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-400 shrink-0">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    {{ commercialRegisterFileName || t('profile.commercialRegisterHint') }}
                  </span>
                  <span class="text-xs font-medium text-accent shrink-0">
                    {{ t('profile.uploadActionLabel') }}
                  </span>
                </button>
                <input
                  ref="commercialRegisterInput"
                  type="file"
                  class="hidden"
                  accept="application/pdf,image/png,image/jpeg"
                  @change="onFileChange('commercialRegister', $event)"
                >
                <p v-if="errors.commercialRegister" class="text-xs text-red-500 mt-1">
                  {{ errors.commercialRegister }}
                </p>
              </div>
            </section>

            <!-- Bank Account Details (Optional) -->
            <section class="space-y-4">
              <h3 class="text-sm font-semibold text-gray-900">
                {{ t('profile.bankSectionTitle') }}
              </h3>
              <div class="grid gap-4 md:grid-cols-1">
                <div class="flex flex-col gap-1">
                  <label for="bankName" class="block text-sm font-medium text-gray-700 mb-1.5 text-right">
                    {{ t('profile.bankNameLabel') }}
                  </label>
                  <div class="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-accent/30 focus-within:border-accent">
                    <span class="w-5 h-5 text-gray-400 shrink-0" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008H17.25v-.008Zm0 3h.008v.008H17.25v-.008Z" />
                      </svg>
                    </span>
                    <input
                      id="bankName"
                      v-model="formStep2.bankName"
                      type="text"
                      :placeholder="t('profile.bankNamePlaceholder')"
                      class="flex-1 min-w-0 bg-transparent border-none py-0.5 text-sm placeholder:text-gray-400 focus:outline-none"
                    >
                  </div>
                </div>
                <div class="flex flex-col gap-1">
                  <label for="bankAccountName" class="block text-sm font-medium text-gray-700 mb-1.5 text-right">
                    {{ t('profile.bankAccountNameLabel') }}
                  </label>
                  <div class="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-accent/30 focus-within:border-accent">
                    <span class="w-5 h-5 text-gray-400 shrink-0" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008H17.25v-.008Zm0 3h.008v.008H17.25v-.008Z" />
                      </svg>
                    </span>
                    <input
                      id="bankAccountName"
                      v-model="formStep2.bankAccountName"
                      type="text"
                      :placeholder="t('profile.bankAccountNamePlaceholder')"
                      class="flex-1 min-w-0 bg-transparent border-none py-0.5 text-sm placeholder:text-gray-400 focus:outline-none"
                    >
                  </div>
                </div>
                <div class="flex flex-col gap-1">
                  <label for="iban" class="block text-sm font-medium text-gray-700 mb-1.5 text-right">
                    {{ t('profile.ibanLabel') }}
                  </label>
                  <div class="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-accent/30 focus-within:border-accent">
                    <span class="w-5 h-5 text-gray-400 shrink-0" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008H17.25v-.008Zm0 3h.008v.008H17.25v-.008Z" />
                      </svg>
                    </span>
                    <input
                      id="iban"
                      v-model="formStep2.iban"
                      type="text"
                      :placeholder="t('profile.ibanPlaceholder')"
                      class="flex-1 min-w-0 bg-transparent border-none py-0.5 text-sm placeholder:text-gray-400 focus:outline-none ltr:text-left rtl:text-right"
                    >
                  </div>
                </div>
              </div>
            </section>

            <div class="flex gap-3">
              <button
                type="button"
                @click="goBackToStep1"
                :disabled="loading"
                class="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 disabled:opacity-60 transition-colors"
              >
                {{ t('register.backButton') }}
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="flex-1 py-3 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {{ t('register.submitButton') }}
              </button>
            </div>
          </form>
        </template>

        <!-- Step 3: OTP Verification -->
        <template v-else-if="step === 3">
          <div class="flex flex-col items-start mb-6">
            <h1 class="text-xl font-bold text-gray-900 text-start mb-1" id="register-otp-title">
              {{ t('register.otpTitle') }}
            </h1>
            <p class="text-sm text-gray-500 text-start mb-6" id="register-otp-subtitle">
              {{ formattedPhone }}
            </p>
          </div>

          <form @submit.prevent="onOtpVerify" class="space-y-4">
            <div
              ref="otpContainerRef"
              class="flex gap-2 justify-center flex-row"
              role="group"
              aria-labelledby="register-otp-title"
              aria-describedby="register-otp-subtitle"
            >
              <input
                v-for="i in OTP_LENGTH"
                :key="i"
                :value="otp[i - 1]"
                type="text"
                inputmode="numeric"
                maxlength="1"
                class="w-11 h-12 text-center text-lg font-semibold rounded-xl border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
                :aria-label="'Digit ' + i"
                @input="(e) => setOtpDigit(i - 1, getInputValue(e))"
                @keydown="(e) => onOtpKeydown(i - 1, e)"
                @paste="onOtpPaste"
              >
            </div>

            <button
              type="submit"
              :disabled="otp.length !== OTP_LENGTH || loading"
              class="w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {{ t('register.otpNext') }}
            </button>

            <div class="flex flex-wrap items-center justify-between gap-2 text-sm text-gray-600">
              <span>{{ t('register.otpResendPrompt') }}</span>
              <span class="flex items-center gap-2">
                <span v-if="resendCountdown > 0" class="tabular-nums text-accent">
                  {{ resendCountdownFormatted }}
                </span>
                <button
                  v-else
                  type="button"
                  class="text-accent font-semibold hover:underline"
                  @click.prevent="onResendCode"
                >
                  {{ t('register.otpResendLink') }}
                </button>
              </span>
            </div>
          </form>

          <p class="text-center text-sm text-gray-600 mt-6">
            <button
              type="button"
              class="text-accent font-semibold hover:underline"
              @click="goBackToStep2"
            >
              {{ t('register.backButton') }}
            </button>
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: 'blank', title: 'register.title' })

const { t } = useI18n()
const localePath = useLocalePath()
const authStore = useAuthStore()
const showLanguageModal = ref(false)

function onRegisterModalClosed(state) {
  if (state === 'success') {
    authStore.login({ phone: form.phone })
    navigateTo(localePath('/'))
  }
}

const commercialRegisterInput = ref(null)

function getInputValue(e) {
  const target = e?.target
  return (target && typeof target === 'object' && 'value' in target ? String(target.value) : '') || ''
}

const {
  step,
  form,
  formStep2,
  errors,
  loading,
  showRegisterModal,
  registerModalState,
  commercialRegisterFileName,
  otp,
  otpContainerRef,
  OTP_LENGTH,
  formattedPhone,
  resendCountdown,
  resendCountdownFormatted,
  onSubmit,
  goBackToStep1,
  goBackToStep2,
  onFileChange,
  onSubmitStep2,
  setOtpDigit,
  onOtpKeydown,
  onOtpPaste,
  onOtpVerify,
  onResendCode,
} = useRegisterForm()
</script>

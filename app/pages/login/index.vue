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

        <!-- Password change success modal -->
        <Teleport to="body">
          <Transition name="modal">
            <div
              v-if="showPasswordSuccessModal"
              class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40"
              @click.self="closePasswordSuccessModal"
            >
              <div class="w-full max-w-lg bg-white rounded-xl shadow-lg border border-gray-100 p-8 flex flex-col items-center">
                <img
                  src="~/assets/icons/done.gif"
                  alt=""
                  class="w-24 h-24 object-contain mb-6"
                />
                <p class="text-center text-gray-900 font-medium mb-8">
                  {{ t('login.passwordChangeSuccess') }}
                </p>
                <button
                  type="button"
                  class="w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors"
                  @click="closePasswordSuccessModal"
                >
                  {{ t('login.backToLogin') }}
                </button>
              </div>
            </div>
          </Transition>
        </Teleport>

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
            <div>
              <PhoneInput v-model="phone" />
              <p v-if="loginErrors.phone" class="text-xs text-red-500 mt-1">
                {{ loginErrors.phone }}
              </p>
            </div>
            <div>
              <PasswordInput v-model="password" />
              <p v-if="loginErrors.password" class="text-xs text-red-500 mt-1">
                {{ loginErrors.password }}
              </p>
            </div>
            <p v-if="loginError" class="text-xs text-red-500">
              {{ loginError }}
            </p>
            <div class="text-left">
              <button
                type="button"
                class="text-md text-gray-600 hover:text-gray-900"
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
            <div>
              <PhoneInput v-model="phone" />
              <p v-if="forgotPhoneError" class="text-xs text-red-500 mt-1">
                {{ forgotPhoneError }}
              </p>
            </div>
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

        <!-- Change password (after OTP) view -->
        <template v-else-if="showForgotPassword && forgotStep === 'newPassword'">
          <div class="flex flex-col items-start mb-6">
            <h1 class="text-xl font-bold text-gray-900 text-start mb-1">
              {{ t('login.changePasswordTitle') }}
            </h1>
            <p class="text-sm text-gray-500 text-start mb-6">
              {{ t('login.changePasswordFormSubtitle') }}
            </p>
          </div>

          <form @submit.prevent="onChangePasswordSubmit" class="space-y-4">
            <PasswordInput
              v-model="newPassword"
              label-key="changePassword.newPasswordLabel"
              placeholder-key="login.passwordPlaceholder"
              input-id="forgot-new-password"
            />
            <div v-if="changePasswordErrors.newPassword" class="text-xs text-red-500 -mt-2">
              {{ changePasswordErrors.newPassword }}
            </div>
            <PasswordInput
              v-model="confirmNewPassword"
              label-key="changePassword.confirmNewPasswordLabel"
              placeholder-key="login.passwordPlaceholder"
              input-id="forgot-confirm-password"
            />
            <div v-if="changePasswordErrors.confirmNewPassword" class="text-xs text-red-500 -mt-2">
              {{ changePasswordErrors.confirmNewPassword }}
            </div>
            <button
              type="submit"
              :disabled="changePasswordLoading"
              class="w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {{ changePasswordLoading ? t('common.loading') : t('login.next') }}
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
            <p class="text-sm text-gray-500 text-start mb-2" id="otp-subtitle">
              {{ t('login.otpSubtitle') }}
            </p>
            <p v-if="formattedPhone" class="text-sm text-gray-400 text-start mt-1 mb-6">
              {{ formattedPhone }}
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
                placeholder="-"
                maxlength="1"
                class="w-11 h-12 text-center text-lg font-semibold text-accent rounded-xl border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
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

            <div class="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-600">
              <span>{{ t('login.otpResendPrompt') }}</span>
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
                  {{ t('login.otpResendLink') }}
                </button>
              </span>
            </div>
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
import { useUserStore } from '~/stores/user'
import { parseE164 } from '~/data/countries'

definePageMeta({ layout: 'blank', title: 'login.title' })

const { t } = useI18n()
const localePath = useLocalePath()
const authStore = useAuthStore()
const userStore = useUserStore()
const { validateForm, loginSchema, forgotPasswordPhoneSchema, changePasswordSchema } = useValidationSchemas()

const phone = ref('')
const loginError = ref('')
const loginErrors = ref({ phone: '', password: '' })
const forgotPhoneError = ref('')
const password = ref('')
const loginLoading = ref(false)
const showLanguageModal = ref(false)
const showPasswordSuccessModal = ref(false)
const showForgotPassword = ref(false)
const forgotStep = ref('phone')
const otp = ref('')
const otpContainerRef = ref(null)
const resendCountdown = ref(0)
const resendIntervalRef = ref(null)
const newPassword = ref('')
const confirmNewPassword = ref('')
const changePasswordErrors = ref({ newPassword: '', confirmNewPassword: '' })
const changePasswordLoading = ref(false)

const OTP_LENGTH = 6

const formattedPhone = computed(() => {
  const parsed = parseE164(phone.value)
  if (!parsed) return ''
  return `+${parsed.dialCode} ${parsed.nationalNumber}`
})

const resendCountdownFormatted = computed(() => {
  const s = resendCountdown.value
  const mins = Math.floor(s / 60)
  const secs = s % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
})

async function onSubmit() {
  const result = validateForm(
    { phone: phone.value, password: password.value },
    loginSchema
  )
  if (!result.valid) {
    loginErrors.value = result.errors
    return
  }
  loginErrors.value = { phone: '', password: '' }
  if (loginLoading.value) return
  loginLoading.value = true
  loginError.value = ''
  try {
    const user = userStore.getUserByPhone(phone.value)
    if (!user) {
      loginError.value = t('login.userNotFound')
    } else if (user.password && user.password !== password.value) {
      loginError.value = t('login.passwordIncorrect')
    } else {
      authStore.login(user)
      await navigateTo(localePath('/'))
    }
  } finally {
    loginLoading.value = false
  }
}

function backToLogin() {
  showForgotPassword.value = false
  forgotStep.value = 'phone'
  forgotPhoneError.value = ''
}

function backToPhoneStep() {
  forgotStep.value = 'phone'
  otp.value = ''
  if (resendIntervalRef.value) {
    clearInterval(resendIntervalRef.value)
    resendIntervalRef.value = null
  }
  resendCountdown.value = 0
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
  const result = validateForm({ phone: phone.value }, forgotPasswordPhoneSchema)
  if (!result.valid) {
    forgotPhoneError.value = result.errors.phone ?? ''
    return
  }
  forgotPhoneError.value = ''
  forgotStep.value = 'otp'
  otp.value = ''
  resendCountdown.value = 60
  if (resendIntervalRef.value) clearInterval(resendIntervalRef.value)
  resendIntervalRef.value = setInterval(() => {
    resendCountdown.value--
    if (resendCountdown.value <= 0 && resendIntervalRef.value) {
      clearInterval(resendIntervalRef.value)
      resendIntervalRef.value = null
    }
  }, 1000)
  await nextTick()
  otpContainerRef.value?.querySelector('input')?.focus()
}

async function onOtpVerify() {
  // TODO: Replace with real API call; mock success for now
  forgotStep.value = 'newPassword'
  newPassword.value = ''
  confirmNewPassword.value = ''
  changePasswordErrors.value = {}
}

async function onChangePasswordSubmit() {
  const schema = changePasswordSchema({ requiresOldPassword: false })
  const result = validateForm(
    {
      newPassword: newPassword.value,
      confirmNewPassword: confirmNewPassword.value,
    },
    schema
  )
  if (!result.valid) {
    changePasswordErrors.value = {
      newPassword: result.errors.newPassword ?? '',
      confirmNewPassword: result.errors.confirmNewPassword ?? '',
    }
    return
  }
  changePasswordErrors.value = { newPassword: '', confirmNewPassword: '' }
  changePasswordLoading.value = true
  try {
    // TODO: Replace with real API call
    console.log('Change password', { phone: phone.value, newPassword: newPassword.value })
    showPasswordSuccessModal.value = true
  } finally {
    changePasswordLoading.value = false
  }
}

function closePasswordSuccessModal() {
  showPasswordSuccessModal.value = false
  backToLogin()
}

function onResendCode() {
  if (resendCountdown.value > 0) return
  // TODO: Call resend OTP API
  console.log('Resend code', { phone: phone.value })
  resendCountdown.value = 60
  if (resendIntervalRef.value) clearInterval(resendIntervalRef.value)
  resendIntervalRef.value = setInterval(() => {
    resendCountdown.value--
    if (resendCountdown.value <= 0 && resendIntervalRef.value) {
      clearInterval(resendIntervalRef.value)
      resendIntervalRef.value = null
    }
  }, 1000)
}

onUnmounted(() => {
  if (resendIntervalRef.value) {
    clearInterval(resendIntervalRef.value)
  }
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.2s ease;
}
.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.95);
}
</style>

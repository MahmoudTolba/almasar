<template>
  <div class="w-full">
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
      <div class="flex flex-col gap-2 mb-8">
        <h2 class="text-xl md:text-2xl font-bold text-[#1F2937]">
          {{ t('settings.changePassword') }}
        </h2>
        <p class="text-sm md:text-base text-[#4B5563]">
          {{ t('settings.subtitle') }}
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-1">
          <PasswordInput
            v-model="oldPassword"
            label-key="changePassword.oldPasswordLabel"
            placeholder-key="login.passwordPlaceholder"
            input-id="change-password-old"
          />
          <p v-if="errors.oldPassword" class="text-xs text-red-500 mt-1">
            {{ errors.oldPassword }}
          </p>
        </div>

        <div class="space-y-1">
          <PasswordInput
            v-model="newPassword"
            label-key="changePassword.newPasswordLabel"
            placeholder-key="login.passwordPlaceholder"
            input-id="change-password-new"
          />
          <p v-if="errors.newPassword" class="text-xs text-red-500 mt-1">
            {{ errors.newPassword }}
          </p>
        </div>

        <div class="space-y-1">
          <PasswordInput
            v-model="confirmNewPassword"
            label-key="changePassword.confirmNewPasswordLabel"
            placeholder-key="login.passwordPlaceholder"
            input-id="change-password-confirm"
          />
          <p v-if="errors.confirmNewPassword" class="text-xs text-red-500 mt-1">
            {{ errors.confirmNewPassword }}
          </p>
        </div>

        <div class="flex flex-col md:flex-row gap-3 justify-start pt-4">
          <button
            type="submit"
            :disabled="loading"
            class="inline-flex items-center justify-center rounded-xl min-w-52 max-w-md bg-black px-8 py-2.5 text-sm font-semibold text-white hover:bg-gray-900 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {{ t('changePassword.confirmButton') }}
          </button>
          <button
            type="button"
            @click="emit('cancel')"
            class="inline-flex items-center justify-center rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-[#374151] hover:bg-gray-50 transition-colors"
          >
            {{ t('settings.cancel') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['cancel', 'submit-success'])

const { t } = useI18n()

const oldPassword = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')
const loading = ref(false)
const errors = ref({ oldPassword: '', newPassword: '', confirmNewPassword: '' })

const authStore = useAuthStore()
const userStore = useUserStore()

function validate() {
  const e = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  }
  const user = authStore.user
  const hasExistingPassword = user?.password && user.password.length > 0

  if (hasExistingPassword && !oldPassword.value.trim()) {
    e.oldPassword = t('changePassword.required')
  } else if (hasExistingPassword && oldPassword.value !== user?.password) {
    e.oldPassword = t('login.passwordIncorrect')
  }

  if (!newPassword.value.trim()) {
    e.newPassword = t('changePassword.required')
  } else if (newPassword.value.length < 8) {
    e.newPassword = t('register.validation.passwordMin')
  }

  if (!confirmNewPassword.value.trim()) {
    e.confirmNewPassword = t('changePassword.required')
  } else if (newPassword.value !== confirmNewPassword.value) {
    e.confirmNewPassword = t('changePassword.passwordMismatch')
  }

  errors.value = e
  return !e.oldPassword && !e.newPassword && !e.confirmNewPassword
}

async function handleSubmit() {
  if (!validate()) return
  loading.value = true
  errors.value = { oldPassword: '', newPassword: '', confirmNewPassword: '' }

  const phone = authStore.user?.phone
  if (!phone) {
    errors.value.oldPassword = t('login.userNotFound')
    loading.value = false
    return
  }

  const updated = userStore.updateProfile(phone, { password: newPassword.value })
  if (updated) {
    authStore.setUser(updated)
    oldPassword.value = ''
    newPassword.value = ''
    confirmNewPassword.value = ''
    emit('submit-success')
  } else {
    errors.value.oldPassword = t('login.userNotFound')
  }
  loading.value = false
}
</script>

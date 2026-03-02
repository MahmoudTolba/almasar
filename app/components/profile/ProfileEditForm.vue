<template>
  <div class="w-full">
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
      <div class="flex flex-col gap-2 mb-8">
        <h2 class="text-xl md:text-2xl font-bold text-[#1F2937]">
          {{ t('profile.editTitle') }}
        </h2>
        <p class="text-sm md:text-base text-[#4B5563]">
          {{ t('profile.editSubtitle') }}
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-8">
        <section class="space-y-4">
          <h3 class="text-sm font-semibold text-[#1F2937]">
            {{ t('profile.basicInfoSectionTitle') }}
          </h3>

          <div class="grid gap-4 md:grid-cols-2">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-[#4B5563]">
                {{ t('profile.officialEmailLabel') }}
              </label>
              <input
                v-model="form.officialEmail"
                type="email"
                :placeholder="t('profile.officialEmailPlaceholder')"
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
              <p v-if="errors.officialEmail" class="text-xs text-red-500 mt-1">
                {{ errors.officialEmail }}
              </p>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-[#4B5563]">
                {{ t('profile.officeNameLabel') }}
              </label>
              <input
                v-model="form.officeName"
                type="text"
                :placeholder="t('profile.officeNamePlaceholder')"
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
              <p v-if="errors.officeName" class="text-xs text-red-500 mt-1">
                {{ errors.officeName }}
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-xs font-medium text-[#4B5563]">
              {{ t('profile.logoLabel') }}
            </label>
            <div class="flex items-center gap-3">
              <div
                v-if="logoPreviewUrl"
                class="w-16 h-16 rounded-lg border border-gray-200 overflow-hidden shrink-0"
              >
                <img
                  :src="logoPreviewUrl"
                  alt="Logo preview"
                  class="w-full h-full object-cover"
                >
              </div>
              <button
                type="button"
                @click="triggerFileInput('logo')"
                class="flex flex-1 items-center justify-between rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#4B5563] hover:border-[#AB8740] hover:bg-amber-50 transition-colors"
              >
                <span class="truncate">
                  {{ logoFileName || t('profile.logoHint') }}
                </span>
                <span class="text-xs font-medium text-[#AB8740] shrink-0">
                  {{ t('profile.uploadActionLabel') }}
                </span>
              </button>
            </div>
            <p v-if="errors.logo" class="text-xs text-red-500 mt-1">
              {{ errors.logo }}
            </p>
            <input
              ref="logoInput"
              type="file"
              class="hidden"
              accept="image/png,image/jpeg"
              @change="onLogoChange"
            >
          </div>

          <div class="grid gap-4 md:grid-cols-1">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-[#4B5563]">
                {{ t('profile.addressLabel') }}
              </label>
              <input
                v-model="form.address"
                type="text"
                :placeholder="t('profile.addressPlaceholder')"
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
              <p v-if="errors.address" class="text-xs text-red-500 mt-1">
                {{ errors.address }}
              </p>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-[#4B5563]">
                {{ t('profile.descriptionLabel') }}
              </label>
              <textarea
                v-model="form.description"
                rows="3"
                :placeholder="t('profile.descriptionPlaceholder')"
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
              />
              <p v-if="errors.description" class="text-xs text-red-500 mt-1">
                {{ errors.description }}
              </p>
            </div>
          </div>
        </section>

        <section class="space-y-4">
          <h3 class="text-sm font-semibold text-[#1F2937]">
            {{ t('profile.officialDocumentsSectionTitle') }}
          </h3>

          <div class="flex flex-col gap-2">
            <label class="text-xs font-medium text-[#4B5563]">
              {{ t('profile.commercialRegisterLabel') }}
            </label>
            <button
              type="button"
              @click="triggerFileInput('commercialRegister')"
              class="flex w-full items-center justify-between rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#4B5563] hover:border-[#AB8740] hover:bg-amber-50 transition-colors"
            >
              <span class="truncate">
                {{ commercialRegisterFileName || t('profile.commercialRegisterHint') }}
              </span>
              <span class="text-xs font-medium text-[#AB8740]">
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

        <section class="space-y-4">
          <h3 class="text-sm font-semibold text-[#1F2937]">
            {{ t('profile.bankSectionTitle') }}
          </h3>

          <div class="grid gap-4 md:grid-cols-1">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-[#4B5563]">
                {{ t('profile.bankNameLabel') }}
              </label>
              <input
                v-model="form.bankName"
                type="text"
                :placeholder="t('profile.bankNamePlaceholder')"
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-[#4B5563]">
                {{ t('profile.bankAccountNameLabel') }}
              </label>
              <input
                v-model="form.bankAccountName"
                type="text"
                :placeholder="t('profile.bankAccountNamePlaceholder')"
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
            </div>

            <div class="flex flex-col gap-1 md:col-span-1">
              <label class="text-xs font-medium text-[#4B5563]">
                {{ t('profile.ibanLabel') }}
              </label>
              <input
                v-model="form.iban"
                type="text"
                :placeholder="t('profile.ibanPlaceholder')"
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ltr:text-left rtl:text-right"
              >
            </div>
          </div>
        </section>

        <div class="flex flex-col md:flex-row gap-3 justify-start pt-6 ">
         
          <button
            type="submit"
            :disabled="loading"
            class="inline-flex items-center justify-center rounded-xl min-w-80 max-w-md bg-black px-8 py-3 text-sm font-semibold text-white hover:bg-gray-900 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="!loading">
              {{ t('profile.submitButton') }}
            </span>
            <span v-else>
              {{ t('profile.submittingLabel') }}
            </span>
          </button>
          <button
            type="button"
            @click="onCancel"
            class="inline-flex items-center justify-center rounded-xl border border-gray-200 px-8 py-3 text-sm font-medium text-[#374151] hover:bg-gray-50 transition-colors"
          >
            {{ t('profile.cancelButton') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
import { useUserStore } from '~/stores/user'

const emit = defineEmits(['submit-success', 'cancel'])

const { t } = useI18n()
const authStore = useAuthStore()
const userStore = useUserStore()
const { validateForm, profileSchema } = useValidationSchemas()

const form = reactive({
  officialEmail: '',
  officeName: '',
  address: '',
  description: '',
  bankName: '',
  bankAccountName: '',
  iban: ''
})

// Initialize form from auth store
watch(
  () => authStore.user,
  (user) => {
    if (user) {
      form.officialEmail = user.officialEmail ?? ''
      form.officeName = user.officeName ?? ''
      form.address = user.address ?? ''
      form.description = user.description ?? ''
      form.bankName = user.bankName ?? ''
      form.bankAccountName = user.bankAccountName ?? ''
      form.iban = user.iban ?? ''
    }
  },
  { immediate: true }
)

const files = reactive({
  logo: null,
  commercialRegister: null
})

const errors = reactive({
  officialEmail: '',
  officeName: '',
  address: '',
  description: '',
  commercialRegister: '',
  logo: ''
})

const MAX_LOGO_SIZE_BYTES = 500 * 1024 // 500KB
const avatarDataUrl = ref('')

const loading = ref(false)

const logoInput = ref(null)
const commercialRegisterInput = ref(null)

const logoFileName = computed(() => (files.logo && files.logo.name) || '')
const commercialRegisterFileName = computed(() => (files.commercialRegister && files.commercialRegister.name) || '')

const logoPreviewUrl = computed(() => {
  if (avatarDataUrl.value) return avatarDataUrl.value
  return authStore.user?.avatarUrl || ''
})

const clearErrors = () => {
  errors.officialEmail = ''
  errors.officeName = ''
  errors.address = ''
  errors.description = ''
  errors.commercialRegister = ''
  errors.logo = ''
}

const onFileChange = (key, event) => {
  const target = event.target
  if (!target || !target.files || !target.files.length) {
    files[key] = null
    return
  }
  files[key] = target.files[0]
}

const onLogoChange = (event) => {
  const target = event.target
  if (!target?.files?.length) {
    files.logo = null
    avatarDataUrl.value = ''
    errors.logo = ''
    return
  }
  const file = target.files[0]
  if (!/^image\/(png|jpeg)$/.test(file.type)) {
    errors.logo = t('profile.validation.logoInvalidType')
    files.logo = null
    avatarDataUrl.value = ''
    return
  }
  if (file.size > MAX_LOGO_SIZE_BYTES) {
    errors.logo = t('profile.validation.logoTooLarge')
    files.logo = null
    avatarDataUrl.value = ''
    return
  }
  errors.logo = ''
  files.logo = file
  const reader = new FileReader()
  reader.onload = () => {
    avatarDataUrl.value = reader.result || ''
  }
  reader.readAsDataURL(file)
  target.value = ''
}

const triggerFileInput = (key) => {
  if (key === 'logo' && logoInput.value) {
    logoInput.value.click()
  } else if (key === 'commercialRegister' && commercialRegisterInput.value) {
    commercialRegisterInput.value.click()
  }
}

const handleSubmit = async () => {
  const requiresCommercialRegister = !authStore.user?.commercialRegisterFileName
  const schema = profileSchema({ requiresCommercialRegister })
  const result = validateForm(
    {
      officeName: form.officeName,
      officialEmail: form.officialEmail,
      address: form.address,
      description: form.description,
      commercialRegister: files.commercialRegister,
      logo: files.logo,
    },
    schema
  )
  if (!result.valid) {
    errors.officialEmail = result.errors.officialEmail ?? ''
    errors.officeName = result.errors.officeName ?? ''
    errors.address = result.errors.address ?? ''
    errors.description = result.errors.description ?? ''
    errors.commercialRegister = result.errors.commercialRegister ?? ''
    errors.logo = result.errors.logo ?? ''
    return
  }
  if (loading.value) return
  clearErrors()
  loading.value = true

  try {
    const user = authStore.user
    if (user?.phone) {
      const updated = userStore.updateProfile(user.phone, {
        officialEmail: form.officialEmail,
        officeName: form.officeName,
        address: form.address,
        description: form.description,
        bankName: form.bankName,
        bankAccountName: form.bankAccountName,
        iban: form.iban,
        avatarUrl: avatarDataUrl.value || user.avatarUrl || '',
        commercialRegisterFileName: files.commercialRegister?.name ?? user.commercialRegisterFileName ?? '',
      })
      if (updated) {
        authStore.setUser(updated)
      }
    }
    emit('submit-success')
  } finally {
    loading.value = false
  }
}

const onCancel = () => {
  if (loading.value) return
  emit('cancel')
}
</script>

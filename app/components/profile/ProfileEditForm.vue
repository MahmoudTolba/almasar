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
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#CEA04D] focus:border-transparent"
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
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#CEA04D] focus:border-transparent"
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
            <button
              type="button"
              @click="triggerFileInput('logo')"
              class="flex w-full items-center justify-between rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#4B5563] hover:border-[#AB8740] hover:bg-amber-50 transition-colors"
            >
              <span class="truncate">
                {{ logoFileName || t('profile.logoHint') }}
              </span>
              <span class="text-xs font-medium text-[#AB8740]">
                {{ t('profile.uploadActionLabel') }}
              </span>
            </button>
            <input
              ref="logoInput"
              type="file"
              class="hidden"
              accept="image/png,image/jpeg"
              @change="onFileChange('logo', $event)"
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
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#CEA04D] focus:border-transparent"
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
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#CEA04D] focus:border-transparent resize-none"
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
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#CEA04D] focus:border-transparent"
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
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#CEA04D] focus:border-transparent"
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
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#CEA04D] focus:border-transparent ltr:text-left rtl:text-right"
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
const emit = defineEmits(['submit-success', 'cancel'])

const { t } = useI18n()

const form = reactive({
  officialEmail: '',
  officeName: '',
  address: '',
  description: '',
  bankName: '',
  bankAccountName: '',
  iban: ''
})

const files = reactive({
  logo: null,
  commercialRegister: null
})

const errors = reactive({
  officialEmail: '',
  officeName: '',
  address: '',
  description: '',
  commercialRegister: ''
})

const loading = ref(false)

const logoInput = ref(null)
const commercialRegisterInput = ref(null)

const logoFileName = computed(() => (files.logo && files.logo.name) || '')
const commercialRegisterFileName = computed(() => (files.commercialRegister && files.commercialRegister.name) || '')

const clearErrors = () => {
  errors.officialEmail = ''
  errors.officeName = ''
  errors.address = ''
  errors.description = ''
  errors.commercialRegister = ''
}

const validate = () => {
  clearErrors()
  let valid = true

  if (!form.officeName.trim()) {
    errors.officeName = t('profile.validation.officeNameRequired')
    valid = false
  }

  if (!form.address.trim()) {
    errors.address = t('profile.validation.addressRequired')
    valid = false
  }

  if (form.officialEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.officialEmail)) {
    errors.officialEmail = t('profile.validation.emailInvalid')
    valid = false
  }

  if (!files.commercialRegister) {
    errors.commercialRegister = t('profile.validation.commercialRegisterRequired')
    valid = false
  }

  return valid
}

const onFileChange = (key, event) => {
  const target = event.target
  if (!target || !target.files || !target.files.length) {
    files[key] = null
    return
  }
  files[key] = target.files[0]
}

const triggerFileInput = (key) => {
  if (key === 'logo' && logoInput.value) {
    logoInput.value.click()
  } else if (key === 'commercialRegister' && commercialRegisterInput.value) {
    commercialRegisterInput.value.click()
  }
}

const handleSubmit = async () => {
  if (!validate() || loading.value) {
    return
  }

  loading.value = true

  try {
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

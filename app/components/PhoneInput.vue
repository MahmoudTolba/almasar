<template>
  <div ref="rootRef" class="relative">
    <label :for="inputId" class="block text-sm font-medium text-gray-700 mb-1.5 text-right">
      {{ t(labelKey) }}
    </label>
    <div
      class="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-accent/30 focus-within:border-accent"
    >
      <span class="flex items-center gap-2 flex-1 min-w-0">
        <span class="w-5 h-5 text-gray-400 shrink-0" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
          </svg>
        </span>
        <input
          :id="inputId"
          :value="nationalNumber"
          type="tel"
          inputmode="numeric"
          :placeholder="t(placeholderKey)"
          class="flex-1 min-w-0 bg-transparent border-none py-0.5 text-sm placeholder:text-gray-400 focus:outline-none text-right"
          @input="onInput($event)"
          @keydown="onKeydown"
        >
      </span>
      <div class="relative shrink-0">
        <button
          ref="triggerRef"
          type="button"
          class="flex items-center gap-1.5 text-gray-500 text-sm hover:text-gray-700 focus:outline-none focus:ring-0"
          :aria-expanded="dropdownOpen"
          aria-haspopup="listbox"
          :aria-label="t('common.selectCountry')"
          @click="toggleDropdown"
        >
          
          <span>{{ selectedCountry.dialCode }}+</span>
          <span class="text-base" aria-hidden="true">{{ selectedCountry.flag }}</span>
          <!-- <svg
            class="w-4 h-4 transition-transform"
            :class="{ 'rotate-180': dropdownOpen }"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg> -->
        </button>
        <Teleport to="body">
          <div
            v-if="dropdownOpen"
            ref="dropdownRef"
            class="fixed z-[9999] mt-1 max-h-60 w-64 overflow-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg"
            :style="dropdownStyle"
            role="listbox"
          >
            <button
              v-for="country in PHONE_COUNTRIES"
              :key="country.iso2"
              type="button"
              role="option"
              :aria-selected="selectedCountry.iso2 === country.iso2"
              class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
              :class="{ 'bg-accent/10': selectedCountry.iso2 === country.iso2 }"
              @click="selectCountry(country)"
            >
              <span class="text-base" aria-hidden="true">{{ country.flag }}</span>
              <span class="text-gray-900">+{{ country.dialCode }}</span>
              <span class="text-gray-500 truncate">{{ country.name }}</span>
            </button>
          </div>
        </Teleport>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PHONE_COUNTRIES, DEFAULT_COUNTRY, parseE164 } from '~/data/countries'

const props = defineProps({
  modelValue: { type: String, default: '' },
  labelKey: { type: String, default: 'login.phoneLabel' },
  placeholderKey: { type: String, default: 'login.phonePlaceholder' },
  inputId: { type: String, default: 'phone' },
})

const emit = defineEmits(['update:modelValue'])

const { t } = useI18n()

const rootRef = ref(null)
const triggerRef = ref(null)
const dropdownRef = ref(null)
const dropdownOpen = ref(false)
const selectedCountry = ref(DEFAULT_COUNTRY)
const nationalNumber = ref('')
const dropdownStyle = ref({})

function syncFromModelValue() {
  const v = props.modelValue || ''
  const parsed = parseE164(v)
  if (parsed) {
    const country = PHONE_COUNTRIES.find((c) => c.dialCode === parsed.dialCode) ?? DEFAULT_COUNTRY
    selectedCountry.value = country
    nationalNumber.value = parsed.nationalNumber
  } else {
    const digits = v.replace(/\D/g, '')
    nationalNumber.value = digits
    if (digits) {
      emit('update:modelValue', `+${selectedCountry.value.dialCode}${digits}`)
    }
  }
}

function emitE164() {
  const digits = nationalNumber.value.replace(/\D/g, '')
  const e164 = digits ? `+${selectedCountry.value.dialCode}${digits}` : ''
  emit('update:modelValue', e164)
}

function onKeydown(e) {
  if (['Backspace', 'Delete', 'Tab', 'Escape', 'Enter'].includes(e.key)) return
  if (e.ctrlKey || e.metaKey) return
  if (['Home', 'End', 'Left', 'Right'].includes(e.key)) return
  if (!/^\d$/.test(e.key)) e.preventDefault()
}

function onInput(e) {
  const value = e.target && e.target.value != null ? e.target.value : ''
  if (value.trim().startsWith('+')) {
    const parsed = parseE164(value)
    if (parsed) {
      const country = PHONE_COUNTRIES.find((c) => c.dialCode === parsed.dialCode) ?? selectedCountry.value
      selectedCountry.value = country
      nationalNumber.value = parsed.nationalNumber
      emitE164()
      return
    }
  }
  nationalNumber.value = value.replace(/\D/g, '')
  emitE164()
}

function toggleDropdown() {
  if (dropdownOpen.value) {
    dropdownOpen.value = false
    return
  }
  const rect = triggerRef.value?.getBoundingClientRect()
  if (rect) {
    const isRtl = document.documentElement.dir === 'rtl'
    dropdownStyle.value = {
      top: `${rect.bottom + 4}px`,
      left: isRtl ? 'auto' : `${rect.left}px`,
      right: isRtl ? `${window.innerWidth - rect.right}px` : 'auto',
    }
  }
  dropdownOpen.value = true
}

function selectCountry(country) {
  selectedCountry.value = country
  dropdownOpen.value = false
  emitE164()
}

function onDocumentClick(e) {
  if (!dropdownOpen.value) return
  const target = e.target
  if (
    rootRef.value?.contains(target) ||
    dropdownRef.value?.contains(target)
  )
    return
  dropdownOpen.value = false
}

watch(() => props.modelValue, syncFromModelValue, { immediate: true })

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick)
})
</script>

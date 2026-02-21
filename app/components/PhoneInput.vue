<template>
  <div>
    <label :for="inputId" class="block text-sm font-medium text-gray-700 mb-1.5 text-right">
      {{ t(labelKey) }}
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
        :id="inputId"
        :value="modelValue"
        type="tel"
        :placeholder="t(placeholderKey)"
        class="flex-1 min-w-0 bg-transparent border-none py-0.5 text-sm placeholder:text-gray-400 focus:outline-none"
        @input="onInput($event)"
      />
      <span class="flex items-center gap-1.5 text-gray-500 text-sm shrink-0">
        <span class="text-base" aria-hidden="true">🇸🇦</span>
        +966
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' },
  labelKey: { type: String, default: 'login.phoneLabel' },
  placeholderKey: { type: String, default: 'login.phonePlaceholder' },
  inputId: { type: String, default: 'phone' },
})

const emit = defineEmits(['update:modelValue'])

const { t } = useI18n()

function onInput(e) {
  const value = e.target && e.target.value != null ? e.target.value : ''
  emit('update:modelValue', value)
}
</script>

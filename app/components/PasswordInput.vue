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
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
      </span>
      <input
        :id="inputId"
        :value="modelValue"
        :type="showPassword ? 'text' : 'password'"
        :placeholder="t(placeholderKey)"
        class="flex-1 min-w-0 bg-transparent border-none py-0.5 text-sm placeholder:text-gray-400 focus:outline-none"
        @input="onInput($event)"
      />
      <button
        type="button"
        class="shrink-0 p-0.5 text-gray-400 hover:text-gray-600 focus:outline-none"
        :aria-label="showPassword ? t(hideAriaKey) : t(showAriaKey)"
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
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  labelKey: { type: String, default: 'login.passwordLabel' },
  placeholderKey: { type: String, default: 'login.passwordPlaceholder' },
  showAriaKey: { type: String, default: 'login.passwordShow' },
  hideAriaKey: { type: String, default: 'login.passwordHide' },
  inputId: { type: String, default: 'password' },
})

const emit = defineEmits(['update:modelValue'])

const { t } = useI18n()
const showPassword = ref(false)

function onInput(e) {
  const value = e.target && e.target.value != null ? e.target.value : ''
  emit('update:modelValue', value)
}
</script>

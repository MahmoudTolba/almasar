<template>
  <div>
    <label :for="inputId" class="block text-sm font-medium text-gray-700 mb-1.5 text-right">
      {{ t(labelKey) }}
    </label>
    <div
      class="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-accent/30 focus-within:border-accent"
    >
      <span class="w-5 h-5 text-gray-900 shrink-0 inline-flex" aria-hidden="true">
       <img src="~/assets/icons/lock-key.svg" alt="lock">
      </span>
      <input
        :id="inputId"
        :value="modelValue"
        :type="showPassword ? 'text' : 'password'"
        :placeholder="t(placeholderKey)"
        class="flex-1 min-w-0 bg-transparent border-none py-0.5 text-sm placeholder:text-gray-400 focus:outline-none"
        @input="onInput($event)"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
        @mousedown="onMouseDown"
        @mouseup="onMouseUp"
        @mouseleave="resetSwipeState"
        autocomplete="current-password"
      >
      <button
        type="button"
        class="toggle-password shrink-0 p-0.5 text-gray-900 hover:text-gray-700 focus:outline-none inline-flex items-center justify-center"
        :aria-label="showPassword ? t(hideAriaKey) : t(showAriaKey)"
        :aria-pressed="showPassword"
        @click="toggleVisibility"
      >
        <!-- eye OPEN = password hidden -->
        <svg
          v-if="!showPassword"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          shape-rendering="geometricPrecision"
          class="w-6 h-6 shrink-0"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
        <!-- eye CLOSED = password visible -->
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          shape-rendering="geometricPrecision"
          class="w-6 h-6 shrink-0"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3l3.764 3.764m3.43-3.431 3.43 3.43M3 3l3.764 3.764" />
        </svg>
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
const touchStartX = ref(0)
const touchEndX = ref(0)
const SWIPE_THRESHOLD = 50

function toggleVisibility() {
  showPassword.value = !showPassword.value
}

function onInput(e) {
  const value = e.target && e.target.value != null ? e.target.value : ''
  emit('update:modelValue', value)
}

function onTouchStart(e) {
  touchStartX.value = e.changedTouches?.[0]?.screenX ?? 0
}

function onTouchEnd(e) {
  touchEndX.value = e.changedTouches?.[0]?.screenX ?? 0
  handleSwipe()
}

function onMouseDown(e) {
  touchStartX.value = e.screenX ?? 0
}

function onMouseUp(e) {
  touchEndX.value = e.screenX ?? 0
  handleSwipe()
}

function resetSwipeState() {
  touchStartX.value = 0
  touchEndX.value = 0
}

function handleSwipe() {
  const deltaX = touchEndX.value - touchStartX.value
  if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
    if (deltaX > 0) {
      if (!showPassword.value) showPassword.value = true
    } else {
      if (showPassword.value) showPassword.value = false
    }
  }
  resetSwipeState()
}
</script>

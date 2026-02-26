<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40"
        @click.self="close"
        
      >
        <div class="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h2 class="text-xl font-bold text-gray-900 text-center mb-1">
            {{ t('languageModal.title') }}
          </h2>
          <p class="text-sm text-gray-600 text-center mb-6">
            {{ t('languageModal.subtitle') }}
          </p>

          <div class="space-y-3 mb-6">
            <button
              v-for="opt in languageOptions"
              :key="opt.id"
              type="button"
              class="w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-right transition-colors"
              :class="selectedId === opt.id
                ? 'bg-accent/10 border-accent'
                : 'bg-white border-gray-200 hover:border-gray-300'"
              @click="selectedId = opt.id"
            >
              <span class="flex items-center gap-2 flex-1 font-medium text-gray-900">
                {{ t(opt.labelKey) }}
                <img
                  :src="opt.iconSrc"
                  :alt="t(opt.labelKey)"
                  class="w-5 h-5 shrink-0"
                />
              </span>
              <span
                class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                :class="selectedId === opt.id ? 'border-accent bg-accent' : 'border-gray-300'"
              >
                <span
                  v-if="selectedId === opt.id"
                  class="w-2 h-2 rounded-full bg-white"
                />
              </span>
            </button>
          </div>

          <button
            type="button"
            class="w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors"
            @click="onContinue"
          >
            {{ t('languageModal.continue') }}
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import saFlagIcon from '~/assets/icons/sar-flag.svg'
import usaFlagIcon from '~/assets/icons/usa-flag.svg'
import urduFlagIcon from '~/assets/icons/urdo-flag.svg'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const { locale, setLocale, t } = useI18n()

const selectedId = ref('ar')

const languageOptions = [
  { id: 'ar', labelKey: 'languageModal.arabic', iconSrc: saFlagIcon },
  { id: 'en', labelKey: 'languageModal.english', iconSrc: usaFlagIcon },
  { id: 'ur', labelKey: 'languageModal.urdu', iconSrc: urduFlagIcon },
]

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    selectedId.value = locale.value || 'ar'
  }
})

function close() {
  emit('update:modelValue', false)
}

function onContinue() {
  setLocale(selectedId.value)
  close()
}
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

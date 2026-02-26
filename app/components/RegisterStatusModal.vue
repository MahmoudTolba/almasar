<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40"
        @click.self="close"
      >
        <div class="w-full max-w-lg bg-white rounded-t-2xl rounded-b-xl shadow-lg border border-gray-100 p-6 flex flex-col items-center">
          <!-- Loading state -->
          <div v-if="state === 'loading'" class="flex flex-col items-center">
            <img
              src="~/assets/icons/Loading.gif"
              alt=""
              class="w-24 h-24 object-contain mb-6"
              aria-hidden="true"
            >
            <p class="text-center text-gray-700 text-sm font-medium">
              {{ t('register.requestSentUnderReview') }}
            </p>
          </div>
          <!-- Success state -->
          <template v-else>
            <img
              src="~/assets/icons/done.gif"
              alt=""
              class="w-24 h-24 object-contain mb-4"
            >
            <p class="text-center text-gray-700 text-sm font-medium mb-6">
              {{ t('register.accountActivatedSuccess') }}
            </p>
            <button
              type="button"
              class="w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors"
              @click="close"
            >
              {{ t('common.back') }}
            </button>
          </template>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  modelValue: { type: Boolean, default: false },
  state: {
    type: String,
    default: 'loading',
    validator: (v) => ['loading', 'success'].includes(v),
  },
})

const emit = defineEmits(['update:modelValue'])

const { t } = useI18n()

function close() {
  emit('update:modelValue', false)
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

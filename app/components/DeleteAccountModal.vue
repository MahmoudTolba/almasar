<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40"
        @click.self="close"
      >
        <div class="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex flex-col items-center">
          <img
            src="~/assets/icons/Logout.gif"
            alt=""
            class="w-24 h-24 object-contain mb-4"
          >
          <p class="text-center text-gray-900 font-medium mb-6">
            {{ confirmMessage }}
          </p>

          <div class="w-full flex flex-row gap-3">
            <button
              type="button"
              class="flex-1 py-3 rounded-xl bg-[#E8E0D4] text-gray-800 text-sm font-bold hover:bg-[#DDD5C7] transition-colors"
              @click="onConfirm"
            >
              {{ confirmButtonLabel }}
            </button>
            <button
              type="button"
              class="flex-1 py-3 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors"
              @click="close"
            >
              {{ t('settings.cancel') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  variant: {
    type: String,
    default: 'deleteAccount',
    validator: (v) => ['deleteAccount', 'logout'].includes(v),
  },
})

const emit = defineEmits(['update:modelValue', 'confirm'])

const { t } = useI18n()

const confirmMessage = computed(() =>
  props.variant === 'logout'
    ? t('logout.confirmMessage')
    : t('settings.deleteAccountConfirmMessage'),
)

const confirmButtonLabel = computed(() =>
  props.variant === 'logout'
    ? t('logout.confirm')
    : t('settings.confirmDeletion'),
)

function close() {
  emit('update:modelValue', false)
}

function onConfirm() {
  emit('confirm')
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

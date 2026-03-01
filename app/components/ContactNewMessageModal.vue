<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40"
        @click.self="close"
      >
        <div class="w-full max-w-4xl bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex flex-col">
          <h2 class="text-lg font-bold text-gray-900 mb-4">{{ t('contact.newMessage') }}</h2>

          <!-- Message type -->
          <p class="text-sm font-medium text-gray-700 mb-2">{{ t('contact.messageType') }}</p>
          <div class="grid grid-cols-3 gap-2 mb-4">
            <button
              v-for="opt in typeOptions"
              :key="opt.id"
              type="button"
              @click="form.type = opt.id"
              class="rounded-xl border p-3 flex flex-col items-center gap-2 transition-colors"
              :class="form.type === opt.id ? 'bg-amber-50 border-amber-300' : 'bg-white border-gray-200 hover:bg-gray-50'"
            >
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0"
                :class="opt.iconBgClass"
              >
                <!-- Inquiry: question mark -->
                <svg
                  v-if="opt.id === 'inquiry'"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712M9 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <!-- Complaint: exclamation -->
                <svg
                  v-else-if="opt.id === 'complaint'"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <!-- Suggestion: lightbulb -->
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </div>
              <span class="text-xs font-medium text-gray-700">{{ t(opt.labelKey) }}</span>
            </button>
          </div>

          <!-- Message title (optional) -->
          <label for="contact-modal-title" class="text-sm font-medium text-gray-700 mb-1">{{ t('contact.messageTitleOptional') }}</label>
          <input
            id="contact-modal-title"
            v-model="form.title"
            type="text"
            class="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent mb-4"
            :placeholder="t('contact.messageTitlePlaceholder')"
          >

          <!-- Message content -->
          <label for="contact-modal-body" class="text-sm font-medium text-gray-700 mb-1">{{ t('contact.messageContent') }}</label>
          <textarea
            id="contact-modal-body"
            v-model="form.body"
            rows="4"
            maxlength="500"
            class="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-y"
            :placeholder="t('contact.messageContentPlaceholder')"
          />
          <p class="text-xs text-gray-500 mt-1">{{ form.body.length }}/500</p>

          <!-- Actions -->
          <div class="flex flex-row gap-3 mt-6">
            <button
              type="button"
              class="flex-1 py-3 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors"
              @click="onSubmit"
            >
              {{ t('contact.sendMessage') }}
            </button>
            <button
              type="button"
              class="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 text-sm font-bold hover:bg-gray-50 transition-colors"
              @click="close"
            >
              {{ t('common.cancel') }}
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
})

const emit = defineEmits(['update:modelValue', 'submit'])

const { t } = useI18n()

const form = ref({
  type: 'inquiry',
  title: '',
  body: '',
})

const typeOptions = [
  { id: 'inquiry', labelKey: 'contact.typeInquiry', iconBgClass: 'bg-blue-500' },
  { id: 'complaint', labelKey: 'contact.typeComplaint', iconBgClass: 'bg-red-500' },
  { id: 'suggestion', labelKey: 'contact.typeSuggestion', iconBgClass: 'bg-emerald-500' },
]

function close() {
  emit('update:modelValue', false)
}

function onSubmit() {
  const title = form.value.title.trim()
  const body = form.value.body.trim()
  if (!body) return
  emit('submit', { type: form.value.type, title, body })
  form.value = { type: 'inquiry', title: '', body: '' }
  close()
}

watch(() => props.modelValue, (open) => {
  if (open) {
    form.value = { type: 'inquiry', title: '', body: '' }
  }
})
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

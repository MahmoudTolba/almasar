<template>
  <div class="w-full px-3 sm:px-4 lg:px-0">
    <!-- Header -->
    <div class="flex flex-row justify-between items-start gap-4 mb-6 lg:mb-8">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{{ t('contact.title') }}</h1>
        <p class="text-xs lg:text-base text-gray-500">{{ t('contact.subtitle') }}</p>
      </div>
      <button
        type="button"
        class="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors"
        @click="showNewMessageModal = true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        {{ t('contact.newMessage') }}
      </button>
    </div>

    <ContactNewMessageModal
      v-model="showNewMessageModal"
      @submit="onNewMessageSubmit"
    />

    <!-- Filter cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
      <button
        v-for="filter in filterOptions"
        :key="filter.id"
        type="button"
        @click="activeFilter = filter.id"
        class="rounded-xl border p-4 text-start transition-colors"
        :class="activeFilter === filter.id ? 'bg-amber-50 border-amber-200' : 'bg-white border-gray-100 shadow-sm'"
      >
        <p class="text-xl font-bold text-gray-800">{{ filter.count }}</p>
        <p class="text-sm text-gray-600 mt-1">{{ t(filter.labelKey) }}</p>
      </button>
    </div>

    <!-- Message list -->
    <div class="flex flex-col gap-4">
      <div
        v-for="msg in filteredMessages"
        :key="msg.id"
        class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5 flex flex-col gap-3"
      >
        <div class="flex flex-row items-start gap-3">
          <!-- ID badge (optional) -->
          <span
            v-if="msg.displayId"
            class="shrink-0 px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700 text-xs font-medium"
          >
            {{ msg.displayId }}
          </span>
          <div class="flex-1 min-w-0 flex flex-col gap-2">
            <div class="flex flex-row items-center justify-between gap-2">
              <h2 class="text-base font-bold text-gray-900">{{ msg.titleKey ? t(msg.titleKey) : (msg.title ?? '') }}</h2>
              <!-- Type icon -->
              <div
                class="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white"
                :class="typeConfig[msg.type].iconBgClass"
                aria-hidden="true"
              >
                <!-- Inquiry: question mark -->
                <svg
                  v-if="msg.type === 'inquiry'"
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
                  v-else-if="msg.type === 'complaint'"
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
            </div>
            <!-- Tags -->
            <div class="flex flex-wrap gap-2">
              <span
                class="px-2.5 py-1 rounded-lg text-xs font-medium"
                :class="typeConfig[msg.type].pillClass"
              >
                {{ t(typeConfig[msg.type].labelKey) }}
              </span>
              <span
                class="px-2.5 py-1 rounded-lg text-xs font-medium"
                :class="statusConfig[msg.status].pillClass"
              >
                {{ t(statusConfig[msg.status].labelKey) }}
              </span>
            </div>
            <p class="text-sm text-gray-600">{{ msg.bodyKey ? t(msg.bodyKey) : msg.body }}</p>
            <!-- Footer -->
            <div class="flex flex-wrap items-center gap-3 pt-1 text-xs text-gray-500">
              <span class="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                {{ t(msg.senderKey) }}
              </span>
              <span class="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ msg.date }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()

definePageMeta({
  title: 'contact.title',
})

const showNewMessageModal = ref(false)
const activeFilter = ref('all')

function formatDateTime(date) {
  const d = new Date(date)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const h = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  return `${y}-${m}-${day} ${h}:${min}`
}

function onNewMessageSubmit(payload) {
  const nextId = messages.value.length ? Math.max(...messages.value.map((m) => m.id)) + 1 : 1
  messages.value.push({
    id: nextId,
    type: payload.type,
    status: 'pending',
    title: payload.title || '',
    body: payload.body,
    senderKey: 'contact.msg1Sender',
    date: formatDateTime(new Date()),
  })
  showNewMessageModal.value = false
}

const typeConfig = {
  inquiry: {
    labelKey: 'contact.typeInquiry',
    pillClass: 'bg-blue-100 text-blue-700',
    iconBgClass: 'bg-blue-500',
  },
  complaint: {
    labelKey: 'contact.typeComplaint',
    pillClass: 'bg-red-100 text-red-700',
    iconBgClass: 'bg-red-500',
  },
  suggestion: {
    labelKey: 'contact.typeSuggestion',
    pillClass: 'bg-green-100 text-green-700',
    iconBgClass: 'bg-emerald-500',
  },
}

const statusConfig = {
  replied: {
    labelKey: 'contact.statusReplied',
    pillClass: 'bg-green-100 text-green-700',
  },
  pending: {
    labelKey: 'contact.statusPending',
    pillClass: 'bg-amber-100 text-amber-700',
  },
  closed: {
    labelKey: 'contact.statusClosed',
    pillClass: 'bg-gray-100 text-gray-600',
  },
}

const messages = ref([
  {
    id: 1,
    displayId: '10',
    type: 'inquiry',
    status: 'replied',
    titleKey: 'contact.msg1Title',
    bodyKey: 'contact.msg1Body',
    senderKey: 'contact.msg1Sender',
    date: '2024-01-15 10:30',
  },
  {
    id: 2,
    displayId: '20',
    type: 'complaint',
    status: 'replied',
    titleKey: 'contact.msg2Title',
    bodyKey: 'contact.msg2Body',
    senderKey: 'contact.msg2Sender',
    date: '2024-01-14 09:15',
  },
  {
    id: 3,
    type: 'suggestion',
    status: 'pending',
    titleKey: 'contact.msg3Title',
    bodyKey: 'contact.msg3Body',
    senderKey: 'contact.msg3Sender',
    date: '2024-01-16 08:00',
  },
  {
    id: 4,
    displayId: '10',
    type: 'inquiry',
    status: 'closed',
    titleKey: 'contact.msg4Title',
    bodyKey: 'contact.msg4Body',
    senderKey: 'contact.msg4Sender',
    date: '2024-01-13 15:20',
  },
])

const filterOptions = computed(() => {
  const list = messages.value
  return [
    { id: 'all', labelKey: 'contact.allMessages', count: list.length },
    { id: 'pending', labelKey: 'contact.pending', count: list.filter((m) => m.status === 'pending').length },
    { id: 'replied', labelKey: 'contact.replied', count: list.filter((m) => m.status === 'replied').length },
    { id: 'complaints', labelKey: 'contact.complaints', count: list.filter((m) => m.type === 'complaint').length },
  ]
})

const filteredMessages = computed(() => {
  const list = messages.value
  if (activeFilter.value === 'all') return list
  if (activeFilter.value === 'pending') return list.filter((m) => m.status === 'pending')
  if (activeFilter.value === 'replied') return list.filter((m) => m.status === 'replied')
  if (activeFilter.value === 'complaints') return list.filter((m) => m.type === 'complaint')
  return list
})
</script>

<template>
  <div class="w-full px-3 sm:px-4 lg:px-0">
    <!-- Header with badge -->
    <div class="flex flex-row justify-between items-start gap-4 mb-6 lg:mb-8">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          {{ t('notifications.title') }}
        </h1>
        <p class="text-xs lg:text-base text-gray-500">
          {{ t('notifications.subtitle') }}
        </p>
      </div>
      <span
        v-if="unreadCount > 0"
        class="shrink-0 px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-lg"
      >
        {{ t('notifications.newBadge', { count: unreadCount }) }}
      </span>
    </div>

    <!-- Notification list -->
    <div class="flex flex-col gap-3">
      <div
        v-for="item in notifications"
        :key="item.id"
        class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-start gap-3"
      >
        <!-- Unread dot -->
        <span
          v-if="!item.read"
          class="shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-2"
          aria-hidden="true"
        />
        <span v-else class="shrink-0 w-2" aria-hidden="true" />

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <p class="text-sm lg:text-base text-gray-900">
            {{ item.message }}
          </p>
          <span
            class="inline-block mt-2 px-2.5 py-1 rounded-lg text-xs font-medium"
            :class="typeConfig[item.type].pillClass"
          >
            {{ t(typeConfig[item.type].labelKey) }}
          </span>
        </div>

        <!-- Icon -->
        <div
          class="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
          :class="typeConfig[item.type].iconBgClass"
          aria-hidden="true"
        >
          <!-- New order: bag/lock -->
          <svg
            v-if="item.type === 'new_order'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
            :class="typeConfig[item.type].iconClass"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <!-- Payment: dollar -->
          <svg
            v-else-if="item.type === 'payment_received'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
            :class="typeConfig[item.type].iconClass"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <!-- Documents: document with plus -->
          <svg
            v-else-if="item.type === 'documents_uploaded'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
            :class="typeConfig[item.type].iconClass"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3m-9 9a9 9 0 0118 0m-9-9v6m3-3m-9 9a9 9 0 0018 0"
            />
          </svg>
          <!-- Cancelled: X -->
          <svg
            v-else-if="item.type === 'cancelled'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
            :class="typeConfig[item.type].iconClass"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()

const typeConfig = {
  new_order: {
    labelKey: 'notifications.typeNewOrder',
    pillClass: 'bg-blue-100 text-blue-700',
    iconBgClass: 'bg-blue-100',
    iconClass: 'text-blue-600',
  },
  payment_received: {
    labelKey: 'notifications.typePaymentReceived',
    pillClass: 'bg-green-100 text-green-700',
    iconBgClass: 'bg-green-100',
    iconClass: 'text-green-600',
  },
  documents_uploaded: {
    labelKey: 'notifications.typeDocumentsUploaded',
    pillClass: 'bg-purple-100 text-purple-700',
    iconBgClass: 'bg-purple-100',
    iconClass: 'text-purple-600',
  },
  cancelled: {
    labelKey: 'notifications.typeCancelled',
    pillClass: 'bg-red-100 text-red-700',
    iconBgClass: 'bg-red-100',
    iconClass: 'text-red-600',
  },
}

const notifications = ref([
  {
    id: 1,
    message: 'طلب حجز جديد من محمد عبدالله الزهراني',
    type: 'new_order',
    read: false,
  },
  {
    id: 2,
    message: 'تم استلام الدفع الكامل للطلب 006-2024-ORD',
    type: 'payment_received',
    read: false,
  },
  {
    id: 3,
    message: 'تم رفع المستندات المطلوبة للطلب 005-2024-ORD',
    type: 'documents_uploaded',
    read: true,
  },
  {
    id: 4,
    message: 'طلب حجز جديد من فاطمة حسن القرني',
    type: 'new_order',
    read: true,
  },
  {
    id: 5,
    message: 'تم إلغاء الطلب 003-2024-ORD من قبل العميل',
    type: 'cancelled',
    read: true,
  },
])

const unreadCount = computed(() =>
  notifications.value.filter((n) => !n.read).length
)
</script>

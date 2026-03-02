<template>
  <div class="w-full px-3 sm:px-4 lg:px-0">
    <template v-if="order">
      <!-- Header -->
      <div class="mb-6 lg:mb-8">
        <NuxtLink
          :to="localePath('/')"
          class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <span class="w-5 h-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </span>
          {{ t('orderDetails.backToOrders') }}
        </NuxtLink>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          {{ t('orderDetails.title') }}
        </h1>
        <p class="text-xs lg:text-base text-gray-500 mb-4">
          {{ t('orderDetails.subtitle') }}
        </p>
        <div class="flex flex-wrap items-center justify-between gap-3 bg-[#Ffffff] p-4 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center gap-2">
            <img src="~/assets/icons/time-02.svg" alt="order-number" class="w-5 h-5 object-contain"></img>
            <span class="text-sm font-medium text-gray-600">{{ t('orderDetails.orderNumber') }}</span>
            <span class="text-sm font-bold text-orange-500">{{ order.id }}</span>
            <span class="w-5 h-5 text-gray-400" aria-hidden="true">
           
            </span>
          </div>
          <span
            class="px-3 py-1.5 rounded-lg text-xs font-bold"
            :class="statusTagClass"
          >
            {{ statusLabel }}
          </span>
        </div>
      </div>

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <!-- Client Information -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <h2 class="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            {{ t('orderDetails.clientInfo') }}
            <span class="w-4 h-4 text-gray-400" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
            </span>
          </h2>
          <dl class="space-y-3 text-sm">
            <div>
              <dt class="text-gray-500 font-medium">{{ t('orderDetails.fullName') }}</dt>
              <dd class="font-semibold text-gray-900">{{ order.clientName }}</dd>
            </div>
            <div>
              <dt class="text-gray-500 font-medium">{{ t('orderDetails.phoneNumber') }}</dt>
              <dd class="font-semibold text-gray-900">{{ order.clientPhone }}</dd>
            </div>
            <div>
              <dt class="text-gray-500 font-medium">{{ t('orderDetails.email') }}</dt>
              <dd class="font-semibold text-gray-900">{{ order.clientEmail }}</dd>
            </div>
            <div>
              <dt class="text-gray-500 font-medium">{{ t('orderDetails.orderDate') }}</dt>
              <dd class="font-semibold text-gray-900">{{ order.date }} {{ order.time }}</dd>
            </div>
          </dl>
        </div>

        <!-- Payment Details (gold/brown card) -->
        <div class="bg-gradient-to-br from-[#AB8740] to-[#B58C3A] rounded-xl shadow-sm border border-amber-800/50 p-4 sm:p-6 text-amber-50">
          <h2 class="text-sm font-semibold mb-4 flex items-center gap-2">
            {{ t('orderDetails.paymentDetails') }}
            <span class="w-4 h-4 text-amber-200/80" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
            </span>
          </h2>
          <dl class="space-y-3 text-sm">
            <div>
              <dt class="text-amber-200/90 font-medium">{{ t('orderDetails.paidAmount') }}</dt>
              <dd class="font-semibold">{{ formatAmount(order.paidAmount) }}</dd>
            </div>
            <div>
              <dt class="text-amber-200/90 font-medium">{{ t('orderDetails.remainingAmount') }}</dt>
              <dd class="font-semibold">{{ formatAmount(order.remainingAmount) }}</dd>
            </div>
            <div>
              <dt class="text-amber-200/90 font-medium">{{ t('orderDetails.totalAmount') }}</dt>
              <dd class="text-lg font-bold">{{ formatAmount(order.totalAmount) }}</dd>
            </div>
            <div class="flex items-center gap-2 pt-2">
              <dt class="text-amber-200/90 font-medium">{{ t('orderDetails.paymentMethod') }}</dt>
              <span class="w-5 h-5 text-amber-200" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                </svg>
              </span>
              <dd class="font-semibold">{{ order.paymentMethod }}</dd>
            </div>
          </dl>
        </div>

        <!-- Booking Details -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:col-span-2">
          <h2 class="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            {{ t('orderDetails.bookingDetails') }}
            <span class="w-4 h-4 text-gray-400" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
            </span>
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <dt class="text-gray-500 text-xs font-medium">{{ t('orderDetails.roomType') }}</dt>
              <dd class="font-semibold text-gray-900">{{ order.roomType }}</dd>
            </div>
            <div>
              <dt class="text-gray-500 text-xs font-medium">{{ t('orderDetails.hotel') }}</dt>
              <dd class="font-semibold text-gray-900">{{ order.hotel }}</dd>
            </div>
            <div>
              <dt class="text-gray-500 text-xs font-medium">{{ t('orderDetails.stayDuration') }}</dt>
              <dd class="font-semibold text-gray-900">{{ order.stayDuration }}</dd>
            </div>
            <div>
              <dt class="text-gray-500 text-xs font-medium">{{ t('orderDetails.peopleCount') }}</dt>
              <dd class="font-semibold text-gray-900">{{ order.peopleCount }} {{ t('orders.peopleSuffix') }}</dd>
            </div>
            <div>
              <dt class="text-gray-500 text-xs font-medium">{{ t('orderDetails.startDate') }}</dt>
              <dd class="font-semibold text-gray-900">{{ order.startDate }}</dd>
            </div>
            <div>
              <dt class="text-gray-500 text-xs font-medium">{{ t('orderDetails.endDate') }}</dt>
              <dd class="font-semibold text-gray-900">{{ order.endDate }}</dd>
            </div>
          </div>
        </div>

        <!-- Note -->
        <div class="bg-amber-50 rounded-xl border border-amber-200 p-4 sm:p-6 lg:col-span-2">
          <h2 class="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
            {{ t('orderDetails.note') }}
            <span class="w-4 h-4 text-gray-400" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
            </span>
          </h2>
          <p class="text-sm text-gray-700">
            {{ t('orderDetails.noteMessage') }}
          </p>
        </div>
      </div>
    </template>

    <!-- Order not found -->
    <div v-else class="flex flex-col items-center justify-center py-16 text-center">
      <p class="text-gray-500 mb-4">{{ t('orderDetails.notFound') }}</p>
      <NuxtLink
        :to="localePath('/')"
        class="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800"
      >
        {{ t('orderDetails.backToOrders') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ title: 'orderDetails.title' })

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()

const { getOrderById } = useOrders()

const order = computed(() => {
  const id = route.params.id
  if (typeof id !== 'string') return undefined
  return getOrderById(id)
})

const statusLabel = computed(() => {
  if (!order.value) return ''
  if (order.value.status === 'pending_payment') {
    return t('orderDetails.status_pending_payment_long')
  }
  return t('orders.status_' + order.value.status)
})

const statusTagClass = computed(() => {
  if (!order.value) return ''
  const styles = {
    pending_payment: 'bg-amber-100 text-amber-800',
    confirmed: 'bg-blue-50 text-blue-600',
    completed: 'bg-green-50 text-green-600',
    rejected: 'bg-red-50 text-red-600',
    cancelled: 'bg-gray-100 text-gray-500',
  }
  return styles[order.value.status] ?? 'bg-gray-100 text-gray-600'
})

function formatAmount(value) {
  return `${value.toLocaleString()} ${t('orders.currency')}`
}
</script>

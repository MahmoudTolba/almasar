<template>
  <div class="w-full px-3 sm:px-4 lg:px-0">
    <!-- Header Section -->
    <div class="mb-6 lg:mb-8">
      <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{{ t('orders.title') }}</h1>
      <p class="text-xs lg:text-base text-gray-500">{{ t('orders.subtitle') }}</p>
    </div>

    <!-- Actions Section -->
    <div class="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
      <div
        class="flex items-center bg-white p-1 rounded-xl shadow-sm border border-gray-100 overflow-x-auto no-scrollbar whitespace-nowrap"
      >
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="px-4 lg:px-6 py-2 rounded-lg text-xs sm:text-sm lg:text-sm font-medium transition-all"
          :class="activeTab === tab.id ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'"
        >
          {{ t(tab.labelKey) }}
        </button>
      </div>
      <div class="relative flex-1 max-w-md w-full mt-3 xl:mt-0">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="t('orders.searchPlaceholder')"
          class="w-full pe-10 ps-4 py-3 rounded-xl bg-white border border-gray-100 shadow-sm focus:ring-2 focus:ring-accent outline-none transition-all placeholder:text-gray-400 text-sm lg:text-base"
        />
        <div class="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400">
          <span class="w-5 h-5 inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </span>
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[800px] text-start border-collapse">
          <thead>
            <tr class="bg-gray-50/50 border-b border-gray-100">
              <th class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600">{{ t('orders.orderId') }}</th>
              <th class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600">{{ t('orders.client') }}</th>
              <th class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600">{{ t('orders.serviceType') }}</th>
              <th class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600">{{ t('orders.peopleCount') }}</th>
              <th class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600">{{ t('orders.amount') }}</th>
              <th class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600">{{ t('orders.date') }}</th>
              <th class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600">{{ t('orders.status') }}</th>
              <th class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600 text-center">
                {{ t('orders.actions') }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-4 sm:px-6 py-4 sm:py-5">
                <span class="text-xs sm:text-sm font-bold text-orange-400">{{ order.id }}</span>
              </td>
              <td class="px-4 sm:px-6 py-4 sm:py-5">
                <div class="flex flex-col">
                  <span class="text-xs sm:text-sm font-bold text-gray-900">{{ order.clientName }}</span>
                  <span class="text-[10px] sm:text-xs text-gray-400">{{ order.clientPhone }}</span>
                </div>
              </td>
              <td class="px-4 sm:px-6 py-4 sm:py-5 font-semibold text-gray-600 text-xs sm:text-sm">
                {{ order.serviceType }}
              </td>
              <td class="px-4 sm:px-6 py-4 sm:py-5 text-gray-600 text-xs sm:text-sm font-semibold">
                {{ order.peopleCount }} {{ t('orders.peopleSuffix') }}
              </td>
              <td class="px-4 sm:px-6 py-4 sm:py-5">
                <div class="flex flex-col">
                  <span class="text-xs sm:text-sm font-bold text-gray-900">{{ order.amount.toLocaleString() }}</span>
                  <span class="text-[10px] text-gray-400">{{ t('orders.currency') }}</span>
                </div>
              </td>
              <td class="px-4 sm:px-6 py-4 sm:py-5">
                <div class="flex flex-col text-[10px] sm:text-xs text-gray-400">
                  <span>{{ order.date }}</span>
                  <span>{{ order.time }}</span>
                </div>
              </td>
              <td class="px-4 sm:px-6 py-4 sm:py-5">
                <span
                  class="px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-bold inline-block"
                  :class="statusStyles[order.status]"
                >
                  {{ order.statusLabel }}
                </span>
              </td>
              <td class="px-4 sm:px-6 py-4 sm:py-5 text-center">
                <NuxtLink
                  :to="localePath('/orders/' + order.id)"
                  class="inline-block px-3 sm:px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-50 transition-all"
                >
                  {{ t('orders.orderDetails') }}
                </NuxtLink>
              </td>
            </tr>
            <tr v-if="filteredOrders.length === 0" class="text-center">
              <td colspan="8" class="px-4 sm:px-6 py-12 sm:py-16 text-gray-500 text-sm sm:text-base">
                {{ t('orders.noOrders') }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ title: 'orders.title' })

const { t } = useI18n()
const localePath = useLocalePath()
const { orders } = useOrders()

const activeTab = ref('new')
const searchQuery = ref('')

const TAB_STATUS_MAP = {
  new: ['pending_payment'],
  confirmed: ['confirmed'],
  completed: ['completed'],
  cancelled: ['cancelled', 'rejected'],
}

const tabs = [
  { id: 'new', labelKey: 'orders.tabNew' },
  { id: 'confirmed', labelKey: 'orders.tabConfirmed' },
  { id: 'completed', labelKey: 'orders.tabCompleted' },
  { id: 'cancelled', labelKey: 'orders.tabCancelled' },
]

const filteredOrders = computed(() => {
  const allowedStatuses = TAB_STATUS_MAP[activeTab.value] ?? []
  const query = searchQuery.value.trim().toLowerCase()

  return orders.filter((order) => {
    const matchesTab = allowedStatuses.includes(order.status)
    if (!matchesTab) return false

    if (!query) return true

    const searchableFields = [
      order.id,
      order.clientName,
      order.clientPhone,
      order.serviceType,
    ].filter(Boolean)

    return searchableFields.some((field) =>
      String(field).toLowerCase().includes(query)
    )
  })
})

const statusStyles = {
  pending_payment: 'bg-orange-50 text-orange-500',
  confirmed: 'bg-blue-50 text-blue-500',
  completed: 'bg-green-50 text-green-500 underline',
  rejected: 'bg-red-50 text-red-500',
  cancelled: 'bg-gray-50 text-gray-400',
}
</script>

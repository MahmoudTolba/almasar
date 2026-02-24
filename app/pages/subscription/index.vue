<template>
  <div class="w-full px-3 sm:px-4 lg:px-0">
    <!-- Header -->
    <div class="mb-6 lg:mb-8">
      <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
        {{ t('subscription.title') }}
      </h1>
      <p class="text-xs lg:text-base text-gray-500">
        {{ t('subscription.subtitle') }}
      </p>
    </div>

    <!-- Summary cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6 lg:mb-8">
      <div
        v-for="card in summaryCards"
        :key="card.id"
        class="bg-white rounded-xl border border-amber-200 shadow-sm p-5 flex flex-col items-start gap-3"
      >
        <div
          class="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-600"
          aria-hidden="true"
        >
          <!-- Crown -->
          <svg
            v-if="card.icon === 'crown'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 2L14.5 8.5L21 9L16 13.5L17.5 20L12 17L6.5 20L8 13.5L3 9L9.5 8.5L12 2Z"
            />
          </svg>
          <!-- Percent -->
          <span v-else-if="card.icon === 'percent'" class="text-xl font-bold">%</span>
          <!-- Currency -->
          <svg
            v-else-if="card.icon === 'currency'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <!-- Wallet -->
          <svg
            v-else-if="card.icon === 'wallet'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
            />
          </svg>
        </div>
        <p class="text-sm font-medium text-gray-600">
          {{ t(card.titleKey) }}
        </p>
        <p class="text-xl lg:text-2xl font-bold text-gray-900">
          {{ card.id === 'type' ? t('subscription.annualSubscription') : `${card.value} ${t('orders.currency')}` }}
        </p>
      </div>
    </div>
    <div class="bg-white rounded-xl border border-[#0000000D] shadow-sm p-5">
    <!-- Tab bar -->
    <div
      class="flex items-center bg-white p-1 rounded-xl shadow-sm border border-b border-gray-100 overflow-x-auto no-scrollbar whitespace-nowrap mb-6"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        @click="activeTab = tab.id"
        class="px-4 lg:px-6 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all"
        :class="activeTab === tab.id ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'"
      >
        {{ t(tab.labelKey) }}
      </button>
    </div>

    <!-- Tab: Overview -->
    <div v-show="activeTab === 'overview'" class="space-y-6">
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6 ">
        <!-- Subscription details card -->
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span
              class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"
              aria-hidden="true"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </span>
            {{ t('subscription.subscriptionDetails') }}
          </h2>
          <dl class="space-y-3 text-sm">
            <div class="flex justify-between items-center gap-2">
              <dt class="text-gray-600">{{ t('subscription.subscriptionTypeLabel') }}</dt>
              <dd class="font-medium text-gray-900">{{ t('subscription.annualSubscription') }}</dd>
            </div>
            <div class="flex justify-between items-center gap-2">
              <dt class="text-gray-600">{{ t('subscription.status') }}</dt>
              <dd>
                <span class="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  {{ t('subscription.active') }}
                </span>
              </dd>
            </div>
            <div class="flex justify-between items-center gap-2">
              <dt class="text-gray-600">{{ t('subscription.startDate') }}</dt>
              <dd class="font-medium text-gray-900">2024-01-01</dd>
            </div>
            <div class="flex justify-between items-center gap-2">
              <dt class="text-gray-600">{{ t('subscription.endDate') }}</dt>
              <dd class="font-medium text-gray-900">2024-12-31</dd>
            </div>
            <div class="flex justify-between items-center gap-2">
              <dt class="text-gray-600">{{ t('subscription.subscriptionFee') }}</dt>
              <dd class="font-semibold text-blue-600">12,000 {{ t('orders.currency') }}</dd>
            </div>
          </dl>
        </div>

        <!-- Commission info card -->
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span
              class="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 shrink-0"
              aria-hidden="true"
            >
              <span class="text-sm font-bold">%</span>
            </span>
            {{ t('subscription.commissionInfo') }}
          </h2>
          <p class="text-2xl font-bold text-orange-600 mb-2">15%</p>
          <p class="text-sm text-gray-600 mb-4">
            {{ t('subscription.totalPaidCommissions') }}: 23,520 {{ t('orders.currency') }}
          </p>
          <div class="rounded-lg bg-orange-50 border border-orange-100 p-4 flex gap-3">
            <span class="w-6 h-6 rounded-full bg-orange-200 flex items-center justify-center text-orange-700 shrink-0 text-xs font-bold">i</span>
            <div class="text-sm text-gray-700">
              <p class="mb-1">{{ t('subscription.commissionInfoText') }}</p>
              <p class="text-orange-700 font-medium">{{ t('subscription.commissionExample') }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- How financial system works -->
      <div class="bg-[#EFF6FF] rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span
            class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"
            aria-hidden="true"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
          </span>
          {{ t('subscription.howFinancialWorks') }}
        </h2>
        <ul class="list-disc list-inside space-y-2 text-sm text-gray-700">
          <li>{{ t('subscription.howFinancialBullet1') }}</li>
          <li>{{ t('subscription.howFinancialBullet2') }}</li>
          <li>{{ t('subscription.howFinancialBullet3') }}</li>
          <li>{{ t('subscription.howFinancialBullet4') }}</li>
        </ul>
      </div>
    </div>

    <!-- Tab: Financial movements -->
    <div v-show="activeTab === 'movements'" class="space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 class="text-lg font-semibold text-gray-900">
          {{ t('subscription.transactionsLog') }}
        </h2>
        <button
          type="button"
          class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shrink-0"
          @click="exportReport"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          {{ t('subscription.exportReport') }}
        </button>
      </div>
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[800px] text-start border-collapse">
            <thead>
              <tr class="bg-gray-50/50 border-b border-gray-100">
                <th class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600">{{ t('subscription.transactionNumber') }}</th>
                <th class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600">{{ t('subscription.type') }}</th>
                <th class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600">{{ t('subscription.description') }}</th>
                <th class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600">{{ t('subscription.amount') }}</th>
                <th class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600">{{ t('subscription.date') }}</th>
                <th class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600">{{ t('subscription.status') }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr
                v-for="tx in transactions"
                :key="tx.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-4 sm:px-6 py-4 sm:py-5 text-sm font-medium text-gray-900">{{ tx.id }}</td>
                <td class="px-4 sm:px-6 py-4 sm:py-5">
                  <span
                    class="px-3 py-1.5 rounded-lg text-xs font-medium inline-block"
                    :class="typeBadgeClass(tx.type)"
                  >
                    {{ t('subscription.type' + tx.typeLabel) }}
                  </span>
                </td>
                <td class="px-4 sm:px-6 py-4 sm:py-5 text-sm text-gray-700">{{ tx.description }}</td>
                <td class="px-4 sm:px-6 py-4 sm:py-5 text-sm font-medium" :class="tx.amount >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ tx.amount >= 0 ? '+' : '' }}{{ formatAmount(tx.amount) }} {{ t('orders.currency') }}
                </td>
                <td class="px-4 sm:px-6 py-4 sm:py-5 text-sm text-gray-600">{{ tx.date }}</td>
                <td class="px-4 sm:px-6 py-4 sm:py-5">
                  <span
                    class="px-3 py-1.5 rounded-lg text-xs font-medium inline-block"
                    :class="statusBadgeClass(tx.status)"
                  >
                    {{ t('subscription.status' + tx.statusLabel) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Tab: Commission system -->
    <div v-show="activeTab === 'commission'" class="space-y-6">
      <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div class="rounded-xl bg-amber-50 border border-amber-100 p-5 mb-6">
          <h3 class="text-base font-semibold text-gray-900 mb-2">{{ t('subscription.currentCommissionRate') }}</h3>
          <div class="flex items-center gap-2 mb-2">
            <span class="text-3xl font-bold text-amber-600">15%</span>
            <span class="w-10 h-10 rounded-lg bg-amber-200 flex items-center justify-center text-amber-700 font-bold">%</span>
          </div>
          <p class="text-sm text-gray-600">{{ t('subscription.currentRateDescription') }}</p>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
         
          <div class="bg-[#fffff] rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 class="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-blue-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
              </svg>
              {{ t('subscription.commissionExamples') }}
            </h3>
            <ul class="space-y-2 text-sm">
              <li class="flex justify-between items-center gap-2">
                <span class="text-gray-600">حجز بقيمة 5,000 {{ t('orders.currency') }}</span>
                <span class="font-medium text-orange-600">750 {{ t('orders.currency') }}</span>
              </li>
              <li class="flex justify-between items-center gap-2">
                <span class="text-gray-600">حجز بقيمة 10,000 {{ t('orders.currency') }}</span>
                <span class="font-medium text-orange-600">1,500 {{ t('orders.currency') }}</span>
              </li>
              <li class="flex justify-between items-center gap-2">
                <span class="text-gray-600">حجز بقيمة 15,000 {{ t('orders.currency') }}</span>
                <span class="font-medium text-orange-600">2,250 {{ t('orders.currency') }}</span>
              </li>
              <li class="flex justify-between items-center gap-2">
                <span class="text-gray-600">حجز بقيمة 20,000 {{ t('orders.currency') }}</span>
                <span class="font-medium text-orange-600">3,000 {{ t('orders.currency') }}</span>
              </li>
            </ul>
          </div>
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 class="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-green-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
              </svg>
              {{ t('subscription.commissionSummary') }}
            </h3>
            <dl class="space-y-3 text-sm">
              <div class="flex justify-between items-center gap-2">
                <dt class="text-gray-600">{{ t('subscription.totalBookings') }}</dt>
                <dd class="font-medium text-gray-900">156,800 {{ t('orders.currency') }}</dd>
              </div>
              <div class="flex justify-between items-center gap-2">
                <dt class="text-gray-600">{{ t('subscription.totalCommissions') }}</dt>
                <dd class="font-medium text-gray-900">23,520 {{ t('orders.currency') }}</dd>
              </div>
              <div class="flex justify-between items-center gap-2">
                <dt class="text-gray-600">{{ t('subscription.netProfits') }}</dt>
                <dd class="font-semibold text-green-600">133,280 {{ t('orders.currency') }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div class="rounded-xl bg-orange-50 border border-orange-100 p-5">
          <h3 class="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-orange-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
            </svg>
            {{ t('subscription.importantCommissionInfo') }}
          </h3>
          <ul class="list-disc list-inside space-y-1.5 text-sm text-gray-700">
            <li>{{ t('subscription.importantBullet1') }}</li>
            <li>{{ t('subscription.importantBullet2') }}</li>
            <li>{{ t('subscription.importantBullet3') }}</li>
            <li>{{ t('subscription.importantBullet4') }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Tab: Monthly statistics -->
    <div v-show="activeTab === 'statistics'" class="space-y-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <label class="text-sm font-medium text-gray-700">{{ $t('stats.periodAnnually') }}</label>
        <select
          v-model="selectedYear"
          class="px-4 py-2.5 rounded-xl bg-white border border-gray-200 shadow-sm text-sm font-medium text-gray-900 focus:ring-2 focus:ring-gray-900 outline-none"
        >
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-gradient-to-r from-[#22C55E] to-[#16A34A] rounded-xl border border-green-100 p-5 flex flex-col gap-2">
          <div class="w-8 h-8 rounded-lg bg-[#FFFFFF33] flex items-center justify-center text-green-700 shrink-0 p-2">
           <img src="~/assets/icons/arrow.svg" alt="Profit" class="w-full h-full object-contain">
          </div>
          <p class="text-sm font-medium text-[#FFFFFF]">{{ t('subscription.avgMonthlyProfits') }}</p>
          <p class="text-xl font-bold text-[#FFFFFF]">21,966.667 {{ t('orders.currency') }}</p>
        </div>
      
        <div class="bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-xl border border-orange-100 p-5 flex flex-col gap-2 ">
            <div class="w-8 h-8 rounded-lg bg-[#FFFFFF33] flex items-center justify-center text-orange-700 shrink-0 p-2">
<img src="~/assets/icons/white-percent.svg" alt="Percent" class="w-8 h-8 shrink-0">  
</div>
        <p class="text-sm font-medium text-[#FFFFFF]">{{ t('subscription.avgMonthlyCommissions') }}</p>
          <p class="text-xl font-bold text-[#FFFFFF]">3,295 {{ t('orders.currency') }}</p>
        </div>
        
        <div class="bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-xl border border-blue-100 p-5 flex flex-col gap-2">
          <div class="w-10 h-10 rounded-lg bg-[#FFFFFF33] flex items-center justify-center text-blue-700 shrink-0 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          </div>
          <p class="text-sm font-medium text-[#FFFFFF]">{{ t('subscription.monthlyNetProfits') }}</p>
          <p class="text-xl font-bold text-[#FFFFFF]">18,671.667 {{ t('orders.currency') }}</p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <h3 class="text-base font-semibold text-gray-900 p-5 pb-0">{{ t('subscription.monthlyDetailsTitle') }}</h3>
        <div class="overflow-x-auto p-5">
          <table class="w-full min-w-[600px] text-center border-collapse">
            <thead>
              <tr class="bg-gray-50/50 border-b border-gray-100">
                <th class="px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-gray-600">{{ t('subscription.month') }}</th>
                <th class="px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-gray-600">{{ t('subscription.totalProfits') }}</th>
                <th class="px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-gray-600">{{ t('subscription.commissionsPaid') }}</th>
                <th class="px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-gray-600">{{ t('subscription.netProfit') }}</th>
                <th class="px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-gray-600">{{ t('subscription.commissionRateCol') }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr
                v-for="row in monthlyStats"
                :key="row.monthKey"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-4 sm:px-6 py-4 text-sm font-medium text-gray-900">{{ t(row.monthKey) }}</td>
                <td class="px-4 sm:px-6 py-4 text-sm font-medium text-green-600">{{ row.totalProfits.toLocaleString() }} {{ t('orders.currency') }}</td>
                <td class="px-4 sm:px-6 py-4 text-sm font-medium text-orange-600">{{ row.commissionsPaid.toLocaleString() }} {{ t('orders.currency') }}</td>
                <td class="px-4 sm:px-6 py-4 text-sm font-medium text-blue-600">{{ row.netProfit.toLocaleString() }} {{ t('orders.currency') }}</td>
                <td class="px-4 sm:px-6 py-4 text-sm text-gray-700">15%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-[#EFF6FF] rounded-xl border border-blue-100 p-5 flex flex-col gap-2">
          <div class="w-10 h-10 rounded-lg bg-[#3B82F6] flex items-center justify-center text-blue-700 shrink-0">
            <img src="~/assets/icons/target-icon.svg" alt="calendar-icon" class="w-6 h-6 object-contain">
          </div>
          <p class="text-sm font-medium text-gray-700">{{ t('subscription.totalFirstHalf') }}</p>
          <p class="text-2xl font-bold text-gray-900">131,800 {{ t('orders.currency') }}</p>
          <p class="text-xs text-gray-600">{{ t('subscription.netProfitLabel') }}: 112,030 {{ t('orders.currency') }}</p>
        </div>
        <div class="bg-[#BBF7D0] rounded-xl border border-green-100 p-5 flex flex-col gap-2">
          <div class="w-10 h-10 rounded-lg bg-[#22C55E] flex items-center justify-center text-green-700 shrink-0 p-1">
            <img src="~/assets/icons/cup-icon.svg" alt="cup-icon" class="w-6 h-6 object-contain">
          </div>
          <p class="text-sm font-medium text-gray-700">{{ t('subscription.bestMonth') }}</p>
          <p class="text-2xl font-bold text-gray-900">{{ t('stats.monthApr') }}</p>
          <p class="text-xs text-gray-600">{{ t('subscription.withProfits') }} 25,600 {{ t('orders.currency') }}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
definePageMeta({
  title: 'subscription.title',
})

const { t } = useI18n()

const activeTab = ref('overview')

const tabs = [
  { id: 'overview', labelKey: 'subscription.tabOverview' },
  { id: 'movements', labelKey: 'subscription.tabFinancialMovements' },
  { id: 'commission', labelKey: 'subscription.tabCommissionSystem' },
  { id: 'statistics', labelKey: 'subscription.tabMonthlyStatistics' },
]

const summaryCards = [
  { id: 'type', titleKey: 'subscription.subscriptionType', valueKey: 'annualSubscription', icon: 'crown' },
  { id: 'commissions', titleKey: 'subscription.totalCommissions', value: '23,520', icon: 'percent' },
  { id: 'profits', titleKey: 'subscription.totalProfits', value: '156,800', icon: 'currency' },
  { id: 'balance', titleKey: 'subscription.currentBalance', value: '45,600', icon: 'wallet' },
]

const transactions = [
  { id: 'TRX001', type: 'add', typeLabel: 'Add', description: 'حجز رحلة عمرة - الطلب #156-2024-ORD', amount: 3500, date: '2024-01-15', status: 'completed', statusLabel: 'Completed' },
  { id: 'TRX002', type: 'deduction', typeLabel: 'Deduction', description: 'عمولة المنصة (15%)', amount: -525, date: '2024-01-15', status: 'completed', statusLabel: 'Completed' },
  { id: 'TRX003', type: 'add', typeLabel: 'Add', description: 'حجز رحلة - الطلب #157-2024-ORD', amount: 4200, date: '2024-01-16', status: 'completed', statusLabel: 'Completed' },
  { id: 'TRX004', type: 'deduction', typeLabel: 'Deduction', description: 'عمولة المنصة (15%)', amount: -630, date: '2024-01-16', status: 'completed', statusLabel: 'Completed' },
  { id: 'TRX005', type: 'refund', typeLabel: 'Refund', description: 'استرداد مبلغ - الطلب #145-2024-ORD', amount: -2800, date: '2024-01-17', status: 'completed', statusLabel: 'Completed' },
  { id: 'TRX006', type: 'add', typeLabel: 'Add', description: 'حجز رحلة عمرة VIP - الطلب #159-2024-ORD', amount: 6800, date: '2024-01-19', status: 'processing', statusLabel: 'Processing' },
]

const monthlyStats = [
  { monthKey: 'stats.monthJan', totalProfits: 18500, commissionsPaid: 2775, netProfit: 15725 },
  { monthKey: 'stats.monthFeb', totalProfits: 22100, commissionsPaid: 3315, netProfit: 18785 },
  { monthKey: 'stats.monthMar', totalProfits: 19800, commissionsPaid: 2970, netProfit: 16830 },
  { monthKey: 'stats.monthApr', totalProfits: 25600, commissionsPaid: 3840, netProfit: 21760 },
  { monthKey: 'stats.monthMay', totalProfits: 23400, commissionsPaid: 3510, netProfit: 19890 },
  { monthKey: 'stats.monthJun', totalProfits: 22400, commissionsPaid: 3360, netProfit: 19040 },
]

const selectedYear = ref('2024')

function typeBadgeClass (type) {
  const map = {
    add: 'bg-green-100 text-green-700',
    deduction: 'bg-red-100 text-red-700',
    refund: 'bg-orange-100 text-orange-700',
  }
  return map[type] ?? 'bg-gray-100 text-gray-700'
}

function statusBadgeClass (status) {
  const map = {
    completed: 'bg-green-100 text-green-700',
    processing: 'bg-amber-100 text-amber-700',
  }
  return map[status] ?? 'bg-gray-100 text-gray-700'
}

function formatAmount (n) {
  return Math.abs(n).toLocaleString()
}

function exportReport () {
  if (typeof window !== 'undefined' && window.print) window.print()
}
</script>

<template>
  <div class="w-full px-3 sm:px-4 lg:px-0">
    <!-- Header -->
    <div class="mb-6 lg:mb-8">
      <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{{ t('stats.title') }}</h1>
      <p class="text-xs lg:text-base text-gray-500">{{ t('stats.subtitle') }}</p>
    </div>

    <!-- Period selector -->
    <div
      class="flex items-center max-w-sm bg-white p-1 rounded-xl shadow-sm border border-gray-100 overflow-x-auto no-scrollbar whitespace-nowrap mb-6"
    >
      <button
        v-for="period in periodOptions"
        :key="period.id"
        @click="activePeriod = period.id"
        class="px-4 lg:px-6 py-2 rounded-lg text-xs sm:text-sm lg:text-sm font-medium transition-all"
        :class="activePeriod === period.id ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'"
      >
        {{ t(period.labelKey) }}
      </button>
    </div>

    <!-- Stats cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <div
        v-for="card in statCards"
        :key="card.titleKey"
        class="bg-white rounded-xl border border-accent/40 shadow-sm p-5 flex flex-col gap-3"
      >
        <!-- Icon -->
        <div
          class="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent"
          aria-hidden="true"
        >
          <!-- Document / list icon (bookings) -->
          <svg
            v-if="card.icon === 'bookings'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
          <!-- Users icon (customers) -->
          <svg
            v-else-if="card.icon === 'customers'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
            />
          </svg>
          <!-- Currency / dollar icon (revenue) -->
          <svg
            v-else-if="card.icon === 'revenue'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <!-- Star icon (rating) -->
          <svg
            v-else-if="card.icon === 'rating'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </div>

        <!-- Title -->
        <p class="text-sm font-medium text-gray-600">{{ t(card.titleKey) }}</p>

        <!-- Value -->
        <p class="text-xl lg:text-2xl font-bold text-gray-900">
          {{ card.displayValue }}
        </p>

        <!-- Trend -->
        <p class="flex items-center gap-1 text-xs text-gray-500">
          <span class="shrink-0 inline-block" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-emerald-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
          </span>
          {{ card.trendText }}
        </p>
      </div>
    </div>

    <!-- Chart cards 2x2 -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
     

      <!-- 2. Bookings and Revenue Growth (Line) -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col min-h-[320px]">
        <div class="flex flex-row justify-between items-center gap-2 mb-4">
          <h2 class="text-base font-semibold text-gray-900 text-end">{{ t('stats.bookingsAndRevenueGrowth') }}</h2>
          <button
            type="button"
            class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 border border-gray-200 transition-colors shrink-0"
            @click="onDownloadReport"
          >
            <span class="w-5 h-5 shrink-0 text-accent" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </span>
            {{ t('stats.downloadReport') }}
          </button>
        </div>
        <div class="flex-1 min-h-[260px]">
          <ClientOnly>
            <Chart type="line" :data="lineChartData" :options="lineChartOptions" class="w-full h-full " />
            <template #fallback>
              <div class="h-full flex items-center justify-center text-gray-400 text-sm">—</div>
            </template>
          </ClientOnly>
        </div>
      </div>
       <!-- 1. Distribution by Destination (Pie) -->
       <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col min-h-[320px]">
        <div class="flex flex-row-reverse justify-between items-center gap-2 mb-8">
          <h2 class="text-xl font-bold text-gray-800">{{ t('stats.distributionByDestination') }}</h2>
          <button
            type="button"
            class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm transition-colors shrink-0"
            @click="onExportExcel"
          >
            <span class="w-4 h-4 shrink-0" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </span>
            {{ t('stats.exportExcel') }}
          </button>
        </div>
        <div class="flex-1 min-h-[300px] flex items-center justify-center relative">
          <ClientOnly>
            <div class="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
              <Chart type="pie" :data="pieChartData" :options="pieChartOptions" class="w-full h-full" />
              
              <!-- Custom Labels to match screenshot exactly -->
              <div class="absolute inset-0 pointer-events-none text-[10px] sm:text-xs font-bold whitespace-nowrap">
                <!-- Makkah 33% (Top-rightish) -->
                <div
                  class="absolute top-[8%] left-[80%]"
                  :style="{ color: getDestinationColor('stats.destMakkah') }"
                >
                  {{ t('stats.destMakkah') }} 33%
                </div>
                <!-- Madinah 22% (Mid-left) -->
                <div
                  class="absolute top-[95%] left-[75%]"
                  :style="{ color: getDestinationColor('stats.destMadinah') }"
                >
                  {{ t('stats.destMadinah') }} 22%
                </div>
                <!-- Jeddah 15% (Bottom-left) -->
                <div
                  class="absolute bottom-[20%] left-[-5%]"
                  :style="{ color: getDestinationColor('stats.destJeddah') }"
                >
                  {{ t('stats.destJeddah') }} 15%
                </div>
                <!-- Riyadh 12% (Bottom-centerish) -->
                <div
                  class="absolute bottom-[50%] left-[-2%] transform -translate-x-1/2"
                  :style="{ color: getDestinationColor('stats.destRiyadh') }"
                >
                  {{ t('stats.destRiyadh') }} 12%
                </div>
                <!-- Abha 9% (Bottom-rightish) -->
                <div
                  class="absolute bottom-[80%] right-[85%]"
                  :style="{ color: getDestinationColor('stats.destAbha') }"
                >
                  {{ t('stats.destAbha') }} 9%
                </div>
                <!-- Taif 9% (Mid-right) -->
                <div
                  class="absolute top-[4%] right-[55%]"
                  :style="{ color: getDestinationColor('stats.destTaif') }"
                >
                  {{ t('stats.destTaif') }} 9%
                </div>
              </div>
            </div>
            <template #fallback>
              <div class="text-gray-400 text-sm">—</div>
            </template>
          </ClientOnly>
        </div>
      </div>

     

      <!-- 4. Distribution by Service Type (Horizontal bars) -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col min-h-[320px]">
        <div class="flex flex-row justify-between items-center gap-2 mb-4">
          <h2 class="text-base font-semibold text-gray-900 text-end">{{ t('stats.distributionByServiceType') }}</h2>
        </div>
        <div class="flex-1 min-h-[260px]">
          <ClientOnly>
            <Chart type="bar" :data="serviceTypeChartData" :options="serviceTypeChartOptions" class="w-full h-full rounded-lg" />
            <template #fallback>
              <div class="h-full flex items-center justify-center text-gray-400 text-sm">—</div>
            </template>
          </ClientOnly>
        </div>
      </div>
       <!-- 3. Order Status (Horizontal bars) -->
       <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col min-h-[320px]">
        <div class="flex flex-row justify-between items-center gap-2 mb-4">
          <h2 class="text-base font-semibold text-gray-900 text-end">{{ t('stats.orderStatus') }}</h2>
        </div>
        <div class="flex-1 min-h-[260px] flex flex-col justify-center gap-4">
          <div
            v-for="row in orderStatusProgressRows"
            :key="row.labelKey"
            class="flex items-center gap-3"
          >
            <!-- Value on the left -->
            <div class="w-10 text-xs sm:text-sm text-gray-700">
              {{ row.value }}
            </div>

            <!-- Progress bar track + fill -->
            <div class="flex-1">
              <div class="w-full h-2.5 sm:h-3 rounded-full bg-gray-200 overflow-hidden">
                <div
                  class="h-full rounded-full"
                  :style="{ width: `${row.percent}%`, backgroundColor: row.color }"
                />
              </div>
            </div>

            <!-- Status label on the right -->
            <div
              class="w-24 text-xs sm:text-sm text-right font-medium"
              :style="{ color: row.color }"
            >
              {{ t(row.labelKey) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Most Requested Offers table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mt-8">
      <h2 class="text-base font-semibold text-gray-900 text-start mb-4">{{ t('stats.mostRequestedOffers') }}</h2>
      <div class="overflow-x-auto">
          <table class="w-full min-w-[600px] text-center border-collapse">
          <thead>
            <tr class="bg-gray-50/50 border-b border-gray-100">
              <th class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600 text-center">{{ t('stats.offerName') }}</th>
              <th class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600 text-center">{{ t('stats.numberOfBookings') }}</th>
              <th class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600 text-center">{{ t('stats.revenue') }}</th>
              <th class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600 text-center">{{ t('stats.marketShare') }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr
              v-for="row in mostRequestedOffers"
              :key="row.rank"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-4 sm:px-6 py-4 sm:py-5 text-center">
                <div class="flex items-center justify-center gap-2">
                  <span
                    class="w-7 h-7 rounded-full bg-orange-400 text-white flex items-center justify-center text-sm font-bold shrink-0"
                    aria-hidden="true"
                  >
                    {{ row.rank }}
                  </span>
                  <span class="text-sm font-medium text-gray-900">{{ t(row.nameKey) }}</span>
                </div>
              </td>
              <td class="px-4 sm:px-6 py-4 sm:py-5 text-sm text-gray-700 text-center">{{ row.bookings }}</td>
              <td class="px-4 sm:px-6 py-4 sm:py-5 text-sm text-gray-700 text-center">
                {{ row.revenue.toLocaleString() }} {{ t('stats.currency') }}
              </td>
              <td class="px-4 sm:px-6 py-4 sm:py-5 text-center">
                <div class="flex flex-col items-center gap-1.5">
                  <span class="text-sm text-gray-700">{{ row.marketShare }}%</span>
                  <div class="w-full bg-gray-200 rounded-full h-2 min-w-[80px]">
                    <div
                      class="bg-blue-500 rounded-full h-2 transition-all"
                      :style="{ width: `${row.marketShare}%` }"
                    />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Summary cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
       <!-- Growth Rate -->
       <div class="bg-white rounded-xl shadow-sm border border-gray-100 border-s-4 border-s-green-500 p-5 flex flex-col gap-3">
        <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0 text-green-600" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
          </svg>
        </div>
        <p class="text-sm font-medium text-gray-600">{{ t('stats.growthRate') }}</p>
        <p class="text-xl font-bold text-green-600">{{ t('stats.growthRateValue') }}</p>
        <p class="text-xs text-gray-500">{{ t('stats.growthRateSubtitle') }}</p>
      </div>
     

      <!-- Customer Satisfaction Rate -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 border-s-4 border-s-accent p-5 flex flex-col gap-3">
        <div class="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 text-accent relative" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3 absolute -top-0.5 -end-0.5">
            <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
        </div>
        <p class="text-sm font-medium text-gray-600">{{ t('stats.satisfactionRate') }}</p>
        <p class="text-xl font-bold text-gray-900">{{ t('stats.satisfactionValue') }}</p>
        <p class="text-xs text-gray-500">{{ t('stats.satisfactionSubtitle') }}</p>
      </div>

     
       <!-- Monthly Goal -->
       <div class="bg-white rounded-xl shadow-sm border border-gray-100 border-s-4 border-s-blue-500 p-5 flex flex-col gap-3">
        <div class="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 text-accent" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
        </div>
        <p class="text-sm font-medium text-gray-600">{{ t('stats.monthlyGoal') }}</p>
        <p class="text-xl font-bold text-gray-900">{{ t('stats.monthlyGoalValue') }}</p>
        <div class="flex flex-col gap-1.5 mt-1">
          <span class="text-xs text-gray-500">{{ t('stats.monthlyGoalProgress') }}</span>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-blue-500 rounded-full h-2" style="width: 83.8%" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Chart from 'primevue/chart'

definePageMeta({ title: 'stats.title' })

const { t, locale } = useI18n()

const activePeriod = ref('monthly')

const periodOptions = [
  { id: 'daily', labelKey: 'stats.periodDaily' },
  { id: 'weekly', labelKey: 'stats.periodWeekly' },
  { id: 'monthly', labelKey: 'stats.periodMonthly' },
  { id: 'annually', labelKey: 'stats.periodAnnually' },
]

const mostRequestedOffers = [
  { rank: 1, nameKey: 'stats.offerUmrah7Vip', bookings: 89, revenue: 756500, marketShare: 21.2 },
  { rank: 2, nameKey: 'stats.offerHajjFamily', bookings: 67, revenue: 1675000, marketShare: 16.0 },
  { rank: 3, nameKey: 'stats.offerUmrahEconomic5', bookings: 124, revenue: 520800, marketShare: 29.6 },
  { rank: 4, nameKey: 'stats.offerTouristicJeddah', bookings: 56, revenue: 168000, marketShare: 13.4 },
  { rank: 5, nameKey: 'stats.offerTaifMountain', bookings: 43, revenue: 129000, marketShare: 10.3 },
]

const statCards = computed(() => {
  void locale.value
  return [
  {
    icon: 'bookings',
    titleKey: 'stats.totalBookings',
    value: 419,
    displayValue: '419',
    trendText: t('stats.trendFromLastMonth', { percent: 12 }),
  },
  {
    icon: 'customers',
    titleKey: 'stats.totalCustomers',
    value: 355,
    displayValue: '355',
    trendText: t('stats.trendFromLastMonth', { percent: 8 }),
  },
  {
    icon: 'revenue',
    titleKey: 'stats.totalRevenue',
    value: 3249300,
    displayValue: `${(3249300).toLocaleString()} ${t('stats.currency')}`,
    trendText: t('stats.trendFromLastMonth', { percent: 15 }),
  },
  {
    icon: 'rating',
    titleKey: 'stats.averageRating',
    value: 4.8,
    displayValue: '4.8',
    trendText: t('stats.outOf5Stars'),
  },
]
})

// Chart 1: Distribution by Destination (pie)
const DESTINATION_DATA = [
  { labelKey: 'stats.destMakkah', value: 33, color: '#3B82F6' },
  { labelKey: 'stats.destMadinah', value: 22, color: '#10B981' },
  { labelKey: 'stats.destJeddah', value: 15, color: '#F59E0B' },
  { labelKey: 'stats.destRiyadh', value: 12, color: '#EF4444' },
  { labelKey: 'stats.destAbha', value: 9, color: '#8B5CF6' },
  { labelKey: 'stats.destTaif', value: 9, color: '#EC4899' },
]

function getDestinationColor(labelKey) {
  const entry = DESTINATION_DATA.find((d) => d.labelKey === labelKey)
  return entry?.color ?? '#111827'
}

function getDestinationColorByIndex(index) {
  const entry = DESTINATION_DATA[index]
  return entry?.color ?? '#111827'
}

const pieChartData = computed(() => {
  void locale.value
  return {
    labels: DESTINATION_DATA.map((d) => t(d.labelKey)),
    datasets: [
      {
        data: DESTINATION_DATA.map((d) => d.value),
        backgroundColor: DESTINATION_DATA.map((d) => d.color),
        borderWidth: 0,
      },
    ],
  }
})

const pieChartOptions = computed(() => {
  void locale.value
  return {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 30
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        titleColor: '#111827',
        bodyColor: '#111827',
        callbacks: {
          labelColor(context) {
            const color = getDestinationColorByIndex(context.dataIndex)
            return {
              borderColor: color,
              backgroundColor: color,
            }
          },
          labelTextColor(context) {
            return getDestinationColorByIndex(context.dataIndex)
          },
        },
      },
      // Since we don't have the datalabels plugin installed, 
      // we'll rely on the default Chart.js or a simple approach.
      // For a "perfect" match, labels would be rendered as SVGs or HTML overlays.
    },
  }
})

// Chart 2: Bookings and Revenue Growth (line)
const LINE_MONTH_KEYS = ['stats.monthJan', 'stats.monthFeb', 'stats.monthMar', 'stats.monthApr', 'stats.monthMay', 'stats.monthJun']
const REVENUE_VALUES = [120000, 160000, 200000, 260000, 300000, 360000]
const BOOKINGS_VALUES = [80000, 110000, 140000, 180000, 220000, 270000]

// const lineChartData = computed(() => {
//   void locale.value
//   return {
//     labels: LINE_MONTH_KEYS.map((key) => t(key)),
//     datasets: [
//       {
//         label: t('stats.revenue'),
//         data: REVENUE_VALUES,
//         borderColor: '#22C55E',
//         backgroundColor: 'rgba(34, 197, 94, 0.15)',
//         fill: true,
//         tension: 0.3,
//       },
//       {
//         label: t('stats.bookings'),
//         data: BOOKINGS_VALUES,
//         borderColor: '#3B82F6',
//         backgroundColor: 'transparent',
//         fill: false,
//         tension: 0.3,
//       },
//     ],
//   }
// })
const lineChartData = computed(() => {
  void locale.value
  return {
    labels: LINE_MONTH_KEYS.map((key) => t(key)),
    datasets: [
      {
        label: t('stats.revenue'),
        data: REVENUE_VALUES,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16,185,129,0.15)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0,
      },
      {
        label: t('stats.bookings'),
        data: BOOKINGS_VALUES,
        borderColor: '#3B82F6',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  }
})
const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 20,
      },
    },
    tooltip: {
      backgroundColor: '#111827',
      titleColor: '#fff',
      bodyColor: '#e5e7eb',
      padding: 12,
      borderWidth: 0,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#6B7280',
      },
    },
    y: {
      grid: {
        color: 'rgba(0,0,0,0.05)',
      },
      ticks: {
        color: '#6B7280',
        callback(value) {
          return Number(value).toLocaleString()
        },
      },
    },
  },
}

// const lineChartOptions = computed(() => {
//   void locale.value
//   return {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: {
//         grid: { display: false },
//       },
//       y: {
//         min: 0,
//         max: 380000,
//         ticks: {
//           stepSize: 95000,
//           callback(value) {
//             return Number(value).toLocaleString()
//           },
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         position: 'bottom',
//       },
//     },
//   }
// })

// Chart 3: Order Status (horizontal bar)
const ORDER_STATUS_DATA = [
  { labelKey: 'stats.statusCompleted', value: 284, color: '#22C55E' },
  { labelKey: 'stats.statusUnderReview', value: 45, color: '#F97316' },
  { labelKey: 'stats.statusConfirmed', value: 78, color: '#3B82F6' },
  { labelKey: 'stats.statusRejected', value: 12, color: '#EF4444' },
]

const orderStatusProgressRows = computed(() => {
  const maxValue = Math.max(...ORDER_STATUS_DATA.map((d) => d.value)) || 1
  return ORDER_STATUS_DATA.map((d) => ({
    ...d,
    percent: (d.value / maxValue) * 100,
  }))
})

// Chart 4: Distribution by Service Type (horizontal bar)
const SERVICE_TYPE_DATA = [
  { labelKey: 'stats.serviceHotelBookings', value: 190 },
  { labelKey: 'stats.serviceTransport', value: 135 },
  { labelKey: 'stats.serviceUmrah', value: 105 },
  { labelKey: 'stats.serviceHajj', value: 80 },
  { labelKey: 'stats.serviceRecreational', value: 60 },
]
const SERVICE_BAR_COLOR = '#3B82F6'

const serviceTypeChartData = computed(() => {
  void locale.value
  return {
    labels: SERVICE_TYPE_DATA.map((d) => t(d.labelKey)),
    datasets: [
      {
        label: t('stats.distributionByServiceType'),
        data: SERVICE_TYPE_DATA.map((d) => d.value),
        backgroundColor: SERVICE_BAR_COLOR,
        borderWidth: 0,
      },
    ],
  }
})

const serviceTypeChartOptions = computed(() => {
  void locale.value
  return {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      x: {
        min: 0,
        max: 200,
        ticks: {
          stepSize: 50,
        },
        grid: { display: true },
      },
      y: {
        grid: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
    },
  }
})

function onExportExcel() {
  // Placeholder: real export can be implemented later
}

function onDownloadReport() {
  // Placeholder: real download can be implemented later
}
</script>

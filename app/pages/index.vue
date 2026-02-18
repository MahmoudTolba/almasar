<template>
  <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-0">
    <!-- Header Section -->
    <div class="mb-6 lg:mb-8">
      <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">إدارة الطلبات</h1>
      <p class="text-xs lg:text-base text-gray-500">يمكنك متابعة طلبات العملاء بعد دفع المبلغ المبدئي</p>
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
          {{ tab.label }}
        </button>
      </div>
      <div class="relative flex-1 max-w-md w-full mt-3 xl:mt-0">
        <input
          type="text"
          placeholder="البحث برقم الطلب، اسم العميل..."
          class="w-full pr-10 pl-4 py-3 rounded-xl bg-white border border-gray-100 shadow-sm focus:ring-2 focus:ring-gray-900 outline-none transition-all placeholder:text-gray-400 text-sm lg:text-base"
        />
        <div class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
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
        <table class="w-full min-w-[800px] text-right border-collapse">
          <thead>
            <tr class="bg-gray-50/50 border-b border-gray-100">
              <th class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600">رقم الطلب</th>
              <th class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600">العميل</th>
              <th class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600">نوع الخدمة</th>
              <th class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600">عدد الأفراد</th>
              <th class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600">المبلغ</th>
              <th class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600">التاريخ</th>
              <th class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600">الحالة</th>
              <th class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600 text-center">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50 transition-colors">
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
                {{ order.peopleCount }} أفراد
              </td>
              <td class="px-4 sm:px-6 py-4 sm:py-5">
                <div class="flex flex-col">
                  <span class="text-xs sm:text-sm font-bold text-gray-900">{{ order.amount.toLocaleString() }}</span>
                  <span class="text-[10px] text-gray-400">ر.س</span>
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
                <button
                  class="px-3 sm:px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-50 transition-all"
                >
                  تفاصيل الطلب
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const activeTab = ref('new')

const tabs = [
  { id: 'new', label: 'جديدة' },
  { id: 'confirmed', label: 'مؤكدة' },
  { id: 'completed', label: 'مكتملة' },
  { id: 'cancelled', label: 'ملغاة' },
]

const statusStyles = {
  pending_payment: 'bg-orange-50 text-orange-500',
  confirmed: 'bg-blue-50 text-blue-500',
  completed: 'bg-green-50 text-green-500 underline',
  rejected: 'bg-red-50 text-red-500',
  cancelled: 'bg-gray-50 text-gray-400',
}

const orders = [
  {
    id: 'ORD-2024-001',
    clientName: 'أحمد محمد العتيبي',
    clientPhone: '0501234567',
    serviceType: 'عمرة - باقة VIP',
    peopleCount: 2,
    amount: 8500,
    date: '2024-01-15',
    time: '10:30',
    status: 'pending_payment',
    statusLabel: 'مدفوع مبدئيا',
  },
  {
    id: 'ORD-2024-002',
    clientName: 'فاطمة عبدالله السالم',
    clientPhone: '0559876543',
    serviceType: 'حج - باقة عائلية',
    peopleCount: 4,
    amount: 25000,
    date: '2024-01-14',
    time: '14:20',
    status: 'confirmed',
    statusLabel: 'مؤكدة',
  },
  {
    id: 'ORD-2024-003',
    clientName: 'خالد سعد الغامدي',
    clientPhone: '0543216789',
    serviceType: 'عمرة - باقة اقتصادية',
    peopleCount: 1,
    amount: 4200,
    date: '2024-01-13',
    time: '09:15',
    status: 'completed',
    statusLabel: 'مكتملة',
  },
  {
    id: 'ORD-2024-004',
    clientName: 'نورة حسن القحطاني',
    clientPhone: '0567891234',
    serviceType: 'عمرة - باقة مميزة',
    peopleCount: 2,
    amount: 6800,
    date: '2024-01-12',
    time: '16:45',
    status: 'rejected',
    statusLabel: 'مرفوضة',
  },
  {
    id: 'ORD-2024-005',
    clientName: 'عبدالرحمن علي الشهري',
    clientPhone: '0512345678',
    serviceType: 'حج - باقة فاخرة',
    peopleCount: 3,
    amount: 18500,
    date: '2024-01-11',
    time: '11:30',
    status: 'cancelled',
    statusLabel: 'ملغاة',
  },
]
</script>

<template>
  <div class="w-full px-3 sm:px-4 lg:px-0">
    <!-- Header -->
    <div class="mb-6 lg:mb-8">
      <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
        {{ t('reviews.title') }}
      </h1>
      <p class="text-xs lg:text-base text-gray-500">
        {{ t('reviews.subtitle') }}
      </p>
    </div>

    <!-- Stats cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <div
        v-for="card in reviewCards"
        :key="card.id"
        class="bg-white rounded-xl border border-amber-200 shadow-sm p-5 flex flex-col items-start gap-3"
      >
        <!-- Icon -->
        <div
          class="w-12 h-12 rounded-lg bg-[#0000000D] flex items-center justify-center shrink-0 text-amber-600"
          aria-hidden="true"
        >
          <img
            v-if="card.icon === 'warning'"
            src="~/assets/icons/alert-rate.svg"
            alt="Warning"
            class="w-6 h-6 object-contain"
          >
          <img
            v-else-if="card.icon === 'thumbs-up'"
            src="~/assets/icons/like-rate.svg"
            alt="Thumbs Up"
            class="w-6 h-6 object-contain"
          >
          <img
            v-else-if="card.icon === 'chat'"
            src="~/assets/icons/comment-rate.svg"
            alt="Chat Bubble"
            class="w-6 h-6 object-contain"
          >
          <img
            v-else-if="card.icon === 'star'"
            src="~/assets/icons/star-rate.svg"
            alt="Star"
            class="w-6 h-6 object-contain"
          >
        </div>

        <!-- Title -->
        <p class="text-sm font-medium text-gray-600 text-center">
          {{ t(card.titleKey) }}
        </p>

        <!-- Value -->
        <p class="text-xl lg:text-2xl font-bold text-gray-900">
          {{ card.value }}
        </p>

        <!-- Subtitle -->
        <p class="text-xs text-gray-500 text-center">
          {{ t(card.subtitleKey) }}
        </p>
      </div>
    </div>

    <!-- Quick Statistics + Distribution -->
    <div class="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
     

      <!-- Reviews Distribution -->
      <div class="bg-white rounded-xl border border-[#0000000D] shadow-sm p-5 lg:col-span-8">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">
          {{ t('reviews.distributionTitle') }}
        </h2>
        <div class="flex flex-col gap-3">
          <div
            v-for="row in distributionRows"
            :key="row.stars"
            class="flex flex-col gap-1"
          >
            <div class="flex items-center justify-between gap-2">
              <span class="text-sm text-gray-600">
                {{ row.count }} ({{ row.percent }}%)
              </span>
              <span class="text-sm font-medium text-amber-600">★ {{ row.stars }}</span>
            </div>
            <div class="h-2 rounded-full bg-gray-200 overflow-hidden">
              <div
                class="h-full rounded-full bg-amber-400 transition-all"
                :style="{ width: row.percent + '%' }"
              />
            </div>
          </div>
        </div>
      </div>
       <!-- Quick Statistics -->
       <div class="bg-white rounded-xl border border-[#0000000D] shadow-sm p-5 flex flex-col gap-4 lg:col-span-4">
        <h2 class="text-lg font-semibold text-gray-900">
          {{ t('reviews.quickStatsTitle') }}
        </h2>
        <div class="flex flex-col gap-3">
          <div
            v-for="stat in quickStats"
            :key="stat.type"
            class="rounded-xl shadow-sm p-4 flex items-center gap-3"
            :class="stat.bgClass"
          >
            
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-700">
                {{ t(stat.labelKey) }}
              </p>
              <p class="text-xl font-bold" :class="stat.valueClass">
                {{ stat.value }}
              </p>
            </div>
            <div
              class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-lg"
              :class="stat.iconBgClass"
              aria-hidden="true"
            >
              <span v-if="stat.type === 'excellent'" aria-hidden="true">&#128512;</span>
              <span v-else-if="stat.type === 'good'" aria-hidden="true">&#128528;</span>
              <span v-else aria-hidden="true">&#128577;</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- All Reviews -->
    <div class="mt-8">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">
        {{ t('reviews.allReviewsTitle') }}
      </h2>
      <div class="flex flex-col gap-4">
        <div
          v-for="review in allReviews"
          :key="review.id"
          class="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3"
        >
          <!-- Reviewer + sentiment -->
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-3">
              <div
                class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600"
                aria-hidden="true"
              >
                <svg
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
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998-0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900">{{ review.name }}</p>
                <p class="text-sm text-gray-500">{{ review.phone }}</p>
              </div>
            </div>
            <span
              class="shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium"
              :class="review.sentiment === 'positive' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
            >
              {{ review.sentiment === 'positive' ? t('reviews.sentimentPositive') : t('reviews.sentimentNegative') }}
            </span>
          </div>

          <!-- Rating: number + stars -->
          <div class="flex items-center gap-2">
            <span class="text-lg font-bold text-green-700">{{ review.rating }}</span>
            <div class="flex items-center gap-0.5" aria-hidden="true">
              <template v-for="n in 5" :key="n">
                <svg
                  v-if="n <= filledStars(review.rating)"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-5 h-5 text-amber-400"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 text-amber-400"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </template>
            </div>
          </div>

          <!-- Review text -->
          <p class="text-sm text-gray-700">
            {{ review.text }}
          </p>

          <!-- Service + date -->
          <div class="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-500">
            <span class="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 shrink-0"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                />
              </svg>
              {{ t(review.serviceKey) }}
            </span>
            <span class="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 shrink-0"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
              {{ review.date }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()

definePageMeta({
  title: 'reviews.title',
})

const reviewCards = [
{
    id: 'overall',
    titleKey: 'reviews.cardOverallRating',
    subtitleKey: 'reviews.cardOverallRatingSubtitle',
    value: '4.8',
    icon: 'star',
  },
  {
    id: 'total',
    titleKey: 'reviews.cardTotalReviews',
    subtitleKey: 'reviews.cardTotalReviewsSubtitle',
    value: '252',
    icon: 'chat',
    iconSrc: '~/assets/icons/comment-rate.svg',
  },
  {
    id: 'positive',
    titleKey: 'reviews.cardPositiveReviews',
    subtitleKey: 'reviews.cardPositiveReviewsSubtitle',
    value: '85%',
    icon: 'thumbs-up',
    iconSrc: '~/assets/icons/like-rate.svg',
  },

  {
    id: 'needs-follow-up',
    titleKey: 'reviews.cardNeedsFollowUp',
    subtitleKey: 'reviews.cardNeedsFollowUpSubtitle',
    value: '2',
    icon: 'warning',
    iconSrc: '~/assets/icons/alert-rate.svg',
  },
]

const quickStats = [
  {
    type: 'excellent',
    labelKey: 'reviews.excellentReviews',
    value: 156,
    bgClass: 'bg-green-50',
    iconBgClass: 'bg-green-100',
    valueClass: 'text-green-700',
  },
  {
    type: 'good',
    labelKey: 'reviews.goodReviews',
    value: 58,
    bgClass: 'bg-amber-50',
    iconBgClass: 'bg-amber-100',
    valueClass: 'text-amber-700',
  },
  {
    type: 'poor',
    labelKey: 'reviews.poorReviews',
    value: 20,
    bgClass: 'bg-red-50',
    iconBgClass: 'bg-red-100',
    valueClass: 'text-red-700',
  },
]

const distributionRows = [
  { stars: 5, count: 156, percent: 62 },
  { stars: 4, count: 58, percent: 23 },
  { stars: 3, count: 18, percent: 7 },
  { stars: 2, count: 12, percent: 5 },
  { stars: 1, count: 8, percent: 3 },
]

function filledStars(rating) {
  return Math.round(Number(rating))
}

const allReviews = [
  {
    id: 1,
    name: 'أحمد محمد العتيبي',
    phone: '0501234567',
    rating: 5.0,
    text: 'خدمة ممتازة جداً، الفندق كان رائع والنقل مريح. فريق العمل محترف ومتعاون، أنصح بالتعامل معهم بشدة.',
    sentiment: 'positive',
    serviceKey: 'stats.offerUmrah7Vip',
    date: '2024-01-15',
  },
  {
    id: 2,
    name: 'فاطمة حسن القرني',
    phone: '0559876543',
    rating: 4.0,
    text: 'تجربة جيدة بشكل عام، البرنامج الاقتصادي يناسب الميزانية. كان بالإمكان تحسين وجبات الإفطار.',
    sentiment: 'positive',
    serviceKey: 'stats.offerUmrahEconomic5',
    date: '2024-01-12',
  },
  {
    id: 3,
    name: 'خالد عبدالله الشهري',
    phone: '0541122334',
    rating: 5.0,
    text: 'باقة العائلة مناسبة جداً، تنظيم ممتاز من الحجز حتى العودة. شكراً لفريق المسار الذكي.',
    sentiment: 'positive',
    serviceKey: 'stats.offerHajjFamily',
    date: '2024-01-10',
  },
  {
    id: 4,
    name: 'نورة سعد الدوسري',
    phone: '0535566778',
    rating: 4.0,
    text: 'رحلة الطائف جميلة والمناظر خلابة. السائقون مهذبون والوقت كان كافياً لزيارة المعالم.',
    sentiment: 'positive',
    serviceKey: 'stats.offerTaifMountain',
    date: '2024-01-08',
  },
]
</script>

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
    <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
     

      <!-- Reviews Distribution -->
      <div class="bg-white rounded-xl border border-[#0000000D] shadow-sm p-5 ">
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
       <div class="bg-white rounded-xl border border-[#0000000D] shadow-sm p-5 flex flex-col gap-4">
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
</script>

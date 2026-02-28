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
        class="bg-white rounded-xl shadow-sm p-4 flex items-start gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
        :class="!item.read ? typeConfig[item.type].cardBorderClass : ''"
        role="button"
        tabindex="0"
        @click="markAsRead(item.id)"
        @keydown.enter.space.prevent="markAsRead(item.id)"
      >
        <!-- Icon -->
        <div
          class="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
          :class="typeConfig[item.type].iconBgClass"
          aria-hidden="true"
        >
          <img
            :src="typeConfig[item.type].iconSrc"
            :alt="t(typeConfig[item.type].labelKey)"
            class="w-5 h-5"
            :class="typeConfig[item.type].iconClass"
          />
        </div>
      

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
          <!-- Unread dot -->
          <span
          v-if="!item.read"
          class="shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-2"
          aria-hidden="true"
        />
        <span v-else class="shrink-0 w-2" aria-hidden="true" />

      
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import notificationBagIcon from '~/assets/icons/notification-bag.svg'
import notificationCurrencyIcon from '~/assets/icons/notification-cuurncy.svg'
import notificationDocumentIcon from '~/assets/icons/notification-document.svg'
import notificationXIcon from '~/assets/icons/notification-x.svg'

const { t } = useI18n()
const { notifications, unreadCount, markAsRead } = useNotifications()

const typeConfig = {
  new_order: {
    labelKey: 'notifications.typeNewOrder',
    pillClass: 'bg-blue-100 text-blue-700',
    iconBgClass: 'bg-blue-100',
    iconClass: 'text-blue-600',
    cardBorderClass: 'border-r-4 border-blue-400',
    iconSrc: notificationBagIcon,
  },
  payment_received: {
    labelKey: 'notifications.typePaymentReceived',
    pillClass: 'bg-green-100 text-green-700',
    iconBgClass: 'bg-green-100',
    iconClass: 'text-green-600',
    cardBorderClass: 'border-r-4 border-green-400',
    iconSrc: notificationCurrencyIcon,
  },
  documents_uploaded: {
    labelKey: 'notifications.typeDocumentsUploaded',
    pillClass: 'bg-purple-100 text-purple-700',
    iconBgClass: 'bg-purple-100',
    iconClass: 'text-purple-600',
    cardBorderClass: 'border-r-4 border-purple-400',
    iconSrc: notificationDocumentIcon,
  },
  cancelled: {
    labelKey: 'notifications.typeCancelled',
    pillClass: 'bg-red-100 text-red-700',
    iconBgClass: 'bg-red-100',
    iconClass: 'text-red-600',
    cardBorderClass: 'border-r-4 border-red-400',
    iconSrc: notificationXIcon,
  },
}

const notificationsByTypeConfig = typeConfig
</script>

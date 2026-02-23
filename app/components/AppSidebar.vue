<template>
  <!-- Wrapper should not take width on mobile; only sidebar itself is visible when open -->
  <div class="relative w-0 lg:w-auto lg:shadow-sm lg:rounded-xl lg:m-4">
    <!-- Backdrop for mobile -->
    <div
      v-if="isOpen"
      @click="close"
      class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
    ></div>

    <aside
      class="fixed inset-y-0 end-0 w-64 h-screen flex flex-col bg-white border-s z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static rounded-xl m-2"
      :class="[isOpen ? 'translate-x-0' : closedTranslateClass, 'lg:translate-x-0']"
    >
      <!-- Logo area: tighter padding and controlled logo size to avoid big white frame -->
      <div class="px-4 py-4 flex justify-center border-b relative">
        <img
          src="~/assets/images/logo.png"
          alt="Al Masar"
          class="h-24 sm:h-28 w-auto max-w-[180px] object-contain"
        />
        <!-- Close button mobile -->
        <button @click="close" class="absolute start-4 top-1/2 -translate-y-1/2 p-2 lg:hidden text-gray-500">
           <span class="w-6 h-6 inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </button>
      </div>

      <nav class="flex-1 min-h-0 overflow-y-auto no-scrollbar py-4 rounded-xl m-2">
        <ul class="space-y-1">
          <li v-for="item in menuItems" :key="item.to">
            <NuxtLink
              :to="item.to"
              custom
              v-slot="{ href, navigate, isExactActive }"
            >
              <a
                :href="href"
                @click.prevent="onNavClick(navigate)"
                @mouseenter="hoveredItem = item.to"
                @mouseleave="hoveredItem = null"
                class="flex items-center gap-3 px-6 py-3 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
                :class="isExactActive ? '!bg-gray-900 !text-white shadow-sm' : ''"
              >
                <span class="w-5 h-5 shrink-0">
                  <img
                    :src="isExactActive || hoveredItem === item.to ? item.gIcon : item.bIcon"
                    alt=""
                    class="w-full h-full"
                  />
                </span>
                <span class="text-sm font-medium">
                  {{ t(item.labelKey) }}
                </span>
              </a>
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- add clear gap under the logout button -->
      <div class="p-4 border-t pb-8">
        <button
          type="button"
          class="flex items-center gap-3 px-6 py-3 w-full text-red-600 hover:bg-red-50 transition-colors rounded-lg"
          @click="showLogoutModal = true; closeOnMobile()"
        >
          <span class="w-5 h-5 shrink-0">
            <img :src="logoutIcon" alt="" class="w-full h-full" />
          </span>
          <span class="text-sm font-medium">{{ t('common.logout') }}</span>
        </button>
      </div>
    </aside>

    <DeleteAccountModal
      v-model="showLogoutModal"
      variant="logout"
      @confirm="onConfirmLogout"
    />
  </div>
</template>

<script setup>
import logoutIcon from '~/assets/icons/logout-icon.svg'
import borderIcon from '~/assets/icons/border-icon.svg'
import gorderIcon from '~/assets/icons/gorder-icon.svg'
import breportsIcon from '~/assets/icons/breports-icon.svg'
import greportsIcon from '~/assets/icons/greports-icon.svg'
import bratingIcon from '~/assets/icons/brating-icon.svg'
import gratingIcons from '~/assets/icons/grating-icons.svg'
import bsupIcon from '~/assets/icons/bsup-icon.svg'
import gsupIcon from '~/assets/icons/gsup-icon.svg'
import buserIcon from '~/assets/icons/buser-icon.svg'
import guserIcon from '~/assets/icons/guser-icon.svg'
import bsettingIcon from '~/assets/icons/bsetting-icon.svg'
import gsettingIcon from '~/assets/icons/gsetting-icon.svg'
import bcontactIcon from '~/assets/icons/bcontact-icon.svg'
import gcontactIcon from '~/assets/icons/gcontact-icon.svg'
import baboutIcon from '~/assets/icons/babout-icon.svg'
import gaboutIcon from '~/assets/icons/gabout-icon.svg'
import btermsIcon from '~/assets/icons/bterms-icon.svg'
import gtermsIcon from '~/assets/icons/gterms-icon.svg'
import bprivcyIcon from '~/assets/icons/bprivcy-icon.svg'
import gprivcyIcon from '~/assets/icons/gprivcy-icon.svg'

const { isOpen, close } = useSidebar()
const { t, locale } = useI18n()

const isRtl = computed(() => locale.value === 'ar' || locale.value === 'ur')
const closedTranslateClass = computed(() =>
  isRtl.value ? '-translate-x-full' : 'translate-x-full'
)

const hoveredItem = ref(null)
const showLogoutModal = ref(false)

const closeOnMobile = () => {
  if (window.innerWidth < 1024) {
    close()
  }
}

const onNavClick = (navigate) => {
  navigate()
  closeOnMobile()
}

function onConfirmLogout() {
  showLogoutModal.value = false
  // TODO: clear auth state when auth composable exists
  navigateTo('/login')
}

const menuItems = [
  { labelKey: 'sidebar.orders', to: '/', bIcon: borderIcon, gIcon: gorderIcon },
  { labelKey: 'sidebar.stats', to: '/stats', bIcon: breportsIcon, gIcon: greportsIcon },
  { labelKey: 'sidebar.reviews', to: '/reviews', bIcon: bratingIcon, gIcon: gratingIcons },
  { labelKey: 'sidebar.subscription', to: '/subscription', bIcon: bsupIcon, gIcon: gsupIcon },
  { labelKey: 'sidebar.profile', to: '/profile', bIcon: buserIcon, gIcon: guserIcon },
  { labelKey: 'sidebar.settings', to: '/settings', bIcon: bsettingIcon, gIcon: gsettingIcon },
  { labelKey: 'sidebar.contact', to: '/contact', bIcon: bcontactIcon, gIcon: gcontactIcon },
  { labelKey: 'sidebar.aboutUs', to: '/AboutUs', bIcon: baboutIcon, gIcon: gaboutIcon },
  { labelKey: 'sidebar.terms', to: '/terms', bIcon: btermsIcon, gIcon: gtermsIcon },
  { labelKey: 'sidebar.privacy', to: '/privacy', bIcon: bprivcyIcon, gIcon: gprivcyIcon },
]
</script>

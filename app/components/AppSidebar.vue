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
      class="fixed inset-y-0 right-0 w-64 bg-white border-l z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:flex lg:flex-col sticky top-0 rounded-xl m-2"
      :class="isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'"
    >
      <!-- Logo area: tighter padding and controlled logo size to avoid big white frame -->
      <div class="px-4 py-4 flex justify-center border-b relative">
        <img
          src="~/assets/images/logo.png"
          alt="Al Masar"
          class="h-30 w-auto max-w-[140px] object-contain"
        />
        <!-- Close button mobile -->
        <button @click="close" class="absolute left-4 top-1/2 -translate-y-1/2 p-2 lg:hidden text-gray-500">
           <span class="w-6 h-6 inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </button>
      </div>

      <nav class="flex-1 overflow-y-auto no-scrollbar py-4 rounded-xl m-2">
        <ul class="space-y-1">
          <li v-for="item in menuItems" :key="item.label">
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
                class="flex items-center px-6 py-3 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
                :class="isExactActive ? '!bg-gray-900 !text-white shadow-sm' : ''"
              >
                <span class="w-5 h-5 ml-3">
                  <img
                    :src="isExactActive || hoveredItem === item.to ? item.gIcon : item.bIcon"
                    alt=""
                    class="w-full h-full"
                  />
                </span>
                <span class="text-sm font-medium">
                  {{ item.label }}
                </span>
              </a>
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- add clear gap under the logout button -->
      <div class="p-4 border-t pb-8">
        <button
          class="flex items-center px-6 py-3 w-full text-red-600 hover:bg-red-50 transition-colors rounded-lg"
        >
          <span class="w-5 h-5 ml-3">
            <img :src="logoutIcon" alt="" class="w-full h-full" />
          </span>
          <span class="text-sm font-medium">تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup>
const { isOpen, close } = useSidebar()

const hoveredItem = ref(null)

const closeOnMobile = () => {
  if (window.innerWidth < 1024) {
    close()
  }
}

const onNavClick = (navigate) => {
  navigate()
  closeOnMobile()
}

const logoutIcon = new URL('../assets/icons/logout-icon.svg', import.meta.url).href

const menuItems = [
  { 
    label: 'إدارة الطلبات', 
    to: '/', 
    bIcon: new URL('../assets/icons/border-icon.svg', import.meta.url).href,
    gIcon: new URL('../assets/icons/gorder-icon.svg', import.meta.url).href,
  },
  { 
    label: 'الإحصائيات والتقارير', 
    to: '/stats', 
    bIcon: new URL('../assets/icons/breports-icon.svg', import.meta.url).href,
    gIcon: new URL('../assets/icons/greports-icon.svg', import.meta.url).href,
  },
  { 
    label: 'إدارة التقييمات', 
    to: '/reviews', 
    bIcon: new URL('../assets/icons/brating-icon.svg', import.meta.url).href,
    gIcon: new URL('../assets/icons/grating-icons.svg', import.meta.url).href,
  },
  { 
    label: 'الاشتراك والعمولة', 
    to: '/subscription', 
    bIcon: new URL('../assets/icons/bsup-icon.svg', import.meta.url).href,
    gIcon: new URL('../assets/icons/gsup-icon.svg', import.meta.url).href,
  },
  { 
    label: 'الملف الشخصي', 
    to: '/profile', 
    bIcon: new URL('../assets/icons/buser-icon.svg', import.meta.url).href,
    gIcon: new URL('../assets/icons/guser-icon.svg', import.meta.url).href,
  },
  { 
    label: 'إعدادات عامة', 
    to: '/settings', 
    bIcon: new URL('../assets/icons/bsetting-icon.svg', import.meta.url).href,
    gIcon: new URL('../assets/icons/gsetting-icon.svg', import.meta.url).href,
  },
  { 
    label: 'التواصل مع الإدارة', 
    to: '/contact', 
    bIcon: new URL('../assets/icons/bcontact-icon.svg', import.meta.url).href,
    gIcon: new URL('../assets/icons/gcontact-icon.svg', import.meta.url).href,
  },
  { 
    label: 'من نحن', 
    to: '/about', 
    bIcon: new URL('../assets/icons/babout-icon.svg', import.meta.url).href,
    gIcon: new URL('../assets/icons/gabout-icon.svg', import.meta.url).href,
  },
  { 
    label: 'الشروط والأحكام', 
    to: '/terms', 
    bIcon: new URL('../assets/icons/bterms-icon.svg', import.meta.url).href,
    gIcon: new URL('../assets/icons/gterms-icon.svg', import.meta.url).href,
  },
  { 
    label: 'سياسة الخصوصية', 
    to: '/privacy', 
    bIcon: new URL('../assets/icons/bprivcy-icon.svg', import.meta.url).href,
    gIcon: new URL('../assets/icons/gprivcy-icon.svg', import.meta.url).href,
  },
]
</script>

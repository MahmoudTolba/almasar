<template>
  <header class="w-full bg-white border-b h-16 flex items-center px-4 lg:px-6 gap-2 justify-end sm:gap-3 lg:gap-4 sticky top-0 z-10 shadow-sm rounded-xl">
    <div class="flex items-center gap-4">
      <!-- Hamburger menu mobile -->
      <button @click="toggle" class="p-2 -mr-2 text-gray-500 lg:hidden">
        <span class="w-6 h-6 inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </span>
      </button>

      <div class="relative border bg-[#AB87401A] rounded-md p-2 gap-2">
        <button class="text-gray-400 hover:text-gray-600">
          <span class="w-5 h-5 inline-block">
            <img
              src="~/assets/icons/notification-bing.svg"
              alt="Bell"
              class="w-full h-full object-contain"
            />
          </span>
        </button>
        <span
          class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white"
        >
          2
        </span>
      </div>
    </div>

    <div class="flex items-center gap-3   px-3 py-1.5 rounded-lg">
      <div class="w-7 h-7 lg:w-8 lg:h-8 rounded-md border border-[#AB8740] flex items-center justify-center text-white overflow-hidden ">
        <img src="~/assets/images/logo.png" alt="S" class="w-full h-full object-contain" />
      </div>
      <span class="text-xs sm:text-sm lg:text-sm font-semibold text-gray-900 truncate max-w-[100px] sm:max-w-[140px] lg:max-w-none">شركة الوالي</span>
    </div>
  </header>
</template>

<script setup>
const { toggle } = useSidebar()
</script>

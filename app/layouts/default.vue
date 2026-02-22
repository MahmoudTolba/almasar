<template>
  <div class="h-screen overflow-hidden bg-gray-50 flex font-sans">
    <AppSidebar />
    <div class="flex-1 flex flex-col min-w-0 min-h-0">
      <div class="w-full max-w-7xl 2xl:max-w-[1720px] mx-auto px-3 sm:px-4 lg:px-8 2xl:px-10 py-3 sm:py-4 lg:py-6 flex-1 flex flex-col min-h-0 gap-4">
        <AppTopBar />
        <main class="flex-1 min-h-0 overflow-y-auto no-scrollbar">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex overflow-x-hidden font-sans" dir="rtl">
    <AppSidebar />
    <div class="flex-1 flex flex-col min-w-0">
      <div class="w-full max-w-7xl 2xl:max-w-[1720px] mx-auto px-3 sm:px-4 lg:px-8 2xl:px-10 py-3 sm:py-4 lg:py-6 flex flex-col gap-4">
        <AppTopBar />
        <main class="flex-1">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

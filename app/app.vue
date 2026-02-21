<template>
  <div :dir="dir">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const { locale } = useI18n()
const dir = computed(() => (locale.value === 'ar' || locale.value === 'ur' ? 'rtl' : 'ltr'))
</script>

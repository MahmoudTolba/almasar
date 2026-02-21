<template>
  <div :dir="dir">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const route = useRoute()
const { locale, t } = useI18n()
const dir = computed(() => (locale.value === 'ar' || locale.value === 'ur' ? 'rtl' : 'ltr'))

useHead({
  title: computed(() => {
    const key = route.meta.title
    return key ? t(key) : t('common.appName')
  }),
})
</script>

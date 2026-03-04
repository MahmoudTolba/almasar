<template>
  <div :dir="dir">
    <Toast />
    <Transition name="splash">
      <SplashScreen v-if="showSplash" />
    </Transition>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const route = useRoute()
const { locale, t } = useI18n()
const dir = computed(() => (locale.value === 'ar' || locale.value === 'ur' ? 'rtl' : 'ltr'))

const showSplash = ref(true)

let splashTimer
onMounted(() => {
  splashTimer = setTimeout(() => {
    showSplash.value = false
  }, 2500)
})
onBeforeUnmount(() => {
  if (splashTimer) clearTimeout(splashTimer)
})

useHead({
  title: computed(() => {
    const key = route.meta.title
    return key ? t(key) : t('common.appName')
  }),
})
</script>

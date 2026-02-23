<template>
  <div class="w-full">
    <div class="w-full px-3 sm:px-4 lg:px-0">
      <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{{ t('privacy.title') }}</h1>
      <p class="text-xs lg:text-base text-gray-500">{{ t('privacy.subtitle') }}</p>
    </div>
    <div class="w-full px-3 sm:px-4 lg:px-0 mt-4 flex flex-col gap-4 items-start justify-start text-start bg-[#FFFFFF] p-4 rounded-xl">
      <div class="w-96 h-[200px] flex items-center justify-center self-center">
        <img src="~/assets/images/logo.png" :alt="t('terms.logoAlt')" class="w-full h-full object-cover">
      </div>
      <div class="w-full flex flex-col gap-4 p-6">
        <p class="w-full text-start">{{ t('privacy.paragraph1') }}</p>
        <p class="w-full text-start">{{ t('privacy.paragraph2') }}</p>
        <p class="w-full text-start">{{ t('privacy.paragraph3') }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
const { t } = useI18n()
definePageMeta({
  title: 'privacy.title',
})
</script>
<style scoped>

</style>
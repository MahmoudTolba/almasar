<template>
    <div class="w-full px-3 sm:px-4 lg:px-0">
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            {{ t('aboutUs.title') }}
        </h1>
        <p class="text-xs lg:text-base text-gray-500">
            {{ t('aboutUs.subtitle') }}
        </p>
        <div class="w-full mt-4 flex flex-col gap-4 items-start justify-start text-start bg-[#FFFFFF] p-4 rounded-xl">
            <div class="w-96 h-[200px] flex items-center justify-center self-center">
                <img src="~/assets/images/logo.png" :alt="t('aboutUs.logoAlt')" class="w-full h-full object-cover">
            </div>
            <div class="w-full flex flex-col gap-4 p-6">
                <p class="w-full text-start">{{ t('aboutUs.paragraph1') }}</p>
                <p class="w-full text-start">{{ t('aboutUs.paragraph2') }}</p>
                <p class="w-full text-start">{{ t('aboutUs.paragraph3') }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
const { t } = useI18n()

definePageMeta({
    title: 'aboutUs.title',
})
</script>

<style scoped>
</style>


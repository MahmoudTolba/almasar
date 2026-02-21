<template>
  <button
    type="button"
    class="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-accent bg-accent/5 text-gray-700 text-sm font-medium hover:bg-accent/10 transition-colors"
    @click="$emit('click')"
  >
    <img
      src="~/assets/icons/language-skill.svg"
      alt=""
      class="w-5 h-5"
    />
    {{ t('common.language') }}
  </button>
</template>

<script setup>
defineEmits(['click'])
const { t } = useI18n()
</script>

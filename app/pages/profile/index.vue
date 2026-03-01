<template>
    <div>
        <div class="w-full flex flex-col gap-4 items-start justify-start text-start">
            <h1 class="text-2xl font-bold text-[#1F2937]">{{ t('profile.title') }}</h1>
            <p class="text-md text-[#4B5563] font-medium">{{ t('profile.subtitle') }}</p>
        </div>
        <div class="w-full flex flex-col gap-4 items-start justify-start text-start mt-6">
            <!-- User Name Section -->
            <div class="w-full flex flex-row gap-6 items-center bg-[#FFFFFF] p-4 rounded-xl border-b border-gray-100">
                <div class="w-14 h-14 rounded-xl flex items-center justify-center border border-[#AB8740] shrink-0 overflow-hidden bg-white">
                    <img
                        v-if="user?.avatarUrl"
                        :src="user.avatarUrl"
                        :alt="user?.officeName || 'Profile'"
                        class="w-full h-full object-cover"
                    >
                    <img
                        v-else
                        src="~/assets/icons/logo-user.svg"
                        alt="user-icon"
                        class="w-8 h-8 object-contain"
                    >
                </div>
                <p class="text-base font-medium text-[#1F2937]">{{ user?.officeName || '—' }}</p>
            </div>
            <!-- Phone Section -->
            <div class="w-full flex flex-col gap-2 items-start justify-start text-start bg-[#FFFFFF] p-4 rounded-xl border-b border-gray-100">
               <h2 class="text-sm font-medium text-[#1C1C1C]">{{ t('profile.phone') }}</h2>
                <div class="flex flex-row gap-2 items-center justify-start text-start">
                    <img src="~/assets/icons/smart-phone.svg" alt="phone-icon" class="w-6 h-6 object-contain">
                    <span class="text-sm font-medium text-[#1F2937]">{{ formattedPhone }}</span>
                    <button
                        v-if="user?.phone"
                        type="button"
                        class="p-1 rounded hover:bg-gray-100 transition-colors"
                        :aria-label="t('profile.copy')"
                        @click="copyToClipboard(user.phone, 'phoneCopied')"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                        </svg>
                    </button>
                    <span v-if="phoneCopied" class="text-xs text-accent font-medium">{{ t('profile.copied') }}</span>
                </div>
            </div>
            <!-- Email Section -->
            <div class="w-full flex flex-col gap-2 items-start justify-start text-start bg-[#FFFFFF] p-4 rounded-xl border-b border-gray-100">
                <h2 class="text-sm font-medium text-[#1F2937]">{{ t('profile.email') }}</h2>
                <div class="flex flex-row gap-2 items-center justify-start text-start">
                    <img src="~/assets/icons/mail-02.svg" alt="email-icon" class="w-6 h-6 object-contain">
                    <span class="text-sm font-medium text-[#1F2937]">{{ user?.officialEmail || '—' }}</span>
                    <button
                        v-if="user?.officialEmail"
                        type="button"
                        class="p-1 rounded hover:bg-gray-100 transition-colors"
                        :aria-label="t('profile.copy')"
                        @click="copyToClipboard(user.officialEmail, 'emailCopied')"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                        </svg>
                    </button>
                    <span v-if="emailCopied" class="text-xs text-accent font-medium">{{ t('profile.copied') }}</span>
                </div>
            </div>
            <!-- address Section -->
            <div class="w-full flex flex-col gap-2 items-start justify-start text-start bg-[#FFFFFF] p-4 rounded-xl border-b border-gray-100">
                <h2 class="text-sm font-medium text-[#1F2937]">{{ t('profile.address') }}</h2>
                <div class="flex flex-row gap-2 items-center justify-start text-start">
                    <img src="~/assets/icons/location-04.svg" alt="address-icon" class="w-6 h-6 object-contain">
                    <span class="text-sm font-medium text-[#1F2937]">{{ user?.address || '—' }}</span>
                </div>
            </div>
            <!-- description -->
            <div class="w-full flex flex-col gap-2 items-start justify-start text-start bg-[#FFFFFF] p-4 rounded-xl border-b border-gray-100">
                <h2 class="text-sm font-medium text-[#1F2937]">{{ t('profile.description') }}</h2>
                <div class="flex flex-row gap-2 items-center justify-start text-start">
                    <img src="~/assets/icons/edit-02.svg" alt="description-icon" class="w-5 h-5 object-contain">
                    <span class="text-sm font-medium text-[#1F2937]">{{ user?.description || '—' }}</span>
                </div>
            </div>
            <!-- bank account -->
            <div class="w-full flex flex-col gap-2 items-start justify-start text-start bg-[#FFFFFF] p-4 rounded-xl border-b border-gray-100">
                <h2 class="text-sm font-medium text-[#1F2937]">{{ t('profile.bankAccount') }}</h2>
                <template v-if="user?.bankName || user?.bankAccountName || user?.iban">
                    <div v-if="user?.bankName" class="flex flex-row gap-2 items-center justify-start text-start">
                        <img src="~/assets/icons/bank.svg" alt="bank-account-icon" class="w-5 h-5 object-contain">
                        <span class="text-sm font-medium text-[#1F2937]">{{ user.bankName }}</span>
                    </div>
                    <div v-if="user?.bankAccountName" class="flex flex-row gap-2 items-center justify-start text-start">
                        <img src="~/assets/icons/bank.svg" alt="bank-account-icon" class="w-5 h-5 object-contain">
                        <span class="text-sm font-medium text-[#1F2937]">{{ user.bankAccountName }}</span>
                    </div>
                    <div v-if="user?.iban" class="flex flex-row gap-2 items-center justify-start text-start">
                        <img src="~/assets/icons/bank.svg" alt="bank-account-icon" class="w-5 h-5 object-contain">
                        <span class="text-sm font-medium text-[#1F2937]">{{ user.iban }}</span>
                    </div>
                </template>
                <div v-else class="flex flex-row gap-2 items-center justify-start text-start">
                    <img src="~/assets/icons/bank.svg" alt="bank-account-icon" class="w-5 h-5 object-contain">
                    <span class="text-sm font-medium text-[#1F2937]">—</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useAuthStore } from '~/stores/auth'
import { parseE164 } from '~/data/countries'

definePageMeta({ title: 'profile.title' })
const { t } = useI18n()
const authStore = useAuthStore()

const user = computed(() => authStore.user)
const phoneCopied = ref(false)
const emailCopied = ref(false)

const formattedPhone = computed(() => {
  const raw = user.value?.phone || ''
  const parsed = parseE164(raw)
  if (parsed) {
    return `+${parsed.dialCode} ${parsed.nationalNumber}`
  }
  return raw || '—'
})

const copyToClipboard = async (text, flag) => {
  if (!text || typeof navigator?.clipboard?.writeText !== 'function') return
  try {
    const toCopy = flag === 'phoneCopied' ? formattedPhone.value : text
    await navigator.clipboard.writeText(toCopy)
    if (flag === 'phoneCopied') phoneCopied.value = true
    else emailCopied.value = true
    setTimeout(() => {
      phoneCopied.value = false
      emailCopied.value = false
    }, 2000)
  } catch {
    // ignore clipboard errors
  }
}
</script>

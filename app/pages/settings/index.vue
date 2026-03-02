<template>
  <div>
    <div class="w-full flex flex-col gap-4 items-start justify-start text-start">
      <h1 class="text-2xl font-bold text-[#1F2937]">{{ t('settings.title') }}</h1>
      <p class="text-md text-[#4B5563] font-medium">{{ t('settings.subtitle') }}</p>
    </div>

    <Transition name="fade-slide" mode="out-in">
      <div
        v-if="!isEditingProfile && !isChangingPassword"
        key="settings-list"
        class="w-full flex flex-col gap-4 items-start justify-start text-start mt-6"
      >
        <!-- Main settings card -->
        <div class="w-full bg-[#FFFFFF] rounded-xl border-b border-gray-100 overflow-hidden">
          <!-- Edit Profile -->
          <button
            type="button"
            @click="isEditingProfile = true"
            class="w-full flex flex-row gap-4 items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50/50 transition active:scale-[0.99]"
          >
            
              <img src="~/assets/icons/user-square.svg" alt="" class="w-6 h-6 object-contain">
            
            <span class="flex-1 text-base font-medium text-[#1F2937] text-start">{{ t('settings.editProfile') }}</span>
            <img src="~/assets/icons/arrow-down-double.svg" alt="profile">
          </button>

          <!-- Change Mobile Number -->
          <NuxtLink
            to="#"
            class="w-full flex flex-row gap-4 items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
          >
          <img src="~/assets/icons/smart-phone.svg" alt="" class="w-6 h-6 object-contain">
            <span class="flex-1 text-base font-medium text-[#1F2937] text-start">{{ t('settings.changeMobile') }}</span>
            <img src="~/assets/icons/arrow-down-double.svg" alt="mobile">
          </NuxtLink>

          <!-- Change Password -->
          <button
            type="button"
            class="w-full flex flex-row gap-4 items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
            @click="isChangingPassword = true"
          >
            <img src="~/assets/icons/lock-key.svg" alt="" class="w-6 h-6 object-contain">
            <span class="flex-1 text-base font-medium text-[#1F2937] text-start">{{ t('settings.changePassword') }}</span>
            <img src="~/assets/icons/arrow-down-double.svg" alt="password">
          </button>

          <!-- Language -->
          <button
            type="button"
            class="w-full flex flex-row gap-4 items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
            @click="showLanguageModal = true"
          >
          <img src="~/assets/icons/language-skill.svg" alt="" class="w-6 h-6 object-contain">
            <span class="flex-1 text-base font-medium text-[#1F2937] text-start">{{ t('settings.language') }}</span>
            <img src="~/assets/icons/arrow-down-double.svg" alt="language">
          </button>

          <!-- Enable Notifications (toggle) -->
          <div class="w-full flex flex-row gap-4 items-center justify-between p-4 overflow-visible">
            <img src="~/assets/icons/notification-02.svg" alt="" class="w-6 h-6 object-contain">
            <span class="flex-1 text-base font-medium text-[#1F2937] text-start">{{ t('settings.enableNotifications') }}</span>
            <button
              type="button"
              role="switch"
              :aria-checked="notificationsEnabled"
              @click="notificationsEnabled = !notificationsEnabled"
              class="flex items-center h-6 w-11 rounded-full p-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 shrink-0"
              :class="notificationsEnabled ? 'justify-start bg-[#CEA04D]' : 'justify-end bg-gray-200'"
            >
              <span
                class="inline-block h-4 w-4 rounded-full bg-white border border-gray-200 shadow-sm transition-[margin] duration-200 ease-out"
              />
            </button>
          </div>
        </div>

        <!-- Delete Account card -->
        <div class="w-full bg-[#FFFFFF] rounded-xl border-b border-gray-100 overflow-hidden">
          <button
            type="button"
            class="w-full flex flex-row gap-4 items-center justify-between p-4 hover:bg-red-50/50 transition-colors text-red-600"
            @click="showDeleteAccountModal = true"
          >
          <img src="~/assets/icons/logout-square-01.svg" alt="logout">
            <span class="flex-1 text-base font-medium text-start">{{ t('settings.deleteAccount') }}</span>
            <img src="~/assets/icons/arrow-down-red.svg" alt="logout">
          </button>
        </div>
      </div>

      <div v-else-if="isEditingProfile" key="edit-form" class="w-full mt-6">
        <ProfileEditForm
          @submit-success="handleProfileUpdateSuccess"
          @cancel="isEditingProfile = false"
        />
      </div>

      <div v-else-if="isChangingPassword" key="change-password-form" class="w-full mt-6">
        <ChangePasswordForm
          @submit-success="onChangePasswordSuccess"
          @cancel="isChangingPassword = false"
        />
      </div>
    </Transition>

    <DeleteAccountModal
      v-model="showDeleteAccountModal"
      @confirm="onConfirmDeleteAccount"
    />
    <LanguageModal v-model="showLanguageModal" />
  </div>
</template>

<script setup>
import ProfileEditForm from '~/components/profile/ProfileEditForm.vue'
import ChangePasswordForm from '~/components/profile/ChangePasswordForm.vue'

definePageMeta({ title: 'settings.title' })
const { t } = useI18n()
const localePath = useLocalePath()
const notificationsEnabled = ref(true)
const isEditingProfile = ref(false)
const isChangingPassword = ref(false)
const showDeleteAccountModal = ref(false)
const showLanguageModal = ref(false)

const handleProfileUpdateSuccess = () => {
  isEditingProfile.value = false
}

function onChangePasswordSuccess() {
  isChangingPassword.value = false
}

function onConfirmDeleteAccount() {
  const authStore = useAuthStore()
  const userStore = useUserStore()
  const draftStore = useRegistrationDraftStore()
  const phone = authStore.user?.phone

  if (phone) {
    userStore.deleteUser(phone)
    draftStore.clear()
  }
  authStore.logout()
  showDeleteAccountModal.value = false
  navigateTo(localePath('/login'))
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>

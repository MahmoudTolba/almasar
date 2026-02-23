<template>
    <div>
        <div class="w-full flex flex-col gap-4 items-start justify-start text-start">
            <h1 class="text-2xl font-bold text-[#1F2937]">{{ t('profile.title') }}</h1>
            <p class="text-md text-[#4B5563] font-medium">{{ t('profile.subtitle') }}</p>
        </div>
        <div class="w-full flex flex-col gap-4 items-start justify-start text-start mt-6">
            <!-- User Name Section -->
            <div class="w-full flex flex-row gap-6 items-center bg-[#FFFFFF] p-4 rounded-xl border-b border-gray-100">
                <div class="w-14 h-14 rounded-xl flex items-center justify-center border border-[#AB8740] shrink-0" >
                    <img src="~/assets/icons/logo-user.svg" alt="user-icon" class="w-8 h-8 object-contain">
                </div>
                <p class="text-base font-medium text-[#1F2937]">{{ t('profile.companyName') }}</p>
            </div>
            <!-- Phone Section -->
            <div class="w-full flex flex-col gap-2 items-start justify-start text-start bg-[#FFFFFF] p-4 rounded-xl border-b border-gray-100">
               <h2 class="text-sm font-medium text-[#1C1C1C]">{{ t('profile.phone') }}</h2>
                <div class="flex flex-row gap-2 items-center justify-start text-start">
                    <img src="~/assets/icons/smart-phone.svg" alt="phone-icon" class="w-6 h-6 object-contain">
                    <span class="text-sm font-medium text-[#1F2937]">+966 555 555 555</span>
                    
                </div>
            </div>
            <!-- Email Section -->
            <div class="w-full flex flex-col gap-2 items-start justify-start text-start bg-[#FFFFFF] p-4 rounded-xl border-b border-gray-100">
                <h2 class="text-sm font-medium text-[#1F2937]">{{ t('profile.email') }}</h2>
                <div class="flex flex-row gap-2 items-center justify-start text-start">
                    <img src="~/assets/icons/mail-02.svg" alt="email-icon" class="w-6 h-6 object-contain">
                    <span class="text-sm font-medium text-[#1F2937]">example@example.com</span>
                </div>
            </div>
            <!-- address Section -->
            <div class="w-full flex flex-col gap-2 items-start justify-start text-start bg-[#FFFFFF] p-4 rounded-xl border-b border-gray-100">
                <h2 class="text-sm font-medium text-[#1F2937]">{{ t('profile.address') }}</h2>
                <div class="flex flex-row gap-2 items-center justify-start text-start">
                    <img src="~/assets/icons/location-04.svg" alt="address-icon" class="w-6 h-6 object-contain">
                    <span class="text-sm font-medium text-[#1F2937]">الرياض, المنطقة الشرقية, المملكة العربية السعودية</span>
                </div>
            </div>
            <!-- description -->
            <div class="w-full flex flex-col gap-2 items-start justify-start text-start bg-[#FFFFFF] p-4 rounded-xl border-b border-gray-100">
                <h2 class="text-sm font-medium text-[#1F2937]">{{ t('profile.description') }}</h2>
                <div class="flex flex-row gap-2 items-center justify-start text-start">
                    <img src="~/assets/icons/edit-02.svg" alt="description-icon" class="w-5 h-5 object-contain">
                    <span class="text-sm font-medium text-[#1F2937]">هذا النص هو مثال لنص يمكن ان يستبدل في نفس المساحة</span>
                </div>
            </div>
            <!-- bank account -->
            <div class="w-full flex flex-col gap-2 items-start justify-start text-start bg-[#FFFFFF] p-4 rounded-xl border-b border-gray-100">
                <h2 class="text-sm font-medium text-[#1F2937]">{{ t('profile.bankAccount') }}</h2>
                <div class="flex flex-row gap-2 items-center justify-start text-start">
                    <img src="~/assets/icons/bank.svg" alt="bank-account-icon" class="w-5 h-5 object-contain">
                    <span class="text-sm font-medium text-[#1F2937]">اسم البنك</span>
                </div>
                <div class="flex flex-row gap-2 items-center justify-start text-start">
                    <img src="~/assets/icons/bank.svg" alt="bank-account-icon" class="w-5 h-5 object-contain">
                    <span class="text-sm font-medium text-[#1F2937]">اسم صاحب الحساب</span>
                </div>
                <div class="flex flex-row gap-2 items-center justify-start text-start">
                    <img src="~/assets/icons/bank.svg" alt="bank-account-icon" class="w-5 h-5 object-contain">
                    <span class="text-sm font-medium text-[#1F2937]">  رقم الايبان</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
definePageMeta({ title: 'profile.title' })
const { t } = useI18n()
</script>

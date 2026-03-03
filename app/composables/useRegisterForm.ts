export const useRegisterForm = () => {
  const draftStore = useRegistrationDraftStore()
  const { validateForm, registerStep1Schema, registerStep2Schema } = useValidationSchemas()

  const step = ref(1)

  const form = reactive({
    officeName: '',
    officialEmail: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    description: '',
    logoFile: null as File | null,
  })

  const logoPreviewUrl = ref('')

  const formStep2 = reactive({
    commercialRegisterFile: null as File | null,
    bankName: '',
    bankAccountName: '',
    iban: '',
  })

  const { t } = useI18n()
  const MAX_LOGO_SIZE_BYTES = 500 * 1024

  // Hydrate from draft on init
  if (import.meta.client) {
    const loaded = draftStore.load()
    if (loaded.step1) {
      form.officeName = loaded.step1.officeName ?? ''
      form.officialEmail = loaded.step1.officialEmail ?? ''
      form.phone = loaded.step1.phone ?? ''
      form.address = loaded.step1.address ?? ''
      form.password = loaded.step1.password ?? ''
      form.confirmPassword = loaded.step1.confirmPassword ?? ''
      form.description = loaded.step1.description ?? ''
      logoPreviewUrl.value = loaded.step1.logoPreviewUrl ?? ''
      // logoFile stays null - File cannot be restored from storage
    }
    if (loaded.step2) {
      formStep2.bankName = loaded.step2.bankName ?? ''
      formStep2.bankAccountName = loaded.step2.bankAccountName ?? ''
      formStep2.iban = loaded.step2.iban ?? ''
      // commercialRegisterFile stays null - File cannot be restored from storage
    }
    if (loaded.step >= 1 && loaded.step <= 3) {
      step.value = loaded.step
    }
  }

  const errors = reactive({
    officeName: '',
    officialEmail: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    description: '',
    logo: '',
    commercialRegister: '',
  })

  const loading = ref(false)
  const showRegisterModal = ref(false)
  const registerModalState = ref<'loading' | 'success'>('loading')
  const otp = ref('')
  const otpContainerRef = ref(null)
  const resendCountdown = ref(0)
  const resendIntervalRef = ref<ReturnType<typeof setInterval> | null>(null)

  const OTP_LENGTH = 6

  const commercialRegisterFileName = computed(
    () => (formStep2.commercialRegisterFile && formStep2.commercialRegisterFile.name) || ''
  )

  const formattedPhone = computed(() => {
    const raw = form.phone || ''
    const match = raw.match(/^(\+\d{1,4})(\d+)$/)
    return match ? `${match[1]} ${match[2]}` : raw
  })

  const resendCountdownFormatted = computed(() => {
    const s = resendCountdown.value
    const mins = Math.floor(s / 60)
    const secs = s % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  })

  const applyStep1Errors = (errs: Record<string, string>) => {
    errors.officeName = errs.officeName ?? ''
    errors.officialEmail = errs.officialEmail ?? ''
    errors.phone = errs.phone ?? ''
    errors.address = errs.address ?? ''
    errors.password = errs.password ?? ''
    errors.confirmPassword = errs.confirmPassword ?? ''
    errors.description = errs.description ?? ''
    errors.logo = errs.logo ?? ''
  }

  const clearErrors = () => {
    errors.officeName = ''
    errors.officialEmail = ''
    errors.phone = ''
    errors.address = ''
    errors.password = ''
    errors.confirmPassword = ''
    errors.description = ''
    errors.logo = ''
    errors.commercialRegister = ''
  }

  const onSubmit = async (): Promise<void> => {
    const result = validateForm(
      {
        officeName: form.officeName,
        officialEmail: form.officialEmail,
        phone: form.phone,
        address: form.address,
        password: form.password,
        confirmPassword: form.confirmPassword,
        description: form.description,
      },
      registerStep1Schema
    )
    if (!result.valid) {
      applyStep1Errors(result.errors)
      return
    }
    if (loading.value) return
    clearErrors()
    draftStore.saveStep1({
      officeName: form.officeName,
      officialEmail: form.officialEmail,
      phone: form.phone,
      address: form.address,
      password: form.password,
      confirmPassword: form.confirmPassword,
      description: form.description,
      logoPreviewUrl: logoPreviewUrl.value || undefined,
    })
    step.value = 2
  }

  const goBackToStep1 = () => {
    step.value = 1
  }

  const goBackToStep2 = () => {
    step.value = 2
    otp.value = ''
  }

  const onFileChange = (_key: string, event: Event) => {
    const target = event.target as { files?: FileList } | null
    if (!target?.files?.length) {
      formStep2.commercialRegisterFile = null
      return
    }
    formStep2.commercialRegisterFile = target.files[0] ?? null
  }

  const onLogoChange = (event: Event) => {
    const target = event.target as HTMLInputElement | null
    if (!target?.files?.length) {
      form.logoFile = null
      logoPreviewUrl.value = ''
      errors.logo = ''
      return
    }
    const file = target.files[0]
    if (!/^image\/(png|jpeg)$/.test(file.type)) {
      errors.logo = t('profile.validation.logoInvalidType')
      form.logoFile = null
      logoPreviewUrl.value = ''
      return
    }
    if (file.size > MAX_LOGO_SIZE_BYTES) {
      errors.logo = t('profile.validation.logoTooLarge')
      form.logoFile = null
      logoPreviewUrl.value = ''
      return
    }
    errors.logo = ''
    form.logoFile = file
    const reader = new FileReader()
    reader.onload = () => {
      logoPreviewUrl.value = (reader.result as string) || ''
    }
    reader.readAsDataURL(file)
    target.value = ''
  }

  const focusFirstOtpInput = () => {
    const el = otpContainerRef.value as { querySelector?: (sel: string) => { focus?: () => void } | null } | null
    el?.querySelector?.('input')?.focus?.()
  }

  const setOtpDigit = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    const arr = otp.value.split('')
    arr[index] = digit
    otp.value = arr.join('').slice(0, OTP_LENGTH)
    if (digit && index < OTP_LENGTH - 1) {
      nextTick(() => {
        const el = otpContainerRef.value as { querySelectorAll?: (sel: string) => { focus?: () => void }[] } | null
        const inputs = el?.querySelectorAll?.('input')
        inputs?.[index + 1]?.focus?.()
      })
    }
  }

  const onOtpKeydown = (index: number, e: KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp.value[index] && index > 0) {
      const arr = otp.value.split('')
      arr[index - 1] = ''
      otp.value = arr.join('')
      nextTick(() => {
        const el = otpContainerRef.value as { querySelectorAll?: (sel: string) => { focus?: () => void }[] } | null
        const inputs = el?.querySelectorAll?.('input')
        inputs?.[index - 1]?.focus?.()
      })
    }
  }

  const onOtpPaste = (e: ClipboardEvent) => {
    e.preventDefault()
    const pasted = (e.clipboardData?.getData('text') ?? '').replace(/\D/g, '').slice(0, OTP_LENGTH)
    otp.value = pasted
    const nextIndex = Math.min(pasted.length, OTP_LENGTH - 1)
    nextTick(() => {
      const el = otpContainerRef.value as { querySelectorAll?: (sel: string) => { focus?: () => void }[] } | null
      const inputs = el?.querySelectorAll?.('input')
      inputs?.[nextIndex]?.focus?.()
    })
  }

  const closeRegisterModal = () => {
    showRegisterModal.value = false
  }

  const onOtpVerify = async () => {
    if (otp.value.length !== OTP_LENGTH || loading.value) return
    loading.value = true
    showRegisterModal.value = true
    registerModalState.value = 'loading'
    try {
      // TODO: Call verify OTP API; simulate with delay for now
      await new Promise((resolve) => setTimeout(resolve, 2000))
      registerModalState.value = 'success'
      // console.log('Verify OTP', { phone: form.phone, otp: otp.value })
    } finally {
      loading.value = false
    }
  }

  const onResendCode = () => {
    if (resendCountdown.value > 0) return
    resendCountdown.value = 60
    // TODO: Call resend OTP API
    console.log('Resend OTP', { phone: form.phone })
    if (resendIntervalRef.value) clearInterval(resendIntervalRef.value)
    resendIntervalRef.value = setInterval(() => {
      resendCountdown.value--
      if (resendCountdown.value <= 0 && resendIntervalRef.value) {
        clearInterval(resendIntervalRef.value)
        resendIntervalRef.value = null
      }
    }, 1000)
  }

  onUnmounted(() => {
    if (resendIntervalRef.value) {
      clearInterval(resendIntervalRef.value)
      resendIntervalRef.value = null
    }
  })

  const onSubmitStep2 = async (): Promise<void> => {
    const result = validateForm(
      { commercialRegister: formStep2.commercialRegisterFile },
      registerStep2Schema
    )
    if (!result.valid) {
      errors.commercialRegister = result.errors.commercialRegister ?? ''
      return
    }
    if (loading.value) return
    errors.commercialRegister = ''

    loading.value = true
    try {
      draftStore.saveStep2({
        bankName: formStep2.bankName,
        bankAccountName: formStep2.bankAccountName,
        iban: formStep2.iban,
        commercialRegisterFileName: formStep2.commercialRegisterFile?.name ?? '',
      })
      step.value = 3
      otp.value = ''
      await nextTick()
      focusFirstOtpInput()
    } finally {
      loading.value = false
    }
  }

  return {
    step,
    form,
    formStep2,
    errors,
    loading,
    showRegisterModal,
    registerModalState,
    closeRegisterModal,
    commercialRegisterFileName,
    logoPreviewUrl,
    onLogoChange,
    otp,
    otpContainerRef,
    OTP_LENGTH,
    formattedPhone,
    resendCountdown,
    resendCountdownFormatted,
    onSubmit,
    goBackToStep1,
    goBackToStep2,
    onFileChange,
    onSubmitStep2,
    setOtpDigit,
    onOtpKeydown,
    onOtpPaste,
    onOtpVerify,
    onResendCode,
  }
}

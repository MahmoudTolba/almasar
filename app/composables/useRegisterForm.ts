export const useRegisterForm = () => {
  const { t } = useI18n()

  const step = ref(1)

  const form = reactive({
    officeName: '',
    officialEmail: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    description: '',
  })

  const formStep2 = reactive({
    commercialRegisterFile: null as File | null,
    bankName: '',
    bankAccountName: '',
    iban: '',
  })

  const errors = reactive({
    officeName: '',
    officialEmail: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    description: '',
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

  const clearErrors = () => {
    errors.officeName = ''
    errors.officialEmail = ''
    errors.phone = ''
    errors.address = ''
    errors.password = ''
    errors.confirmPassword = ''
    errors.description = ''
    errors.commercialRegister = ''
  }

  const validate = (): boolean => {
    clearErrors()
    let valid = true

    if (!form.officeName.trim()) {
      errors.officeName = t('register.validation.officeNameRequired')
      valid = false
    }

    if (form.officialEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.officialEmail)) {
      errors.officialEmail = t('register.validation.emailInvalid')
      valid = false
    }

    if (!form.phone.trim()) {
      errors.phone = t('register.validation.phoneRequired')
      valid = false
    }

    if (!form.address.trim()) {
      errors.address = t('register.validation.addressRequired')
      valid = false
    }

    if (!form.password) {
      errors.password = t('register.validation.passwordRequired')
      valid = false
    } else if (form.password.length < 8) {
      errors.password = t('register.validation.passwordMin')
      valid = false
    }

    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = t('register.validation.passwordMismatch')
      valid = false
    }

    return valid
  }

  const validateStep2 = (): boolean => {
    errors.commercialRegister = ''
    if (!formStep2.commercialRegisterFile) {
      errors.commercialRegister = t('profile.validation.commercialRegisterRequired')
      return false
    }
    return true
  }

  const onSubmit = async (): Promise<void> => {
    if (!validate() || loading.value) return
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
    if (!validateStep2() || loading.value) return

    loading.value = true
    try {
      // TODO: Call registration API with combined data
      const payload = {
        ...form,
        commercialRegisterFile: formStep2.commercialRegisterFile,
        bankName: formStep2.bankName,
        bankAccountName: formStep2.bankAccountName,
        iban: formStep2.iban,
      }
      console.log('Register (complete)', payload)
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
    otp,
    otpContainerRef,
    OTP_LENGTH,
    formattedPhone,
    resendCountdown,
    resendCountdownFormatted,
    validate,
    onSubmit,
    validateStep2,
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

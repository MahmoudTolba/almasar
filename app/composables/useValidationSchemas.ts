import type { Schema } from 'yup'
import * as yup from 'yup'
import { parseE164 } from '~/data/countries'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_LOGO_SIZE_BYTES = 500 * 1024
const CONTACT_BODY_MIN_LENGTH = 10

export type ValidateResult<T = unknown> =
  | { valid: true; data: T }
  | { valid: false; errors: Record<string, string> }

export function validateForm<T>(
  values: unknown,
  schema: Schema<T>
): ValidateResult<T> {
  try {
    const data = schema.validateSync(values, { abortEarly: false }) as T
    return { valid: true, data }
  } catch (err: unknown) {
    const errors: Record<string, string> = {}
    if (err && typeof err === 'object' && 'inner' in err && Array.isArray((err as { inner: unknown[] }).inner)) {
      for (const e of (err as { inner: Array<{ path?: string; message: string }> }).inner) {
        const path = e.path ?? 'unknown'
        if (!errors[path]) {
          errors[path] = e.message
        }
      }
    } else if (err && typeof err === 'object' && 'path' in err && 'message' in err) {
      const e = err as { path?: string; message: string }
      errors[e.path ?? 'unknown'] = e.message
    }
    return { valid: false, errors }
  }
}

export function useValidationSchemas() {
  const { t } = useI18n()

  const phoneSchema = (requiredKey: string, invalidKey: string) =>
    yup
      .string()
      .required(() => t(requiredKey))
      .test('phone-format', () => t(invalidKey), (value) => {
        if (!value?.trim()) return false
        return !!parseE164(value.trim())
      })

  const optionalEmailSchema = (invalidKey: string) =>
    yup
      .string()
      .transform((v) => (v?.trim() ? v.trim() : undefined))
      .optional()
      .test('email-format', () => t(invalidKey), (value) => {
        if (!value) return true
        return EMAIL_REGEX.test(value)
      })

  const passwordSchema = (requiredKey: string, minKey: string) =>
    yup
      .string()
      .required(() => t(requiredKey))
      .min(8, () => t(minKey))

  const loginSchema = yup.object({
    phone: phoneSchema('login.validation.phoneRequired', 'register.validation.phoneInvalid'),
    password: yup.string().required(() => t('login.validation.passwordRequired')),
  })

  const forgotPasswordPhoneSchema = yup.object({
    phone: phoneSchema('login.validation.phoneRequired', 'register.validation.phoneInvalid'),
  })

  const changePasswordSchema = (options?: { requiresOldPassword: boolean }) =>
    yup.object({
      ...(options?.requiresOldPassword
        ? {
            oldPassword: yup.string().required(() => t('changePassword.required')),
          }
        : {}),
      newPassword: passwordSchema('changePassword.required', 'register.validation.passwordMin'),
      confirmNewPassword: yup
        .string()
        .required(() => t('changePassword.required'))
        .oneOf([yup.ref('newPassword')], () => t('changePassword.passwordMismatch')),
    })

  const registerStep1Schema = yup.object({
    officeName: yup.string().trim().required(() => t('register.validation.officeNameRequired')),
    officialEmail: optionalEmailSchema('register.validation.emailInvalid'),
    phone: phoneSchema('register.validation.phoneRequired', 'register.validation.phoneInvalid'),
    address: yup.string().trim().required(() => t('register.validation.addressRequired')),
    password: passwordSchema('register.validation.passwordRequired', 'register.validation.passwordMin'),
    confirmPassword: yup
      .string()
      .required(() => t('register.validation.passwordRequired'))
      .oneOf([yup.ref('password')], () => t('register.validation.passwordMismatch')),
    description: yup.string().optional(),
  })

  const registerStep2Schema = yup.object({
    commercialRegister: yup
      .mixed<File | null>()
      .required(() => t('profile.validation.commercialRegisterRequired'))
      .test('is-file', () => t('profile.validation.commercialRegisterRequired'), (value) => {
        return value instanceof File
      }),
  })

  const profileSchema = (options?: { requiresCommercialRegister: boolean }) =>
    yup.object({
      officeName: yup.string().trim().required(() => t('profile.validation.officeNameRequired')),
      officialEmail: optionalEmailSchema('profile.validation.emailInvalid'),
      address: yup.string().trim().required(() => t('profile.validation.addressRequired')),
      description: yup.string().optional(),
      ...(options?.requiresCommercialRegister
        ? {
            commercialRegister: yup
              .mixed<File | null>()
              .required(() => t('profile.validation.commercialRegisterRequired'))
              .test('is-file', () => t('profile.validation.commercialRegisterRequired'), (value) => {
                return value instanceof File
              }),
          }
        : { commercialRegister: yup.mixed<File | null>().optional().nullable() }),
      logo: yup
        .mixed<File | null>()
        .optional()
        .nullable()
        .test('logo-type', () => t('profile.validation.logoInvalidType'), (value) => {
          if (!value) return true
          if (!(value instanceof File)) return true
          return /^image\/(png|jpeg)$/.test(value.type)
        })
        .test('logo-size', () => t('profile.validation.logoTooLarge'), (value) => {
          if (!value) return true
          if (!(value instanceof File)) return true
          return value.size <= MAX_LOGO_SIZE_BYTES
        }),
    })

  const contactMessageSchema = yup.object({
    body: yup
      .string()
      .trim()
      .required(() => t('contact.validation.bodyRequired'))
      .min(CONTACT_BODY_MIN_LENGTH, () => t('contact.validation.bodyMinLength')),
  })

  return {
    validateForm,
    loginSchema,
    forgotPasswordPhoneSchema,
    changePasswordSchema,
    registerStep1Schema,
    registerStep2Schema,
    profileSchema,
    contactMessageSchema,
  }
}

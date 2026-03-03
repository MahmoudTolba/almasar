import { defineStore } from 'pinia'

const STORAGE_KEY = 'almasar-registration-draft'

export interface Step1Draft {
  officeName: string
  officialEmail: string
  phone: string
  address: string
  password: string
  confirmPassword: string
  description: string
  logoPreviewUrl?: string
}

export interface Step2Draft {
  bankName: string
  bankAccountName: string
  iban: string
  commercialRegisterFileName: string
}

interface DraftState {
  step: number
  step1: Step1Draft | null
  step2: Step2Draft | null
}

const emptyStep1: Step1Draft = {
  officeName: '',
  officialEmail: '',
  phone: '',
  address: '',
  password: '',
  confirmPassword: '',
  description: '',
  logoPreviewUrl: '',
}

const emptyStep2: Step2Draft = {
  bankName: '',
  bankAccountName: '',
  iban: '',
  commercialRegisterFileName: '',
}

function loadFromStorage(): DraftState {
  if (import.meta.client) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as DraftState
        if (parsed && typeof parsed.step === 'number') {
          return {
            step: parsed.step,
            step1: parsed.step1 && typeof parsed.step1 === 'object' ? parsed.step1 : null,
            step2: parsed.step2 && typeof parsed.step2 === 'object' ? parsed.step2 : null,
          }
        }
      }
    } catch {
      // ignore parse errors
    }
  }
  return { step: 1, step1: null, step2: null }
}

function saveToStorage(state: DraftState) {
  if (import.meta.client) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }
}

export const useRegistrationDraftStore = defineStore('registrationDraft', {
  state: (): DraftState => loadFromStorage(),

  actions: {
    saveStep1(data: Step1Draft) {
      this.step = 2
      this.step1 = { ...emptyStep1, ...data }
      saveToStorage(this.$state)
    },

    saveStep2(data: Step2Draft) {
      this.step = 3
      this.step2 = { ...emptyStep2, ...data }
      saveToStorage(this.$state)
    },

    load(): DraftState {
      const loaded = loadFromStorage()
      this.step = loaded.step
      this.step1 = loaded.step1
      this.step2 = loaded.step2
      return loaded
    },

    clear() {
      this.step = 1
      this.step1 = null
      this.step2 = null
      if (import.meta.client) {
        localStorage.removeItem(STORAGE_KEY)
      }
    },
  },
})

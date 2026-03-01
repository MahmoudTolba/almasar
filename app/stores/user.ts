import { defineStore } from 'pinia'
import { normalizePhoneToE164 } from '~/data/countries'

const STORAGE_KEY = 'almasar-users'

export interface UserProfile {
  id?: string
  officeName: string
  officialEmail: string
  phone: string
  address: string
  description: string
  password: string
  avatarUrl: string
  bankName: string
  bankAccountName: string
  iban: string
  commercialRegisterFileName: string
}

interface UsersState {
  /** Map of phone (E.164) -> profile for registered users */
  users: Record<string, UserProfile>
}

function loadFromStorage(): UsersState {
  if (import.meta.client) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as UsersState
        if (parsed?.users && typeof parsed.users === 'object') {
          return { users: parsed.users }
        }
      }
    } catch {
      // ignore parse errors
    }
  }
  return { users: {} }
}

function saveToStorage(state: UsersState) {
  if (import.meta.client) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }
}

export const useUserStore = defineStore('user', {
  state: (): UsersState => loadFromStorage(),

  getters: {
    getUserByPhone: (state) => (phone: string) => {
      const normalized = normalizePhoneToE164(phone)
      if (!normalized) return null
      const trimmed = (phone || '').trim()
      return state.users[normalized] ?? (trimmed ? state.users[trimmed] ?? null : null)
    },
  },

  actions: {
    registerUser(profile: UserProfile) {
      const phone = normalizePhoneToE164(profile.phone || '')
      if (!phone) return null

      const user: UserProfile = {
        id: profile.id ?? `user-${Date.now()}`,
        officeName: profile.officeName ?? '',
        officialEmail: profile.officialEmail ?? '',
        phone,
        address: profile.address ?? '',
        description: profile.description ?? '',
        password: profile.password ?? '',
        avatarUrl: profile.avatarUrl ?? '',
        bankName: profile.bankName ?? '',
        bankAccountName: profile.bankAccountName ?? '',
        iban: profile.iban ?? '',
        commercialRegisterFileName: profile.commercialRegisterFileName ?? '',
      }

      this.users = { ...this.users, [phone]: user }
      saveToStorage(this.$state)
      return user
    },

    updateProfile(phone: string, updates: Partial<UserProfile>) {
      const existing = this.users[phone]
      if (!existing) return null

      const updated: UserProfile = { ...existing, ...updates }
      this.users = { ...this.users, [phone]: updated }
      saveToStorage(this.$state)
      return updated
    },
  },
})

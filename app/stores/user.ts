import { defineStore } from 'pinia'
import { normalizePhoneToE164 } from '~/data/countries'

const STORAGE_KEY = 'almasar-users'
const USERS_COOKIE = 'almasar-users'

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

function saveToCookie(state: UsersState) {
  try {
    const cookie = useCookie(USERS_COOKIE, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    })
    const slim = { users: state.users }
    const json = JSON.stringify(slim)
    if (json.length > 4000) return
    cookie.value = json
  } catch {
    // ignore - cookie may exceed size limit
  }
}

function loadFromCookie(): UsersState {
  try {
    const cookie = useCookie(USERS_COOKIE)
    const stored = cookie.value
    if (stored && typeof stored === 'string') {
      const parsed = JSON.parse(stored) as UsersState
      if (parsed?.users && typeof parsed.users === 'object') {
        return { users: parsed.users }
      }
    }
  } catch {
    // ignore parse errors
  }
  return { users: {} }
}

export const useUserStore = defineStore('user', {
  state: (): UsersState => ({ users: {} }),

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
      saveToCookie(this.$state)
      return user
    },

    updateProfile(phone: string, updates: Partial<UserProfile>) {
      const existing = this.users[phone]
      if (!existing) return null

      const updated: UserProfile = { ...existing, ...updates }
      this.users = { ...this.users, [phone]: updated }
      saveToStorage(this.$state)
      saveToCookie(this.$state)
      return updated
    },

    deleteUser(phone: string): boolean {
      const user = this.getUserByPhone(phone)
      if (!user) return false
      const key = user.phone
      const { [key]: _, ...rest } = this.users
      this.users = rest
      saveToStorage(this.$state)
      saveToCookie(this.$state)
      return true
    },

    hydrateFromCookie() {
      if (import.meta.client) {
        const fromStorage = loadFromStorage()
        if (Object.keys(fromStorage.users).length > 0) {
          this.users = fromStorage.users
          return
        }
      }
      const fromCookie = loadFromCookie()
      if (Object.keys(fromCookie.users).length > 0) {
        this.users = fromCookie.users
      }
    },
  },
})

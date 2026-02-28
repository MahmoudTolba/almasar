import { defineStore } from 'pinia'

const STORAGE_KEY = 'almasar-auth'

export interface AuthUser {
  id?: string
  phone?: string
  name?: string
}

interface AuthState {
  isAuthenticated: boolean
  user: AuthUser | null
}

function loadFromStorage(): AuthState {
  if (import.meta.client) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as AuthState
        if (parsed.isAuthenticated) {
          return { isAuthenticated: true, user: parsed.user ?? null }
        }
      }
    } catch {
      // ignore parse errors
    }
  }
  return { isAuthenticated: false, user: null }
}

function saveToStorage(state: AuthState) {
  if (import.meta.client) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => loadFromStorage(),

  actions: {
    login(user?: AuthUser) {
      this.isAuthenticated = true
      this.user = user ?? null
      saveToStorage({ isAuthenticated: true, user: this.user })
    },

    logout() {
      this.isAuthenticated = false
      this.user = null
      saveToStorage({ isAuthenticated: false, user: null })
    },

    setUser(user: AuthUser | null) {
      this.user = user
      if (this.isAuthenticated) {
        saveToStorage({ isAuthenticated: true, user: this.user })
      }
    },
  },
})

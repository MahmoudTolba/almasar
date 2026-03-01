import { defineStore } from 'pinia'
import type { UserProfile } from './user'

const STORAGE_KEY = 'almasar-auth'
const AUTH_COOKIE = 'almasar-auth'

export type AuthUser = UserProfile

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

function saveToCookie(state: AuthState) {
  const cookie = useCookie(AUTH_COOKIE, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: 'lax',
  })
  cookie.value = JSON.stringify(state)
}

function loadFromCookie(): AuthState {
  try {
    const cookie = useCookie(AUTH_COOKIE)
    const stored = cookie.value
    if (stored && typeof stored === 'string') {
      const parsed = JSON.parse(stored) as AuthState
      if (parsed.isAuthenticated) {
        return { isAuthenticated: true, user: parsed.user ?? null }
      }
    }
  } catch {
    // ignore parse errors
  }
  return { isAuthenticated: false, user: null }
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    user: null,
  }),

  actions: {
    login(user?: AuthUser) {
      this.isAuthenticated = true
      this.user = user ?? null
      const state = { isAuthenticated: true, user: this.user }
      saveToStorage(state)
      saveToCookie(state)
    },

    logout() {
      this.isAuthenticated = false
      this.user = null
      const state = { isAuthenticated: false, user: null }
      saveToStorage(state)
      saveToCookie(state)
    },

    setUser(user: AuthUser | null) {
      this.user = user
      if (this.isAuthenticated) {
        const state = { isAuthenticated: true, user: this.user }
        saveToStorage(state)
        saveToCookie(state)
      }
    },

    hydrateFromCookie() {
      if (import.meta.client) {
        const fromStorage = loadFromStorage()
        if (fromStorage.isAuthenticated) {
          this.isAuthenticated = true
          this.user = fromStorage.user
          return
        }
      }
      const fromCookie = loadFromCookie()
      if (fromCookie.isAuthenticated) {
        this.isAuthenticated = true
        this.user = fromCookie.user
      }
    },
  },
})




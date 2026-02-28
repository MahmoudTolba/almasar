import { useAuthStore } from '~/stores/auth'
import type { AuthUser } from '~/stores/auth'

export function useAuth() {
  const authStore = useAuthStore()

  return {
    isAuthenticated: computed(() => authStore.isAuthenticated),
    user: computed(() => authStore.user),
    login: (user?: AuthUser) => authStore.login(user),
    logout: () => authStore.logout(),
    setUser: (user: AuthUser | null) => authStore.setUser(user),
  }
}

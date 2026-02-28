import { useAuthStore } from '~/stores/auth'

const PUBLIC_ROUTES = ['/login', '/register']

export default defineNuxtRouteMiddleware((to) => {
  const localePath = useLocalePath()
  const authStore = useAuthStore()

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => to.path === route || to.path.startsWith(`${route}/`)
  )

  if (!authStore.isAuthenticated) {
    if (isPublicRoute) return
    return navigateTo(localePath('/login'))
  }

  if (isPublicRoute) {
    return navigateTo(localePath('/'))
  }
})

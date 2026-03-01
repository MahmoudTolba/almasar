export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  const userStore = useUserStore()
  authStore.hydrateFromCookie()
  userStore.hydrateFromCookie()
})

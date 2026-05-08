export default defineNuxtRouteMiddleware((to) => {
  if (!to.path.startsWith('/account')) return

  const authStore = useAuthStore()

  if (!authStore.authenticated()) {
    return navigateTo({
      path: '/auth/login',
      query: { message: 'Please sign in to continue.' },
    })
  }
})

export default defineNuxtRouteMiddleware(async (to) => {
  const { authState, isLogin, fetchSession } = useAuth()

  // Initialize session state on first request/navigation
  if (!authState.value.isInitialized) {
    await fetchSession()
  }

  const isAdminRoute = to.path.startsWith('/admin')
  const isLoginPage = to.path === '/admin/login'

  if (isAdminRoute) {
    if (isLoginPage) {
      if (isLogin.value) {
        return navigateTo('/admin')
      }
    } else {
      if (!isLogin.value) {
        return navigateTo('/admin/login')
      }
    }
  }
})

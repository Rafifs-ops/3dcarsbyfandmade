import { ref, computed } from 'vue'

export interface AuthUser {
  id: string
  username: string
  name: string
  role: string
  isLogin: boolean
}

export interface AuthState {
  user: AuthUser | null
  isLogin: boolean
  isInitialized: boolean
}

export const useAuth = () => {
  const authState = useState<AuthState>('cars_auth_state', () => ({
    user: null,
    isLogin: false,
    isInitialized: false,
  }))

  const isLoading = ref(false)
  const errorMsg = ref<string | null>(null)

  const isLogin = computed(() => authState.value.isLogin)
  const user = computed(() => authState.value.user)

  // Fetch session from server (uses httpOnly cookies automatically)
  const fetchSession = async () => {
    try {
      isLoading.value = true
      const headers = useRequestHeaders(['cookie'])
      const response = await $fetch<{ isLogin: boolean; user: AuthUser | null }>('/api/auth/session', {
        headers
      })

      if (response && response.isLogin && response.user) {
        authState.value = {
          user: response.user,
          isLogin: true,
          isInitialized: true
        }
      } else {
        authState.value = {
          user: null,
          isLogin: false,
          isInitialized: true
        }
      }
      return authState.value
    } catch (err: any) {
      console.error('Error checking auth session:', err)
      authState.value = {
        user: null,
        isLogin: false,
        isInitialized: true
      }
      return authState.value
    } finally {
      isLoading.value = false
    }
  }

  // Login action
  const login = async (username: string, password: string) => {
    try {
      isLoading.value = true
      errorMsg.value = null

      const response = await $fetch<{ success: boolean; message: string; user: AuthUser }>('/api/auth/login', {
        method: 'POST',
        body: { username, password }
      })

      if (response.success && response.user) {
        // Fetch fresh session to confirm cookies and state
        await fetchSession()
        await navigateTo('/admin')
        return { success: true }
      }

      throw new Error(response.message || 'Login gagal.')
    } catch (err: any) {
      const msg = err?.data?.statusMessage || err?.message || 'Login gagal. Silakan periksa kembali data Anda.'
      errorMsg.value = msg
      return { success: false, error: msg }
    } finally {
      isLoading.value = false
    }
  }

  // Logout action
  const logout = async () => {
    try {
      isLoading.value = true
      await $fetch('/api/auth/logout', { method: 'POST' })
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      authState.value = {
        user: null,
        isLogin: false,
        isInitialized: true
      }
      isLoading.value = false
      await navigateTo('/admin/login')
    }
  }

  return {
    authState,
    user,
    isLogin,
    isLoading,
    errorMsg,
    fetchSession,
    login,
    logout
  }
}

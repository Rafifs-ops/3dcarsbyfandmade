<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-asphalt-grid relative overflow-hidden font-inter">
    <!-- Ambient Glow effects -->
    <div
      class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-rust-red/15 rounded-full blur-3xl pointer-events-none" />
    <div
      class="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-lightning-yellow/10 rounded-full blur-3xl pointer-events-none" />

    <!-- Login Container Card -->
    <div
      class="relative z-10 w-full max-w-md bg-carbon-gray border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">

      <!-- Top Branding -->
      <div class="text-center space-y-2">
        <img src="/logo.png" alt="Cars CMS Logo" class="h-24 w-auto mx-auto">
      </div>

      <!-- Error Alert -->
      <div v-if="errorMessage"
        class="p-3 rounded-xl bg-rust-red/20 border border-rust-red/40 text-rust-red-light text-xs font-chakra flex items-center gap-2 animate-shake">
        <BootstrapIcon name="exclamation-octagon-fill" class="text-base flex-shrink-0" />
        <span>{{ errorMessage }}</span>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-4 font-chakra text-xs">

        <!-- Username Field -->
        <div class="space-y-1.5">
          <label class="block text-muted-silver uppercase tracking-wider font-bold">
            Username / Email Admin
          </label>
          <div class="relative flex items-center">
            <span class="absolute left-3.5 text-muted-silver">
              <BootstrapIcon name="person-fill" />
            </span>
            <input v-model="form.username" type="text" required autocomplete="username" placeholder="admin"
              class="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-lightning-yellow/70 transition-all font-mono text-sm" />
          </div>
        </div>

        <!-- Password Field -->
        <div class="space-y-1.5">
          <label class="block text-muted-silver uppercase tracking-wider font-bold">
            Kata Sandi (Password)
          </label>
          <div class="relative flex items-center">
            <span class="absolute left-3.5 text-muted-silver">
              <BootstrapIcon name="key-fill" />
            </span>
            <input v-model="form.password" :type="showPassword ? 'text' : 'password'" required
              autocomplete="current-password" placeholder="••••••••"
              class="w-full pl-10 pr-10 py-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-lightning-yellow/70 transition-all font-mono text-sm" />
            <button type="button" @click="showPassword = !showPassword"
              class="absolute right-3 text-muted-silver hover:text-white transition-colors">
              <BootstrapIcon :name="showPassword ? 'eye-slash-fill' : 'eye-fill'" />
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" :disabled="isLoading"
          class="btn-racing-skew w-full py-3.5 rounded-xl bg-gradient-to-r from-rust-red to-rust-red-dark hover:from-rust-red-light text-white font-chakra font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(225,29,42,0.5)] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
          <BootstrapIcon v-if="isLoading" name="arrow-repeat" class="animate-spin text-lg" />
          <BootstrapIcon v-else name="box-arrow-in-right" class="text-lightning-yellow text-lg" />
          <span>{{ isLoading ? 'Memvalidasi Sesi...' : 'Masuk ke CMS' }}</span>
        </button>

      </form>

      <!-- Back to Home -->
      <div class="text-center pt-2 border-t border-white/10">
        <NuxtLink to="/"
          class="inline-flex items-center gap-2 text-xs font-chakra text-muted-silver hover:text-lightning-yellow transition-colors">
          <BootstrapIcon name="arrow-left" />
          <span>Kembali ke Website Utama</span>
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

definePageMeta({
  layout: false
})

const { login, isLoading } = useAuth()
const { success } = useToast()

const form = reactive({
  username: '',
  password: ''
})

const showPassword = ref(false)
const errorMessage = ref<string | null>(null)

const fillDefault = () => {
  form.username = 'admin'
  form.password = 'admin123'
}

const handleLogin = async () => {
  errorMessage.value = null
  const result = await login(form.username, form.password)
  if (!result.success) {
    errorMessage.value = result.error || 'Username atau password salah.'
  } else {
    success('Login Berhasil', 'Selamat datang di Admin Control Panel Disney Pixar Cars!')
  }
}

useSeoMeta({
  title: 'Admin Login - Disney Pixar Cars CMS'
})
</script>

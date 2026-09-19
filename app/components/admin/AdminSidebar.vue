<template>
  <aside
    class="fixed inset-y-0 left-0 z-50 w-64 bg-carbon-dark border-r border-white/10 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'">
    <div>
      <!-- Brand Logo Header -->
      <div class="h-16 px-5 flex items-center justify-between md:justify-center border-b border-white/10 bg-black/30">
        <NuxtLink to="/admin" class="flex items-center gap-3 group">
          <img src="/logo.png" alt="Cars CMS Logo" class="h-12 w-auto">
        </NuxtLink>

        <!-- Close button on Mobile -->
        <button @click="$emit('close')" class="lg:hidden text-muted-silver hover:text-white p-1">
          <BootstrapIcon name="x-lg" />
        </button>
      </div>

      <!-- Navigation Links -->
      <nav class="p-3 space-y-1.5 font-chakra text-xs">
        <NuxtLink v-for="item in navItems" :key="item.path" :to="item.path" @click="$emit('close')"
          class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold transition-all group" :class="isActive(item.path)
            ? 'bg-gradient-to-r from-rust-red/90 to-rust-red-dark text-white shadow-md shadow-rust-red/20 font-bold border border-rust-red/40'
            : 'text-muted-silver hover:text-white hover:bg-white/5'">
          <BootstrapIcon :name="item.icon" class="text-base transition-transform group-hover:scale-110"
            :class="isActive(item.path) ? 'text-lightning-yellow' : 'text-muted-silver group-hover:text-lightning-yellow'" />
          <span class="flex-grow">{{ item.label }}</span>
          <span v-if="isActive(item.path)" class="w-1.5 h-1.5 rounded-full bg-lightning-yellow animate-pulse" />
        </NuxtLink>
      </nav>
    </div>

    <!-- Bottom Actions -->
    <div class="p-3 border-t border-white/10 bg-black/40 space-y-2">
      <!-- Public Site Link -->
      <NuxtLink to="/" target="_blank"
        class="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-chakra text-muted-silver hover:text-white hover:bg-white/5 border border-white/5 transition-all">
        <div class="flex items-center gap-2">
          <BootstrapIcon name="box-arrow-up-right" class="text-dinoco-blue" />
          <span>Lihat Website Publik</span>
        </div>
        <BootstrapIcon name="chevron-right" class="text-[10px]" />
      </NuxtLink>

      <!-- Logout Button -->
      <button @click="handleLogout"
        class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-chakra font-bold text-rust-red-light hover:text-white bg-rust-red/10 hover:bg-rust-red/30 border border-rust-red/20 hover:border-rust-red/50 transition-all">
        <div class="flex items-center gap-2">
          <BootstrapIcon name="box-arrow-left" class="text-sm" />
          <span>Keluar (Logout)</span>
        </div>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  (e: 'close'): void
}>()

const route = useRoute()
const { logout } = useAuth()
const { success } = useToast()

interface NavItem {
  label: string
  path: string
  icon: any
}

const navItems: NavItem[] = [
  { label: 'Dashboard Overview', path: '/admin', icon: 'grid-1x2-fill' },
  { label: 'News', path: '/admin/news', icon: 'newspaper' },
  { label: 'Characters', path: '/admin/characters', icon: 'car-front-fill' },
  { label: 'Tracks', path: '/admin/tracks', icon: 'flag-fill' },
  { label: 'Games', path: '/admin/specs', icon: 'cpu-fill' },
  { label: 'Video Gameplay', path: '/admin/gameplay', icon: 'play-btn-fill' }
]

const isActive = (path: string) => {
  if (path === '/admin') {
    return route.path === '/admin'
  }
  return route.path.startsWith(path)
}

const handleLogout = async () => {
  await logout()
  success('Logout Berhasil', 'Anda telah keluar dari Admin Panel.')
}
</script>

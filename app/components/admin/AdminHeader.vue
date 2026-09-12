<template>
  <header class="h-16 px-4 sm:px-8 bg-carbon-dark/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between sticky top-0 z-40">
    <div class="flex items-center gap-3">
      <!-- Mobile menu hamburger -->
      <button
        @click="$emit('toggleSidebar')"
        class="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
        aria-label="Toggle Navigation"
      >
        <BootstrapIcon name="list" class="text-xl" />
      </button>

      <!-- Breadcrumbs / Page Title Context -->
      <div class="flex items-center gap-2 text-xs font-chakra">
        <NuxtLink to="/admin" class="text-muted-silver hover:text-white transition-colors">
          Admin Panel
        </NuxtLink>
        <BootstrapIcon name="chevron-right" class="text-[10px] text-muted-silver" />
        <span class="text-lightning-yellow font-bold uppercase tracking-wider">{{ currentPageName }}</span>
      </div>
    </div>

    <!-- Admin User Info & Status -->
    <div class="flex items-center gap-4">
      <div class="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-xs font-chakra">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span class="text-muted-silver">Turso LibSQL SQLite Connected</span>
      </div>

      <div class="flex items-center gap-3 pl-3 border-l border-white/10">
        <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-rust-red to-lightning-yellow flex items-center justify-center text-white font-bold font-chakra text-xs shadow-md">
          {{ user?.name ? user.name.charAt(0).toUpperCase() : 'A' }}
        </div>
        <div class="hidden sm:block text-left">
          <p class="text-xs font-chakra font-bold text-white leading-tight">{{ user?.name || 'Administrator' }}</p>
          <p class="text-[10px] font-chakra text-muted-silver uppercase leading-tight">@{{ user?.username || 'admin' }}</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

defineEmits<{
  (e: 'toggleSidebar'): void
}>()

const route = useRoute()
const { user } = useAuth()

const currentPageName = computed(() => {
  const path = route.path
  if (path === '/admin') return 'Dashboard Overview'
  if (path.startsWith('/admin/news')) return 'Berita (News)'
  if (path.startsWith('/admin/characters')) return 'Karakter (Characters)'
  if (path.startsWith('/admin/tracks')) return 'Sirkuit (Tracks)'
  if (path.startsWith('/admin/specs')) return 'Game Specs'
  if (path.startsWith('/admin/gameplay')) return 'Gameplay Videos'
  return 'Admin'
})
</script>

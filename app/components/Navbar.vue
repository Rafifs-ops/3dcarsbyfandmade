<template>
  <header class="fixed top-0 inset-x-0 z-50 transition-all duration-300" :class="isScrolled || isMobileMenuOpen
    ? 'bg-asphalt-black/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20'
    : 'bg-transparent backdrop-blur-none border-b border-transparent shadow-none'">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <!-- Brand Logo -->
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <!-- Rust-eze Badge Icon -->
        <img src="/logo.png" alt="Logo" class="h-16 w-auto">
      </NuxtLink>

      <!-- Desktop Navigation Links -->
      <nav class="hidden md:flex items-center gap-1 lg:gap-2">
        <NuxtLink to="/" class="px-3.5 py-2 rounded-lg text-sm font-chakra font-medium tracking-wide transition-all"
          :class="$route.path === '/' ? 'text-lightning-yellow bg-white/5 shadow-[inset_0_-2px_0_#FFC700]' : 'text-muted-silver hover:text-white hover:bg-white/5'">
          <BootstrapIcon name="speedometer2" class="mr-1.5 text-xs text-rust-red" />
          Home
        </NuxtLink>

        <NuxtLink to="/characters"
          class="px-3.5 py-2 rounded-lg text-sm font-chakra font-medium tracking-wide transition-all"
          :class="$route.path.startsWith('/characters') ? 'text-lightning-yellow bg-white/5 shadow-[inset_0_-2px_0_#FFC700]' : 'text-muted-silver hover:text-white hover:bg-white/5'">
          <BootstrapIcon name="people-fill" class="mr-1.5 text-xs text-dinoco-blue" />
          Characters
        </NuxtLink>

        <NuxtLink to="/gameplay"
          class="px-3.5 py-2 rounded-lg text-sm font-chakra font-medium tracking-wide transition-all"
          :class="$route.path === '/gameplay' ? 'text-lightning-yellow bg-white/5 shadow-[inset_0_-2px_0_#FFC700]' : 'text-muted-silver hover:text-white hover:bg-white/5'">
          <BootstrapIcon name="play-btn-fill" class="mr-1.5 text-xs text-rust-red" />
          Gameplay
        </NuxtLink>

        <NuxtLink to="/news" class="px-3.5 py-2 rounded-lg text-sm font-chakra font-medium tracking-wide transition-all"
          :class="$route.path.startsWith('/news') ? 'text-lightning-yellow bg-white/5 shadow-[inset_0_-2px_0_#FFC700]' : 'text-muted-silver hover:text-white hover:bg-white/5'">
          <BootstrapIcon name="newspaper" class="mr-1.5 text-xs text-lightning-yellow" />
          News
        </NuxtLink>

        <NuxtLink to="/identity"
          class="px-3.5 py-2 rounded-lg text-sm font-chakra font-medium tracking-wide transition-all"
          :class="$route.path === '/identity' ? 'text-lightning-yellow bg-white/5 shadow-[inset_0_-2px_0_#FFC700]' : 'text-muted-silver hover:text-white hover:bg-white/5'">
          <BootstrapIcon name="controller" class="mr-1.5 text-xs text-dinoco-blue" />
          Games
        </NuxtLink>
      </nav>

      <!-- Right Header Actions (Audio Mute Toggle & Steam CTA) -->
      <div class="hidden lg:flex items-center gap-3">
        <!-- Audio Mute Toggle Button -->
        <button @click="toggleMute"
          class="p-2.5 rounded-xl bg-carbon-gray hover:bg-carbon-gray-light text-muted-silver hover:text-white border border-white/10 transition-all text-sm flex items-center justify-center"
          :title="isMuted ? 'Unmute Audio' : 'Mute Audio'">
          <BootstrapIcon :name="isMuted ? 'volume-mute-fill' : 'volume-up-fill'"
            :class="isMuted ? 'text-rust-red' : 'text-lightning-yellow'" />
        </button>

        <!-- Steam Download CTA Button -->
        <a href="https://store.steampowered.com/app/301760/DisneyPixar_Cars_2/" target="_blank"
          rel="noopener noreferrer"
          class="btn-racing-skew px-5 py-2.5 rounded bg-gradient-to-r from-rust-red via-rust-red to-rust-red-dark text-pure-white text-xs font-chakra font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(225,29,42,0.4)] hover:shadow-rust-red/70 border border-rust-red-light/40 flex items-center gap-2">
          <BootstrapIcon name="steam" class="text-base" />
          <span>Play on Steam</span>
        </a>
      </div>

      <!-- Mobile Hamburger Button -->
      <div class="flex md:hidden items-center gap-2">
        <button @click="toggleMute" class="p-2 rounded-lg bg-carbon-gray text-muted-silver text-sm">
          <BootstrapIcon :name="isMuted ? 'volume-mute-fill' : 'volume-up-fill'"
            :class="isMuted ? 'text-rust-red' : 'text-lightning-yellow'" />
        </button>

        <button @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="p-2.5 rounded-xl bg-carbon-gray text-pure-white border border-white/10 text-lg"
          aria-label="Toggle navigation menu">
          <BootstrapIcon :name="isMobileMenuOpen ? 'x-lg' : 'list'" />
        </button>
      </div>

    </div>

    <!-- Mobile Drawer Menu -->
    <div v-if="isMobileMenuOpen"
      class="md:hidden bg-asphalt-black/95 border-b border-white/10 px-4 pt-3 pb-6 flex flex-col gap-2 backdrop-blur-xl animate-fadeIn">
      <NuxtLink to="/" @click="isMobileMenuOpen = false"
        class="px-4 py-3 rounded-lg text-sm font-chakra font-medium tracking-wide flex items-center gap-2"
        :class="$route.path === '/' ? 'text-lightning-yellow bg-white/10' : 'text-muted-silver hover:bg-white/5'">
        <BootstrapIcon name="speedometer2" class="text-rust-red" />
        Showroom 3D
      </NuxtLink>

      <NuxtLink to="/characters" @click="isMobileMenuOpen = false"
        class="px-4 py-3 rounded-lg text-sm font-chakra font-medium tracking-wide flex items-center gap-2"
        :class="$route.path.startsWith('/characters') ? 'text-lightning-yellow bg-white/10' : 'text-muted-silver hover:bg-white/5'">
        <BootstrapIcon name="people-fill" class="text-dinoco-blue" />
        Characters Roster (20+)
      </NuxtLink>

      <NuxtLink to="/gameplay" @click="isMobileMenuOpen = false"
        class="px-4 py-3 rounded-lg text-sm font-chakra font-medium tracking-wide flex items-center gap-2"
        :class="$route.path === '/gameplay' ? 'text-lightning-yellow bg-white/10' : 'text-muted-silver hover:bg-white/5'">
        <BootstrapIcon name="play-btn-fill" class="text-rust-red" />
        Gameplay Showcase
      </NuxtLink>

      <NuxtLink to="/news" @click="isMobileMenuOpen = false"
        class="px-4 py-3 rounded-lg text-sm font-chakra font-medium tracking-wide flex items-center gap-2"
        :class="$route.path.startsWith('/news') ? 'text-lightning-yellow bg-white/10' : 'text-muted-silver hover:bg-white/5'">
        <BootstrapIcon name="newspaper" class="text-lightning-yellow" />
        Community News
      </NuxtLink>

      <NuxtLink to="/identity" @click="isMobileMenuOpen = false"
        class="px-4 py-3 rounded-lg text-sm font-chakra font-medium tracking-wide flex items-center gap-2"
        :class="$route.path === '/identity' ? 'text-lightning-yellow bg-white/10' : 'text-muted-silver hover:bg-white/5'">
        <BootstrapIcon name="cpu-fill" class="text-dinoco-blue" />
        Game Specs
      </NuxtLink>

      <div class="pt-3 border-t border-white/10 mt-2">
        <a href="https://store.steampowered.com/app/301760/DisneyPixar_Cars_2/" target="_blank"
          rel="noopener noreferrer"
          class="w-full py-3 rounded bg-rust-red text-center font-chakra font-bold text-sm tracking-wider uppercase text-white flex items-center justify-center gap-2 shadow-lg shadow-rust-red/40">
          <BootstrapIcon name="steam" />
          <span>Download on Steam</span>
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCarAudio } from '~/composables/useCarAudio'

const route = useRoute()
const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)
const { isMuted, toggleMute } = useCarAudio()

const handleScroll = () => {
  if (typeof window !== 'undefined') {
    isScrolled.value = window.scrollY > 20
  }
}

watch(() => route.fullPath, () => {
  isMobileMenuOpen.value = false
  handleScroll()
})

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

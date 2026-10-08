<template>
  <div class="relative w-full">
    <!-- Layout placeholder when in fullscreen mode to prevent background shifts -->
    <div
      v-if="isFullscreen"
      class="h-[320px] xs:h-[360px] sm:h-[420px] md:h-[480px] lg:h-[520px] rounded-2xl border border-white/5 bg-black/30"
    />

    <!-- Main Visual Stage Container -->
    <div
      :class="[
        isFullscreen
          ? 'fixed inset-0 z-50 w-screen h-screen bg-[#0A0C10] p-3 sm:p-5 flex flex-col overflow-hidden animate-fade-in'
          : 'h-[320px] xs:h-[360px] sm:h-[420px] md:h-[480px] lg:h-[520px] rounded-2xl overflow-hidden carbon-card border border-white/15 shadow-2xl relative'
      ]"
    >
      <!-- Subtle ambient color glow matching character primary color -->
      <div
        class="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-20 transition-all duration-700"
        :style="{ backgroundColor: character.primaryColor || '#E11D2A' }"
      />

      <!-- Fullscreen Header Bar (Only visible in Fullscreen mode) -->
      <div
        v-if="isFullscreen"
        class="flex items-center justify-between gap-3 pb-3 border-b border-white/10 shrink-0 z-20"
      >
        <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <span
            class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg font-racing text-lg sm:text-xl flex items-center justify-center font-bold shrink-0 shadow-lg"
            :style="{ backgroundColor: character.primaryColor, color: '#FFF' }"
          >
            {{ character.racingNumber || '#' }}
          </span>
          <div class="min-w-0">
            <h2 class="text-base sm:text-lg font-russo text-pure-white truncate leading-tight">
              {{ character.name }}
            </h2>
            <div class="flex items-center gap-2 text-xs font-chakra">
              <span class="text-lightning-yellow truncate">{{ character.sponsor }}</span>
              <span class="text-white/30 hidden xs:inline">•</span>
              <span class="text-muted-silver hidden xs:inline uppercase text-[11px]">{{ character.categoryLabel }}</span>
            </div>
          </div>
        </div>

        <button
          @click="toggleFullscreen"
          class="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-rust-red/80 hover:bg-rust-red text-white text-xs font-chakra font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95 shrink-0"
        >
          <BootstrapIcon name="x-lg" class="text-sm" />
          <span class="hidden sm:inline">Keluar Layar Penuh</span>
          <span class="sm:hidden">Tutup</span>
        </button>
      </div>

      <!-- 3D Canvas Viewport Container -->
      <div class="w-full h-full relative" :class="{ 'flex-1 min-h-0 mt-2': isFullscreen }">
        <ModelViewer3D
          :model-path="currentModelPath"
          :primary-color="character.primaryColor"
          :accent-color="character.accentColor"
          :scale="character.scale || 0.95"
          :position-offset="character.positionOffset || [0, 0, 0]"
          :rotation-offset="character.rotationOffset || [0, 0, 0]"
          :is-fullscreen="isFullscreen"
          @toggle-fullscreen="toggleFullscreen"
        />

        <!-- Overlay Sponsor Badge (Only visible in normal card mode) -->
        <div
          v-if="!isFullscreen"
          class="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-2 bg-black/75 backdrop-blur-md px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-white/10 shadow-lg max-w-[calc(100%-150px)] sm:max-w-xs transition-all pointer-events-none"
        >
          <span
            class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg font-racing text-base sm:text-lg flex items-center justify-center font-bold shrink-0 shadow-inner"
            :style="{ backgroundColor: character.primaryColor, color: '#FFF' }"
          >
            {{ character.racingNumber || '#' }}
          </span>
          <div class="min-w-0 pr-1">
            <span class="text-[9px] sm:text-[10px] font-chakra uppercase text-muted-silver block tracking-wider leading-none">
              Main Sponsor
            </span>
            <span class="text-[11px] sm:text-xs font-chakra font-bold text-white truncate block">
              {{ character.sponsor }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import type { Character } from '~/types'
import ModelViewer3D from '~/components/ModelViewer3D.vue'

defineProps<{
  character: Character
  currentModelPath: string
}>()

const isFullscreen = ref(false)

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isFullscreen.value) {
    isFullscreen.value = false
  }
}

watch(isFullscreen, (val) => {
  if (typeof document !== 'undefined') {
    if (val) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', onKeyDown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', onKeyDown)
    if (typeof document !== 'undefined' && document.body.style.overflow === 'hidden') {
      document.body.style.overflow = ''
    }
  }
})
</script>

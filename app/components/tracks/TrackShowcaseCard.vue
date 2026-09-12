<template>
  <div
    class="relative rounded-2xl overflow-hidden min-h-[360px] sm:min-h-[420px] flex flex-col justify-end p-6 sm:p-10 border border-white/15 shadow-2xl transition-all duration-500">

    <!-- Background Track Image with Gradient Overlay -->
    <div class="absolute inset-0 bg-cover bg-center transition-all duration-700 scale-105"
      :style="{ backgroundImage: `url('${currentTrack.image}')` }" />
    <div class="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-[#0F1115]/80 to-black/30" />

    <!-- Ambient Glow Border -->
    <div class="absolute inset-x-0 top-0 h-1 transition-all duration-500"
      :style="{ backgroundColor: currentTrack.ambientColor, boxShadow: `0 0 20px ${currentTrack.ambientColor}` }" />

    <!-- Content Overlay -->
    <div class="relative z-10 space-y-4 max-w-2xl">

      <!-- Tags Row -->
      <div class="flex flex-wrap items-center gap-2">
        <span
          class="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-xs font-chakra tracking-wider text-pure-white border border-white/20 flex items-center gap-1.5">
          <BootstrapIcon name="flag-fill" class="text-rust-red text-xs" />
          <span>Sirkuit Balap Cars</span>
        </span>

        <span
          class="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-xs font-chakra text-lightning-yellow border border-lightning-yellow/30 flex items-center gap-1.5">
          <BootstrapIcon name="signpost-2-fill" class="text-lightning-yellow text-xs" />
          <span>{{ currentTrack.surfaceType }}</span>
        </span>
      </div>

      <!-- Track Name -->
      <h4 class="text-2xl sm:text-4xl font-russo text-pure-white tracking-wide leading-tight text-shadow">
        {{ currentTrack.name }}
      </h4>

      <!-- Description (WYSIWYG HTML Support) -->
      <div class="text-sm sm:text-base text-muted-silver-light leading-relaxed track-rendered-description"
        v-html="currentTrack.description" />

    </div>

  </div>
</template>

<script setup lang="ts">
import type { TrackCircuit } from '~/types'

defineProps<{
  currentTrack: TrackCircuit
}>()
</script>

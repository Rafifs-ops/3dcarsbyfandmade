<template>
  <div
    class="group relative rounded-2xl overflow-hidden carbon-card carbon-card-hover border border-white/10 hover:border-lightning-yellow/40 flex flex-col justify-between p-5 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
  >
    <div>
      <!-- Top Info Bar Skeleton -->
      <div class="flex items-center justify-between gap-2 mb-3">
        <!-- Racing Number Badge Skeleton -->
        <div class="font-racing text-base font-bold px-2.5 py-0.5 rounded-lg shadow-md tracking-wider flex items-center gap-1 border border-white/20">
          <div class="w-10 h-4 bg-white/20 rounded animate-pulse" />
        </div>

        <!-- Category Tag Skeleton -->
        <div class="text-[10px] font-chakra tracking-widest uppercase px-2 py-0.5 rounded-md bg-white/5 text-muted-silver border border-white/10">
          <div class="w-16 h-3 bg-white/10 rounded animate-pulse" />
        </div>
      </div>

      <!-- Character Cover Image Container Skeleton -->
      <div
        class="relative w-full h-44 my-3 rounded-xl overflow-hidden bg-gradient-to-b from-white/[0.04] to-black/40 border border-white/5 flex items-center justify-center p-3"
      >
        <!-- Ambient Color Radial Glow Skeleton -->
        <div
          class="absolute inset-0 opacity-25 blur-2xl transition-opacity duration-500 pointer-events-none rounded-full scale-75"
          :style="{ backgroundColor: skeletonColor }"
        />

        <!-- High-Tech Stage Grid Skeleton -->
        <div
          class="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:12px_12px] opacity-60 pointer-events-none" />

        <!-- Car Cover Image Skeleton -->
        <div class="relative z-10 max-h-full max-w-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500 ease-out">
          <div class="w-28 h-28 bg-white/10 rounded-lg animate-pulse" />
        </div>

        <!-- Fallback Image Placeholder -->
        <div class="relative z-10 hidden flex-col items-center justify-center text-center gap-2 text-muted-silver">
          <div class="w-12 h-12 rounded-full bg-lightning-yellow/20 animate-pulse" />
          <div class="w-20 h-3 bg-white/10 rounded animate-pulse" />
        </div>

        <!-- Speed Badge Overlay Skeleton -->
        <div
          class="absolute bottom-2 right-2 z-10 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-white/10 text-[10px] font-chakra text-lightning-yellow font-bold flex items-center gap-1 shadow"
        >
          <div class="w-4 h-3 bg-lightning-yellow/50 rounded animate-pulse" />
          <div class="w-8 h-3 bg-white/20 rounded animate-pulse ml-1" />
        </div>
      </div>

      <!-- Character Name & Title Skeleton -->
      <div class="mt-2">
        <div class="h-5 w-36 bg-white/10 rounded animate-pulse" />
        <div class="h-3 w-24 bg-lightning-yellow/20 rounded animate-pulse mt-1.5" />
      </div>

      <!-- Sponsor & Engine Specs Skeleton -->
      <div class="mt-3 py-2.5 border-t border-white/5 space-y-1 text-xs font-chakra text-muted-silver">
        <div class="flex justify-between items-center text-[11px]">
          <span class="text-muted-silver/60">Sponsor:</span>
          <div class="w-24 h-3 bg-white/10 rounded animate-pulse" />
        </div>
        <div class="flex justify-between items-center text-[11px]">
          <span class="text-muted-silver/60">Engine:</span>
          <div class="w-32 h-3 bg-white/10 rounded animate-pulse" />
        </div>
      </div>
    </div>

    <!-- Action Link CTA Skeleton -->
    <div class="mt-4 pt-3 border-t border-white/10">
      <div class="w-full py-2.5 rounded-xl bg-white/10 animate-pulse" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ primaryColor?: string }>(), {
  primaryColor: '#E11D2A'
})

const skeletonColor = computed(() => props.primaryColor + '40')
</script>
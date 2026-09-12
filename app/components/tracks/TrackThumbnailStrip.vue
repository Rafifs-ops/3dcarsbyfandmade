<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3 mt-4">
    <button
      v-for="(track, index) in circuits"
      :key="track.id"
      @click="currentIndex = index"
      class="relative h-16 sm:h-20 rounded-lg overflow-hidden border transition-all text-left group"
      :class="currentIndex === index 
        ? 'border-lightning-yellow ring-2 ring-lightning-yellow/40 scale-105' 
        : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'"
    >
      <div 
        class="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
        :style="{ backgroundImage: `url('${track.image}')` }"
      />
      <div class="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors" />
      <div class="relative z-10 p-2 h-full flex flex-col justify-end">
        <span class="text-[10px] font-chakra font-bold text-white line-clamp-1 leading-tight">
          {{ track.name }}
        </span>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { TrackCircuit } from '~/types'

defineProps<{
  circuits: TrackCircuit[]
}>()

const currentIndex = defineModel<number>({ default: 0 })
</script>

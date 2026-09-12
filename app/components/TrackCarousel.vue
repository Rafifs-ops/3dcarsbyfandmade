<template>
  <div class="relative w-full rounded-2xl overflow-hidden carbon-card border border-white/10 p-6 sm:p-8">

    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div>
        <div class="flex items-center gap-2 text-lightning-yellow text-xs font-chakra tracking-widest uppercase mb-1">
          <BootstrapIcon name="flag-fill" class="text-rust-red" />
          <span>The Tracks</span>
        </div>
        <h3 class="text-2xl sm:text-3xl font-russo text-pure-white">
          LEGENDARY TRACKS & ARENAS
        </h3>
      </div>

      <!-- Navigation Arrows & Dots -->
      <div class="flex items-center gap-3">
        <button @click="prevTrack"
          class="w-10 h-10 rounded-xl bg-carbon-gray hover:bg-rust-red text-white flex items-center justify-center border border-white/10 hover:border-rust-red transition-all shadow-md active:scale-95"
          aria-label="Previous Track">
          <BootstrapIcon name="chevron-left" />
        </button>

        <span class="text-xs font-chakra text-muted-silver px-1">
          <span class="text-lightning-yellow font-bold">{{ currentIndex + 1 }}</span> / {{ circuits.length }}
        </span>

        <button @click="nextTrack"
          class="w-10 h-10 rounded-xl bg-carbon-gray hover:bg-rust-red text-white flex items-center justify-center border border-white/10 hover:border-rust-red transition-all shadow-md active:scale-95"
          aria-label="Next Track">
          <BootstrapIcon name="chevron-right" />
        </button>
      </div>
    </div>

    <!-- Active Circuit Showcase Card -->
    <TrackShowcaseCard :current-track="currentTrack" />

    <!-- Thumbnails Carousel Strip -->
    <TrackThumbnailStrip :circuits="circuits" v-model="currentIndex" />

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { circuitsData } from '~/data/tracks'
import type { TrackCircuit } from '~/types'
import TrackShowcaseCard from '~/components/tracks/TrackShowcaseCard.vue'
import TrackThumbnailStrip from '~/components/tracks/TrackThumbnailStrip.vue'

const { data: fetchedTracks } = await useFetch<TrackCircuit[]>('/api/tracks', {
  default: () => circuitsData
})

const circuits = computed<TrackCircuit[]>(() => fetchedTracks.value || circuitsData)
const currentIndex = ref(0)

const currentTrack = computed<TrackCircuit>(() => {
  return circuits.value[currentIndex.value] ?? circuits.value[0] ?? circuitsData[0]!
})

const nextTrack = () => {
  currentIndex.value = (currentIndex.value + 1) % circuits.value.length
}

const prevTrack = () => {
  currentIndex.value = (currentIndex.value - 1 + circuits.value.length) % circuits.value.length
}
</script>

<template>
  <div
    class="group relative rounded-2xl overflow-hidden carbon-card carbon-card-hover border border-white/10 hover:border-lightning-yellow/40 flex flex-col justify-between p-5 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">

    <div>
      <!-- Top Info Bar -->
      <div class="flex items-center justify-between gap-2 mb-3">
        <!-- Racing Number Badge -->
        <span
          class="font-racing text-base font-bold px-2.5 py-0.5 rounded-lg shadow-md tracking-wider flex items-center gap-1 border border-white/20"
          :style="{ backgroundColor: character.primaryColor, color: '#FFF' }">
          #{{ character.racingNumber || 'RS' }}
        </span>

        <!-- Category Tag & Audio Trigger -->
        <div class="flex items-center gap-2">
          <span
            class="text-[10px] font-chakra tracking-widest uppercase px-2 py-0.5 rounded-md bg-white/5 text-muted-silver border border-white/10">
            {{ character.categoryLabel }}
          </span>

          <button v-if="character.soundEffect" @click.stop.prevent="playVoice" type="button"
            class="w-7 h-7 rounded-full bg-white/5 hover:bg-lightning-yellow/20 border border-white/10 hover:border-lightning-yellow/40 text-muted-silver hover:text-lightning-yellow flex items-center justify-center transition-all duration-200"
            title="Dengar Suara Karakter" aria-label="Dengar Suara Karakter">
            <BootstrapIcon name="volume-up-fill" class="text-xs" />
          </button>
        </div>
      </div>

      <!-- Character Cover Image Container -->
      <div
        class="relative w-full h-44 my-3 rounded-xl overflow-hidden bg-gradient-to-b from-white/[0.04] to-black/40 border border-white/5 flex items-center justify-center p-3">
        <!-- Ambient Color Radial Glow -->
        <div
          class="absolute inset-0 opacity-25 group-hover:opacity-45 blur-2xl transition-opacity duration-500 pointer-events-none rounded-full scale-75"
          :style="{ backgroundColor: character.primaryColor }" />

        <!-- High-Tech Stage Grid Texture -->
        <div
          class="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:12px_12px] opacity-60 pointer-events-none" />

        <!-- Car Cover Image -->
        <img v-if="character.coverUrl && !imageError" :src="character.coverUrl" :alt="character.name"
          @error="handleImageError" loading="lazy"
          class="relative z-10 max-h-full max-w-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500 ease-out" />

        <!-- Fallback if image not found -->
        <div v-else class="relative z-10 flex flex-col items-center justify-center text-center gap-2 text-muted-silver">
          <BootstrapIcon name="car-front-fill" class="text-3xl text-lightning-yellow/80" />
          <span class="text-[11px] font-chakra uppercase tracking-wider text-muted-silver/80">{{ character.name
          }}</span>
        </div>

        <!-- Speed Badge Overlay -->
        <div
          class="absolute bottom-2 right-2 z-10 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-white/10 text-[10px] font-chakra text-lightning-yellow font-bold flex items-center gap-1 shadow">
          <BootstrapIcon name="speedometer" class="text-[9px]" />
          <span>{{ character.stats.topSpeed }} MPH</span>
        </div>
      </div>

      <!-- Character Name & Title -->
      <div class="mt-2">
        <h3
          class="text-lg font-russo text-pure-white group-hover:text-lightning-yellow transition-colors leading-tight">
          {{ character.name }}
        </h3>
        <p class="text-xs font-chakra text-lightning-yellow/90 mt-0.5 line-clamp-1">
          {{ character.title }}
        </p>
      </div>

      <!-- Sponsor & Engine Specs -->
      <div class="mt-3 py-2.5 border-t border-white/5 space-y-1 text-xs font-chakra text-muted-silver">
        <div class="flex justify-between items-center text-[11px]">
          <span class="text-muted-silver/60">Sponsor:</span>
          <span class="text-white font-medium truncate max-w-[180px]">{{ character.sponsor }}</span>
        </div>
        <div class="flex justify-between items-center text-[11px]">
          <span class="text-muted-silver/60">Mesin:</span>
          <span class="text-muted-silver font-medium truncate max-w-[180px]">{{ character.engineType }}</span>
        </div>
      </div>
    </div>

    <!-- Action Link CTA -->
    <div class="mt-4 pt-3 border-t border-white/10">
      <NuxtLink :to="`/characters/${character.slug}`"
        class="w-full py-2.5 rounded-xl bg-carbon-gray-light hover:bg-rust-red text-pure-white text-xs font-chakra font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200 group-hover:shadow-[0_0_16px_rgba(225,29,42,0.4)] border border-white/10 hover:border-transparent">
        <BootstrapIcon name="car-front-fill" class="text-lightning-yellow text-sm" />
        <span>Get to know me</span>
        <BootstrapIcon name="arrow-right" class="text-xs group-hover:translate-x-1 transition-transform" />
      </NuxtLink>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Character } from '~/types'
import { useCarAudio } from '~/composables/useCarAudio'

const props = defineProps<{
  character: Character
}>()

const imageError = ref(false)
const handleImageError = () => {
  imageError.value = true
}

const { playSound } = useCarAudio()

const playVoice = () => {
  if (props.character.soundEffect) {
    playSound(props.character.soundEffect)
  }
}
</script>

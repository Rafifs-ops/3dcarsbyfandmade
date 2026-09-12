<template>
  <div class="relative z-20 p-4 sm:p-6 bg-carbon-dark/95 border-t border-white/10 flex flex-col gap-5">
    
    <!-- Character Selection Tabs -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div class="text-xs font-chakra tracking-wider text-muted-silver uppercase flex items-center gap-1.5">
        <BootstrapIcon name="car-front-fill" class="text-lightning-yellow" />
        <span>Pilih Karakter Showroom:</span>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <button
          v-for="char in showcaseCharacters"
          :key="char.id"
          @click="$emit('selectCharacter', char)"
          class="px-3.5 py-1.5 rounded-lg text-xs font-chakra font-semibold transition-all duration-200 flex items-center gap-2 border cursor-pointer"
          :class="activeCharacter.id === char.id 
            ? 'bg-rust-red text-white border-rust-red shadow-[0_0_15px_rgba(225,29,42,0.5)] scale-105' 
            : 'bg-carbon-gray/80 text-muted-silver hover:text-white border-white/10 hover:border-white/30'"
        >
          <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: char.primaryColor }" />
          {{ char.name }}
        </button>
      </div>
    </div>

    <!-- Skin / Paint Job Selector (Visible if active character has skins) -->
    <div v-if="activeCharacter.skins && activeCharacter.skins.length > 1" class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-white/5">
      <div class="text-xs font-chakra tracking-wider text-muted-silver uppercase flex items-center gap-1.5">
        <BootstrapIcon name="palette-fill" class="text-dinoco-blue" />
        <span>Ganti Paint Job / Skin:</span>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <button
          v-for="skin in activeCharacter.skins"
          :key="skin.id"
          @click="$emit('selectSkin', skin)"
          class="px-3 py-1.5 rounded-md text-xs font-chakra font-medium transition-all duration-200 flex items-center gap-2 border cursor-pointer"
          :class="activeSkin?.id === skin.id 
            ? 'bg-white/15 text-lightning-yellow border-lightning-yellow shadow-[0_0_10px_rgba(255,199,0,0.3)]' 
            : 'bg-black/40 text-muted-silver hover:text-white border-white/10 hover:border-white/20'"
        >
          <span class="w-3 h-3 rounded-full border border-white/20" :style="{ backgroundColor: skin.previewColor }" />
          {{ skin.name }}
        </button>
      </div>
    </div>

    <!-- Interactive Soundboard & Controls -->
    <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5">
      
      <!-- Audio Action Buttons -->
      <div class="flex flex-wrap items-center gap-2">
        <!-- Rev Engine Button -->
        <button
          @click="$emit('triggerRev')"
          :disabled="isRevving"
          class="btn-racing-skew px-4 py-2 rounded bg-gradient-to-r from-rust-red to-rust-red-dark text-pure-white text-xs font-chakra font-bold tracking-wider uppercase flex items-center gap-2 shadow-lg hover:shadow-rust-red/50 active:scale-95 transition-all cursor-pointer"
        >
          <BootstrapIcon name="speedometer2" class="text-lightning-yellow text-sm" />
          <span>{{ isRevving ? 'REVVIINNGG!!' : 'Rev V8 Engine' }}</span>
        </button>

        <!-- Voice Quote Button -->
        <button
          @click="$emit('triggerVoice')"
          class="px-3.5 py-2 rounded bg-carbon-gray hover:bg-carbon-gray-light text-pure-white text-xs font-chakra font-semibold tracking-wider flex items-center gap-2 border border-white/10 hover:border-lightning-yellow/50 transition-all cursor-pointer"
        >
          <BootstrapIcon name="megaphone-fill" class="text-lightning-yellow" />
          <span>Suara Ikonik</span>
        </button>

        <!-- Horn Button -->
        <button
          @click="$emit('triggerHorn')"
          class="px-3 py-2 rounded bg-carbon-gray hover:bg-carbon-gray-light text-muted-silver hover:text-white text-xs font-chakra font-medium flex items-center gap-1.5 border border-white/10 transition-all cursor-pointer"
        >
          <BootstrapIcon name="bell-fill" class="text-dinoco-blue" />
          <span>Klakson</span>
        </button>
      </div>

      <!-- Specs Link -->
      <div class="flex items-center gap-2">
        <!-- Fullscreen / Detail Link -->
        <NuxtLink
          :to="`/characters/${activeCharacter.slug}`"
          class="p-2 rounded-lg bg-carbon-gray hover:bg-rust-red/20 text-muted-silver hover:text-rust-red-light text-xs font-chakra border border-white/10 hover:border-rust-red/40 flex items-center gap-1.5 transition-all"
          title="Lihat Spesifikasi Penuh"
        >
          <BootstrapIcon name="box-arrow-up-right" />
          <span class="hidden sm:inline text-[11px]">Full Specs</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character, CharacterSkin } from '~/types'

defineProps<{
  showcaseCharacters: Character[]
  activeCharacter: Character
  activeSkin?: CharacterSkin | null
  isRevving: boolean
}>()

defineEmits<{
  (e: 'selectCharacter', char: Character): void
  (e: 'selectSkin', skin: CharacterSkin): void
  (e: 'triggerRev'): void
  (e: 'triggerVoice'): void
  (e: 'triggerHorn'): void
}>()
</script>

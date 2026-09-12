<template>
  <div
    class="absolute top-0 inset-x-0 z-20 p-4 sm:p-6 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none">

    <!-- Character Title & Badge -->
    <div class="pointer-events-auto flex items-center gap-3">
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center font-racing text-2xl font-bold shadow-lg border border-white/20"
        :style="{ backgroundColor: activeCharacter.primaryColor, color: '#FFF' }">
        {{ activeCharacter.racingNumber || '#' }}
      </div>
      <div>
        <div class="flex items-center gap-2">
          <span
            class="text-xs font-chakra tracking-widest uppercase px-2 py-0.5 rounded bg-white/10 text-lightning-yellow border border-lightning-yellow/30">
            {{ activeCharacter.categoryLabel }}
          </span>
          <span v-if="activeSkin"
            class="text-xs font-chakra tracking-wider uppercase px-2 py-0.5 rounded bg-rust-red/30 text-pure-white border border-rust-red/40">
            {{ activeSkin.name }}
          </span>
        </div>
        <h3 class="text-xl sm:text-2xl font-russo tracking-wide text-pure-white mt-0.5 flex items-center gap-2">
          {{ activeCharacter.name }}
        </h3>
      </div>
    </div>

    <!-- Quick Telemetry HUD -->
    <div
      class="pointer-events-auto flex items-center gap-2 sm:gap-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
      <!-- RPM Display -->
      <div class="text-right">
        <div class="font-chakra text-lg font-bold"
          :class="isRevving ? 'text-rust-red animate-pulse text-glow-red' : 'text-lightning-yellow'">
          {{ liveRpm.toLocaleString() }} <span class="text-xs text-muted-silver font-normal">RPM</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character, CharacterSkin } from '~/types'

defineProps<{
  activeCharacter: Character
  activeSkin?: CharacterSkin | null
  liveRpm: number
  isRevving: boolean
}>()
</script>

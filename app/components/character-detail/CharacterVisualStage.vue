<template>
  <div class="h-[460px] sm:h-[520px] rounded-2xl overflow-hidden carbon-card border border-white/15 shadow-2xl relative">
    
    <ModelViewer3D
      :model-path="currentModelPath"
      :primary-color="character.primaryColor"
      :accent-color="character.accentColor"
      :scale="character.scale || 1.0"
      :position-offset="character.positionOffset || [0, 0, 0]"
    />

    <!-- Overlay Badge -->
    <div class="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
      <span 
        class="w-8 h-8 rounded-lg font-racing text-lg flex items-center justify-center font-bold"
        :style="{ backgroundColor: character.primaryColor, color: '#FFF' }"
      >
        {{ character.racingNumber || '#' }}
      </span>
      <div>
        <span class="text-[10px] font-chakra uppercase text-muted-silver block">Sponsor Utama</span>
        <span class="text-xs font-chakra font-bold text-white">{{ character.sponsor }}</span>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { Character } from '~/types'
import ModelViewer3D from '~/components/ModelViewer3D.vue'

defineProps<{
  character: Character
  currentModelPath: string
}>()
</script>

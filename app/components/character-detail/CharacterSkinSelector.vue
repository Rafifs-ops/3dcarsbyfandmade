<template>
  <div v-if="skins && skins.length > 1" class="carbon-card p-4 rounded-xl border border-white/10 space-y-2">
    <div class="text-xs font-chakra text-muted-silver uppercase tracking-wider flex items-center gap-1.5">
      <BootstrapIcon name="palette-fill" class="text-lightning-yellow" />
      <span>Pilih Varian Livery / Cat Bodi:</span>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
      <button
        v-for="skin in skins"
        :key="skin.id"
        @click="selectedSkin = skin"
        class="p-2.5 rounded-lg text-left transition-all border flex items-center gap-2.5"
        :class="selectedSkin?.id === skin.id 
          ? 'bg-white/15 border-lightning-yellow text-lightning-yellow' 
          : 'bg-carbon-gray text-muted-silver hover:text-white border-white/5 hover:border-white/20'"
      >
        <span class="w-3.5 h-3.5 rounded-full border border-white/20 flex-shrink-0" :style="{ backgroundColor: skin.previewColor }" />
        <div class="truncate">
          <span class="block text-xs font-chakra font-bold truncate">{{ skin.name }}</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CharacterSkin } from '~/types'

defineProps<{
  skins?: CharacterSkin[]
}>()

const selectedSkin = defineModel<CharacterSkin | null>()
</script>

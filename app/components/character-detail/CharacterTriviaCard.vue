<template>
  <div class="space-y-4">
    <!-- Game Origin Banner -->
    <div v-if="character.gameCoverUrl" class="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <img 
          :src="character.gameCoverUrl" 
          alt="Game Cover" 
          class="w-12 h-16 object-contain rounded border border-white/10 shadow flex-shrink-0"
        />
        <div class="text-xs font-chakra">
          <span class="text-[10px] text-muted-silver uppercase block">Franchise Video Game:</span>
          <span class="text-white font-bold block">{{ character.category === 'piston-cup' || character.category === 'radiator-springs' ? 'Disney•Pixar Cars (Classic)' : 'Cars 2: The Video Game' }}</span>
          <span class="text-[10px] text-lightning-yellow">Official Playable Roster</span>
        </div>
      </div>
      <BootstrapIcon name="controller" class="text-xl text-muted-silver/60 pr-2" />
    </div>

    <!-- Trivia Fun Fact -->
    <div class="p-4 rounded-xl bg-lightning-yellow/10 border border-lightning-yellow/30 flex items-start gap-3">
      <BootstrapIcon name="lightbulb-fill" class="text-lightning-yellow text-lg flex-shrink-0 mt-0.5" />
      <div class="text-xs font-chakra">
        <span class="font-bold text-lightning-yellow uppercase tracking-wider block mb-0.5">Fakta Unik Disney•Pixar:</span>
        <p class="text-muted-silver-light">{{ character.funFact }}</p>
      </div>
    </div>

    <!-- Steam CTA Box -->
    <div class="pt-2">
      <a
        :href="character.gameCoverUrl?.includes('cover-cars-1') ? 'https://store.steampowered.com/app/288580/DisneyPixar_Cars/' : 'https://store.steampowered.com/app/301760/DisneyPixar_Cars_2/'"
        target="_blank"
        rel="noopener noreferrer"
        class="w-full py-3.5 rounded-xl bg-gradient-to-r from-rust-red to-rust-red-dark hover:from-rust-red-light text-pure-white text-xs font-chakra font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(225,29,42,0.4)] transition-all"
      >
        <BootstrapIcon name="steam" class="text-lg" />
        <span>Mainkan {{ character.name }} di Steam</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from '~/types'

defineProps<{
  character: Character
}>()
</script>

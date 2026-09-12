<template>
  <div class="pt-12 border-t border-white/10 space-y-6">
    <div class="flex items-center justify-between">
      <h3 class="text-2xl font-russo text-pure-white">
        PEMBALAP & RIVAL LAINNYA
      </h3>
      <NuxtLink to="/characters" class="text-xs font-chakra text-lightning-yellow hover:underline flex items-center gap-1">
        <span>Lihat Semua</span>
        <BootstrapIcon name="arrow-right" />
      </NuxtLink>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <CharacterCard
        v-for="rel in relatedCharacters"
        :key="rel.id"
        :character="rel"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from '~/types'
import CharacterCard from '~/components/CharacterCard.vue'

defineProps<{
  relatedCharacters: Character[]
}>()
</script>

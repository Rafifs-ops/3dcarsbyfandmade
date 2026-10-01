<template>
  <div class="pt-12 border-t border-white/10 space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <h3 class="text-xl sm:text-2xl font-russo text-pure-white">
        OTHER RACERS & RIVALS
      </h3>
      <NuxtLink to="/characters" class="shrink-0 text-xs font-chakra text-lightning-yellow hover:underline flex items-center gap-1">
        <span>View All</span>
        <BootstrapIcon name="arrow-right" />
      </NuxtLink>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <template v-if="loading">
        <CharacterCardSkeleton v-for="n in 4" :key="`skeleton-${n}`" />
      </template>
      <template v-else>
        <CharacterCard
          v-for="rel in relatedCharacters"
          :key="rel.id"
          :character="rel"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from '~/types'
import CharacterCard from '~/components/CharacterCard.vue'
import CharacterCardSkeleton from '~/components/characters/CharacterCardSkeleton.vue'

withDefaults(defineProps<{
  relatedCharacters: Character[]
  loading?: boolean
}>(), {
  loading: false
})
</script>

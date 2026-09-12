<template>
  <div class="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
    
    <!-- Page Header & Filters -->
    <CharacterFilterBar
      :categories="categories"
      :get-count="getCategoryCount"
      v-model:search="searchQuery"
      v-model:category="activeCategory"
    />

    <!-- Characters Grid -->
    <div v-if="filteredCharacters.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <CharacterCard
        v-for="character in filteredCharacters"
        :key="character.id"
        :character="character"
      />
    </div>

    <!-- Empty State -->
    <CharacterEmptyState
      v-else
      @reset="resetFilters"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { charactersData } from '~/data/characters'
import type { Character } from '~/types'
import CharacterFilterBar from '~/components/characters/CharacterFilterBar.vue'
import CharacterEmptyState from '~/components/characters/CharacterEmptyState.vue'

const searchQuery = ref('')
const activeCategory = ref('all')

const { data: fetchedChars } = await useFetch<Character[]>('/api/characters', {
  default: () => charactersData
})

const characterList = computed(() => fetchedChars.value || charactersData)

const categories = [
  { id: 'all', label: 'Semua Karakter', icon: 'grid-fill' },
  { id: 'piston-cup', label: 'Piston Cup Champions', icon: 'trophy-fill' },
  { id: 'radiator-springs', label: 'Radiator Springs', icon: 'geo-alt-fill' },
  { id: 'world-grand-prix', label: 'World Grand Prix', icon: 'globe-americas' },
  { id: 'next-gen', label: 'Next-Gen Racers', icon: 'lightning-charge-fill' },
  { id: 'special-agents', label: 'Secret Agents & Lemons', icon: 'shield-lock-fill' }
] as const

const getCategoryCount = (catId: string) => {
  if (catId === 'all') return characterList.value.length
  return characterList.value.filter(c => c.category === catId).length
}

const filteredCharacters = computed(() => {
  return characterList.value.filter(char => {
    const matchesCat = activeCategory.value === 'all' || char.category === activeCategory.value
    const matchesSearch = searchQuery.value.trim() === '' || 
      char.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      char.sponsor.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      char.categoryLabel.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCat && matchesSearch
  })
})

const resetFilters = () => {
  searchQuery.value = ''
  activeCategory.value = 'all'
}

useSeoMeta({
  title: 'Katalog Karakter Disney Pixar Cars - 20+ Model 3D Roster',
  description: 'Daftar lengkap 20+ karakter Disney Pixar Cars & Cars 2 di Steam dengan inspeksi 3D 360°, spesifikasi kecepatan, dan suara mesin ikonik.',
  ogTitle: 'Disney Pixar Cars - Character Roster Showcase'
})
</script>

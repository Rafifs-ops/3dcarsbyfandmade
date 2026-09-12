<template>
  <div v-if="character" class="pt-28 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
    
    <!-- Breadcrumb & Back Navigation -->
    <div class="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
      <NuxtLink
        to="/characters"
        class="inline-flex items-center gap-2 text-xs font-chakra tracking-wider uppercase text-muted-silver hover:text-lightning-yellow transition-colors"
      >
        <BootstrapIcon name="arrow-left" />
        <span>Kembali ke Katalog Karakter</span>
      </NuxtLink>

      <div class="flex items-center gap-2 text-xs font-chakra text-muted-silver">
        <span>Roster</span>
        <BootstrapIcon name="chevron-right" class="text-[10px]" />
        <span class="text-pure-white font-bold">{{ character.name }}</span>
      </div>
    </div>

    <!-- Main Character Layout Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <!-- Left Column: 3D Model Canvas & Skin Switcher (7 cols) -->
      <div class="lg:col-span-7 space-y-4">
        
        <!-- 3D Interactive Canvas Box -->
        <CharacterVisualStage
          :character="character"
          :current-model-path="currentModelPath"
        />

        <!-- Skin / Livery Switcher (If available) -->
        <CharacterSkinSelector
          :skins="character.skins"
          v-model="selectedSkin"
        />

        <!-- Audio Soundboard Trigger -->
        <CharacterAudioTriggers
          :sound-effect="character.soundEffect"
          :voice-quote="character.voiceQuote"
        />

      </div>

      <!-- Right Column: Specs, Bio & Steam CTA (5 cols) -->
      <div class="lg:col-span-5 space-y-6">
        
        <!-- Header Info -->
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="text-xs font-chakra uppercase px-2.5 py-0.5 rounded bg-rust-red/20 text-rust-red-light border border-rust-red/30">
              {{ character.categoryLabel }}
            </span>
          </div>

          <h1 class="text-3xl sm:text-4xl font-russo text-pure-white tracking-wide">
            {{ character.name }}
          </h1>

          <p class="text-sm font-chakra text-lightning-yellow">
            {{ character.title }}
          </p>

          <p class="text-xs font-inter text-muted-silver leading-relaxed pt-2">
            {{ character.bio }}
          </p>
        </div>

        <!-- Telemetry Performance Dashboard -->
        <CharacterTelemetryDashboard :character="character" />

        <!-- Trivia Fun Fact & Steam CTA -->
        <CharacterTriviaCard :character="character" />

      </div>

    </div>

    <!-- Related Characters Grid -->
    <CharacterRelatedGrid :related-characters="relatedCharacters" />

  </div>

  <!-- 404 Character Not Found -->
  <div v-else class="py-24 text-center carbon-card rounded-2xl max-w-lg mx-auto border border-white/10 space-y-4">
    <h2 class="text-2xl font-russo text-pure-white">Karakter Tidak Ditemukan</h2>
    <p class="text-xs font-chakra text-muted-silver">Karakter yang Anda tuju tidak ada dalam database kami.</p>
    <NuxtLink to="/characters" class="inline-block px-5 py-2.5 rounded bg-rust-red text-white text-xs font-chakra font-bold uppercase">
      Kembali ke Katalog
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { charactersData } from '~/data/characters'
import type { Character, CharacterSkin } from '~/types'
import CharacterVisualStage from '~/components/character-detail/CharacterVisualStage.vue'
import CharacterSkinSelector from '~/components/character-detail/CharacterSkinSelector.vue'
import CharacterAudioTriggers from '~/components/character-detail/CharacterAudioTriggers.vue'
import CharacterTelemetryDashboard from '~/components/character-detail/CharacterTelemetryDashboard.vue'
import CharacterTriviaCard from '~/components/character-detail/CharacterTriviaCard.vue'
import CharacterRelatedGrid from '~/components/character-detail/CharacterRelatedGrid.vue'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data: fetchedChar } = await useFetch<Character>(() => `/api/characters/${slug.value}`, {
  default: () => charactersData.find(c => c.slug === slug.value || c.id === slug.value) as any
})

const { data: allChars } = await useFetch<Character[]>('/api/characters', {
  default: () => charactersData
})

const character = computed<Character | undefined>(() => {
  return fetchedChar.value || charactersData.find(c => c.slug === slug.value || c.id === slug.value)
})

const selectedSkin = ref<CharacterSkin | null>(
  character.value?.skins?.[0] ?? null
)

watch(character, (newVal) => {
  if (newVal?.skins && newVal.skins.length > 0) {
    selectedSkin.value = newVal.skins[0] ?? null
  } else {
    selectedSkin.value = null
  }
}, { immediate: true })

const currentModelPath = computed(() => {
  if (selectedSkin.value) {
    return selectedSkin.value.modelFile
  }
  return character.value?.modelFile || ''
})

const relatedCharacters = computed(() => {
  if (!character.value) return []
  const list = allChars.value || charactersData
  return list
    .filter(c => c.id !== character.value?.id)
    .slice(0, 4)
})

useSeoMeta({
  title: computed(() => character.value ? `${character.value.name} - 3D Showcase & Specs | Cars Steam` : 'Character Detail | Cars Steam'),
  description: computed(() => character.value?.bio || 'Detail karakter Disney Pixar Cars')
})
</script>

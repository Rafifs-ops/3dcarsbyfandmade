<template>
  <div class="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">

    <!-- Header -->
    <div class="text-center max-w-3xl mx-auto space-y-3" data-aos="fade-up">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dinoco-blue/10 border border-dinoco-blue/30 text-dinoco-blue text-xs font-chakra tracking-widest uppercase">
        <BootstrapIcon name="cpu-fill" />
        <span>Game Specs</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-russo text-pure-white tracking-wide">
        GAMES
      </h1>
      <p class="text-sm sm:text-base text-muted-silver">
        Compare features, gameplay, developer history, and PC system requirements for Disney•Pixar Cars (2006) and Cars
        2: The Video Game (2011).
      </p>
    </div>

    <!-- Side-by-Side Game Cards -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

      <!-- Cars (2006) Game Card -->
      <div data-aos="fade-up" data-aos-delay="100">
        <GameGameCard :game-spec="cars1" edition-title="Disney•Pixar Cars (2006)" edition-tag="Classic Edition"
          theme="yellow" />
      </div>

      <!-- Cars 2 (2011) Game Card -->
      <div data-aos="fade-up" data-aos-delay="200">
        <GameGameCard :game-spec="cars2" edition-title="Disney•Pixar Cars 2 (2011)" edition-tag="Spy Action Edition"
          theme="red" />
      </div>

    </div>

    <!-- SYSTEM REQUIREMENTS COMPARISON TABLE -->
    <div data-aos="fade-up">
      <GameSpecTable :cars1="cars1" :cars2="cars2" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cars1Spec, cars2Spec } from '~/data/gameInfo'
import GameGameCard from '~/components/game/GameGameCard.vue'
import GameSpecTable from '~/components/game/GameSpecTable.vue'
import GameCompatibilityBadge from '~/components/game/GameCompatibilityBadge.vue'

const { data: specs } = await useFetch<any[]>('/api/specs', {
  default: () => [
    { id: 'cars-1', ...cars1Spec },
    { id: 'cars-2', ...cars2Spec }
  ]
})

const cars1 = computed(() => {
  return specs.value?.find((s: any) => s.id === 'cars-1') || cars1Spec
})

const cars2 = computed(() => {
  return specs.value?.find((s: any) => s.id === 'cars-2') || cars2Spec
})

useSeoMeta({
  title: '3D Cars Show by Fanmade',
  description: 'Comparison table of minimum and recommended PC specifications for Disney Pixar Cars and Cars 2 on Steam, with official Steam Store links.',
  ogTitle: 'Disney Pixar Cars - Game Identity & PC Requirements'
})
</script>

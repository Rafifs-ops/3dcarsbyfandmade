<template>
  <div class="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">

    <!-- Header -->
    <div class="text-center max-w-3xl mx-auto space-y-3">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dinoco-blue/10 border border-dinoco-blue/30 text-dinoco-blue text-xs font-chakra tracking-widest uppercase">
        <BootstrapIcon name="cpu-fill" />
        <span>Game Specs</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-russo text-pure-white tracking-wide">
        GAMES
      </h1>
      <p class="text-sm sm:text-base text-muted-silver">
        Bandingkan fitur, gameplay, sejarah pengembang, dan kebutuhan sistem PC untuk Disney•Pixar Cars (2006) dan Cars
        2: The Video Game (2011).
      </p>
    </div>

    <!-- Side-by-Side Game Identity Cards -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

      <!-- Cars (2006) Identity Card -->
      <IdentityGameCard :game-spec="cars1" edition-title="Disney•Pixar Cars (2006)" edition-tag="Classic Edition"
        theme="yellow" />

      <!-- Cars 2 (2011) Identity Card -->
      <IdentityGameCard :game-spec="cars2" edition-title="Disney•Pixar Cars 2 (2011)" edition-tag="Spy Action Edition"
        theme="red" />

    </div>

    <!-- SYSTEM REQUIREMENTS COMPARISON TABLE -->
    <IdentitySpecTable :cars1="cars1" :cars2="cars2">
      <IdentityCompatibilityBadge />
    </IdentitySpecTable>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cars1Spec, cars2Spec } from '~/data/gameInfo'
import IdentityGameCard from '~/components/identity/IdentityGameCard.vue'
import IdentitySpecTable from '~/components/identity/IdentitySpecTable.vue'
import IdentityCompatibilityBadge from '~/components/identity/IdentityCompatibilityBadge.vue'

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
  title: 'Identitas 2 Game & Spesifikasi PC - Disney Pixar Cars vs Cars 2',
  description: 'Tabel perbandingan spesifikasi minimum dan rekomendasi PC untuk Disney Pixar Cars dan Cars 2 di Steam beserta link resmi Steam Store.',
  ogTitle: 'Disney Pixar Cars - Game Identity & PC Requirements'
})
</script>

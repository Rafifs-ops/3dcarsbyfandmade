<template>
  <div class="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">

    <!-- Page Header -->
    <div class="text-center max-w-3xl mx-auto space-y-3">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rust-red/20 border border-rust-red/40 text-pure-white text-xs font-chakra tracking-widest uppercase">
        <BootstrapIcon name="play-btn-fill" class="text-lightning-yellow" />
        <span>Video Showcase & In-Game Footage</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-russo text-pure-white tracking-wide">
        GAMEPLAY & GAME MODES
      </h1>
      <p class="text-sm sm:text-base text-muted-silver">
        Watch 4K 60FPS gameplay footage, armed C.H.R.O.M.E. combat racing, drifting through Radiator Springs, and
        open-world freedom.
      </p>
    </div>

    <!-- Featured Main Video Player Embed -->
    <div ref="playerSectionRef" id="gameplay-player" class="scroll-mt-24 sm:scroll-mt-28">
      <GameplayVideoPlayer :active-video="activeVideo" />
    </div>

    <!-- Video Selection Grid -->
    <GameplayVideoPlaylist :videos="videos" v-model="activeVideo" @select="scrollToPlayer" />

  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { gameplayVideos } from '~/data/gameInfo'
import type { GameplayVideo } from '~/types'
import GameplayVideoPlayer from '~/components/gameplay/GameplayVideoPlayer.vue'
import GameplayVideoPlaylist from '~/components/gameplay/GameplayVideoPlaylist.vue'

const { data: fetchedVideos } = await useFetch<GameplayVideo[]>('/api/gameplay', {
  default: () => gameplayVideos
})

const videos = computed(() => fetchedVideos.value || gameplayVideos)
const activeVideo = ref<GameplayVideo>(videos.value[0] || gameplayVideos[0]!)
const playerSectionRef = ref<HTMLElement | null>(null)

const scrollToPlayer = () => {
  if (!import.meta.client) return

  nextTick(() => {
    if (playerSectionRef.value) {
      // Navbar height is 80px (h-20) + 20px padding
      const navbarOffset = 100
      const elementPosition = playerSectionRef.value.getBoundingClientRect().top
      const targetPosition = elementPosition + window.scrollY - navbarOffset

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth'
      })
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  })
}

useSeoMeta({
  title: 'Gameplay Videos & In-Game Footage - 3D Cars Show by Fanmade',
  description: 'Watch 4K 60FPS racing gameplay of Disney Pixar Cars & Cars 2 on Steam featuring Piston Cup mode, C.H.R.O.M.E. spy missions, and multiplayer.',
  ogTitle: 'Disney Pixar Cars - Gameplay Showcase'
})
</script>

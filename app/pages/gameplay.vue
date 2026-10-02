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
    <GameplayVideoPlayer :active-video="activeVideo" />

    <!-- Video Selection Grid -->
    <GameplayVideoPlaylist :videos="videos" v-model="activeVideo" />

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { gameplayVideos } from '~/data/gameInfo'
import type { GameplayVideo } from '~/types'
import GameplayVideoPlayer from '~/components/gameplay/GameplayVideoPlayer.vue'
import GameplayVideoPlaylist from '~/components/gameplay/GameplayVideoPlaylist.vue'

const { data: fetchedVideos } = await useFetch<GameplayVideo[]>('/api/gameplay', {
  default: () => gameplayVideos
})

const videos = computed(() => fetchedVideos.value || gameplayVideos)
const activeVideo = ref<GameplayVideo>(videos.value[0] || gameplayVideos[0]!)

useSeoMeta({
  title: 'Gameplay Videos & In-Game Footage - 3D Cars Show by Fanmade',
  description: 'Watch 4K 60FPS racing gameplay of Disney Pixar Cars & Cars 2 on Steam featuring Piston Cup mode, C.H.R.O.M.E. spy missions, and multiplayer.',
  ogTitle: 'Disney Pixar Cars - Gameplay Showcase'
})
</script>

<template>
  <div v-if="activeVideo" class="carbon-card rounded-2xl overflow-hidden border border-white/15 p-4 sm:p-6 shadow-2xl space-y-4">
    
    <!-- Video Player Frame -->
    <div class="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-inner border border-white/10">
      <iframe
        :src="`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=0&rel=0&modestbranding=1`"
        :title="activeVideo.title"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        class="w-full h-full border-0"
      />
    </div>

    <!-- Active Video Info Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
      <div>
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-0.5 rounded bg-rust-red/30 text-pure-white border border-rust-red/40 text-xs font-chakra uppercase font-bold">
            {{ activeVideo.game }}
          </span>
          <span class="text-xs font-chakra text-lightning-yellow">
            {{ activeVideo.category }}
          </span>
        </div>
        <h2 class="text-xl sm:text-2xl font-russo text-pure-white mt-1">
          {{ activeVideo.title }}
        </h2>
        <p class="text-xs font-chakra text-muted-silver mt-0.5">
          {{ activeVideo.description }}
        </p>
      </div>

      <!-- Steam Direct Link -->
      <a
        href="https://store.steampowered.com/app/301760/DisneyPixar_Cars_2/"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-racing-skew px-5 py-2.5 rounded bg-rust-red hover:bg-rust-red-light text-white text-xs font-chakra font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-lg flex-shrink-0"
      >
        <BootstrapIcon name="steam" />
        <span>Play Game on Steam</span>
      </a>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { GameplayVideo } from '~/types'

defineProps<{
  activeVideo: GameplayVideo
}>()
</script>

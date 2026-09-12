<template>
  <div class="space-y-4">
    <h3 class="text-xl font-russo text-pure-white flex items-center gap-2">
      <BootstrapIcon name="collection-play" class="text-lightning-yellow" />
      <span>PILIH CUPLIKAN GAMEPLAY</span>
    </h3>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="video in videos" :key="video.id" @click="activeVideo = video"
        class="carbon-card carbon-card-hover rounded-xl overflow-hidden border p-3 cursor-pointer transition-all"
        :class="activeVideo?.id === video.id ? 'border-lightning-yellow ring-2 ring-lightning-yellow/30' : 'border-white/10'">
        <div class="relative aspect-video rounded-lg overflow-hidden bg-black mb-2.5">
          <img :src="`https://youtube.com/${video.youtubeId}/hqdefault.jpg`" :alt="video.title"
            class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div class="w-10 h-10 rounded-full bg-rust-red/80 flex items-center justify-center text-white text-lg">
              <BootstrapIcon name="play-fill" class="ml-0.5" />
            </div>
          </div>
          <span class="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white">
            {{ video.duration }}
          </span>
        </div>

        <span class="text-[10px] font-chakra uppercase text-lightning-yellow block">
          {{ video.game }}
        </span>
        <h4 class="text-xs font-chakra font-bold text-white line-clamp-2 mt-0.5">
          {{ video.title }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameplayVideo } from '~/types'

defineProps<{
  videos: GameplayVideo[]
}>()

const activeVideo = defineModel<GameplayVideo>()
</script>

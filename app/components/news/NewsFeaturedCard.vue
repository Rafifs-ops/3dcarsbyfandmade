<template>
  <div v-if="featuredArticle" class="carbon-card rounded-2xl overflow-hidden border border-white/15 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
    <div class="lg:col-span-6 relative aspect-video rounded-xl overflow-hidden shadow-2xl">
      <img
        :src="featuredArticle.image"
        :alt="featuredArticle.title"
        class="w-full h-full object-cover"
      />
      <span class="absolute top-3 left-3 px-2.5 py-1 rounded bg-rust-red text-white text-[10px] font-chakra font-bold uppercase tracking-wider shadow">
        Featured Story
      </span>
    </div>

    <div class="lg:col-span-6 space-y-4">
      <div class="flex items-center gap-2 text-xs font-chakra text-muted-silver">
        <BootstrapIcon name="calendar3" class="text-lightning-yellow" />
        <span>{{ featuredArticle.date }}</span>
        <span>•</span>
        <span class="text-white font-medium">Oleh {{ featuredArticle.author }}</span>
      </div>

      <h2 class="text-2xl sm:text-3xl font-russo text-pure-white hover:text-lightning-yellow transition-colors leading-tight">
        <NuxtLink :to="`/news/${featuredArticle.id}`">
          {{ featuredArticle.title }}
        </NuxtLink>
      </h2>

      <p class="text-sm text-muted-silver leading-relaxed line-clamp-3">
        {{ featuredArticle.excerpt }}
      </p>

      <div class="pt-2 flex items-center justify-between">
        <NuxtLink
          :to="`/news/${featuredArticle.id}`"
          class="btn-racing-skew px-5 py-2.5 rounded bg-gradient-to-r from-rust-red to-rust-red-dark text-white text-xs font-chakra font-bold tracking-wider uppercase flex items-center gap-2 shadow-lg hover:shadow-rust-red/50 transition-all"
        >
          <span>Baca Selengkapnya</span>
          <BootstrapIcon name="arrow-right" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CommunityNews } from '~/types'

defineProps<{
  featuredArticle: CommunityNews
}>()
</script>

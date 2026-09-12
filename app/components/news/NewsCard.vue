<template>
  <article class="carbon-card carbon-card-hover rounded-xl overflow-hidden border border-white/10 flex flex-col justify-between p-5 transition-all duration-300">
    <div>
      <!-- Thumbnail -->
      <div class="relative aspect-video rounded-lg overflow-hidden bg-black/50 mb-4">
        <img
          :src="item.image"
          :alt="item.title"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Meta -->
      <div class="flex items-center gap-2 text-[11px] font-chakra text-muted-silver mb-2">
        <BootstrapIcon name="calendar3" class="text-lightning-yellow text-[10px]" />
        <span>{{ item.date }}</span>
        <span>•</span>
        <span class="text-white font-medium truncate max-w-[150px]">{{ item.author }}</span>
      </div>

      <!-- Title -->
      <h3 class="text-lg font-russo text-pure-white hover:text-lightning-yellow transition-colors line-clamp-2">
        <NuxtLink :to="`/news/${item.id}`">
          {{ item.title }}
        </NuxtLink>
      </h3>

      <!-- Excerpt -->
      <p class="text-xs text-muted-silver mt-2 line-clamp-3 leading-relaxed">
        {{ item.excerpt }}
      </p>
    </div>

    <!-- Card Footer -->
    <div class="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-chakra">
      <NuxtLink
        :to="`/news/${item.id}`"
        class="text-lightning-yellow font-bold uppercase tracking-wider flex items-center gap-1 hover:underline"
      >
        <span>Baca Artikel</span>
        <BootstrapIcon name="chevron-right" class="text-[10px]" />
      </NuxtLink>

      <span class="text-[11px] text-muted-silver/60 uppercase tracking-widest">
        Steam News
      </span>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { CommunityNews } from '~/types'

defineProps<{
  item: CommunityNews
}>()
</script>

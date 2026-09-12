<template>
  <div class="space-y-4">
    <h1 class="text-3xl sm:text-4xl lg:text-5xl font-russo text-pure-white leading-tight">
      {{ article.title }}
    </h1>

    <div class="flex flex-wrap items-center gap-4 text-xs font-chakra text-muted-silver border-y border-white/10 py-3">
      <div class="flex items-center gap-1.5">
        <BootstrapIcon name="person-circle" class="text-rust-red" />
        <span class="text-white font-semibold">{{ article.author }}</span>
      </div>
      <span>•</span>
      <div class="flex items-center gap-1.5">
        <BootstrapIcon name="calendar3" class="text-lightning-yellow" />
        <span>{{ article.date }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CommunityNews } from '~/types'

defineProps<{
  article: CommunityNews
}>()
</script>

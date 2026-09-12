<template>
  <div class="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
    
    <!-- Page Header & Filters -->
    <NewsFilterBar
      v-model:search="searchQuery"
    />

    <!-- Featured Top Article -->
    <NewsFeaturedCard
      v-if="featuredArticle && searchQuery === ''"
      :featured-article="featuredArticle"
    />

    <!-- News Grid -->
    <div v-if="filteredNews.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NewsCard
        v-for="item in filteredNews"
        :key="item.id"
        :item="item"
      />
    </div>

    <!-- Empty State -->
    <NewsEmptyState v-else />

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { newsData } from '~/data/news'
import type { CommunityNews } from '~/types'
import NewsFilterBar from '~/components/news/NewsFilterBar.vue'
import NewsFeaturedCard from '~/components/news/NewsFeaturedCard.vue'
import NewsCard from '~/components/news/NewsCard.vue'
import NewsEmptyState from '~/components/news/NewsEmptyState.vue'

const searchQuery = ref('')
const { data: newsItems } = await useFetch<CommunityNews[]>('/api/news', {
  default: () => newsData
})

const articles = computed(() => newsItems.value || newsData)

const featuredArticle = computed(() => {
  return articles.value.find(a => a.isFeatured) || articles.value[0]
})

const filteredNews = computed(() => {
  return articles.value.filter(item => {
    const matchesSearch = searchQuery.value.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesSearch
  })
})

useSeoMeta({
  title: 'Berita Komunitas & Update - Disney Pixar Cars Steam',
  description: 'Pembaruan terkini turnamen Piston Cup, mod tekstur HD 4K, panduan Steam Deck 60FPS, dan berita komunitas game Disney Pixar Cars di Steam.',
  ogTitle: 'Disney Pixar Cars Community News'
})
</script>

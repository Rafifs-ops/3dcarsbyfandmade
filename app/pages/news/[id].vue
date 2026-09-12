<template>
  <div v-if="article" class="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
    
    <!-- Top Breadcrumbs -->
    <div class="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
      <NuxtLink
        to="/news"
        class="inline-flex items-center gap-2 text-xs font-chakra tracking-wider uppercase text-muted-silver hover:text-lightning-yellow transition-colors"
      >
        <BootstrapIcon name="arrow-left" />
        <span>Kembali ke Berita</span>
      </NuxtLink>

      <span class="text-xs font-chakra text-lightning-yellow uppercase tracking-widest px-2.5 py-0.5 rounded bg-white/5 border border-white/10 flex items-center gap-1.5">
        <BootstrapIcon name="newspaper" class="text-xs" />
        <span>Berita Komunitas</span>
      </span>
    </div>

    <!-- Article Header -->
    <NewsDetailHeader :article="article" />

    <!-- Featured Header Image -->
    <div class="relative aspect-video rounded-2xl overflow-hidden carbon-card border border-white/15 shadow-2xl">
      <img
        :src="article.image"
        :alt="article.title"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Article Body Content (Supports HTML from WYSIWYG) -->
    <div
      class="carbon-card p-6 sm:p-10 rounded-2xl border border-white/10 space-y-4 text-muted-silver-light font-inter leading-relaxed text-sm sm:text-base news-article-rendered-body"
      v-html="article.content"
    />

    <!-- Community Action Navigation Bar -->
    <NewsReactionBar />

    <!-- Steam Footer Banner -->
    <NewsSteamBanner />

  </div>

  <!-- 404 State -->
  <div v-else class="py-20 text-center carbon-card rounded-2xl max-w-md mx-auto border border-white/10 space-y-4">
    <h2 class="text-2xl font-russo text-pure-white">Artikel Tidak Ditemukan</h2>
    <p class="text-xs font-chakra text-muted-silver">Artikel yang Anda cari mungkin telah dipindahkan atau dihapus.</p>
    <NuxtLink to="/news" class="inline-block px-5 py-2.5 rounded bg-rust-red text-white text-xs font-chakra font-bold uppercase">
      Kembali ke Berita
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { newsData } from '~/data/news'
import type { CommunityNews } from '~/types'
import NewsDetailHeader from '~/components/news-detail/NewsDetailHeader.vue'
import NewsReactionBar from '~/components/news-detail/NewsReactionBar.vue'
import NewsSteamBanner from '~/components/news-detail/NewsSteamBanner.vue'

const route = useRoute()
const id = computed(() => route.params.id as string)

const { data: fetchedArticle } = await useFetch<CommunityNews>(() => `/api/news/${id.value}`, {
  default: () => newsData.find(a => a.id === id.value || a.slug === id.value) as any
})

const article = computed<CommunityNews | undefined>(() => {
  return fetchedArticle.value || newsData.find(a => a.id === id.value || a.slug === id.value)
})

useSeoMeta({
  title: computed(() => article.value ? `${article.value.title} | Cars Community News` : 'News Detail | Cars Steam'),
  description: computed(() => article.value?.excerpt || 'Detail berita komunitas game Cars')
})
</script>

<style>
.news-article-rendered-body p {
  margin-bottom: 1rem;
}
.news-article-rendered-body h1 {
  font-family: 'Russo One', sans-serif;
  font-size: 1.75rem;
  color: #ffffff;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}
.news-article-rendered-body h2 {
  font-family: 'Russo One', sans-serif;
  font-size: 1.35rem;
  color: #FFC700;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}
.news-article-rendered-body h3 {
  font-family: 'Chakra Petch', sans-serif;
  font-size: 1.15rem;
  font-weight: bold;
  color: #E11D2A;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}
.news-article-rendered-body ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}
.news-article-rendered-body ol {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}
.news-article-rendered-body li {
  margin-bottom: 0.25rem;
}
.news-article-rendered-body blockquote {
  border-left: 3px solid #E11D2A;
  padding: 0.5rem 1rem;
  background: rgba(225, 29, 42, 0.08);
  border-radius: 0 8px 8px 0;
  margin: 1rem 0;
  font-style: italic;
}
.news-article-rendered-body code {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
  color: #FFC700;
}
</style>

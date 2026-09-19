<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lightning-yellow/10 border border-lightning-yellow/30 text-lightning-yellow text-xs font-chakra tracking-widest uppercase mb-2">
          <BootstrapIcon name="newspaper" />
          <span>NEWS</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-russo text-pure-white tracking-wide">
          COMMUNITY NEWS & UPDATES
        </h1>
        <p class="text-sm sm:text-base text-muted-silver mt-1 max-w-2xl">
          Dapatkan berita terkini seputar turnamen komunitas online, panduan konfigurasi Steam Deck 60 FPS, rilis mod tekstur HD 4K, dan update patch terbaru.
        </p>
      </div>

      <!-- Search Input -->
      <div class="relative w-full md:w-80">
        <BootstrapIcon name="search" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-silver text-sm" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari artikel berita..."
          class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-carbon-gray border border-white/10 text-pure-white placeholder:text-muted-silver/60 text-xs font-chakra focus:outline-none focus:border-lightning-yellow/60 transition-colors"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const searchQuery = defineModel<string>('search', { default: '' })
</script>

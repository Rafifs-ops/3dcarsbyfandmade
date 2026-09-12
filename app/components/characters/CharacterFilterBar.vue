<template>
  <div class="space-y-6">

    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
      <div>
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rust-red/20 border border-rust-red/40 text-pure-white text-xs font-chakra tracking-widest uppercase mb-2">
          <BootstrapIcon name="people-fill" class="text-lightning-yellow" />
          <span>Characters Catalog (20+ Model 3D)</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-russo text-pure-white tracking-wide">
          DISNEY•PIXAR CARS ROSTER
        </h1>
        <p class="text-sm sm:text-base text-muted-silver mt-1 max-w-2xl">
          Jelajahi seluruh pembalap Piston Cup legendaris, warga kota Radiator Springs, rival World Grand Prix, hingga
          agen rahasia C.H.R.O.M.E. Klik karakter untuk melihat inspeksi 3D 360° dan spesifikasi lengkap.
        </p>
      </div>

      <!-- Search Input -->
      <div class="relative w-full md:w-72">
        <BootstrapIcon name="search" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-silver text-sm" />
        <input v-model="searchQuery" type="text" placeholder="Cari nama atau sponsor..."
          class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-carbon-gray border border-white/10 text-pure-white placeholder:text-muted-silver/60 text-xs font-chakra focus:outline-none focus:border-lightning-yellow/60 transition-colors" />
      </div>
    </div>

    <!-- Category Filter Tabs -->
    <div class="flex flex-wrap items-center gap-2">
      <button v-for="cat in categories" :key="cat.id" @click="activeCategory = cat.id"
        class="px-4 py-2 rounded-xl text-xs font-chakra font-semibold tracking-wider uppercase transition-all duration-200 border flex items-center gap-2"
        :class="activeCategory === cat.id
          ? 'bg-rust-red text-white border-rust-red shadow-[0_0_15px_rgba(225,29,42,0.4)] scale-105'
          : 'bg-carbon-gray text-muted-silver hover:text-white border-white/10 hover:border-white/25'">
        <BootstrapIcon :name="cat.icon" class="text-sm" />
        <span>{{ cat.label }}</span>
        <span class="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 font-mono">
          {{ getCount(cat.id) }}
        </span>
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
interface CategoryItem {
  id: string
  label: string
  icon: any
}

defineProps<{
  categories: readonly CategoryItem[]
  getCount: (id: string) => number
}>()

const searchQuery = defineModel<string>('search', { default: '' })
const activeCategory = defineModel<string>('category', { default: 'all' })
</script>

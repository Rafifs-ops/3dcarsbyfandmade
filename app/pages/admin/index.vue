<template>
  <div class="space-y-8">
    
    <!-- Page Top Header Banner -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-carbon-gray p-6 rounded-2xl border border-white/10 shadow-xl">
      <div class="space-y-1">
        <div class="inline-flex items-center gap-2 text-xs font-chakra text-lightning-yellow uppercase tracking-widest">
          <BootstrapIcon name="speedometer2" />
          <span>Control Center</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-russo text-pure-white">
          DASHBOARD OVERVIEW
        </h1>
        <p class="text-xs sm:text-sm text-muted-silver font-inter">
          Kelola seluruh konten dinamis website Disney Pixar Cars Steam Game Hub dari panel ini.
        </p>
      </div>

      <!-- Quick Seed / Resync Button -->
      <div class="flex items-center gap-3">
        <button
          @click="openResyncModal = true"
          :disabled="isResyncing"
          class="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-chakra font-bold uppercase border border-white/15 flex items-center gap-2 transition-all shadow-md active:scale-95"
        >
          <BootstrapIcon name="database-fill-gear" :class="isResyncing ? 'animate-spin text-lightning-yellow' : 'text-dinoco-blue'" />
          <span>{{ isResyncing ? 'Sinkronisasi...' : 'Sinkronkan Database' }}</span>
        </button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      
      <!-- News Stat -->
      <NuxtLink
        to="/admin/news"
        class="p-5 rounded-2xl carbon-card border border-white/10 hover:border-lightning-yellow/50 transition-all group flex flex-col justify-between"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-chakra text-muted-silver uppercase">Total Berita</span>
          <div class="w-10 h-10 rounded-xl bg-lightning-yellow/10 text-lightning-yellow flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
            <BootstrapIcon name="newspaper" />
          </div>
        </div>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-3xl font-russo text-white">{{ newsList.length }}</span>
          <span class="text-xs font-chakra text-lightning-yellow flex items-center gap-1">
            <span>Kelola</span>
            <BootstrapIcon name="arrow-right" />
          </span>
        </div>
      </NuxtLink>

      <!-- Characters Stat -->
      <NuxtLink
        to="/admin/characters"
        class="p-5 rounded-2xl carbon-card border border-white/10 hover:border-rust-red/50 transition-all group flex flex-col justify-between"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-chakra text-muted-silver uppercase">Karakter 3D</span>
          <div class="w-10 h-10 rounded-xl bg-rust-red/10 text-rust-red-light flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
            <BootstrapIcon name="car-front-fill" />
          </div>
        </div>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-3xl font-russo text-white">{{ charactersList.length }}</span>
          <span class="text-xs font-chakra text-rust-red-light flex items-center gap-1">
            <span>Kelola</span>
            <BootstrapIcon name="arrow-right" />
          </span>
        </div>
      </NuxtLink>

      <!-- Tracks Stat -->
      <NuxtLink
        to="/admin/tracks"
        class="p-5 rounded-2xl carbon-card border border-white/10 hover:border-emerald-500/50 transition-all group flex flex-col justify-between"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-chakra text-muted-silver uppercase">Sirkuit Balap</span>
          <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
            <BootstrapIcon name="flag-fill" />
          </div>
        </div>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-3xl font-russo text-white">{{ tracksList.length }}</span>
          <span class="text-xs font-chakra text-emerald-400 flex items-center gap-1">
            <span>Kelola</span>
            <BootstrapIcon name="arrow-right" />
          </span>
        </div>
      </NuxtLink>

      <!-- Specs Stat -->
      <NuxtLink
        to="/admin/specs"
        class="p-5 rounded-2xl carbon-card border border-white/10 hover:border-dinoco-blue/50 transition-all group flex flex-col justify-between"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-chakra text-muted-silver uppercase">Game</span>
          <div class="w-10 h-10 rounded-xl bg-dinoco-blue/10 text-dinoco-blue flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
            <BootstrapIcon name="cpu-fill" />
          </div>
        </div>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-3xl font-russo text-white">2</span>
          <span class="text-xs font-chakra text-dinoco-blue flex items-center gap-1">
            <span>Kelola</span>
            <BootstrapIcon name="arrow-right" />
          </span>
        </div>
      </NuxtLink>

      <!-- Gameplay Stat -->
      <NuxtLink
        to="/admin/gameplay"
        class="p-5 rounded-2xl carbon-card border border-white/10 hover:border-purple-500/50 transition-all group flex flex-col justify-between"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-chakra text-muted-silver uppercase">Video Gameplay</span>
          <div class="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
            <BootstrapIcon name="play-btn-fill" />
          </div>
        </div>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-3xl font-russo text-white">{{ videosList.length }}</span>
          <span class="text-xs font-chakra text-purple-400 flex items-center gap-1">
            <span>Kelola</span>
            <BootstrapIcon name="arrow-right" />
          </span>
        </div>
      </NuxtLink>

    </div>

    <!-- Quick Action Launchpads -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <NuxtLink
        to="/admin/news/new"
        class="p-4 rounded-xl bg-carbon-gray hover:bg-carbon-gray-light border border-white/10 hover:border-lightning-yellow/50 flex items-center gap-3 transition-all group"
      >
        <div class="w-10 h-10 rounded-lg bg-lightning-yellow/20 text-lightning-yellow flex items-center justify-center text-lg group-hover:scale-105">
          <BootstrapIcon name="plus-circle-fill" />
        </div>
        <div>
          <h4 class="font-chakra font-bold text-sm text-white group-hover:text-lightning-yellow">Tambah Berita Baru</h4>
          <p class="text-[11px] text-muted-silver">Tulis artikel / berita</p>
        </div>
      </NuxtLink>

      <NuxtLink
        to="/admin/characters/new"
        class="p-4 rounded-xl bg-carbon-gray hover:bg-carbon-gray-light border border-white/10 hover:border-rust-red/50 flex items-center gap-3 transition-all group"
      >
        <div class="w-10 h-10 rounded-lg bg-rust-red/20 text-rust-red-light flex items-center justify-center text-lg group-hover:scale-105">
          <BootstrapIcon name="plus-circle-fill" />
        </div>
        <div>
          <h4 class="font-chakra font-bold text-sm text-white group-hover:text-rust-red-light">Tambah Karakter</h4>
          <p class="text-[11px] text-muted-silver">Input 3D model, skins & spek</p>
        </div>
      </NuxtLink>

      <NuxtLink
        to="/admin/tracks/new"
        class="p-4 rounded-xl bg-carbon-gray hover:bg-carbon-gray-light border border-white/10 hover:border-emerald-400/50 flex items-center gap-3 transition-all group"
      >
        <div class="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg group-hover:scale-105">
          <BootstrapIcon name="plus-circle-fill" />
        </div>
        <div>
          <h4 class="font-chakra font-bold text-sm text-white group-hover:text-emerald-400">Tambah Sirkuit</h4>
          <p class="text-[11px] text-muted-silver">Deskripsi map sirkuit dan tambah gambar</p>
        </div>
      </NuxtLink>

      <NuxtLink
        to="/admin/gameplay/new"
        class="p-4 rounded-xl bg-carbon-gray hover:bg-carbon-gray-light border border-white/10 hover:border-purple-400/50 flex items-center gap-3 transition-all group"
      >
        <div class="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-lg group-hover:scale-105">
          <BootstrapIcon name="plus-circle-fill" />
        </div>
        <div>
          <h4 class="font-chakra font-bold text-sm text-white group-hover:text-purple-400">Tambah Video</h4>
          <p class="text-[11px] text-muted-silver">Link YouTube & kategori</p>
        </div>
      </NuxtLink>
    </div>

    <!-- Recent Tables Preview -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      <!-- Recent News Table -->
      <div class="carbon-card rounded-2xl border border-white/10 p-6 space-y-4">
        <div class="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 class="font-russo text-lg text-white flex items-center gap-2">
            <BootstrapIcon name="newspaper" class="text-lightning-yellow" />
            <span>Berita Terbaru</span>
          </h3>
          <NuxtLink to="/admin/news" class="text-xs font-chakra text-lightning-yellow hover:underline">
            Lihat Semua
          </NuxtLink>
        </div>

        <div class="space-y-3">
          <div
            v-for="item in newsList.slice(0, 4)"
            :key="item.id"
            class="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 hover:border-white/20 transition-colors"
          >
            <div class="space-y-1 max-w-[75%]">
              <p class="font-chakra font-bold text-xs text-white truncate">{{ item.title }}</p>
              <div class="flex items-center gap-2 text-[11px] font-chakra text-muted-silver">
                <span>{{ item.date }}</span>
                <span>•</span>
                <span>{{ item.author }}</span>
                <span v-if="item.isFeatured" class="px-1.5 py-0.2 rounded bg-lightning-yellow/20 text-lightning-yellow text-[9px] font-bold">FEATURED</span>
              </div>
            </div>
            <NuxtLink
              :to="`/admin/news/${item.id}`"
              class="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-chakra transition-colors"
            >
              <BootstrapIcon name="pencil-square" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Recent Characters Table -->
      <div class="carbon-card rounded-2xl border border-white/10 p-6 space-y-4">
        <div class="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 class="font-russo text-lg text-white flex items-center gap-2">
            <BootstrapIcon name="car-front-fill" class="text-rust-red-light" />
            <span>Daftar Karakter</span>
          </h3>
          <NuxtLink to="/admin/characters" class="text-xs font-chakra text-rust-red-light hover:underline">
            Lihat Semua
          </NuxtLink>
        </div>

        <div class="space-y-3">
          <div
            v-for="item in charactersList.slice(0, 4)"
            :key="item.id"
            class="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 hover:border-white/20 transition-colors"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-3 h-8 rounded-full flex-shrink-0"
                :style="{ backgroundColor: item.primaryColor || '#E11D2A' }"
              />
              <div class="space-y-0.5">
                <p class="font-chakra font-bold text-xs text-white">{{ item.name }}</p>
                <p class="text-[11px] font-chakra text-muted-silver">{{ item.categoryLabel }} • {{ item.stats?.topSpeed || 200 }} MPH</p>
              </div>
            </div>
            <NuxtLink
              :to="`/admin/characters/${item.id}`"
              class="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-chakra transition-colors"
            >
              <BootstrapIcon name="pencil-square" />
            </NuxtLink>
          </div>
        </div>
      </div>

    </div>

    <!-- Re-sync Confirmation Modal -->
    <AdminModal
      v-model="openResyncModal"
      title="Sinkronisasi Data Awal ke Turso"
      confirm-text="Mulai Sinkronisasi"
      confirm-type="primary"
      :loading="isResyncing"
      @confirm="handleResync"
    >
      <p>
        Tindakan ini akan mengimpor ulang data awal (news, characters, tracks, specs, gameplay) ke database Turso.
        Data yang telah Anda buat atau modifikasi akan di-upsert sesuai ID.
      </p>
    </AdminModal>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'admin'
})

const { success, error: toastError } = useToast()

const { data: newsList } = await useFetch<any[]>('/api/news', { default: () => [] })
const { data: charactersList } = await useFetch<any[]>('/api/characters', { default: () => [] })
const { data: tracksList } = await useFetch<any[]>('/api/tracks', { default: () => [] })
const { data: videosList } = await useFetch<any[]>('/api/gameplay', { default: () => [] })

const openResyncModal = ref(false)
const isResyncing = ref(false)

const handleResync = async () => {
  try {
    isResyncing.value = true
    await $fetch('/api/seed', {
      method: 'POST',
      body: { force: true }
    })
    success('Sinkronisasi Berhasil', 'Database Turso telah berhasil dimigrasi dan disinkronkan!')
    openResyncModal.value = false
    await refreshNuxtData()
  } catch (err: any) {
    toastError('Gagal Sinkronisasi', err?.message || 'Terjadi kesalahan saat sinkronisasi.')
  } finally {
    isResyncing.value = false
  }
}

useSeoMeta({
  title: 'Dashboard Overview - Disney Pixar Cars CMS'
})
</script>

<template>
  <div 
    class="carbon-card rounded-2xl overflow-hidden border p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all"
    :class="theme === 'red' 
      ? 'border-rust-red/40 hover:border-rust-red shadow-[0_0_30px_rgba(225,29,42,0.15)]' 
      : 'border-white/10 hover:border-lightning-yellow/50 shadow-[0_0_30px_rgba(255,199,0,0.1)]'"
  >
    <div class="space-y-5">
      
      <!-- Edition Header Badges -->
      <div class="flex items-center justify-between">
        <span 
          class="px-3 py-1 rounded text-xs font-chakra font-bold uppercase border"
          :class="theme === 'red' 
            ? 'bg-rust-red/20 text-rust-red-light border-rust-red/30' 
            : 'bg-amber-500/20 text-amber-300 border-amber-500/30'"
        >
          {{ editionTitle }}
        </span>
        <span 
          class="text-xs font-chakra font-bold"
          :class="theme === 'red' ? 'text-rust-red' : 'text-lightning-yellow'"
        >
          {{ editionTag }}
        </span>
      </div>

      <!-- Game Cover Showcase Container -->
      <div class="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden bg-black/50 border border-white/10 flex items-center justify-center p-3 group">
        <!-- Glow Backdrop -->
        <div 
          class="absolute inset-0 opacity-20 group-hover:opacity-35 blur-3xl transition-opacity duration-500 rounded-full"
          :class="theme === 'red' ? 'bg-rust-red' : 'bg-lightning-yellow'"
        />

        <!-- Cover Image (Box Art) -->
        <img 
          v-if="gameSpec.coverUrl"
          :src="gameSpec.coverUrl" 
          :alt="gameSpec.title"
          class="relative z-10 max-h-full max-w-full object-contain rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.8)] border border-white/10 group-hover:scale-105 transition-transform duration-500"
        />

        <div v-else class="relative z-10 flex flex-col items-center justify-center gap-2 text-muted-silver">
          <BootstrapIcon name="controller" class="text-4xl text-lightning-yellow/70" />
          <span class="text-xs font-chakra uppercase">{{ gameSpec.title }}</span>
        </div>

        <!-- Release Year Badge on Cover -->
        <div class="absolute top-3 right-3 z-10 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/20 text-xs font-chakra font-bold text-white shadow">
          {{ gameSpec.releaseYear }}
        </div>
      </div>

      <!-- Game Title & Summary -->
      <div>
        <h2 class="text-2xl sm:text-3xl font-russo text-pure-white leading-tight mb-2">
          {{ gameSpec.title }}
        </h2>

        <p class="text-xs font-inter text-muted-silver leading-relaxed">
          {{ gameSpec.summary }}
        </p>
      </div>

      <!-- Key Meta Table -->
      <div class="bg-black/40 rounded-xl p-4 border border-white/5 space-y-2 text-xs font-chakra">
        <div class="flex justify-between py-1 border-b border-white/5">
          <span class="text-muted-silver">Tahun Rilis:</span>
          <span class="text-white font-bold">{{ gameSpec.releaseYear }}</span>
        </div>
        <div class="flex justify-between py-1 border-b border-white/5">
          <span class="text-muted-silver">Pengembang (Developer):</span>
          <span class="text-white font-bold">{{ gameSpec.developer }}</span>
        </div>
        <div class="flex justify-between py-1 border-b border-white/5">
          <span class="text-muted-silver">Penerbit (Publisher):</span>
          <span class="text-white font-bold">{{ gameSpec.publisher }}</span>
        </div>
        <div class="flex justify-between py-1 border-b border-white/5">
          <span class="text-muted-silver">Genre:</span>
          <span 
            class="font-bold"
            :class="theme === 'red' ? 'text-rust-red-light' : 'text-lightning-yellow'"
          >
            {{ gameSpec.genre }}
          </span>
        </div>
        <div class="flex justify-between py-1">
          <span class="text-muted-silver">Platform Resmi:</span>
          <span class="text-dinoco-blue font-bold">Steam Store (App ID: {{ gameSpec.steamAppId }})</span>
        </div>
      </div>

    </div>

    <!-- Direct Steam Action -->
    <div class="pt-4 border-t border-white/10">
      <a
        :href="gameSpec.steamUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-racing-skew w-full py-3.5 rounded text-white text-xs font-chakra font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
        :class="theme === 'red'
          ? 'bg-gradient-to-r from-rust-red to-rust-red-dark hover:from-rust-red-light shadow-[0_0_20px_rgba(225,29,42,0.5)]'
          : 'bg-carbon-gray hover:bg-carbon-gray-light border border-white/20 hover:border-lightning-yellow/50'"
      >
        <BootstrapIcon name="steam" :class="theme === 'red' ? 'text-sm' : 'text-lightning-yellow text-sm'" />
        <span>{{ theme === 'red' ? 'Beli Cars 2 di Steam Store' : 'Lihat Cars (2006) di Steam Store' }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameSpec } from '~/types'

defineProps<{
  gameSpec: GameSpec
  editionTitle: string
  editionTag: string
  theme: 'yellow' | 'red'
}>()
</script>

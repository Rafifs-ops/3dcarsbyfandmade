<template>
  <div>
    <!-- Trigger Showcase Banner -->
    <div
      class="relative w-full rounded-2xl overflow-hidden carbon-card border border-white/10 p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">

      <!-- Text Info & Highlights -->
      <div class="space-y-4 max-w-xl text-left">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rust-red/20 border border-rust-red/40 text-pure-white text-xs font-chakra tracking-widest uppercase">
          <BootstrapIcon name="camera-reels-fill" class="text-lightning-yellow" />
          <span>Gameplay Video</span>
        </div>

        <h3 class="text-2xl sm:text-4xl font-russo text-pure-white tracking-wide leading-tight">
          SAKSIKAN AKSI BALAP & SPIONASE PALING INTENS!
        </h3>

        <div class="flex flex-wrap items-center gap-4 pt-2">
          <button @click="isOpen = true"
            class="btn-racing-skew px-6 py-3 rounded bg-gradient-to-r from-rust-red to-rust-red-dark hover:from-rust-red-light hover:to-rust-red text-white text-sm font-chakra font-bold tracking-wider uppercase flex items-center gap-2 shadow-[0_0_25px_rgba(225,29,42,0.6)] active:scale-95 transition-all">
            <BootstrapIcon name="play-circle-fill" class="text-lightning-yellow text-lg" />
            <span>Tonton Trailer Fullscreen</span>
          </button>

          <NuxtLink to="/gameplay"
            class="px-5 py-3 rounded-lg bg-carbon-gray hover:bg-carbon-gray-light text-muted-silver hover:text-white text-sm font-chakra font-semibold border border-white/10 flex items-center gap-2 transition-all">
            <BootstrapIcon name="controller" class="text-dinoco-blue" />
            <span>Semua Video Gameplay</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Video Thumbnail Preview Card with Glowing Play Button -->
      <div @click="isOpen = true"
        class="relative w-full lg:w-[480px] h-[260px] sm:h-[300px] rounded-xl overflow-hidden border border-white/20 shadow-2xl cursor-pointer group select-none">
        <img src="https://img.youtube.com/vi/dx0oDJqy77A/hqdefault.jpg" alt="Cars Video Game Cinematic Trailer"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <!-- Glowing Play Circle -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div
            class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rust-red/90 group-hover:bg-rust-red flex items-center justify-center text-white text-3xl shadow-[0_0_30px_rgba(225,29,42,0.8)] group-hover:scale-110 transition-transform duration-300 border-2 border-lightning-yellow">
            <BootstrapIcon name="play-fill" class="ml-1" />
          </div>
        </div>

      </div>

    </div>

    <!-- Modal Fullscreen YouTube Embed -->
    <Teleport to="body">
      <div v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn"
        @click.self="isOpen = false">
        <div
          class="relative w-full max-w-5xl bg-carbon-gray rounded-2xl overflow-hidden border border-white/20 shadow-2xl">

          <!-- Modal Top Bar -->
          <div class="p-4 bg-carbon-dark border-b border-white/10 flex items-center justify-between">
            <div class="flex items-center gap-2 text-pure-white font-chakra text-sm font-semibold">
              <BootstrapIcon name="youtube" class="text-rust-red text-lg" />
              <span>Disney•Pixar Cars 2: The Video Game - Trailer Sinematik</span>
            </div>

            <button @click="isOpen = false"
              class="p-2 rounded-lg bg-white/10 hover:bg-rust-red text-white transition-colors"
              aria-label="Tutup Video">
              <BootstrapIcon name="x-lg" />
            </button>
          </div>

          <!-- 16:9 YouTube Embed -->
          <div class="relative w-full aspect-video bg-black">
            <iframe
              src="https://www.youtube.com/embed/dx0oDJqy77A?si=NGMTxTGq4Scv518q?autoplay=1&rel=0&modestbranding=1"
              title="Cars Video Game Cinematic Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen class="w-full h-full border-0" />
          </div>

          <!-- Modal Footer CTA -->
          <div
            class="p-4 bg-carbon-dark/80 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-chakra">

            <a href="https://store.steampowered.com/app/301760/DisneyPixar_Cars_2/" target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-2 rounded bg-rust-red hover:bg-rust-red-light text-white font-bold tracking-wider uppercase flex items-center gap-1.5 transition-all shadow-lg">
              <BootstrapIcon name="steam" />
              <span>Dapatkan di Steam</span>
            </a>
          </div>

        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
</script>

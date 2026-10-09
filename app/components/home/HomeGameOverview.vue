<template>
  <section class="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

    <div class="text-center max-w-3xl mx-auto mb-12 space-y-3" data-aos="fade-up">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dinoco-blue/10 border border-dinoco-blue/30 text-dinoco-blue text-xs font-chakra tracking-widest uppercase">
        <BootstrapIcon name="collection-play-fill" />
        <span>The Games</span>
      </div>
      <h2 class="text-3xl sm:text-5xl font-russo text-pure-white tracking-wide">
        Get These Games and Play It
      </h2>
    </div>

    <!-- Dual Cards Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

      <!-- Game 1: Cars (2006) -->
      <div
        class="rounded-2xl overflow-hidden carbon-card border border-white/10 p-8 flex flex-col justify-between hover:border-lightning-yellow/40 transition-all duration-300"
        data-aos="fade-up" data-aos-delay="100">
        <div>
          <!-- Header Tag & Developer -->
          <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span
              class="px-3 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-chakra font-bold uppercase">
               Released 2006 • Open-World
            </span>
            <span class="text-xs font-chakra text-muted-silver">
              Rainbow Studios
            </span>
          </div>

          <!-- Cover Art Banner -->
          <div
            class="relative w-full h-48 sm:h-56 mb-5 rounded-xl overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center p-2 group">
            <div
              class="absolute inset-0 bg-lightning-yellow/10 blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
            <img src="/images/games-cover/cover-cars-1-ps2.webp" alt="Disney Pixar Cars (2006) Cover"
              class="relative z-10 max-h-full max-w-full object-contain rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300" />
          </div>

          <h3 class="text-2xl sm:text-3xl font-russo text-pure-white mb-2">
            Disney•Pixar Cars (Classic)
          </h3>

          <p class="text-sm text-muted-silver leading-relaxed mb-6">
            Begin rookie Lightning McQueen's journey as he gets lost in Radiator Springs. Experience the freedom of
            exploring the town and Ornament Valley in the open world, race on the dusty tracks of Willy's Butte, and
            master Doc Hudson's legendary drifting techniques.
          </p>
        </div>

        <div class="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
          <div class="text-xs font-chakra text-muted-silver">
            <span class="block text-[10px] uppercase">Platform:</span>
            <span class="text-white font-bold">Steam Official</span>
          </div>

          <a href="https://store.steampowered.com/app/288580/DisneyPixar_Cars/" target="_blank"
            rel="noopener noreferrer"
            class="btn-racing-skew px-5 py-2.5 rounded bg-carbon-gray hover:bg-carbon-gray-light text-white text-xs font-chakra font-bold tracking-wider uppercase border border-white/20 hover:border-lightning-yellow/50 flex items-center gap-1.5 transition-all">
            <BootstrapIcon name="steam" class="text-lightning-yellow" />
            <span>Buy Cars (2006)</span>
          </a>
        </div>
      </div>

      <!-- Game 2: Cars 2: The Video Game (2011) -->
      <div
        class="rounded-2xl overflow-hidden carbon-card border border-rust-red/30 p-8 flex flex-col justify-between hover:border-rust-red transition-all duration-300 shadow-[0_0_30px_rgba(225,29,42,0.15)]"
        data-aos="fade-up" data-aos-delay="200">
        <div>
          <!-- Header Tag & Developer -->
          <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span
              class="px-3 py-1 rounded bg-rust-red/20 text-rust-red-light border border-rust-red/30 text-xs font-chakra font-bold uppercase">
               Released 2011 • Spy Combat Racing
            </span>
            <span class="text-xs font-chakra text-muted-silver">
              Avalanche Software
            </span>
          </div>

          <!-- Cover Art Banner -->
          <div
            class="relative w-full h-48 sm:h-56 mb-5 rounded-xl overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center p-2 group">
            <div class="absolute inset-0 bg-rust-red/10 blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
            <img src="/images/games-cover/cover-cars-2-ps3.jpg" alt="Disney Pixar Cars 2 Cover"
              class="relative z-10 max-h-full max-w-full object-contain rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300" />
          </div>

          <h3 class="text-2xl sm:text-3xl font-russo text-pure-white mb-2">
            Disney•Pixar Cars 2: The Video Game
          </h3>

          <p class="text-sm text-muted-silver leading-relaxed mb-6">
            Join the C.H.R.O.M.E. intelligence agency! Compete in the World Grand Prix tournament across Tokyo, London,
            and Italy with advanced weaponry (homing missiles, oil mines) and acrobatic two-wheel racing tricks.
          </p>
        </div>

        <div class="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
          <div class="text-xs font-chakra text-muted-silver">
            <span class="block text-[10px] uppercase">Platform:</span>
            <span class="text-white font-bold">Steam Official</span>
          </div>

          <a href="https://store.steampowered.com/app/301760/DisneyPixar_Cars_2/" target="_blank"
            rel="noopener noreferrer"
            class="btn-racing-skew px-5 py-2.5 rounded bg-gradient-to-r from-rust-red to-rust-red-dark text-white text-xs font-chakra font-bold tracking-wider uppercase shadow-lg hover:shadow-rust-red/50 flex items-center gap-1.5 transition-all">
            <BootstrapIcon name="steam" />
            <span>Buy Cars 2 on Steam</span>
          </a>
        </div>
      </div>

    </div>

  </section>
</template>

<script setup lang="ts">
// HomeGameOverview component
</script>

<template>
  <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div
      class="relative rounded-3xl overflow-hidden carbon-card border border-rust-red/40 p-8 sm:p-14 text-center space-y-6 shadow-[0_0_50px_rgba(225,29,42,0.25)]">

      <!-- Background Accents -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-rust-red/20 via-transparent to-dinoco-blue/20 pointer-events-none" />

      <div class="relative z-10 max-w-3xl mx-auto space-y-4">
        <h2 class="text-3xl sm:text-5xl font-racing text-pure-white leading-tight">
          Ready To Play It ?
        </h2>

        <p class="text-sm sm:text-base text-muted-silver">
          Download Game Now !!!
        </p>

        <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
          <NuxtLink to="/identity"
            class="btn-racing-skew px-8 py-4 rounded bg-gradient-to-r from-rust-red via-rust-red to-rust-red-dark hover:from-rust-red-light text-pure-white font-chakra font-extrabold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(225,29,42,0.7)] flex items-center gap-2.5">
            <BootstrapIcon name="steam" class="text-xl" />
            <span>Download Game</span>
          </NuxtLink>

          <NuxtLink to="/characters"
            class="px-7 py-4 rounded-lg bg-carbon-gray hover:bg-carbon-gray-light text-pure-white font-chakra font-bold text-sm tracking-wider uppercase border border-white/20 flex items-center gap-2">
            <BootstrapIcon name="car-front" class="text-lightning-yellow" />
            <span>See All Characters</span>
          </NuxtLink>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
// HomeCtaBanner component
</script>

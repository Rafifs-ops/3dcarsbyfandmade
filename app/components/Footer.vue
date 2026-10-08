<template>
  <footer class="relative overflow-hidden bg-gradient-to-b from-asphalt-black via-[#0a0c10] to-black text-muted-silver">

    <!-- Animated racing stripe at top -->
    <div class="relative h-[3px] w-full overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-rust-red to-transparent footer-stripe-red" />
      <div
        class="absolute inset-0 bg-gradient-to-r from-transparent via-lightning-yellow to-transparent footer-stripe-yellow opacity-60" />
    </div>

    <!-- Background decorations -->
    <div class="absolute inset-0 pointer-events-none select-none">
      <div class="absolute -top-20 -left-24 w-72 h-72 rounded-full bg-rust-red/[0.07] blur-3xl" />
      <div class="absolute -top-16 -right-20 w-64 h-64 rounded-full bg-dinoco-blue/[0.06] blur-3xl" />
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-40 bg-lightning-yellow/[0.03] blur-3xl rounded-full" />
      <div class="absolute inset-0 opacity-[0.025]"
        style="background-image: repeating-linear-gradient(0deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 48px);" />
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">

      <!-- Top Grid -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-10 pb-10 border-b border-white/[0.07]">

        <!-- Brand & Bio -->
        <div class="md:col-span-2 space-y-5">
          <div class="flex items-center gap-3">
            <img src="/logo.png" alt="Cars Game Logo"
              class="h-16 w-auto drop-shadow-[0_0_18px_rgba(255,199,0,0.25)] hover:drop-shadow-[0_0_28px_rgba(255,199,0,0.45)] transition-all duration-300" />
          </div>

          <p class="text-sm font-inter text-muted-silver/70 leading-relaxed max-w-xs">
            A fan-made promotional site celebrating the legendary Disney Pixar Cars universe, race legends, epic
            tracks, and pure adrenaline.
          </p>

          <div class="flex items-center gap-2">
            <span class="text-xs font-chakra tracking-wider text-muted-silver/50">Made with</span>
            <span class="font-racing text-lg footer-kachow-gradient">Ka-Chow!</span>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="space-y-4">
          <h4
            class="relative inline-block text-pure-white font-chakra font-bold text-[11px] tracking-[0.2em] uppercase pb-2">
            Explore
            <span
              class="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-rust-red to-transparent rounded-full" />
          </h4>
          <ul class="space-y-3 text-sm font-chakra">
            <li v-for="link in navLinks" :key="link.to">
              <NuxtLink :to="link.to"
                class="group flex items-center gap-2.5 text-muted-silver/75 hover:text-lightning-yellow transition-all duration-200">
                <span
                  class="w-1.5 h-1.5 rounded-full bg-rust-red/60 group-hover:bg-lightning-yellow group-hover:shadow-[0_0_6px_#FFC700] transition-all duration-200 shrink-0" />
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Iconic Cars -->
        <div class="space-y-4">
          <h4
            class="relative inline-block text-pure-white font-chakra font-bold text-[11px] tracking-[0.2em] uppercase pb-2">
            Iconic Cars
            <span
              class="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-lightning-yellow to-transparent rounded-full" />
          </h4>
          <ul class="space-y-3 text-sm font-chakra">
            <li v-for="char in characters" :key="char.to">
              <NuxtLink :to="char.to"
                class="group flex items-center gap-2.5 text-muted-silver/75 hover:text-pure-white transition-all duration-200">
                <span class="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200"
                  :style="`background:${char.color}; box-shadow: 0 0 0 transparent`"
                  @mouseenter="(e: MouseEvent) => (e.target as HTMLElement).style.boxShadow = `0 0 8px ${char.color}`"
                  @mouseleave="(e: MouseEvent) => (e.target as HTMLElement).style.boxShadow = 'none'" />
                <span class="group-hover:translate-x-0.5 transition-transform duration-200">{{ char.label }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Steam CTA -->
        <div class="space-y-4">
          <h4
            class="relative inline-block text-pure-white font-chakra font-bold text-[11px] tracking-[0.2em] uppercase pb-2">
            Get The Game
            <span
              class="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-dinoco-blue to-transparent rounded-full" />
          </h4>
          <a href="https://store.steampowered.com/app/301760/DisneyPixar_Cars_2/" target="_blank"
            rel="noopener noreferrer"
            class="group block rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] hover:border-rust-red/40 backdrop-blur-sm p-4 transition-all duration-300 hover:shadow-[0_0_24px_rgba(225,29,42,0.15)]">
            <div class="flex items-center gap-3 mb-3">
              <div
                class="w-9 h-9 rounded-lg bg-[#1b2838] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <BootstrapIcon name="steam" class="text-white text-base" />
              </div>
              <div>
                <p class="text-[11px] text-muted-silver/60 font-inter uppercase tracking-wider">Available on</p>
                <p class="text-sm font-chakra font-bold text-pure-white">Steam</p>
              </div>
            </div>
            <div
              class="flex items-center gap-1.5 text-[11px] font-chakra text-rust-red group-hover:text-lightning-yellow transition-colors duration-200 font-semibold tracking-wide">
              <span>Play Now</span>
              <BootstrapIcon name="arrow-right"
                class="text-[10px] group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </a>
        </div>

      </div>

      <!-- Credits / Attribution Section -->
      <div class="py-8 border-b border-white/[0.07]">
        <h4
          class="relative inline-block text-pure-white font-chakra font-bold text-[11px] tracking-[0.2em] uppercase pb-2 mb-5">
          Assets &amp; Credits
          <span
            class="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-dinoco-blue to-transparent rounded-full" />
        </h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">

          <!-- 3D Model Credit -->
          <a href="https://sketchfab.com/DinseyPixarCarsModels" target="_blank" rel="noopener noreferrer"
            class="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-lightning-yellow/30 backdrop-blur-sm p-3.5 transition-all duration-300">
            <div
              class="w-8 h-8 rounded-lg bg-lightning-yellow/10 border border-lightning-yellow/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              <BootstrapIcon name="box" class="text-lightning-yellow text-sm" />
            </div>
            <div class="min-w-0">
              <p class="text-[10px] font-inter text-muted-silver/50 uppercase tracking-wider">3D Model</p>
              <p
                class="text-xs font-chakra font-bold text-pure-white group-hover:text-lightning-yellow transition-colors duration-200 truncate">
                DinseyPixarCarsModel</p>
              <p class="text-[10px] font-inter text-muted-silver/40">Sketchfab — sketchfab.com</p>
            </div>
            <BootstrapIcon name="box-arrow-up-right"
              class="text-muted-silver/30 group-hover:text-lightning-yellow/70 text-[10px] ml-auto shrink-0 transition-colors duration-200" />
          </a>

          <!-- Audio Credit -->
          <a href="https://pixabay.com/id/sound-effects/search/v8/" target="_blank" rel="noopener noreferrer"
            class="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-rust-red/30 backdrop-blur-sm p-3.5 transition-all duration-300">
            <div
              class="w-8 h-8 rounded-lg bg-rust-red/10 border border-rust-red/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              <BootstrapIcon name="volume-up-fill" class="text-rust-red text-sm" />
            </div>
            <div class="min-w-0">
              <p class="text-[10px] font-inter text-muted-silver/50 uppercase tracking-wider">V8 Sound Effects</p>
              <p
                class="text-xs font-chakra font-bold text-pure-white group-hover:text-rust-red transition-colors duration-200 truncate">
                V8 Sound</p>
              <p class="text-[10px] font-inter text-muted-silver/40">Pixabay — pixabay.com</p>
            </div>
            <BootstrapIcon name="box-arrow-up-right"
              class="text-muted-silver/30 group-hover:text-rust-red/70 text-[10px] ml-auto shrink-0 transition-colors duration-200" />
          </a>

        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-[11px] font-inter text-muted-silver/40 tracking-wide">
          © {{ new Date().getFullYear() }} Disney•Pixar Cars — Fan Site. Not affiliated with Disney or Pixar.
        </p>
        <div class="hidden sm:flex items-center gap-2">
          <span class="w-1 h-1 rounded-full bg-rust-red/40" />
          <span class="w-1 h-1 rounded-full bg-lightning-yellow/40" />
          <span class="w-1 h-1 rounded-full bg-dinoco-blue/40" />
        </div>
        <div class="flex items-center gap-2 text-[11px] font-chakra text-muted-silver/40 tracking-widest uppercase">
          <BootstrapIcon name="lightning-fill" class="text-lightning-yellow/60 text-[9px]" />
          <span>Fanmade</span>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
const navLinks = [
  { to: '/', label: 'Virtual 3D Showroom' },
  { to: '/characters', label: 'Characters (20+)' },
  { to: '/gameplay', label: 'Gameplay & Trailer' },
  { to: '/news', label: 'Community News' },
  { to: '/game', label: 'Game Specs' },
]

const characters = [
  { to: '/characters/lightning-mcqueen', label: 'Lightning McQueen (#95)', color: '#E11D2A' },
  { to: '/characters/tow-mater', label: 'Tow Mater', color: '#d97706' },
  { to: '/characters/cruz-ramirez', label: 'Cruz Ramirez (#51)', color: '#FFC700' },
  { to: '/characters/jackson-storm', label: 'Jackson Storm (#2.0)', color: '#00A3E0' },
  { to: '/characters/francesco-bernoulli', label: 'Francesco Bernoulli (#1)', color: '#10b981' },
]
</script>

<style scoped>
@keyframes stripe-slide {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

.footer-stripe-red {
  animation: stripe-slide 3.5s ease-in-out infinite;
}

.footer-stripe-yellow {
  animation: stripe-slide 3.5s ease-in-out 1.2s infinite;
}

.footer-kachow-gradient {
  background: linear-gradient(90deg, #E11D2A, #FFC700, #FFD738);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 8px rgba(255, 199, 0, 0.3));
}
</style>

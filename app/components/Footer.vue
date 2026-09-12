<template>
  <footer class="bg-gradient-to-b from-asphalt-black to-black border-t border-white/10 text-muted-silver pt-16 pb-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Top Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">

        <!-- Brand & Bio -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" class="h-16 w-auto">
          </div>

          <p class="text-sm leading-relaxed text-muted-silver/90 max-w-md">
            Portal promosi interaktif resmi untuk game balap legendaris Disney•Pixar Cars (2006) dan Cars 2: The Video
            Game (2011) di platform Steam. Nikmati aksi balap arcade kecepatan tinggi dan petualangan di Radiator
            Springs.
          </p>

          <!-- Steam Badge Link -->
          <div class="flex flex-wrap items-center gap-3 pt-2">
            <a href="https://store.steampowered.com/app/288580/DisneyPixar_Cars/" target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-carbon-gray hover:bg-carbon-gray-light border border-white/10 text-pure-white text-xs font-chakra transition-all">
              <BootstrapIcon name="steam" class="text-lightning-yellow" />
              <span>Cars (2006) on Steam</span>
            </a>

            <a href="https://store.steampowered.com/app/301760/DisneyPixar_Cars_2/" target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-carbon-gray hover:bg-carbon-gray-light border border-white/10 text-pure-white text-xs font-chakra transition-all">
              <BootstrapIcon name="steam" class="text-rust-red" />
              <span>Cars 2 (2011) on Steam</span>
            </a>
          </div>
        </div>

        <!-- Navigation Links -->
        <div>
          <h4
            class="text-pure-white font-chakra font-bold text-sm tracking-wider uppercase mb-4 border-l-2 border-rust-red pl-2.5">
            Eksplorasi
          </h4>
          <ul class="space-y-2.5 text-sm font-chakra">
            <li>
              <NuxtLink to="/" class="hover:text-lightning-yellow transition-colors flex items-center gap-2">
                <BootstrapIcon name="chevron-right" class="text-[10px] text-rust-red" />
                Virtual 3D Showroom
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/characters" class="hover:text-lightning-yellow transition-colors flex items-center gap-2">
                <BootstrapIcon name="chevron-right" class="text-[10px] text-rust-red" />
                Daftar Karakter (20+)
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/gameplay" class="hover:text-lightning-yellow transition-colors flex items-center gap-2">
                <BootstrapIcon name="chevron-right" class="text-[10px] text-rust-red" />
                Gameplay & Trailer
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/news" class="hover:text-lightning-yellow transition-colors flex items-center gap-2">
                <BootstrapIcon name="chevron-right" class="text-[10px] text-rust-red" />
                Berita Komunitas
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/identity" class="hover:text-lightning-yellow transition-colors flex items-center gap-2">
                <BootstrapIcon name="chevron-right" class="text-[10px] text-rust-red" />
                Identitas 2 Game & Specs
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Featured Characters -->
        <div>
          <h4
            class="text-pure-white font-chakra font-bold text-sm tracking-wider uppercase mb-4 border-l-2 border-lightning-yellow pl-2.5">
            Karakter Ikonik
          </h4>
          <ul class="space-y-2.5 text-sm font-chakra">
            <li>
              <NuxtLink to="/characters/lightning-mcqueen"
                class="hover:text-rust-red transition-colors flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-rust-red" />
                Lightning McQueen (#95)
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/characters/tow-mater"
                class="hover:text-lightning-yellow transition-colors flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-600" />
                Tow Mater
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/characters/cruz-ramirez"
                class="hover:text-lightning-yellow transition-colors flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                Cruz Ramirez (#51)
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/characters/jackson-storm"
                class="hover:text-dinoco-blue transition-colors flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-sky-400" />
                Jackson Storm (#2.0)
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/characters/francesco-bernoulli"
                class="hover:text-emerald-400 transition-colors flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Francesco Bernoulli (#1)
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Community & Social -->
        <div>
          <h4
            class="text-pure-white font-chakra font-bold text-sm tracking-wider uppercase mb-4 border-l-2 border-dinoco-blue pl-2.5">
            Komunitas
          </h4>
          <p class="text-xs text-muted-silver mb-3">
            Bergabung dengan ribuan pembalap Piston Cup di komunitas global untuk mabar & turnamen.
          </p>
          <div class="flex items-center gap-3">
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer"
              class="w-9 h-9 rounded-lg bg-carbon-gray hover:bg-[#5865F2] hover:text-white flex items-center justify-center transition-colors text-base border border-white/10"
              title="Discord Community">
              <BootstrapIcon name="discord" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
              class="w-9 h-9 rounded-lg bg-carbon-gray hover:bg-[#FF0000] hover:text-white flex items-center justify-center transition-colors text-base border border-white/10"
              title="YouTube Gaming">
              <BootstrapIcon name="youtube" />
            </a>
            <a href="https://store.steampowered.com" target="_blank" rel="noopener noreferrer"
              class="w-9 h-9 rounded-lg bg-carbon-gray hover:bg-rust-red hover:text-white flex items-center justify-center transition-colors text-base border border-white/10"
              title="Steam Community Hub">
              <BootstrapIcon name="steam" />
            </a>
          </div>
        </div>

      </div>

      <!-- Bottom Notice -->
      <div
        class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-chakra text-muted-silver/70">
        <p>
          © Disney•Pixar Cars Fanmade.
        </p>
        <p class="flex items-center gap-1">
          Made With Spirits • <span class="text-lightning-yellow">Ka-Chow!</span>
        </p>
      </div>

    </div>
  </footer>
</template>

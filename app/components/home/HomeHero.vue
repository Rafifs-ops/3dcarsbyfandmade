<template>
  <section
    class="relative min-h-[90vh] flex items-center justify-center pt-28 sm:pt-36 mt-3 pb-16 px-4 sm:px-6 lg:px-8">

    <!-- Background Ambient Glow & Racing Elements -->
    <div
      class="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-rust-red/15 rounded-full blur-[140px] pointer-events-none" />
    <div
      class="absolute top-1/3 -right-40 w-[500px] h-[400px] bg-dinoco-blue/10 rounded-full blur-[120px] pointer-events-none" />

    <div class="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">

      <!-- Left Hero Text (7 cols) -->
      <div class="lg:col-span-7 space-y-6 text-left">

        <!-- Main Racing Headline -->
        <h1
          class="text-4xl sm:text-6xl xl:text-7xl font-racing text-pure-white leading-[1.05] tracking-tight text-shadow">
          SPEED. <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-rust-red via-lightning-yellow to-rust-red">I AM
            SPEED.</span>
          <span class="block font-russo text-3xl sm:text-5xl text-pure-white mt-2">
            KA-CHOW!
          </span>
        </h1>

        <!-- Subheadline -->
        <p class="text-base sm:text-lg text-muted-silver leading-relaxed max-w-2xl font-inter">
          Kuasai lintasan sirkuit Piston Cup dan selami misi spionase internasional berkecepatan tinggi! Jelajahi
          panggung virtual 3D interaktif, ganti corak livery legendaris, dan rasakan kembali raungan mesin V8 di
          platform Steam.
        </p>

        <!-- Primary CTA Buttons -->
        <div class="flex flex-wrap items-center gap-4 pt-2">

          <!-- Steam CTA Button Cars 2 -->
          <NuxtLink to="/identity"
            rel="noopener noreferrer"
            class="btn-racing-skew px-7 py-4 rounded bg-gradient-to-r from-rust-red via-rust-red to-rust-red-dark hover:from-rust-red-light hover:to-rust-red text-pure-white font-chakra font-extrabold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(225,29,42,0.55)] border border-rust-red-light/50 flex items-center gap-2.5 group transition-all cursor-pointer">
            <BootstrapIcon name="steam" class="text-xl" />
            <span>Get The Games On Steam</span>
            <BootstrapIcon name="arrow-right" class="group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>

        <!-- Feature Pills -->
        <div class="pt-4 grid grid-cols-3 gap-4 border-t border-white/10 max-w-xl text-left">
          <div>
            <BootstrapIcon name="steam" :size="50" class="text-white" />
            <div class="text-xs font-chakra text-muted-silver mt-2">Available on Steam</div>
          </div>
          <div>
            <BootstrapIcon name="playstation" :size="50" class="text-white" />
            <div class="text-xs font-chakra text-muted-silver mt-2">Available on Playstation</div>
          </div>
        </div>

      </div>

      <!-- Right Column: Interactive 3D Model Card (5 cols) -->
      <div class="lg:col-span-5 relative">
        <div
          class="relative rounded-2xl overflow-hidden carbon-card border border-rust-red/30 shadow-[0_0_40px_rgba(225,29,42,0.2)] flex flex-col justify-between">

          <!-- Top HUD Header -->
          <div
            class="p-4 bg-gradient-to-b from-black/80 to-black/20 border-b border-white/10 flex items-center justify-between z-10">
            <div class="flex items-center gap-3">
              <div
                class="w-9 h-9 rounded-lg bg-rust-red flex items-center justify-center font-racing text-lg font-bold text-white shadow-md border border-white/20">
                95
              </div>
              <div>
                <span class="text-[10px] font-chakra tracking-widest uppercase text-lightning-yellow block">
                  3D Model
                </span>
                <h3 class="text-sm font-russo text-pure-white">
                  Lightning McQueen
                </h3>
              </div>
            </div>

            <!-- Quick Audio / Spin Action Buttons -->
            <div class="flex items-center gap-1.5">
              <button @click="playKaChow"
                class="px-2.5 py-1.5 rounded-lg bg-rust-red hover:bg-rust-red-light text-white text-xs font-chakra font-bold flex items-center gap-1 border border-white/10 transition-all cursor-pointer shadow"
                title="Dengar Ka-Chow!">
                <BootstrapIcon name="megaphone-fill" class="text-lightning-yellow text-xs" />
                <span>Ka-Chow!</span>
              </button>
            </div>
          </div>

          <!-- 3D Model Canvas Container without Ground Base -->
          <div
            class="relative w-full h-[320px] sm:h-[360px] cursor-grab active:cursor-grabbing select-none bg-gradient-to-b from-[#14171E] to-[#0A0C0F] overflow-hidden">

            <!-- HUD Loading Badge (Overlay when 3D model is downloading) -->
            <Transition name="fade">
              <div
                v-if="isLoading"
                class="absolute top-3 left-4 z-10 pointer-events-none flex items-center gap-2 bg-black/80 border border-lightning-yellow/50 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-lg"
              >
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-lightning-yellow opacity-75" />
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-lightning-yellow" />
                </span>
                <span class="text-[10px] font-chakra font-bold text-white tracking-wider">
                  SKELETON CHASSIS AKTIF • MEMUAT 3D...
                </span>
              </div>
            </Transition>

            <ClientOnly>
              <TresCanvas clear-color="#0F1115" shadows :window-size="false" class="w-full h-full">
                <TresPerspectiveCamera :position="[3.2, 1.5, 3.8]" :fov="45" :look-at="[0, 0.1, 0]" />
                <OrbitControls :enable-damping="true" :damping-factor="0.05" :min-distance="1.6" :max-distance="7.5"
                  :auto-rotate="true" :auto-rotate-speed="1.6" :rotate-speed="1.4" :target="[0, 0.1, 0]" />

                <TresAmbientLight :intensity="1.6" />
                <TresDirectionalLight :position="[4, 7, 4]" :intensity="2.8" color="#FFFFFF" cast-shadow />
                <TresDirectionalLight :position="[-4, 3, -4]" :intensity="1.4" color="#FFC700" />
                <TresDirectionalLight :position="[0, -4, 0]" :intensity="1.0" color="#E11D2A" />
                <TresSpotLight :position="[0, 5, 0]" :intensity="2.2" color="#E11D2A" />

                <!-- 3D Model Group -->
                <TresGroup ref="heroGroupRef">
                  <Suspense @resolve="isLoading = false" @fallback="isLoading = true">
                    <template #default>
                      <GLTFModel path="/models/mcqueen.glb" :scale="1.0" :position="[0, 0, 0]" cast-shadow />
                    </template>
                    <template #fallback>
                      <CarSkeleton3D
                        primary-color="#E11D2A"
                        accent-color="#FFC700"
                        :scale="1.0"
                        :position-offset="[0, 0, 0]"
                      />
                    </template>
                  </Suspense>
                </TresGroup>
              </TresCanvas>
              <template #fallback>
                <CarSkeletonLoader
                  primary-color="#E11D2A"
                  accent-color="#FFC700"
                  title="MEMUAT LIGHTNING MCQUEEN..."
                />
              </template>
            </ClientOnly>

            <!-- Free Orbit Hint Watermark -->
            <div
              class="absolute bottom-3 left-4 pointer-events-none flex items-center gap-1.5 text-white/50 font-chakra text-[11px]">
              <span>540°</span>
            </div>

            <!-- Rev Engine Quick Button -->
            <button @click="triggerRev" :disabled="isRevving"
              class="absolute bottom-3 right-4 px-3 py-1.5 rounded-lg bg-rust-red/90 hover:bg-rust-red text-white text-xs font-chakra font-bold flex items-center gap-1.5 border border-rust-red-light/40 shadow-lg cursor-pointer transition-all active:scale-95 z-10">
              <BootstrapIcon name="speedometer2" class="text-lightning-yellow" />
              <span>{{ isRevving ? 'REV!' : 'Rev V8' }}</span>
            </button>
          </div>
        </div>
      </div>

    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { useCarAudio } from '~/composables/useCarAudio'
import CarSkeleton3D from '~/components/CarSkeleton3D.vue'
import CarSkeletonLoader from '~/components/CarSkeletonLoader.vue'

const heroGroupRef = shallowRef<any>(null)
const isLoading = ref<boolean>(true)
const { isRevving, revEngine, playSound } = useCarAudio()

const playKaChow = () => {
  playSound('/audio/ka-chow.mp3')
}

const triggerRev = () => {
  revEngine()
}
</script>

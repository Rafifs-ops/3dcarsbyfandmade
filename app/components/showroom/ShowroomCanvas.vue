<template>
  <div
    class="relative w-full h-[400px] sm:h-[460px] md:h-[500px] cursor-grab active:cursor-grabbing select-none overflow-hidden"
    ref="canvasContainer">

    <!-- HUD Loading Badge (Overlay when 3D model is downloading) -->
    <Transition name="fade">
      <div v-if="isLoading"
        class="absolute top-4 left-4 z-10 pointer-events-none flex items-center gap-2 bg-black/80 border border-lightning-yellow/50 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-lg">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-lightning-yellow opacity-75" />
          <span class="relative inline-flex rounded-full h-2 w-2 bg-lightning-yellow" />
        </span>
        <span class="text-[11px] font-chakra font-bold text-white tracking-wider">
          SKELETAL CHASSIS ACTIVE • LOADING {{ activeCharacter?.name?.toUpperCase() || 'MODEL' }}...
        </span>
      </div>
    </Transition>

    <ClientOnly>
      <TresCanvas clear-color="#0F1115" shadows :window-size="false" class="w-full h-full">
        <TresPerspectiveCamera :position="[3.6, 1.6, 4.2]" :fov="45" :look-at="[0, 0.3, 0]" />
        <OrbitControls :enable-damping="true" :damping-factor="0.05" :min-distance="1.5" :max-distance="9.0"
          :auto-rotate="false" :rotate-speed="1.4" :target="[0, 0.3, 0]" />

        <!-- Ambient Lighting -->
        <TresAmbientLight :intensity="1.8" />

        <!-- Main Key Light (Top-Front) -->
        <TresDirectionalLight :position="[5, 8, 5]" :intensity="2.8" color="#FFFFFF" cast-shadow />

        <!-- Rim Accent Light (Back-Side) -->
        <TresDirectionalLight :position="[-5, 4, -4]" :intensity="2.0" color="#00A3E0" />

        <!-- Underbelly Fill Light (Bottom) for full visibility from underneath -->
        <TresDirectionalLight :position="[0, -5, 0]" :intensity="1.2" :color="activeCharacter.primaryColor" />

        <!-- Top Spotlight -->
        <TresSpotLight :position="[0, 6, 0]" :intensity="2.4" :angle="0.8" :penumbra="0.7"
          :color="activeCharacter.primaryColor" />

        <!-- 3D Model Group -->
        <TresGroup>
          <Suspense @resolve="isLoading = false" @fallback="isLoading = true">
            <template #default>
              <GLTFModel :key="currentModelPath" :path="currentModelPath" :scale="activeCharacter.scale || 1"
                :position="activeCharacter.positionOffset || [0, 0, 0]" cast-shadow />
            </template>
            <template #fallback>
              <CarSkeleton3D :primary-color="activeCharacter.primaryColor" :accent-color="activeCharacter.accentColor"
                :scale="activeCharacter.scale || 1" :position-offset="activeCharacter.positionOffset || [0, 0, 0]" />
            </template>
          </Suspense>
        </TresGroup>
      </TresCanvas>
      <template #fallback>
        <CarSkeletonLoader :primary-color="activeCharacter.primaryColor" :accent-color="activeCharacter.accentColor"
          :title="`LOADING ${activeCharacter?.name?.toUpperCase() || 'CAR'}...`" />
      </template>
    </ClientOnly>

    <!-- Copyright Attribution Badges -->
    <div class="absolute bottom-3 right-3 z-10 flex flex-col items-end gap-1.5">
      <!-- 3D Model Credit -->
      <a href="https://sketchfab.com/DinseyPixarCarsModels" target="_blank" rel="noopener noreferrer"
        class="flex items-center gap-1.5 bg-black/70 hover:bg-black/90 border border-white/10 hover:border-lightning-yellow/40 backdrop-blur-md px-2.5 py-1.5 rounded-lg transition-all duration-200 group"
        title="3D Model by DinseyPixarCarsModel on Sketchfab">
        <BootstrapIcon name="box"
          class="text-lightning-yellow/70 group-hover:text-lightning-yellow text-[10px] transition-colors" />
        <span class="font-chakra text-[9px] text-white/50 group-hover:text-white/80 transition-colors leading-tight">
          3D © <span class="text-lightning-yellow/80 group-hover:text-lightning-yellow">DinseyPixarCarsModel</span><br>
          <span class="text-white/30">from Sketchfab</span>
        </span>
      </a>
      <!-- Audio Credit -->
      <a href="https://pixabay.com/id/sound-effects/search/v8/" target="_blank" rel="noopener noreferrer"
        class="flex items-center gap-1.5 bg-black/70 hover:bg-black/90 border border-white/10 hover:border-rust-red/40 backdrop-blur-md px-2.5 py-1.5 rounded-lg transition-all duration-200 group"
        title="V8 Sound by Pixabay">
        <BootstrapIcon name="volume-up-fill"
          class="text-rust-red/70 group-hover:text-rust-red text-[10px] transition-colors" />
        <span class="font-chakra text-[9px] text-white/50 group-hover:text-white/80 transition-colors leading-tight">
          🔊 © <span class="text-rust-red/80 group-hover:text-rust-red">V8 Sound</span><br>
          <span class="text-white/30">from Pixabay</span>
        </span>
      </a>
      <!-- Character Voice Credit -->
      <a href="https://sounds.spriters-resource.com/playstation_3/cars3driventowin/#section-60460" target="_blank" rel="noopener noreferrer"
        class="flex items-center gap-1.5 bg-black/70 hover:bg-black/90 border border-white/10 hover:border-dinoco-blue/40 backdrop-blur-md px-2.5 py-1.5 rounded-lg transition-all duration-200 group"
        title="Iconic Character Voices by Sound Resource">
        <BootstrapIcon name="megaphone-fill"
          class="text-dinoco-blue/70 group-hover:text-dinoco-blue text-[10px] transition-colors" />
        <span class="font-chakra text-[9px] text-white/50 group-hover:text-white/80 transition-colors leading-tight">
          🎙️ © <span class="text-dinoco-blue/90 group-hover:text-dinoco-blue">Sound Resource</span><br>
          <span class="text-white/30">Cars 3: Driven to Win</span>
        </span>
      </a>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Character } from '~/types'
import CarSkeleton3D from '~/components/CarSkeleton3D.vue'
import CarSkeletonLoader from '~/components/CarSkeletonLoader.vue'

const canvasContainer = ref<HTMLElement | null>(null)
const isLoading = ref<boolean>(true)

const props = defineProps<{
  currentModelPath: string
  activeCharacter: Character
}>()

watch(() => props.currentModelPath, () => {
  isLoading.value = true
})
</script>

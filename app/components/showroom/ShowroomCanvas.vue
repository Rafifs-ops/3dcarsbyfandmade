<template>
  <div
    class="relative w-full h-[400px] sm:h-[460px] md:h-[500px] cursor-grab active:cursor-grabbing select-none overflow-hidden"
    ref="canvasContainer">

    <!-- HUD Loading Badge (Overlay when 3D model is downloading) -->
    <Transition name="fade">
      <div
        v-if="isLoading"
        class="absolute top-4 left-4 z-10 pointer-events-none flex items-center gap-2 bg-black/80 border border-lightning-yellow/50 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-lg"
      >
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-lightning-yellow opacity-75" />
          <span class="relative inline-flex rounded-full h-2 w-2 bg-lightning-yellow" />
        </span>
        <span class="text-[11px] font-chakra font-bold text-white tracking-wider">
          SKELETON CHASSIS AKTIF • MEMUAT {{ activeCharacter?.name?.toUpperCase() || 'MODEL' }}...
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
              <CarSkeleton3D
                :primary-color="activeCharacter.primaryColor"
                :accent-color="activeCharacter.accentColor"
                :scale="activeCharacter.scale || 1"
                :position-offset="activeCharacter.positionOffset || [0, 0, 0]"
              />
            </template>
          </Suspense>
        </TresGroup>
      </TresCanvas>
      <template #fallback>
        <CarSkeletonLoader
          :primary-color="activeCharacter.primaryColor"
          :accent-color="activeCharacter.accentColor"
          :title="`MEMUAT ${activeCharacter?.name?.toUpperCase() || 'MOBIL'}...`"
        />
      </template>
    </ClientOnly>
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

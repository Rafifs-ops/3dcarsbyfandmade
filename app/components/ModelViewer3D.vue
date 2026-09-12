<template>
  <div class="relative w-full h-full min-h-[380px] rounded-xl overflow-hidden bg-gradient-to-b from-[#181B22] to-[#0D0F13] border border-white/10 select-none">
    
    <!-- Controls Overlay -->
    <div class="absolute top-4 right-4 z-10 flex items-center gap-2">
      <!-- 540 Spin Button -->
      <button
        @click="spin540"
        class="px-2.5 py-2 rounded-lg bg-black/60 hover:bg-rust-red text-white hover:text-lightning-yellow border border-white/10 backdrop-blur-md transition-all text-xs flex items-center gap-1 cursor-pointer"
        title="Spin 540°"
      >
        <BootstrapIcon name="arrow-clockwise" class="text-lightning-yellow" />
        <span class="text-[11px] font-chakra font-bold">540°</span>
      </button>

      <!-- Auto Rotate Toggle -->
      <button
        @click="autoRotate = !autoRotate"
        class="p-2 rounded-lg bg-black/60 hover:bg-black/80 text-muted-silver hover:text-lightning-yellow border border-white/10 backdrop-blur-md transition-all text-xs flex items-center gap-1 cursor-pointer"
        :class="{ 'text-lightning-yellow border-lightning-yellow/40': autoRotate }"
        title="Toggle Auto Rotate"
      >
        <BootstrapIcon name="arrow-repeat" :class="{ 'animate-spin': autoRotate }" />
      </button>

      <!-- Reset Camera -->
      <button
        @click="resetView"
        class="p-2 rounded-lg bg-black/60 hover:bg-black/80 text-muted-silver hover:text-white border border-white/10 backdrop-blur-md transition-all text-xs cursor-pointer"
        title="Reset Kamera"
      >
        <BootstrapIcon name="aspect-ratio" />
      </button>
    </div>

    <!-- Instruction watermark -->
    <div class="absolute bottom-4 left-4 z-10 pointer-events-none flex items-center gap-2 text-white/40 font-chakra text-[11px]">
      <BootstrapIcon name="cursor" class="text-lightning-yellow" />
      <span>Rotasi Bebas Segala Arah (Full Orbit 360°/540°)</span>
    </div>

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
          SKELETON CHASSIS AKTIF • MEMUAT MODEL 3D...
        </span>
      </div>
    </Transition>

    <!-- TresJS Canvas -->
    <ClientOnly>
      <TresCanvas
        clear-color="#12151B"
        shadows
        :window-size="false"
        class="w-full h-full"
      >
        <TresPerspectiveCamera
          :position="[3.2, 1.6, 3.8]"
          :fov="45"
          :look-at="[0, 0.2, 0]"
        />
        <OrbitControls
          :enable-damping="true"
          :damping-factor="0.05"
          :min-distance="1.5"
          :max-distance="8.0"
          :auto-rotate="autoRotate"
          :auto-rotate-speed="1.6"
          :rotate-speed="1.4"
          :target="[0, 0.2, 0]"
        />

        <TresAmbientLight :intensity="1.6" />
        <TresDirectionalLight
          :position="[4, 7, 4]"
          :intensity="2.6"
          cast-shadow
        />
        <TresDirectionalLight
          :position="[-4, 3, -4]"
          :intensity="1.4"
          :color="accentColor || '#00A3E0'"
        />
        <TresDirectionalLight
          :position="[0, -4, 0]"
          :intensity="1.0"
          :color="primaryColor || '#E11D2A'"
        />
        <TresSpotLight
          :position="[0, 5, 0]"
          :intensity="2.2"
          :color="primaryColor || '#E11D2A'"
        />

        <!-- 3D Model Loading -->
        <TresGroup ref="modelGroupRef">
          <Suspense @resolve="isLoading = false" @fallback="isLoading = true">
            <template #default>
              <GLTFModel
                :key="modelPath"
                :path="modelPath"
                :scale="scale || 1.0"
                :position="positionOffset || [0, 0, 0]"
                cast-shadow
              />
            </template>
            <template #fallback>
              <CarSkeleton3D
                :primary-color="primaryColor"
                :accent-color="accentColor"
                :scale="scale || 1.0"
                :position-offset="positionOffset || [0, 0, 0]"
              />
            </template>
          </Suspense>
        </TresGroup>
      </TresCanvas>
      <template #fallback>
        <CarSkeletonLoader
          :primary-color="primaryColor"
          :accent-color="accentColor"
        />
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, watch } from 'vue'
import gsap from 'gsap'
import CarSkeleton3D from '~/components/CarSkeleton3D.vue'
import CarSkeletonLoader from '~/components/CarSkeletonLoader.vue'

const props = withDefaults(defineProps<{
  modelPath: string
  primaryColor?: string
  accentColor?: string
  scale?: number
  positionOffset?: [number, number, number]
}>(), {
  primaryColor: '#E11D2A',
  accentColor: '#FFC700',
  scale: 1.0,
  positionOffset: () => [0, 0, 0]
})

const autoRotate = ref<boolean>(true)
const resetTrigger = ref<number>(0)
const modelGroupRef = shallowRef<any>(null)
const isLoading = ref<boolean>(true)

watch(() => props.modelPath, () => {
  isLoading.value = true
})

const resetView = () => {
  autoRotate.value = true
  resetTrigger.value++
  if (modelGroupRef.value) {
    gsap.to(modelGroupRef.value.rotation, {
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    })
  }
}

const spin540 = () => {
  if (modelGroupRef.value) {
    gsap.to(modelGroupRef.value.rotation, {
      y: modelGroupRef.value.rotation.y + Math.PI * 3,
      duration: 1.4,
      ease: 'power2.out'
    })
  }
}
</script>

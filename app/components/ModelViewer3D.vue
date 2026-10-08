<template>
  <div ref="containerRef"
    class="relative w-full h-full min-h-[260px] xs:min-h-[300px] sm:min-h-[360px] md:min-h-[420px] rounded-xl overflow-hidden bg-gradient-to-b from-[#181B22] to-[#0D0F13] border border-white/10 select-none">

    <!-- Controls Overlay -->
    <div class="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex items-center gap-1.5 sm:gap-2">
      <!-- 540 Spin Button -->
      <button @click="spin540"
        class="px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-lg bg-black/60 hover:bg-rust-red text-white hover:text-lightning-yellow border border-white/10 backdrop-blur-md transition-all text-xs flex items-center gap-1 cursor-pointer active:scale-95"
        title="Spin 540°">
        <BootstrapIcon name="arrow-clockwise" class="text-lightning-yellow text-xs" />
        <span class="text-[10px] sm:text-[11px] font-chakra font-bold">540°</span>
      </button>

      <!-- Auto Rotate Toggle -->
      <button @click="autoRotate = !autoRotate"
        class="p-1.5 sm:p-2 rounded-lg bg-black/60 hover:bg-black/80 text-muted-silver hover:text-lightning-yellow border border-white/10 backdrop-blur-md transition-all text-xs flex items-center gap-1 cursor-pointer active:scale-95"
        :class="{ 'text-lightning-yellow border-lightning-yellow/40 bg-lightning-yellow/10': autoRotate }"
        :title="autoRotate ? 'Jeda Rotasi Otomatis' : 'Putar Otomatis'">
        <BootstrapIcon name="arrow-repeat" class="text-xs" :class="{ 'animate-spin': autoRotate }" />
      </button>

      <!-- Fullscreen Toggle -->
      <button @click="$emit('toggleFullscreen')"
        class="p-1.5 sm:p-2 rounded-lg bg-black/60 hover:bg-black/80 text-muted-silver hover:text-lightning-yellow border border-white/10 backdrop-blur-md transition-all text-xs cursor-pointer active:scale-95"
        :title="isFullscreen ? 'Keluar Layar Penuh' : 'Mode Layar Penuh'">
        <BootstrapIcon :name="isFullscreen ? 'fullscreen-exit' : 'arrows-fullscreen'" class="text-xs" />
      </button>
    </div>

    <!-- Instruction watermark -->
    <div
      class="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 pointer-events-none flex items-center gap-1.5 text-white/45 font-chakra text-[10px] sm:text-[11px] max-w-[55%]">
      <BootstrapIcon name="cursor" class="text-lightning-yellow shrink-0 text-xs" />
      <span class="hidden sm:inline truncate">Rotasi Bebas Segala Arah (Full Orbit 360°/540°)</span>
      <span class="sm:hidden truncate">Geser untuk rotasi 360°</span>
    </div>

    <!-- 3D Model Copyright Badge -->
    <a href="https://sketchfab.com/DinseyPixarCarsModels" target="_blank" rel="noopener noreferrer"
      class="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 flex items-center gap-1.5 bg-black/70 hover:bg-black/90 border border-white/10 hover:border-lightning-yellow/40 backdrop-blur-md px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg transition-all duration-200 group shrink-0"
      title="3D Model by DinseyPixarCarsModel on Sketchfab">
      <BootstrapIcon name="box"
        class="text-lightning-yellow/70 group-hover:text-lightning-yellow text-[9px] sm:text-[10px] transition-colors shrink-0" />
      <span
        class="font-chakra text-[8px] sm:text-[9px] text-white/50 group-hover:text-white/80 transition-colors leading-tight">
        3D © <span class="text-lightning-yellow/80 group-hover:text-lightning-yellow">DinseyPixarCarsModel</span><br>
        <span class="text-white/30 hidden xs:inline">from Sketchfab</span>
      </span>
    </a>

    <!-- HUD Loading Badge (Positioned below the top sponsor badge to avoid collision) -->
    <Transition name="fade">
      <div v-if="isLoading"
        class="absolute top-14 left-3 sm:top-16 sm:left-4 z-10 pointer-events-none max-w-[calc(100%-24px)] sm:max-w-md flex items-center gap-2 bg-black/85 border border-lightning-yellow/50 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-lg">
        <span class="relative flex h-2 w-2 shrink-0">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-lightning-yellow opacity-75" />
          <span class="relative inline-flex rounded-full h-2 w-2 bg-lightning-yellow" />
        </span>
        <span class="text-[10px] sm:text-[11px] font-chakra font-bold text-white tracking-wider truncate">
          SKELETAL CHASSIS ACTIVE • MEMUAT MODEL 3D...
        </span>
      </div>
    </Transition>

    <!-- TresJS Canvas -->
    <ClientOnly>
      <TresCanvas clear-color="#12151B" shadows :window-size="false" class="w-full h-full">
        <TresPerspectiveCamera :position="cameraPosition" :fov="45" :look-at="[0, 0.2, 0]" />
        <OrbitControls ref="controlsRef" :enable-damping="true" :damping-factor="0.05" :min-distance="1.5"
          :max-distance="14.0" :auto-rotate="autoRotate" :auto-rotate-speed="1.6" :rotate-speed="1.4"
          :target="[0, 0.2, 0]" />

        <TresAmbientLight :intensity="1.6" />
        <TresDirectionalLight :position="[4, 7, 4]" :intensity="2.6" cast-shadow />
        <TresDirectionalLight :position="[-4, 3, -4]" :intensity="1.4" :color="accentColor || '#00A3E0'" />
        <TresDirectionalLight :position="[0, -4, 0]" :intensity="1.0" :color="primaryColor || '#E11D2A'" />
        <TresSpotLight :position="[0, 5, 0]" :intensity="2.2" :color="primaryColor || '#E11D2A'" />

        <!-- 3D Model Loading -->
        <TresGroup ref="modelGroupRef">
          <Suspense @resolve="isLoading = false" @fallback="isLoading = true">
            <template #default>
              <TresGroup :position="positionOffset || [0, 0, 0]" :rotation="rotationOffset || [0, 0, 0]">
                <GLTFModel ref="gltfRef" :key="modelPath" :path="modelPath" cast-shadow />
              </TresGroup>
            </template>
            <template #fallback>
              <CarSkeleton3D :primary-color="primaryColor" :accent-color="accentColor" :scale="scale || 1.0"
                :position-offset="positionOffset || [0, 0, 0]" />
            </template>
          </Suspense>
        </TresGroup>
      </TresCanvas>
      <template #fallback>
        <CarSkeletonLoader :primary-color="primaryColor" :accent-color="accentColor" />
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { Box3, Vector3 } from 'three'
import gsap from 'gsap'
import CarSkeleton3D from '~/components/CarSkeleton3D.vue'
import CarSkeletonLoader from '~/components/CarSkeletonLoader.vue'

const props = withDefaults(defineProps<{
  modelPath: string
  primaryColor?: string
  accentColor?: string
  scale?: number
  positionOffset?: [number, number, number]
  rotationOffset?: [number, number, number]
  isFullscreen?: boolean
}>(), {
  primaryColor: '#E11D2A',
  accentColor: '#FFC700',
  scale: 1.0,
  positionOffset: () => [0, 0, 0],
  rotationOffset: () => [0, 0, 0],
  isFullscreen: false
})

defineEmits<{
  (e: 'toggleFullscreen'): void
}>()

const TARGET_MAX_DIM = 4.6

const containerRef = shallowRef<HTMLElement | null>(null)
const controlsRef = shallowRef<any>(null)
const gltfRef = ref<any>(null)
const autoRotate = ref<boolean>(true)
const resetTrigger = ref<number>(0)
const modelGroupRef = shallowRef<any>(null)
const isLoading = ref<boolean>(true)

// Responsive Camera Positioning
// Base framing is designed for wide/desktop viewports (aspect >= 1.3).
// In narrow viewports (mobile/portrait tablets), perspective camera with fixed vertical FOV
// shrinks the horizontal view width. We dynamically scale distance inversely to preserve horizontal span.
const cameraPosition = ref<[number, number, number]>([3.2, 1.6, 3.8])

function calculateCameraFraming() {
  if (typeof window === 'undefined') return

  const width = containerRef.value?.clientWidth || window.innerWidth
  const height = containerRef.value?.clientHeight || window.innerHeight
  const aspect = width / (height || 1)

  // When aspect ratio < 1.3, scale distance inversely to preserve horizontal framing width:
  const factor = aspect < 1.3 ? Math.min(1.48, Math.max(1.0, 1.25 / aspect)) : 1.0

  cameraPosition.value = [
    Number((3.2 * factor).toFixed(2)),
    Number((1.6 * factor).toFixed(2)),
    Number((3.8 * factor).toFixed(2))
  ]
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  calculateCameraFraming()

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', calculateCameraFraming)
    if (window.ResizeObserver && containerRef.value) {
      resizeObserver = new ResizeObserver(() => {
        calculateCameraFraming()
      })
      resizeObserver.observe(containerRef.value)
    }
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', calculateCameraFraming)
  }
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})

watch(() => props.isFullscreen, () => {
  nextTick(() => {
    calculateCameraFraming()
  })
})

function normalizeModel(scene: any) {
  if (!scene) return

  scene.updateMatrixWorld(true)
  const box = new Box3().setFromObject(scene)
  if (box.isEmpty()) return

  const size = box.getSize(new Vector3())
  const center = box.getCenter(new Vector3())
  const maxDim = Math.max(size.x, size.y, size.z) || 1
  const fit = (TARGET_MAX_DIM * (props.scale || 1)) / maxDim

  const origin = { x: scene.position.x, y: scene.position.y, z: scene.position.z }
  scene.scale.multiplyScalar(fit)
  scene.position.set(
    -fit * (center.x - origin.x),
    -fit * (center.y - origin.y),
    -fit * (center.z - origin.z)
  )
}

watch(
  () => {
    const instance = (gltfRef.value as any)?.instance
    const gltf = instance?.value ?? instance
    return gltf?.scene ?? null
  },
  (scene) => {
    if (scene) normalizeModel(scene)
  },
  { immediate: true, flush: 'post' }
)

watch(() => props.modelPath, () => {
  isLoading.value = true
})

const resetView = () => {
  autoRotate.value = true
  resetTrigger.value++
  calculateCameraFraming()
  const controls = controlsRef.value?.instance || controlsRef.value
  if (controls && controls.object) {
    gsap.to(controls.object.position, {
      x: cameraPosition.value[0],
      y: cameraPosition.value[1],
      z: cameraPosition.value[2],
      duration: 0.8,
      ease: 'power2.out',
      onUpdate: () => controls.update?.()
    })
  }
  if (modelGroupRef.value) {
    gsap.to(modelGroupRef.value.rotation, {
      x: 0,
      y: 0,
      z: 0,
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

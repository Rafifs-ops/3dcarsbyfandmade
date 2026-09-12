<template>
  <TresGroup
    ref="carSkeletonGroup"
    :position="positionOffset"
    :scale="[scale, scale, scale]"
  >
    <!-- Main Chassis & Body Tub -->
    <TresMesh :position="[0, 0.16, 0]">
      <TresBoxGeometry :args="[1.25, 0.14, 2.3]" />
      <TresMeshBasicMaterial :color="primaryColor" wireframe />
    </TresMesh>

    <!-- Cockpit & Roll Cage (Cabin Skeleton) -->
    <TresMesh :position="[0, 0.52, -0.15]">
      <TresBoxGeometry :args="[0.85, 0.38, 1.05]" />
      <TresMeshBasicMaterial :color="accentColor || '#FFC700'" wireframe />
    </TresMesh>

    <!-- Windshield Slanted Pillar Frame -->
    <TresMesh :position="[0, 0.40, 0.5]" :rotation="[-0.5, 0, 0]">
      <TresBoxGeometry :args="[0.86, 0.03, 0.42]" />
      <TresMeshBasicMaterial :color="accentColor || '#FFC700'" wireframe />
    </TresMesh>

    <!-- Rear Window Slanted Pillar Frame -->
    <TresMesh :position="[0, 0.42, -0.78]" :rotation="[0.4, 0, 0]">
      <TresBoxGeometry :args="[0.86, 0.03, 0.38]" />
      <TresMeshBasicMaterial :color="accentColor || '#FFC700'" wireframe />
    </TresMesh>

    <!-- Front Hood & Nose Slanted Structure -->
    <TresMesh :position="[0, 0.24, 0.78]">
      <TresBoxGeometry :args="[1.12, 0.16, 0.78]" />
      <TresMeshBasicMaterial :color="primaryColor" wireframe />
    </TresMesh>

    <!-- Aerodynamic Front Splitter -->
    <TresMesh :position="[0, 0.08, 1.25]">
      <TresBoxGeometry :args="[1.3, 0.04, 0.28]" />
      <TresMeshBasicMaterial :color="accentColor || '#FFC700'" wireframe />
    </TresMesh>

    <!-- Rear Engine Bay / Haunches -->
    <TresMesh :position="[0, 0.28, -0.85]">
      <TresBoxGeometry :args="[1.22, 0.24, 0.8]" />
      <TresMeshBasicMaterial :color="primaryColor" wireframe />
    </TresMesh>

    <!-- Rear Aero Diffuser -->
    <TresMesh :position="[0, 0.09, -1.24]">
      <TresBoxGeometry :args="[1.26, 0.05, 0.26]" />
      <TresMeshBasicMaterial :color="accentColor || '#FFC700'" wireframe />
    </TresMesh>

    <!-- Side Aerodynamic Skirts / Sills -->
    <TresMesh :position="[0.65, 0.12, 0]">
      <TresBoxGeometry :args="[0.08, 0.08, 1.9]" />
      <TresMeshBasicMaterial :color="accentColor || '#FFC700'" wireframe />
    </TresMesh>
    <TresMesh :position="[-0.65, 0.12, 0]">
      <TresBoxGeometry :args="[0.08, 0.08, 1.9]" />
      <TresMeshBasicMaterial :color="accentColor || '#FFC700'" wireframe />
    </TresMesh>

    <!-- GT Rear Wing / Spoiler Assembly -->
    <!-- Horizontal Wing Blade -->
    <TresMesh :position="[0, 0.72, -1.18]">
      <TresBoxGeometry :args="[1.32, 0.04, 0.28]" />
      <TresMeshBasicMaterial :color="accentColor || '#FFC700'" wireframe />
    </TresMesh>
    <!-- Left Wing Endplate -->
    <TresMesh :position="[0.66, 0.72, -1.18]">
      <TresBoxGeometry :args="[0.02, 0.18, 0.32]" />
      <TresMeshBasicMaterial :color="primaryColor" wireframe />
    </TresMesh>
    <!-- Right Wing Endplate -->
    <TresMesh :position="[-0.66, 0.72, -1.18]">
      <TresBoxGeometry :args="[0.02, 0.18, 0.32]" />
      <TresMeshBasicMaterial :color="primaryColor" wireframe />
    </TresMesh>
    <!-- Wing Support Struts -->
    <TresMesh :position="[0.34, 0.52, -1.18]">
      <TresBoxGeometry :args="[0.04, 0.36, 0.1]" />
      <TresMeshBasicMaterial :color="primaryColor" wireframe />
    </TresMesh>
    <TresMesh :position="[-0.34, 0.52, -1.18]">
      <TresBoxGeometry :args="[0.04, 0.36, 0.1]" />
      <TresMeshBasicMaterial :color="primaryColor" wireframe />
    </TresMesh>

    <!-- Wheel Axles -->
    <TresMesh :position="[0, 0.26, 0.74]" :rotation="[0, 0, Math.PI / 2]">
      <TresCylinderGeometry :args="[0.025, 0.025, 1.34, 8]" />
      <TresMeshBasicMaterial :color="accentColor || '#FFC700'" wireframe />
    </TresMesh>
    <TresMesh :position="[0, 0.28, -0.74]" :rotation="[0, 0, Math.PI / 2]">
      <TresCylinderGeometry :args="[0.025, 0.025, 1.36, 8]" />
      <TresMeshBasicMaterial :color="accentColor || '#FFC700'" wireframe />
    </TresMesh>

    <!-- 4 Wireframe Rotating Racing Wheels -->
    <!-- Front-Left Wheel -->
    <TresGroup ref="frontLeftWheel" :position="[0.66, 0.26, 0.74]">
      <TresMesh :rotation="[0, 0, Math.PI / 2]">
        <TresCylinderGeometry :args="[0.26, 0.26, 0.2, 16]" />
        <TresMeshBasicMaterial :color="accentColor || '#FFC700'" wireframe />
      </TresMesh>
      <TresMesh :rotation="[0, 0, Math.PI / 2]">
        <TresTorusGeometry :args="[0.22, 0.03, 8, 16]" />
        <TresMeshBasicMaterial :color="primaryColor" wireframe />
      </TresMesh>
    </TresGroup>

    <!-- Front-Right Wheel -->
    <TresGroup ref="frontRightWheel" :position="[-0.66, 0.26, 0.74]">
      <TresMesh :rotation="[0, 0, Math.PI / 2]">
        <TresCylinderGeometry :args="[0.26, 0.26, 0.2, 16]" />
        <TresMeshBasicMaterial :color="accentColor || '#FFC700'" wireframe />
      </TresMesh>
      <TresMesh :rotation="[0, 0, Math.PI / 2]">
        <TresTorusGeometry :args="[0.22, 0.03, 8, 16]" />
        <TresMeshBasicMaterial :color="primaryColor" wireframe />
      </TresMesh>
    </TresGroup>

    <!-- Rear-Left Wheel -->
    <TresGroup ref="rearLeftWheel" :position="[0.68, 0.28, -0.74]">
      <TresMesh :rotation="[0, 0, Math.PI / 2]">
        <TresCylinderGeometry :args="[0.28, 0.28, 0.22, 16]" />
        <TresMeshBasicMaterial :color="accentColor || '#FFC700'" wireframe />
      </TresMesh>
      <TresMesh :rotation="[0, 0, Math.PI / 2]">
        <TresTorusGeometry :args="[0.24, 0.03, 8, 16]" />
        <TresMeshBasicMaterial :color="primaryColor" wireframe />
      </TresMesh>
    </TresGroup>

    <!-- Rear-Right Wheel -->
    <TresGroup ref="rearRightWheel" :position="[-0.68, 0.28, -0.74]">
      <TresMesh :rotation="[0, 0, Math.PI / 2]">
        <TresCylinderGeometry :args="[0.28, 0.28, 0.22, 16]" />
        <TresMeshBasicMaterial :color="accentColor || '#FFC700'" wireframe />
      </TresMesh>
      <TresMesh :rotation="[0, 0, Math.PI / 2]">
        <TresTorusGeometry :args="[0.24, 0.03, 8, 16]" />
        <TresMeshBasicMaterial :color="primaryColor" wireframe />
      </TresMesh>
    </TresGroup>

    <!-- Glowing Front Headlight Nodes -->
    <TresMesh :position="[0.42, 0.26, 1.2]">
      <TresBoxGeometry :args="[0.22, 0.08, 0.1]" />
      <TresMeshBasicMaterial :color="accentColor || '#FFC700'" />
    </TresMesh>
    <TresMesh :position="[-0.42, 0.26, 1.2]">
      <TresBoxGeometry :args="[0.22, 0.08, 0.1]" />
      <TresMeshBasicMaterial :color="accentColor || '#FFC700'" />
    </TresMesh>

    <!-- Glowing Rear Taillight Strip -->
    <TresMesh :position="[0, 0.3, -1.26]">
      <TresBoxGeometry :args="[1.05, 0.06, 0.08]" />
      <TresMeshBasicMaterial color="#FF1E27" />
    </TresMesh>

    <!-- Holographic Radar Scanning Grid / Ground Rings -->
    <TresMesh :position="[0, 0.02, 0]" :rotation="[-Math.PI / 2, 0, 0]">
      <TresRingGeometry :args="[1.2, 1.65, 32]" />
      <TresMeshBasicMaterial :color="primaryColor" wireframe :transparent="true" :opacity="0.45" />
    </TresMesh>
    <TresMesh :position="[0, 0.02, 0]" :rotation="[-Math.PI / 2, 0, 0]">
      <TresRingGeometry :args="[0.45, 0.85, 24]" />
      <TresMeshBasicMaterial :color="accentColor || '#FFC700'" wireframe :transparent="true" :opacity="0.55" />
    </TresMesh>

    <!-- Rotating Radar Sweep Line -->
    <TresMesh ref="radarSweep" :position="[0, 0.022, 0]" :rotation="[-Math.PI / 2, 0, 0]">
      <TresPlaneGeometry :args="[3.3, 0.03]" />
      <TresMeshBasicMaterial :color="accentColor || '#FFC700'" :transparent="true" :opacity="0.75" />
    </TresMesh>
  </TresGroup>
</template>

<script setup lang="ts">
import { shallowRef, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
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

const carSkeletonGroup = shallowRef<any>(null)
const frontLeftWheel = shallowRef<any>(null)
const frontRightWheel = shallowRef<any>(null)
const rearLeftWheel = shallowRef<any>(null)
const rearRightWheel = shallowRef<any>(null)
const radarSweep = shallowRef<any>(null)

let animId: number | null = null
let startTime = 0

const animate = (timestamp: number) => {
  if (!startTime) startTime = timestamp
  const elapsed = (timestamp - startTime) / 1000

  // Hovering breathing animation
  if (carSkeletonGroup.value) {
    const baseY = props.positionOffset ? props.positionOffset[1] : 0
    carSkeletonGroup.value.position.y = baseY + Math.sin(elapsed * 2.8) * 0.04
  }

  // Wheel rotation
  const wheelSpeed = 0.06
  if (frontLeftWheel.value) frontLeftWheel.value.rotation.x -= wheelSpeed
  if (frontRightWheel.value) frontRightWheel.value.rotation.x -= wheelSpeed
  if (rearLeftWheel.value) rearLeftWheel.value.rotation.x -= wheelSpeed
  if (rearRightWheel.value) rearRightWheel.value.rotation.x -= wheelSpeed

  // Radar sweep line rotation
  if (radarSweep.value) {
    radarSweep.value.rotation.z += 0.025
  }

  animId = requestAnimationFrame(animate)
}

onMounted(() => {
  animId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (animId !== null) {
    cancelAnimationFrame(animId)
  }
})
</script>

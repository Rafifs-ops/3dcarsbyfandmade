<template>
  <div
    class="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#12151B]/95 via-[#0D0F14]/90 to-[#0A0C0F]/95 backdrop-blur-sm select-none z-20 overflow-hidden"
    :class="{ 'p-3': minimal }"
  >
    <!-- Background Sci-Fi Tech Grid -->
    <div
      class="absolute inset-0 opacity-[0.07] pointer-events-none"
      style="background-image: linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px); background-size: 24px 24px;"
    />

    <!-- Ambient Corner Cyber Brackets -->
    <div class="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-lightning-yellow/60 pointer-events-none" />
    <div class="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-lightning-yellow/60 pointer-events-none" />
    <div class="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-lightning-yellow/60 pointer-events-none" />
    <div class="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-lightning-yellow/60 pointer-events-none" />

    <!-- Center Skeleton Graphic & Scanning Animation -->
    <div class="relative flex flex-col items-center justify-center w-full max-w-sm">
      
      <!-- Holographic Car Skeleton SVG (Top-Down Blueprint) -->
      <div class="relative w-48 sm:w-56 h-36 flex items-center justify-center">
        <svg
          viewBox="0 0 240 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-full drop-shadow-[0_0_12px_rgba(255,199,0,0.35)]"
        >
          <!-- Outer Aerodynamic Body Contour Wireframe -->
          <path
            d="M 45 42 C 55 24, 75 18, 120 18 C 165 18, 185 24, 195 42 C 205 58, 205 82, 195 98 C 185 116, 165 122, 120 122 C 75 122, 55 116, 45 98 C 35 82, 35 58, 45 42 Z"
            :stroke="primaryColor"
            stroke-width="1.8"
            stroke-dasharray="4 2"
            class="animate-pulse"
          />

          <!-- Inner Cockpit / Roll Cage Skeleton Frame -->
          <path
            d="M 85 45 C 95 34, 110 32, 120 32 C 130 32, 145 34, 155 45 C 162 55, 162 85, 155 95 C 145 106, 130 108, 120 108 C 110 108, 95 106, 85 95 C 78 85, 78 55, 85 45 Z"
            :stroke="accentColor"
            stroke-width="1.5"
            stroke-dasharray="3 3"
          />

          <!-- Windshield & Rear Window Cross Roll-Bars -->
          <line x1="90" y1="52" x2="150" y2="52" :stroke="accentColor" stroke-width="1.2" opacity="0.8" />
          <line x1="90" y1="88" x2="150" y2="88" :stroke="accentColor" stroke-width="1.2" opacity="0.8" />
          <line x1="120" y1="32" x2="120" y2="108" :stroke="accentColor" stroke-width="1" stroke-dasharray="2 2" opacity="0.7" />
          <line x1="88" y1="52" x2="152" y2="88" :stroke="primaryColor" stroke-width="0.8" opacity="0.5" />
          <line x1="88" y1="88" x2="152" y2="52" :stroke="primaryColor" stroke-width="0.8" opacity="0.5" />

          <!-- Front Nose / Hood V-Lines -->
          <path
            d="M 175 48 L 210 60 L 210 80 L 175 92"
            :stroke="primaryColor"
            stroke-width="1.4"
            opacity="0.85"
          />
          <line x1="175" y1="70" x2="210" y2="70" :stroke="accentColor" stroke-width="1" stroke-dasharray="2 2" />

          <!-- Rear Aero Wing / Diffuser Lines -->
          <rect x="25" y="32" width="6" height="76" rx="2" :fill="primaryColor" opacity="0.4" :stroke="primaryColor" stroke-width="1" />
          <line x1="31" y1="46" x2="48" y2="46" :stroke="primaryColor" stroke-width="1.5" />
          <line x1="31" y1="94" x2="48" y2="94" :stroke="primaryColor" stroke-width="1.5" />

          <!-- 4 Wireframe Racing Wheels -->
          <!-- Front Left Wheel -->
          <g class="skeleton-wheel">
            <rect x="160" y="8" width="36" height="15" rx="3" :stroke="accentColor" stroke-width="1.4" fill="#14171F" />
            <line x1="166" y1="8" x2="166" y2="23" :stroke="accentColor" stroke-width="1" />
            <line x1="178" y1="8" x2="178" y2="23" :stroke="primaryColor" stroke-width="1.2" />
            <line x1="190" y1="8" x2="190" y2="23" :stroke="accentColor" stroke-width="1" />
          </g>
          <!-- Front Right Wheel -->
          <g class="skeleton-wheel">
            <rect x="160" y="117" width="36" height="15" rx="3" :stroke="accentColor" stroke-width="1.4" fill="#14171F" />
            <line x1="166" y1="117" x2="166" y2="132" :stroke="accentColor" stroke-width="1" />
            <line x1="178" y1="117" x2="178" y2="132" :stroke="primaryColor" stroke-width="1.2" />
            <line x1="190" y1="117" x2="190" y2="132" :stroke="accentColor" stroke-width="1" />
          </g>
          <!-- Rear Left Wheel -->
          <g class="skeleton-wheel">
            <rect x="44" y="8" width="38" height="16" rx="3" :stroke="accentColor" stroke-width="1.4" fill="#14171F" />
            <line x1="52" y1="8" x2="52" y2="24" :stroke="accentColor" stroke-width="1" />
            <line x1="63" y1="8" x2="63" y2="24" :stroke="primaryColor" stroke-width="1.2" />
            <line x1="74" y1="8" x2="74" y2="24" :stroke="accentColor" stroke-width="1" />
          </g>
          <!-- Rear Right Wheel -->
          <g class="skeleton-wheel">
            <rect x="44" y="116" width="38" height="16" rx="3" :stroke="accentColor" stroke-width="1.4" fill="#14171F" />
            <line x1="52" y1="116" x2="52" y2="132" :stroke="accentColor" stroke-width="1" />
            <line x1="63" y1="116" x2="63" y2="132" :stroke="primaryColor" stroke-width="1.2" />
            <line x1="74" y1="116" x2="74" y2="132" :stroke="accentColor" stroke-width="1" />
          </g>

          <!-- Wheel Axles Cross Chassis -->
          <line x1="178" y1="23" x2="178" y2="117" :stroke="accentColor" stroke-width="1.5" stroke-dasharray="3 2" opacity="0.6" />
          <line x1="63" y1="24" x2="63" y2="116" :stroke="accentColor" stroke-width="1.5" stroke-dasharray="3 2" opacity="0.6" />

          <!-- Center Power Unit / V8 Engine Block Frame -->
          <rect x="80" y="60" width="28" height="20" rx="2" :stroke="primaryColor" stroke-width="1.2" stroke-dasharray="2 1" />
          <circle cx="94" cy="70" r="4" :fill="accentColor" class="animate-ping" opacity="0.75" />
          <circle cx="94" cy="70" r="3" :fill="accentColor" />

          <!-- Front Laser Radar Sensor Beam Dot -->
          <circle cx="216" cy="70" r="3" :fill="accentColor" />
          <line x1="216" y1="70" x2="236" y2="70" :stroke="accentColor" stroke-width="1" stroke-dasharray="2 2" />
        </svg>

        <!-- Laser Radar Scanner Beam Sweep Line -->
        <div
          class="absolute inset-y-0 w-1 bg-gradient-to-b from-transparent via-lightning-yellow to-transparent opacity-75 blur-[1px] animate-laser-scan pointer-events-none"
          :style="{
            boxShadow: `0 0 10px ${accentColor || '#FFC700'}`
          }"
        />
      </div>

      <!-- Telemetry Text & Status -->
      <div class="mt-3 text-center space-y-1.5 z-10">
        <!-- Live Status Pill -->
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" :style="{ backgroundColor: accentColor || '#FFC700' }" />
            <span class="relative inline-flex rounded-full h-2 w-2" :style="{ backgroundColor: accentColor || '#FFC700' }" />
          </span>
          <span class="text-[11px] font-chakra font-bold tracking-wider uppercase text-white/90">
            {{ title }}
          </span>
        </div>

        <!-- Subtitle Diagnostic Details -->
        <p v-if="!minimal && subtitle" class="text-[11px] font-chakra text-white/50 tracking-wide">
          {{ subtitle }}
        </p>

        <!-- Dynamic Tech Progress Shimmer Bar -->
        <div class="w-44 h-1 mx-auto mt-2 rounded-full bg-white/10 overflow-hidden relative">
          <div
            class="absolute inset-y-0 w-1/2 rounded-full animate-progress-slide"
            :style="{
              background: `linear-gradient(90deg, transparent, ${accentColor || '#FFC700'}, ${primaryColor || '#E11D2A'}, transparent)`
            }"
          />
        </div>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  primaryColor?: string
  accentColor?: string
  title?: string
  subtitle?: string
  minimal?: boolean
}>(), {
  primaryColor: '#E11D2A',
  accentColor: '#FFC700',
  title: 'MEMUAT MODEL 3D...',
  subtitle: 'Inisialisasi Rangka Skeleton & Geometri 3D',
  minimal: false
})
</script>

<style scoped>
@keyframes laser-scan {
  0% {
    left: 10%;
    opacity: 0.2;
  }
  50% {
    left: 88%;
    opacity: 0.9;
  }
  100% {
    left: 10%;
    opacity: 0.2;
  }
}

.animate-laser-scan {
  animation: laser-scan 2.4s ease-in-out infinite;
}

@keyframes progress-slide {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(250%);
  }
}

.animate-progress-slide {
  animation: progress-slide 1.6s ease-in-out infinite;
}
</style>

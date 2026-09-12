<template>
  <div class="carbon-card p-5 rounded-xl border border-white/10 space-y-4">
    <h3 class="text-xs font-chakra font-bold tracking-widest text-pure-white uppercase flex items-center justify-between border-b border-white/10 pb-2.5">
      <div class="flex items-center gap-2">
        <BootstrapIcon name="speedometer2" class="text-lightning-yellow" />
        <span>Spesifikasi & Telemetri Balap</span>
      </div>
      <span class="text-[10px] font-chakra text-lightning-yellow bg-lightning-yellow/10 border border-lightning-yellow/20 px-2 py-0.5 rounded">
        Roster Telemetry
      </span>
    </h3>

    <!-- Performance Stat Grid -->
    <div class="grid grid-cols-2 gap-3">
      <!-- Top Speed in MPH -->
      <div class="bg-black/40 p-3 rounded-lg border border-white/5 space-y-0.5">
        <span class="text-[10px] font-chakra text-muted-silver uppercase block">Top Speed:</span>
        <div class="flex items-baseline gap-1.5">
          <span class="text-2xl font-chakra font-bold text-lightning-yellow">{{ character.stats.topSpeed }}</span>
          <span class="text-xs text-muted-silver font-normal">MPH</span>
        </div>
      </div>

      <!-- Top Speed in KM/H (Metric Conversion) -->
      <div class="bg-black/40 p-3 rounded-lg border border-white/5 space-y-0.5">
        <span class="text-[10px] font-chakra text-muted-silver uppercase block">Kecepatan Metrik:</span>
        <div class="flex items-baseline gap-1.5">
          <span class="text-2xl font-chakra font-bold text-pure-white">{{ Math.round(character.stats.topSpeed * 1.60934) }}</span>
          <span class="text-xs text-muted-silver font-normal">KM/H</span>
        </div>
      </div>

      <!-- Sponsor -->
      <div class="bg-black/40 p-3 rounded-lg border border-white/5 space-y-0.5">
        <span class="text-[10px] font-chakra text-muted-silver uppercase block">Sponsor Utama:</span>
        <span class="text-xs font-chakra font-bold text-pure-white line-clamp-1 block" :title="character.sponsor">
          {{ character.sponsor }}
        </span>
      </div>

      <!-- Engine / Powertrain -->
      <div class="bg-black/40 p-3 rounded-lg border border-white/5 space-y-0.5">
        <span class="text-[10px] font-chakra text-muted-silver uppercase block">Tipe Mesin:</span>
        <span class="text-xs font-chakra font-bold text-dinoco-blue line-clamp-1 block" :title="character.engineType">
          {{ character.engineType }}
        </span>
      </div>
    </div>

    <!-- Speed Performance Velocity Meter -->
    <div class="pt-2 text-xs font-chakra space-y-1.5">
      <div class="flex justify-between items-center text-muted-silver">
        <span class="text-[11px] uppercase tracking-wider">Potensi Kecepatan Maksimum</span>
        <span class="text-lightning-yellow font-bold">{{ speedPercentage }}% ({{ character.stats.topSpeed }}/240 MPH)</span>
      </div>
      <div class="w-full h-2 rounded-full bg-white/10 overflow-hidden p-[1px]">
        <div 
          class="h-full rounded-full bg-gradient-to-r from-rust-red via-lightning-yellow to-dinoco-blue shadow-[0_0_10px_rgba(255,199,0,0.5)] transition-all duration-700 ease-out" 
          :style="{ width: `${speedPercentage}%` }" 
        />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Character } from '~/types'

const props = defineProps<{
  character: Character
}>()

// Calculate speed percentage based on a max ceiling of 240 MPH
const speedPercentage = computed(() => {
  const speed = props.character.stats.topSpeed || 0
  return Math.min(100, Math.round((speed / 240) * 100))
})
</script>

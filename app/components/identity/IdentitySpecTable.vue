<template>
  <div class="carbon-card rounded-2xl overflow-hidden border border-white/15 p-6 sm:p-10 space-y-6">
    
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
      <div>
        <div class="flex items-center gap-2 text-xs font-chakra text-lightning-yellow uppercase tracking-widest mb-1">
          <BootstrapIcon name="display" />
          <span>Kebutuhan Perangkat Keras PC</span>
        </div>
        <h3 class="text-2xl sm:text-3xl font-russo text-pure-white">
          TABEL SPESIFIKASI SISTEM (MINIMUM SPECS)
        </h3>
      </div>

      <div class="flex items-center gap-2 bg-black/60 px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-chakra text-muted-silver">
        <BootstrapIcon name="shield-check" class="text-emerald-400" />
        <span>Spesifikasi Teruji & Kompatibel</span>
      </div>
    </div>

    <!-- Comparative Table View -->
    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs font-chakra">
        <thead>
          <tr class="border-b border-white/10 text-muted-silver uppercase tracking-wider">
            <th class="py-3.5 px-4 w-1/4">Komponen Sistem</th>
            <th class="py-3.5 px-4 w-3/8 text-lightning-yellow">Disney•Pixar Cars (2006)</th>
            <th class="py-3.5 px-4 w-3/8 text-rust-red-light">Cars 2: The Video Game (2011)</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5 text-pure-white">
          
          <tr class="hover:bg-white/5 transition-colors">
            <td class="py-4 px-4 font-bold text-muted-silver flex items-center gap-2">
              <BootstrapIcon name="windows" class="text-dinoco-blue" />
              Sistem Operasi (OS)
            </td>
            <td class="py-4 px-4 font-medium">
              {{ cars1.minimumSpecs.os }}
            </td>
            <td class="py-4 px-4 font-medium">
              {{ cars2.minimumSpecs.os }}
            </td>
          </tr>

          <tr class="hover:bg-white/5 transition-colors">
            <td class="py-4 px-4 font-bold text-muted-silver flex items-center gap-2">
              <BootstrapIcon name="cpu" class="text-lightning-yellow" />
              Prosesor (CPU)
            </td>
            <td class="py-4 px-4 font-medium">
              {{ cars1.minimumSpecs.processor }}
            </td>
            <td class="py-4 px-4 font-medium">
              {{ cars2.minimumSpecs.processor }}
            </td>
          </tr>

          <tr class="hover:bg-white/5 transition-colors">
            <td class="py-4 px-4 font-bold text-muted-silver flex items-center gap-2">
              <BootstrapIcon name="memory" class="text-emerald-400" />
              Memori (RAM)
            </td>
            <td class="py-4 px-4 font-medium">
              {{ cars1.minimumSpecs.memory }}
            </td>
            <td class="py-4 px-4 font-medium">
              {{ cars2.minimumSpecs.memory }}
            </td>
          </tr>

          <tr class="hover:bg-white/5 transition-colors">
            <td class="py-4 px-4 font-bold text-muted-silver flex items-center gap-2">
              <BootstrapIcon name="gpu-card" class="text-rust-red" />
              Kartu Grafis (GPU)
            </td>
            <td class="py-4 px-4 font-medium">
              {{ cars1.minimumSpecs.graphics }}
            </td>
            <td class="py-4 px-4 font-medium">
              {{ cars2.minimumSpecs.graphics }}
            </td>
          </tr>

          <tr class="hover:bg-white/5 transition-colors">
            <td class="py-4 px-4 font-bold text-muted-silver flex items-center gap-2">
              <BootstrapIcon name="gear-wide-connected" class="text-purple-400" />
              DirectX
            </td>
            <td class="py-4 px-4 font-medium">
              {{ cars1.minimumSpecs.directx }}
            </td>
            <td class="py-4 px-4 font-medium">
              {{ cars2.minimumSpecs.directx }}
            </td>
          </tr>

          <tr class="hover:bg-white/5 transition-colors">
            <td class="py-4 px-4 font-bold text-muted-silver flex items-center gap-2">
              <BootstrapIcon name="device-hdd" class="text-cyan-400" />
              Penyimpanan (Storage)
            </td>
            <td class="py-4 px-4 font-medium">
              {{ cars1.minimumSpecs.storage }}
            </td>
            <td class="py-4 px-4 font-medium">
              {{ cars2.minimumSpecs.storage }}
            </td>
          </tr>

        </tbody>
      </table>
    </div>

    <!-- Compatibility Badge Sub-Component Slot or Component -->
    <slot />

  </div>
</template>

<script setup lang="ts">
import type { GameSpec } from '~/types'

defineProps<{
  cars1: GameSpec
  cars2: GameSpec
}>()
</script>

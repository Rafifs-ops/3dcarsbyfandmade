<template>
  <div class="carbon-card p-4 rounded-xl border border-white/10 flex flex-wrap items-center justify-between gap-3">
    <div class="flex flex-wrap items-center gap-2.5">
      <!-- Rev Engine V8 -->
      <button
        @click="revEngine()"
        :disabled="isRevving"
        class="btn-racing-skew px-4 py-2.5 rounded bg-gradient-to-r from-rust-red to-rust-red-dark text-pure-white text-xs font-chakra font-bold tracking-wider uppercase flex items-center gap-2 shadow-lg hover:shadow-rust-red/50 active:scale-95 transition-all cursor-pointer"
      >
        <BootstrapIcon name="speedometer2" class="text-lightning-yellow text-sm" />
        <span>{{ isRevving ? 'REVVIINNGG!!' : 'Rev V8 Engine' }}</span>
      </button>

      <!-- Voice Line -->
      <button
        @click="playVoice"
        class="px-3.5 py-2.5 rounded bg-carbon-gray hover:bg-carbon-gray-light text-pure-white text-xs font-chakra font-semibold tracking-wider flex items-center gap-2 border border-white/10 hover:border-lightning-yellow/50 transition-all cursor-pointer"
      >
        <BootstrapIcon name="megaphone-fill" class="text-lightning-yellow" />
        <span>Suara Ikonik</span>
      </button>

      <!-- Horn -->
      <button
        @click="playHorn"
        class="px-3.5 py-2.5 rounded bg-carbon-gray hover:bg-carbon-gray-light text-muted-silver hover:text-white text-xs font-chakra font-medium flex items-center gap-1.5 border border-white/10 transition-all cursor-pointer"
      >
        <BootstrapIcon name="bell-fill" class="text-dinoco-blue" />
        <span>Klakson</span>
      </button>
    </div>

    <span v-if="voiceQuote" class="text-xs font-chakra italic text-muted-silver-light max-w-xs text-right truncate">
      "{{ voiceQuote }}"
    </span>
  </div>
</template>

<script setup lang="ts">
import { useCarAudio } from '~/composables/useCarAudio'

const props = defineProps<{
  soundEffect?: string
  voiceQuote?: string
}>()

const { isRevving, revEngine, playSound, playHorn } = useCarAudio()

const playVoice = () => {
  if (props.soundEffect) {
    playSound(props.soundEffect)
  }
}
</script>

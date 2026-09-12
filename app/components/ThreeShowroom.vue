<template>
  <div class="relative w-full rounded-2xl overflow-hidden carbon-card border border-white/10 shadow-2xl bg-gradient-to-b from-[#1C1F26] via-[#14171E] to-[#0A0C0F]">
    
    <!-- Top HUD Header -->
    <ShowroomHudHeader
      :active-character="activeCharacter"
      :active-skin="activeSkin"
      :live-rpm="liveRpm"
      :is-revving="isRevving"
    />

    <!-- 3D Canvas Container -->
    <ShowroomCanvas
      :current-model-path="currentModelPath"
      :active-character="activeCharacter"
    />

    <!-- Bottom Controls & Interactivity Bar -->
    <ShowroomControls
      :showcase-characters="showcaseCharacters"
      :active-character="activeCharacter"
      :active-skin="activeSkin"
      :is-revving="isRevving"
      @select-character="selectCharacter"
      @select-skin="selectSkin"
      @trigger-rev="triggerRev"
      @trigger-voice="triggerVoice"
      @trigger-horn="triggerHorn"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { charactersData } from '~/data/characters'
import type { Character, CharacterSkin } from '~/types'
import { useCarAudio } from '~/composables/useCarAudio'
import ShowroomHudHeader from '~/components/showroom/ShowroomHudHeader.vue'
import ShowroomCanvas from '~/components/showroom/ShowroomCanvas.vue'
import ShowroomControls from '~/components/showroom/ShowroomControls.vue'

const { data: fetchedChars } = await useFetch<Character[]>('/api/characters', {
  default: () => charactersData
})

const allCharacters = computed(() => fetchedChars.value || charactersData)

// Filter featured showroom characters: McQueen, Mater, Cruz, Jackson Storm
const showcaseCharacters = computed(() => {
  const list = allCharacters.value
  const featured = list.filter(c => 
    ['lightning-mcqueen', 'tow-mater', 'cruz-ramirez', 'jackson-storm'].includes(c.id)
  )
  return featured.length > 0 ? featured : list.slice(0, 4)
})

const activeCharacter = ref<Character>(
  showcaseCharacters.value[0] ?? (charactersData[0] as Character)
)
const activeSkin = ref<CharacterSkin | null>(activeCharacter.value?.skins?.[0] || null)

watch(showcaseCharacters, (chars) => {
  if (chars.length > 0 && !chars.some(c => c.id === activeCharacter.value?.id)) {
    activeCharacter.value = chars[0]!
    activeSkin.value = chars[0]?.skins?.[0] || null
  }
})

const currentModelPath = computed(() => {
  if (!activeCharacter.value) return '/models/mcqueen.glb'
  if (activeCharacter.value.id === 'lightning-mcqueen' && activeSkin.value) {
    return activeSkin.value.modelFile
  }
  return activeCharacter.value.modelFile
})

// Audio & Telemetry
const { isRevving, rpm, revEngine, playHorn, playSound } = useCarAudio()

const liveRpm = computed(() => rpm.value)

const selectCharacter = (char: Character) => {
  activeCharacter.value = char
  if (char.skins && char.skins.length > 0) {
    activeSkin.value = char.skins[0] ?? null
  } else {
    activeSkin.value = null
  }
}

const selectSkin = (skin: CharacterSkin) => {
  activeSkin.value = skin
}

const triggerRev = () => {
  revEngine()
}

const triggerVoice = () => {
  if (activeCharacter.value.soundEffect) {
    playSound(activeCharacter.value.soundEffect)
  } else {
    playSound('/audio/ka-chow.mp3')
  }
}

const triggerHorn = () => {
  playHorn()
}
</script>

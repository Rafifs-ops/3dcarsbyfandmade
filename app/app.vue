<template>
  <NuxtLoadingIndicator color="#E11D2A" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const nuxtApp = useNuxtApp()
const route = useRoute()

// Re-sync AOS triggers on client navigation
watch(() => route.fullPath, () => {
  if (import.meta.client) {
    nextTick(() => {
      setTimeout(() => {
        if ((nuxtApp as any).$refreshAos) {
          (nuxtApp as any).$refreshAos()
        }
      }, 100)
    })
  }
})
</script>

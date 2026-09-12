<template>
  <div class="space-y-6">
    
    <!-- Top Action Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-russo text-white flex items-center gap-2">
          <BootstrapIcon name="cpu-fill" class="text-dinoco-blue" />
          <span>KELOLA GAME SPECS & IDENTITAS PC</span>
        </h1>
        <p class="text-xs sm:text-sm text-muted-silver font-inter">
          Atur informasi judul game, link Steam Store, cover, publisher, dan tabel spesifikasi sistem hardware PC.
        </p>
      </div>
    </div>

    <!-- Specs Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      <div
        v-for="spec in specsList"
        :key="spec.id"
        class="carbon-card rounded-2xl border p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all"
        :class="spec.id === 'cars-2' ? 'border-rust-red/40 hover:border-rust-red' : 'border-white/15 hover:border-lightning-yellow/50'"
      >
        <div class="space-y-4">
          <!-- Top Badge -->
          <div class="flex items-center justify-between">
            <span
              class="px-3 py-1 rounded text-xs font-chakra font-bold uppercase border"
              :class="spec.id === 'cars-2' ? 'bg-rust-red/20 text-rust-red-light border-rust-red/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'"
            >
              Rilis {{ spec.releaseYear }} • {{ spec.genre }}
            </span>
            <span class="text-xs font-chakra font-mono text-muted-silver">
              ID: {{ spec.id }}
            </span>
          </div>

          <!-- Cover Image Preview -->
          <div class="w-full h-44 rounded-xl overflow-hidden bg-black/50 border border-white/10 flex items-center justify-center p-2">
            <img
              v-if="spec.coverUrl"
              :src="spec.coverUrl"
              :alt="spec.title"
              class="max-h-full max-w-full object-contain rounded shadow"
            />
          </div>

          <h2 class="text-2xl font-russo text-white leading-tight">
            {{ spec.title }}
          </h2>

          <p class="text-xs font-inter text-muted-silver leading-relaxed line-clamp-3">
            {{ spec.summary }}
          </p>

          <!-- Minimum Hardware Specs Overview -->
          <div class="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1.5 text-xs font-chakra">
            <div class="flex justify-between">
              <span class="text-muted-silver">OS:</span>
              <span class="text-white font-medium truncate max-w-[200px]">{{ spec.minimumSpecs?.os }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-silver">CPU:</span>
              <span class="text-white font-medium truncate max-w-[200px]">{{ spec.minimumSpecs?.processor }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-silver">RAM:</span>
              <span class="text-white font-medium">{{ spec.minimumSpecs?.memory }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-silver">GPU:</span>
              <span class="text-white font-medium truncate max-w-[200px]">{{ spec.minimumSpecs?.graphics }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-silver">Steam ID:</span>
              <span class="text-dinoco-blue font-bold font-mono">{{ spec.steamAppId }}</span>
            </div>
          </div>
        </div>

        <!-- Action Button -->
        <div class="pt-4 border-t border-white/10 flex items-center justify-between gap-4 font-chakra">
          <a
            :href="spec.steamUrl"
            target="_blank"
            class="text-xs text-muted-silver hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <BootstrapIcon name="steam" />
            <span>Buka Steam Store</span>
          </a>

          <NuxtLink
            :to="`/admin/specs/${spec.id}`"
            class="px-5 py-2.5 rounded-xl text-white text-xs font-bold uppercase flex items-center gap-2 transition-all shadow-md"
            :class="spec.id === 'cars-2'
              ? 'bg-rust-red hover:bg-rust-red-light shadow-rust-red/30'
              : 'bg-lightning-yellow text-black hover:bg-yellow-400 font-bold'"
          >
            <BootstrapIcon name="pencil-square" />
            <span>Edit Spesifikasi</span>
          </NuxtLink>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const { data: specsList } = await useFetch<any[]>('/api/specs', { default: () => [] })

useSeoMeta({
  title: 'Kelola Game Specs - Disney Pixar Cars CMS'
})
</script>

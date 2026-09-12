<template>
  <div class="carbon-card p-5 rounded-xl border border-white/10 flex flex-wrap items-center justify-between gap-4">
    <div class="flex items-center gap-2 text-xs font-chakra text-muted-silver">
      <BootstrapIcon name="newspaper" class="text-lightning-yellow" />
      <span>Disney•Pixar Cars Steam Community Hub</span>
    </div>

    <NuxtLink
      to="/news"
      class="btn-racing-skew px-4 py-2 rounded text-xs font-chakra font-bold tracking-wider uppercase flex items-center gap-2 bg-carbon-gray hover:bg-rust-red text-white border border-white/10 hover:border-transparent transition-all"
    >
      <BootstrapIcon name="arrow-left" />
      <span>Lihat Berita Lainnya</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
// NewsReactionBar component
</script>

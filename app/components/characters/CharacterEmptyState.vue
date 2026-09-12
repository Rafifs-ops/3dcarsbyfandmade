<template>
  <div class="text-center py-20 carbon-card rounded-2xl border border-white/10 space-y-4">
    <div class="w-16 h-16 rounded-full bg-carbon-gray mx-auto flex items-center justify-center text-muted-silver text-2xl">
      <BootstrapIcon name="car-front" />
    </div>
    <h3 class="text-xl font-russo text-pure-white">Tidak ada karakter yang cocok</h3>
    <p class="text-xs font-chakra text-muted-silver max-w-sm mx-auto">
      Coba sesuaikan kata kunci pencarian atau ganti kategori filter untuk menemukan pembalap yang Anda cari.
    </p>
    <button
      @click="$emit('reset')"
      class="px-4 py-2 rounded bg-rust-red hover:bg-rust-red-light text-white text-xs font-chakra font-bold uppercase transition-all shadow-md"
    >
      Reset Filter
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'reset'): void
}>()
</script>

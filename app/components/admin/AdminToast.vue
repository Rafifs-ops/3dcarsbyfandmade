<template>
  <div class="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
    <TransitionGroup
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-for="t in toasts"
        :key="t.id"
        class="pointer-events-auto p-4 rounded-xl shadow-2xl border backdrop-blur-md flex items-start gap-3"
        :class="{
          'bg-emerald-950/90 border-emerald-500/40 text-white shadow-emerald-950/50': t.type === 'success',
          'bg-rose-950/90 border-rust-red/50 text-white shadow-rose-950/50': t.type === 'error',
          'bg-carbon-gray/95 border-white/20 text-white': t.type === 'info',
          'bg-amber-950/90 border-amber-500/40 text-white shadow-amber-950/50': t.type === 'warning'
        }"
      >
        <!-- Icon -->
        <div class="mt-0.5 text-lg flex-shrink-0">
          <BootstrapIcon v-if="t.type === 'success'" name="check-circle-fill" class="text-emerald-400" />
          <BootstrapIcon v-else-if="t.type === 'error'" name="exclamation-octagon-fill" class="text-rust-red-light" />
          <BootstrapIcon v-else-if="t.type === 'warning'" name="exclamation-triangle-fill" class="text-amber-400" />
          <BootstrapIcon v-else name="info-circle-fill" class="text-lightning-yellow" />
        </div>

        <!-- Content -->
        <div class="flex-grow text-xs">
          <p class="font-chakra font-bold text-sm leading-tight mb-0.5">{{ t.title }}</p>
          <p v-if="t.message" class="text-muted-silver-light font-inter leading-relaxed">{{ t.message }}</p>
        </div>

        <!-- Close button -->
        <button
          @click="remove(t.id)"
          class="text-white/60 hover:text-white transition-colors p-1"
          aria-label="Close notification"
        >
          <BootstrapIcon name="x-lg" class="text-xs" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
const { toasts, remove } = useToast()
</script>

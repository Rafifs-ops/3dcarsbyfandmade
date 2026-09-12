<template>
  <Teleport to="body">
    <Transition
      enter-active-class="ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        @click.self="onClose"
      >
        <div class="relative w-full max-w-lg bg-carbon-gray border border-white/15 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
          <!-- Header -->
          <div class="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/40">
            <h3 class="font-russo text-lg text-pure-white flex items-center gap-2">
              <slot name="icon">
                <BootstrapIcon name="exclamation-triangle-fill" class="text-rust-red" />
              </slot>
              <span>{{ title }}</span>
            </h3>
            <button
              @click="onClose"
              class="text-muted-silver hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <BootstrapIcon name="x-lg" class="text-sm" />
            </button>
          </div>

          <!-- Body -->
          <div class="p-5 sm:p-6 text-xs sm:text-sm font-inter text-muted-silver leading-relaxed">
            <slot />
          </div>

          <!-- Footer Actions -->
          <div class="p-4 sm:p-5 border-t border-white/10 bg-black/40 flex items-center justify-end gap-3 font-chakra">
            <button
              type="button"
              @click="onClose"
              class="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase transition-colors"
            >
              {{ cancelText }}
            </button>

            <button
              type="button"
              @click="onConfirm"
              :disabled="loading"
              class="px-4 py-2 rounded-lg text-white text-xs font-bold uppercase transition-all shadow-md flex items-center gap-2"
              :class="confirmType === 'danger'
                ? 'bg-rust-red hover:bg-rust-red-light shadow-rust-red/30'
                : 'bg-lightning-yellow text-black hover:bg-yellow-400 shadow-yellow-500/20'"
            >
              <BootstrapIcon v-if="loading" name="arrow-repeat" class="animate-spin" />
              <span>{{ confirmText }}</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: boolean
  title?: string
  confirmText?: string
  cancelText?: string
  confirmType?: 'danger' | 'primary'
  loading?: boolean
}>(), {
  title: 'Konfirmasi Tindakan',
  confirmText: 'Lanjutkan',
  cancelText: 'Batal',
  confirmType: 'danger',
  loading: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const onClose = () => {
  emit('update:modelValue', false)
  emit('cancel')
}

const onConfirm = () => {
  emit('confirm')
}
</script>

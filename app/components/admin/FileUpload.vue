<template>
  <div class="space-y-1.5">
    <label class="block text-muted-silver uppercase font-bold">{{ label }}</label>

    <!-- Text input + Browse button -->
    <div class="flex items-center gap-2">
      <input
        :value="modelValue"
        type="text"
        :placeholder="placeholder"
        class="flex-1 px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-rust-red/60"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <button
        type="button"
        :disabled="isUploading"
        class="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-chakra font-bold flex items-center gap-2 transition-colors disabled:opacity-50 shrink-0"
        @click="triggerFileInput"
      >
        <BootstrapIcon v-if="isUploading" name="arrow-repeat" class="animate-spin" />
        <BootstrapIcon v-else name="folder2-open" />
        <span>{{ isUploading ? 'Upload...' : 'Browse' }}</span>
      </button>
      <input
        ref="fileInputRef"
        type="file"
        :accept="accept"
        class="hidden"
        @change="handleFileSelect"
      />
    </div>

    <!-- Preview: image thumbnail or file info -->
    <div v-if="modelValue && !isUploading" class="flex items-center gap-3 p-3 rounded-xl bg-black/30 border border-white/10">
      <!-- Image preview -->
      <template v-if="isImage">
        <img
          :src="modelValue"
          :alt="label"
          class="w-16 h-16 object-cover rounded-lg border border-white/10"
          @error="imgError = true"
        />
        <div class="flex-1 min-w-0">
          <p class="text-white text-xs font-chakra truncate">{{ filename }}</p>
          <p class="text-muted-silver text-[11px] font-chakra">{{ modelValue }}</p>
        </div>
      </template>

      <!-- Non-image: icon + info -->
      <template v-else>
        <div class="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xl shrink-0">
          {{ fileIcon }}
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-white text-xs font-chakra truncate">{{ filename }}</p>
          <p class="text-muted-silver text-[11px] font-chakra">{{ modelValue }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  modelValue: string
  accept: string
  folder: string
  label: string
  placeholder?: string
  oldPath?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const { success, error: toastError } = useToast()

const fileInputRef = ref<HTMLInputElement | null>(null)
const isUploading = ref(false)
const imgError = ref(false)

const isImage = computed(() => {
  if (!props.modelValue) return false
  if (imgError.value) return false
  return /\.(png|jpe?g|webp|gif|svg)$/i.test(props.modelValue)
})

const filename = computed(() => {
  if (!props.modelValue) return ''
  const parts = props.modelValue.split('/')
  return parts[parts.length - 1]
})

const fileIcon = computed(() => {
  if (!props.modelValue) return '📄'
  if (/\.glb$/i.test(props.modelValue)) return '🎮'
  if (/\.gltf$/i.test(props.modelValue)) return '🎮'
  if (/\.(mp3|wav|ogg|m4a)$/i.test(props.modelValue)) return '🔊'
  return '📄'
})

watch(() => props.modelValue, () => {
  imgError.value = false
})

function triggerFileInput() {
  fileInputRef.value?.click()
}

async function handleFileSelect(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  target.value = ''

  isUploading.value = true
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', props.folder)
    if (props.oldPath) {
      formData.append('oldPath', props.oldPath)
    }

    const result = await $fetch<{ success: boolean; path: string }>('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (result.success && result.path) {
      emit('update:modelValue', result.path)
      success('Upload Berhasil', `${file.name} → ${result.path}`)
    }
  } catch (err: any) {
    toastError('Upload Gagal', err?.data?.statusMessage || err?.message || 'Gagal mengupload file.')
  } finally {
    isUploading.value = false
  }
}
</script>

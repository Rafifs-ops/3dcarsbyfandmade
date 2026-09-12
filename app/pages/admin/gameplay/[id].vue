<template>
  <div class="max-w-4xl mx-auto space-y-6">
    
    <!-- Top Nav / Breadcrumbs -->
    <div class="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
      <NuxtLink
        to="/admin/gameplay"
        class="inline-flex items-center gap-2 text-xs font-chakra uppercase tracking-wider text-muted-silver hover:text-lightning-yellow transition-colors"
      >
        <BootstrapIcon name="arrow-left" />
        <span>Kembali ke Daftar Video</span>
      </NuxtLink>

      <span class="text-xs font-chakra text-purple-400 uppercase tracking-widest px-2.5 py-0.5 rounded bg-white/5 border border-white/10">
        Edit Video #{{ id }}
      </span>
    </div>

    <!-- Main Form Card -->
    <form @submit.prevent="handleSubmit" class="carbon-card rounded-2xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
      
      <div class="border-b border-white/10 pb-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-russo text-white">
            EDIT VIDEO GAMEPLAY
          </h1>
          <p class="text-xs text-muted-silver font-chakra">
            Perbarui data cuplikan YouTube, kategori, dan deskripsi mode game.
          </p>
        </div>

        <a
          :href="`https://www.youtube.com/watch?v=${form.youtubeId}`"
          target="_blank"
          class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-muted-silver hover:text-white text-xs font-chakra flex items-center gap-1.5 transition-colors"
        >
          <BootstrapIcon name="youtube" class="text-rust-red" />
          <span>Lihat di YouTube</span>
        </a>
      </div>

      <!-- Title & ID -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 font-chakra text-xs">
        <div class="space-y-1.5 sm:col-span-2">
          <label class="block text-muted-silver uppercase font-bold">Judul Video *</label>
          <input
            v-model="form.title"
            type="text"
            required
            class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-sm font-bold focus:outline-none focus:border-purple-400"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-muted-silver uppercase font-bold">YouTube Video ID / URL *</label>
          <input
            v-model="form.youtubeId"
            type="text"
            required
            class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-lightning-yellow font-mono text-xs focus:outline-none focus:border-purple-400"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-muted-silver uppercase font-bold">Kategori Video</label>
          <select
            v-model="form.category"
            class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-purple-400"
          >
            <option value="Cinematic Trailer">Cinematic Trailer</option>
            <option value="High-Speed Racing">High-Speed Racing</option>
            <option value="Open World Exploration">Open World Exploration</option>
            <option value="Battle Arena">Battle Arena</option>
            <option value="Community Showcase">Community Showcase</option>
          </select>
        </div>

        <div class="space-y-1.5">
          <label class="block text-muted-silver uppercase font-bold">Game Asosiasi</label>
          <input
            v-model="form.game"
            type="text"
            class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-purple-400"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-muted-silver uppercase font-bold">Durasi Video (MM:SS)</label>
          <input
            v-model="form.duration"
            type="text"
            class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-purple-400"
          />
        </div>
      </div>

      <!-- Description -->
      <div class="space-y-1.5 font-chakra text-xs">
        <label class="block text-muted-silver uppercase font-bold">Deskripsi Cuplikan</label>
        <textarea
          v-model="form.description"
          rows="3"
          class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white font-inter text-xs leading-relaxed focus:outline-none focus:border-purple-400"
        />
      </div>

      <!-- Action Buttons -->
      <div class="pt-4 border-t border-white/10 flex items-center justify-end gap-3 font-chakra">
        <NuxtLink
          to="/admin/gameplay"
          class="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase transition-colors"
        >
          Batal
        </NuxtLink>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="btn-racing-skew px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all disabled:opacity-50"
        >
          <BootstrapIcon v-if="isSubmitting" name="arrow-repeat" class="animate-spin" />
          <BootstrapIcon v-else name="check2-circle" />
          <span>{{ isSubmitting ? 'Menyimpan...' : 'Perbarui Video' }}</span>
        </button>
      </div>

    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const router = useRouter()
const { success, error: toastError } = useToast()

const id = route.params.id as string
const isSubmitting = ref(false)

const { data: item } = await useFetch<any>(`/api/gameplay/${id}`)

const form = reactive({
  title: item.value?.title || '',
  category: item.value?.category || 'High-Speed Racing',
  youtubeId: item.value?.youtubeId || '',
  duration: item.value?.duration || '04:00',
  game: item.value?.game || 'Cars 2: The Video Game',
  description: item.value?.description || ''
})

const handleSubmit = async () => {
  if (!form.title || !form.youtubeId) {
    toastError('Validasi Gagal', 'Judul dan ID YouTube wajib diisi!')
    return
  }

  try {
    isSubmitting.value = true
    await $fetch(`/api/gameplay/${id}`, {
      method: 'PUT',
      body: form
    })
    success('Berhasil!', `Video "${form.title}" berhasil diperbarui.`)
    router.push('/admin/gameplay')
  } catch (err: any) {
    toastError('Gagal Menyimpan', err?.data?.statusMessage || err?.message || 'Terjadi kesalahan saat memperbarui video.')
  } finally {
    isSubmitting.value = false
  }
}

useSeoMeta({
  title: `Edit Video Gameplay - ${form.title || id} - Cars CMS`
})
</script>

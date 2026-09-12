<template>
  <div class="max-w-4xl mx-auto space-y-6">
    
    <!-- Top Nav / Breadcrumbs -->
    <div class="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
      <NuxtLink
        to="/admin/specs"
        class="inline-flex items-center gap-2 text-xs font-chakra uppercase tracking-wider text-muted-silver hover:text-lightning-yellow transition-colors"
      >
        <BootstrapIcon name="arrow-left" />
        <span>Kembali ke Daftar Spesifikasi Game</span>
      </NuxtLink>

      <span class="text-xs font-chakra text-dinoco-blue uppercase tracking-widest px-2.5 py-0.5 rounded bg-white/5 border border-white/10">
        Edit Game Spec #{{ id }}
      </span>
    </div>

    <!-- Main Form Card -->
    <form @submit.prevent="handleSubmit" class="carbon-card rounded-2xl border border-white/10 p-6 sm:p-8 space-y-8 shadow-2xl">
      
      <div class="border-b border-white/10 pb-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-russo text-white">
            EDIT SPESIFIKASI GAME
          </h1>
          <p class="text-xs text-muted-silver font-chakra">
            Perbarui data metadata Steam, informasi rilis, dan kebutuhan minimum perangkat keras PC.
          </p>
        </div>

        <NuxtLink
          to="/identity"
          target="_blank"
          class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-muted-silver hover:text-white text-xs font-chakra flex items-center gap-1.5 transition-colors"
        >
          <BootstrapIcon name="eye" />
          <span>Lihat Halaman Games</span>
        </NuxtLink>
      </div>

      <!-- SECTION 1: General Info -->
      <div class="space-y-4 font-chakra text-xs">
        <h3 class="text-sm font-russo text-lightning-yellow uppercase tracking-wider border-b border-white/10 pb-2">
          1. Informasi Game & Steam
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <label class="block text-muted-silver uppercase font-bold">Judul Game *</label>
            <input
              v-model="form.title"
              type="text"
              required
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-sm font-bold focus:outline-none focus:border-dinoco-blue"
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-muted-silver uppercase font-bold">Tahun Rilis *</label>
            <input
              v-model.number="form.releaseYear"
              type="number"
              required
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-dinoco-blue"
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-muted-silver uppercase font-bold">Pengembang (Developer)</label>
            <input
              v-model="form.developer"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-dinoco-blue"
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-muted-silver uppercase font-bold">Penerbit (Publisher)</label>
            <input
              v-model="form.publisher"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-dinoco-blue"
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-muted-silver uppercase font-bold">Genre Game</label>
            <input
              v-model="form.genre"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-dinoco-blue"
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-muted-silver uppercase font-bold">Steam App ID</label>
            <input
              v-model="form.steamAppId"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-lightning-yellow font-mono text-xs focus:outline-none focus:border-dinoco-blue"
            />
          </div>

          <div class="space-y-1.5 sm:col-span-2">
            <label class="block text-muted-silver uppercase font-bold">Steam Store URL</label>
            <input
              v-model="form.steamUrl"
              type="url"
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-dinoco-blue"
            />
          </div>

          <div class="space-y-1.5 sm:col-span-2">
            <label class="block text-muted-silver uppercase font-bold">Path Cover Art</label>
            <input
              v-model="form.coverUrl"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-dinoco-blue"
            />
          </div>

          <div class="space-y-1.5 sm:col-span-2">
            <label class="block text-muted-silver uppercase font-bold">Ringkasan Game</label>
            <textarea
              v-model="form.summary"
              rows="3"
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white font-inter text-xs leading-relaxed focus:outline-none focus:border-dinoco-blue"
            />
          </div>
        </div>
      </div>

      <!-- SECTION 2: Minimum Hardware System Requirements -->
      <div class="space-y-4 font-chakra text-xs">
        <h3 class="text-sm font-russo text-lightning-yellow uppercase tracking-wider border-b border-white/10 pb-2">
          2. Kebutuhan Perangkat Keras PC (Minimum Specs)
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <label class="block text-muted-silver uppercase font-bold">Sistem Operasi (OS)</label>
            <input
              v-model="form.minimumSpecs.os"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-dinoco-blue"
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-muted-silver uppercase font-bold">Prosesor (CPU)</label>
            <input
              v-model="form.minimumSpecs.processor"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-dinoco-blue"
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-muted-silver uppercase font-bold">Memori (RAM)</label>
            <input
              v-model="form.minimumSpecs.memory"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-dinoco-blue"
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-muted-silver uppercase font-bold">Kartu Grafis (GPU)</label>
            <input
              v-model="form.minimumSpecs.graphics"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-dinoco-blue"
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-muted-silver uppercase font-bold">DirectX Version</label>
            <input
              v-model="form.minimumSpecs.directx"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-dinoco-blue"
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-muted-silver uppercase font-bold">Ruang Penyimpanan (Storage)</label>
            <input
              v-model="form.minimumSpecs.storage"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-dinoco-blue"
            />
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="pt-4 border-t border-white/10 flex items-center justify-end gap-3 font-chakra">
        <NuxtLink
          to="/admin/specs"
          class="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase transition-colors"
        >
          Batal
        </NuxtLink>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="btn-racing-skew px-6 py-2.5 rounded-xl bg-gradient-to-r from-dinoco-blue to-blue-700 hover:from-blue-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-dinoco-blue/30 transition-all disabled:opacity-50"
        >
          <BootstrapIcon v-if="isSubmitting" name="arrow-repeat" class="animate-spin" />
          <BootstrapIcon v-else name="check2-circle" />
          <span>{{ isSubmitting ? 'Menyimpan...' : 'Perbarui Game Spec' }}</span>
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

const { data: item } = await useFetch<any>(`/api/specs/${id}`)

const form = reactive({
  title: item.value?.title || '',
  releaseYear: item.value?.releaseYear || 2006,
  developer: item.value?.developer || '',
  publisher: item.value?.publisher || '',
  genre: item.value?.genre || '',
  steamAppId: item.value?.steamAppId || '',
  steamUrl: item.value?.steamUrl || '',
  coverUrl: item.value?.coverUrl || '',
  summary: item.value?.summary || '',
  minimumSpecs: {
    os: item.value?.minimumSpecs?.os || '',
    processor: item.value?.minimumSpecs?.processor || '',
    memory: item.value?.minimumSpecs?.memory || '',
    graphics: item.value?.minimumSpecs?.graphics || '',
    directx: item.value?.minimumSpecs?.directx || '',
    storage: item.value?.minimumSpecs?.storage || ''
  }
})

const handleSubmit = async () => {
  if (!form.title) {
    toastError('Validasi Gagal', 'Judul game wajib diisi!')
    return
  }

  try {
    isSubmitting.value = true
    await $fetch(`/api/specs/${id}`, {
      method: 'PUT',
      body: form
    })
    success('Berhasil!', `Spesifikasi "${form.title}" berhasil diperbarui.`)
    router.push('/admin/specs')
  } catch (err: any) {
    toastError('Gagal Menyimpan', err?.data?.statusMessage || err?.message || 'Terjadi kesalahan saat memperbarui spesifikasi.')
  } finally {
    isSubmitting.value = false
  }
}

useSeoMeta({
  title: `Edit Game Spec - ${form.title || id} - Cars CMS`
})
</script>

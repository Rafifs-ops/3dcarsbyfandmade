<template>
  <div class="max-w-4xl mx-auto space-y-6">
    
    <!-- Top Nav / Breadcrumbs -->
    <div class="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
      <NuxtLink
        to="/admin/tracks"
        class="inline-flex items-center gap-2 text-xs font-chakra uppercase tracking-wider text-muted-silver hover:text-lightning-yellow transition-colors"
      >
        <BootstrapIcon name="arrow-left" />
        <span>Kembali ke Daftar Sirkuit</span>
      </NuxtLink>

      <span class="text-xs font-chakra text-emerald-400 uppercase tracking-widest px-2.5 py-0.5 rounded bg-white/5 border border-white/10">
        Tambah Sirkuit Baru
      </span>
    </div>

    <!-- Main Form Card -->
    <form @submit.prevent="handleSubmit" class="carbon-card rounded-2xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
      
      <div class="border-b border-white/10 pb-4">
        <h1 class="text-2xl font-russo text-white">
          TAMBAH SIRKUIT BARU
        </h1>
        <p class="text-xs text-muted-silver font-chakra">
          Gunakan editor WYSIWYG untuk mengisi narasi dan deskripsi lintasan sirkuit.
        </p>
      </div>

      <!-- Name & ID -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 font-chakra text-xs">
        <div class="space-y-1.5">
          <label class="block text-muted-silver uppercase font-bold">Nama Sirkuit *</label>
          <input
            v-model="form.name"
            type="text"
            required
            @input="generateId"
            placeholder="Willy’s Butte & Radiator Springs Dirt Trail"
            class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-sm font-bold focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-muted-silver uppercase font-bold">ID / Slug Sirkuit</label>
          <input
            v-model="form.id"
            type="text"
            required
            placeholder="radiator-springs-canyon"
            class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-lightning-yellow font-mono text-xs focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-muted-silver uppercase font-bold">Tipe Permukaan (Surface Type) *</label>
          <input
            v-model="form.surfaceType"
            type="text"
            required
            placeholder="Red Sandstone, Compact Dirt & Gravel"
            class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-muted-silver uppercase font-bold">Warna Ambience</label>
          <div class="flex items-center gap-2">
            <input
              v-model="form.ambientColor"
              type="color"
              class="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
            />
            <input
              v-model="form.ambientColor"
              type="text"
              class="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white font-mono text-xs uppercase"
            />
          </div>
        </div>
      </div>

      <!-- Image URL & Preview -->
      <div class="space-y-2 font-chakra text-xs">
        <label class="block text-muted-silver uppercase font-bold">URL Gambar Sirkuit (Background Photo) *</label>
        <input
          v-model="form.image"
          type="url"
          required
          placeholder="https://images.unsplash.com/..."
          class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-emerald-400"
        />

        <div v-if="form.image" class="mt-2 w-full max-w-sm h-40 rounded-xl overflow-hidden border border-white/10 bg-black/60">
          <img :src="form.image" alt="Track Preview" class="w-full h-full object-cover" />
        </div>
      </div>

      <!-- WYSIWYG Description Editor -->
      <div class="space-y-2 font-chakra text-xs">
        <label class="block text-muted-silver uppercase font-bold flex items-center justify-between">
          <span>Deskripsi Sirkuit (WYSIWYG Rich-Text Editor) *</span>
          <span class="text-[10px] text-emerald-400 font-normal">Format visual & styling didukung</span>
        </label>
        <AdminWysiwygEditor
          v-model="form.description"
        />
      </div>

      <!-- Action Buttons -->
      <div class="pt-4 border-t border-white/10 flex items-center justify-end gap-3 font-chakra">
        <NuxtLink
          to="/admin/tracks"
          class="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase transition-colors"
        >
          Batal
        </NuxtLink>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="btn-racing-skew px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all disabled:opacity-50"
        >
          <BootstrapIcon v-if="isSubmitting" name="arrow-repeat" class="animate-spin" />
          <BootstrapIcon v-else name="check2-circle" />
          <span>{{ isSubmitting ? 'Menyimpan...' : 'Simpan Sirkuit' }}</span>
        </button>
      </div>

    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import AdminWysiwygEditor from '~/components/admin/WysiwygEditor.vue'

definePageMeta({
  layout: 'admin'
})

const { success, error: toastError } = useToast()
const router = useRouter()
const isSubmitting = ref(false)

const form = reactive({
  id: '',
  name: '',
  surfaceType: '',
  description: '',
  image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
  ambientColor: '#F59E0B'
})

const generateId = () => {
  form.id = form.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const handleSubmit = async () => {
  if (!form.name || !form.description) {
    toastError('Validasi Gagal', 'Nama dan deskripsi sirkuit wajib diisi!')
    return
  }

  try {
    isSubmitting.value = true
    await $fetch('/api/tracks', {
      method: 'POST',
      body: form
    })
    success('Berhasil!', `Sirkuit "${form.name}" berhasil ditambahkan.`)
    router.push('/admin/tracks')
  } catch (err: any) {
    toastError('Gagal Menyimpan', err?.data?.statusMessage || err?.message || 'Terjadi kesalahan saat menyimpan sirkuit.')
  } finally {
    isSubmitting.value = false
  }
}

useSeoMeta({
  title: 'Tambah Sirkuit Baru - Disney Pixar Cars CMS'
})
</script>

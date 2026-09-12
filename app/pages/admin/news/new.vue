<template>
  <div class="max-w-4xl mx-auto space-y-6">
    
    <!-- Top Nav / Breadcrumbs -->
    <div class="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
      <NuxtLink
        to="/admin/news"
        class="inline-flex items-center gap-2 text-xs font-chakra uppercase tracking-wider text-muted-silver hover:text-lightning-yellow transition-colors"
      >
        <BootstrapIcon name="arrow-left" />
        <span>Kembali ke Daftar Berita</span>
      </NuxtLink>

      <span class="text-xs font-chakra text-lightning-yellow uppercase tracking-widest px-2.5 py-0.5 rounded bg-white/5 border border-white/10">
        Buat Berita Baru
      </span>
    </div>

    <!-- Main Form Card -->
    <form @submit.prevent="handleSubmit" class="carbon-card rounded-2xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
      
      <div class="border-b border-white/10 pb-4">
        <h1 class="text-2xl font-russo text-white">
          TAMBAH BERITA BARU
        </h1>
        <p class="text-xs text-muted-silver font-chakra">
          Gunakan editor WYSIWYG untuk menyusun format artikel secara visual.
        </p>
      </div>

      <!-- Title & Slug -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 font-chakra text-xs">
        <div class="space-y-1.5 sm:col-span-2">
          <label class="block text-muted-silver uppercase font-bold">Judul Berita *</label>
          <input
            v-model="form.title"
            type="text"
            required
            @input="generateSlug"
            placeholder="Contoh: Pengumuman Turnamen Piston Cup 2026..."
            class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-lightning-yellow/60 text-sm font-semibold"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-muted-silver uppercase font-bold">Slug URL (Otomatis)</label>
          <input
            v-model="form.slug"
            type="text"
            required
            placeholder="pengumuman-turnamen-piston-cup"
            class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-lightning-yellow font-mono text-xs focus:outline-none focus:border-lightning-yellow/60"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-muted-silver uppercase font-bold">Penulis (Author)</label>
          <input
            v-model="form.author"
            type="text"
            placeholder="DocHornet_Speed / RustEze_Admin"
            class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-lightning-yellow/60"
          />
        </div>
      </div>

      <!-- Date & Featured Checkbox -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 font-chakra text-xs items-center">
        <div class="space-y-1.5">
          <label class="block text-muted-silver uppercase font-bold">Tanggal Publikasi</label>
          <input
            v-model="form.date"
            type="date"
            class="w-full px-4 py-2 rounded-xl bg-black/50 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-lightning-yellow/60"
          />
        </div>

        <div class="pt-5">
          <label class="inline-flex items-center gap-3 cursor-pointer select-none">
            <input
              v-model="form.isFeatured"
              type="checkbox"
              class="w-4 h-4 rounded bg-black/50 border-white/20 text-rust-red focus:ring-rust-red"
            />
            <span class="text-white font-bold uppercase tracking-wider">Jadikan Artikel Unggulan (Featured)</span>
          </label>
        </div>
      </div>

      <!-- Image URL & Preview -->
      <div class="space-y-2 font-chakra text-xs">
        <label class="block text-muted-silver uppercase font-bold">URL Gambar Sampul (Cover Image)</label>
        <div class="flex gap-3 items-center">
          <input
            v-model="form.image"
            type="url"
            placeholder="https://images.unsplash.com/..."
            class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-lightning-yellow/60"
          />
        </div>

        <!-- Thumbnail Preview -->
        <div v-if="form.image" class="mt-2 w-full max-w-sm h-40 rounded-xl overflow-hidden border border-white/10 bg-black/60">
          <img :src="form.image" alt="Cover Preview" class="w-full h-full object-cover" />
        </div>
      </div>

      <!-- Excerpt -->
      <div class="space-y-1.5 font-chakra text-xs">
        <label class="block text-muted-silver uppercase font-bold">Ringkasan / Cuplikan Singkat (Excerpt)</label>
        <textarea
          v-model="form.excerpt"
          rows="2"
          placeholder="Ringkasan 1-2 kalimat pengantar artikel..."
          class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs font-inter focus:outline-none focus:border-lightning-yellow/60"
        />
      </div>

      <!-- WYSIWYG Content Editor -->
      <div class="space-y-2 font-chakra text-xs">
        <label class="block text-muted-silver uppercase font-bold flex items-center justify-between">
          <span>Isi Konten Berita Lengkap (WYSIWYG Rich-Text Editor) *</span>
          <span class="text-[10px] text-lightning-yellow font-normal">Format visual, list, heading & styling didukung</span>
        </label>
        <AdminWysiwygEditor
          v-model="form.content"
        />
      </div>

      <!-- Action Buttons -->
      <div class="pt-4 border-t border-white/10 flex items-center justify-end gap-3 font-chakra">
        <NuxtLink
          to="/admin/news"
          class="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase transition-colors"
        >
          Batal
        </NuxtLink>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="btn-racing-skew px-6 py-2.5 rounded-xl bg-gradient-to-r from-rust-red to-rust-red-dark hover:from-rust-red-light text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-rust-red/30 transition-all disabled:opacity-50"
        >
          <BootstrapIcon v-if="isSubmitting" name="arrow-repeat" class="animate-spin" />
          <BootstrapIcon v-else name="check2-circle" />
          <span>{{ isSubmitting ? 'Menyimpan...' : 'Simpan Berita' }}</span>
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
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  author: 'Admin',
  date: new Date().toISOString().split('T')[0],
  image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
  isFeatured: false
})

const generateSlug = () => {
  form.slug = form.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const handleSubmit = async () => {
  if (!form.title || !form.content) {
    toastError('Validasi Gagal', 'Judul dan konten berita wajib diisi!')
    return
  }

  try {
    isSubmitting.value = true
    await $fetch('/api/news', {
      method: 'POST',
      body: form
    })
    success('Berhasil!', 'Artikel berita baru berhasil dipublikasikan.')
    router.push('/admin/news')
  } catch (err: any) {
    toastError('Gagal Menyimpan', err?.data?.statusMessage || err?.message || 'Terjadi kesalahan saat menyimpan berita.')
  } finally {
    isSubmitting.value = false
  }
}

useSeoMeta({
  title: 'Tambah Berita Baru - Disney Pixar Cars CMS'
})
</script>

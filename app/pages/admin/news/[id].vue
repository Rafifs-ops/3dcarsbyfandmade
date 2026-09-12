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
        Edit Berita #{{ id }}
      </span>
    </div>

    <!-- Main Form Card -->
    <form @submit.prevent="handleSubmit" class="carbon-card rounded-2xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
      
      <div class="border-b border-white/10 pb-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-russo text-white">
            EDIT BERITA
          </h1>
          <p class="text-xs text-muted-silver font-chakra">
            Perbarui detail artikel dan ubah format menggunakan WYSIWYG editor.
          </p>
        </div>

        <NuxtLink
          :to="`/news/${form.slug || id}`"
          target="_blank"
          class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-muted-silver hover:text-white text-xs font-chakra flex items-center gap-1.5 transition-colors"
        >
          <BootstrapIcon name="eye" />
          <span>Lihat Publik</span>
        </NuxtLink>
      </div>

      <!-- Title & Slug -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 font-chakra text-xs">
        <div class="space-y-1.5 sm:col-span-2">
          <label class="block text-muted-silver uppercase font-bold">Judul Berita *</label>
          <input
            v-model="form.title"
            type="text"
            required
            class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-lightning-yellow/60 text-sm font-semibold"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-muted-silver uppercase font-bold">Slug URL</label>
          <input
            v-model="form.slug"
            type="text"
            required
            class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-lightning-yellow font-mono text-xs focus:outline-none focus:border-lightning-yellow/60"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-muted-silver uppercase font-bold">Penulis (Author)</label>
          <input
            v-model="form.author"
            type="text"
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
        <input
          v-model="form.image"
          type="url"
          placeholder="https://images.unsplash.com/..."
          class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-lightning-yellow/60"
        />

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
          <span>{{ isSubmitting ? 'Menyimpan Perubahan...' : 'Perbarui Berita' }}</span>
        </button>
      </div>

    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminWysiwygEditor from '~/components/admin/WysiwygEditor.vue'

definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const router = useRouter()
const { success, error: toastError } = useToast()

const id = route.params.id as string
const isSubmitting = ref(false)

const { data: item } = await useFetch<any>(`/api/news/${id}`)

const form = reactive({
  title: item.value?.title || '',
  slug: item.value?.slug || '',
  excerpt: item.value?.excerpt || '',
  content: item.value?.content || '',
  author: item.value?.author || 'Admin',
  date: item.value?.date || new Date().toISOString().split('T')[0],
  image: item.value?.image || '',
  isFeatured: item.value?.isFeatured || false
})

const handleSubmit = async () => {
  if (!form.title || !form.content) {
    toastError('Validasi Gagal', 'Judul dan konten berita wajib diisi!')
    return
  }

  try {
    isSubmitting.value = true
    await $fetch(`/api/news/${id}`, {
      method: 'PUT',
      body: form
    })
    success('Berhasil!', 'Artikel berita berhasil diperbarui.')
    router.push('/admin/news')
  } catch (err: any) {
    toastError('Gagal Menyimpan', err?.data?.statusMessage || err?.message || 'Terjadi kesalahan saat memperbarui berita.')
  } finally {
    isSubmitting.value = false
  }
}

useSeoMeta({
  title: `Edit Berita - ${form.title || id} - Cars CMS`
})
</script>

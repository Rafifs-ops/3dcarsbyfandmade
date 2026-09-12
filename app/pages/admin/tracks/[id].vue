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
        Edit Sirkuit #{{ id }}
      </span>
    </div>

    <!-- Main Form Card -->
    <form @submit.prevent="handleSubmit" class="carbon-card rounded-2xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
      
      <div class="border-b border-white/10 pb-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-russo text-white">
            EDIT SIRKUIT
          </h1>
          <p class="text-xs text-muted-silver font-chakra">
            Perbarui data sirkuit dan edit narasi deskripsi dengan WYSIWYG editor.
          </p>
        </div>

        <NuxtLink
          to="/#showroom"
          target="_blank"
          class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-muted-silver hover:text-white text-xs font-chakra flex items-center gap-1.5 transition-colors"
        >
          <BootstrapIcon name="eye" />
          <span>Lihat Carousel</span>
        </NuxtLink>
      </div>

      <!-- Name & ID -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 font-chakra text-xs">
        <div class="space-y-1.5">
          <label class="block text-muted-silver uppercase font-bold">Nama Sirkuit *</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-sm font-bold focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-muted-silver uppercase font-bold">Tipe Permukaan (Surface Type) *</label>
          <input
            v-model="form.surfaceType"
            type="text"
            required
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
          <span>{{ isSubmitting ? 'Menyimpan Perubahan...' : 'Perbarui Sirkuit' }}</span>
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

const { data: item } = await useFetch<any>(`/api/tracks/${id}`)

const form = reactive({
  name: item.value?.name || '',
  surfaceType: item.value?.surfaceType || '',
  description: item.value?.description || '',
  image: item.value?.image || '',
  ambientColor: item.value?.ambientColor || '#E11D2A'
})

const handleSubmit = async () => {
  if (!form.name || !form.description) {
    toastError('Validasi Gagal', 'Nama dan deskripsi sirkuit wajib diisi!')
    return
  }

  try {
    isSubmitting.value = true
    await $fetch(`/api/tracks/${id}`, {
      method: 'PUT',
      body: form
    })
    success('Berhasil!', `Sirkuit "${form.name}" berhasil diperbarui.`)
    router.push('/admin/tracks')
  } catch (err: any) {
    toastError('Gagal Menyimpan', err?.data?.statusMessage || err?.message || 'Terjadi kesalahan saat memperbarui sirkuit.')
  } finally {
    isSubmitting.value = false
  }
}

useSeoMeta({
  title: `Edit Sirkuit - ${form.name || id} - Cars CMS`
})
</script>

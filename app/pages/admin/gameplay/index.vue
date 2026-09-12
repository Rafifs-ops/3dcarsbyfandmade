<template>
  <div class="space-y-6">
    
    <!-- Top Action Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-russo text-white flex items-center gap-2">
          <BootstrapIcon name="play-btn-fill" class="text-purple-400" />
          <span>KELOLA VIDEO GAMEPLAY</span>
        </h1>
        <p class="text-xs sm:text-sm text-muted-silver font-inter">
          Atur cuplikan video sinematik, rekaman balapan 4K 60FPS, eksplorasi open-world, dan battle arena.
        </p>
      </div>

      <NuxtLink
        to="/admin/gameplay/new"
        class="btn-racing-skew px-5 py-2.5 rounded-xl bg-gradient-to-r from-rust-red to-rust-red-dark hover:from-rust-red-light text-white text-xs font-chakra font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-rust-red/40 transition-all self-start sm:self-auto"
      >
        <BootstrapIcon name="plus-lg" />
        <span>Tambah Video</span>
      </NuxtLink>
    </div>

    <!-- Gameplay Videos Table -->
    <div class="carbon-card rounded-2xl border border-white/10 overflow-hidden shadow-xl">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs font-chakra">
          <thead>
            <tr class="bg-black/50 border-b border-white/10 text-muted-silver uppercase tracking-wider">
              <th class="py-3.5 px-4 w-24">Preview</th>
              <th class="py-3.5 px-4">Judul Video</th>
              <th class="py-3.5 px-4">Kategori</th>
              <th class="py-3.5 px-4">Game</th>
              <th class="py-3.5 px-4">Durasi</th>
              <th class="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5 text-white">
            <tr
              v-for="video in videosList"
              :key="video.id"
              class="hover:bg-white/5 transition-colors"
            >
              <!-- Thumbnail preview from YouTube -->
              <td class="py-3.5 px-4">
                <div class="w-20 h-12 rounded-lg overflow-hidden bg-black/60 border border-white/10 relative group">
                  <img
                    :src="`https://img.youtube.com/vi/${video.youtubeId?.split('?')[0]}/hqdefault.jpg`"
                    :alt="video.title"
                    class="w-full h-full object-cover"
                  />
                  <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <BootstrapIcon name="play-fill" class="text-white text-base" />
                  </div>
                </div>
              </td>

              <!-- Title & ID -->
              <td class="py-3.5 px-4 max-w-sm">
                <p class="font-bold text-sm text-pure-white truncate">{{ video.title }}</p>
                <p class="text-[11px] font-mono text-lightning-yellow">{{ video.youtubeId }}</p>
              </td>

              <!-- Category -->
              <td class="py-3.5 px-4">
                <span class="px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[11px]">
                  {{ video.category }}
                </span>
              </td>

              <!-- Game -->
              <td class="py-3.5 px-4 text-muted-silver">
                {{ video.game }}
              </td>

              <!-- Duration -->
              <td class="py-3.5 px-4 font-mono font-bold text-muted-silver">
                {{ video.duration }}
              </td>

              <!-- Actions -->
              <td class="py-3.5 px-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <a
                    :href="`https://www.youtube.com/watch?v=${video.youtubeId}`"
                    target="_blank"
                    class="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-muted-silver hover:text-white transition-colors"
                    title="Buka di YouTube"
                  >
                    <BootstrapIcon name="youtube" class="text-rust-red" />
                  </a>

                  <NuxtLink
                    :to="`/admin/gameplay/${video.id}`"
                    class="p-2 rounded-lg bg-purple-500/20 hover:bg-purple-500 text-purple-300 hover:text-white transition-colors"
                    title="Edit Video"
                  >
                    <BootstrapIcon name="pencil-square" />
                  </NuxtLink>

                  <button
                    @click="confirmDelete(video)"
                    class="p-2 rounded-lg bg-white/5 hover:bg-rust-red text-muted-silver hover:text-white transition-colors"
                    title="Hapus Video"
                  >
                    <BootstrapIcon name="trash-fill" />
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="videosList.length === 0">
              <td colspan="6" class="py-12 text-center text-muted-silver">
                <BootstrapIcon name="play-btn" class="text-3xl text-muted-silver/40 mb-2 block mx-auto" />
                <p>Belum ada video gameplay terdaftar.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <AdminModal
      v-model="deleteModal"
      title="Hapus Video Gameplay"
      confirm-text="Hapus Video"
      confirm-type="danger"
      :loading="isDeleting"
      @confirm="handleDelete"
    >
      <p>
        Apakah Anda yakin ingin menghapus video <strong class="text-white">"{{ selectedItem?.title }}"</strong>?
      </p>
    </AdminModal>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'admin'
})

const { success, error: toastError } = useToast()
const { data: videosList, refresh } = await useFetch<any[]>('/api/gameplay', { default: () => [] })

const deleteModal = ref(false)
const selectedItem = ref<any>(null)
const isDeleting = ref(false)

const confirmDelete = (item: any) => {
  selectedItem.value = item
  deleteModal.value = true
}

const handleDelete = async () => {
  if (!selectedItem.value) return
  try {
    isDeleting.value = true
    await $fetch(`/api/gameplay/${selectedItem.value.id}`, {
      method: 'DELETE'
    })
    success('Video Dihapus', `Video "${selectedItem.value.title}" berhasil dihapus.`)
    deleteModal.value = false
    await refresh()
  } catch (err: any) {
    toastError('Gagal Menghapus', err?.message || 'Terjadi kesalahan saat menghapus video.')
  } finally {
    isDeleting.value = false
  }
}

useSeoMeta({
  title: 'Kelola Video Gameplay - Disney Pixar Cars CMS'
})
</script>

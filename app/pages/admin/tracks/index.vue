<template>
  <div class="space-y-6">
    
    <!-- Top Action Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-russo text-white flex items-center gap-2">
          <BootstrapIcon name="flag-fill" class="text-emerald-400" />
          <span>KELOLA SIRKUIT (TRACKS & ARENAS)</span>
        </h1>
        <p class="text-xs sm:text-sm text-muted-silver font-inter">
          Kelola lintasan balap ikonik, medan permukaan sirkuit, ambience warna, dan deskripsi WYSIWYG.
        </p>
      </div>

      <NuxtLink
        to="/admin/tracks/new"
        class="btn-racing-skew px-5 py-2.5 rounded-xl bg-gradient-to-r from-rust-red to-rust-red-dark hover:from-rust-red-light text-white text-xs font-chakra font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-rust-red/40 transition-all self-start sm:self-auto"
      >
        <BootstrapIcon name="plus-lg" />
        <span>Tambah Sirkuit</span>
      </NuxtLink>
    </div>

    <!-- Tracks Table -->
    <div class="carbon-card rounded-2xl border border-white/10 overflow-hidden shadow-xl">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs font-chakra">
          <thead>
            <tr class="bg-black/50 border-b border-white/10 text-muted-silver uppercase tracking-wider">
              <th class="py-3.5 px-4 w-20">Foto</th>
              <th class="py-3.5 px-4">Nama Sirkuit & ID</th>
              <th class="py-3.5 px-4">Tipe Permukaan</th>
              <th class="py-3.5 px-4">Warna Ambience</th>
              <th class="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5 text-white">
            <tr
              v-for="track in tracksList"
              :key="track.id"
              class="hover:bg-white/5 transition-colors"
            >
              <!-- Thumbnail -->
              <td class="py-3.5 px-4">
                <div class="w-16 h-10 rounded-lg overflow-hidden bg-black/60 border border-white/10">
                  <img
                    v-if="track.image"
                    :src="track.image"
                    :alt="track.name"
                    class="w-full h-full object-cover"
                  />
                </div>
              </td>

              <!-- Name & ID -->
              <td class="py-3.5 px-4">
                <p class="font-bold text-sm text-pure-white">{{ track.name }}</p>
                <p class="text-[11px] font-mono text-lightning-yellow">{{ track.id }}</p>
              </td>

              <!-- Surface Type -->
              <td class="py-3.5 px-4 text-muted-silver">
                {{ track.surfaceType }}
              </td>

              <!-- Ambient Color -->
              <td class="py-3.5 px-4">
                <div class="flex items-center gap-2">
                  <span
                    class="w-4 h-4 rounded-full border border-white/20 shadow-xs inline-block"
                    :style="{ backgroundColor: track.ambientColor || '#E11D2A' }"
                  />
                  <span class="font-mono text-xs uppercase">{{ track.ambientColor }}</span>
                </div>
              </td>

              <!-- Actions -->
              <td class="py-3.5 px-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <NuxtLink
                    :to="`/admin/tracks/${track.id}`"
                    class="p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-white transition-colors"
                    title="Edit Sirkuit"
                  >
                    <BootstrapIcon name="pencil-square" />
                  </NuxtLink>

                  <button
                    @click="confirmDelete(track)"
                    class="p-2 rounded-lg bg-white/5 hover:bg-rust-red text-muted-silver hover:text-white transition-colors"
                    title="Hapus Sirkuit"
                  >
                    <BootstrapIcon name="trash-fill" />
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="tracksList.length === 0">
              <td colspan="5" class="py-12 text-center text-muted-silver">
                <BootstrapIcon name="flag" class="text-3xl text-muted-silver/40 mb-2 block mx-auto" />
                <p>Belum ada sirkuit terdaftar.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <AdminModal
      v-model="deleteModal"
      title="Hapus Sirkuit Balap"
      confirm-text="Hapus Sirkuit"
      confirm-type="danger"
      :loading="isDeleting"
      @confirm="handleDelete"
    >
      <p>
        Apakah Anda yakin ingin menghapus sirkuit <strong class="text-white">"{{ selectedItem?.name }}"</strong>?
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
const { data: tracksList, refresh } = await useFetch<any[]>('/api/tracks', { default: () => [] })

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
    await $fetch(`/api/tracks/${selectedItem.value.id}`, {
      method: 'DELETE'
    })
    success('Sirkuit Dihapus', `Sirkuit "${selectedItem.value.name}" berhasil dihapus.`)
    deleteModal.value = false
    await refresh()
  } catch (err: any) {
    toastError('Gagal Menghapus', err?.message || 'Terjadi kesalahan saat menghapus sirkuit.')
  } finally {
    isDeleting.value = false
  }
}

useSeoMeta({
  title: 'Kelola Sirkuit - Disney Pixar Cars CMS'
})
</script>

<template>
  <div class="space-y-6">
    
    <!-- Top Action Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-russo text-white flex items-center gap-2">
          <BootstrapIcon name="car-front-fill" class="text-rust-red-light" />
          <span>KELOLA KARAKTER & 3D ROSTER</span>
        </h1>
        <p class="text-xs sm:text-sm text-muted-silver font-inter">
          Atur roster 3D mobil, skin corak alternatif, suara audio, dan data telemetri.
        </p>
      </div>

      <NuxtLink
        to="/admin/characters/new"
        class="btn-racing-skew px-5 py-2.5 rounded-xl bg-gradient-to-r from-rust-red to-rust-red-dark hover:from-rust-red-light text-white text-xs font-chakra font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-rust-red/40 transition-all self-start sm:self-auto"
      >
        <BootstrapIcon name="plus-lg" />
        <span>Tambah Karakter</span>
      </NuxtLink>
    </div>

    <!-- Filter & Search Bar -->
    <div class="p-4 rounded-2xl carbon-card border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="relative w-full sm:w-80">
        <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-silver">
          <BootstrapIcon name="search" />
        </span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari nama, sponsor, atau nomor balap..."
          class="w-full pl-10 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-chakra text-white placeholder:text-muted-silver focus:outline-none focus:border-rust-red/50 transition-colors"
        />
      </div>

      <!-- Category Filter Tabs -->
      <div class="flex flex-wrap items-center gap-1.5 self-start sm:self-auto text-xs font-chakra">
        <button
          v-for="cat in categoryFilters"
          :key="cat.id"
          @click="selectedCategory = cat.id"
          class="px-3 py-1.5 rounded-lg border transition-all"
          :class="selectedCategory === cat.id
            ? 'bg-rust-red/20 border-rust-red text-rust-red-light font-bold'
            : 'bg-black/30 border-white/10 text-muted-silver hover:text-white'"
        >
          {{ cat.label }}
        </button>
      </div>
    </div>

    <!-- Characters Table -->
    <div class="carbon-card rounded-2xl border border-white/10 overflow-hidden shadow-xl">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs font-chakra">
          <thead>
            <tr class="bg-black/50 border-b border-white/10 text-muted-silver uppercase tracking-wider">
              <th class="py-3.5 px-4 w-12">#</th>
              <th class="py-3.5 px-4">Nama Karakter</th>
              <th class="py-3.5 px-4">Kategori</th>
              <th class="py-3.5 px-4">Sponsor</th>
              <th class="py-3.5 px-4">Top Speed</th>
              <th class="py-3.5 px-4">Model 3D</th>
              <th class="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5 text-white">
            <tr
              v-for="char in filteredList"
              :key="char.id"
              class="hover:bg-white/5 transition-colors"
            >
              <!-- Color Indicator / Number -->
              <td class="py-3.5 px-4">
                <div class="flex items-center gap-2">
                  <div
                    class="w-3.5 h-8 rounded-full shadow-sm"
                    :style="{ backgroundColor: char.primaryColor || '#E11D2A' }"
                    :title="`Warna: ${char.primaryColor}`"
                  />
                  <span class="font-mono text-xs font-bold text-lightning-yellow">{{ char.racingNumber || '-' }}</span>
                </div>
              </td>

              <!-- Name & Title -->
              <td class="py-3.5 px-4">
                <p class="font-bold text-sm text-pure-white">{{ char.name }}</p>
                <p class="text-xs text-muted-silver font-inter truncate max-w-xs">{{ char.title }}</p>
              </td>

              <!-- Category -->
              <td class="py-3.5 px-4">
                <span class="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] text-muted-silver-light">
                  {{ char.categoryLabel || char.category }}
                </span>
              </td>

              <!-- Sponsor -->
              <td class="py-3.5 px-4 text-muted-silver">
                {{ char.sponsor }}
              </td>

              <!-- Top Speed -->
              <td class="py-3.5 px-4 font-mono font-bold text-lightning-yellow">
                {{ char.stats?.topSpeed || 200 }} MPH
              </td>

              <!-- 3D Model Path -->
              <td class="py-3.5 px-4 font-mono text-[11px] text-muted-silver max-w-[150px] truncate">
                {{ char.modelFile }}
              </td>

              <!-- Actions -->
              <td class="py-3.5 px-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <NuxtLink
                    :to="`/characters/${char.slug || char.id}`"
                    target="_blank"
                    class="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-muted-silver hover:text-white transition-colors"
                    title="Lihat Panggung 3D"
                  >
                    <BootstrapIcon name="eye" />
                  </NuxtLink>

                  <NuxtLink
                    :to="`/admin/characters/${char.id}`"
                    class="p-2 rounded-lg bg-rust-red/20 hover:bg-rust-red text-rust-red-light hover:text-white transition-colors"
                    title="Edit Karakter"
                  >
                    <BootstrapIcon name="pencil-square" />
                  </NuxtLink>

                  <button
                    @click="confirmDelete(char)"
                    class="p-2 rounded-lg bg-white/5 hover:bg-rose-900/60 text-muted-silver hover:text-white transition-colors"
                    title="Hapus Karakter"
                  >
                    <BootstrapIcon name="trash-fill" />
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="filteredList.length === 0">
              <td colspan="7" class="py-12 text-center text-muted-silver">
                <BootstrapIcon name="car-front" class="text-3xl text-muted-silver/40 mb-2 block mx-auto" />
                <p>Tidak ada karakter yang cocok.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <AdminModal
      v-model="deleteModal"
      title="Hapus Karakter"
      confirm-text="Hapus Karakter"
      confirm-type="danger"
      :loading="isDeleting"
      @confirm="handleDelete"
    >
      <p>
        Apakah Anda yakin ingin menghapus karakter <strong class="text-white">"{{ selectedItem?.name }}"</strong>?
        Data model 3D dan relasi skin terkait juga akan dihapus.
      </p>
    </AdminModal>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'admin'
})

const { success, error: toastError } = useToast()

const searchQuery = ref('')
const selectedCategory = ref('all')

const categoryFilters = [
  { id: 'all', label: 'Semua' },
  { id: 'piston-cup', label: 'Piston Cup' },
  { id: 'radiator-springs', label: 'Radiator Springs' },
  { id: 'world-grand-prix', label: 'World GP' },
  { id: 'next-gen', label: 'Next-Gen' },
  { id: 'special-agents', label: 'Special Agents' }
]

const { data: charactersList, refresh } = await useFetch<any[]>('/api/characters', { default: () => [] })

const filteredList = computed(() => {
  return (charactersList.value || []).filter(item => {
    const matchCat = selectedCategory.value === 'all' || item.category === selectedCategory.value
    const matchSearch = searchQuery.value.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.sponsor.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (item.racingNumber && String(item.racingNumber).toLowerCase().includes(searchQuery.value.toLowerCase()))
    return matchCat && matchSearch
  })
})

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
    await $fetch(`/api/characters/${selectedItem.value.id}`, {
      method: 'DELETE'
    })
    success('Karakter Dihapus', `Karakter "${selectedItem.value.name}" berhasil dihapus.`)
    deleteModal.value = false
    await refresh()
  } catch (err: any) {
    toastError('Gagal Menghapus', err?.message || 'Terjadi kesalahan saat menghapus karakter.')
  } finally {
    isDeleting.value = false
  }
}

useSeoMeta({
  title: 'Kelola Karakter - Disney Pixar Cars CMS'
})
</script>

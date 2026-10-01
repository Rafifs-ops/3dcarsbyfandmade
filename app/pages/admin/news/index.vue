<template>
  <div class="space-y-6">
    
    <!-- Top Action Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-russo text-white flex items-center gap-2">
          <BootstrapIcon name="newspaper" class="text-lightning-yellow" />
          <span>MANAGE NEWS</span>
        </h1>
        <p class="text-xs sm:text-sm text-muted-silver font-inter">
          Publish articles, modification guides, community tournaments, and patch updates.
        </p>
      </div>

      <NuxtLink
        to="/admin/news/new"
        class="btn-racing-skew px-5 py-2.5 rounded-xl bg-gradient-to-r from-rust-red to-rust-red-dark hover:from-rust-red-light text-white text-xs font-chakra font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-rust-red/40 transition-all self-start sm:self-auto"
      >
        <BootstrapIcon name="plus-lg" />
        <span>Add News</span>
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
          placeholder="Search by title or author..."
          class="w-full pl-10 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-chakra text-white placeholder:text-muted-silver focus:outline-none focus:border-lightning-yellow/50 transition-colors"
        />
      </div>

      <div class="flex items-center gap-2 self-end sm:self-auto text-xs font-chakra">
        <button
          @click="featuredFilter = !featuredFilter"
          class="px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5"
          :class="featuredFilter
            ? 'bg-lightning-yellow/20 border-lightning-yellow text-lightning-yellow font-bold'
            : 'bg-black/30 border-white/10 text-muted-silver hover:text-white'"
        >
          <BootstrapIcon name="star-fill" />
          <span>Featured Only</span>
        </button>
      </div>
    </div>

    <!-- News Table Card -->
    <div class="carbon-card rounded-2xl border border-white/10 overflow-hidden shadow-xl">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs font-chakra">
          <thead>
            <tr class="bg-black/50 border-b border-white/10 text-muted-silver uppercase tracking-wider">
              <th class="py-3.5 px-4 w-20">Cover</th>
              <th class="py-3.5 px-4">Title & Excerpt</th>
              <th class="py-3.5 px-4">Author</th>
              <th class="py-3.5 px-4">Date</th>
              <th class="py-3.5 px-4 text-center">Status</th>
              <th class="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5 text-white">
            <tr
              v-for="item in filteredList"
              :key="item.id"
              class="hover:bg-white/5 transition-colors"
            >
              <!-- Thumbnail -->
              <td class="py-3.5 px-4">
                <div class="w-16 h-10 rounded-lg overflow-hidden bg-black/60 border border-white/10 flex items-center justify-center">
                  <img
                    v-if="item.image"
                    :src="item.image"
                    :alt="item.title"
                    class="w-full h-full object-cover"
                  />
                  <BootstrapIcon v-else name="image" class="text-muted-silver" />
                </div>
              </td>

              <!-- Title & Excerpt -->
              <td class="py-3.5 px-4">
                <div class="max-w-md">
                  <p class="font-bold text-sm text-pure-white truncate">{{ item.title }}</p>
                  <p class="text-xs text-muted-silver truncate font-inter">{{ item.excerpt }}</p>
                </div>
              </td>

              <!-- Author -->
              <td class="py-3.5 px-4 font-medium text-muted-silver">
                {{ item.author }}
              </td>

              <!-- Date -->
              <td class="py-3.5 px-4 font-mono text-muted-silver">
                {{ item.date }}
              </td>

              <!-- Featured Badge -->
              <td class="py-3.5 px-4 text-center">
                <span
                  v-if="item.isFeatured"
                  class="px-2 py-0.5 rounded bg-lightning-yellow/20 text-lightning-yellow border border-lightning-yellow/40 text-[10px] font-bold uppercase"
                >
                  Featured
                </span>
                <span v-else class="text-muted-silver/60 text-[10px] uppercase">
                  Regular
                </span>
              </td>

              <!-- Action Buttons -->
              <td class="py-3.5 px-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <NuxtLink
                    :to="`/news/${item.slug || item.id}`"
                    target="_blank"
                    class="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-muted-silver hover:text-white transition-colors"
                    title="View Preview"
                  >
                    <BootstrapIcon name="eye" />
                  </NuxtLink>

                  <NuxtLink
                    :to="`/admin/news/${item.id}`"
                    class="p-2 rounded-lg bg-dinoco-blue/20 hover:bg-dinoco-blue text-dinoco-blue hover:text-white transition-colors"
                    title="Edit Article"
                  >
                    <BootstrapIcon name="pencil-square" />
                  </NuxtLink>

                  <button
                    @click="confirmDelete(item)"
                    class="p-2 rounded-lg bg-rust-red/20 hover:bg-rust-red text-rust-red-light hover:text-white transition-colors"
                    title="Delete Article"
                  >
                    <BootstrapIcon name="trash-fill" />
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="filteredList.length === 0">
              <td colspan="6" class="py-12 text-center text-muted-silver">
                <BootstrapIcon name="newspaper" class="text-3xl text-muted-silver/40 mb-2 block mx-auto" />
                <p>No news articles match your search.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <AdminModal
      v-model="deleteModal"
      title="Delete News Article"
      confirm-text="Delete Article"
      confirm-type="danger"
      :loading="isDeleting"
      @confirm="handleDelete"
    >
      <p>
        Are you sure you want to delete article <strong class="text-white">"{{ selectedItem?.title }}"</strong>?
        This action cannot be undone.
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
const featuredFilter = ref(false)

const { data: newsList, refresh } = await useFetch<any[]>('/api/news', { default: () => [] })

const filteredList = computed(() => {
  return (newsList.value || []).filter(item => {
    const matchSearch = searchQuery.value.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchFeatured = !featuredFilter.value || item.isFeatured
    return matchSearch && matchFeatured
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
    await $fetch(`/api/news/${selectedItem.value.id}`, {
      method: 'DELETE'
    })
    success('Article Deleted', `Article "${selectedItem.value.title}" has been successfully deleted.`)
    deleteModal.value = false
    await refresh()
  } catch (err: any) {
    toastError('Delete Failed', err?.message || 'An error occurred while deleting the article.')
  } finally {
    isDeleting.value = false
  }
}

useSeoMeta({
  title: 'Manage News - Disney Pixar Cars CMS'
})
</script>

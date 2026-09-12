<template>
  <div class="min-h-screen bg-asphalt-black text-pure-white font-inter flex flex-col">
    <!-- Admin Sidebar -->
    <AdminSidebar
      :is-open="isSidebarOpen"
      @close="isSidebarOpen = false"
    />

    <!-- Overlay backdrop for mobile -->
    <div
      v-if="isSidebarOpen"
      @click="isSidebarOpen = false"
      class="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs lg:hidden"
    />

    <!-- Main Content Area -->
    <div class="flex-grow flex flex-col lg:pl-64 transition-all">
      <!-- Admin Top Header -->
      <AdminHeader @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />

      <!-- Page Content -->
      <main class="flex-grow p-4 sm:p-8 max-w-7xl w-full mx-auto">
        <slot />
      </main>
    </div>

    <!-- Admin Toast Notification Portal -->
    <AdminToast />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AdminSidebar from '~/components/admin/AdminSidebar.vue'
import AdminHeader from '~/components/admin/AdminHeader.vue'
import AdminToast from '~/components/admin/AdminToast.vue'

const isSidebarOpen = ref(false)
</script>

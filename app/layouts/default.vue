<template>
  <div class="min-h-screen flex flex-col bg-asphalt-black text-pure-white selection:bg-rust-red selection:text-white font-inter">
    <Navbar />
    
    <main class="flex-grow">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
// Default layout with responsive Navbar and Footer
</script>

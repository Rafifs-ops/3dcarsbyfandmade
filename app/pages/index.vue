<template>
  <div class="relative overflow-hidden bg-asphalt-grid">

    <!-- Hero Section -->
    <HomeHero />

    <!-- SECTION 1: 3D VIRTUAL SHOWROOM -->
    <section id="showroom" class="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">

      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <h2 class="text-3xl sm:text-5xl font-russo text-pure-white tracking-wide">
          VIRTUAL 3D SHOWROOM
        </h2>
        <p class="text-sm sm:text-base text-muted-silver">
          Pilih mobil favoritmu (Lightning McQueen, Tow Mater, Cruz Ramirez, Jackson Storm), ganti varian skin cat
          resmi, dengarkan suara klakson ikonik, dan dengarkan raungan mesin V8 secara langsung!
        </p>
      </div>

      <!-- 3D Showroom Component -->
      <ThreeShowroom />

    </section>

    <!-- SECTION 2: LEGENDARY TRACKS CAROUSEL -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <TrackCarousel />
    </section>

    <!-- SECTION 3: CINEMATIC TRAILER & IN-GAME FOOTAGE -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <TrailerModal />
    </section>

    <!-- SECTION 4: 2 GAMES FRANCHISE SUMMARY (Cars & Cars 2) -->
    <HomeGameOverview />

    <!-- SECTION 5: FINAL HIGH-IMPACT STEAM CTA BANNER -->
    <HomeCtaBanner />

  </div>
</template>

<script setup lang="ts">
import HomeHero from '~/components/home/HomeHero.vue'
import HomeGameOverview from '~/components/home/HomeGameOverview.vue'
import HomeCtaBanner from '~/components/home/HomeCtaBanner.vue'

useSeoMeta({
  title: 'Disney Pixar Cars - Official Steam Game Showcase & 3D Showroom',
  ogTitle: 'Disney Pixar Cars & Cars 2 - Steam Video Game Hub',
  description: 'Landing page resmi promosi game Disney Pixar Cars & Cars 2 di Steam. Nikmati panggung 3D interaktif Lightning McQueen 360°, audio suara mesin ikonik, trailer sinematik, dan review.',
  ogDescription: 'Panggung 3D virtual 360° Lightning McQueen, Tow Mater, Cruz Ramirez, dan Jackson Storm. Download game Cars di Steam sekarang!',
  ogImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
  twitterCard: 'summary_large_image'
})
</script>

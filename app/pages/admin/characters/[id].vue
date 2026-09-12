<template>
  <div class="max-w-4xl mx-auto space-y-6">
    
    <!-- Top Nav / Breadcrumbs -->
    <div class="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
      <NuxtLink
        to="/admin/characters"
        class="inline-flex items-center gap-2 text-xs font-chakra uppercase tracking-wider text-muted-silver hover:text-lightning-yellow transition-colors"
      >
        <BootstrapIcon name="arrow-left" />
        <span>Kembali ke Daftar Karakter</span>
      </NuxtLink>

      <span class="text-xs font-chakra text-rust-red-light uppercase tracking-widest px-2.5 py-0.5 rounded bg-white/5 border border-white/10">
        Edit Karakter #{{ id }}
      </span>
    </div>

    <!-- Main Form Card -->
    <form @submit.prevent="handleSubmit" class="carbon-card rounded-2xl border border-white/10 p-6 sm:p-8 space-y-8 shadow-2xl">
      
      <div class="border-b border-white/10 pb-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-russo text-white">
            EDIT KARAKTER
          </h1>
          <p class="text-xs text-muted-silver font-chakra">
            Perbarui data model 3D, corak skin, audio suara, dan spesifikasi.
          </p>
        </div>

        <NuxtLink
          :to="`/characters/${form.slug || id}`"
          target="_blank"
          class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-muted-silver hover:text-white text-xs font-chakra flex items-center gap-1.5 transition-colors"
        >
          <BootstrapIcon name="eye" />
          <span>Lihat Panggung 3D</span>
        </NuxtLink>
      </div>

      <!-- SECTION 1: Identity & Classification -->
      <div class="space-y-4">
        <h3 class="text-sm font-russo text-lightning-yellow uppercase tracking-wider border-b border-white/10 pb-2">
          1. Identitas & Klasifikasi
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 font-chakra text-xs">
          <div class="space-y-1.5 sm:col-span-2">
            <label class="block text-muted-silver uppercase font-bold">Nama Karakter *</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-sm font-bold focus:outline-none focus:border-rust-red/60"
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-muted-silver uppercase font-bold">Nomor Balap</label>
            <input
              v-model="form.racingNumber"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-lightning-yellow text-sm font-mono font-bold focus:outline-none focus:border-rust-red/60"
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-muted-silver uppercase font-bold">Slug URL</label>
            <input
              v-model="form.slug"
              type="text"
              required
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-lightning-yellow font-mono text-xs focus:outline-none focus:border-rust-red/60"
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-muted-silver uppercase font-bold">Kategori *</label>
            <select
              v-model="form.category"
              required
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-rust-red/60"
            >
              <option value="piston-cup">Piston Cup (Piston Cup Champions)</option>
              <option value="radiator-springs">Radiator Springs (Radiator Springs Legend)</option>
              <option value="world-grand-prix">World Grand Prix (World GP Superstar)</option>
              <option value="next-gen">Next-Gen (Next-Gen Racers)</option>
              <option value="special-agents">Special Agents (Secret Agents & Lemons)</option>
            </select>
          </div>

          <div class="space-y-1.5">
            <label class="block text-muted-silver uppercase font-bold">Label Kategori Tampilan</label>
            <input
              v-model="form.categoryLabel"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-rust-red/60"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 font-chakra text-xs">
          <div class="space-y-1.5">
            <label class="block text-muted-silver uppercase font-bold">Gelar / Title</label>
            <input
              v-model="form.title"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-rust-red/60"
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-muted-silver uppercase font-bold">Tagline</label>
            <input
              v-model="form.tagline"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-rust-red/60"
            />
          </div>
        </div>
      </div>

      <!-- SECTION 2: 3D Model & Assets -->
      <div class="space-y-4">
        <h3 class="text-sm font-russo text-lightning-yellow uppercase tracking-wider border-b border-white/10 pb-2">
          2. Model 3D & Aset Visual
        </h3>

        <div class="space-y-4 font-chakra text-xs">
          <FileUpload
            v-model="form.modelFile"
            accept=".glb,.gltf"
            folder="models"
            label="File Model 3D (.glb) *"
            :old-path="originalPaths.modelFile"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 font-chakra text-xs">
          <div class="space-y-1.5">
            <label class="block text-muted-silver uppercase font-bold">Scale Model</label>
            <input
              v-model.number="form.scale"
              type="number"
              step="0.05"
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-rust-red/60"
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-muted-silver uppercase font-bold">Warna Utama (Primary Color)</label>
            <div class="flex items-center gap-2">
              <input
                v-model="form.primaryColor"
                type="color"
                class="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <input
                v-model="form.primaryColor"
                type="text"
                class="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white font-mono text-xs uppercase"
              />
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="block text-muted-silver uppercase font-bold">Warna Aksen (Accent Color)</label>
            <div class="flex items-center gap-2">
              <input
                v-model="form.accentColor"
                type="color"
                class="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <input
                v-model="form.accentColor"
                type="text"
                class="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white font-mono text-xs uppercase"
              />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 font-chakra text-xs">
          <FileUpload
            v-model="form.coverUrl"
            accept=".png,.jpg,.jpeg,.webp"
            folder="images/cars"
            label="Gambar Cover Karakter"
            :old-path="originalPaths.coverUrl"
          />

          <FileUpload
            v-model="form.soundEffect"
            accept=".mp3,.wav,.ogg,.m4a"
            folder="audio"
            label="Suara Audio FX (Sound Effect)"
            :old-path="originalPaths.soundEffect"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 font-chakra text-xs">
          <div class="space-y-1.5">
            <label class="block text-muted-silver uppercase font-bold">Kutipan Suara (Voice Quote)</label>
            <input
              v-model="form.voiceQuote"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-rust-red/60"
            />
          </div>
        </div>
      </div>

      <!-- SECTION 3: Performance Telemetry -->
      <div class="space-y-4">
        <h3 class="text-sm font-russo text-lightning-yellow uppercase tracking-wider border-b border-white/10 pb-2">
          3. Spesifikasi Telemetri Mesin
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 font-chakra text-xs">
          <div class="space-y-1.5">
            <label class="block text-muted-silver uppercase font-bold">Top Speed (MPH) *</label>
            <input
              v-model.number="form.topSpeed"
              type="number"
              required
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-lightning-yellow font-mono text-sm font-bold focus:outline-none focus:border-rust-red/60"
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-muted-silver uppercase font-bold">Sponsor Resmi</label>
            <input
              v-model="form.sponsor"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-rust-red/60"
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-muted-silver uppercase font-bold">Tipe Mesin (Engine Type)</label>
            <input
              v-model="form.engineType"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-rust-red/60"
            />
          </div>
        </div>
      </div>

      <!-- SECTION 4: Bio & Trivia Fun Fact -->
      <div class="space-y-4">
        <h3 class="text-sm font-russo text-lightning-yellow uppercase tracking-wider border-b border-white/10 pb-2">
          4. Biografi & Fakta Menarik
        </h3>

        <div class="space-y-3 font-chakra text-xs">
          <div class="space-y-1.5">
            <label class="block text-muted-silver uppercase font-bold">Biografi Karakter</label>
            <textarea
              v-model="form.bio"
              rows="3"
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs font-inter leading-relaxed focus:outline-none focus:border-rust-red/60"
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-muted-silver uppercase font-bold">Fakta Unik (Fun Fact)</label>
            <textarea
              v-model="form.funFact"
              rows="2"
              class="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs font-inter leading-relaxed focus:outline-none focus:border-rust-red/60"
            />
          </div>
        </div>
      </div>

      <!-- SECTION 5: Skins / Livery Alternatives -->
      <div class="space-y-4">
        <div class="flex items-center justify-between border-b border-white/10 pb-2">
          <h3 class="text-sm font-russo text-lightning-yellow uppercase tracking-wider">
            5. Skin & Livery Alternatif
          </h3>
          <button
            type="button"
            @click="addSkin"
            class="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-chakra font-bold flex items-center gap-1.5 transition-colors"
          >
            <BootstrapIcon name="plus-lg" />
            <span>Tambah Skin</span>
          </button>
        </div>

        <div v-if="form.skins.length === 0" class="p-4 rounded-xl bg-black/30 border border-dashed border-white/10 text-center text-xs font-chakra text-muted-silver">
          Belum ada skin alternatif. Klik tombol di atas jika karakter memiliki corak warna/3D model tambahan.
        </div>

        <div v-else class="space-y-3 font-chakra text-xs">
          <div
            v-for="(skin, idx) in form.skins"
            :key="idx"
            class="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3"
          >
            <div class="flex items-center justify-between">
              <span class="font-bold text-white uppercase text-xs">Skin #{{ Number(idx) + 1 }}</span>
              <button
                type="button"
                @click="removeSkin(Number(idx))"
                class="text-rust-red-light hover:text-white p-1"
              >
                <BootstrapIcon name="trash" />
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-muted-silver text-[11px] mb-1">Nama Skin</label>
                <input
                  v-model="skin.name"
                  type="text"
                  placeholder="Dinoco Blue 95"
                  class="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-white text-xs"
                />
              </div>

              <div>
                <FileUpload
                  v-model="skin.modelFile"
                  accept=".glb,.gltf"
                  folder="models"
                  label="Model 3D Path"
                  :old-path="skin._originalModelFile"
                />
              </div>

              <div>
                <label class="block text-muted-silver text-[11px] mb-1">Warna Preview</label>
                <div class="flex items-center gap-2">
                  <input
                    v-model="skin.previewColor"
                    type="color"
                    class="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
                  />
                  <input
                    v-model="skin.previewColor"
                    type="text"
                    class="w-full px-2 py-1.5 rounded-lg bg-black/50 border border-white/15 text-white text-xs font-mono"
                  />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label class="block text-muted-silver text-[11px] mb-1">Deskripsi Skin</label>
                <input
                  v-model="skin.description"
                  type="text"
                  class="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-white text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="pt-4 border-t border-white/10 flex items-center justify-end gap-3 font-chakra">
        <NuxtLink
          to="/admin/characters"
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
          <span>{{ isSubmitting ? 'Menyimpan...' : 'Perbarui Karakter' }}</span>
        </button>
      </div>

    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const router = useRouter()
const { success, error: toastError } = useToast()

const id = route.params.id as string
const isSubmitting = ref(false)

const { data: item } = await useFetch<any>(`/api/characters/${id}`)

const originalPaths = reactive({
  modelFile: item.value?.modelFile || '',
  coverUrl: item.value?.coverUrl || '',
  soundEffect: item.value?.soundEffect || '',
})

const form = reactive({
  slug: item.value?.slug || '',
  name: item.value?.name || '',
  racingNumber: item.value?.racingNumber || '',
  title: item.value?.title || '',
  tagline: item.value?.tagline || '',
  category: item.value?.category || 'piston-cup',
  categoryLabel: item.value?.categoryLabel || 'Piston Cup Champion',
  modelFile: item.value?.modelFile || '/models/mcqueen.glb',
  coverUrl: item.value?.coverUrl || '',
  scale: item.value?.scale || 0.95,
  primaryColor: item.value?.primaryColor || '#E11D2A',
  accentColor: item.value?.accentColor || '#FFC700',
  soundEffect: item.value?.soundEffect || '',
  voiceQuote: item.value?.voiceQuote || '',
  topSpeed: item.value?.stats?.topSpeed || 200,
  sponsor: item.value?.sponsor || '',
  engineType: item.value?.engineType || '',
  bio: item.value?.bio || '',
  funFact: item.value?.funFact || '',
  skins: (item.value?.skins || []).map((s: any) => ({
    id: s.id,
    name: s.name,
    modelFile: s.modelFile,
    previewColor: s.previewColor,
    description: s.description,
    _originalModelFile: s.modelFile
  }))
})

const addSkin = () => {
  form.skins.push({
    id: `skin_${Date.now()}`,
    name: '',
    modelFile: form.modelFile,
    previewColor: form.primaryColor,
    description: ''
  })
}

const removeSkin = (index: number) => {
  form.skins.splice(index, 1)
}

const handleSubmit = async () => {
  if (!form.name || !form.modelFile) {
    toastError('Validasi Gagal', 'Nama karakter dan model 3D file wajib diisi!')
    return
  }

  try {
    isSubmitting.value = true
    await $fetch(`/api/characters/${id}`, {
      method: 'PUT',
      body: form
    })
    success('Berhasil!', `Karakter "${form.name}" berhasil diperbarui.`)
    router.push('/admin/characters')
  } catch (err: any) {
    toastError('Gagal Menyimpan', err?.data?.statusMessage || err?.message || 'Terjadi kesalahan saat memperbarui karakter.')
  } finally {
    isSubmitting.value = false
  }
}

useSeoMeta({
  title: `Edit Karakter - ${form.name || id} - Cars CMS`
})
</script>

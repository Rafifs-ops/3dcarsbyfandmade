import { useState } from '#app'
import { onMounted, onBeforeUnmount } from 'vue'

let audioCtx: AudioContext | null = null
let currentRevAudio: HTMLAudioElement | null = null
let rpmInterval: ReturnType<typeof setInterval> | null = null

export const useCarAudio = () => {
  const isMuted = useState<boolean>('car_audio_muted', () => false)
  const isRevving = useState<boolean>('car_is_revving', () => false)
  const rpm = useState<number>('car_rpm_telemetry', () => 850)

  // Inisialisasi Audio secara aman di sisi Client (Browser)
  onMounted(() => {
    if (typeof window !== 'undefined' && !currentRevAudio) {
      currentRevAudio = new Audio('/audio/v8.mp3')
      currentRevAudio.preload = 'auto' // Paksa browser mengunduh data lebih awal
      currentRevAudio.load()
    }
  })

  // Bersihkan interval jika komponen hancur
  onBeforeUnmount(() => {
    if (rpmInterval) clearInterval(rpmInterval)
  })

  const getAudioContext = () => {
    if (typeof window === 'undefined') return null
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      if (AudioContextClass) {
        audioCtx = new AudioContextClass()
      }
    }
    // Vercel / HTTPS mengharuskan resume dipicu langsung oleh interaksi user murni
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume()
    }
    return audioCtx
  }

  // Play MP3 voice line or sound effect
  const playSound = (soundUrl: string) => {
    if (isMuted.value || !soundUrl || typeof window === 'undefined') return
    try {
      const audio = new Audio(soundUrl)
      audio.volume = 0.85
      audio.play().catch(err => {
        // Ubah ke console.error agar terdeteksi jika Vercel memblokirnya
        console.error('Vercel Audio Blocked:', err)
      })
    } catch (e) {
      console.error('Error playing audio file:', e)
    }
  }

  // Authentic V8 Engine Rev using public/audio/v8.mp3
  const revEngine = (_durationMs?: number) => {
    if (isMuted.value || typeof window === 'undefined' || !currentRevAudio) return

    try {
      // Aktifkan kembali AudioContext jika horn/nitro sempat dipakai
      getAudioContext()

      // Reset audio yang sudah ter-preload sebelumnya
      currentRevAudio.pause()
      currentRevAudio.currentTime = 0
      currentRevAudio.volume = 0.95

      isRevving.value = true
      rpm.value = 7500

      if (rpmInterval) {
        clearInterval(rpmInterval)
        rpmInterval = null
      }

      // Dynamic RPM telemetry simulation during V8 rev
      rpmInterval = setInterval(() => {
        if (isRevving.value) {
          rpm.value = Math.floor(7200 + Math.random() * 650)
        } else {
          if (rpmInterval) {
            clearInterval(rpmInterval)
            rpmInterval = null
          }
        }
      }, 90)

      const cleanup = () => {
        isRevving.value = false
        rpm.value = 850
        if (rpmInterval) {
          clearInterval(rpmInterval)
          rpmInterval = null
        }
      }

      currentRevAudio.onended = () => {
        cleanup()
      }

      currentRevAudio.onerror = (e) => {
        console.error('Error playing /audio/v8.mp3 on Vercel server:', e)
        cleanup()
      }

      const playPromise = currentRevAudio.play()
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.error('Vercel strictly prevented asynchrous play:', err)
          cleanup()
        })
      }
    } catch (e) {
      console.error('Error executing revEngine:', e)
      isRevving.value = false
      rpm.value = 850
      if (rpmInterval) {
        clearInterval(rpmInterval)
        rpmInterval = null
      }
    }
  }

  // Classic Cartoon / Arcade Car Horn Synthesizer
  const playHorn = () => {
    if (isMuted.value || typeof window === 'undefined') return
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const duration = 0.45
    const freqs = [349.23, 440.0]

    freqs.forEach(freq => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, now)

      gain.gain.setValueAtTime(0.01, now)
      gain.gain.linearRampToValueAtTime(0.2, now + 0.03)
      gain.gain.setValueAtTime(0.2, now + duration - 0.08)
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + duration)
    })
  }

  const toggleMute = () => {
    isMuted.value = !isMuted.value
    if (isMuted.value) {
      if (currentRevAudio) {
        currentRevAudio.pause()
        currentRevAudio.currentTime = 0
      }
      isRevving.value = false
      rpm.value = 850
      if (rpmInterval) {
        clearInterval(rpmInterval)
        rpmInterval = null
      }
    }
  }

  return {
    isMuted,
    isRevving,
    rpm,
    playSound,
    revEngine,
    playHorn,
    toggleMute
  }
}

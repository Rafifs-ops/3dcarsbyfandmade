import type { Character, CommunityNews, TrackCircuit, GameSpec, GameplayVideo } from '~/types'
import { newsData } from '~/data/news'
import { charactersData } from '~/data/characters'
import { circuitsData } from '~/data/tracks'
import { cars1Spec, cars2Spec, gameplayVideos } from '~/data/gameInfo'

export const useCmsData = () => {
  // Fetch All News
  const fetchNews = async (options: { featured?: boolean; search?: string } = {}) => {
    return useAsyncData('cms_news', async () => {
      try {
        const query: any = {}
        if (options.featured) query.featured = 'true'
        if (options.search) query.search = options.search

        const data = await $fetch<CommunityNews[]>('/api/news', { query })
        return data && data.length > 0 ? data : newsData
      } catch (err) {
        console.warn('Fallback to local news:', err)
        return newsData
      }
    }, {
      default: () => newsData
    })
  }

  // Fetch Single News by ID/Slug
  const fetchNewsById = async (id: string) => {
    return useAsyncData(`cms_news_${id}`, async () => {
      try {
        const data = await $fetch<CommunityNews>(`/api/news/${id}`)
        return data || newsData.find(n => n.id === id || n.slug === id)
      } catch (err) {
        console.warn(`Fallback to local news for ${id}:`, err)
        return newsData.find(n => n.id === id || n.slug === id)
      }
    })
  }

  // Fetch All Characters
  const fetchCharacters = async (options: { category?: string; search?: string } = {}) => {
    return useAsyncData('cms_characters', async () => {
      try {
        const query: any = {}
        if (options.category && options.category !== 'all') query.category = options.category
        if (options.search) query.search = options.search

        const data = await $fetch<Character[]>('/api/characters', { query })
        return data && data.length > 0 ? data : charactersData
      } catch (err) {
        console.warn('Fallback to local characters:', err)
        return charactersData
      }
    }, {
      default: () => charactersData
    })
  }

  // Fetch Single Character by ID/Slug
  const fetchCharacterById = async (id: string) => {
    return useAsyncData(`cms_character_${id}`, async () => {
      try {
        const data = await $fetch<Character>(`/api/characters/${id}`)
        return data || charactersData.find(c => c.id === id || c.slug === id)
      } catch (err) {
        console.warn(`Fallback to local character for ${id}:`, err)
        return charactersData.find(c => c.id === id || c.slug === id)
      }
    })
  }

  // Fetch All Tracks
  const fetchTracks = async () => {
    return useAsyncData('cms_tracks', async () => {
      try {
        const data = await $fetch<TrackCircuit[]>('/api/tracks')
        return data && data.length > 0 ? data : circuitsData
      } catch (err) {
        console.warn('Fallback to local tracks:', err)
        return circuitsData
      }
    }, {
      default: () => circuitsData
    })
  }

  // Fetch All Game Specs
  const fetchGameSpecs = async () => {
    return useAsyncData('cms_specs', async () => {
      try {
        const data = await $fetch<(GameSpec & { id: string })[]>('/api/specs')
        if (data && data.length >= 2) {
          const cars1 = data.find(d => d.id === 'cars-1') || cars1Spec
          const cars2 = data.find(d => d.id === 'cars-2') || cars2Spec
          return { cars1, cars2 }
        }
        return { cars1: cars1Spec, cars2: cars2Spec }
      } catch (err) {
        console.warn('Fallback to local game specs:', err)
        return { cars1: cars1Spec, cars2: cars2Spec }
      }
    }, {
      default: () => ({ cars1: cars1Spec, cars2: cars2Spec })
    })
  }

  // Fetch All Gameplay Videos
  const fetchGameplayVideos = async () => {
    return useAsyncData('cms_gameplay', async () => {
      try {
        const data = await $fetch<GameplayVideo[]>('/api/gameplay')
        return data && data.length > 0 ? data : gameplayVideos
      } catch (err) {
        console.warn('Fallback to local gameplay videos:', err)
        return gameplayVideos
      }
    }, {
      default: () => gameplayVideos
    })
  }

  return {
    fetchNews,
    fetchNewsById,
    fetchCharacters,
    fetchCharacterById,
    fetchTracks,
    fetchGameSpecs,
    fetchGameplayVideos
  }
}

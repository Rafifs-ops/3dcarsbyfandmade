export interface CharacterSkin {
  id: string
  name: string
  modelFile: string
  previewColor: string
  description: string
}

export interface CharacterStats {
  topSpeed: number // mph
}

export interface Character {
  id: string
  slug: string
  name: string
  racingNumber?: string | number
  title: string
  tagline: string
  category: 'piston-cup' | 'radiator-springs' | 'world-grand-prix' | 'next-gen' | 'special-agents'
  categoryLabel: string
  modelFile: string
  coverUrl?: string
  gameCoverUrl?: string
  skins?: CharacterSkin[]
  defaultSkinId?: string
  scale?: number
  positionOffset?: [number, number, number]
  rotationOffset?: [number, number, number]
  stats: CharacterStats
  sponsor: string
  engineType: string
  voiceQuote?: string
  soundEffect?: string
  bio: string
  funFact: string
  primaryColor: string
  accentColor: string
}

export interface TrackCircuit {
  id: string
  name: string
  surfaceType: string
  description: string
  image: string
  ambientColor: string
}

export interface CommunityNews {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  image: string
  isFeatured?: boolean
}

export interface GameSpec {
  title: string
  releaseYear: number
  developer: string
  publisher: string
  genre: string
  steamAppId: string
  steamUrl: string
  summary: string
  coverUrl: string
  minimumSpecs: {
    os: string
    processor: string
    memory: string
    graphics: string
    directx: string
    storage: string
  }
}

export interface GameplayVideo {
  id: string
  title: string
  category: string
  youtubeId: string
  duration: string
  game: string
  description: string
}

import { createClient } from '@libsql/client'
import * as dotenv from 'dotenv'
import { newsData } from '../app/data/news.ts'
import { charactersData } from '../app/data/characters.ts'
import { circuitsData } from '../app/data/tracks.ts'
import { cars1Spec, cars2Spec, gameplayVideos } from '../app/data/gameInfo.ts'

dotenv.config()

const url = process.env.TURSO_DATABASE_URL
const authToken = process.env.TURSO_DATABASE_AUTH || process.env.TURSO_AUTH_TOKEN

const client = createClient({
  url,
  authToken
})

async function seed() {
  console.log('Seeding News...')
  for (const n of newsData) {
    await client.execute({
      sql: `INSERT OR REPLACE INTO News (id, slug, title, excerpt, content, author, date, image, isFeatured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [n.id, n.slug, n.title, n.excerpt, n.content, n.author, n.date, n.image, n.isFeatured ? 1 : 0]
    })
  }
  console.log(`Seeded ${newsData.length} news items.`)

  console.log('Seeding Characters...')
  for (const c of charactersData) {
    await client.execute({
      sql: `INSERT OR REPLACE INTO Character (id, slug, name, racingNumber, title, tagline, category, categoryLabel, modelFile, coverUrl, gameCoverUrl, defaultSkinId, scale, positionOffset, rotationOffset, topSpeed, sponsor, engineType, voiceQuote, soundEffect, bio, funFact, primaryColor, accentColor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        c.id,
        c.slug,
        c.name,
        c.racingNumber ? String(c.racingNumber) : null,
        c.title,
        c.tagline,
        c.category,
        c.categoryLabel,
        c.modelFile,
        c.coverUrl || null,
        c.gameCoverUrl || null,
        c.defaultSkinId || null,
        c.scale || 0.95,
        c.positionOffset ? JSON.stringify(c.positionOffset) : null,
        c.rotationOffset ? JSON.stringify(c.rotationOffset) : null,
        c.stats?.topSpeed || 200,
        c.sponsor,
        c.engineType,
        c.voiceQuote || null,
        c.soundEffect || null,
        c.bio,
        c.funFact,
        c.primaryColor || '#E11D2A',
        c.accentColor || '#FFC700'
      ]
    })

    if (c.skins && c.skins.length > 0) {
      for (const skin of c.skins) {
        await client.execute({
          sql: `INSERT OR REPLACE INTO CharacterSkin (id, characterId, skinId, name, modelFile, previewColor, description) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          args: [`${c.id}_${skin.id}`, c.id, skin.id, skin.name, skin.modelFile, skin.previewColor, skin.description]
        })
      }
    }
  }
  console.log(`Seeded ${charactersData.length} characters.`)

  console.log('Seeding Tracks...')
  let trackIdx = 0
  for (const t of circuitsData) {
    await client.execute({
      sql: `INSERT OR REPLACE INTO TrackCircuit (id, name, surfaceType, description, image, ambientColor, "order") VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [t.id, t.name, t.surfaceType, t.description, t.image, t.ambientColor, trackIdx++]
    })
  }
  console.log(`Seeded ${circuitsData.length} tracks.`)

  console.log('Seeding Game Specs...')
  const specs = [
    { id: 'cars-1', data: cars1Spec },
    { id: 'cars-2', data: cars2Spec }
  ]
  for (const s of specs) {
    await client.execute({
      sql: `INSERT OR REPLACE INTO GameSpec (id, title, releaseYear, developer, publisher, genre, steamAppId, steamUrl, coverUrl, summary, os, processor, memory, graphics, directx, storage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        s.id,
        s.data.title,
        s.data.releaseYear,
        s.data.developer,
        s.data.publisher,
        s.data.genre,
        s.data.steamAppId,
        s.data.steamUrl,
        s.data.coverUrl,
        s.data.summary,
        s.data.minimumSpecs.os,
        s.data.minimumSpecs.processor,
        s.data.minimumSpecs.memory,
        s.data.minimumSpecs.graphics,
        s.data.minimumSpecs.directx,
        s.data.minimumSpecs.storage
      ]
    })
  }
  console.log(`Seeded 2 game specs.`)

  console.log('Seeding Gameplay Videos...')
  let vidIdx = 0
  for (const v of gameplayVideos) {
    await client.execute({
      sql: `INSERT OR REPLACE INTO GameplayVideo (id, title, category, youtubeId, duration, game, description, "order") VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [v.id, v.title, v.category, v.youtubeId, v.duration, v.game, v.description, vidIdx++]
    })
  }
  console.log(`Seeded ${gameplayVideos.length} gameplay videos.`)

  console.log('All static data migrated to Turso database successfully!')
}

seed().catch(console.error)

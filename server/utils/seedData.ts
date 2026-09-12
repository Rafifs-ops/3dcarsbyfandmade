import bcrypt from 'bcryptjs'
import { prisma } from './prisma'
import { newsData } from '../../app/data/news'
import { charactersData } from '../../app/data/characters'
import { circuitsData } from '../../app/data/tracks'
import { cars1Spec, cars2Spec, gameplayVideos } from '../../app/data/gameInfo'

export async function seedDatabase(force: boolean = false) {
  const userCount = await prisma.user.count().catch(() => 0)

  // Seed Admin User
  if (userCount === 0 || force) {
    const hashedPassword = bcrypt.hashSync('admin123', 10)
    await prisma.user.upsert({
      where: { username: 'admin' },
      update: {
        password: hashedPassword,
        name: 'Administrator',
        role: 'ADMIN'
      },
      create: {
        username: 'admin',
        email: 'admin@carsgame.com',
        password: hashedPassword,
        name: 'Administrator',
        role: 'ADMIN'
      }
    })
  }

  // Seed News
  const newsCount = await prisma.news.count().catch(() => 0)
  if (newsCount === 0 || force) {
    for (const item of newsData) {
      await prisma.news.upsert({
        where: { slug: item.slug },
        update: {
          title: item.title,
          excerpt: item.excerpt,
          content: item.content,
          author: item.author,
          date: item.date,
          image: item.image,
          isFeatured: item.isFeatured ?? false
        },
        create: {
          id: item.id,
          slug: item.slug,
          title: item.title,
          excerpt: item.excerpt,
          content: item.content,
          author: item.author,
          date: item.date,
          image: item.image,
          isFeatured: item.isFeatured ?? false
        }
      })
    }
  }

  // Seed Characters & Skins
  const charCount = await prisma.character.count().catch(() => 0)
  if (charCount === 0 || force) {
    for (const char of charactersData) {
      const createdChar = await prisma.character.upsert({
        where: { id: char.id },
        update: {
          slug: char.slug,
          name: char.name,
          racingNumber: char.racingNumber ? String(char.racingNumber) : null,
          title: char.title,
          tagline: char.tagline,
          category: char.category,
          categoryLabel: char.categoryLabel,
          modelFile: char.modelFile,
          coverUrl: char.coverUrl ?? null,
          gameCoverUrl: char.gameCoverUrl ?? null,
          defaultSkinId: char.defaultSkinId ?? null,
          scale: char.scale ?? 0.95,
          positionOffset: char.positionOffset ? JSON.stringify(char.positionOffset) : null,
          rotationOffset: char.rotationOffset ? JSON.stringify(char.rotationOffset) : null,
          topSpeed: char.stats.topSpeed,
          sponsor: char.sponsor,
          engineType: char.engineType,
          voiceQuote: char.voiceQuote ?? null,
          soundEffect: char.soundEffect ?? null,
          bio: char.bio,
          funFact: char.funFact,
          primaryColor: char.primaryColor,
          accentColor: char.accentColor
        },
        create: {
          id: char.id,
          slug: char.slug,
          name: char.name,
          racingNumber: char.racingNumber ? String(char.racingNumber) : null,
          title: char.title,
          tagline: char.tagline,
          category: char.category,
          categoryLabel: char.categoryLabel,
          modelFile: char.modelFile,
          coverUrl: char.coverUrl ?? null,
          gameCoverUrl: char.gameCoverUrl ?? null,
          defaultSkinId: char.defaultSkinId ?? null,
          scale: char.scale ?? 0.95,
          positionOffset: char.positionOffset ? JSON.stringify(char.positionOffset) : null,
          rotationOffset: char.rotationOffset ? JSON.stringify(char.rotationOffset) : null,
          topSpeed: char.stats.topSpeed,
          sponsor: char.sponsor,
          engineType: char.engineType,
          voiceQuote: char.voiceQuote ?? null,
          soundEffect: char.soundEffect ?? null,
          bio: char.bio,
          funFact: char.funFact,
          primaryColor: char.primaryColor,
          accentColor: char.accentColor
        }
      })

      if (char.skins && char.skins.length > 0) {
        for (const skin of char.skins) {
          await prisma.characterSkin.upsert({
            where: { id: `${char.id}_${skin.id}` },
            update: {
              name: skin.name,
              modelFile: skin.modelFile,
              previewColor: skin.previewColor,
              description: skin.description
            },
            create: {
              id: `${char.id}_${skin.id}`,
              characterId: createdChar.id,
              skinId: skin.id,
              name: skin.name,
              modelFile: skin.modelFile,
              previewColor: skin.previewColor,
              description: skin.description
            }
          })
        }
      }
    }
  }

  // Seed Tracks
  const trackCount = await prisma.trackCircuit.count().catch(() => 0)
  if (trackCount === 0 || force) {
    let orderIndex = 0
    for (const track of circuitsData) {
      await prisma.trackCircuit.upsert({
        where: { id: track.id },
        update: {
          name: track.name,
          surfaceType: track.surfaceType,
          description: track.description,
          image: track.image,
          ambientColor: track.ambientColor,
          order: orderIndex
        },
        create: {
          id: track.id,
          name: track.name,
          surfaceType: track.surfaceType,
          description: track.description,
          image: track.image,
          ambientColor: track.ambientColor,
          order: orderIndex
        }
      })
      orderIndex++
    }
  }

  // Seed Game Specs
  const specCount = await prisma.gameSpec.count().catch(() => 0)
  if (specCount === 0 || force) {
    const specs = [
      { id: 'cars-1', data: cars1Spec },
      { id: 'cars-2', data: cars2Spec }
    ]
    for (const item of specs) {
      await prisma.gameSpec.upsert({
        where: { id: item.id },
        update: {
          title: item.data.title,
          releaseYear: item.data.releaseYear,
          developer: item.data.developer,
          publisher: item.data.publisher,
          genre: item.data.genre,
          steamAppId: item.data.steamAppId,
          steamUrl: item.data.steamUrl,
          coverUrl: item.data.coverUrl,
          summary: item.data.summary,
          os: item.data.minimumSpecs.os,
          processor: item.data.minimumSpecs.processor,
          memory: item.data.minimumSpecs.memory,
          graphics: item.data.minimumSpecs.graphics,
          directx: item.data.minimumSpecs.directx,
          storage: item.data.minimumSpecs.storage
        },
        create: {
          id: item.id,
          title: item.data.title,
          releaseYear: item.data.releaseYear,
          developer: item.data.developer,
          publisher: item.data.publisher,
          genre: item.data.genre,
          steamAppId: item.data.steamAppId,
          steamUrl: item.data.steamUrl,
          coverUrl: item.data.coverUrl,
          summary: item.data.summary,
          os: item.data.minimumSpecs.os,
          processor: item.data.minimumSpecs.processor,
          memory: item.data.minimumSpecs.memory,
          graphics: item.data.minimumSpecs.graphics,
          directx: item.data.minimumSpecs.directx,
          storage: item.data.minimumSpecs.storage
        }
      })
    }
  }

  // Seed Gameplay Videos
  const videoCount = await prisma.gameplayVideo.count().catch(() => 0)
  if (videoCount === 0 || force) {
    let orderIndex = 0
    for (const v of gameplayVideos) {
      await prisma.gameplayVideo.upsert({
        where: { id: v.id },
        update: {
          title: v.title,
          category: v.category,
          youtubeId: v.youtubeId,
          duration: v.duration,
          game: v.game,
          description: v.description,
          order: orderIndex
        },
        create: {
          id: v.id,
          title: v.title,
          category: v.category,
          youtubeId: v.youtubeId,
          duration: v.duration,
          game: v.game,
          description: v.description,
          order: orderIndex
        }
      })
      orderIndex++
    }
  }

  return {
    success: true,
    message: 'Data migration & seeding completed successfully!'
  }
}

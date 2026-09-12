import { prisma } from '../../utils/prisma'
import { requireAdminAuth } from '../../utils/protect'
import { formatGameSpec } from './index.get'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID Game Spec diperlukan.' })
  }

  const existing = await prisma.gameSpec.findUnique({
    where: { id }
  })

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Spesifikasi game tidak ditemukan.' })
  }

  const body = await readBody(event)
  const {
    title,
    releaseYear,
    developer,
    publisher,
    genre,
    steamAppId,
    steamUrl,
    coverUrl,
    summary,
    minimumSpecs,
    os,
    processor,
    memory,
    graphics,
    directx,
    storage
  } = body || {}

  const updated = await prisma.gameSpec.update({
    where: { id },
    data: {
      title: title !== undefined ? title : existing.title,
      releaseYear: releaseYear !== undefined ? Number(releaseYear) : existing.releaseYear,
      developer: developer !== undefined ? developer : existing.developer,
      publisher: publisher !== undefined ? publisher : existing.publisher,
      genre: genre !== undefined ? genre : existing.genre,
      steamAppId: steamAppId !== undefined ? String(steamAppId) : existing.steamAppId,
      steamUrl: steamUrl !== undefined ? steamUrl : existing.steamUrl,
      coverUrl: coverUrl !== undefined ? coverUrl : existing.coverUrl,
      summary: summary !== undefined ? summary : existing.summary,
      os: minimumSpecs?.os !== undefined ? minimumSpecs.os : (os !== undefined ? os : existing.os),
      processor: minimumSpecs?.processor !== undefined ? minimumSpecs.processor : (processor !== undefined ? processor : existing.processor),
      memory: minimumSpecs?.memory !== undefined ? minimumSpecs.memory : (memory !== undefined ? memory : existing.memory),
      graphics: minimumSpecs?.graphics !== undefined ? minimumSpecs.graphics : (graphics !== undefined ? graphics : existing.graphics),
      directx: minimumSpecs?.directx !== undefined ? minimumSpecs.directx : (directx !== undefined ? directx : existing.directx),
      storage: minimumSpecs?.storage !== undefined ? minimumSpecs.storage : (storage !== undefined ? storage : existing.storage)
    }
  })

  return {
    success: true,
    message: 'Spesifikasi game berhasil diperbarui',
    data: formatGameSpec(updated)
  }
})

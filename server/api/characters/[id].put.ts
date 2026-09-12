import { prisma } from '../../utils/prisma'
import { requireAdminAuth } from '../../utils/protect'
import { formatCharacter } from '../../utils/characterHelper'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID Karakter diperlukan.' })
  }

  const existing = await prisma.character.findFirst({
    where: {
      OR: [{ id }, { slug: id }]
    }
  })

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Karakter tidak ditemukan.' })
  }

  const body = await readBody(event)
  const {
    slug,
    name,
    racingNumber,
    title,
    tagline,
    category,
    categoryLabel,
    modelFile,
    coverUrl,
    gameCoverUrl,
    defaultSkinId,
    scale,
    positionOffset,
    rotationOffset,
    stats,
    topSpeed,
    sponsor,
    engineType,
    voiceQuote,
    soundEffect,
    bio,
    funFact,
    primaryColor,
    accentColor,
    skins
  } = body || {}

  const speedVal = stats?.topSpeed !== undefined ? Number(stats.topSpeed) : (topSpeed !== undefined ? Number(topSpeed) : existing.topSpeed)

  await prisma.character.update({
    where: { id: existing.id },
    data: {
      slug: slug !== undefined ? slug : existing.slug,
      name: name !== undefined ? name : existing.name,
      racingNumber: racingNumber !== undefined ? (racingNumber ? String(racingNumber) : null) : existing.racingNumber,
      title: title !== undefined ? title : existing.title,
      tagline: tagline !== undefined ? tagline : existing.tagline,
      category: category !== undefined ? category : existing.category,
      categoryLabel: categoryLabel !== undefined ? categoryLabel : existing.categoryLabel,
      modelFile: modelFile !== undefined ? modelFile : existing.modelFile,
      coverUrl: coverUrl !== undefined ? coverUrl : existing.coverUrl,
      gameCoverUrl: gameCoverUrl !== undefined ? gameCoverUrl : existing.gameCoverUrl,
      defaultSkinId: defaultSkinId !== undefined ? defaultSkinId : existing.defaultSkinId,
      scale: scale !== undefined ? Number(scale) : existing.scale,
      positionOffset: positionOffset !== undefined ? JSON.stringify(positionOffset) : existing.positionOffset,
      rotationOffset: rotationOffset !== undefined ? JSON.stringify(rotationOffset) : existing.rotationOffset,
      topSpeed: speedVal,
      sponsor: sponsor !== undefined ? sponsor : existing.sponsor,
      engineType: engineType !== undefined ? engineType : existing.engineType,
      voiceQuote: voiceQuote !== undefined ? voiceQuote : existing.voiceQuote,
      soundEffect: soundEffect !== undefined ? soundEffect : existing.soundEffect,
      bio: bio !== undefined ? bio : existing.bio,
      funFact: funFact !== undefined ? funFact : existing.funFact,
      primaryColor: primaryColor !== undefined ? primaryColor : existing.primaryColor,
      accentColor: accentColor !== undefined ? accentColor : existing.accentColor,
    }
  })

  // If skins are supplied, replace existing skins
  if (skins !== undefined && Array.isArray(skins)) {
    await prisma.characterSkin.deleteMany({
      where: { characterId: existing.id }
    })

    for (const skin of skins) {
      if (skin.name) {
        await prisma.characterSkin.create({
          data: {
            id: `${existing.id}_${skin.id || skin.name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`,
            characterId: existing.id,
            skinId: skin.id || skin.name.toLowerCase().replace(/\s+/g, '_'),
            name: skin.name,
            modelFile: skin.modelFile || existing.modelFile,
            previewColor: skin.previewColor || existing.primaryColor,
            description: skin.description || ''
          }
        })
      }
    }
  }

  const updated = await prisma.character.findUnique({
    where: { id: existing.id },
    include: { skins: true }
  })

  return {
    success: true,
    message: 'Karakter berhasil diperbarui',
    data: formatCharacter(updated)
  }
})

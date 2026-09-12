import { prisma } from '../../utils/prisma'
import { requireAdminAuth } from '../../utils/protect'
import { formatCharacter } from '../../utils/characterHelper'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)

  const body = await readBody(event)
  const {
    id,
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

  if (!name || !category) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Nama karakter dan kategori wajib diisi.'
    })
  }

  const generatedId = id || name.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-')
  const generatedSlug = slug || generatedId

  const speedVal = stats?.topSpeed ? Number(stats.topSpeed) : (topSpeed ? Number(topSpeed) : 200)

  const created = await prisma.character.create({
    data: {
      id: generatedId,
      slug: generatedSlug,
      name,
      racingNumber: racingNumber ? String(racingNumber) : null,
      title: title || '',
      tagline: tagline || '',
      category,
      categoryLabel: categoryLabel || category,
      modelFile: modelFile || '/models/mcqueen.glb',
      coverUrl: coverUrl || null,
      gameCoverUrl: gameCoverUrl || null,
      defaultSkinId: defaultSkinId || null,
      scale: scale ? Number(scale) : 0.95,
      positionOffset: positionOffset ? JSON.stringify(positionOffset) : null,
      rotationOffset: rotationOffset ? JSON.stringify(rotationOffset) : null,
      topSpeed: speedVal,
      sponsor: sponsor || '',
      engineType: engineType || '',
      voiceQuote: voiceQuote || null,
      soundEffect: soundEffect || null,
      bio: bio || '',
      funFact: funFact || '',
      primaryColor: primaryColor || '#E11D2A',
      accentColor: accentColor || '#FFC700',
    }
  })

  // If skins are provided
  if (skins && Array.isArray(skins) && skins.length > 0) {
    for (const skin of skins) {
      if (skin.name) {
        await prisma.characterSkin.create({
          data: {
            id: `${created.id}_${skin.id || skin.name.toLowerCase().replace(/\s+/g, '_')}`,
            characterId: created.id,
            skinId: skin.id || skin.name.toLowerCase().replace(/\s+/g, '_'),
            name: skin.name,
            modelFile: skin.modelFile || created.modelFile,
            previewColor: skin.previewColor || created.primaryColor,
            description: skin.description || ''
          }
        })
      }
    }
  }

  const fetched = await prisma.character.findUnique({
    where: { id: created.id },
    include: { skins: true }
  })

  return {
    success: true,
    message: 'Karakter berhasil ditambahkan',
    data: formatCharacter(fetched)
  }
})

export function formatCharacter(char: any) {
  if (!char) return null

  let positionOffset = [0, 0, 0]
  if (char.positionOffset) {
    try {
      positionOffset = typeof char.positionOffset === 'string' ? JSON.parse(char.positionOffset) : char.positionOffset
    } catch {}
  }

  let rotationOffset = undefined
  if (char.rotationOffset) {
    try {
      rotationOffset = typeof char.rotationOffset === 'string' ? JSON.parse(char.rotationOffset) : char.rotationOffset
    } catch {}
  }

  const skins = (char.skins || []).map((s: any) => ({
    id: s.skinId || s.id,
    name: s.name,
    modelFile: s.modelFile,
    previewColor: s.previewColor,
    description: s.description
  }))

  return {
    id: char.id,
    slug: char.slug,
    name: char.name,
    racingNumber: char.racingNumber,
    title: char.title,
    tagline: char.tagline,
    category: char.category,
    categoryLabel: char.categoryLabel,
    modelFile: char.modelFile,
    coverUrl: char.coverUrl,
    gameCoverUrl: char.gameCoverUrl,
    defaultSkinId: char.defaultSkinId,
    skins: skins.length > 0 ? skins : undefined,
    scale: char.scale ?? 0.95,
    positionOffset,
    rotationOffset,
    stats: {
      topSpeed: char.topSpeed ?? 200
    },
    sponsor: char.sponsor,
    engineType: char.engineType,
    voiceQuote: char.voiceQuote,
    soundEffect: char.soundEffect,
    bio: char.bio,
    funFact: char.funFact,
    primaryColor: char.primaryColor,
    accentColor: char.accentColor
  }
}

import { prisma } from '../../utils/prisma'
import { charactersData } from '../../../app/data/characters'
import { formatCharacter } from '../../utils/characterHelper'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Character ID / slug is required' })
  }

  try {
    const item = await prisma.character.findFirst({
      where: {
        OR: [{ id: id }, { slug: id }]
      },
      include: { skins: true }
    })

    if (item) return formatCharacter(item)

    const localItem = charactersData.find(c => c.id === id || c.slug === id)
    if (localItem) return localItem

    throw createError({ statusCode: 404, statusMessage: 'Character not found' })
  } catch (error: any) {
    if (error.statusCode) throw error
    const localItem = charactersData.find(c => c.id === id || c.slug === id)
    if (localItem) return localItem
    throw createError({ statusCode: 404, statusMessage: 'Character not found' })
  }
})

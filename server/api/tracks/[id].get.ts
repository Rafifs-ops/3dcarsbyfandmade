import { prisma } from '../../utils/prisma'
import { circuitsData } from '../../../app/data/tracks'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID Sirkuit diperlukan' })
  }

  try {
    const item = await prisma.trackCircuit.findUnique({
      where: { id }
    })

    if (item) return item

    const localItem = circuitsData.find(t => t.id === id)
    if (localItem) return localItem

    throw createError({ statusCode: 404, statusMessage: 'Sirkuit tidak ditemukan' })
  } catch (error: any) {
    if (error.statusCode) throw error
    const localItem = circuitsData.find(t => t.id === id)
    if (localItem) return localItem
    throw createError({ statusCode: 404, statusMessage: 'Sirkuit tidak ditemukan' })
  }
})

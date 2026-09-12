import { prisma } from '../../utils/prisma'
import { cars1Spec, cars2Spec } from '../../../app/data/gameInfo'
import { formatGameSpec } from './index.get'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID Game Spec diperlukan' })
  }

  try {
    const item = await prisma.gameSpec.findUnique({
      where: { id }
    })

    if (item) return formatGameSpec(item)

    if (id === 'cars-1') return { id: 'cars-1', ...cars1Spec }
    if (id === 'cars-2') return { id: 'cars-2', ...cars2Spec }

    throw createError({ statusCode: 404, statusMessage: 'Spesifikasi game tidak ditemukan' })
  } catch (error: any) {
    if (error.statusCode) throw error
    if (id === 'cars-1') return { id: 'cars-1', ...cars1Spec }
    if (id === 'cars-2') return { id: 'cars-2', ...cars2Spec }
    throw createError({ statusCode: 404, statusMessage: 'Spesifikasi game tidak ditemukan' })
  }
})

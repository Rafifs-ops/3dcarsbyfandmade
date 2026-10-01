import { prisma } from '../../utils/prisma'
import { requireAdminAuth } from '../../utils/protect'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Track ID is required.' })
  }

  const existing = await prisma.trackCircuit.findUnique({
    where: { id }
  })

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Track not found.' })
  }

  await prisma.trackCircuit.delete({
    where: { id }
  })

  return {
    success: true,
    message: 'Track deleted successfully'
  }
})

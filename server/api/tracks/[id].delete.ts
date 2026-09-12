import { prisma } from '../../utils/prisma'
import { requireAdminAuth } from '../../utils/protect'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID Sirkuit diperlukan.' })
  }

  const existing = await prisma.trackCircuit.findUnique({
    where: { id }
  })

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Sirkuit tidak ditemukan.' })
  }

  await prisma.trackCircuit.delete({
    where: { id }
  })

  return {
    success: true,
    message: 'Sirkuit berhasil dihapus'
  }
})

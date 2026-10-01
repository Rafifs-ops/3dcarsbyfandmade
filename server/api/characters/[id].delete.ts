import { prisma } from '../../utils/prisma'
import { requireAdminAuth } from '../../utils/protect'
import { unlinkSync, existsSync } from 'fs'
import { resolve } from 'path'

function tryDeleteFile(publicPath: string) {
  if (!publicPath || !publicPath.startsWith('/')) return
  try {
    const filePath = resolve('public', publicPath)
    if (existsSync(filePath)) {
      unlinkSync(filePath)
    }
  } catch {
    // Best-effort cleanup
  }
}

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Character ID is required.' })
  }

  const existing = await prisma.character.findFirst({
    where: {
      OR: [{ id }, { slug: id }]
    },
    include: { skins: true }
  })

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Character not found.' })
  }

  // Delete associated files from public/
  tryDeleteFile(existing.modelFile)
  tryDeleteFile(existing.coverUrl)
  for (const skin of existing.skins) {
    tryDeleteFile(skin.modelFile)
  }

  await prisma.character.delete({
    where: { id: existing.id }
  })

  return {
    success: true,
    message: 'Character deleted successfully'
  }
})

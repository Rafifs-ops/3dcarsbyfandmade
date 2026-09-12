import { readMultipartFormData } from 'h3'
import { writeFileSync, unlinkSync, existsSync } from 'fs'
import { resolve } from 'path'
import { requireAdminAuth } from '../utils/protect'

const ALLOWED_EXTENSIONS: Record<string, string[]> = {
  'models': ['.glb', '.gltf'],
  'images/cars': ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'],
  'images/games-cover': ['.png', '.jpg', '.jpeg', '.webp'],
  'audio': ['.mp3', '.wav', '.ogg', '.m4a'],
}

function sanitizeFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)

  const formData = await readMultipartFormData(event)
  if (!formData || formData.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Tidak ada file yang dikirim.' })
  }

  let fileField: typeof formData[0] | undefined
  let folder = 'models'
  let oldPath = ''

  for (const field of formData) {
    if (field.name === 'file') {
      fileField = field
    } else if (field.name === 'folder' && field.data) {
      folder = field.data.toString().trim()
    } else if (field.name === 'oldPath' && field.data) {
      oldPath = field.data.toString().trim()
    }
  }

  if (!fileField || !fileField.filename || !fileField.data) {
    throw createError({ statusCode: 400, statusMessage: 'File wajib dipilih.' })
  }

  const allowedExts = ALLOWED_EXTENSIONS[folder]
  if (!allowedExts) {
    throw createError({ statusCode: 400, statusMessage: `Folder "${folder}" tidak valid.` })
  }

  const ext = '.' + fileField.filename.split('.').pop()?.toLowerCase()
  if (!allowedExts.includes(ext)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Format file "${ext}" tidak diizinkan untuk folder "${folder}". Diizinkan: ${allowedExts.join(', ')}`
    })
  }

  const baseName = fileField.filename.replace(/\.[^.]+$/, '')
  const safeName = sanitizeFilename(baseName)
  const timestamp = Date.now()
  const filename = `${timestamp}-${safeName}${ext}`

  const publicDir = resolve('public', folder)
  if (!existsSync(publicDir)) {
    throw createError({ statusCode: 500, statusMessage: `Folder "${folder}" tidak ditemukan.` })
  }

  const filePath = resolve(publicDir, filename)
  writeFileSync(filePath, fileField.data)

  const newPath = `/${folder}/${filename}`

  // Delete old file if provided and different from new path
  if (oldPath && oldPath !== newPath && oldPath.startsWith('/')) {
    const oldFilePath = resolve('public', oldPath)
    try {
      if (existsSync(oldFilePath)) {
        unlinkSync(oldFilePath)
      }
    } catch {
      // Old file deletion is best-effort, don't fail the upload
    }
  }

  return {
    success: true,
    path: newPath,
  }
})

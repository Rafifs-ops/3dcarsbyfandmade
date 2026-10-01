export function getYoutubeId(input: string | null | undefined): string {
  if (!input) return ''

  const value = input.trim()
  if (!value) return ''

  const patterns = [
    /(?:youtube\.com\/watch\?(?:.*&)?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube(?:-nocookie)?\.com\/embed\/)([\w-]{11})/,
    /(?:youtube\.com\/shorts\/)([\w-]{11})/,
    /(?:youtube\.com\/live\/)([\w-]{11})/
  ]

  for (const pattern of patterns) {
    const match = value.match(pattern)
    if (match) return match[1]
  }

  const bare = value.split(/[?&]/)[0] ?? ''
  const idMatch = bare.match(/([\w-]{11})/)
  return idMatch ? idMatch[1] : bare
}

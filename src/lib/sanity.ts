import { createClient } from '@sanity/client'

export const projectId = 'vt6o5liv'
export const dataset = 'production'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-04-01',
  useCdn: true,
})

// Build a Sanity CDN image URL from an asset._ref string like "image-<id>-<width>x<height>-<ext>"
export function imageUrlFor(ref?: string | null) {
  if (!ref) return null
  if (ref.startsWith('http')) return ref
  const withoutPrefix = ref.replace(/^image-/, '')
  const lastDash = withoutPrefix.lastIndexOf('-')
  if (lastDash === -1) return null
  const filename = `${withoutPrefix.substring(0, lastDash)}.${withoutPrefix.substring(lastDash + 1)}`
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${filename}`
}

export default client

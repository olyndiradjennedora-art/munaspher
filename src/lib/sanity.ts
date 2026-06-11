import { createClient } from '@sanity/client'

export const projectId = 'vt6o5liv'
export const dataset = 'production'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-04-01',
  useCdn: true,
})

// Build a Sanity CDN image or file URL from an asset reference or full image object.
// Accepts:
// - a full image object: { asset: { _ref: 'image-...' } }
// - an asset._ref string: 'image-...-jpg' or 'file-...-pdf'
// - an absolute URL (starts with http)
export function imageUrlFor(refOrImage?: string | { asset?: { _ref?: string } } | null) {
  if (!refOrImage) return null

  // Extract a ref string or pass through an absolute URL
  let ref: string | undefined
  if (typeof refOrImage === 'string') ref = refOrImage
  else if (typeof refOrImage === 'object') ref = (refOrImage as any).asset?._ref || (refOrImage as any).url

  if (!ref) return null
  if (ref.startsWith('http')) return ref

  // Handle image assets
  if (ref.startsWith('image-')) {
    const withoutPrefix = ref.replace(/^image-/, '')
    const lastDash = withoutPrefix.lastIndexOf('-')
    if (lastDash === -1) return null
    const filename = `${withoutPrefix.substring(0, lastDash)}.${withoutPrefix.substring(lastDash + 1)}`
    return `https://cdn.sanity.io/images/${projectId}/${dataset}/${filename}`
  }

  // Handle file assets
  if (ref.startsWith('file-')) {
    const withoutPrefix = ref.replace(/^file-/, '')
    const lastDash = withoutPrefix.lastIndexOf('-')
    if (lastDash === -1) return null
    const filename = `${withoutPrefix.substring(0, lastDash)}.${withoutPrefix.substring(lastDash + 1)}`
    return `https://cdn.sanity.io/files/${projectId}/${dataset}/${filename}`
  }

  // Unknown format: attempt a best-effort fallback to the images CDN
  try {
    const withoutPrefix = ref.replace(/^image-/, '')
    const lastDash = withoutPrefix.lastIndexOf('-')
    if (lastDash === -1) return null
    const filename = `${withoutPrefix.substring(0, lastDash)}.${withoutPrefix.substring(lastDash + 1)}`
    return `https://cdn.sanity.io/images/${projectId}/${dataset}/${filename}`
  } catch (e) {
    return null
  }
}

export default client

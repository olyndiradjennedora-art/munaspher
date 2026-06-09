import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'vt6o5liv',
  dataset: 'production',
  apiVersion: '2024-04-01',
  useCdn: true,
})

export default client

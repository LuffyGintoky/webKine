import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
// Removed invalid type import
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'gfolfm5q'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-11'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // `false` si quieres asegurar que siempre retorne datos frescos
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

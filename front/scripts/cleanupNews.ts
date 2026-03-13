import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config()

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-03-11',
})

async function cleanup() {
  const news = await client.fetch('*[_type == "noticia"]{_id, titulo, contenido}')
  console.log(`📋 Found ${news.length} news items.`)

  // Deleting "Jornadas de evaluación y prevención" because it's a partial version of the other one
  const toDelete = news.find(n => n.titulo === "Jornadas de evaluación y prevención")
  if (toDelete) {
    console.log(`🗑 Deleting partial duplicate: ${toDelete.titulo} (${toDelete._id})`)
    await client.delete(toDelete._id)
    console.log('✅ Deleted.')
  }
}

cleanup().catch(console.error)

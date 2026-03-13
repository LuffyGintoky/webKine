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

async function checkAssets() {
  const news = await client.fetch('*[_type == "noticia"]{titulo, "imageUrl": imagenPortada.asset->url}')
  console.log(JSON.stringify(news, null, 2))
}

checkAssets().catch(console.error)

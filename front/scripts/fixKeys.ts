import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config()

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !token) {
  console.error('❌ Missing Sanity env vars')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  token,
  apiVersion: '2024-03-11',
})

function addKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((item) => {
      if (item && typeof item === 'object') {
        const newItem = { ...item }
        if (!newItem._key) {
          newItem._key = Math.random().toString(36).substring(2, 11)
        }
        return addKeys(newItem)
      }
      return item
    })
  } else if (obj && typeof obj === 'object') {
    const newObj: any = {}
    for (const key in obj) {
      newObj[key] = addKeys(obj[key])
    }
    return newObj
  }
  return obj
}

async function fixExistingNews() {
  console.log('⏳ Fetching news...')
  const news = await client.fetch('*[_type == "noticia"]')
  console.log(`📋 Found ${news.length} news items.`)

  for (const doc of news) {
    const fixedContenido = addKeys(doc.contenido)
    if (JSON.stringify(fixedContenido) !== JSON.stringify(doc.contenido)) {
      console.log(`🔧 Fixing keys for: ${doc.titulo}`)
      await client.patch(doc._id).set({ contenido: fixedContenido }).commit()
      console.log(`✅ Fixed!`)
    } else {
      console.log(`✔ No keys missing for: ${doc.titulo}`)
    }
  }
}

fixExistingNews().catch(console.error)

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

/**
 * Script utilitario para inyectar contenido estructurado a Sanity CMS,
 * usado por el Agente.
 */

// Se asume que el backend tiene .env con estas variables
const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !token) {
  console.error('❌ Faltan las variables de entorno de Sanity (PROJECT_ID o API_WRITE_TOKEN)')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  token,
  apiVersion: '2024-03-11',
})

async function seedContent(filePath: string) {
  const resolvedPath = path.resolve(filePath)
  if (!fs.existsSync(resolvedPath)) {
    console.error(`❌ Archivo JSON no encontrado: ${resolvedPath}`)
    return
  }

  console.log(`⏳ Leyendo e inyectando datos desde ${path.basename(resolvedPath)}...`)
  
  try {
    const fileData = fs.readFileSync(resolvedPath, 'utf8')
    const documents = JSON.parse(fileData)

    if (!Array.isArray(documents)) {
      console.error('❌ El archivo JSON debe contener un arreglo de documentos u objetos de mutación de Sanity.')
      return
    }

    console.log(`📋 Se procesarán ${documents.length} documentos...`)

    let successCount = 0
    let errorCount = 0

    // Si los documentos tienen _id, podemos usar createOrReplace, si no, create
    for (const doc of documents) {
      try {
        if (doc._id) {
          await client.createOrReplace(doc)
          console.log(`✅ ¡Éxito! -> Documento actualizado/creado: ${doc._id} (${doc._type})`)
        } else {
          const createdDoc = await client.create(doc)
          console.log(`✅ ¡Éxito! -> Documento creado con nuevo ID: ${createdDoc._id} (${doc._type})`)
        }
        successCount++
      } catch (err: any) {
        console.error(`❌ Error al procesar documento de tipo ${doc._type}:`, err.message)
        errorCount++
      }
    }

    console.log(`\n🚀 Finalizado el proceso: ${successCount} exitosos, ${errorCount} errores.`)
  } catch (error) {
    console.error(`❌ Error general procesando el archivo JSON:`, error)
  }
}

async function main() {
  const args = process.argv.slice(2)
  if (args.length !== 1) {
    console.log('Uso: npx tsx front/scripts/seedContent.ts <ruta-al-archivo-data.json>')
    process.exit(1)
  }

  await seedContent(args[0])
}

main()

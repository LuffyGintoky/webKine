import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

/**
 * Script utilitario para subir de forma programática y masiva
 * archivos e imágenes a Sanity CMS, usado por el Agente.
 */

// Se asume que el backend tiene .env con estas variables
const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN // El token debe tener permisos de Editor

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

async function uploadFile(filePath: string) {
  const resolvedPath = path.resolve(filePath)
  if (!fs.existsSync(resolvedPath)) {
    console.error(`❌ Archivo no encontrado: ${resolvedPath}`)
    return null
  }

  const basename = path.basename(resolvedPath)
  console.log(`⏳ Subiendo ${basename}...`)
  
  try {
    const stream = fs.createReadStream(resolvedPath)
    
    // Si quisieras discriminar por tipo, podrías ver la extensión. 
    // AssetType generalmente es 'image' o 'file'.
    const assetType = resolvedPath.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i) ? 'image' : 'file'
    
    const asset = await client.assets.upload(assetType, stream, {
      filename: basename,
    })
    
    console.log(`✅ ¡Éxito! -> Archivo: ${basename}`)
    console.log(`   ID: ${asset._id}`)
    console.log(`   URL: ${asset.url}`)
    return asset
  } catch (error) {
    console.error(`❌ Error al subir ${basename}:`, error)
    return null
  }
}

async function main() {
  const args = process.argv.slice(2)
  if (args.length === 0) {
    console.log('Uso: npx tsx .agent/skills/content-ingestion/scripts/uploadAssets.ts <ruta1> <ruta2> ...')
    process.exit(1)
  }

  console.log(`📋 Se procesarán ${args.length} archivos...`)
  
  for (const filePath of args) {
    await uploadFile(filePath)
  }
  
  console.log('🚀 Finalizado el proceso de subida masiva.')
}

main()

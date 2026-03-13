import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config()

const projectId = 'dk1l2umnbl59edqr032iac1v'
const token = process.env.SANITY_API_WRITE_TOKEN

const client = createClient({
  projectId,
  dataset: 'production',
  useCdn: false,
  token,
  apiVersion: '2024-03-11',
})

async function check() {
  try {
    const data = await client.fetch('*[_type == "noticia"][0]')
    console.log('✅ Read successful:', data ? data.titulo : 'No data but read OK')
    
    // Try a small write
    // await client.create({ _type: 'test', title: 'test' })
    // console.log('✅ Write successful')
  } catch (err: any) {
    console.error('❌ Error:', err.message)
  }
}

check()

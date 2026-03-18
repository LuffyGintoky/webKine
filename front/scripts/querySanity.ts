import { createClient } from "next-sanity";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

// Configure Sanity Client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET,
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function main() {
  const instalaciones = await client.fetch(`*[_type == "instalacion"]{_id, titulo}`);
  console.log("Instalaciones:", instalaciones);
  
  const clientes = await client.fetch(`*[_type == "cliente"]{_id, nombre, titulo}`);
  console.log("Clientes:", clientes);

  const noticias = await client.fetch(`*[_type == "noticia"]{_id, titulo}`);
  console.log("Noticias:", noticias);
}

main().catch(console.error);

import { createClient } from "next-sanity";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET,
  useCdn: false,
  apiVersion: "2024-03-11",
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function main() {
  console.log("Fetching all team members...");
  const team = await client.fetch(`*[_type == "equipo"]{_id, nombre}`);
  console.log("Team members found:", team.map((t: any) => t.nombre).join(", "));
  
  const camila = team.find((t: any) => t.nombre.toLowerCase().includes("camila"));
  if (camila) {
      console.log(`Found: ${camila.nombre} (ID: ${camila._id})`);
      const newBio = "Kinesióloga. Con más de 10 años de experiencia en UCI neonatal, estimulación temprana, evaluación y seguimiento del desarrollo psicomotor y evaluación de asimetrías craneales.";
      await client.patch(camila._id).set({
          descripcion: newBio,
          biografia: newBio
      }).commit();
      console.log(`✅ Success: Updated ${camila.nombre}`);
  } else {
      console.log("❌ ERROR: Camila not found anywhere in the equipo collection.");
  }
}

main().catch(console.error);

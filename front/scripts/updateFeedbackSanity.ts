import { createClient } from "next-sanity";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: ".env" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET,
  useCdn: false,
  apiVersion: "2024-03-11",
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function main() {
  // 1. Upload foto equipamiento 4 (1).jpeg
  const equipFilePath = path.resolve('../base_content/raw/FOTOS/fotos_feedback/foto equipamiento 4 (1).jpeg');
  const equipStream = fs.createReadStream(equipFilePath);
  const equipAsset = await client.assets.upload('image', equipStream, { filename: 'foto equipamiento 4 (1).jpeg' });
  console.log(`Uploaded Equipamiento image: ${equipAsset._id}`);

  // Fetch target facility (Box de terapia)
  const facility = await client.fetch(`*[_type == "instalacion" && titulo match "Box*"][0]`);
  if (facility) {
    await client.patch(facility._id).set({
      foto: {
        _type: 'image',
        asset: { _type: 'reference', _ref: equipAsset._id }
      }
    }).commit();
    console.log(`Updated facility: ${facility.titulo}`);
  }

  // 2. Upload deportista alto rendimiento.jpeg
  const depFilePath = path.resolve('../base_content/raw/FOTOS/fotos_feedback/deportista alto rendimiento.jpeg');
  const depStream = fs.createReadStream(depFilePath);
  const depAsset = await client.assets.upload('image', depStream, { filename: 'deportista alto rendimiento.jpeg' });
  console.log(`Uploaded Deportista image: ${depAsset._id}`);

  // Fetch target client (Deportista Local)
  const targetClient = await client.fetch(`*[_type == "cliente" && nombre match "Deportista*"][0]`);
  if (targetClient) {
    await client.patch(targetClient._id).set({
      nombre: 'Deportista Alto Rendimiento',
      foto: {
        _type: 'image',
        asset: { _type: 'reference', _ref: depAsset._id }
      }
    }).commit();
    console.log(`Updated client: from ${targetClient.nombre} to Deportista Alto Rendimiento`);
  } else {
    // Maybe query using id
    const c2 = await client.fetch(`*[_id == 'client-2'][0]`);
    if (c2) {
       await client.patch(c2._id).set({
          nombre: 'Deportista Alto Rendimiento',
          foto: {
            _type: 'image',
            asset: { _type: 'reference', _ref: depAsset._id }
          }
        }).commit();
        console.log(`Updated client-2: to Deportista Alto Rendimiento`);
    } else {
       console.log("Client not found!");
    }
  }

}

main().catch(console.error);

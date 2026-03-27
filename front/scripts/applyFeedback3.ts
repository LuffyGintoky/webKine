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
  console.log("Starting Sanity updates for feedback 3...");

  // 1. Update Camila Córdova Zurita in Equipo
  const camila = await client.fetch(`*[_type == "equipo" && nombre match "Camila*Córdova*"][0]`);
  if (camila) {
    const newBio = "Kinesióloga. Con más de 10 años de experiencia en UCI neonatal, estimulación temprana, evaluación y seguimiento del desarrollo psicomotor y evaluación de asimetrías craneales.";
    await client.patch(camila._id).set({
      descripcion: newBio,
    }).commit();
    console.log(`Updated Camila Córdova Zurita in equipo.`);
  } else {
    const camilaFallback = await client.fetch(`*[_type == "equipo" && nombre match "Camila*"][0]`);
    if(camilaFallback) {
        const newBio = "Kinesióloga. Con más de 10 años de experiencia en UCI neonatal, estimulación temprana, evaluación y seguimiento del desarrollo psicomotor y evaluación de asimetrías craneales.";
        await client.patch(camilaFallback._id).set({
          descripcion: newBio,
        }).commit();
        console.log(`Updated ${camilaFallback.nombre} in equipo as fallback.`);
    } else {
        console.log("Camila not found in equipo!");
    }
  }

  // 2. Add "Medicina" Service
  const medFilePath = path.resolve('../base_content/raw/feedback3/foto medicina.jpg');
  if (fs.existsSync(medFilePath)) {
      const medStream = fs.createReadStream(medFilePath);
      const medAsset = await client.assets.upload('image', medStream, { filename: 'foto medicina.jpg' });
      console.log(`Uploaded foto medicina.jpg: ${medAsset._id}`);

      const newService = {
          _type: 'servicio',
          titulo: 'Medicina',
          descripcion: 'Atención médica especializada.',
          icono: {
            _type: 'image',
            asset: { _type: 'reference', _ref: medAsset._id }
          },
          items: [
            "Medicina General",
            "Médico deportólogo",
            "Evaluación de alteración metabólica",
            "Evaluación musculoesquelética"
          ]
      };
      await client.create(newService);
      console.log(`Created Medicina service.`);
  } else {
      console.log(`foto medicina.jpg not found at: ${medFilePath}`);
  }

  // 3. Update "Estética" Service image
  const estFilePath = path.resolve('../base_content/raw/feedback3/imagen 3.jpeg');
  if (fs.existsSync(estFilePath)) {
      const estStream = fs.createReadStream(estFilePath);
      const estAsset = await client.assets.upload('image', estStream, { filename: 'imagen 3.jpeg' });
      console.log(`Uploaded imagen 3.jpeg: ${estAsset._id}`);

      const esteticaService = await client.fetch(`*[_type == "servicio" && (titulo match "Estética" || titulo match "Estetica")][0]`);
      if (esteticaService) {
        await client.patch(esteticaService._id).set({
            icono: {
              _type: 'image',
              asset: { _type: 'reference', _ref: estAsset._id }
            }
        }).commit();
        console.log(`Updated Estética service with new image.`);
      } else {
        console.log("Estética service not found!");
      }
  } else {
      console.log(`imagen 3.jpeg not found at: ${estFilePath}`);
  }

  // 4. Add new Facilities (Imagen 1 y Imagen 2)
  const img1Path = path.resolve('../base_content/raw/feedback3/Imagen 1.jpeg');
  if (fs.existsSync(img1Path)) {
      const img1Stream = fs.createReadStream(img1Path);
      const img1Asset = await client.assets.upload('image', img1Stream, { filename: 'Imagen 1.jpeg' });
      
      const newInstalacion1 = {
          _type: 'instalacion',
          titulo: 'Equipamiento Moderno',
          foto: {
            _type: 'image',
            asset: { _type: 'reference', _ref: img1Asset._id }
          }
      };
      await client.create(newInstalacion1);
      console.log(`Created new instalacion for Imagen 1.`);
  } else {
      console.log(`Imagen 1.jpeg not found at: ${img1Path}`);
  }

  const img2Path = path.resolve('../base_content/raw/feedback3/imagen 2.jpeg');
  if (fs.existsSync(img2Path)) {
      const img2Stream = fs.createReadStream(img2Path);
      const img2Asset = await client.assets.upload('image', img2Stream, { filename: 'imagen 2.jpeg' });
      
      const newInstalacion2 = {
          _type: 'instalacion',
          titulo: 'Área de Terapia',
          foto: {
            _type: 'image',
            asset: { _type: 'reference', _ref: img2Asset._id }
          }
      };
      await client.create(newInstalacion2);
      console.log(`Created new instalacion for imagen 2.`);
  } else {
      console.log(`imagen 2.jpeg not found at: ${img2Path}`);
  }

  console.log("Finished all Sanity updates.");
}

main().catch(console.error);

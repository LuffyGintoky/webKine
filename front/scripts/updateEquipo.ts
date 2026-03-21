import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error('❌ Faltan las variables de entorno de Sanity');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  token,
  apiVersion: '2024-03-11',
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseContentPath = path.resolve(__dirname, '../../base_content/raw/feedback2');

const teamData = [
  {
    nombre: "Aldo Javier Paz Espinoza",
    cargo: "Kinesiólogo",
    biografia: "Universidad de Antofagasta. Especialista en el área músculo-esquelética. Experiencia de 15 años de experiencia en ámbito clínico, deportivo de alto rendimiento y docencia en áreas de traumatología y deportología.",
    fotoKey: "existing"
  },
  {
    nombre: "Miguel Ángel Paz Espinoza",
    cargo: "Licenciado en Ciencias de la Actividad Física y el Deporte",
    biografia: "Licenciado en Ciencias de la Actividad Física y el Deporte por la Universidad Santo Tomás y Técnico en Preparación Física de Nivel Superior. Experiencia en formación académica y desarrollo deportivo. Posee licencias A y B de INAF.",
    fotoKey: "existing"
  },
  {
    nombre: "Patricio Pinto Correa",
    cargo: "Médico Cirujano",
    biografia: "Médico cirujano de la Universidad de Antofagasta. Deportólogo y especialista en medicina deportiva y actividad física de la Universidad Mayor. Certificado internacional en kineantropometría ISAK y «Exercise is Medicine». Diplomado Fútbol FIFA 2019.",
    fotoKey: "equipo3.png"
  },
  {
    nombre: "Camila Córdova Zurita",
    cargo: "Kinesióloga",
    biografia: "Kinesióloga. Con más de 10 años de experiencia en UCI neonatal, estimulación temprana, evaluación y seguimiento del desarrollo psicomotor y evaluación de asimetrías",
    fotoKey: "equipo4.png"
  },
  {
    nombre: "Vicente Javier Montenegro Gallego",
    cargo: "Psicólogo Clínico",
    biografia: "Psicólogo Clínico. Especialista orientado al trabajo terapéutico desde un enfoque psicodinámico, centrado en la comprensión profunda de los procesos emocionales, historia personal y dinámicas relacionales que influyen en el bienestar psicológico y el desarrollo subjetivo.",
    fotoKey: "equipo5.png"
  },
  {
    nombre: "Lorena Natalia Figueroa Urízar",
    cargo: "Psicóloga Deportiva",
    biografia: "Psicóloga. Especialidad en psicología deportiva, disciplina enfocada en el bienestar mental y emocional de los atletas, así como en la optimización de su rendimiento deportivo.",
    fotoKey: "equipo6.png"
  },
  {
    nombre: "Ana María Palma Garimanni",
    cargo: "Técnico en Enfermería Nivel Superior (TENS)",
    biografia: "Técnico en Enfermería Nivel Superior. (TENS). Especialista en el área estética y formación complementaria en manejo de urgencias toxicológicas. Experiencia clínica en unidades de alta complejidad, como UCI y área cardiovascular.",
    fotoKey: "equipo7.png"
  }
];

async function uploadFile(fileName: string) {
  const resolvedPath = path.join(baseContentPath, fileName);
  if (!fs.existsSync(resolvedPath)) {
    console.error(`❌ Archivo no encontrado: ${resolvedPath}`);
    return null;
  }

  console.log(`⏳ Subiendo ${fileName}...`);
  try {
    const stream = fs.createReadStream(resolvedPath);
    const asset = await client.assets.upload('image', stream, {
      filename: fileName,
    });
    console.log(`✅ ¡Éxito! -> Archivo: ${fileName} - ID: ${asset._id}`);
    return asset;
  } catch (error) {
    console.error(`❌ Error al subir ${fileName}:`, error);
    return null;
  }
}

async function main() {
  console.log('🔄 Fetching existing equipo documents...');
  const existingEquipo = await client.fetch(`*[_type == "equipo"]`);
  
  for (const member of teamData) {
    let fotoAssetId = undefined;

    // Subir imagen si es nueva
    if (member.fotoKey !== 'existing') {
        const asset = await uploadFile(member.fotoKey);
        if (asset) {
            fotoAssetId = asset._id;
        }
    }

    // Buscar si ya existe por nombre o nombre similar (A veces el CMS nombra diferente)
    // Para mitigar diferencias de nombre exactas, buscamos match parcial
    const matchName = member.nombre.split(' ')[0]; // Aldo, Miguel...
    const existing = existingEquipo.find((e: any) => e.nombre.includes(matchName));

    if (existing) {
        console.log(`📝 Actualizando: ${member.nombre} (${existing._id})`);
        const mutations: any = {
            cargo: member.cargo,
            biografia: member.biografia,
        };
        
        if (fotoAssetId) {
            mutations.foto = {
                _type: 'image',
                asset: { _type: 'reference', _ref: fotoAssetId }
            };
        }

        await client.patch(existing._id).set(mutations).commit();
        console.log(`✅ Actualizado!`);
    } else {
        console.log(`✨ Creando nuevo: ${member.nombre}`);
        const doc: any = {
            _type: 'equipo',
            nombre: member.nombre,
            cargo: member.cargo,
            biografia: member.biografia,
        };
        
        if (fotoAssetId) {
            doc.foto = {
                _type: 'image',
                asset: { _type: 'reference', _ref: fotoAssetId }
            };
        }
        await client.create(doc);
        console.log(`✅ Creado!`);
    }
  }

  console.log('🚀 Script completado.');
}

main().catch(console.error);

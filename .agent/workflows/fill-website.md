---
description: Procesa y distribuye el contenido raw (textos e imágenes) en la web y el CMS
---

Este workflow define los pasos que el agente debe seguir cuando el usuario solicita "rellenar la web", "armar la web con el contenido" o "cargar el base content".

### Precondiciones
- Debe existir un archivo con los textos en `base_content/raw/textos.md` (o similar).
- Debe existir una carpeta con imágenes en `base_content/raw/FOTOS`.
- **Importante:** El proyecto backend debe tener configurado el `.env` con un `SANITY_API_WRITE_TOKEN` (con permisos de escritura/editor) para que el agente pueda subir imágenes o documentos al CMS.

### Paso 1: Análisis Semántico y Mapeo
1. Lee detenidamente `base_content/raw/textos.md` e identifica las grandes secciones (Inicio, Nosotros, Servicios, Instalaciones, Noticias, etc.).
2. Explora recursivamente la carpeta `base_content/raw/FOTOS` usando `list_dir` o `find`.
3. Haz un mapeo mental (o en tu scratchpad) de qué imágenes y textos corresponden a componentes fijos (Next.js) y cuáles a esquemas dinámicos del CMS (Sanity).

### Paso 2: Distribución de Imágenes Estáticas y Extracción de Branding
1. Identifica qué imágenes son netamente estáticas o de estructura visual (logos corporativos, banners principales fijos, texturas, íconos de UI).
2. **Análisis de Identidad Visual (CRÍTICO):** Selecciona el archivo que represente el Logo principal de la marca. Extrae e identifica visualmente sus colores predominantes (primario, secundario, acento).
3. Configura estos colores extraídos inmediatamente en el proyecto frontend (`tailwind.config.ts` o variables CSS en `globals.css`) para asegurar que el armado posterior herede la identidad corporativa correcta.
4. Usa tus herramientas para COPIAR las imágenes estáticas desde `base_content/raw/FOTOS` hacia `front/public/images/`.
   - Crea subcarpetas lógicas si es necesario (ej: `front/public/images/ui/`).

### Paso 3: Subida de Imágenes Dinámicas (Sanity CMS)
1. Identifica las fotos destinadas al contenido dinámico (noticias, fotos del personal, galería de instalaciones, portafolio de servicios).
2. Ejecuta el script utilitario para subir de forma masiva estas fotos a Sanity:
   ```bash
   npx tsx front/scripts/uploadAssets.ts "absolute/path/foto1.jpg" "absolute/path/foto2.jpg"
   ```
3. Toma nota cuidadosa de los IDs (`_id`) de los assets devueltos por el script. Formato típico: `image-xxxxxxxxxxxxxxxxxxxxxxxx-800x600-jpg`.

### Paso 4: Preparación de Datos Estructurados
1. Transforma el contenido original en un archivo estructurado `base_content/raw/data.json`. Este archivo debe ser un arreglo de objetos JSON que representen los documentos exactos a crear en Sanity (ej. `[{"_type": "news", "title": "..."}, ...]`).
2. Asegúrate de incluir las referencias a los IDs de imágenes obtenidos en el paso anterior usando el formato de referencias de Sanity (ej. `{"_type": "image", "asset": {"_ref": "image-xxxx-xxx", "_type": "reference"}}`).

### Paso 5: Poblado del CMS (Mutaciones Automáticas)
1. Ejecuta el script utilitario para inyectar este archivo estructurado directamente a Sanity:
   ```bash
   npx tsx front/scripts/seedContent.ts "absolute/path/to/base_content/raw/data.json"
   ```

### Paso 6: Armado Dinámico y Relleno del Frontend
1. **Generación Dinámica de Rutas:** Analiza los títulos principales (`##`) del archivo `textos.md`.
2. **Ignora/elimina las páginas del template antiguo** en `front/app/` que no correspondan a la nueva estructura.
3. Utiliza las integraciones de la skill `next-page-generator` para crear una nueva ruta `front/app/[seccion]/page.tsx` por cada gran bloque de texto que consideres deba tener su propia página.
4. Reemplaza cualquier `lorem ipsum` por los textos genuinos o consume los datos enlazados del CMS.
5. Asegúrate de que las consultas a Sanity traigan los documentos "creados/poblados" para que la UI los pinte de inmediato.
6. **Actualización de Navegación:** Modifica obligatoriamente `Navbar.tsx` (y/o `Footer.tsx`) para que sus enlaces reflejen iterativamente estas nuevas rutas creadas, con los títulos exactos extraídos del documento.

### Paso 7: Informe Final
- Avisa al usuario que el relleno estructural ha concluido, mencionando cuántas imágenes se movieron a `/public`, cuántas se subieron al CMS, cuántos documentos se crearon y en qué páginas se insertaron los textos base.

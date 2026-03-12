# Guía: Cómo vincular este Template a un nuevo proyecto en Sanity

Esta guía explica paso a paso cómo tomar este repositorio base (template) y conectarlo a una nueva base de datos de Sanity para un cliente nuevo, configurando los entornos de desarrollo y producción.

## 1. Requisitos Previos

- Tener una cuenta en [Sanity](https://www.sanity.io/).
- Tener instalado Node.js.
- Tener clonado este repositorio (el template base).

## 2. Crear un Nuevo Proyecto en Sanity

Existen dos formas de crear y enlazar un nuevo proyecto en Sanity: mediante la CLI o desde la plataforma web. Recomendamos usar la web para mayor claridad sobre la facturación y la configuración inicial, o la CLI si buscas velocidad.

### Opción A: Desde la Web (Recomendado)

1. Ingresa a [manage.sanity.io](https://manage.sanity.io/) e inicia sesión.
2. Haz clic en el botón **"New Project"**.
3. Asigna un nombre al proyecto (ej. "Sitio Web Cliente X") y selecciona tu plan (el plan Free/"Hobby" suele ser suficiente).
4. Una vez creado, copia el **Project ID** (un código alfanumérico corto) que aparece en el panel (Dashboard) del proyecto.
5. Ve a la pestaña **"Datasets"** y asegúrate de que exista un dataset llamado `production`. Si no existe, créalo. También puedes crear aquí un dataset `development` opcional para pruebas locales.

### Opción B: Desde la Terminal (CLI)

1. Abre tu terminal en la carpeta `web-template-api` (el Studio).
2. Inicia sesión en tu cuenta de Sanity con el comando:
   ```bash
   npx sanity login
   ```
3. Ejecuta el comando de inicialización para proyectos existentes:
   ```bash
   npx sanity init --env
   ```
4. Selecciona **"Create new project"**.
5. Ponle nombre al proyecto y acepta el dataset predeterminado (`production`).
6. La CLI actualizará automáticamente los archivos `.env` o la configuración con tu nuevo **Project ID**.

---

## 3. Vincular el Proyecto Local (Código)

Si utilizaste la Opción A o necesitas configurar los IDs manualmente, debes actualizar tanto el Studio como el Frontend (Next.js).

### A. Actualizar Sanity Studio (`web-template-api`)

Abre el archivo de configuración principal de la carpeta del Studio y actualiza el `projectId`.

*   **Archivo:** `web-template-api/sanity.config.ts` (y/o `sanity.cli.ts` dependiendo de la versión).
*   **Acción:** Reemplazar el `projectId` existente por el nuevo Project ID que obtuviste en el paso anterior.
*   **Dataset:** Asegúrate de que apunte a `production` (o al dataset que uses por defecto).

Ejemplo en `sanity.config.ts`:
```typescript
export default defineConfig({
  name: 'default',
  title: 'Mi Proyecto',
  projectId: 'TU_NUEVO_PROJECT_ID', // Reemplazar aquí
  dataset: 'production',
  // ...
})
```

### B. Actualizar el Frontend de Next.js (`mi-proyecto`)

El sitio web también necesita saber de dónde leer los datos.

*   **Archivo:** Crea o edita el archivo `.env.local` en la raíz de la carpeta `mi-proyecto`.
*   **Acción:** Agrega o actualiza las siguientes variables de entorno:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="TU_NUEVO_PROJECT_ID"
NEXT_PUBLIC_SANITY_DATASET="production"
```

> **Nota:** Nunca escribas las claves secretas o tokens de escritura (Token de API) directamente en el código de Next.js, mantenlos siempre en el archivo `.env`.

---

## 4. Subir la Configuración e Inicializar Sanity (Deploy)

Una vez que el código está vinculado correctamente al nuevo proyecto, debes "desplegar" la interfaz para que tus clientes/editores puedan usarla.

Abre la terminal en la carpeta del Studio (`web-template-api`) y ejecuta:

```bash
npm run deploy
```
*(Este comando ejecuta internamente `sanity deploy`)*.

La terminal te pedirá que elijas una **URL pública** para este panel (por ejemplo: `mi-cliente-studio.sanity.studio`). ¡Y listo! El panel de administración de tu cliente estará vivo en esa URL.

---

## 5. Gestión de Accesos para el Cliente

Sanity no gestiona la autenticación desde el código. Para darle acceso a tu cliente al panel recién creado:

1. Ingresa nuevamente a [manage.sanity.io](https://manage.sanity.io/).
2. Selecciona el proyecto recién creado.
3. Ve a la pestaña de **Miembros (Members) / Team**.
4. Haz clic en **"Invite Member"**.
5. Escribe el correo electrónico de tu cliente y asígnale el rol adecuado (generalmente **Editor** para que solo modifique el contenido y no la facturación).

Cuando el cliente haga clic en el enlace de invitación enviado a su correo, podrá iniciar sesión en la URL de Sanity que desplegaste en el paso anterior y comenzar a cargar el contenido.

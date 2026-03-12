---
name: Content Ingestion Skill
description: Handles the extraction, processing, and uploading of raw content (text and images) from the base_content directory to the Next.js frontend and Sanity CMS.
---

# Content Ingestion Skill

This skill is responsible for orchestrating the ingestion of raw client content into the project structure. It reads texts and images, distributes static assets to the frontend, and uploads dynamic assets to the Sanity CMS.

## Capabilities

1.  **Text Processing:** Reads raw markdown/text files from `base_content/raw/` to understand the site's structure and copy.
2.  **Asset Distribution:**
    *   Identifies static assets (logos, UI elements, background patterns) and copies them to `front/public/images/`.
    *   Identifies dynamic assets (team photos, news images, gallery photos) meant for the CMS.
3.  **Sanity Upload:** Uses the provided `uploadAssets.ts` script to bulk upload dynamic images to Sanity and retrieve their IDs for later use in data seeding.

## Scripts

### `uploadAssets.ts`

A standalone utility script located in `front/scripts/uploadAssets.ts` within the frontend project.

**Usage:**
```bash
npx tsx front/scripts/uploadAssets.ts <path-to-image1> <path-to-image2> ...
```

**Prerequisites:**
The script requires the following environment variables to be accessible (either in a `.env` file in the directory where it's executed, typically the backend, or exported in the shell):
*   `SANITY_PROJECT_ID` or `NEXT_PUBLIC_SANITY_PROJECT_ID`
*   `SANITY_DATASET` or `NEXT_PUBLIC_SANITY_DATASET`
*   `SANITY_API_WRITE_TOKEN` (Must have Editor/Write permissions)

The script uses `@sanity/client` to perform the uploads.

### `seedContent.ts`

A standalone utility script located in `front/scripts/seedContent.ts` to bulk upload or update documents in the CMS.

**Usage:**
```bash
npx tsx front/scripts/seedContent.ts <path-to-data.json>
```

**Prerequisites:**
The script requires the same environment variables as `uploadAssets.ts`. The input file must be a JSON array of objects representing Sanity documents.

## Workflow Integration

This skill is heavily utilized by the `.agent/workflows/fill-website.md` workflow. When the agent is tasked to "fill the website", it should reference this skill's scripts to handle the physical movement and uploading of files.

---
name: Sanity Schema Manager
description: Handles the creation, modification, and typing of Sanity CMS schemas, ensuring synchronization with the frontend TypeScript interfaces.
---

# Sanity Schema Manager

This skill is designed to manage the content modeling of the corporate website using Sanity CMS.

## Context
The project has a separate Sanity backend located in the `backend/` directory and a Next.js frontend in the `front/` directory. For the application to function correctly, any data structure defined in Sanity must have a strict 1-to-1 representation as a TypeScript interface in the frontend.

## Instructions

When asked to create or modify a data schema (e.g., a new "Team Member" profile, a "Service" offering, or a "Project" showcase), you must perform the following steps:

1. **Create the Schema Definition (Backend):**
   - Navigate to `backend/schemaTypes/`.
   - Create a new TypeScript file for your schema (e.g., `member.ts`, `service.ts`).
   - Define the schema using the `defineType` and `defineField` helpers from `sanity`.
   - Ensure you use appropriate UI components and validation rules (e.g., requiring a title, setting appropriate image hotspots).

2. **Register the Schema (Backend):**
   - Open `backend/schemaTypes/index.ts`.
   - Import your newly created schema.
   - Add it to the `schemaTypes` array so it registers with Sanity Studio.

3. **Generate Frontend TypeScript Interfaces (Frontend):**
   - Navigate to `front/lib/types/` (create the directory if it doesn't exist).
   - Create or update a file named `sanity.types.ts` (or similar relevant typings file).
   - Write a strict TypeScript `interface` or `type` that EXACTLY matches the shape of the data that Sanity will return for your new schema.
   - Remember to include built-in Sanity fields like `_id`, `_type`, `_createdAt`, `_updatedAt`, and `_rev` if representing a full document.

## Rules
- **Never** create a Sanity schema without creating its frontend TypeScript interface.
- Keep the corporate brand image in mind: ensure schemas have fields for necessary multimedia (images, icons with ALT text, video links) and styling overrides if requested.
- Use explicit typing for everything.

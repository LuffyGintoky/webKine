---
name: Sanity Next.js Connector
description: Handles the integration between the Sanity CMS backend and the Next.js frontend by writing GROQ queries, fetching data, and typing the responses.
---

# Sanity Next.js Connector

This skill manages the critical bridge between the content definitions in Sanity and its presentation in Next.js.

## Context
The project uses `next-sanity` to fetch content. 
- The client configuration is located at `front/lib/sanity.client.ts`.
- The schemas are located in `backend/schemaTypes/`.
- The generated TypeScript interfaces are in `front/lib/types/` (or similarly grouped alongside the fetch definitions).

## Instructions

When asked to wire a page to Sanity, connect a list of items, or retrieve a specific document, you must:

1. **Write the GROQ Query:**
   - Define a highly performant GROQ query string using `groq` from `next-sanity`.
   - Select explicitly the fields you need (e.g., `_id`, `title`, `"slug": slug.current`, `"imageUrl": image.asset->url`). DO NOT use generic `*` if you only need a few properties - optimize for payload size.
   - For images, always fetch enough data to use `urlFor` or Next.js `<Image/>` optimization (or resolve the URL directly in the query like `"imageUrl": image.asset->url`).

2. **Implement Fetching Logic (Server Components First):**
   - By default, handle all data fetching inside Next.js App Router Server Components (`page.tsx` or a server component in `front/components/`).
   - Import the instantiated client from `front/lib/sanity.client.ts`.
   - Use `client.fetch<ReturnType>(query, params)` to execute the query.

3. **Strict Type Safety:**
   - Important: **Always pass the appropriate generic type** into `client.fetch`. The `ReturnType` MUST be defined in the frontend's typing files.
   - Ensure the component receiving the data expects exactly this `ReturnType` shape. If the query shapes the output differently than the raw Sanity Schema Type (e.g., resolving a slug object into a string), define a specific type for the *QueryResult*.

4. **Integration with the UI:**
   - Pass the verified, typed data down to child components as props.
   - Handle loading states (if using client fetching) or empty states (e.g., checking if `items` array is empty) gracefully within the UI.

## Rules
- **Never** write generic `client.fetch(query)` without explicit typing.
- Separate GROQ strings into constants inside the file that uses them, or group them logically in `front/lib/queries.ts` if reused across pages.
- Handle potential nulls or undefines effectively, particularly for optional references.

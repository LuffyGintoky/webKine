---
name: Next.js Page Generator
description: Specializes in creating fully responsive App Router pages and reusable React components using Tailwind CSS for a highly visual, modern corporate site.
---

# Next.js Page Generator

This skill is designed to manage the generation of Next.js routes, pages, and components for the corporate web application frontend.

## Context
The project's frontend is located in the `front/` directory and utilizes the Next.js App Router (`front/app`). Styling is strictly handled via Tailwind CSS (`@tailwindcss/postcss`). The design requirements for this site emphasize corporate branding, premium aesthetics, rich user interactions, and responsive design.

## Instructions

When asked to create a new section on the website (e.g., "About Us", "Contact Form", "Our Work"), follow these steps:

1. **Routing and Structure:**
   - Create a new directory within `front/app/` representing the route (e.g., `front/app/about/`).
   - Create a `page.tsx` file inside that directory.
   - For dynamic routes based on Sanity queries (like blog posts or portfolio pieces), use dynamic segments like `front/app/projects/[slug]/page.tsx`.
   - Update `front/README.md` or a similar tracking file if a new major route is added, so other agents know it exists.

2. **Server-Side Generation and SEO:**
   - Define and export `metadata` (from `next`) or a `generateMetadata` function inside the `page.tsx`. SEO is crucial for corporate websites.
   - Use server components for `page.tsx` by default. Only add `'use client'` if state, lifecycle hooks, or specific browser APIs are strictly necessary (these should ideally be moved to smaller child components).

3. **Components and UI Design:**
   - If a section of the page requires complex interactions or repeated usage, extract it into `front/components/`.
   - Add modern aesthetics: Use smooth gradients, clean typography (from `next/font`), subtle hover states, and dynamic micro-animations. Avoid generic flat designs; make it look premium.
   - Ensure you use Tailwind CSS utility classes effectively to structure content, provide responsiveness (`sm:`, `md:`, `lg:`), and maintain consistency.

## Rules
- **Never** add generic content without appropriate CSS styles. A new page must look corporate and polished from its first iteration.
- **Dynamic Corporate Branding:** When generating the first components for a new site, explicitly search for the brand's logo in the provided assets, extract its primary colors, and implement them in the Tailwind config or global CSS before proceeding with page generation.
- **Content-Driven Architecture:** Routes and menus must be constructed dynamically from the provided content maps (e.g., Markdown headers), replacing the original template structure entirely if it differs from the content provided.
- Favor compositional patterns: keep components focused. `page.tsx` should primarily orchestrate fetching and laying out major UI blocks.
- Ensure all components using client hooks are marked with `"use client"`.

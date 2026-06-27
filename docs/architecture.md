# Architecture

## Overview

Datapex Connect uses the Next.js App Router with TypeScript and Tailwind CSS.

The application is organised so routing, presentation, and business content remain separate:

- 'src/app' contains route entrypoints
- 'components' contains reusable presentation components
- 'content' contains structured business content
- 'lib' contains registry and lookup helpers
- 'types' contains shared domain types

## Current architecture

The current implementation is content-driven.

Profiles, companies, and related identity information are stored as structured content records. Routes and components consume that content through small registry helpers rather than importing raw content files directly inside route modules.

This gives the project a clean boundary:

- content defines what exists
- registries define how content is found
- routes decide what to render
- components decide how it looks

## Representation model

### Profiles

Profiles are represented as people records with fields such as:

- slug
- full name
- professional title
- headline
- summary
- contact links
- affiliated company slugs

### Companies

Companies are represented as company records with fields such as:

- slug
- name
- summary

### Solutions

Solutions are currently represented at the presentation layer as curated featured solution entries for the profile experience. They are part of the product direction, even if they are not yet modelled as a shared domain type.

If the solution set grows or becomes reusable across multiple profiles, it should move into structured content using the same content-driven approach.

## Why use content-driven architecture

Content-driven architecture is used because Datapex Connect needs to scale beyond a single page without turning routing and UI files into business-data containers.

Benefits:

- easier addition of new profiles and companies
- consistent rendering across routes
- cleaner testing and review
- lower risk of duplicated business information
- simpler future migration to CMS, API, or database-backed content

## Why routes should use registries

Route logic should use registries in 'lib' instead of importing individual content files directly because registries provide a stable lookup layer.

That matters for several reasons:

- routes stay independent from individual records such as one specific person file
- adding more profiles does not require rewriting route logic
- future filtering, sorting, validation, or fallback logic can live in one place
- future migration from local files to another content source can happen behind the registry layer

In short, routes should ask for a profile by slug, not know which file exports it.

## Growth path

The current architecture is intentionally small, but it already supports future expansion toward:

- multiple profiles
- QR code entry points to specific profiles or event variants
- downloadable vCards
- wallet pass generation
- event-specific experiences with different featured solutions or branding

These can be added incrementally without changing the routing model if the content and registry boundaries are preserved.

## Current MVP boundaries

For now, the architecture should remain focused on:

- static structured content
- one public profile route pattern
- reusable presentation components
- simple registry-based content lookup

It should avoid premature additions such as:

- CMS integration
- runtime content editing
- complex back-office tooling
- analytics systems
- CRM workflows

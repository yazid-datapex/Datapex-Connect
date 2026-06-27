# Datapex Connect

Datapex Connect is a production-ready Next.js application workspace for building the Datapex web presence, structured content, and future product-facing experiences.

This repository is intentionally prepared with modular placeholders and documentation so the team can expand the product without redesigning the foundation each time.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app locally.

Create a production build:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

## Project Structure

- `src/app` contains the App Router entrypoints and global application shell.
- `components` contains reusable UI placeholders for future page assembly.
- `content` contains structured content records for people, companies, and products.
- `lib` contains shared configuration and helper utilities.
- `types` contains shared TypeScript domain models.
- `docs` contains product, branding, roadmap, and architecture notes.

## Current Scope

The repository is currently prepared for development with:

- starter content removed from the default Next.js homepage
- placeholder UI components for future landing-page implementation
- initial structured content entries for people and companies
- baseline documentation for product direction and technical decisions

## Notes

This project uses the Next.js App Router, TypeScript, and Tailwind CSS v4. Styling and the real landing page are intentionally deferred until the product direction and content model are finalized.

# ADR-0001

## Title

Content-Driven Architecture for Datapex Connect

## Status

Accepted

## Date

2026-06-28

## Context

Datapex Connect is being built as a professional identity platform, not merely a digital business card.

The platform must support a profile experience that can later expand to cover:

- multiple professional profiles
- company affiliations
- featured solutions
- QR-based entry points
- downloadable vCards
- wallet passes
- event-specific experiences

Early development could have embedded business information directly inside route files and React components. That approach would work for a single page, but it would make the product harder to scale and harder to maintain.

## Decision

Datapex Connect will use a content-driven architecture.

Business entities such as profiles and companies will be represented as structured content records. Route logic will access those records through registry helpers rather than importing individual content files directly inside route modules.

Presentation components will render content but will not own business data.

## Rationale

This decision keeps the system aligned with the product direction.

### 1. The product is identity-first

A professional identity platform needs content to be portable across different experiences. The same person and company data may later appear in:

- profile pages
- QR-driven conference flows
- downloadable vCards
- wallet passes
- event-specific landing pages

### 2. Registry-based lookup keeps routes stable

A route such as '/[slug]' should resolve a profile by slug, not by knowing which file exports the data.

Using registries means:

- route logic stays generic
- new profiles can be added with minimal route changes
- lookup rules remain centralised
- future data-source changes remain easier to manage

### 3. Content-driven modelling supports growth

Structured content makes it easier to represent:

- profiles
- companies
- solution references
- future event variants

without hardcoding business information inside UI components.

## Consequences

### Positive

- The application can expand from one profile to many profiles without changing the routing model.
- UI components remain reusable and easier to reason about.
- Business content is easier to review and update.
- Future support for QR codes, vCards, wallet passes, and event-specific experiences fits the existing shape.
- Future migration to CMS or API-backed content is simpler.

### Trade-offs

- The project has more files earlier in development.
- Registry helpers add a thin abstraction layer.
- Some content, such as featured solutions, may start in presentation code before being promoted into shared structured content.

These trade-offs are acceptable because they preserve a better long-term structure.

## Alternatives considered

### Direct imports in route files

Rejected.

Importing individual content files directly into routes would couple routing to specific records and make scaling to multiple profiles less clean.

### Hardcoded content inside components

Rejected.

This would blur the boundary between presentation and business information and make future reuse harder.

### Database-first architecture

Rejected for the current MVP.

The product does not yet require runtime editing, and static content keeps the platform simple while preserving a future migration path.

## Current representation model

At the time of this decision:

- profiles are represented as people content records
- companies are represented as company content records
- route lookups are handled through registry helpers in 'lib'
- presentation components remain separate from content ownership

## MVP boundaries

The current MVP should stay focused on:

- one polished professional identity flow
- structured local content
- registry-based lookups
- reusable UI

The MVP should not yet expand into:

- admin tooling
- CMS workflows
- analytics dashboards
- CRM integration
- full event-management systems

## Future considerations

The same architecture should later support:

- multiple profiles
- QR code support
- downloadable vCards
- wallet passes
- event-specific experiences
- richer solution modelling

Those additions should build on the same content and registry boundaries rather than bypass them.

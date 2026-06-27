# Digital Identity V1 Implementation Design

## Purpose

This document describes how Version 1 of the Digital Identity feature should be implemented in Datapex Connect before code changes begin.

It follows the current project direction:

- Datapex Connect is a professional identity platform, not merely a digital business card.
- The implementation must preserve the content-driven architecture.
- The implementation must preserve the current routing model.
- The implementation must remain aligned with the approved product specification and ADRs.

## Components to modify

### `components/ContactButtons.tsx`

This component should be updated to support the Version 1 primary actions defined in the specification:

- Save Contact
- Explore Webstream ACP
- Email
- WhatsApp
- Call

Required changes:

- accept action data derived from the content model and utility layer
- support downloadable action links for vCard delivery
- support standard external and platform links without hardcoded contact values
- preserve current reusable visual treatment of action tiles

### `src/app/[slug]/page.tsx`

This route should remain the main identity entry point.

Required changes:

- resolve the profile through the existing people registry
- resolve affiliated companies through the existing companies registry
- construct digital identity action inputs using utility helpers
- pass prepared data into reusable components

### `content/people/yazid.ts`

This content file should be reviewed to ensure Version 1 actions can be sourced from the current content structure.

Potential changes may include:

- adding the Webstream ACP action as a contact method if that remains the chosen representation
- ensuring contact values required for vCard generation are available from the profile content

### `types/content.ts`

The shared content types may need a minimal update if a new contact method type is required for Explore Webstream ACP.

Any change here should remain consistent with the existing domain model and should avoid broader restructuring.

## New components

No entirely new page-level experience is required for Version 1.

The preferred approach is to reuse existing components and only add a new component if one of the following becomes necessary:

- a dedicated action-tile subcomponent inside the contact area
- a small reusable icon wrapper if contact action icons need clearer separation

If created, these should remain local presentation components and should not own business data.

## New utility modules

### `lib/digital-identity.ts`

A dedicated utility module should be introduced for Digital Identity business logic.

Responsibilities:

- derive contact actions from profile content
- expose lookup helpers for contact methods by type
- build the vCard payload from structured profile and company data
- produce a download-ready output for the Save Contact action
- centralise Digital Identity logic so it does not leak into components

This module should not render UI. It should only transform content into implementation-ready values.

## Content model changes

Version 1 should keep the existing content-driven model intact.

Expected minimal changes:

- extend the contact method type union only if needed for Explore Webstream ACP
- keep professional identity fields in the person content record
- keep organisations in separate company content files
- avoid introducing a new top-level solution model unless the feature requires it immediately

Guiding rule:

Business content should remain in content files, not in route modules or visual components.

## File structure

Expected implementation footprint:

```text
content/
  people/
    yazid.ts                # profile content and contact methods

components/
  ContactButtons.tsx        # reusable contact action presentation
  LucideIcons.tsx           # reusable action icons if already used by the contact layer

lib/
  people.ts                 # existing people registry
  companies.ts              # existing company registry
  digital-identity.ts       # new identity-specific utility module

src/app/
  [slug]/page.tsx           # existing identity route
```

## Data flow

The intended Version 1 data flow is:

1. The route receives a profile slug.
2. The route resolves the professional through `lib/people`.
3. The route resolves affiliated companies through `lib/companies`.
4. The route passes profile and company data into `lib/digital-identity`.
5. The utility module produces:
   - contact action values
   - vCard output
   - download metadata if needed
6. The route passes these prepared values into reusable UI components.
7. Components render the identity experience without owning business rules.

This keeps the route orchestration-focused and preserves the boundary between content, logic, and presentation.

## Routing impact

Version 1 should not change the current public routing model.

Expected impact:

- keep the main identity route at `src/app/[slug]/page.tsx`
- avoid adding new user-facing routes unless the chosen vCard delivery mechanism requires it

Preferred implementation direction:

- if possible, serve Save Contact without introducing a new route
- if a route becomes necessary later for better delivery semantics, it should still preserve the overall routing philosophy and remain narrowly scoped to the feature

## Reusability considerations

The implementation should optimise for future reuse across multiple professionals and event contexts.

Required considerations:

- contact rendering should depend on structured action data, not Yazid-specific assumptions
- vCard generation should accept a generic profile and related company data
- route logic should continue resolving content through registries rather than direct file imports
- UI components should not assume one fixed set of actions beyond current specification needs
- future profiles should be able to reuse the same Digital Identity pipeline with different content only

## Testing considerations

Implementation review should include at least the following checks:

### Type and lint validation

- TypeScript passes
- ESLint passes

### Functional checks

- Save Contact produces a valid vCard download
- vCard content contains the expected profile fields
- Explore Webstream ACP resolves to the configured destination
- Email opens a mailto link
- WhatsApp opens the configured WhatsApp link
- Call opens a tel link

### Data integrity checks

- contact information is sourced from content files only
- no duplicate contact values are introduced in components
- route lookups still flow through registries

### Experience checks

- desktop and mobile layouts remain intact
- action ordering matches the specification
- unsupported platform actions degrade gracefully

## Future extension points

The design should preserve clean extension points for:

- QR code entry into a professional identity
- Google Wallet and Apple Wallet support
- multiple professionals using the same route pattern
- event-specific experiences with different solution emphasis
- richer solution modelling as structured shared content
- future replacement of local content files with CMS or API-backed data

## Implementation summary

Version 1 should be implemented by extending the existing identity page rather than introducing a new experience model.

The core design choice is to keep Digital Identity logic in a dedicated utility layer, keep business data in structured content, keep route logic registry-driven, and keep UI components presentation-focused.

That approach is the most consistent with the project vision, the domain model, the engineering playbook, and ADR-0001.

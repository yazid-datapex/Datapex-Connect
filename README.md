# Datapex Connect

> A professional identity platform for consultants, architects and technology leaders.

---

## Overview

Datapex Connect is a modern digital identity platform designed for enterprise professionals.

Rather than replacing a personal website or LinkedIn profile, it focuses on one objective:

**Helping people continue meaningful business conversations.**

It combines professional identity, organisation affiliations, featured solutions and digital contact capabilities into a single mobile-first experience suitable for conferences, customer meetings and technical engagements.

The project began as a digital business card for conference presentations and evolved into a reusable professional identity platform.

---

## Vision

Traditional business cards are static.

Professional profiles become outdated.

Conference attendees often forget who they met.

Datapex Connect provides a single, elegant experience that answers four questions within seconds:

* Who is this person?
* What do they do?
* Which organisations do they represent?
* How do I contact them?

---

## Current Features

* Executive profile page
* Content-driven architecture
* Professional affiliations
* Featured solutions
* Mobile-first responsive design
* Product specification driven development

---

## Planned Features

* Downloadable vCard
* QR code sharing
* Google Wallet support
* Apple Wallet support
* NFC support
* Conference-specific landing pages
* Multi-profile support
* Analytics
* Product microsites

---

## Architecture

The application follows a content-driven architecture.

Business information is separated from presentation.

```text
content/
├── people/
├── companies/
├── solutions/

↓

lib/
├── registries

↓

components/

↓

pages
```

This enables future migration to a CMS or API without changing the presentation layer.

---

## Engineering Philosophy

This project is intentionally specification-driven.

Every feature follows the same lifecycle.

```text
Vision

↓

Product Specification

↓

Architecture Decision

↓

Implementation

↓

Review

↓

Release
```

Implementation is performed by AI-assisted development while architectural decisions remain human-led.

---

## Documentation

Project documentation is organised into:

```text
docs/

vision/
Product direction

specifications/
Feature specifications

adr/
Architecture Decision Records

playbook/
Engineering methodology
```

The documentation is considered part of the product and evolves together with the implementation.

---

## Technology Stack

* Next.js 15
* React
* TypeScript
* Tailwind CSS
* App Router

Future integrations will include:

* Google Wallet
* Apple Wallet
* QR Code generation
* vCard generation

---

## Project Status

Current milestone:

**Conference Ready**

The project is preparing for its first production use as a professional identity platform during enterprise customer presentations.

---

## Repository Philosophy

Datapex Connect is not only a software project.

It is also the reference implementation for an AI-assisted software engineering workflow.

The repository captures:

* Product Vision
* Product Specifications
* Architecture Decisions
* Engineering Playbook

The goal is to demonstrate that AI can accelerate implementation while humans remain responsible for product vision, architecture and user experience.

---

## Roadmap

### Milestone 0

* Foundation
* Architecture
* Executive Profile
* Engineering Methodology

### Milestone 1

* Digital Identity
* vCard
* QR Code
* Logos
* Deployment

### Milestone 2

* Wallet Integration
* Multi-profile Support
* Conference Experiences

### Milestone 3

* Professional Identity Platform

---

## Contributing

The project follows a specification-first workflow.

Before implementation:

1. Define the Product Vision.
2. Create or update the Product Specification.
3. Record architectural decisions when appropriate.
4. Implement.
5. Review the product experience.

---

## License

To be determined.

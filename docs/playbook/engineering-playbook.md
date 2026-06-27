# Engineering Playbook

**Project:** Datapex Connect

**Version:** 1.0

**Status:** Living Document

---

# Purpose

The Engineering Playbook defines how software is designed and delivered within the Datapex engineering process.

It exists to create consistency across projects, regardless of implementation technology or engineering team.

The objective is not simply to build software faster.

The objective is to build better software through deliberate thinking, clear specifications and continuous review.

---

# Engineering Philosophy

Software development begins with understanding.

Not implementation.

Every feature should begin by answering:

**Why does this feature exist?**

Only after the business purpose is understood should implementation begin.

---

# Software Delivery Lifecycle

Every feature follows the same lifecycle.

```text
Vision

↓

Domain Model

↓

Product Specification

↓

Architecture Decision

↓

Implementation Design

↓

Implementation

↓

Product Review

↓

Release
```

Implementation should never begin before the earlier stages have been completed.

---

# Engineering Roles

## Product Owner

Responsible for:

* Product vision
* Business priorities
* User experience
* Feature approval

Current role:

**Yazid Yahya**

---

## Solution Architect

Responsible for:

* Domain modelling
* Product architecture
* Technical direction
* Architecture review
* Long-term maintainability

Current role:

**ChatGPT**

---

## Implementation Engineer

Responsible for:

* Code implementation
* Refactoring
* Technical validation
* Component construction
* Following approved specifications

Current role:

**Codex**

---

# Artefacts

Every project should contain the following engineering artefacts.

## Vision

Defines why the product exists.

---

## Guiding Principles

Defines how decisions are made.

---

## Domain Model

Defines the business language.

---

## Product Specification

Defines individual product capabilities.

---

## Architecture Decision Records (ADR)

Records significant technical decisions and their rationale.

---

## Implementation Design

Describes how a specification will be implemented before code is written.

---

## Product Review

Evaluates whether the implementation satisfies the product rather than merely compiling successfully.

---

# Working with AI

AI is treated as a member of the engineering team.

AI should receive context rather than isolated prompts.

Before implementation, AI should understand:

* Product Vision
* Guiding Principles
* Domain Model
* Product Specification
* Architecture Decisions

The repository should contain enough information that implementation becomes an engineering exercise rather than guesswork.

---

# Specification-Driven Development

Specifications define intent.

Implementation follows.

A specification should explain:

* Purpose
* User journey
* User stories
* Acceptance criteria
* Functional requirements
* Non-functional requirements
* Success metrics
* Future enhancements

Specifications should avoid implementation details whenever possible.

---

# Architecture-Driven Development

Architecture decisions exist to preserve long-term flexibility.

Architectural changes should be documented through ADRs.

Architectural decisions should be justified before implementation begins.

---

# Product Reviews

Every implementation should be reviewed from four perspectives.

## Product

Does this improve the user experience?

---

## Business

Does this solve the intended problem?

---

## Architecture

Does the implementation strengthen the system?

---

## Maintainability

Would we confidently support this implementation in one year's time?

---

# Definition of Done

A feature is complete only when:

* Product Specification satisfied
* Acceptance Criteria satisfied
* Architecture preserved
* Mobile experience reviewed
* Desktop experience reviewed
* Documentation updated
* Product Owner approval received

A feature is not complete simply because the code compiles.

---

# Engineering Principles

Good engineering should:

* Reduce complexity
* Encourage reuse
* Preserve flexibility
* Separate concerns
* Favour clarity over cleverness
* Optimise for long-term maintainability

---

# Continuous Improvement

Every project should improve the engineering process itself.

Lessons learned should be documented.

Successful patterns should become reusable standards.

The objective is to improve not only the software but also the methodology used to create it.

---

# AI Engineering Workflow

When working with AI implementation tools:

1. Define the Vision.
2. Define the Domain.
3. Write the Product Specification.
4. Record Architecture Decisions.
5. Review the proposed Implementation Design.
6. Approve implementation.
7. Review the product experience.
8. Release.

AI should be encouraged to explain its reasoning before implementation whenever practical.

---

# Long-Term Goal

The Datapex Engineering Playbook should become reusable across every software project.

Future projects should begin by cloning the engineering methodology before writing application code.

The engineering process is considered a product in its own right and should evolve continuously through experience.

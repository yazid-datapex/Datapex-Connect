# Domain Model

**Project:** Datapex Connect
**Version:** 1.0
**Status:** Draft

---

# Purpose

This document defines the core product language of Datapex Connect.

It is not a database schema.

It is a shared domain model that explains the key concepts used across product specifications, architecture decisions, content models and implementation.

The goal is to ensure that humans, AI tools and future developers use the same vocabulary when designing and building the platform.

---

# Core Domain

Datapex Connect is built around a simple idea:

A professional has an identity.

That identity presents who they are, what they do, which organisations they represent, which solutions they deliver, and how others can continue the conversation.

---

# Domain Concepts

## Professional

A Professional is the person being represented on Datapex Connect.

Example:

* Yazid Yahya

A Professional owns:

* Name
* Professional title
* Headline
* Summary
* Contact methods
* Affiliations
* Featured solutions

A Professional is not the same as a user account.

Version 1 does not require authentication, login, or profile editing.

---

## Identity

An Identity is the public presentation of a Professional.

It is what a visitor sees when opening a profile page.

An Identity is composed of:

* Hero
* Contact actions
* Featured solutions
* Professional affiliations
* Footer

The Identity should answer:

* Who is this person?
* What do they do?
* Who do they represent?
* What solutions do they deliver?
* How do I contact them?

---

## Contact Method

A Contact Method is any action that allows a visitor to continue the relationship with a Professional.

Examples:

* Save Contact
* Email
* WhatsApp
* Call
* QR Code
* Google Wallet
* Apple Wallet

Contact Methods should be easy to understand and should not require explanation.

Version 1 includes:

* Save Contact
* Email
* WhatsApp
* Call
* Explore Webstream ACP

---

## vCard

A vCard is a downloadable contact file that allows a visitor to save the Professional’s details into their phone or address book.

In Datapex Connect, vCard belongs to the Digital Identity feature.

It should be generated from the Professional content model rather than duplicated manually.

---

## Affiliation

An Affiliation represents an organisation connected to a Professional.

Examples:

* Audentia
* Datapex

An Affiliation explains professional context.

It should not overpower the Professional’s identity.

Affiliations may include:

* Organisation name
* Role or relationship
* Description
* Website
* Logo
* Brand colour

---

## Organisation

An Organisation is a company, group, partner, vendor or entity represented on the platform.

Examples:

* Audentia
* Datapex

An Organisation may appear as an Affiliation for one or more Professionals.

---

## Solution

A Solution is a capability, product, service or offering associated with a Professional or Organisation.

Examples:

* Webstream ACP
* Enterprise Integration
* Warehouse Mobility
* PrintRelay

A Solution helps visitors understand what the Professional can deliver.

A Solution is not necessarily owned by Datapex Connect.

---

## Featured Solution

A Featured Solution is a Solution highlighted on a specific Identity page.

Featured Solutions are contextual.

For example, a profile used after an AWS presentation may emphasise:

* Webstream ACP
* Cloud Application Delivery
* Enterprise Modernisation

A profile used for warehouse customers may emphasise:

* Warehouse Mobility
* WMS Integration
* PrintRelay

---

## Experience

An Experience is a tailored version of an Identity designed for a specific audience or context.

Future examples:

* Conference Experience
* AWS Experience
* Warehouse Customer Experience
* Product Demo Experience

Experiences allow the same Professional to present different featured solutions without changing their core identity.

---

## Digital Identity

Digital Identity is the product capability that allows visitors to interact with a Professional’s Identity.

It includes:

* Contact actions
* vCard
* Solution links
* QR code
* Wallet support

Digital Identity is not just a page.

It is the interaction layer between a visitor and a Professional.

---

# Current Domain Scope

Version 1 includes:

* Professional
* Identity
* Contact Method
* vCard
* Affiliation
* Organisation
* Solution
* Featured Solution
* Digital Identity

Version 1 does not include:

* User accounts
* Admin editing
* Authentication
* CRM integration
* Analytics
* CMS
* Payment
* Scheduling

---

# Relationship Model

```text
Professional
  └── has one Identity

Identity
  ├── displays Contact Methods
  ├── displays Featured Solutions
  └── displays Affiliations

Affiliation
  └── references Organisation

Featured Solution
  └── references Solution

Digital Identity
  └── enables interaction with Identity
```

---

# Naming Rules

Use these terms consistently:

| Preferred Term        | Avoid                      |
| --------------------- | -------------------------- |
| Professional          | User, Member               |
| Identity              | Landing Page, Profile Page |
| Contact Method        | Button, Link               |
| Affiliation           | Company Relationship       |
| Organisation          | Company only               |
| Solution              | Product only               |
| Experience            | Variant, Theme             |
| Product Specification | Prompt                     |

---

# Design Implications

The domain model informs the UI.

Because the Professional is central, the page should not feel like a company homepage.

Because Identity is the primary experience, the design should prioritise clarity and trust.

Because Contact Methods exist to continue a relationship, they should be immediately visible and easy to use.

Because Affiliations provide context, they should support the Professional rather than dominate the page.

Because Featured Solutions are contextual, they should be easy to change without redesigning the page.

---

# Architecture Implications

The application should:

* Store Professionals in structured content files.
* Store Organisations separately from Professionals.
* Store Solutions separately from Professionals.
* Use registries to resolve content by slug.
* Keep UI components generic.
* Avoid hardcoding business content inside components.
* Allow future CMS or API replacement.

---

# Future Domain Concepts

Potential future concepts include:

## Event

A conference, meeting or campaign context.

---

## Wallet Pass

A portable identity card stored in Google Wallet or Apple Wallet.

---

## QR Entry Point

A scannable entry point into an Identity or Experience.

---

## Contact Analytics

Aggregated, privacy-conscious insight into profile engagement.

---

## Team

A group of Professionals represented under one Organisation.

---

# Summary

Datapex Connect is centred on the Professional.

The Professional owns an Identity.

The Identity presents Affiliation, Solutions and Contact Methods.

Digital Identity enables the visitor to continue the relationship.

This domain language should guide future product specifications, architecture decisions and implementation work.

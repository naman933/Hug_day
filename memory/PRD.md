# Hug Day Greeting Website — PRD

## Problem Statement
Build a Valentine's Hug Day greeting website to send to partner (Sumedha, from Naman). Features cute character graphics that transform into a hug animation on click.

## Architecture
- **Frontend**: React + Tailwind CSS + Framer Motion
- **Backend**: FastAPI (minimal, health check only)
- **No database required** for core functionality

## User Persona
- **Recipient**: Sumedha (partner)
- **Sender**: Naman

## Core Requirements
- Personalized Hug Day greeting page
- Cute male + female SVG characters with arms open (initial state)
- "Send a Hug" CTA button
- On click: characters merge into a hugging couple SVG with heart particle explosion
- Post-hug message: "Happy Hug Day, Sumedha!" with signature "— Naman"
- Classy fonts: Great Vibes (signature), Quicksand (body)
- Warm pink/rose color palette
- Ambient floating hearts background
- Fully responsive (mobile + desktop)

## What's Been Implemented (Feb 2026)
- [x] Full single-page greeting with two states (pre-hug, post-hug)
- [x] Custom SVG boy & girl characters (separate and hugging)
- [x] Framer Motion spring animations for state transitions
- [x] 24-particle heart explosion on hug trigger
- [x] Ambient background floating hearts
- [x] Paper texture overlay for premium feel
- [x] Custom page title & favicon
- [x] Mobile responsive design
- [x] All data-testid attributes for testing
- [x] 100% test pass rate (frontend testing)

## Prioritized Backlog
- P2: Add subtle sound effect on hug
- P2: Add "Reset" button to replay animation
- P3: Add sharing meta tags (OG image, Twitter card)

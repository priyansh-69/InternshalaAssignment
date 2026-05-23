# Internshala SDE Internship Assignment

A frontend-only replication and simulation of the Internshala Internship Search and Filters Page built with React, Next.js, and Redux Toolkit.

## Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **State Management**: Redux Toolkit (Memoized selectors)
- **Styling**: TailwindCSS & Lucide Icons

## Core Features
- **Frontend-Only Filtering**: Profiles keyword search, locations/city lookup, internships in my city, work-from-home, part-time checkmarks, minimum monthly stipends range slider, starting date calendar, and max duration selector.
- **Urgency & Live Applicant Metrics**: Displays dynamic application deadlines and applicant volume stats directly from the hiring API.
- **Brand SVGs & Dynamic Gradients**: Custom vector logos for popular brands (Google, Microsoft, Meta, Apple, Infosys, Zomato, Swiggy) and robust color-coded letter gradients for others on CORS/network errors.
- **Zero Input Lag**: Custom debouncing hook implemented on search text fields to prevent UI performance issues.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start local development server:
   ```bash
   npm run dev
   ```
3. Generate optimized production build:
   ```bash
   npm run build
   ```
4. Run production build locally:
   ```bash
   npm run start
   ```

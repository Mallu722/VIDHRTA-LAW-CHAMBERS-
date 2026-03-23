# Vidhrta Law Chambers Website

Welcome to the **Vidhrta Law Chambers** web application. This is a modern, fully responsive website built for a Bengaluru-based litigation and advisory firm, designed to showcase their practice areas, team, and contact information with a premium look and feel.

## Tech Stack & Architecture

This application is built with modern web development tools:
- **Framework**: React 18 built with Vite for ultra-fast performance.
- **Language**: TypeScript for type safety and robust code.
- **Styling**: Tailwind CSS for utility-first responsive styling and custom animations.
- **UI Components**: shadcn/ui and Radix UI primitives for accessible, high-quality interactive components.
- **Routing**: React Router DOM (`v6`) handling client-side navigation.
- **Icons**: Lucide React providing crisp, scalable vector icons.
- **Animations**: Custom `ScrollReveal` component using Intersection Observer for elegant scroll animations.
- **State/Data**: TanStack React Query included for efficient data fetching/caching if needed.

## Project Structure & Features

The site is organized logically into the following main views:

### Pages (`/src/pages`)
- **Home (`Index.tsx`)**: The landing page featuring a hero section, an overview of the firm, and highlights of key services.
- **About (`About.tsx`)**: Details the firm's history, mission, and core values.
- **Practice Areas (`PracticeAreas.tsx`)**: Comprehensive listing of legal services offered (e.g., Civil, Criminal, Corporate, Family Law).
- **Court Practice (`CourtPractice.tsx`)**: Information about the various courts and tribunals where the firm practices.
- **Team (`Team.tsx`)**: Profiles of the founding partners and legal associates.
- **Contact (`Contact.tsx`)**: A fully functional contact form and office location details (maps integration and address).

### Core Components (`/src/components`)
- **Navigation**: `Navbar.tsx` and `Footer.tsx` provide consistent, responsive site-wide navigation.
- **Reusable UI Components**: Things like `SectionHeading.tsx` and `ScrollReveal.tsx` maintain visual consistency across pages.
- **shadcn/ui Suite**: A collection of isolated UI components located in `/src/components/ui` (buttons, forms, toasts, menus, etc.).

## Setup & Local Development

To run this project locally:

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start the Development Server**:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:8080/` (or the port specified in your terminal).

## Recent Enhancements
* Replaced default project placeholders with a custom law-themed SVG favicon (Balance Scale).
* Cleaned up default auto-generated metadata for a clean, professional "Vidhrta Law Chambers" branding.

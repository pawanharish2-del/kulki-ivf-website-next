# Kulki IVF Website - Next.js 14 Web Application

Welcome to the modernized, production-ready **Next.js 14 (App Router, TypeScript, Tailwind CSS, Prisma, NextAuth)** web application for **KULKI IVF Fertility & ART Centre**, Jaipur.

---

## 🌟 Key Features & Architecture

### 1. Zero Design & Content Alterations (100% Visual Parity)
- **Visual Tokens & Legacy Parity**: All original typography, color tokens (`--plum`, `--rose`, `--blush`, `--gold`, etc.), responsive breakpoints, spacing, and image placements have been strictly preserved.
- **Tailwind CSS & CSS Modules**: Inline legacy CSS from `style.css` is integrated with Tailwind CSS utility classes in `app/globals.css`.

### 2. Full Next.js App Router Structure
- **Core Public Pages**:
  - `app/(public)/page.tsx` (Home)
  - `app/(public)/about/page.tsx` (About Us)
  - `app/(public)/contact/page.tsx` (Contact Us)
  - `app/(public)/gallery/page.tsx` (Gallery with interactive category filtering & lightbox)
  - `app/(public)/patient-info/page.tsx` (Patient Info with interactive FAQ accordion)
- **Dynamic Service & Location Pages**:
  - `app/(public)/treatments/[slug]/page.tsx` (12 comprehensive ART & preservation treatment pages)
  - `app/(public)/infertility/[slug]/page.tsx` (Male & female infertility guides)
  - `app/(public)/locations/[slug]/page.tsx` (20 customized Rajasthan city landing pages)
- **Dynamic Blog Engine**:
  - `app/(public)/blog/page.tsx` (Listing page with live category tabs & instant search)
  - `app/(public)/blog/[slug]/page.tsx` (Dynamic blog posts with TOC anchor scrolling & ISR revalidation)

### 3. Executive CMS & Admin Portal (`/admin`)
- **NextAuth Authentication**: Protected route hierarchy via `app/admin/layout.tsx` and NextAuth credentials strategy.
- **Content Management System**:
  - `/admin/dashboard`: Executive overview with live article counts and recent updates table.
  - `/admin/blogs`: CRUD management table with title/slug search, category/status filters, and interactive delete confirmation modals.
  - `/admin/blogs/create` & `/admin/blogs/edit/[id]`: Dual-mode HTML/Markdown article editor with real-time live preview, file image upload, and SEO tag management.

### 4. Advanced SEO, AEO, and GEO Engine
- **Generative Engine Optimization (GEO)**: Dedicated `<GeoTakeaways />` components embedded across landing pages and articles, optimizing content for Google AI Overviews, ChatGPT, and Perplexity.
- **Answer Engine Optimization (AEO) & JSON-LD**: `<SchemaMarkup />` injecting structured `MedicalClinic`, `Physician`, and FAQ schemas.
- **Automated Sitemaps & Robots**: Dynamic sitemap generator (`app/sitemap.ts`) including all static routes, 35+ service/location pages, and published blog posts, alongside `app/robots.ts`.
- **Legacy URL Redirects**: Preserves legacy SEO equity by mapping `.html` and old folder structures to clean App Router paths in `next.config.js`.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Initialize Database & Seed Content
The project uses SQLite via Prisma. Seed the database with the default admin user and 31 legacy blog posts:
```bash
npx prisma db push
npx prisma db seed
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the live public application.

---

## 🔐 Admin Portal Access

To access the CMS dashboard:
1. Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Sign in using the default seeded admin credentials:
   - **Email:** `admin@kulkiivf.com`
   - **Password:** `admin123`

---

## 📁 Project Structure
```
├── app/
│   ├── (public)/          # Public application layout & page routes
│   ├── admin/             # CMS Admin Dashboard & authentication screens
│   ├── api/               # NextAuth & Blog CRUD API routes
│   ├── globals.css        # Tailwind directives & legacy styling tokens
│   ├── layout.tsx         # Root layout with fonts & SEO metadata
│   ├── sitemap.ts         # Dynamic XML sitemap generator
│   └── robots.ts          # Robots.txt generator
├── components/
│   ├── admin/             # CMS Sidebar, Tables, Forms, and Client layouts
│   ├── layout/            # Header, Footer, and Booking Modal
│   ├── pages/             # Interactive client components for all pages
│   └── seo/               # AEO Schema Markup & GEO Takeaways
├── lib/
│   ├── auth.ts            # NextAuth configuration options
│   ├── prisma.ts          # Singleton Prisma database client
│   └── data/              # Static data dictionaries (Treatments, Infertility, Locations)
├── prisma/
│   ├── schema.prisma      # SQLite database schema (User, BlogPost)
│   └── seed.ts            # Seeding script for 31 blogs and admin user
└── public/assets/         # Static images, logos, and media assets
```

---
*Built with excellence for KULKI IVF Fertility & ART Centre.*

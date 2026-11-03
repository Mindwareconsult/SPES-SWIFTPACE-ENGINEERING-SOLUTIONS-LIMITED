# SPES Swiftpace Engineering Solutions Limited — Corporate Web Platform

A corporate web application and integrated administrative system built for **SPES Swiftpace Engineering Solutions Limited** (RC: 8978524).

---

## 1. Company Information & Brand Identity

- **Company Name:** SPES Swiftpace Engineering Solutions Limited
- **Registration Number:** RC 8978524
- **Registered Headquarters:** Plot 2, Toluwani Street, Peace Avenue, Off Iworoko Road, Ado Ekiti, Ekiti State, Nigeria
- **Official Email:** spesengineeringlimited@gmail.com
- **Telephone Lines:**
  - Primary: `+234 901 075 3592`
  - Secondary: `+234 707 636 5837`
- **WhatsApp Desk:** `https://wa.me/2349010753592`

---

## 2. Platform Architecture

- **Frontend:** React 19 + TypeScript + Tailwind CSS (v4)
- **Design System:** Bespoke dark navy corporate aesthetic (`#06152F`, `#081D43`, `#063B85`, `#12BCEB`, `#078A43`), high-contrast typography, luxury editorial serif headings (`Cormorant Garamond` / `Cinzel`), clean body font (`Plus Jakarta Sans`), and anti-pill discipline.
- **Backend:** Node.js + Express.js full-stack integration (`server.ts`).
- **Database:** SQLite (`data/spes_database.sqlite`) via `better-sqlite3` with WAL mode and automated migration/seeding.
- **Storage:** Local persistent file storage (`uploads/` subdirectories: `projects`, `blog`, `attachments`, `media`).
- **Security:** Password hashing via `bcryptjs`, JWT session cookies (`spes_admin_token`), input validation, anti-bot honeypots, and sanitization.

---

## 3. Public Routes

- `/` — Corporate Homepage (Cinematic hero, 6-discipline showcase, built environment capabilities, featured projects, 6-stage delivery process, why choose SPES, blog feed, FAQ preview, contact CTA)
- `/about` — About Us (Vision, Mission, Core Values, Multidisciplinary Team Structure, Corporate CAC Credentials, Sister company reference context)
- `/services` — Services Directory
- `/services/architecture` — Architecture Discipline
- `/services/building-construction` — Building Construction Discipline
- `/services/civil-structural-engineering` — Civil & Structural Engineering Discipline
- `/services/construction-management` — Construction Management Discipline
- `/services/consultancy` — Technical Consultancy Discipline
- `/services/allied-services` — Allied Services Discipline
- `/portfolio` — Portfolio with Category Filters (Architecture, Building Construction, Civil & Structural, Infrastructure, Commercial & Industrial, Construction Management)
- `/projects/:projectSlug` — Dynamic Case Study (Technical Approach, Scope of Work, Objectives, Outcomes, Gallery Lightbox, Related Projects)
- `/blog` — Engineering Insights & Perspectives with search and category filtering
- `/blog/:articleSlug` — Editorial Reading View (Word count, read time, markdown formatting, social sharing, related insights)
- `/blog/category/:categorySlug` — Category-filtered blog view
- `/contact` — Contact Desk & Project Brief Form (Support for CAD/PDF drawing uploads up to 15MB, interactive contact details, WhatsApp direct, phone links)
- `/faq` — Categorized FAQ (20 questions across Company, Services, Project Engagement, and General Enquiries)
- `/privacy-policy` — NDPA-compliant data privacy disclosures
- `/terms-and-conditions` — Professional engineering engagement terms

---

## 4. Administration System

Access URL: `/admin` or `/admin/login`

### Default Initial Credentials:
- **Username / Email:** `spesadmin` or `spesengineeringlimited@gmail.com`
- **Initial Password:** `AdminSecure2026!`
*(Administrators can update this password in the Settings section at any time).*

### Administrative Capabilities:
1. **Dashboard (`/admin/dashboard`):** Real-time project counts, published/draft status, blog metrics, total/new client enquiries, and recent submission logs.
2. **Projects Manager (`/admin/projects`):** Create, edit, publish/unpublish, and delete projects. Upload cover and multiple gallery images, set scope of work, technical approach, and featured status.
3. **Blog Manager (`/admin/blog`):** Draft, edit, publish/unpublish technical articles with markdown content, excerpts, categories, author bylines, and SEO metadata.
4. **Client Enquiries (`/admin/enquiries`):** Comprehensive inquiry review, search and filtering by service/status (New, Contacted, In Discussion, Quoted, Converted, Closed), internal notes management, attachment downloading, and CSV export.
5. **Media Library (`/admin/media`):** Centralized asset upload, file URL copying, and management.
6. **Settings (`/admin/settings`):** Update company phone numbers, email, headquarters address, WhatsApp hotlines, and administrator password.

---

## 5. Deployment Instructions

1. Ensure Node.js 20+ is installed on the host.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build frontend assets:
   ```bash
   npm run build
   ```
4. Start the full-stack server:
   ```bash
   npm start
   ```
5. SQLite database files and uploads are stored in `./data/` and `./uploads/`. Ensure these directories reside on persistent disk volumes.

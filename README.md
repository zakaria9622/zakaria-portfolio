# Zakaria Maachou — Marketing Data Analytics Portfolio

Recruiter-facing portfolio for a Marketing Data Analyst working across growth, acquisition, conversion, retention, CRM and revenue quality.

**Positioning:** Marketing Data Analyst | Growth, Acquisition, Conversion & Retention
**Live site:** https://www.zakariamaachou.com

## Editorial Growth Lab

The visual system combines premium editorial publishing with analytical evidence and marketing decision-making:

- warm paper, carbon ink and signal blue
- Newsreader display typography
- DM Sans body typography
- IBM Plex Mono labels, evidence registers and data annotations
- asymmetric publication layouts instead of dashboard-card grids
- decision traces that connect a business question, observed evidence, diagnosis and action
- analytical signatures tailored to each case study

The previous Three.js hero and its WebGL dependencies were removed. The current atmosphere is created with typography, rules, spacing and lightweight CSS.

## Architecture

### Homepage

`src/app/page.tsx` is a Server Component that composes:

- editorial hero and decision trace
- evidence ledger
- professional experience progression
- four distinct project treatments
- growth decision system
- capability-to-evidence index
- education progression
- contact close

Static sections render on the server. Client boundaries are limited to interactions that require them, including hero motion, the experience accordion, header navigation and image lightboxes.

### Project publications

All four routes use the shared server-rendered `ProjectDetail` architecture:

- project hero and decision brief
- evidence exhibit
- project-specific analytical signature
- findings and recommendations
- methodology and quality record
- disclosure and limitations
- inspectable repository artifacts
- next-case navigation

`ProjectChapterNav` and `ProjectImageLightbox` are the focused client components for chapter state and accessible modal behavior.

### Content and evidence

`src/data/projects.ts` is the source of truth for project claims, KPIs, dataset disclosures, methodology, limitations and artifact links. Structured data is generated from the same project records.

The portfolio does not present independent work as client engagements or production impact. Synthetic datasets and external-data limitations are identified on the relevant project pages.

## Case Studies

- [E-commerce Funnel Analysis](https://www.zakariamaachou.com/projects/funnel-analysis)
- [Customer Segmentation RFM](https://www.zakariamaachou.com/projects/rfm-segmentation)
- [E-commerce Profit Leak Analysis](https://www.zakariamaachou.com/projects/profit-leak)
- [RenewalOS — Revenue Quality & Account Health](https://www.zakariamaachou.com/projects/renewalos)

## Accessibility and Motion

- semantic landmarks and one primary page heading per route
- skip link and visible keyboard focus
- keyboard-operable navigation, accordion and lightboxes
- focus containment and focus restoration for modal images
- Escape-key dismissal
- reduced-motion behavior through CSS and Framer Motion
- responsive layouts from narrow mobile widths through large desktop viewports
- descriptive alternative text for analytical evidence

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React
- Sharp through Next.js for Open Graph asset generation

Fonts are loaded with `next/font`, self-hosted by the application and limited to Newsreader, DM Sans and IBM Plex Mono.

## Metadata and Social Preview

The site includes:

- route-specific titles, descriptions and canonical URLs
- Open Graph and Twitter metadata
- WebSite, Person and CreativeWork JSON-LD
- generated sitemap and robots metadata
- 1200×630 Editorial Growth Lab social-preview images

Regenerate the existing Open Graph assets without changing their URLs:

```bash
node scripts/generate-og-images.mjs
```

## Local Development

### Prerequisites

- Node.js
- npm

### Install

```bash
git clone https://github.com/zakaria9622/zakaria-portfolio.git
cd zakaria-portfolio
npm ci
```

### Run

```bash
npm run dev
```

Open http://localhost:3000.

### Validate and run the production build

```bash
npm run lint
npm run build
npm run start
```

## Repository Structure

```text
src/
├── app/                  # routes, metadata, sitemap, robots and global CSS
├── components/
│   ├── home/             # Editorial Growth Lab homepage sections
│   ├── layout/           # shared header and footer
│   ├── project/          # shared project publication architecture
│   └── ui/               # shared social icons
├── data/                 # profile, experience, education, skills and projects
└── lib/                  # project structured-data builder

public/
├── og/                   # route-specific 1200×630 social previews
├── projects/             # analytical evidence images
└── cv-zakaria-maachou.pdf
```

## Deployment

The application is configured for a standard Next.js production build and is deployed on Vercel at the custom domain above.

## Contact

- LinkedIn: https://www.linkedin.com/in/zakaria-maachou
- GitHub: https://github.com/zakaria9622

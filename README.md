# HIPAA Analyzer

HIPAA Analyzer is a Next.js web application that evaluates a website’s privacy policy against HIPAA-focused compliance requirements and generates a structured report with findings, priorities, recommendations, and audit history.

## What this project does

- Accepts a target website URL
- Discovers and scrapes privacy policy content
- Evaluates policy text against HIPAA requirement categories
- Classifies each requirement as **present**, **partial**, or **missing**
- Highlights critical, important, and recommended actions
- Generates downloadable PDF compliance reports
- Records audit trail events for each compliance run
- Provides a debug mode with processing and matching details

## HIPAA coverage in this app

The checker analyzes requirements across key HIPAA categories used by the project:

- Administrative Safeguards
- Physical Safeguards
- Technical Safeguards
- Individual Rights
- Privacy Practices
- Breach Notification

## Core user experience

1. Enter a website URL in the analyzer
2. Run compliance analysis
3. Review results across tabs:
   - Overview
   - Compliance Analysis
   - Audit Trail
   - HIPAA Standards
   - Full Report
   - Debug (optional)
4. Export the report as PDF

## Tech stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS, shadcn/ui, Radix UI
- **Parsing/Scraping:** Cheerio
- **PDF Export:** jsPDF

## Key application areas

- `app/page.tsx` – main analyzer UI and workflow
- `app/api/check-compliance/route.ts` – compliance execution API
- `app/api/audit-trail/route.ts` – audit trail retrieval
- `app/api/export-pdf/route.ts` – PDF export endpoint
- `app/lib/privacy-scraper.ts` – privacy-policy discovery and extraction
- `app/lib/hipaa-checker.ts` – HIPAA rule evaluation engine
- `app/lib/audit-logger.ts` – in-memory audit logging

## Local development

### Prerequisites

- Node.js 18+
- npm

### Install and run

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

### Available scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Notes

- Audit logs are stored in-memory in the current implementation.
- Lint may prompt for initial ESLint setup if config is not yet generated.

## Deployed Link

https://vercel.com/adhus-projects-61dfb00d/v0-new-project-qfgpbue5alg

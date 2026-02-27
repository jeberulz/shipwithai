# ContentWorkshop

A high-conversion workshop landing page for the Obsidian + Claude Code bootcamp, built with Next.js 15, Supabase, and Radix UI.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-3.x-green?style=flat&logo=supabase)

## Overview

ContentWorkshop is a modern, performance-optimized landing page designed to convert visitors into workshop attendees. It features:

- **Workshop Landing Page** — Countdown timer, social proof, FAQ accordion
- **Blog** — Markdown-powered content with SEO optimization
- **Admin Dashboard** — Manage workshop registrations
- **Email Integration** — Beehiiv API for newsletter signup
- **Analytics** — Google Analytics + Meta Pixel tracking
- **SEO** — Full structured data (FAQPage, Organization, EducationEvent)

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Radix UI primitives
- **Database:** Supabase (PostgreSQL)
- **Content:** Markdown with remark
- **Deployment:** Vercel

## Project Structure

```
shipwithai/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (registrations, etc.)
│   ├── admin/             # Admin dashboard
│   ├── blog/              # Blog posts (markdown)
│   ├── apply-page/        # Workshop application
│   └── bootcamp/          # Bootcamp pages
├── components/            # Reusable UI components
├── lib/                   # Utilities & Supabase client
├── content/               # Markdown blog content
└── public/                # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Supabase project (for production)

### Installation

```bash
# Clone the repository
git clone https://github.com/jeberulz/shipwithai.git
cd shipwithai

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Site URL (use www for proper SEO)
NEXT_PUBLIC_SITE_URL=https://www.designandcodewithai.com

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Beehiiv (newsletter)
BEEHIIV_API_KEY=your_beehiiiv_api_key
BEEHIIV_PUBLICATION_ID=your_publication_id
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

## Features

### SEO & Structured Data

- Canonical URL optimization
- OpenGraph + Twitter Cards
- JSON-LD for Organization, FAQPage, EducationEvent
- Automatic sitemap.xml & robots.txt

### Workshop Registration

- Email capture with validation
- Supabase storage for leads
- Beehiiv newsletter integration
- Admin panel for management

### Blog System

- Markdown-based content
- Auto-generated slugs
- Reading time estimation
- Related posts (future enhancement)

## Deployment

### Vercel (Recommended)

```bash
# Connect your GitHub repo to Vercel
# Add environment variables in Vercel dashboard
# Deploy automatically on push to main
```

### Environment Setup

For production, ensure `NEXT_PUBLIC_SITE_URL` is set to `https://www.designandcodewithai.com` (with www) to avoid canonical URL conflicts.

## Contributing

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

Private — All rights reserved.

## Contact

- **Instructor:** John Iseghohi
- **Twitter:** [@mrjeberulz](https://twitter.com/mrjeberulz)
- **Website:** [designandcodewithai.com](https://www.designandcodewithai.com)
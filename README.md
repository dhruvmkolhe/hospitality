# Hearth & Harbor Inn

A cinematic, editorial web application for a coastal boutique inn on Cape Meridian, Maine. Built with Next.js 16, React 19, Tailwind CSS, and designed with a two-sided ledger for guest reservations and innkeeper desk operations.

---

## Features

- **Guest Experience**:
  - **Chambers**: Explore rooms, suites, and cottages with rich photo galleries and amenity details.
  - **Book a Stay**: Request reservations with dynamic night and rate calculations.
  - **Dining & Wellness**: Menus and atmosphere for *The Tide Table* restaurant and cedar soakhouse.
  - **Find a Stay**: Look up reservations by confirmation code (`HH-XXXXXX`) or email.
- **Innkeeper Desk**:
  - **The Book**: Manage bookings (Confirm, Cancel, Check Out).
  - **Chambers**: Toggle room availability (On the book / Held).
  - **Letters**: Review and file away incoming guest inquiries.
- **GitHub Pages Ready**:
  - Fully static export (`output: 'export'`) with client-side persistence (`localStorage`).
  - Automated deployment workflow via GitHub Actions.

---

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **UI & Styling**: [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/)
- **Typography**: Cormorant Garamond & Outfit
- **Database / ORM**: [Drizzle ORM](https://orm.drizzle.team/) with SQLite / LibSQL support
- **Hosting**: GitHub Pages

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port specified in terminal) in your browser.

### 3. Build for Production

```bash
npm run build
```

This generates a static build in the `out/` directory ready for deployment.

---

## Deployment to GitHub Pages

This repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`):

1. Go to your repository **Settings** on GitHub.
2. Navigate to **Pages** in the left sidebar.
3. Under **Build and deployment** &rarr; **Source**, select **GitHub Actions**.
4. Pushing to `main` will automatically build and publish your site.

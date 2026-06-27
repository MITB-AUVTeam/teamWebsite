# AUV MIT Bengaluru — Team Website

The official website for the Autonomous Underwater Vehicle team at MIT Bengaluru. It serves as a public-facing presence for the team, covering the vehicle, team members, media articles, gallery, sponsors, and contact information.

---

## Pages

- **Home** — Landing page with an overview of the team and its work.
- **About** — Background on the team, its mission, and subsystems.
- **Vehicles** — Details on the AUV builds.
- **Team** — Member profiles organized by subsystem (Mechanical, Electrical, Software, Design, Management).
- **Gallery** — Photo gallery from competitions and build sessions.
- **Media** — Written articles and technical writeups authored by team members.
- **Sponsors** — Current and past sponsors.
- **Contact** — Contact form powered by EmailJS.

---

## Tech Stack

- **React 19** with **TypeScript**
- **Vite** (build tool, dev server runs on port 3000)
- **Tailwind CSS v4** (styling)
- **Framer Motion** and **GSAP** (animations)
- **React Router v7** (client-side routing)
- **Radix UI** and **Shadcn UI** (component primitives)
- **Lenis** (smooth scrolling)
- **EmailJS** (contact form)
- **Vercel Analytics** (deployed on Vercel)

---

## Project Structure

```
src/
  pages/        # One file per route
  components/   # Reusable UI components and layout pieces
  assets/       # Images, team photos, sponsor logos
```

---

## Getting Started

**Prerequisites:** Node.js installed.

```bash
# Clone the repo
git clone <repo-url>
cd teamWebsite

# Install dependencies
npm install

# Start the dev server
npm run dev
# Opens at http://localhost:3000
```

**Production build:**
```bash
npm run build
```

**Type check:**
```bash
npm run lint
```

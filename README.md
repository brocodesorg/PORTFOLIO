# BROCODE — Creative Engineering & 3D Web Studio

An ultra-premium, award-winning 3D scroll-animated portfolio template built for startup **BROCODE** (written **BRO CODES** in copy where natural). Engineered with Next.js 14 App Router, Three.js / React Three Fiber, GSAP ScrollTrigger, Lenis smooth scroll, and Tailwind CSS. Fully static export optimized for instant deployment on Render.

---

## 🌟 Key Features

- **Award-Winning Visual Direction**: High-contrast, cinematic brutalist aesthetic with signature hot-pink (`#EC4899`) and cyber-cyan (`#0891B2`) accents.
- **Hero Silhouette & Depth Layering**:
  - Silhouette photo located at `public/images/hero.png` with `mix-blend-mode: multiply` on an ultra-clean light canvas.
  - Giant edge-to-edge `BROCODE` typography positioned behind the figure.
  - Floating 3D WebGL particles & wireframes orbiting the figure.
  - Independent mouse parallax for text, photo silhouette, and 3D particles.
  - Cinematic scroll transition scaling into the dark manifesto section.
- **Scrubbed Manifesto & Counters**: Large typography revealed word-by-word with GSAP ScrollTrigger, plus animated numeric counters for projects, clients, wins, and active users.
- **Pinned Interactive 3D Lab**: Real-time WebGL scene with a morphing parametric Torus-Knot, interactive material modes (*Cyber Core, Optical Glass, Titanium Chrome, Wireframe*), spectral color switcher, and 360° drag rotation.
- **3D Tilt Service Cards**: Interactive cards with cursor-follow radial spotlight glow, feature matrices, and Lucide SVG icons (no emojis).
- **Pinned Horizontal Scroll Gallery**: 5 demo projects (*NeuroLink AI, CryptoVault, FitPulse, CloudFlow, EcoTracker*) with generative SVG visual mockups, parallax image tracking, and live preview badges.
- **Glowing Milestone Timeline**: Animated SVG laser path that draws itself on scroll, highlighting awards (*Awwwards Candidate, Hackathon Champion, ProductHunt #1*).
- **Infinite Dual Marquee**: Smooth dual-row tech stack marquee with hover-pause functionality.
- **Draggable Testimonial Carousel**: Swipeable/draggable testimonials with spring physics, rating stars, and custom navigation controls.
- **High-Fidelity Contact Section**: Interactive project inquiry form with validation, transmission animation, confetti explosion (`canvas-confetti`), social links, and giant scroll-revealed footer wordmark.
- **Performance & Polish**:
  - Silky 60fps with capped DPR (`[1, 1.5]`) and offscreen resource cleanup.
  - Custom lerping cursor with hover morphing and mix-blend difference.
  - Awwwards-style load preloader with 0-100% counter and curtain split reveal.
  - Lenis smooth scroll synchronized with GSAP ScrollTrigger.
  - Full keyboard accessibility and `prefers-reduced-motion` compliance.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Static Export `output: 'export'`)
- **3D & Graphics**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **Animation & Scroll**: [GSAP 3](https://greensock.com/gsap/) (ScrollTrigger), [Lenis](https://lenis.darkroom.engineering/) (Smooth Scroll), [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), PostCSS, Autoprefixer
- **Icons**: [Lucide React](https://lucide.dev/) (Strict SVG standard, 0 emojis)
- **Effects**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Typography**: Google Fonts (*Archivo* display font + *Space Grotesk* body font)

---

## 📁 Project Structure

```
├── app/
│   ├── content.ts               # Centralized editable data (projects, copy, stats, socials)
│   ├── globals.css              # Custom styling, grid, grain, outlines, scrollbars
│   ├── layout.tsx               # Root layout, fonts, SEO & OpenGraph metadata
│   └── page.tsx                 # Master page assembling all animated sections
├── components/
│   ├── canvas/
│   │   ├── HeroCanvas3D.tsx     # 3D floating particles & wireframe shapes
│   │   └── ShowcaseCanvas3D.tsx # 3D morphing Torus-Knot with materials & orbit controls
│   ├── layout/
│   │   └── Navbar.tsx           # Floating glassmorphism nav with magnetic CTA
│   ├── providers/
│   │   └── SmoothScrollProvider.tsx # Lenis + GSAP ScrollTrigger synchronizer
│   ├── sections/
│   │   ├── HeroSection.tsx      # First screen, photo silhouette, parallax & mask reveal
│   │   ├── AboutManifestoSection.tsx # Scrubbed word-by-word reveal & animated stats
│   │   ├── ShowcaseSection.tsx  # Pinned 3D interactive laboratory
│   │   ├── ServicesSection.tsx  # 3D tilt cards with cursor-follow spotlight glow
│   │   ├── ProjectsSection.tsx  # Pinned horizontal scroll gallery (5 projects)
│   │   ├── AchievementsSection.tsx # Glowing SVG timeline drawn on scroll
│   │   ├── TechStackSection.tsx # Infinite dual-row marquee with hover pause
│   │   ├── TestimonialsSection.tsx # Draggable review carousel with gesture support
│   │   └── ContactSection.tsx   # Climax CTA, form with confetti & giant footer wordmark
│   └── ui/
│       ├── CustomCursor.tsx     # Trailing lerped dot & ring cursor
│       ├── MagneticButton.tsx   # Physics-based magnetic hover button
│       ├── Preloader.tsx        # 0-100% counter with curtain reveal
│       └── ProgressBar.tsx      # Top viewport scroll progress indicator
├── design-system/
│   └── brocode/
│       └── MASTER.md            # Design system tokens and specifications
├── public/
│   └── images/
│       ├── hero.png             # Backlit silhouette photo with mix-blend-mode: multiply
│       └── projects/            # Custom generative SVG visuals for all 5 projects
├── next.config.js               # Configured with output: 'export' for static hosting
├── render.yaml                  # Automated Static Site deployment blueprint for Render
└── tailwind.config.js           # Extended theme with design system tokens
```

---

## 🚀 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Static Export
```bash
npm run build
```
This generates the optimized static build inside the `out/` directory.

---

## ☁️ Deployment on Render

This project is configured as a **Static Site** on Render.

### Option A: Render Blueprint (Recommended)
1. Push this repository to GitHub or GitLab.
2. In the Render Dashboard, click **New +** &rarr; **Blueprint**.
3. Select your repository. Render will automatically read `render.yaml` and configure:
   - **Type**: Static Site
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `out`
   - **SPA Rewrite Rule**: Redirect `/*` &rarr; `/index.html`
4. Click **Apply**.

### Option B: Manual Static Site
1. In the Render Dashboard, click **New +** &rarr; **Static Site**.
2. Connect your Git repository.
3. Set the following settings:
   - **Name**: `brocode-portfolio`
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `out`
4. In **Redirects / Rewrites**, add:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite`
5. Click **Create Static Site**.

---

## ✏️ How to Customize Your Portfolio

All text, statistics, case studies, client reviews, and social handles are located in a single file:
👉 **[app/content.ts](file:///c:/Users/ASUS/OneDrive/Desktop/COMPANY/PORTFOLIO/app/content.ts)**

- **Replace Hero Photo**: Place your silhouette photo at `public/images/hero.png`. The `mix-blend-mode: multiply` automatically makes pure white backgrounds transparent so your silhouette sits over the giant typography.
- **Update Company & Taglines**: Edit `siteContent.company` in `app/content.ts`.
- **Update Projects**: Edit `siteContent.projects` in `app/content.ts`.
- **Update Achievements**: Edit `siteContent.achievements` in `app/content.ts`.
- **Update Contact Info**: Edit `siteContent.contact` and `siteContent.socials` in `app/content.ts`.

# Budhanilkantha Villa

the first image is the design and other pictures should be used same like in the design and here's the prompt:
# CONTEXT & ASSETS

I have uploaded:

1. A design reference image (the screenshot of the villa page).

2. Multiple high-res villa photos (interior/exterior) to use as hero background, about image, and gallery.

I want you to build the **Budhanilkantha Villa** landing page using these exact assets and the layout described below.

# TECH STACK

- Next.js 15 (App Router) + React 19

- Strict TypeScript (no `any`)

- Tailwind CSS (mobile-first)

- lucide-react for icons (stroke-width: 1.5)

- No backend/API routes needed for this page (form can just log to console or show a success toast).

# EXACT COLOR PALETTE (Use these hex values only)

- Deep dark (Hero/Footer base): `#0F181B`

- Sage Green (Stat strip, buttons, form background): `#2B382B`

- Gold Accent (Highlights, icons, active states, gold buttons): `#C5A059`

- Cream White (About section background): `#F7F6F0`

- Near Black (Footer): `#0A0D0E`

- Text on dark: White with `60-80%` opacity. Text on light: `#0F181B` with `70%` opacity.

# TYPOGRAPHY

- Headings: Playfair Display (serif, bold/italic)

- Body & UI: Inter (sans-serif)

# LAYOUT & SECTION INSTRUCTIONS (Build strictly in this order)

## 1. NAVBAR (Fixed top, transparent with blur)

- **Left**: A small minimalist leaf logo icon + two-line brand text: `BUDHANILKANTHA` / `VILLA`.

- **Center**: Links: `Home`, `About Us`, `Gallery`, `Location`, `Contact`. Active state has a gold underline (`#C5A059`).

- **Right**: A filled green (`#2B382B`) CTA button labeled "Book a Visit".

## 2. HERO SECTION (Full viewport height, background `#0F181B`)

- Use **one of the uploaded villa exterior images** as the background, placed on the right side (or full-screen with a dark gradient overlay on the left).

- **Left-aligned content** (vertically centered):

  - Eyebrow: `LUXURY VILLA IN BUDHANILKANTHA` (Gold text, wide letter-spacing).

  - Main Headline: `Live Close to Nature, Live in` + `<span style="color:#C5A059">Luxury</span>`.

  - Subtitle: `Experience the perfect blend of modern architecture, natural beauty and world-class comfort in the serene hills of Budanilkantha, Kathmandu.`

  - Two CTAs side-by-side: 

    - Primary: "Book a Private Visit" (Gold background `#C5A059`, white text).

    - Secondary: "Explore Villa" (White outline, transparent).

  - Bottom: Pin icon + `Budanilkantha, Kathmandu, Nepal`.

## 3. STAT STRIP (Full-width bar, background `#2B382B`)

- Exactly **5 equal columns** in a single row.

- Each column has: a Gold icon (top), a bold title, and a one-line description.

- Content:

  1. Scenic Surroundings – Peaceful views of hills and lush greenery

  2. Secure & Private – 24/7 security in a gated community

  3. Premium Living – Spacious rooms with modern architecture

  4. Eco Friendly – Sustainable living with green environment

  5. Prime Location – Close to schools, temples and main roads

## 4. ABOUT / OVERVIEW (Background `#F7F6F0`, padding 80px)

- **2-column grid** (60% text / 40% image).

- **Left Column**:

  - Eyebrow: `ABOUT THE VILLA` (dark green, tracked).

  - Serif Heading: `Thoughtfully Designed for a Better Lifestyle`.

  - Description: `Every corner of this villa is crafted with attention to detail, offering the perfect space for relaxation, privacy and quality family time.`

  - Specs displayed as a clean 2-column grid:

    - Land Area: 12 Aana (Built-up: 6,500 sq.ft.)

    - Bedrooms: 5

    - Bathrooms: 6

    - Living Rooms: 2

    - Parking: 3 Cars

  - *Do not add a "View All Features" button here.*

- **Right Column**:

  - Use **one of the uploaded interior villa images** (portrait orientation).

  - Overlay a floating circular "Watch Video Tour" play button (glassmorphism effect, gold accent) centered on the image.

## 5. AMENITIES (White background, centered)

- Eyebrow: `AMENITIES` (dark green, tracked).

- Subtitle: `Everything You Need for a Comfortable Life`.

- Display **8 amenities** in a responsive grid (4 columns on desktop, 2 on tablet, 1 on mobile):

  1. Landscaped Garden

  2. Swimming Pool

  3. Rooftop Terrace

  4. Modern Kitchen

  5. Home Theater

  6. 24/7 Security

  7. Power Backup

  8. Wi-Fi Connectivity

- Use a relevant Lucide icon for each.

## 6. GALLERY PREVIEW (Light gray or white background)

- Centered eyebrow: `GALLERY`.

- Render a **horizontal scrollable strip** (`flex overflow-x-auto`) containing all the uploaded villa photos (interior/exterior/night shots).

- Each image should have a subtle hover zoom effect.

- Below the strip, add a link/button: `View Full Gallery →` (use gold or green styling).

## 7. LOCATION + BOOKING (Combined Dark Dual-Panel, background `#0F181B`)

- **2-column grid** (50% / 50%).

- **Left Panel (Location)**:

  - Eyebrow: `LOCATION` (Gold).

  - Heading: `Budanilkantha, Kathmandu`.

  - Description: `A peaceful and prestigious area with easy access to schools, temples, shopping and the city.`

  - Distance markers (Gold bullets or icons):

    - Budanilkantha Temple – 2 mins

    - Ring Road – 5 mins

    - Airport – 25 mins

    - Thamel – 20 mins

  - Place a dark/cream styled Leaflet map placeholder (static card).

- **Right Panel (Booking Form)**:

  - Background: `#2B382B` with rounded corners.

  - Title: `BOOK A PRIVATE VISIT`.

  - Subtitle: `We would love to show you around. Fill out the form and we will get back to you.`

  - Form fields: `Your Name`, `Phone Number`, `Email Address`, `Preferred Date`, and a `Message` textarea.

  - Submit Button: Full width, Gold background (`#C5A059`), text "Submit Request" with a trailing arrow.

  - *Functionality*: On submit, just show a success toast/alert (no actual API integration needed for this version).

## 8. FOOTER (Background `#0A0D0E`)

- 3-column layout:

  - **Left**: Small logo + `Budhanilkantha Villa` brand name.

  - **Center**: Copyright text (e.g., `© 2026 Budhanilkantha Villa. All rights reserved.`).

  - **Right**: `Privacy Policy | Terms & Conditions` + social media icons (Facebook, Instagram, WhatsApp).

# IMAGE USAGE RULES

- Hero: Use the widest, most scenic uploaded exterior image. Apply a dark gradient overlay so the white text is readable.

- About: Use an uploaded interior or architectural detail image.

- Gallery: Use **all** remaining uploaded images in the horizontal scroll strip.

- Do NOT use unsplash or placeholder URLs unless explicitly told. Use the provided assets via Next.js `<Image>` with `priority` on the hero.

# ANIMATIONS (GSAP / Framer Motion - Optional but desired)

- Add subtle fade-up reveals for the Hero text and About section when they scroll into view.

- Keep animations smooth and elegant, not flashy.

# OUTPUT REQUIREMENTS

Generate the complete code for `app/page.tsx` and the required components (Navbar, Hero, StatStrip, About, Amenities, Gallery, LocationBooking, Footer). Ensure all Tailwind classes use the exact hex colors provided. Do not generate other pages (About, Gallery, Contact, etc.)—just this homepage.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e05f6044-03a0-4b0d-95c9-e11b94bbdd8d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

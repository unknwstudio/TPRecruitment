# TPRecruitment

Landing page for TPRecruitment — Tiffany Philippou's personal recruitment practice.

## Stack

| Layer | Technology |
|---|---|
| Framework | [React 19](https://react.dev/) |
| Language | TypeScript |
| Build tool | [Vite 8](https://vite.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Fonts | GT Canon Trial · GT Pressura Mono Trial · Seaweed Script |
| Design source | Figma |

## Getting started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Available scripts

```bash
npm run dev       # Start dev server with hot reload
npm run build     # Type-check + build for production (output: dist/)
npm run preview   # Serve the production build locally
```

## Project structure

```
src/
  App.tsx         # All sections and components (single-file layout)
  index.css       # Tailwind import, font-face declarations, CSS variables
  main.tsx        # React entry point
public/
  assets/         # Partner logos and icons (downloaded from Figma)
  fonts/          # GT Canon Trial, GT Pressura Mono Trial
  TP_logo.svg     # Navbar logo
  *.svg           # Checkbox / icon assets
  photo_*.jpeg    # Testimonial photos
```

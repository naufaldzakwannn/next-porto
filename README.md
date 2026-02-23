# 🎨 Modern Portfolio Template — Next.js

## Cara Setup

```bash
npx create-next-app@latest my-portfolio --typescript --tailwind --app
cd my-portfolio
npm install framer-motion
```

Lalu copy semua file dari folder ini ke dalam project Next.js kamu.

## Struktur File

```
app/
  page.tsx          ← Homepage utama
  layout.tsx        ← Layout dengan font
  globals.css       ← CSS global + custom styles
components/
  Navbar.tsx
  Hero.tsx
  About.tsx
  Projects.tsx
  Skills.tsx
  Contact.tsx
  Footer.tsx
```

## Kustomisasi

1. Edit `data/portfolio.ts` untuk mengubah konten
2. Ganti foto di folder `public/`
3. Ubah warna di `globals.css` (CSS variables)

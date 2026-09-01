# TJKT SMKN 2 Lubuk Basung

Website promosi dan informasi Program Keahlian Teknik Jaringan Komputer dan Telekomunikasi (TJKT) SMKN 2 Lubuk Basung.

Project ini dibuat sebagai website static React + Vite. Seluruh konten dan aset utama berada di artifact `artifacts/tjkt-website`, sedangkan konfigurasi workspace dan deployment berada di root repository.

## Teknologi

- React 19 + TypeScript
- Vite 7
- Wouter untuk routing halaman
- GSAP + ScrollTrigger untuk animasi berbasis scroll
- Lenis untuk smooth scrolling desktop
- pnpm workspace
- Vercel static deployment

## Menjalankan di Visual Studio Code

### 1. Prasyarat

Install software berikut:

- Node.js 20 atau versi lebih baru
- Visual Studio Code
- Git
- pnpm 10

Cek instalasi:

```bash
node --version
pnpm --version
git --version
```

Jika pnpm belum tersedia, aktifkan melalui Corepack:

```bash
corepack enable
corepack prepare pnpm@10.26.1 --activate
```

### 2. Clone repository

```bash
git clone https://github.com/Reyhan-irza/TJKT.git
cd TJKT
code .
```

Jika perintah `code` belum dikenali, buka folder repository melalui menu **File > Open Folder** di Visual Studio Code.

### 3. Install dependency

Jalankan terminal baru di Visual Studio Code, kemudian:

```bash
pnpm install
```

### 4. Jalankan website dalam mode development

```bash
pnpm --filter @workspace/tjkt-website run dev
```

Buka alamat yang ditampilkan Vite di terminal. Untuk menghentikan server, tekan `Ctrl + C`.

### 5. Perintah penting

```bash
# Menjalankan website TJKT
pnpm --filter @workspace/tjkt-website run dev

# Memeriksa TypeScript
pnpm --filter @workspace/tjkt-website run typecheck

# Membuat production build website
pnpm --filter @workspace/tjkt-website run build

# Menjalankan seluruh typecheck workspace
pnpm run typecheck

# Build seluruh workspace
pnpm run build
```

Hasil production website berada di:

```text
artifacts/tjkt-website/dist/public
```

## Struktur project

```text
artifacts/tjkt-website/
├── public/                  # gambar, logo, favicon, dan aset statis
├── src/
│   ├── components/          # shell, header, footer, error state, UI
│   ├── data/                # konten website dan referensi media
│   ├── pages.tsx            # halaman dan section utama
│   ├── App.tsx              # router aplikasi
│   ├── index.css            # design system dan responsive layout
│   └── main.tsx             # entry point React
├── index.html
├── package.json
├── vercel.json              # fallback SPA jika artifact dideploy mandiri
└── vite.config.ts
```

Animasi global dikelola di `src/components/site-shell.tsx`:

- Intro animation hanya berjalan saat halaman siap.
- ScrollTrigger mengelola reveal, parallax, counter, story pinning, dan CTA motion.
- Lenis hanya aktif di desktop untuk menjaga touch scrolling tetap responsif di mobile.
- `prefers-reduced-motion` menonaktifkan motion yang tidak perlu.
- Semua trigger, listener, tween, dan refresh handler dibersihkan saat route berganti.

## Deploy ke Vercel

Repository sudah memiliki `vercel.json` di root dengan konfigurasi:

- Build command: `pnpm --filter @workspace/tjkt-website run build`
- Output directory: `artifacts/tjkt-website/dist/public`
- Install command: `pnpm install --frozen-lockfile`
- SPA rewrite ke `index.html` untuk deep link Wouter

### Deploy melalui dashboard Vercel

1. Masuk ke Vercel.
2. Pilih **Add New > Project**.
3. Import repository `Reyhan-irza/TJKT`.
4. Biarkan **Root Directory** menggunakan root repository.
5. Vercel akan membaca `vercel.json` secara otomatis.
6. Klik **Deploy**.

Tidak ada environment variable yang diperlukan karena website ini bersifat static dan tidak menggunakan backend/API eksternal.

### Deploy melalui Vercel CLI

Dari root repository:

```bash
pnpm dlx vercel
pnpm dlx vercel --prod
```

Sebelum deploy, pastikan build lokal berhasil:

```bash
pnpm --filter @workspace/tjkt-website run typecheck
pnpm --filter @workspace/tjkt-website run build
```

## Troubleshooting

### Dependency gagal ter-install

Pastikan versi Node dan pnpm sesuai, lalu ulangi:

```bash
corepack enable
corepack prepare pnpm@10.26.1 --activate
pnpm install
```

### Route internal menampilkan 404 setelah deploy

Pastikan project Vercel memakai root repository sebagai **Root Directory** sehingga `vercel.json` root terbaca. Konfigurasi rewrite SPA sudah disediakan untuk halaman seperti `/tentang`, `/pembelajaran`, `/fasilitas`, dan `/kontak`.

### Animasi terasa terlalu berat

Gunakan perangkat dengan `prefers-reduced-motion` aktif untuk mode motion minimal. Pada perangkat mobile, Lenis memang sengaja tidak digunakan; scrolling native dipertahankan agar tetap ringan dan responsif.

## Lisensi dan aset

Konten, identitas sekolah, dan aset visual website dipertahankan untuk kebutuhan website TJKT SMKN 2 Lubuk Basung.
# TJKT SMKN 2 Lubuk Basung

Website promosi dan informasi Program Keahlian Teknik Jaringan Komputer dan Telekomunikasi (TJKT) SMKN 2 Lubuk Basung.

Project ini dibuat sebagai website static React + Vite. Seluruh konten dan aset utama berada di `artifacts/tjkt-website`, sedangkan konfigurasi workspace, lockfile, dan deployment berada di root repository. Repository sudah dirapikan agar hanya website TJKT yang ikut dalam build Vercel.

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
- pnpm 10.26.1

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
pnpm --version
```

Versi pnpm yang tampil sebaiknya `10.26.1`. Jangan menjalankan `npm install` atau `yarn install` di repository ini karena project menggunakan `pnpm-lock.yaml`.

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
pnpm dev
```

Buka alamat yang ditampilkan Vite di terminal. Untuk menghentikan server, tekan `Ctrl + C`.

### 5. Perintah penting

```bash
# Menjalankan website TJKT
pnpm dev

# Memeriksa TypeScript
pnpm run typecheck

# Membuat production build website
pnpm run build

# Menjalankan perintah langsung pada package website
pnpm --filter @workspace/tjkt-website run dev
pnpm --filter @workspace/tjkt-website run typecheck
pnpm --filter @workspace/tjkt-website run build
```

### 6. Simulasi production sebelum deploy

Jalankan pemeriksaan lengkap dari root repository:

```bash
pnpm install --frozen-lockfile
pnpm run typecheck
pnpm run build
```

Untuk melihat hasil build seperti preview production:

```bash
pnpm --filter @workspace/tjkt-website run serve
```

Hasil production website berada di:

```text
artifacts/tjkt-website/dist/public
```

Sebelum deploy, pastikan file berikut ada:

```text
artifacts/tjkt-website/dist/public/index.html
artifacts/tjkt-website/dist/public/favicon.svg
```

### 7. Alur update website

Setelah mengubah konten atau source code:

```bash
git pull --rebase origin main
pnpm install --frozen-lockfile
pnpm run typecheck
pnpm run build
git add .
git commit -m "Update TJKT website"
git push origin main
```

Setiap push ke branch yang terhubung ke Vercel akan memicu deployment baru.

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

### Pengaturan wajib di Dashboard Vercel

Saat mengimpor repository, gunakan nilai berikut:

| Pengaturan | Nilai |
|---|---|
| Framework Preset | `Vite` |
| Root Directory | **Kosongkan** atau gunakan root repository (`./`) |
| Build Command | Override **OFF**; jika harus diisi manual: `pnpm --filter @workspace/tjkt-website run build` |
| Output Directory | Override **OFF**; jika harus diisi manual: `artifacts/tjkt-website/dist/public` |
| Install Command | Override **OFF**; jika harus diisi manual: `pnpm install --frozen-lockfile` |
| Development Command | Biarkan default / tidak perlu diubah |

Penting: jangan mengisi Root Directory dengan `artifacts/tjkt-website`. Folder website memang berada di sana, tetapi `package.json` root, `pnpm-workspace.yaml`, `pnpm-lock.yaml`, dan `vercel.json` berada di root repository. Vercel harus membaca semuanya dari root agar workspace dapat ditemukan dan rewrite SPA aktif.

Jika Root Directory dikosongkan, opsi **Include files outside the root directory** tidak diperlukan dan boleh dimatikan. Opsi **Skip deployments** boleh dibiarkan sesuai kebutuhan.



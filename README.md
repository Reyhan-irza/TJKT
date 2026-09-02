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

### Deploy melalui dashboard Vercel

1. Masuk ke Vercel.
2. Pilih **Add New > Project**.
3. Import repository `Reyhan-irza/TJKT`.
4. Buka bagian **Build and Deployment**.
5. Pilih **Framework Preset: Vite**.
6. Kosongkan **Root Directory**. Jangan gunakan `artifacts/tjkt-website`.
7. Biarkan override Build Command, Output Directory, dan Install Command dalam kondisi **OFF** agar Vercel membaca `vercel.json`.
8. Pastikan branch production adalah `main`.
9. Klik **Deploy**.

Vercel akan menjalankan alur berikut dari root repository:

```text
pnpm install --frozen-lockfile
pnpm --filter @workspace/tjkt-website run build
hasil: artifacts/tjkt-website/dist/public
```

Tidak ada environment variable yang diperlukan karena website ini bersifat static dan tidak menggunakan backend/API eksternal.

### Deploy melalui Vercel CLI

Pastikan terminal sedang berada di root repository, yaitu folder yang berisi `vercel.json` dan `pnpm-lock.yaml`:

```bash
pwd
pnpm install --frozen-lockfile
pnpm run typecheck
pnpm run build
pnpm dlx vercel@latest login
pnpm dlx vercel@latest
pnpm dlx vercel@latest --prod
```

Pada pertanyaan CLI, pilih project Vercel yang sesuai dan gunakan current directory sebagai project root. Jangan menjalankan CLI dari dalam `artifacts/tjkt-website`.

### Checklist setelah deploy

Setelah deployment berstatus **Ready**, buka dan periksa:

- `/`
- `/tentang`
- `/pembelajaran`
- `/fasilitas`
- `/kontak`
- `/favicon.svg`
- `/robots.txt`

Halaman internal memakai routing client-side Wouter. Rewrite pada `vercel.json` memastikan URL internal tetap membuka aplikasi ketika halaman di-refresh atau dibuka langsung.

## Troubleshooting

### `ERR_PNPM_OUTDATED_LOCKFILE` atau install dependency gagal

Pastikan Vercel menjalankan install dari root repository dengan `pnpm-lock.yaml` yang sudah ikut di-push. Jangan menggunakan `npm install` atau `yarn install`.

Untuk memperbaiki dari lokal:

```bash
corepack enable
corepack prepare pnpm@10.26.1 --activate
pnpm install --frozen-lockfile
pnpm run typecheck
pnpm run build
git add package.json pnpm-lock.yaml
git commit -m "Update deployment dependencies"
git push origin main
```

### `No pnpm-lock.yaml found` atau `Cannot find workspace package`

Root Directory masih salah. Kembali ke **Project Settings > Build and Deployment**, lalu kosongkan Root Directory. Jangan mengandalkan toggle **Include files outside the root directory** sebagai pengganti root repository.

### `No Output Directory named dist` atau output tidak ditemukan

Pastikan Output Directory tidak di-override menjadi `dist`. Nilai yang benar adalah:

```text
artifacts/tjkt-website/dist/public
```

Jika override aktif, matikan override atau masukkan path tersebut persis.

### Build berhasil tetapi route internal 404

Pastikan project Vercel memakai root repository sebagai **Root Directory** sehingga `vercel.json` root terbaca. Konfigurasi rewrite SPA sudah disediakan untuk halaman seperti `/tentang`, `/pembelajaran`, `/fasilitas`, dan `/kontak`.

Jika route masih 404, buka deployment terbaru dan periksa apakah `vercel.json` terdeteksi di root serta apakah output berisi `index.html`.

### Asset gambar, favicon, atau CSS tidak ditemukan

Pastikan deployment dibuat dari branch/commit terbaru dan tidak ada perubahan pada folder:

```text
artifacts/tjkt-website/public/
```

Asset website diambil dari folder `public`, sehingga path asset tidak boleh diarahkan ke `attached_assets`.

### Animasi terasa terlalu berat

Gunakan perangkat dengan `prefers-reduced-motion` aktif untuk mode motion minimal. Pada perangkat mobile, Lenis memang sengaja tidak digunakan; scrolling native dipertahankan agar tetap ringan dan responsif.

## Lisensi dan aset

Konten, identitas sekolah, dan aset visual website dipertahankan untuk kebutuhan website TJKT SMKN 2 Lubuk Basung.
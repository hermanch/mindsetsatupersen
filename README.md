# Mindset Satu Persen - Landing Page, Member Portal & CMS Admin

Aplikasi Web Landing Page Modern dan Responsive untuk channel YouTube **Mindset Satu Persen** (@mindsetsatupersen05) dilengkapi dengan **Dashboard CMS (Content Management System)** untuk mengelola video edukasi, modul course premium VIP, statistik channel, dan data anggota/member.

Aplikasi ini sudah dipersiapkan dan dioptimasi penuh untuk **Mode Produksi (Production Ready)** dan dapat langsung di-deploy ke **Netlify**, **aaPanel/VPS**, maupun server hosting lainnya.

---

## 🔐 Kredensial Produksi (Production Credentials)

Aplikasi ini telah dilengkapi dengan autentikasi produksi tanpa bypass demo:

### 1. Kredensial Administrator Portal CMS
Digunakan untuk mengakses Dashboard Pengelola Konten (CMS):
- **Akses:** Klik tombol **"Panel CMS"** di Header atau Footer situs.
- **Username / Email:** `admin@satupersen.id` *(atau username: `admin` / email pemilik: `******`)*
- **Kata Sandi (Password):** ``
- **Konfigurasi Environment Variable Netlify:**
  Anda dapat mengganti email dan password admin melalui Environment Variable di Netlify:
  - `VITE_ADMIN_EMAIL`
  - `VITE_ADMIN_PASSWORD`

### 2. Kredensial Pengguna / Member VIP (Pre-configured Production User)
Digunakan untuk menguji atau mengakses modul Video Course Premium:
- **Akses:** Klik tombol **"Login Member"** di Header atau tombol **"Akses Modul"** pada Video Course.
- **Email:** `member@satupersen.id`
- **Kata Sandi (Password):** `Member1Persen2026!`
- **Status Tier:** Member VIP (Akses terbuka untuk semua modul gated content).

### 3. Pendaftaran Akun Pengguna Baru (Self-Service Registration)
Setiap pengunjung dapat mendaftarkan akun baru secara langsung melalui tab **"Registrasi Baru"**:
- Masukkan Nama Lengkap, Email, dan Kata Sandi (minimal 6 karakter).
- Pilih paket keanggotaan (Bulanan Rp 49.000 atau VIP Tahunan Rp 399.000).
- Data pengguna baru akan otomatis tersimpan di database lokal browser (`localStorage`) dan langsung terdata di tabel Member pada CMS Admin.

---

## 🚀 Panduan Deploy Langsung ke Netlify (Direkomendasikan)

Project ini telah dilengkapi file konfigurasi produksi Netlify (`netlify.toml` dan `public/_redirects`) sehingga proses deploy berlangsung instan.

### Metode A: Deploy Otomatis via Git (GitHub / GitLab)
1. Push repository project ini ke akun GitHub Anda.
2. Buka dashboard [Netlify](https://app.netlify.com/) dan login.
3. Klik **"Add new site"** -> **"Import an existing project"**.
4. Hubungkan repository GitHub Anda.
5. Konfigurasi build telah terdeteksi secara otomatis dari `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. *(Opsional)* Di menu **Site configuration** -> **Environment variables**, Anda dapat menambahkan kredensial custom:
   - `VITE_ADMIN_EMAIL` = `admin@domain-anda.com`
   - `VITE_ADMIN_PASSWORD` = `KataSandiRahasiaAnda`
7. Klik **"Deploy site"**. Dalam hitungan detik website sudah online dengan HTTPS gratis!

### Metode B: Deploy Manual via Netlify Drop (Drag & Drop)
1. Jalankan proses build di komputer lokal Anda:
   ```bash
   npm run build
   ```
2. Buka [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag & drop folder `dist` yang baru dihasilkan.
4. Situs Anda langsung online seketika.

---

## 💻 Jalankan di Komputer Lokal (Local Development)

Secara default, aplikasi ini menggunakan **Port 3000** saat dijalankan di lingkungan lokal.

### Langkah-Langkah:
1. Pastikan Anda sudah menginstall **Node.js** (versi 18 atau 20) dan **npm**.
2. Buka terminal di folder project, lalu jalankan:
   ```bash
   npm install
   ```
3. Jalankan server development:
   ```bash
   npm run dev
   ```
4. Buka browser dan akses:
   ```text
   http://localhost:3000
   ```

---

## 🛠️ Panduan Langkah-Langkah Install di aaPanel

Terdapat 2 metode deployment yang bisa Anda gunakan di aaPanel. **Metode 1 (Static Site)** adalah metode terbaik dan paling hemat resource untuk aplikasi React + Vite.

### Metode 1: Deploy sebagai Static Site di aaPanel (Direkomendasikan)

#### Langkah 1: Install Node.js di aaPanel Server
1. Masuk ke Dashboard **aaPanel**.
2. Buka menu **App Store** -> Cari **Node.js Project Manager** -> Klik **Install**.
3. Buka **Node.js Project Manager**, pilih tab **Node Version**, lalu install versi Node.js **v18.x** atau **v20.x**.

#### Langkah 2: Upload File Project
1. Buka menu **Files** di aaPanel.
2. Navigasi ke direktori `/www/wwwroot/`.
3. Buat folder baru, misalnya: `/www/wwwroot/mindsetsatupersen`.
4. Upload seluruh file project Anda ke dalam folder tersebut (atau gunakan fitur Terminal aaPanel untuk `git clone`).

#### Langkah 3: Build Aplikasi
1. Buka **Terminal** di aaPanel (atau terminal SSH server).
2. Masuk ke direktori project:
   ```bash
   cd /www/wwwroot/mindsetsatupersen
   ```
3. Install dependency:
   ```bash
   npm install
   ```
4. Jalankan proses kompilasi/build:
   ```bash
   npm run build
   ```
   *Proses ini akan menghasilkan folder `/www/wwwroot/mindsetsatupersen/dist`.*

#### Langkah 4: Tambahkan Website Baru di aaPanel
1. Buka menu **Website** -> Klik tombol **Add site**.
2. Isi form penambahan situs:
   - **Domain:** Masukkan nama domain Anda (misal: `mindsetsatupersen.com` atau IP VPS Anda).
   - **Site Directory:** `/www/wwwroot/mindsetsatupersen`
   - **Document Root:** `/www/wwwroot/mindsetsatupersen/dist` *(PENTING: Arahkan ke folder dist)*
   - **PHP Version:** Pilih `Pure Static` (karena ini adalah frontend React SPA).
3. Klik **Submit**.

#### Langkah 5: Konfigurasi URL Rewrite (SPA Fallback)
Agar routing halaman tidak mengalami error `404 Not Found` saat halaman di-refresh:
1. Pada daftar Website di aaPanel, klik pada **nama domain / website** Anda.
2. Pilih menu **URL Rewrite**.
3. Tambahkan aturan Nginx berikut:
   ```nginx
   location / {
       try_files $uri $uri/ /index.html;
   }
   ```
4. Klik **Save**.
5. Situs Anda sekarang sudah aktif dan dapat diakses melalui browser!

---

### Metode 2: Deploy Menggunakan Node.js Project Manager (Reverse Proxy)

Jika Anda ingin menjalankan server Node.js secara langsung di port tertentu (misalnya Port 3000):

1. **Upload File & Install Dependency:**
   - Upload file project ke `/www/wwwroot/mindsetsatupersen`.
   - Jalankan `npm install` via Terminal.
2. **Tambah Project di Node.js Manager:**
   - Buka **App Store** -> **Node.js Project Manager**.
   - Klik **Add Node Project**.
   - **Path:** `/www/wwwroot/mindsetsatupersen`
   - **Name:** `mindsetsatupersen`
   - **Run Port:** `3000`
   - **User:** `www`
   - **Run Command:** `npm run dev`
   - Klik **Submit**.
3. **Map Domain / Reverse Proxy:**
   - Di daftar proyek Node.js, klik **Map domain**.
   - Masukkan domain Anda agar aaPanel membuatkan reverse proxy dari Port 3000 ke Port 80/443.

---

## 📂 Struktur Direktori Project

```text
├── netlify.toml            # Konfigurasi build & redirects Netlify produksi
├── public/
│   └── _redirects          # SPA fallback routing untuk Netlify
├── index.html              # Entry point HTML utama & SEO OpenGraph
├── package.json            # Daftar dependencies & npm scripts
├── vite.config.ts          # Konfigurasi bundler Vite
├── .env.example            # Template environment variables produksi
├── src/
│   ├── main.tsx            # Mounting aplikasi React
│   ├── App.tsx             # State utama & sinkronisasi data
│   ├── types.ts            # Interface TypeScript
│   ├── index.css           # Styling Tailwind CSS v4 & Fonts
│   ├── utils/
│   │   └── auth.ts         # Layanan autentikasi Admin & Member
│   ├── data/
│   │   └── mockData.ts     # Data awal video, course, testimoni, FAQ
│   └── components/
│       ├── Navbar.tsx      # Header & Navigasi
│       ├── Hero.tsx        # Hero Section & Quick Stats
│       ├── AboutSection.tsx# Section Tentang Channel & 4 Pilar
│       ├── TopicsSection.tsx # Galeri Video YouTube dengan Filter
│       ├── CalculatorSection.tsx # Kalkulator Gaji 50/30/20 & Dana Darurat
│       ├── PremiumMemberSection.tsx # Area Video Premium / Gated Content
│       ├── TestimonialSection.tsx # Testimoni Pembelajar
│       ├── FaqSection.tsx  # Tanya Jawab FAQ
│       ├── Footer.tsx      # Footer & Link Resmi YouTube
│       ├── MemberModal.tsx # Modal Login & Pendaftaran Member
│       ├── AdminLoginModal.tsx # Modal Login Administrator CMS
│       ├── CmsAdminModal.tsx # Dashboard Pengelola Konten CMS
│       └── VideoModal.tsx  # Modal Player Preview Video YouTube
```

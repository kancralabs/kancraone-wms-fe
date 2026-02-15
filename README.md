# Kancra WMS - Warehouse Management System Frontend

Frontend application untuk Warehouse Management System (WMS) yang dibangun dengan React, TypeScript, Tailwind CSS, dan Shadcn UI.

## 🚀 Fitur

- ✅ **Autentikasi**: Login page dengan UI yang modern dan gradient biru-putih
- ✅ **Dashboard Layout**: Sidebar menu dengan header yang menampilkan user yang sedang login
- ✅ **Responsive Design**: Mobile-first design yang bekerja di semua ukuran layar
- ✅ **TypeScript**: Fully typed untuk type safety
- ✅ **Tailwind CSS**: Styling modern dengan utility-first CSS framework
- ✅ **Shadcn UI**: Komponen UI yang reusable dan customizable
- ✅ **Axios**: HTTP client untuk komunikasi dengan backend API
- ✅ **React Router**: Routing untuk navigasi antar halaman
- ✅ **Protected Routes**: Route protection untuk halaman yang memerlukan autentikasi

## 📋 Prerequisites

- Node.js 18+ 
- npm atau yarn

## 🛠️ Installation

1. Clone repository
\`\`\`bash
git clone <repository-url>
cd kancraone-wms-fe
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Copy file environment
\`\`\`bash
cp .env.example .env
\`\`\`

4. Konfigurasi environment variables di file \`.env\`
\`\`\`env
VITE_API_URL=http://localhost:3000/api
\`\`\`

## 🎮 Development

Jalankan development server:
\`\`\`bash
npm run dev
\`\`\`

Aplikasi akan berjalan di `http://localhost:5173`

## 🔐 Demo Login

**Mode Demo** (tanpa backend):
- Username: `admin`
- Password: `admin`

> Note: Saat ini aplikasi berjalan dalam mode demo. Untuk menggunakan backend API yang sebenarnya, uncomment kode API di file `src/context/AuthContext.tsx`

## 📁 Struktur Project

\`\`\`
src/
├── components/          # Reusable components
│   ├── ui/             # UI components (Button, Input, Card, etc.)
│   ├── layout/         # Layout components (DashboardLayout)
│   └── ProtectedRoute.tsx
├── context/            # React Context (AuthContext)
├── lib/                # Utility functions dan axios instance
├── pages/              # Page components (LoginPage, HomePage, etc.)
├── types/              # TypeScript type definitions
├── App.tsx             # Main app component with routing
├── main.tsx            # Entry point
└── index.css           # Global styles with Tailwind
\`\`\`

## 🎨 Tech Stack

- **React 18** - UI Library
- **TypeScript** - Type safety
- **Vite** - Build tool dan dev server
- **React Router DOM** - Routing
- **Tailwind CSS** - Styling
- **Shadcn UI** - UI Components
- **Axios** - HTTP client
- **Lucide React** - Icons
- **clsx & tailwind-merge** - Utility untuk conditional classes

## 📱 Fitur UI

### Login Page
- Gradient background biru-putih yang modern
- Form login dengan validation
- Responsive design
- Loading state

### Dashboard
- Sidebar menu dengan icons
- Header dengan user profile
- Responsive sidebar (collapsible di mobile)
- Protected routes
- Stats cards
- Activity feed
- Alerts/Notifications

### Menu Navigasi
- Dashboard (Home)
- Produk
- Pesanan
- Pengiriman
- Pelanggan
- Laporan
- Pengaturan

## 🔧 Build untuk Production

\`\`\`bash
npm run build
\`\`\`

Preview production build:
\`\`\`bash
npm run preview
\`\`\`

## 🌐 Integrasi Backend

Untuk mengintegrasikan dengan backend:

1. Update \`VITE_API_URL\` di file \`.env\`
2. Buka file \`src/context/AuthContext.tsx\`
3. Hapus kode demo mode
4. Uncomment kode API call
5. Sesuaikan response structure dengan API endpoint Anda

Example API endpoint yang dibutuhkan:
\`\`\`
POST /api/auth/login
Body: { username: string, password: string }
Response: { token: string, user: User }
\`\`\`

## 📝 Todo / Coming Soon

- [ ] Halaman Produk (Product Management)
- [ ] Halaman Pesanan (Order Management)
- [ ] Halaman Pengiriman (Shipping Management)
- [ ] Halaman Pelanggan (Customer Management)
- [ ] Halaman Laporan (Reports & Analytics)
- [ ] Halaman Pengaturan (Settings)
- [ ] Role-based access control
- [ ] Dark mode
- [ ] Multi-language support

## 👨‍💻 Development

### Adding New Pages

1. Buat file page baru di `src/pages/`
2. Tambahkan route di `src/App.tsx`
3. Tambahkan menu item di `src/components/layout/DashboardLayout.tsx`

### Adding New UI Components

1. Buat component di `src/components/ui/`
2. Follow Shadcn UI pattern
3. Export component

## 📄 License

Copyright © 2026 Kancra Labs. All rights reserved.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

Kancra Labs - [@kancralabs](https://github.com/kancralabs)

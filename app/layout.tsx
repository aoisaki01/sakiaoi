// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aoi Saki ", // Anda bisa ganti judul ini
  description: "Aoi Saki", // Ganti deskripsi ini
  icons: {
    // PERBAIKAN: Menambahkan versi (?v=1) untuk memaksa browser refresh
    // Jika Anda punya file 'logo.png' di dalam folder /public
    icon: '/logo.png?v=1', 
    // Jika Anda punya file 'apple-touch-icon.png' (untuk perangkat Apple)
    apple: '/logo.png?v=1', 
    // Jika Anda punya file 'favicon-16x16.png' dan 'favicon-32x32.png'
    shortcut: '/logo.png?v=1',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

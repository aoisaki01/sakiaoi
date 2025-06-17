// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PageTransitionProvider } from "./components/PageTransitionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aoi Saki",
  description: "話そう、私のプロジェクトとポートフォリオを見てください。",
  keywords: ["Aoi Saki", "portfolio", "web developer", "video editor", "digital artist", "programmer", "3d modeler"],
  
  // Nama Anda sebagai penulis situs
  authors: [{ name: "Aoi Saki" }],
  
  // URL utama situs Anda
  metadataBase: new URL('https://aoisaki.cloud'), // Ganti dengan domain Anda nanti
  
  // Gambar yang akan muncul saat link dibagikan di media sosial
  openGraph: {
    title: "Aoi Saki - Portfolio",
    description: "話そう、私のプロジェクトとポートフォリオを見てください。",
    images: '/saki-aoi.png', // Pastikan gambar ini ada di folder /public
  },
  icons: {
    icon: '/logo.ico', 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <PageTransitionProvider>
          {children}
        </PageTransitionProvider>
      </body>
    </html>
  );
}

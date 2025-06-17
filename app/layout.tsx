// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PageTransitionProvider } from "./components/PageTransitionProvider";
import MusicPlayer from "./components/MusicPlayer.tsx";
import fs from 'fs';
import path from 'path'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aoi Saki",
  description: "話そう、私のプロジェクトとポートフォリオを見てください。",
  icons: {
    icon: '/logo.ico', 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // --- LOGIKA UNTUK MEMBACA LAGU SECARA DINAMIS ---
  const musicDirectory = path.join(process.cwd(), 'public');
  let playlist: { src: string }[] = [];

  try {
    const fileNames = fs.readdirSync(musicDirectory);
    const supportedFormats = ['.mp3', '.wav', '.m4a', '.ogg'];
    
    const songFiles = fileNames.filter(file => 
      supportedFormats.some(format => file.toLowerCase().endsWith(format))
    );

    playlist = songFiles.map(file => ({ src: `/${file}` }));

  } catch (error) {
    console.error("Gagal membaca direktori musik:", error);
    // Jika gagal, gunakan playlist kosong agar tidak error
    playlist = [];
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <PageTransitionProvider>
          {children}
        <MusicPlayer playlist={playlist} />
        </PageTransitionProvider>
      </body>
    </html>
  );
}

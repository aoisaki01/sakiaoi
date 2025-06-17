// app/page.tsx

// Menandakan komponen ini dan turunannya adalah Client Components
'use client';

// Impor komponen-komponen Anda
import ProjectsSection from './components/project/ProjectsSection';
import HeroSection from './components/hero/HeroSection';
import AboutSection from "./components/about/AboutSection";

// --- HALAMAN UTAMA ---
// PERBAIKAN: Hapus 'async' dari deklarasi fungsi
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
    </main>
  );
}

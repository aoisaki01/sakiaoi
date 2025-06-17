'use client';

// Impor komponen-komponen Anda
import ProjectsSection from './components/project/ProjectsSection';
import HeroSection from './components/hero/HeroSection';
import AboutSection from "./components/about/AboutSection";
import DrawingCanvas from './components/DrawingCanvas'; // Impor komponen kanvas

export default function HomePage() {
  return (
    // Bungkus semua konten dalam div dengan posisi relatif
    <div className="relative">
      <main>
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
      </main>
      
      {/* Tambahkan kanvas gambar di atas semua konten */}
      <DrawingCanvas />
    </div>
  );
}

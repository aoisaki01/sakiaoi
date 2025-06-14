// app/page.tsx

// Menandakan komponen ini berjalan di sisi client untuk menggunakan hooks
'use client';
'use strict';

import Image from "next/image";
import Link from 'next/link';
import { FaFacebook, FaGithub, FaStar, FaCodeBranch, FaEye, FaYoutube, FaInstagram, FaPlay } from "react-icons/fa";
import { useInView } from 'react-intersection-observer';
import ProjectsSection from './components/project/ProjectsSection';
import HeroSection from './components/hero/HeroSection';
import AboutSection from "./components/about/AboutSection";

// --- SECTION 1: HERO ---


// --- HALAMAN UTAMA ---
export default async function HomePage() {
   const { ref, inView } = useInView({ 
    triggerOnce: true, // Animasi hanya berjalan sekali
    threshold: 0.2     // Memicu ketika 20% elemen terlihat
  });
  return (
    <main>
<HeroSection />
<ProjectsSection />
<AboutSection />
      
    </main>
  );
}

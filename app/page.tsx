'use client';

import ProjectsSection from './components/project/ProjectsSection';
import HeroSection from './components/hero/HeroSection';
import AboutSection from "./components/about/AboutSection";


export default function HomePage() {
  return (
    <div className="relative">
      <main>
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
      </main>
      
 
     
    </div>
  );
}

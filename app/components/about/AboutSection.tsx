'use client';

import React from 'react';
import Image from 'next/image';
import { TransitionLink } from '../TransitionLink';
// Impor useInView untuk mendeteksi visibilitas
import { useInView } from 'react-intersection-observer';

// Ganti dengan path gambar lokal Anda di dalam folder /public
const aboutImageSrc = "/saki2.webp"; 

const AboutSection: React.FC = () => {
  // Hook untuk mendeteksi kapan section ini terlihat di layar.
  // triggerOnce: false agar animasi bisa berjalan berulang kali.
  const { ref, inView } = useInView({
    threshold: 0.25,    // Memicu saat 25% komponen terlihat
    triggerOnce: false, // Animasi akan berulang setiap kali masuk/keluar
  });

  return (
    // Section ini berfungsi sebagai area pemicu animasi
    <section 
      ref={ref} 
      className="bg-white min-h-screen flex items-center justify-center p-6 overflow-hidden"
    >
      <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-16">
        
        {/* Kolom Gambar: Animasi dari kiri dengan rotasi X dan Y */}
        <div 
          className="transition-all duration-700 ease-out"
          style={{ 
            transformStyle: 'preserve-3d',
            opacity: inView ? 1 : 0,
            transform: inView 
              ? 'translateX(0) rotateY(0) rotateX(0)' 
              : 'translateX(-40px) rotateY(-20deg) rotateX(5deg)'
          }}
        >
          <Image
            src={aboutImageSrc}
            alt="<3"
            width={320} 
            height={320} 
            className="w-80 h-80 object-cover rounded-2xl shadow-xl"
          />
        </div>
        
        {/* Kolom Teks: Animasi dari kanan dengan rotasi X dan Y */}
        <div 
          className="flex-1 text-center md:text-left transition-all duration-700 ease-out"
          style={{ 
            transitionDelay: '150ms', 
            transformStyle: 'preserve-3d',
            opacity: inView ? 1 : 0,
            transform: inView
              ? 'translateX(0) rotateY(0) rotateX(0)'
              : 'translateX(40px) rotateY(20deg) rotateX(5deg)'
          }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-6">
            About Me
          </h2>
          <p className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-lg mx-auto md:mx-0">
            I learn everything: <b>Code, Editing, Drawing, Music, Rigging, 3D Modeling, and Languages.</b> I'm passionate about creating and always exploring new skills.
          </p>
          <div className="mt-8">
            <TransitionLink 
              href="/about" 
              className="inline-block bg-gray-900 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Contact Me
            </TransitionLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

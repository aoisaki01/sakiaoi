'use client';

import Image from "next/image";
import Link from 'next/link';
import { FaInstagram, FaGithub, FaYoutube } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center md:flex-row bg-white">
      {/* Kolom Kiri: Teks & Info Sosial Media */}
      <div className="flex w-full md:w-1/2 flex-col justify-center items-center p-8 text-center md:p-16 md:items-start md:text-left order-2 md:order-1">
        <div className="animate-slideInFromLeft">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 tracking-tighter">AOI SAKI</h1>
          <p className="mt-4 text-lg text-gray-500">Check my socials</p>
          <div className="mt-8 flex justify-center space-x-6 md:justify-start">
            <a href="https://www.instagram.com/ixta.edit/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-500 transition-all duration-300 hover:text-pink-600 hover:scale-125"><FaInstagram size={32} /></a>
            <a href="https://github.com/aoisaki01" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-500 transition-all duration-300 hover:text-black hover:scale-125"><FaGithub size={32} /></a>
            <a href="https://www.youtube.com/@ixta2897" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-500 transition-all duration-300 hover:text-red-600 hover:scale-125"><FaYoutube size={32} /></a>
          </div>
          <div className="mt-12">
            <Link href="/#projects" className="rounded-lg bg-blue-950 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2">
              View My Projects ↓
            </Link>
          </div>
        </div>
      </div>
      {/* Kolom Kanan: Gambar */}
      <div className="flex w-full items-center justify-center p-6 md:w-1/2 md:p-12 order-1 md:order-2">
        <div className="w-full max-w-md animate-slideInFromRight md:max-w-lg lg:max-w-xl">
          <Image 
            src="/saki-aoi.png" 
            alt="Ilustrasi Aoi Saki" 
            width={1000} 
            height={1000} 
            priority 
            className="rounded-xl object-cover shadow-2xl" 
          />
        </div>
      </div>
    </section>
  );
}

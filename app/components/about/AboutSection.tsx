import React from 'react';
import Image from 'next/image'; // Menggunakan komponen Image dari Next.js untuk optimisasi
import Link from 'next/link'; // Mengimpor Link untuk navigasi

// Ganti dengan path gambar lokal Anda di dalam folder /public
const aboutImageSrc = "/saki2.webp"; 

const AboutSectionTailwind: React.FC = () => {
  return (
    // Section utama diubah menjadi full screen dan kontennya dipusatkan
    <section className="bg-white min-h-screen flex items-center justify-center p-6">
      {/* Kontainer untuk membatasi lebar dan memusatkan konten */}
      <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-16">
        
        {/* Kolom Gambar */}
        <div className="flex-shrink-0">
          <Image
            src={aboutImageSrc}
            alt="A portrait"
            width={320} // Lebar gambar
            height={320} // Tinggi gambar
            className="w-80 h-80 object-cover rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Kolom Teks */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-6">
            About Me
          </h2>
          <p className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-lg mx-auto md:mx-0">
            I learn everything: <b>Code, Editing, Drawing, Music, Rigging, 3D Modeling, and Languages.</b> I'm passionate about creating and always exploring new skills.
          </p>
          {/* Tombol Contact Me */}
          <div className="mt-8">
            <Link href="/about" className="inline-block bg-gray-900 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
              Contact Me
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSectionTailwind;

// app/about/page.tsx

import Image from "next/image";
import Link from 'next/link';
import { FaEnvelope, FaWhatsapp, FaArrowLeft } from "react-icons/fa";

export default function AboutPage() {
  const userEmail = "carlossusanto89@gmail.com";
  // PERBAIKAN: Menggunakan format internasional untuk nomor WhatsApp (ganti 0 dengan 62)
  const userWhatsApp = "6289624010906"; 

  return (
    <main className="bg-white min-h-screen flex items-center justify-center p-6 sm:p-8 md:p-16">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-24">
        
        {/* Kolom Kiri: Gambar */}
        <div className="w-full h-full animate-fadeIn order-1">
          <Image
            src="/about.jpg" // Pastikan gambar ini ada di folder /public
            alt="Foto profil Carlos Susanto"
            width={800}
            height={1200}
            priority
            className="object-cover rounded-2xl w-full h-full max-h-[75vh]"
          />
        </div>

        {/* Kolom Kanan: Teks & Info Kontak */}
        <div className="w-full flex flex-col justify-center animate-slideInFromRight order-2">
          <div>
            {/* PERBAIKAN: Menghapus spasi dan baris baru untuk mencegah hydration error */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">A Passion for Code and Creativity.</h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">Hello, I'm Carlos. I thrive at the intersection of technology and art. My journey is driven by a passion for learning and creating—whether it's building clean, efficient code, producing captivating video edits, or exploring new digital landscapes. I believe great work comes from a blend of technical skill and creative vision.</p>
            
            <div className="mt-12 pt-10 border-t">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Let's Connect</h2>
              <p className="text-gray-500 mb-8">I'm always open to discussing new projects, creative ideas, or opportunities. Feel free to reach out.</p>
              <div className="flex flex-col sm:flex-row gap-5">
                {/* Tombol Email */}
                <a 
                  href={`mailto:${userEmail}`} 
                  className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg shadow-sm hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                ><FaEnvelope />Email Me</a>
                {/* Tombol WhatsApp */}
                <a 
                  href={`https://wa.me/${userWhatsApp}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                ><FaWhatsapp />WhatsApp</a>
              </div>
            </div>

            {/* Tombol Kembali ke Home */}
            <div className="mt-16">
              <a href="/" className="inline-flex items-center gap-2 text-gray-500 font-semibold hover:text-gray-900 transition-colors duration-300">
                <FaArrowLeft />Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

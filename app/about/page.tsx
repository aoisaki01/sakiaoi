
'use client';

import React from 'react';
import Image from "next/image";
import { FaEnvelope, FaWhatsapp, FaArrowLeft } from "react-icons/fa";
import { TransitionLink } from "../components/TransitionLink";
import { useInView } from 'react-intersection-observer';

export default function AboutPage() {
  const userEmail = "carlossusanto89@gmail.com";
  const userWhatsApp = "6289624010906"; 

  
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true, 
  });

  return (
    <main 
      ref={ref} 
      className="bg-white min-h-screen flex items-center justify-center p-6 sm:p-8 md:p-16 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-24">
        
       
        <div 
          className={`w-full h-full order-1 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
        >
          <Image
            src="/about.jpg" 
            alt="<3"
            width={800}
            height={1200}
            priority
            className="object-cover rounded-2xl w-full h-full max-h-[75vh]"
          />
        </div>

        
        <div className="w-full flex flex-col justify-center order-2">
          <div>
            <h1 
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
              style={{ transitionDelay: '100ms' }}
            >
              A Passion for Code and Creativity.
            </h1>
            <p 
              className={`mt-6 text-lg text-gray-600 leading-relaxed transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
              style={{ transitionDelay: '200ms' }}
            >
              Hello, I'm Carlos. I thrive at the intersection of technology and art. My journey is driven by a passion for learning and creating whether it's building clean, efficient code, producing captivating video edits, or exploring new digital landscapes. I believe great work comes from a blend of technical skill and creative vision.
            </p>
            
            <div 
              className={`mt-12 pt-10 border-t transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '300ms' }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Let's Connect</h2>
              <p className="text-gray-500 mb-8">I'm always open to discussing new projects, creative ideas, or opportunities. Feel free to reach out.</p>
              <div className="flex flex-col sm:flex-row gap-5">
                <a 
                  href={`mailto:${userEmail}`} 
                  className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg shadow-sm hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                ><FaEnvelope />Email Me</a>
                <a 
                  href={`https://wa.me/${userWhatsApp}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                ><FaWhatsapp />WhatsApp</a>
              </div>
            </div>

            <div 
              className={`mt-16 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '400ms' }}
            >
              <TransitionLink href="/" className="inline-flex items-center gap-2 text-gray-500 font-semibold hover:text-gray-900 transition-colors duration-300">
                <FaArrowLeft />Back to Home
              </TransitionLink>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

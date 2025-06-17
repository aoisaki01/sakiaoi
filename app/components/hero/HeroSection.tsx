'use client';

import React from 'react';
import Image from "next/image";
import { FaInstagram, FaGithub, FaYoutube } from "react-icons/fa";
import { TransitionLink } from '../TransitionLink'; 
import { useInView } from 'react-intersection-observer';

export default function HeroSection() {
  const [scrollStyle, setScrollStyle] = React.useState({});

  
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true, 
  });

  
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const screenHeight = window.innerHeight;
      
      const scrollPercent = Math.min(scrollY / screenHeight, 1);

      const opacity = 1 - scrollPercent;
      const rotateX = scrollPercent * 30;
      const scale = 1 - (scrollPercent * 0.1);

      setScrollStyle({
        opacity: opacity,
        transform: `perspective(1000px) rotateX(${rotateX}deg) scale(${scale})`,
        transition: 'transform 0.1s linear, opacity 0.1s linear'
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={ref} className="flex min-h-screen w-full flex-col items-center justify-center bg-white relative overflow-hidden">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center">
        <div 
          style={scrollStyle}
          className="w-full flex flex-col md:flex-row items-center justify-center"
        >
         
          <div className="flex w-full md:w-1/2 flex-col justify-center items-center p-8 text-center md:p-16 md:items-start md:text-left order-2 md:order-1">
              <h1 className={`text-5xl md:text-7xl font-bold text-gray-800 tracking-tighter transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                AOI SAKI
              </h1>
              <p className={`mt-4 text-lg text-gray-500 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '100ms' }}>
                Check my socials
              </p>
              <p className={`mt-4 text-lg font-bold text-gray-500 transition-all duration-800 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '100ms' }}>
                PartOfPasifixc
              </p>
              <div className={`mt-8 flex justify-center space-x-6 md:justify-start transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '200ms' }}>
                <a href="https://www.instagram.com/ixta.edit/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-500 transition-all duration-300 hover:text-pink-600 hover:scale-125"><FaInstagram size={32} /></a>
                <a href="https://github.com/aoisaki01" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-500 transition-all duration-300 hover:text-black hover:scale-125"><FaGithub size={32} /></a>
                <a href="https://www.youtube.com/@ixta2897" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-500 transition-all duration-300 hover:text-red-600 hover:scale-125"><FaYoutube size={32} /></a>
              </div>
              <div className={`mt-12 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '300ms' }}>
                <a href="/#projects" className="rounded-lg bg-blue-950 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2">
                  View My Projects ↓
                </a>
              </div>
          </div>
          
          <div className="flex w-full items-center justify-center p-6 md:w-1/2 md:p-12 order-1 md:order-2">
              <div className={`w-full max-w-md md:max-w-lg lg:max-w-xl transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <Image 
                  src="/saki-aoi.png" 
                  alt="<3" 
                  width={1000} 
                  height={1000} 
                  priority 
                  className="rounded-xl object-cover shadow-2xl" 
                />
              </div>
          </div>
        </div>
      </div>
      <div className="h-screen"></div>
    </section>
  );
}

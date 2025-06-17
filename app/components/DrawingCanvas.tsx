/*
======================================================================
 FILE 1: app/components/DrawingCanvas.tsx (Komponen yang Diperbarui)
======================================================================
Komponen ini berisi semua logika untuk kanvas gambar,
dengan tambahan fitur kunci scroll, hide/show, mode gambar,
dan animasi slide-in saat refresh.
*/
'use client';

import React, { useRef, useEffect, useState } from 'react';

// Ikon untuk tombol-tombol kontrol
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
);
const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);
const UnlockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>
);
const ChevronUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 9"></polyline></svg>
);
const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
);
const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
);
const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
);
const PencilIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path><path d="m15 5 4 4"></path></svg>
);


export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#ef4444'); // Default warna merah
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [isPaletteVisible, setIsPaletteVisible] = useState(true);
  const [isDrawingMode, setIsDrawingMode] = useState(true);
  // State baru untuk animasi saat refresh
  const [hasMounted, setHasMounted] = useState(false);


  // Fungsi untuk mengatur ukuran kanvas
  const setCanvasSize = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = document.body.scrollWidth;
      canvas.height = document.body.scrollHeight;
    }
  };
  
  // Efek untuk mengunci/membuka scroll pada body
  useEffect(() => {
    document.body.style.overflow = isScrollLocked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isScrollLocked]);

  useEffect(() => {
    // Efek ini berjalan sekali saat komponen dimuat
    const mountTimer = setTimeout(() => {
        setHasMounted(true);
    }, 100); // Delay kecil untuk memastikan transisi berjalan

    const timeoutId = setTimeout(setCanvasSize, 100);
    window.addEventListener('resize', setCanvasSize);
    const resizeObserver = new ResizeObserver(setCanvasSize);
    if (document.body) {
        resizeObserver.observe(document.body);
    }
    return () => {
      clearTimeout(mountTimer);
      clearTimeout(timeoutId);
      window.removeEventListener('resize', setCanvasSize);
      resizeObserver.disconnect();
    };
  }, []);

  const getCoordinates = (event: MouseEvent | TouchEvent): { x: number; y: number } | null => {
    const scrollY = window.scrollY;
    if ('touches' in event) {
      if (event.touches.length > 0) {
        return { x: event.touches[0].clientX, y: event.touches[0].clientY + scrollY };
      }
    } else {
      return { x: event.clientX, y: event.clientY + scrollY };
    }
    return null;
  };

  const startDrawing = (event: MouseEvent | TouchEvent) => {
    if (!isDrawingMode) return; // Jangan gambar jika mode nonaktif
    const canvas = canvasRef.current;
    const coords = getCoordinates(event);
    if (!canvas || !coords) return;
    const context = canvas.getContext('2d');
    if (context) {
      context.strokeStyle = color;
      context.lineWidth = 4;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.beginPath();
      context.moveTo(coords.x, coords.y);
      setIsDrawing(true);
    }
  };

  const draw = (event: MouseEvent | TouchEvent) => {
    if (!isDrawing || !isDrawingMode) return; // Jangan gambar jika mode nonaktif
    const canvas = canvasRef.current;
    const coords = getCoordinates(event);
    if (!canvas || !coords) return;
    const context = canvas.getContext('2d');
    if (context) {
      context.lineTo(coords.x, coords.y);
      context.stroke();
    }
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current?.getContext('2d');
    if (canvas) {
      canvas.closePath();
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const colors = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e', '#14b8a6', '#0ea5e9', '#6366f1', '#a855f7', '#ec4899', '#fdfdfd', '#1f2937'];

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing as any}
        onMouseMove={draw as any}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing as any}
        onTouchMove={draw as any}
        onTouchEnd={stopDrawing}
        className={`absolute top-0 left-0 z-40 ${isDrawingMode ? 'cursor-crosshair' : 'pointer-events-none'}`}
      />
      {/* Wrapper untuk Palet dan Tombol Hide/Show */}
      <div 
        className={`fixed z-50 transition-all duration-700 ease-in-out
          // Positioning
          right-0 top-0 -translate-y-0
          md:bottom-5 md:left-0 md:top-auto md:-translate-x-0 md:-translate-y-0
          
          // Animation Logic
          ${hasMounted
            ? (isPaletteVisible ? 'opacity-100 translate-x-0 md:translate-y-0' : 'opacity-100 translate-x-[calc(100%+0.5rem)] md:translate-y-[calc(100%+1.25rem)]')
            : 'opacity-0 translate-x-full md:translate-y-full'
          }
        `}
      >
        {/* Tombol Hide/Show */}
        <button
          onClick={() => setIsPaletteVisible(!isPaletteVisible)}
          title={isPaletteVisible ? "Sembunyikan Palet" : "Tampilkan Palet"}
          className="absolute bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800
            // Posisi Mobile
            -left-5 top-1/2 -translate-y-1/2 w-5 h-16
            // Posisi Desktop
            md:top-[-1.5rem] md:left-1/2 md:-translate-x-1/2 md:w-16 md:h-6
          "
        >
          {/* Ikon untuk Mobile */}
          <span className="md:hidden">
            {isPaletteVisible ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </span>
          {/* Ikon untuk Desktop */}
          <span className="hidden md:block">
            {isPaletteVisible ? <ChevronDownIcon /> : <ChevronUpIcon />}
          </span>
        </button>

        {/* Konten Palet */}
        <div className="flex items-center justify-center gap-3 p-3 rounded-2xl w-fit shadow-lg bg-white/30 backdrop-blur-sm border border-white/20 md:flex-row flex-col">
          {/* Tombol Mode Gambar */}
          <button
            onClick={() => setIsDrawingMode(!isDrawingMode)}
            title={isDrawingMode ? "Mode Gambar (Aktif)" : "Mode Klik (Aktif)"}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${isDrawingMode ? 'bg-white/70' : 'bg-white/30 hover:bg-white/50'}`}
          >
            <PencilIcon />
          </button>
          <button
            onClick={() => setIsScrollLocked(!isScrollLocked)}
            title={isScrollLocked ? "Buka Kunci Scroll" : "Kunci Scroll"}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/30 hover:bg-white/50 transition-colors"
          >
            {isScrollLocked ? <LockIcon /> : <UnlockIcon />}
          </button>
          <button
            onClick={clearCanvas}
            title="Hapus Kanvas"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/30 hover:bg-white/50 transition-colors"
          >
            <TrashIcon />
          </button>
          
          <div className="w-px h-8 bg-white/30 mx-1 hidden md:block"></div>

          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${color === c ? 'border-gray-800 scale-110' : 'border-transparent'}`}
              style={{ backgroundColor: c }}
              title={`Pilih warna ${c}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

/*
======================================================================
 FILE 1: app/components/DrawingCanvas.tsx (Komponen Baru)
======================================================================
Buat file ini di dalam folder 'app/components/'.
Komponen ini berisi semua logika untuk kanvas gambar.
*/
'use client';

import React, { useRef, useEffect, useState } from 'react';

// Ikon untuk tombol hapus (inline SVG)
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#ef4444'); // Default warna merah
  const [isLoaded, setIsLoaded] = useState(false);

  // Fungsi untuk mengatur ukuran kanvas sesuai dengan seluruh tinggi dokumen
  const setCanvasSize = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = document.body.scrollWidth;
      canvas.height = document.body.scrollHeight;
    }
  };

  // Atur ukuran kanvas dan picu animasi load
  useEffect(() => {
    const timeoutId = setTimeout(setCanvasSize, 100);
    window.addEventListener('resize', setCanvasSize);
    
    const loadTimer = setTimeout(() => setIsLoaded(true), 200);

    const resizeObserver = new ResizeObserver(setCanvasSize);
    if (document.body) resizeObserver.observe(document.body);

    return () => {
        clearTimeout(timeoutId);
        clearTimeout(loadTimer);
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
    if (!isDrawing) return;
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
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (context) {
      context.closePath();
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const colors = [
    '#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e', '#14b8a6', '#0ea5e9', '#6366f1', '#a855f7', '#ec4899', '#fdfdfd', '#1f2937'
  ];

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
        className="absolute top-0 left-0 z-40 cursor-crosshair"
      />
      {/* PERUBAHAN: Palet kontrol sekarang responsif */}
      <div 
        className={`
          fixed z-50 flex gap-2 p-2 rounded-full shadow-lg bg-white/30 backdrop-blur-sm border border-white/20 
          transition-all duration-700 ease-out 
          
          // Tata letak Mobile (default): Vertikal di kanan
          flex-col right-5 top-1/2 -translate-y-1/2
          ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
          
          // Tata letak Desktop (md dan lebih besar): Horizontal di bawah
          md:flex-row md:bottom-5 md:left-1/2 md:top-auto md:-translate-y-0 md:-translate-x-1/2 
          ${isLoaded ? 'md:opacity-100 md:translate-y-0' : 'md:opacity-0 md:translate-y-10'}
        `}
      >
        <button
          onClick={clearCanvas}
          title="Clear Canvas"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 hover:bg-white/80 transition-colors"
        >
          <TrashIcon />
        </button>
        {colors.map((c, index) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`w-8 h-8 rounded-full border-2 transition-all duration-500 ease-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} ${color === c ? 'border-gray-800 scale-110' : 'border-transparent'}`}
            style={{ 
              backgroundColor: c,
              // Delay animasi tetap berfungsi untuk kedua tata letak
              transitionDelay: `${index * 50}ms`
            }}
            title={`Select color ${c}`}
          />
        ))}
      </div>
    </>
  );
}

/*
======================================================================
 FILE 1: app/components/MusicPlayer.tsx (Update Final dengan Efek Beat)
======================================================================
Komponen ini sekarang memiliki efek zoom & blur pada halaman dan glow
pada player saat beat bass yang kuat terdeteksi.
*/
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// Ikon-ikon (tidak ada perubahan)
const PlayIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg> );
const PauseIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg> );
const SkipForwardIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"></path></svg> );
const SkipBackIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"></path></svg> );
const ChevronDownIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg> );
const MusicIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg> );
const Volume2Icon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg> );
const VolumeXIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9"x2="23" y2="15"></line></svg> );

interface MusicPlayerProps {
    playlist: { src: string }[];
}

export default function MusicPlayer({ playlist }: MusicPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const fadeOutIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const beatTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [volume, setVolume] = useState(0.05);
    const [songTitle, setSongTitle] = useState("Tidak Ada Lagu");
    const [playerScale, setPlayerScale] = useState(1);
    const [isStrongBeat, setIsStrongBeat] = useState(false);


    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const setupAudioContext = () => {
        if (audioRef.current && !audioContextRef.current) {
            const context = new (window.AudioContext || (window as any).webkitAudioContext)();
            const analyser = context.createAnalyser();
            analyser.fftSize = 512;
            const source = context.createMediaElementSource(audioRef.current);
            source.connect(analyser);
            analyser.connect(context.destination);
            audioContextRef.current = context;
            analyserRef.current = analyser;
            sourceRef.current = source;
        }
    };
    
    // --- Loop Visualizer & Deteksi Beat ---
    const visualizeData = () => {
        if (analyserRef.current && isPlaying) {
            const bufferLength = analyserRef.current.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyserRef.current.getByteFrequencyData(dataArray);

            const bassSliceEnd = Math.floor(bufferLength * 0.2);
            let bassSum = 0;
            for (let i = 0; i < bassSliceEnd; i++) {
                bassSum += dataArray[i];
            }
            const bassAverage = bassSliceEnd > 0 ? bassSum / bassSliceEnd : 0;
            
            const scale = 1 + (bassAverage / 255) * 0.07;
            setPlayerScale(scale);
            
            if (bassAverage > 200 && !beatTimeoutRef.current) {
                setIsStrongBeat(true);
                beatTimeoutRef.current = setTimeout(() => {
                    setIsStrongBeat(false);
                    beatTimeoutRef.current = null;
                }, 400); 
            }
            
            animationFrameRef.current = requestAnimationFrame(visualizeData);
        }
    };

    // Efek untuk menambah/menghapus kelas zoom & blur pada halaman
    useEffect(() => {
        const mainElement = document.querySelector('main');
        if (mainElement) {
            if (isStrongBeat) {
                mainElement.classList.add('page-beat-effect');
            } else {
                mainElement.classList.remove('page-beat-effect');
            }
        }
    }, [isStrongBeat]);


    const togglePlayPause = () => {
        if (playlist.length === 0) return;
        setupAudioContext();
        if(audioContextRef.current?.state === 'suspended') audioContextRef.current.resume();
        if (fadeOutIntervalRef.current) { clearInterval(fadeOutIntervalRef.current); fadeOutIntervalRef.current = null; }

        if (isPlaying) {
            const audio = audioRef.current;
            if (!audio) return;
            const startVolume = audio.volume;
            fadeOutIntervalRef.current = setInterval(() => {
                if (audio.volume > 0.05) audio.volume -= 0.05;
                else {
                    audio.pause();
                    audio.volume = startVolume;
                    setIsPlaying(false);
                    if (fadeOutIntervalRef.current) clearInterval(fadeOutIntervalRef.current);
                }
            }, 50);
        } else {
            audioRef.current?.play().then(() => {
                if(audioRef.current) audioRef.current.volume = volume;
                setIsPlaying(true);
            }).catch(error => console.error("Gagal memutar audio:", error));
        }
    };

    const handleNextTrack = () => {
        if (playlist.length === 0) return;
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    };

    const handlePrevTrack = () => {
        if (playlist.length === 0) return;
        setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (audio && playlist.length > 0) {
            audio.src = playlist[currentTrackIndex].src;
            const fileName = playlist[currentTrackIndex].src.split('/').pop()?.split('.')[0] || "Lagu Tidak Dikenal";
            setSongTitle(fileName.replace(/[-_]/g, ' '));
            audio.load();
            if (isPlaying) audio.play().catch(e => console.error("Autoplay gagal:", e));
        } else if (playlist.length === 0) {
            setSongTitle("Tidak Ada Lagu");
        }
    }, [currentTrackIndex, playlist, isPlaying]);
    
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = volume;
        const setAudioData = () => { setDuration(audio.duration); setCurrentTime(audio.currentTime); };
        const setAudioTime = () => setCurrentTime(audio.currentTime);
        const handleEnd = () => handleNextTrack();
        audio.addEventListener('loadeddata', setAudioData);
        audio.addEventListener('timeupdate', setAudioTime);
        audio.addEventListener('ended', handleEnd);
        return () => {
            audio.removeEventListener('loadeddata', setAudioData);
            audio.removeEventListener('timeupdate', setAudioTime);
            audio.removeEventListener('ended', handleEnd);
        }
    }, [volume, handleNextTrack]);

    useEffect(() => {
        if (isPlaying && analyserRef.current) animationFrameRef.current = requestAnimationFrame(visualizeData);
        else {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            setPlayerScale(1);
        }
        return () => { if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); };
    }, [isPlaying]);

    useEffect(() => {
        return () => {
            sourceRef.current?.disconnect();
            analyserRef.current?.disconnect();
            audioContextRef.current?.close().catch(e => console.error("Gagal menutup AudioContext:", e));
        };
    }, []);

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(audioRef.current) {
            audioRef.current.currentTime = Number(e.target.value);
            setCurrentTime(Number(e.target.value));
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) audioRef.current.volume = newVolume;
    };
    
    if (playlist.length === 0) return null;

    return (
        <>
            {/* PERUBAIKAN: Transisi dibuat lebih halus dan durasinya diperpanjang */}
            <style jsx global>{`
                main {
                    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.4s ease-out;
                }
                main.page-beat-effect {
                    transform: scale(1.015);
                    filter: blur(2px);
                }
                input[type=range].custom-slider { -webkit-appearance: none; appearance: none; width: 100%; height: 5px; background: rgba(0, 0, 0, 0.15); border-radius: 5px; outline: none; transition: opacity .2s; }
                input[type=range].custom-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 15px; height: 15px; background: #1f2937; cursor: pointer; border-radius: 50%; box-shadow: 0 0 5px rgba(0,0,0,0.3); }
                input[type=range].custom-slider::-moz-range-thumb { width: 15px; height: 15px; background: #1f2937; cursor: pointer; border-radius: 50%; box-shadow: 0 0 5px rgba(0,0,0,0.3); }
            `}</style>
            
            <div className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-transform duration-500 ease-in-out ${isVisible ? 'translate-y-4' : '-translate-y-[calc(100%+20px)]'}`}>
                <div style={{ transform: `scale(${playerScale})`, transition: 'transform 0.08s ease-out' }}>
                    <div className={`w-[350px] md:w-[400px] p-4 bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border transition-all duration-300 ${isStrongBeat ? 'border-pink-500/80 shadow-pink-500/40' : 'border-black/10'}`}>
                        <div className="flex items-center gap-4 text-slate-800">
                           <button onClick={() => setIsVisible(!isVisible)} className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 bg-slate-900/50 backdrop-blur-sm rounded-full p-2 text-white" title={isVisible ? "Sembunyikan Player" : "Tampilkan Player"}>
                                {isVisible ? <ChevronDownIcon /> : <MusicIcon />}
                            </button>
                            <div className="flex-shrink-0">
                                <Image src="/saki2.webp" alt="Album Art" width={80} height={80} className="rounded-lg shadow-md" />
                            </div>
                            <div className="flex flex-col w-full gap-2">
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col overflow-hidden mr-2">
                                        <span className="font-bold text-base truncate capitalize">{songTitle}</span>
                                        <span className="text-xs text-slate-600">Aoi Saki's Playlist</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={handlePrevTrack} className="w-10 h-10 flex-shrink-0 bg-slate-400/80 text-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform"><SkipBackIcon /></button>
                                        {/* PERBAIKAN: Memperbaiki ikon yang salah tampil */}
                                        <button onClick={togglePlayPause} className="w-12 h-12 flex-shrink-0 bg-slate-400 text-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">{isPlaying ? <PauseIcon /> : <PlayIcon />}</button>
                                        <button onClick={handleNextTrack} className="w-10 h-10 flex-shrink-0 bg-slate-400/80 text-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform"><SkipForwardIcon /></button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-600 w-full">
                                    <span>{formatTime(currentTime)}</span>
                                    <input type="range" min="0" max={duration || 0} value={currentTime} onChange={handleTimeChange} className="custom-slider"/>
                                    <span>{formatTime(duration)}</span>
                                </div>
                                <div className="flex items-center gap-2 w-full">
                                    <button onClick={() => setVolume(volume > 0 ? 0 : 0.05)} className="text-slate-600 hover:text-slate-900">{volume === 0 ? <VolumeXIcon /> : <Volume2Icon />}</button>
                                    <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className="custom-slider"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <audio ref={audioRef} preload="metadata" crossOrigin="anonymous" src={playlist.length > 0 ? playlist[currentTrackIndex].src : ''} onEnded={handleNextTrack}/>
            </div>
        </>
    );
}

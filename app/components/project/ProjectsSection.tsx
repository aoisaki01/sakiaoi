/*
======================================================================
 FILE: app/components/ProjectsSection.tsx (Server Component)
======================================================================
Letakkan file ini di dalam folder 'app/components/'.
Ini adalah Server Component (TIDAK ADA 'use client').
Semua logika fetch data untuk GitHub dan YouTube terjadi di sini,
di sisi server, sebelum dikirim ke browser.
*/
import Image from "next/image";
import Link from 'next/link';
import { FaGithub, FaStar, FaCodeBranch, FaYoutube, FaPlay } from "react-icons/fa";

// --- Sub-komponen untuk menampilkan Repositori GitHub ---
async function GitHubSection() {
    let repos: any[] = [];
    try {
        const res = await fetch('https://api.github.com/users/aoisaki01/repos?sort=pushed&per_page=6', { 
          next: { revalidate: 3600 } // Re-fetch data setiap 1 jam
        });
        if (res.ok) {
          repos = await res.json();
        }
    } catch (error) { 
      console.error("Failed to fetch GitHub repos:", error); 
    }

    return (
        <div className="mb-24">
            <h3 className="text-3xl font-bold text-gray-700 flex items-center gap-3 mb-8"><FaGithub /> Latest GitHub Repositories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {repos.length > 0 ? repos.map((repo: any) => (
                    <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="group block p-6 bg-gray-50 rounded-lg border border-gray-200 hover:border-pink-500 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                        <h4 className="font-bold text-xl text-pink-600 group-hover:text-pink-700 truncate">{repo.name}</h4>
                        <p className="text-gray-600 mt-2 text-sm h-12 overflow-hidden">{repo.description || "No description provided."}</p>
                        <div className="mt-4 flex flex-wrap justify-between items-center text-gray-500 text-sm font-medium gap-2">
                            <div className="flex items-center gap-1"><FaStar className="text-yellow-500"/> {repo.stargazers_count}</div>
                            <div className="flex items-center gap-1"><FaCodeBranch className="text-green-600"/> {repo.forks_count}</div>
                            <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">{repo.language || "N/A"}</span>
                        </div>
                    </a>
                )) : <p>Could not load GitHub repositories at the moment.</p>}
            </div>
        </div>
    );
}

// --- Sub-komponen untuk menampilkan Video YouTube ---
async function YouTubeSection() {
    let ytVideos: any[] = [];
    try {
        const YOUTUBE_CHANNEL_ID = 'UC46pA9g1e-TxR2C0T-9iS_g';
        const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`, { 
          next: { revalidate: 3600 } // Re-fetch data setiap 1 jam
        });
        
        if (res.ok) {
            const xmlText = await res.text();
            const entries = xmlText.match(/<entry>[\s\S]*?<\/entry>/g) || [];
            
            ytVideos = entries.slice(0, 3).map(entry => {
                const videoId = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
                const title = entry.match(/<title>([^<]+)<\/title>/)?.[1];
                return {
                    id: videoId,
                    title: title,
                    thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                    url: `https://www.youtube.com/watch?v=${videoId}`
                };
            });
        }
    } catch (error) { 
      console.error("Failed to fetch YouTube videos:", error); 
    }

    return (
        <div className="mb-24">
            <h3 className="text-3xl font-bold text-gray-700 flex items-center gap-3 mb-8"><FaYoutube /> Latest YouTube Videos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ytVideos.length > 0 ? ytVideos.map((video: any) => (
                    <a key={video.id} href={video.url} target="_blank" rel="noopener noreferrer" className="group block bg-gray-50 rounded-lg border border-gray-200 hover:border-red-500 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                        <div className="relative">
                            <Image src={video.thumbnail} alt={`Thumbnail for ${video.title}`} width={480} height={360} className="w-full object-cover"/>
                            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-50 flex items-center justify-center transition-all duration-300">
                                <FaPlay className="text-white text-5xl opacity-80 group-hover:opacity-100 scale-100 group-hover:scale-125 transition-transform duration-300"/>
                            </div>
                        </div>
                        <div className="p-4">
                            <h4 className="font-bold text-lg text-red-600 group-hover:text-red-700 truncate">{video.title}</h4>
                        </div>
                    </a>
                )) : <p>Could not load YouTube videos at the moment.</p>}
            </div>
        </div>
    );
}

// --- Komponen Utama untuk Section Projects ---
export default async function ProjectsSection() {
  return (
    <section id="projects" className="w-full bg-white py-24 px-8">
      <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-gray-800 mb-4">Projects & Portfolio</h2>
          <p className="text-center text-gray-500 text-lg mb-20">A showcase of my work in code and creative media.</p>
          
       
          <GitHubSection />
        
          <YouTubeSection />
      </div>
    </section>
  );
}

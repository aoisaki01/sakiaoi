/*
======================================================================
 FILE: app/components/ProjectsSection.tsx (Client Component)
======================================================================
Diubah menjadi Client Component untuk mengelola state tombol "Load More".
*/
'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { FaGithub, FaStar, FaCodeBranch } from "react-icons/fa";

const GITHUB_USERNAME = "aoisaki01";
const REPOS_PER_PAGE = 6;

// --- Komponen Utama untuk Section Projects ---
export default function ProjectsSection() {
  const [repos, setRepos] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fungsi untuk mengambil data repositori dari GitHub
  const fetchRepos = async (currentPage: number) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=${REPOS_PER_PAGE}&page=${currentPage}`);
      if (res.ok) {
        const newRepos = await res.json();
        if (newRepos.length < REPOS_PER_PAGE) {
          setHasMore(false); // Tidak ada lagi repo untuk dimuat
        }
        setRepos(prevRepos => [...prevRepos, ...newRepos]);
      } else {
        setHasMore(false); // Gagal fetch, hentikan percobaan
      }
    } catch (error) {
      console.error("Failed to fetch GitHub repos:", error);
      setHasMore(false);
    }
    setLoading(false);
  };

  // Mengambil data awal saat komponen pertama kali dimuat
  useEffect(() => {
    fetchRepos(page);
  }, []); // Hanya berjalan sekali

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchRepos(nextPage);
  };

  return (
    <section id="projects" className="w-full bg-white py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center text-gray-800 mb-4">Projects & Portfolio</h2>
        <p className="text-center text-gray-500 text-lg mb-20">A showcase of my work in code and creative media.</p>

        {/* Bagian Repositori GitHub */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold text-gray-700 flex items-center gap-3 mb-8">
            <FaGithub /> Latest GitHub Repositories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.map((repo: any) => (
              <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="group block p-6 bg-gray-50 rounded-lg border border-gray-200 hover:border-pink-500 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <h4 className="font-bold text-xl text-pink-600 group-hover:text-pink-700 truncate">{repo.name}</h4>
                <p className="text-gray-600 mt-2 text-sm h-12 overflow-hidden">{repo.description || "No description provided."}</p>
                <div className="mt-4 flex flex-wrap justify-between items-center text-gray-500 text-sm font-medium gap-2">
                  <div className="flex items-center gap-1"><FaStar className="text-yellow-500" /> {repo.stargazers_count}</div>
                  <div className="flex items-center gap-1"><FaCodeBranch className="text-green-600" /> {repo.forks_count}</div>
                  <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">{repo.language || "N/A"}</span>
                </div>
              </a>
            ))}
          </div>
          
          {/* Tombol Load More */}
          <div className="text-center mt-12">
            {loading && <p className="text-gray-500">Loading repositories...</p>}
            {!loading && hasMore && (
              <button
                onClick={handleLoadMore}
                className="bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Load More
              </button>
            )}
            {!loading && !hasMore && repos.length > 0 && (
              <p className="text-gray-500">All repositories have been loaded.</p>
            )}
            {!loading && !hasMore && repos.length === 0 && (
                 <p>Could not load GitHub repositories at the moment.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

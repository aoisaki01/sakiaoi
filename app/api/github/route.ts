/*
======================================================================
 FILE 1: app/api/github/route.ts (BUAT FILE BARU INI)
======================================================================
Buat folder 'api' di dalam 'app', lalu folder 'github' di dalamnya.
Letakkan file ini di sana. Ini akan menjadi perantara API Anda.
*/
import { NextResponse } from 'next/server';

const GITHUB_USERNAME = "aoisaki01";
const REPOS_PER_PAGE = 6;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';

    const apiUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=${REPOS_PER_PAGE}&page=${page}`;
    
    // Server Anda yang melakukan fetch, bukan browser
    const res = await fetch(apiUrl, {
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            // Anda bisa menambahkan personal access token di sini jika perlu untuk rate limit yang lebih tinggi
            // 'Authorization': `token ${process.env.GITHUB_TOKEN}` 
        }
    });

    if (!res.ok) {
        // Jika GitHub API mengembalikan error, teruskan error tersebut
        throw new Error(`Failed to fetch from GitHub API: ${res.statusText}`);
    }

    const data = await res.json();
    
    // Kirim data kembali ke komponen client Anda
    return NextResponse.json(data);

  } catch (error) {
    console.error("Error in API route:", error);
    return new NextResponse(
        JSON.stringify({ message: 'Failed to fetch repositories' }),
        { status: 500 }
    );
  }
}
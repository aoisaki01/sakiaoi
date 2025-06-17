/*
======================================================================
 FILE: app/components/AnimeQuizGame.tsx (Versi API)
======================================================================
Game ini sekarang mengambil data langsung dari Jikan API (Unofficial MAL API).
*/
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Tipe data untuk struktur pertanyaan game
interface Question {
  id: number;
  image: string;
  options: string[];
  answer: string;
}

// --- KOMPONEN GAME UTAMA ---
export default function AnimeQuizGame() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fungsi untuk mengambil data dan menyiapkan game
  const fetchAndSetupGame = async () => {
    setLoading(true);
    setError(null);
    try {
      // Mengambil data karakter terpopuler dari Jikan API
      const res = await fetch('https://api.jikan.moe/v4/top/characters');
      if (!res.ok) {
        throw new Error('Gagal mengambil data dari API.');
      }
      const data = await res.json();
      const characters = data.data;

      // Filter karakter yang tidak punya gambar
      const validCharacters = characters.filter((char: any) => char.images?.jpg?.image_url);

      // Acak semua karakter yang valid
      const shuffledCharacters = [...validCharacters].sort(() => Math.random() - 0.5);

      // Ambil 10 karakter untuk dijadikan pertanyaan
      const gameCharacters = shuffledCharacters.slice(0, 10);
      
      const newQuestions = gameCharacters.map((char: any) => {
        // Buat opsi jawaban yang salah
        const wrongOptions = shuffledCharacters
          .filter(c => c.mal_id !== char.mal_id) // Pastikan bukan karakter yang sama
          .slice(0, 3) // Ambil 3 karakter lain
          .map(c => c.name);
        
        // Gabungkan jawaban benar dan salah, lalu acak
        const options = [...wrongOptions, char.name].sort(() => Math.random() - 0.5);

        return {
          id: char.mal_id,
          image: char.images.jpg.image_url,
          options: options,
          answer: char.name,
        };
      });

      setQuestions(newQuestions);

    } catch (err) {
      setError('Tidak dapat memuat game. Coba lagi nanti.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Jalankan fetchAndSetupGame saat komponen pertama kali dimuat
  useEffect(() => {
    fetchAndSetupGame();
  }, []);

  // Jangan render apa-apa jika pertanyaan belum siap
  if (loading || questions.length === 0) {
    return (
      <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 text-center">
        <p className="text-2xl animate-pulse">Memuat Game...</p>
      </div>
    );
  }

  // Tampilkan pesan error jika ada
  if (error) {
     return (
      <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 text-center">
        <p className="text-2xl text-red-500">{error}</p>
        <button onClick={fetchAndSetupGame} className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg">Coba Lagi</button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === currentQuestion.answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    fetchAndSetupGame(); // Ambil set pertanyaan baru
  };
  
  // Tampilan saat game selesai
  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-5xl font-bold mb-4">Game Selesai!</h2>
        <p className="text-2xl mb-8">
          Skor Akhir Anda: <span className="text-yellow-400 font-bold">{score}</span> dari {questions.length}
        </p>
        <button
          onClick={handlePlayAgain}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-xl transition-transform transform hover:scale-105"
        >
          Main Lagi
        </button>
      </div>
    );
  }

  // Tampilan utama game
  return (
    <section className="bg-gray-900 text-white min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="text-2xl font-bold">Skor: <span className="text-green-400">{score}</span></div>
          <div className="text-lg text-gray-400">Pertanyaan {currentQuestionIndex + 1} / {questions.length}</div>
        </div>
        <div className="bg-gray-800 p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-700">
          <div className="mb-8 flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-black rounded-lg flex items-center justify-center overflow-hidden animate-fadeIn">
                <Image
                  key={currentQuestion.id} // Kunci untuk merender ulang gambar saat pertanyaan berubah
                  src={currentQuestion.image}
                  alt="Tebak karakter anime ini"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                  priority
                />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option) => {
              const isCorrect = option === currentQuestion.answer;
              const isSelected = option === selectedAnswer;
              
              let buttonClass = 'bg-gray-700 hover:bg-gray-600';
              if (isAnswered) {
                if (isCorrect) buttonClass = 'bg-green-500';
                else if (isSelected) buttonClass = 'bg-red-500';
                else buttonClass = 'bg-gray-700 opacity-50';
              }

              return (
                <button
                  key={option}
                  onClick={() => handleAnswerClick(option)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed ${buttonClass}`}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {isAnswered && (
            <div className="mt-8 text-center animate-fadeIn">
              <button
                onClick={handleNextQuestion}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-xl transition-transform transform hover:scale-105"
              >
                Lanjut
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

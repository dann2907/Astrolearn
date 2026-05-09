# Phase 2: Leaderboard

Task 2.1: Create Leaderboard Page
File: apps/web/src/app/leaderboard/page.tsx
typescript'use client';

import { useState, useEffect } from 'react';
import { fetchLeaderboard } from '@/lib/api/quiz';
import type { LeaderboardEntry } from '@/lib/quiz/types';

export default function LeaderboardPage() {
  const [scope, setScope] = useState<'global' | 'weekly'>('global');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchLeaderboard(scope)
      .then(setEntries)
      .finally(() => setLoading(false));
  }, [scope]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-white text-center mb-8">
          LEADERBOARD
        </h1>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setScope('global')}
            className={`px-6 py-3 rounded-lg font-bold transition ${
              scope === 'global'
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Global
          </button>
          <button
            onClick={() => setScope('weekly')}
            className={`px-6 py-3 rounded-lg font-bold transition ${
              scope === 'weekly'
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Mingguan
          </button>
        </div>

        {/* Table */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-600">
              Memuat data...
            </div>
          ) : entries.length === 0 ? (
            <div className="p-12 text-center text-gray-600">
              Belum ada data leaderboard
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left font-bold text-gray-700">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-gray-700">
                    Pemain
                  </th>
                  <th className="px-6 py-4 text-right font-bold text-gray-700">
                    Skor
                  </th>
                  <th className="px-6 py-4 text-right font-bold text-gray-700">
                    Tanggal
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {entries.map((entry) => (
                  <tr
                    key={entry.userId}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block w-8 h-8 rounded-full text-center leading-8 font-bold ${
                          entry.rank === 1
                            ? 'bg-yellow-400 text-yellow-900'
                            : entry.rank === 2
                            ? 'bg-gray-300 text-gray-900'
                            : entry.rank === 3
                            ? 'bg-orange-400 text-orange-900'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {entry.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {entry.username}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-cyan-600">
                      {entry.score.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-600">
                      {new Date(entry.completedAt).toLocaleDateString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Back button */}
        <div className="text-center mt-8">
          
            href="/arena"
            className="inline-block px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition"
          >
            ← Kembali ke Arena
          </a>
        </div>
      </div>
    </div>
  );
}
Acceptance Criteria:

- [x] Two tabs: Global and Mingguan
- [x] Fetches data on tab change
- [] Displays top 10 (or all returned)
- [] Loading and empty states
- [] Top 3 highlighted with medals
- [] Back to arena link

Task 2.2: Add Navigation Links
Update: apps/web/src/app/page.tsx (or main dashboard)
Add buttons to Arena and Leaderboard:
typescript<div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
  
    href="/arena"
    className="block p-8 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white text-center transition"
  >
    <h3 className="text-2xl font-bold mb-2">⚡ Arena Kuis Cepat</h3>
    <p>60 detik tantangan</p>
  </a>

  
    href="/leaderboard"
    className="block p-8 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white text-center transition"
  >
    <h3 className="text-2xl font-bold mb-2">🏆 Leaderboard</h3>
    <p>Siapa yang terbaik?</p>
  </a>
</div>
Acceptance Criteria:

- [] Links visible on main page
- [] Navigate correctly
- [] Hover effects work

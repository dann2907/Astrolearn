'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchLeaderboard } from '@/lib/api/quiz';
import type { LeaderboardEntry } from '@/lib/quiz/types';

export default function LeaderboardPage() {
  const [scope, setScope] = useState<'global' | 'weekly'>('global');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    setLoading(true);
    setIsSlow(false);

    const slowTimer = setTimeout(() => {
      setIsSlow(true);
    }, 2000);

    fetchLeaderboard(scope)
      .then(setEntries)
      .catch(err => {
        console.error('Failed to fetch leaderboard:', err);
        setEntries([]);
      })
      .finally(() => {
        setLoading(false);
        clearTimeout(slowTimer);
      });

    return () => clearTimeout(slowTimer);
  }, [scope]);

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black text-white text-center mb-12 tracking-tighter">
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
            <div className="p-12 text-center text-gray-600 flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              <p>{isSlow ? "Hampir sampai, sedang mengambil data..." : "Memuat data..."}</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="p-12 text-center text-gray-600">
              Belum ada data leaderboard
            </div>
          ) : (
            <div className="overflow-x-auto">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

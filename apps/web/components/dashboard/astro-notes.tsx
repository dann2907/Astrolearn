"use client";

import { useState, useEffect } from "react";
import { Trash2, BookMarked } from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { motion, AnimatePresence } from "framer-motion";

export function AstroNotes() {
  const [notes, setNotes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await apiClient.get("/notes");
        setNotes(data);
      } catch (error) {
        console.error("Failed to fetch notes", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const deleteNote = async (id: string) => {
    try {
      await apiClient.delete(`/notes/${id}`);
      setNotes(notes.filter((note) => note.id !== id));
      toast.success("Catatan dihapus");
    } catch (error) {
      toast.error("Gagal menghapus catatan");
    }
  };

  if (isLoading) return <div className="h-40 bg-slate-900/50 rounded-2xl animate-pulse" />;

  return (
    <div className="bg-slate-950/40 border border-slate-900 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4 text-violet-400">
        <BookMarked className="w-4 h-4" />
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Catatan Astro</h3>
      </div>

      <div className="space-y-3">
        {notes.length === 0 ? (
          <p className="text-[10px] text-slate-600 text-center py-6 italic">
            Belum ada catatan.
          </p>
        ) : (
          <AnimatePresence>
            {notes.slice(0, 5).map((note) => (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 group"
              >
                <div className="flex justify-between items-start gap-3">
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    "{note.content}"
                  </p>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 shrink-0"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";

interface NoteHighlighterProps {
  subchapterId: string;
  children: React.ReactNode;
}

export function NoteHighlighter({ subchapterId, children }: Readonly<NoteHighlighterProps>) {
  const [selection, setSelection] = useState<{ text: string; x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelection = () => {
    // Delay slightly to ensure selection is complete
    setTimeout(() => {
      const sel = globalThis.getSelection();
      if (sel && sel.toString().trim().length > 0) {
        const range = sel.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        setSelection({
          text: sel.toString().trim(),
          x: rect.left + rect.width / 2,
          y: rect.top - 10,
        });
      } else {
        setSelection(null);
      }
    }, 10);
  };

  const saveNote = async () => {
    if (!selection) return;

    try {
      await apiClient.post("/notes", {
        subchapter_id: subchapterId,
        content: selection.text,
      });
      toast.success("Catatan Astro disimpan! 🚀");
      setSelection(null);
      globalThis.getSelection()?.removeAllRanges();
    } catch (error) {
      toast.error("Gagal menyimpan catatan. Coba lagi!");
    }
  };

  return (
    <div ref={containerRef} onMouseUp={handleSelection} className="relative">
      {children}
      {selection && (
        <button
          onClick={saveNote}
          style={{ 
            left: selection.x, 
            top: selection.y,
            position: 'fixed'
          }}
          className="fixed -translate-x-1/2 -translate-y-full mb-4 z-50 bg-violet-600 hover:bg-violet-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.4)] animate-in fade-in zoom-in duration-200"
        >
          <Plus className="w-3 h-3" />
          Simpan Catatan
        </button>
      )}
    </div>
  );
}

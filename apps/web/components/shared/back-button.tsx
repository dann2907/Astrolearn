'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  href: string;
  label?: string;
  className?: string;
}

export function BackButton({ href, label = "Kembali", className = "" }: BackButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 group ${className}`}
    >
      <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-slate-700 transition-colors">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
      </div>
      <span className="text-sm font-bold tracking-tight">{label}</span>
    </Link>
  );
}

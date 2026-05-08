"use client";

import { useEffect } from "react";
import { Sparkles } from "lucide-react";

import { Achievements } from "@/components/dashboard/achievements";
import { AIRecommendation } from "@/components/dashboard/ai-recommendation";
import { DailyQuests } from "@/components/dashboard/daily-quests";
import { Header } from "@/components/dashboard/header";
import { LeaderboardPreview } from "@/components/dashboard/leaderboard-preview";
import { LearningPathMap } from "@/components/dashboard/learning-path-map";
import { LoadingScreen } from "@/components/dashboard/loading-screen";
import { MainQuestCard } from "@/components/dashboard/main-quest-card";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { QuickStats } from "@/components/dashboard/quick-stats";
import { Sidebar } from "@/components/dashboard/sidebar";
import { useUiStore } from "@/store/use-ui-store";
import { useUserStore } from "@/store/use-user-store";

export function DashboardPage() {
  const userData = useUserStore((state) => state.userData);
  const currentView = useUiStore((state) => state.currentView);
  const isLoading = useUiStore((state) => state.isLoading);
  const setCurrentView = useUiStore((state) => state.setCurrentView);
  const setIsLoading = useUiStore((state) => state.setIsLoading);

  const levelProgress = Math.round((userData.xp / userData.nextLevelXp) * 100);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  const navigateTo = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-violet-500/30 overflow-x-hidden pb-20 md:pb-0">
      <div className="flex">
        <Sidebar
          currentView={currentView}
          levelProgress={levelProgress}
          onNavigate={navigateTo}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <Header levelProgress={levelProgress} onNavigate={navigateTo} />

          <main className="p-4 md:p-8 lg:p-12 space-y-10 max-w-7xl mx-auto w-full">
            <QuickStats />

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              <div className="xl:col-span-8 space-y-10">
                <MainQuestCard onNavigate={navigateTo} />
                <LearningPathMap onNavigate={navigateTo} />
              </div>

              <div className="xl:col-span-4 h-full">
                <DailyQuests />
              </div>
            </div>

            <AIRecommendation onNavigate={navigateTo} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-10 border-t border-slate-900">
              <LeaderboardPreview onNavigate={navigateTo} />
              <Achievements onNavigate={navigateTo} />
            </div>
          </main>
        </div>
      </div>

      <MobileNav currentView={currentView} onNavigate={navigateTo} />

      <button className="fixed bottom-24 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-fuchsia-600 text-white rounded-full shadow-[0_0_30px_rgba(192,38,211,0.5)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group">
        <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        <div className="absolute right-full mr-4 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Oracle Kosmik & Notes
        </div>
      </button>

      <style jsx global>{`
        @keyframes shimmer {
          100% {
            background-position: -250% -250%;
          }
        }
      `}</style>
    </div>
  );
}

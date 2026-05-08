'use client';

export default function GameUI() {
  return (
    <div className="absolute top-4 right-4 z-10 pointer-events-none">
      <div className="bg-black/50 backdrop-blur-md p-4 rounded-lg border border-white/20">
        <h2 className="text-white font-bold">HUD</h2>
        <p className="text-blue-400">Fuel: 100%</p>
      </div>
    </div>
  );
}

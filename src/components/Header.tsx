import React from 'react';
import { BookOpen, Home, RefreshCw, GraduationCap } from 'lucide-react';
import type { MissionId, UserProgress } from '../types';

interface HeaderProps {
  currentView: 'dashboard' | MissionId;
  onNavigate: (view: 'dashboard' | MissionId) => void;
  onOpenQuickNotes: () => void;
  onResetProgress: () => void;
  progress: UserProgress;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenQuickNotes,
  onResetProgress,
  progress,
}) => {
  const completedCount = Object.values(progress).filter(s => s === 'complete').length;

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-cyan-500/20">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-300">
                SDLC & Agile Learning Lab
              </span>
              <span className="hidden md:inline-block px-2 py-0.5 text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-700/50 rounded-full">
                BTEC Level 3
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              Computing Unit 3 — Software Development Methods & Project Management
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {currentView !== 'dashboard' && (
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-all border border-slate-700"
              title="Return to Toolkit Dashboard"
            >
              <Home className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Toolkit Home</span>
            </button>
          )}

          {/* QUICK NOTES PERMANENT BUTTON */}
          <button
            onClick={onOpenQuickNotes}
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-sm font-bold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md shadow-cyan-600/30 transition-all border border-cyan-400/30 animate-pulse-subtle active:scale-95"
            title="Access revision & assignment notes"
          >
            <BookOpen className="w-4 h-4 text-amber-300 fill-amber-300/20" />
            <span>📚 QUICK NOTES</span>
          </button>

          {/* Reset progress */}
          <button
            onClick={onResetProgress}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 border border-transparent hover:border-rose-900/40 transition-colors"
            title="Reset All Mission Progress"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Progress Pill */}
          <div className="hidden lg:flex items-center space-x-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60 text-xs text-slate-300">
            <span className="text-cyan-400 font-bold">{completedCount}/5</span>
            <span>Missions</span>
          </div>

        </div>
      </div>
    </header>
  );
};

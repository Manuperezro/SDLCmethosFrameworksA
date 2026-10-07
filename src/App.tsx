import React, { useState, useEffect } from 'react';
import type { MissionId, UserProgress } from './types';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { QuickNotesModal } from './components/QuickNotesModal';
import { Mission1_SDLC } from './components/Mission1_SDLC';
import { Mission2_Models } from './components/Mission2_Models';
import { Mission3_Agile } from './components/Mission3_Agile';
import { Mission4_Scrum } from './components/Mission4_Scrum';
import { Mission6_Consultant } from './components/Mission6_Consultant';

const DEFAULT_PROGRESS: UserProgress = {
  mission1: 'not-started',
  mission2: 'not-started',
  mission3: 'not-started',
  mission4: 'not-started',
  mission5: 'not-started',
};

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | MissionId>('dashboard');
  const [isQuickNotesOpen, setIsQuickNotesOpen] = useState<boolean>(false);
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('sdlc_lab_progress_v2');
      return saved ? JSON.parse(saved) : DEFAULT_PROGRESS;
    } catch {
      return DEFAULT_PROGRESS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sdlc_lab_progress_v2', JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to persist progress:', e);
    }
  }, [progress]);

  const handleSelectMission = (missionId: MissionId) => {
    if (progress[missionId] === 'not-started') {
      setProgress(prev => ({ ...prev, [missionId]: 'in-progress' }));
    }
    setCurrentView(missionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteMission = (missionId: MissionId) => {
    setProgress(prev => ({ ...prev, [missionId]: 'complete' }));
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all mission progress?')) {
      setProgress(DEFAULT_PROGRESS);
      setCurrentView('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Sticky Navigation Header */}
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenQuickNotes={() => setIsQuickNotesOpen(true)}
        onResetProgress={handleResetProgress}
        progress={progress}
      />

      {/* Main View Router */}
      <main className="flex-1 pb-16">
        {currentView === 'dashboard' && (
          <Dashboard
            progress={progress}
            onSelectMission={handleSelectMission}
            onOpenQuickNotes={() => setIsQuickNotesOpen(true)}
          />
        )}

        {currentView === 'mission1' && (
          <Mission1_SDLC
            onComplete={() => {
              handleCompleteMission('mission1');
              setCurrentView('mission2');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenQuickNotes={() => setIsQuickNotesOpen(true)}
          />
        )}

        {currentView === 'mission2' && (
          <Mission2_Models
            onComplete={() => {
              handleCompleteMission('mission2');
              setCurrentView('mission3');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenQuickNotes={() => setIsQuickNotesOpen(true)}
          />
        )}

        {currentView === 'mission3' && (
          <Mission3_Agile
            onComplete={() => {
              handleCompleteMission('mission3');
              setCurrentView('mission4');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenQuickNotes={() => setIsQuickNotesOpen(true)}
          />
        )}

        {currentView === 'mission4' && (
          <Mission4_Scrum
            onComplete={() => {
              handleCompleteMission('mission4');
              setCurrentView('mission5');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenQuickNotes={() => setIsQuickNotesOpen(true)}
          />
        )}

        {currentView === 'mission5' && (
          <Mission6_Consultant
            onComplete={() => {
              handleCompleteMission('mission5');
              setCurrentView('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenQuickNotes={() => setIsQuickNotesOpen(true)}
          />
        )}
      </main>

      {/* Permanent Quick Notes Modal */}
      <QuickNotesModal
        isOpen={isQuickNotesOpen}
        onClose={() => setIsQuickNotesOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-xs text-slate-400 space-y-1">
        <p className="font-semibold text-slate-300">
          Interactive SDLC Methods & Frameworks Learning Lab — BTEC Level 3 Computing
        </p>
        <p className="text-slate-400">
          Designed for UK BTEC Computing Unit 3 (Information Technology Systems & Software Project Management)
        </p>
      </footer>

    </div>
  );
};

export default App;

import React from 'react';
import type { MissionId, UserProgress } from '../types';
import { 
  RefreshCw, 
  Map, 
  Zap, 
  Play, 
  Kanban as KanbanIcon, 
  Briefcase, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface DashboardProps {
  progress: UserProgress;
  onSelectMission: (missionId: MissionId) => void;
  onOpenQuickNotes: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  progress,
  onSelectMission,
  onOpenQuickNotes,
}) => {
  const missionsList = [
    {
      id: 'mission1' as MissionId,
      number: 1,
      title: 'SDLC REFRESH',
      subtitle: 'FROM IDEA TO WORKING SOFTWARE',
      icon: '🔄',
      LucideIcon: RefreshCw,
      time: '~10 min',
      description: 'Explore the 8 stages of software development, sort evidence artefacts, and clarify SDLC terminology.',
      tags: ['8 Stages', 'Evidence Matching', 'Terminology Hierarchy'],
      color: 'from-blue-600/20 to-cyan-600/10 border-blue-500/30 hover:border-blue-400',
      badgeColor: 'text-cyan-400 bg-cyan-950/80 border-cyan-800',
    },
    {
      id: 'mission2' as MissionId,
      number: 2,
      title: 'METHODS & MODELS',
      subtitle: 'RECOMMEND THE APPROACH',
      icon: '🗺️',
      LucideIcon: Map,
      time: '~10 min',
      description: 'Compare Waterfall, V-Model, Spiral, Iterative, and Agile. Match project characteristics and justify choices.',
      tags: ['Waterfall', 'V-Model', 'Spiral', 'Agile', 'Justification'],
      color: 'from-indigo-600/20 to-blue-600/10 border-indigo-500/30 hover:border-indigo-400',
      badgeColor: 'text-indigo-400 bg-indigo-950/80 border-indigo-800',
    },
    {
      id: 'mission3' as MissionId,
      number: 3,
      title: 'AGILE THINKING',
      subtitle: 'THE CLIENT CHANGED THEIR MIND!',
      icon: '⚡',
      LucideIcon: Zap,
      time: '~15 min',
      description: 'Handle changing client priorities, explore Agile values in practice, reorder Product Backlogs, and build User Stories.',
      tags: ['Agile Values', 'Product Backlog', 'User Stories', 'Change Control'],
      color: 'from-amber-600/20 to-yellow-600/10 border-amber-500/30 hover:border-amber-400',
      badgeColor: 'text-amber-400 bg-amber-950/80 border-amber-800',
    },
    {
      id: 'mission4' as MissionId,
      number: 4,
      title: 'SCRUM LAB',
      subtitle: 'RUN A SPRINT',
      icon: '🏃',
      LucideIcon: Play,
      time: '~20 min',
      description: 'Assign Scrum team roles, manage effort points within team capacity, solve mid-Sprint blockers, and run Retrospectives.',
      tags: ['Product Owner', 'Scrum Master', 'Sprint Capacity', 'Retrospective'],
      color: 'from-emerald-600/20 to-teal-600/10 border-emerald-500/30 hover:border-emerald-400',
      badgeColor: 'text-emerald-400 bg-emerald-950/80 border-emerald-800',
    },
    {
      id: 'mission5' as MissionId,
      number: 5,
      title: 'KANBAN LAB',
      subtitle: 'CONTROL THE FLOW OF WORK',
      icon: '📋',
      LucideIcon: KanbanIcon,
      time: '~15 min',
      description: 'Visualise workflow, set WIP limits to fix bottlenecks, manage continuous flow, and explore Scrumban hybrids.',
      tags: ['WIP Limits', 'Bottlenecks', 'Continuous Flow', 'Scrumban'],
      color: 'from-purple-600/20 to-pink-600/10 border-purple-500/30 hover:border-purple-400',
      badgeColor: 'text-purple-400 bg-purple-950/80 border-purple-800',
    },
    {
      id: 'mission6' as MissionId,
      number: 6,
      title: 'PROJECT CONSULTANT',
      subtitle: 'COLLEGE EVENT BOOKING SYSTEM',
      icon: '👔',
      LucideIcon: Briefcase,
      time: '~25 min',
      description: 'Integrate SDLC, methodologies, Scrum, Kanban, stakeholders, triple constraints, risks, and testing in a real scenario.',
      tags: ['Stakeholders', 'Triple Constraint', 'Risk Matrix', 'Test Cases'],
      color: 'from-cyan-600/20 to-sky-600/10 border-cyan-500/30 hover:border-cyan-400',
      badgeColor: 'text-cyan-400 bg-cyan-950/80 border-cyan-800',
    },
  ];

  const getStatusBadge = (status: 'not-started' | 'in-progress' | 'complete') => {
    switch (status) {
      case 'complete':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/80 shadow-sm">
            ✓ COMPLETE
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-700/80 shadow-sm animate-pulse">
            ◐ IN PROGRESS
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700">
            ○ NOT STARTED
          </span>
        );
    }
  };

  const completedMissions = Object.values(progress).filter(s => s === 'complete').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute -right-10 -top-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Learning & Revision Toolkit</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            YOUR SOFTWARE DEVELOPMENT TOOLKIT
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Welcome to the interactive SDLC Methods & Frameworks lab designed specifically for UK BTEC Level 3 Computing. Complete practical learning missions, experiment with live project simulations, and use Quick Notes as a reference for your Unit 3 coursework assignments.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onOpenQuickNotes}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-600/25 transition-all active:scale-95"
            >
              <BookOpen className="w-4 h-4 text-amber-300 fill-amber-300/20" />
              <span>📚 OPEN QUICK NOTES</span>
            </button>

            <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-800">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Total Lab Time: <strong>~90 mins</strong> (Do at your own pace)</span>
            </div>
          </div>
        </div>

        {/* Progress Card */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 border border-slate-700">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Overall Mission Completion</div>
              <div className="text-lg font-bold text-white">
                {completedMissions} of 6 Missions Finished
              </div>
            </div>
          </div>

          <div className="w-full sm:w-64 bg-slate-900 rounded-full h-3 p-0.5 border border-slate-800 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${(completedMissions / 6) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Mission Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>🚀 LEARNING MISSIONS</span>
            <span className="text-xs font-semibold text-slate-400 font-mono">(LEARN → TRY → APPLY → CHECK → USE IN ASSIGNMENT)</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missionsList.map((m) => {
            const status = progress[m.id];
            return (
              <div
                key={m.id}
                onClick={() => onSelectMission(m.id)}
                className={`group relative rounded-2xl p-6 bg-gradient-to-b ${m.color} glass-card glass-card-hover cursor-pointer flex flex-col justify-between space-y-4 transition-all duration-300`}
              >
                <div className="space-y-3">
                  
                  {/* Top Bar: Mission Number & Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{m.icon}</span>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        MISSION {m.number}
                      </span>
                    </div>
                    {getStatusBadge(status)}
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                      {m.title}
                    </h3>
                    <p className="text-xs font-semibold text-cyan-400 mt-0.5 tracking-wide">
                      {m.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {m.description}
                  </p>

                  {/* Topic Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {m.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[10px] font-medium bg-slate-900/80 text-slate-300 rounded-md border border-slate-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Footer Bar */}
                <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{m.time}</span>
                  </span>

                  <button className="flex items-center space-x-1 font-bold text-cyan-400 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all">
                    <span>{status === 'complete' ? 'Replay Mission' : status === 'in-progress' ? 'Continue Mission' : 'Start Mission'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw
} from 'lucide-react';
import type { EvidenceCard, SDLCStage } from '../types';

interface Mission1Props {
  onComplete: () => void;
  onOpenQuickNotes: () => void;
}

const STAGES: SDLCStage[] = [
  {
    id: 'idea',
    name: '1. IDEA',
    icon: '💡',
    whatHappens: 'An initial concept, problem, or business opportunity is identified by stakeholders.',
    example: 'Students complain about difficulty seeing available study rooms and reporting IT issues.',
    possibleEvidence: ['Project proposal', 'Feasibility concept brief', 'Initial problem statement'],
  },
  {
    id: 'planning',
    name: '2. PLANNING',
    icon: '📅',
    whatHappens: 'The team defines project goals, budgets, timelines, resources, feasibility, and risk assessments.',
    example: 'Determining that the College Student App must be delivered within 12 weeks for £5,000 budget.',
    possibleEvidence: ['Gantt chart', 'Project plan', 'Budget allocation', 'Resource plan', 'Risk log'],
  },
  {
    id: 'analysis',
    name: '3. ANALYSIS / REQUIREMENTS',
    icon: '🔍',
    whatHappens: 'The development team investigates what users and stakeholders actually need from the solution.',
    example: 'Students need to be able to view available study rooms before making a booking.',
    possibleEvidence: [
      'Stakeholder interviews',
      'Requirements specification',
      'User stories',
      'Functional requirements',
      'Non-functional requirements',
    ],
  },
  {
    id: 'design',
    name: '4. DESIGN',
    icon: '✏️',
    whatHappens: 'The team plans how the software will look, function, and store data before writing code.',
    example: 'Creating mobile UI wireframes and designing the SQL relational database tables.',
    possibleEvidence: [
      'Wireframes',
      'Flowcharts',
      'UML diagrams',
      'ERD (Entity Relationship Diagram)',
      'Pseudocode',
      'Interface designs',
      'Database designs',
    ],
  },
  {
    id: 'development',
    name: '5. DEVELOPMENT',
    icon: '💻',
    whatHappens: 'Programmers write code and build software modules based on design specifications.',
    example: 'Writing React components and backend API endpoints for study room reservations.',
    possibleEvidence: ['Source code repository', 'Version control commits', 'API documentation', 'Code review logs'],
  },
  {
    id: 'testing',
    name: '6. TESTING',
    icon: '🧪',
    whatHappens: 'The system is thoroughly verified to ensure it meets requirements and contains no critical bugs.',
    example: 'Verifying that a student cannot book a room that is already reserved by another user.',
    possibleEvidence: [
      'Test plan',
      'Test cases & test table',
      'Expected result vs Actual result',
      'Screenshots of test execution',
      'Bug evidence / logs',
      'Retesting records',
    ],
  },
  {
    id: 'deployment',
    name: '7. DEPLOYMENT',
    icon: '🚀',
    whatHappens: 'The tested software is released and installed into the live production environment for users.',
    example: 'Publishing the College Student App to student app stores and launching servers.',
    possibleEvidence: ['Deployment checklist', 'Release notes', 'User installation guide', 'Server configuration'],
  },
  {
    id: 'maintenance',
    name: '8. MAINTENANCE / EVALUATION',
    icon: '🛠️',
    whatHappens: 'The solution is regularly updated, bugs are patched, and performance is evaluated against goals.',
    example: 'Adding a dark mode option based on student feedback after 3 months of live usage.',
    possibleEvidence: ['User feedback survey results', 'Bug patch reports', 'Evaluation report', 'System maintenance logs'],
  },
];

const INITIAL_EVIDENCE: EvidenceCard[] = [
  { id: 'ev1', label: 'User requirements', icon: '📄', correctStageId: 'analysis', hint: 'Gained during stakeholder investigations.' },
  { id: 'ev2', label: 'Wireframe design', icon: '🖼️', correctStageId: 'design', hint: 'Visual blueprint created before writing code.' },
  { id: 'ev3', label: 'ERD (Database Diagram)', icon: '🗃️', correctStageId: 'design', hint: 'Defines database structure and entity relationships.' },
  { id: 'ev4', label: 'Source code', icon: '💻', correctStageId: 'development', hint: 'Written by developers during implementation.' },
  { id: 'ev5', label: 'Test table & results', icon: '🧪', correctStageId: 'testing', hint: 'Contains expected vs actual test outcomes.' },
  { id: 'ev6', label: 'Bug report log', icon: '🐛', correctStageId: 'testing', hint: 'Records defects found during verification.' },
  { id: 'ev7', label: 'User feedback', icon: '👤', correctStageId: 'maintenance', hint: 'Gathered from live users after deployment.' },
  { id: 'ev8', label: 'Project Evaluation', icon: '📊', correctStageId: 'maintenance', hint: 'Assesses total project success against objectives.' },
];

export const Mission1_SDLC: React.FC<Mission1Props> = ({ onComplete, onOpenQuickNotes }) => {
  const [selectedStageId, setSelectedStageId] = useState<string>('analysis');
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  
  // Placed evidence mapping: cardId -> stageId
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const activeStage = STAGES.find(s => s.id === selectedStageId) || STAGES[0];

  const handleCardClick = (cardId: string) => {
    if (isCompleted) return;
    setSelectedCardId(cardId === selectedCardId ? null : cardId);
    setFeedbackMsg(null);
  };

  const handleStagePlaceClick = (stageId: string) => {
    if (!selectedCardId || isCompleted) {
      setSelectedStageId(stageId);
      return;
    }

    const card = INITIAL_EVIDENCE.find(c => c.id === selectedCardId);
    if (!card) return;

    if (card.correctStageId === stageId) {
      const newPlacements = { ...placements, [card.id]: stageId };
      setPlacements(newPlacements);
      setSelectedCardId(null);
      setFeedbackMsg({
        type: 'success',
        text: `✓ Spot on! "${card.label}" belongs in ${STAGES.find(s => s.id === stageId)?.name}.`,
      });

      // Check if all items placed
      if (Object.keys(newPlacements).length === INITIAL_EVIDENCE.length) {
        setIsCompleted(true);
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        onComplete();
      }
    } else {
      setFeedbackMsg({
        type: 'error',
        text: `✕ Not quite! "${card.label}" doesn't belong in ${STAGES.find(s => s.id === stageId)?.name}. Hint: ${card.hint}`,
      });
    }
  };

  const resetChallenge = () => {
    setPlacements({});
    setSelectedCardId(null);
    setFeedbackMsg(null);
    setIsCompleted(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-3xl sm:text-4xl">🔄</span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">MISSION 1 (~10 MINS)</span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white">FROM IDEA TO WORKING SOFTWARE</h1>
            </div>
          </div>

          <button
            onClick={onOpenQuickNotes}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs rounded-xl border border-slate-700 flex items-center gap-2"
          >
            📚 View Quick Notes
          </button>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="p-3 bg-cyan-950/80 text-cyan-300 rounded-xl border border-cyan-800 shrink-0 font-bold text-xs uppercase tracking-wider">
            PROJECT SCENARIO
          </div>
          <div>
            <h3 className="font-bold text-white text-base">🏫 College Student Mobile App</h3>
            <p className="text-xs text-slate-300">
              The college wants an application allowing students to: <strong>view timetables</strong>, <strong>book study rooms</strong>, <strong>receive notifications</strong>, and <strong>report technical issues</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 1: INTERACTIVE LIFECYCLE DIAGRAM */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>1️⃣ THE 8 SDLC STAGES</span>
            <span className="text-xs text-slate-400 font-normal">(Click any stage to inspect details)</span>
          </h2>
        </div>

        {/* Lifecycle Stepper Diagram */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {STAGES.map((stage) => {
            const isSelected = stage.id === selectedStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between h-28 ${
                  isSelected
                    ? 'bg-cyan-950/90 border-cyan-400 shadow-lg shadow-cyan-950/50 scale-[1.03]'
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">{stage.icon}</span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
                </div>
                <div>
                  <div className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-cyan-300' : 'text-slate-400'}`}>
                    Stage {stage.id}
                  </div>
                  <div className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                    {stage.name.split('. ')[1]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
            <span className="text-3xl">{activeStage.icon}</span>
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">STAGE INSPECTOR</span>
              <h3 className="text-2xl font-extrabold text-white">{activeStage.name}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* What Happens */}
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80 space-y-2">
              <h4 className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>❓ WHAT HAPPENS?</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {activeStage.whatHappens}
              </p>
            </div>

            {/* Example */}
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80 space-y-2">
              <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>💡 COLLEGE APP EXAMPLE</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {activeStage.example}
              </p>
            </div>

            {/* Possible Evidence */}
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80 space-y-2">
              <h4 className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>📁 POSSIBLE EVIDENCE</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeStage.possibleEvidence.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION 2: MINI CHALLENGE - WHERE DOES THE EVIDENCE GO? */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>2️⃣ MINI CHALLENGE — WHERE DOES THE EVIDENCE GO?</span>
            </h2>
            <p className="text-xs text-slate-400">
              Select an evidence card below, then click its correct SDLC lifecycle stage to place it.
            </p>
          </div>

          <button
            onClick={resetChallenge}
            className="self-start sm:self-auto px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl border border-slate-700 flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Challenge</span>
          </button>
        </div>

        {/* Feedback Alert */}
        {feedbackMsg && (
          <div className={`p-4 rounded-2xl border flex items-center space-x-3 text-xs sm:text-sm font-semibold transition-all ${
            feedbackMsg.type === 'success' 
              ? 'bg-emerald-950/80 border-emerald-700 text-emerald-200' 
              : 'bg-rose-950/80 border-rose-700 text-rose-200'
          }`}>
            {feedbackMsg.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
            <span>{feedbackMsg.text}</span>
          </div>
        )}

        {/* Evidence Card Deck */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>UNPLACED EVIDENCE CARDS ({INITIAL_EVIDENCE.length - Object.keys(placements).length} REMAINING)</span>
            {selectedCardId && <span className="text-cyan-400 font-bold animate-pulse">◉ CARD SELECTED! NOW CLICK A STAGE BELOW</span>}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {INITIAL_EVIDENCE.map((card) => {
              const isPlaced = placements[card.id] !== undefined;
              const isSelected = selectedCardId === card.id;

              if (isPlaced) {
                return (
                  <div
                    key={card.id}
                    className="p-3 rounded-2xl bg-slate-950/40 border border-slate-800 text-slate-500 opacity-60 flex items-center justify-between text-xs"
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span>{card.icon}</span>
                      <span className="line-through">{card.label}</span>
                    </span>
                    <span className="text-emerald-400 font-bold">✓</span>
                  </div>
                );
              }

              return (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-600 text-white border-cyan-300 shadow-lg shadow-cyan-600/40 scale-105 font-bold ring-2 ring-cyan-400'
                      : 'bg-slate-950 border-slate-700 text-slate-200 hover:border-cyan-500 hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2 text-xs font-medium truncate">
                    <span className="text-base">{card.icon}</span>
                    <span>{card.label}</span>
                  </span>
                  <span className="text-xs">{isSelected ? '◉' : '○'}</span>
                </button>
              );
            })}
          </div>

          {/* Stage Drop Targets */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              TARGET SDLC STAGES (CLICK TO PLACE SELECTED CARD)
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STAGES.map((stage) => {
                const itemsInStage = INITIAL_EVIDENCE.filter(c => placements[c.id] === stage.id);

                return (
                  <div
                    key={stage.id}
                    onClick={() => handleStagePlaceClick(stage.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                      selectedCardId
                        ? 'bg-cyan-950/40 border-cyan-500/80 hover:bg-cyan-900/60 hover:border-cyan-400 shadow-md'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <span>{stage.icon}</span>
                        <span>{stage.name}</span>
                      </span>
                    </div>

                    <div className="min-h-[32px] flex flex-wrap gap-1 items-center">
                      {itemsInStage.length === 0 ? (
                        <span className="text-[10px] text-slate-500 italic">No evidence placed yet</span>
                      ) : (
                        itemsInStage.map(item => (
                          <span key={item.id} className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-700 rounded-md text-[10px] font-bold flex items-center gap-1">
                            <span>✓</span>
                            <span>{item.label}</span>
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: VERY IMPORTANT TERMINOLOGY CLARIFICATION */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-xs font-bold uppercase tracking-wider">
            CRITICAL CONCEPT DISTINCTION
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            THESE WORDS ARE RELATED — BUT THEY DO NOT MEAN EXACTLY THE SAME THING!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Students commonly confuse SDLC, Models, Agile, Frameworks, and Practices. Here is how they fit together:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">1. SDLC</div>
            <h3 className="font-extrabold text-white text-base">Software Lifecycle</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              The overall lifecycle of developing software.
            </p>
            <div className="p-2.5 bg-slate-900 rounded-xl text-[11px] font-mono text-cyan-300 border border-slate-800">
              Requirements → Design → Build → Test → Deploy → Maintain
            </div>
          </div>

          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">2. METHOD / MODEL</div>
            <h3 className="font-extrabold text-white text-base">Development Model</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              A way of organising how development progresses through those activities.
            </p>
            <div className="p-2.5 bg-slate-900 rounded-xl text-[11px] font-mono text-indigo-300 border border-slate-800">
              💧 Waterfall | V V-Model | 🌀 Spiral | 🔁 Iterative | ⚡ Agile
            </div>
          </div>

          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">3. FRAMEWORK & PRACTICES</div>
            <h3 className="font-extrabold text-white text-base">Scrum Framework</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Structured ways teams organise work. Frameworks like Scrum are <strong>NOT</strong> SDLC stages!
            </p>
            <div className="p-2.5 bg-slate-900 rounded-xl text-[11px] font-mono text-amber-300 border border-slate-800">
              Product Backlog | Sprint | Daily Scrum | Increment
            </div>
          </div>

        </div>

        {/* Visual Hierarchy Tree */}
        <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
          <h4 className="text-sm font-bold text-slate-200">SOFTWARE DEVELOPMENT HIERARCHY TREE</h4>
          <div className="font-mono text-xs text-cyan-300 bg-slate-900 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
            <pre>{`SOFTWARE DEVELOPMENT
│
├── SDLC
│   └── What activities happen during development?
│
├── DEVELOPMENT APPROACH / MODEL
│   └── How is development organised?
│
└── FRAMEWORK / PRACTICES
    └── How does the team organise and manage the work?`}</pre>
          </div>
        </div>
      </div>

      {/* MISSION COMPLETION BANNER */}
      {isCompleted && (
        <div className="rounded-3xl bg-gradient-to-r from-emerald-900/90 to-teal-900/90 border border-emerald-500/50 p-6 text-center space-y-3 shadow-2xl animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 text-xs font-bold">
            ✓ MISSION ACCOMPLISHED
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            ✓ SDLC REFRESH COMPLETE!
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl mx-auto">
            Great job! You have reviewed the 8 SDLC stages, correctly placed project evidence, and mastered the fundamental distinction between SDLC, Models, Agile, and Frameworks.
          </p>
          <div className="pt-2">
            <button
              onClick={onComplete}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-2xl shadow-lg transition-all"
            >
              Continue to Mission 2: Methods & Models →
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

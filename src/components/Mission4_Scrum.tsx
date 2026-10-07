import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';

interface Mission4Props {
  onComplete: () => void;
  onOpenQuickNotes: () => void;
}

interface BacklogItemScrum {
  id: string;
  title: string;
  points: number;
}

const PRODUCT_BACKLOG_ITEMS: BacklogItemScrum[] = [
  { id: 's1', title: '🔐 Login & Authentication', points: 3 },
  { id: 's2', title: '🔎 Search Available Rooms', points: 2 },
  { id: 's3', title: '📅 Book Study Room', points: 5 },
  { id: 's4', title: '❌ Cancel Booking', points: 3 },
  { id: 's5', title: '🔔 Push Notifications', points: 5 },
  { id: 's6', title: '📱 Mobile Design Optimization', points: 4 },
];

export const Mission4_Scrum: React.FC<Mission4Props> = ({ onComplete, onOpenQuickNotes }) => {
  // Step 1: Role Matching
  const [roleAssignments, setRoleAssignments] = useState<Record<string, 'po' | 'sm' | 'dev'>>({});
  const [rolesSubmitted, setRolesSubmitted] = useState<boolean>(false);
  const [roleFeedback, setRoleFeedback] = useState<string | null>(null);

  // Step 2: Build a Sprint (Capacity = 10)
  const [selectedSprintItems, setSelectedSprintItems] = useState<string[]>([]);
  const [sprintStarted, setSprintStarted] = useState<boolean>(false);

  // Step 3: Sprint Execution Board
  const [sprintProgress, setSprintProgress] = useState<Record<string, 'todo' | 'doing' | 'testing' | 'done'>>({});
  const [blockerResolved, setBlockerResolved] = useState<boolean>(false);
  const [blockerChoice, setBlockerChoice] = useState<string | null>(null);

  // Step 4: Sprint Review & Retro
  const [reviewDone, setReviewDone] = useState<boolean>(false);
  const [retroSelections, setRetroSelections] = useState<string[]>([]);
  const [retroFeedback, setRetroFeedback] = useState<string | null>(null);

  const totalSelectedPoints = selectedSprintItems.reduce((acc, id) => {
    const item = PRODUCT_BACKLOG_ITEMS.find(i => i.id === id);
    return acc + (item?.points || 0);
  }, 0);

  const handleToggleSprintItem = (id: string) => {
    if (sprintStarted) return;
    const item = PRODUCT_BACKLOG_ITEMS.find(i => i.id === id);
    if (!item) return;

    if (selectedSprintItems.includes(id)) {
      setSelectedSprintItems(selectedSprintItems.filter(i => i !== id));
    } else {
      if (totalSelectedPoints + item.points <= 10) {
        setSelectedSprintItems([...selectedSprintItems, id]);
      }
    }
  };

  const handleVerifyRoles = () => {
    const r1 = roleAssignments['r1'] === 'po';
    const r2 = roleAssignments['r2'] === 'dev';
    const r3 = roleAssignments['r3'] === 'sm';
    const r4 = roleAssignments['r4'] === 'po';

    if (r1 && r2 && r3 && r4) {
      setRolesSubmitted(true);
      setRoleFeedback(null);
    } else {
      setRoleFeedback('✕ Developmental Feedback: Accountabilities are incorrect! Product Owner manages backlog ordering & stakeholder needs; Scrum Master removes impediments/blockers; Developers build the usable product Increment.');
      setRolesSubmitted(false);
    }
  };

  const handleStartSprint = () => {
    if (selectedSprintItems.length === 0) return;
    setSprintStarted(true);

    const initialProg: Record<string, 'todo' | 'doing' | 'testing' | 'done'> = {};
    selectedSprintItems.forEach(id => {
      initialProg[id] = 'todo';
    });
    setSprintProgress(initialProg);
  };

  // Simulate progress when blocker is resolved
  useEffect(() => {
    if (blockerResolved && sprintStarted) {
      const timer1 = setTimeout(() => {
        setSprintProgress(prev => {
          const updated = { ...prev };
          Object.keys(updated).forEach(id => { updated[id] = 'doing'; });
          return updated;
        });
      }, 1000);

      const timer2 = setTimeout(() => {
        setSprintProgress(prev => {
          const updated = { ...prev };
          Object.keys(updated).forEach(id => { updated[id] = 'testing'; });
          return updated;
        });
      }, 2500);

      const timer3 = setTimeout(() => {
        setSprintProgress(prev => {
          const updated = { ...prev };
          Object.keys(updated).forEach(id => { updated[id] = 'done'; });
          return updated;
        });
      }, 4000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [blockerResolved, sprintStarted]);

  const handleBlockerChoice = (role: string) => {
    setBlockerChoice(role);
    if (role === 'sm') {
      setBlockerResolved(true);
    }
  };

  const toggleRetroSelection = (id: string) => {
    let updated: string[];
    if (retroSelections.includes(id)) {
      updated = retroSelections.filter(i => i !== id);
    } else {
      updated = [...retroSelections, id];
    }
    setRetroSelections(updated);

    if (updated.includes('ignore')) {
      setRetroFeedback('✕ Developmental Feedback: Ignoring stakeholder feedback violates Scrum principles. The Retrospective focuses on process improvements and team collaboration, not avoiding feedback!');
    } else {
      setRetroFeedback(null);
    }
  };

  const isRetroValid = retroSelections.includes('communicate') && retroSelections.includes('coordination') && !retroSelections.includes('ignore');

  const isMissionFinished = 
    rolesSubmitted &&
    blockerResolved &&
    reviewDone &&
    isRetroValid;

  const handleFinishMission = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    onComplete();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Banner */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-3xl sm:text-4xl">🏃</span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">MISSION 4 (~20 MINS)</span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white">SCRUM LAB: RUN A SPRINT</h1>
            </div>
          </div>

          <button
            onClick={onOpenQuickNotes}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs rounded-xl border border-slate-700 flex items-center gap-2"
          >
            📚 View Quick Notes
          </button>
        </div>

        <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs space-y-1 text-slate-300">
          <p>
            <strong>Scrum is a Framework</strong> used to organize iterative and incremental work.
          </p>
          <p className="text-emerald-300 font-semibold">
            Remember: Scrum is NOT an SDLC stage, and Scrum is NOT identical to Agile (Agile is the philosophy; Scrum is one specific framework).
          </p>
        </div>
      </div>

      {/* SECTION 1: SCRUM TEAM ROLES */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">ACCOUNTABILITIES</span>
          <h2 className="text-xl font-extrabold text-white">THE SCRUM TEAM ROLES</h2>
          <p className="text-xs text-slate-400 mt-1">
            Assign the correct role to each accountability:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center space-x-3">
            <span className="text-2xl">👤</span>
            <div>
              <h4 className="font-bold text-white text-sm">Product Owner</h4>
              <p className="text-[11px] text-slate-400">Focuses on product value & orders Product Backlog.</p>
            </div>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center space-x-3">
            <span className="text-2xl">🧭</span>
            <div>
              <h4 className="font-bold text-white text-sm">Scrum Master</h4>
              <p className="text-[11px] text-slate-400">Facilitates Scrum & removes team impediments (not the boss!).</p>
            </div>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center space-x-3">
            <span className="text-2xl">💻</span>
            <div>
              <h4 className="font-bold text-white text-sm">Developers</h4>
              <p className="text-[11px] text-slate-400">Build the usable, tested Increment during the Sprint.</p>
            </div>
          </div>
        </div>

        {/* Role Matching Challenge */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">ASSIGN RESPONSIBILITIES</h3>
          
          <div className="space-y-2">
            {[
              { id: 'r1', task: 'Orders and prioritises the Product Backlog', correct: 'po' },
              { id: 'r2', task: 'Builds and tests the usable product Increment', correct: 'dev' },
              { id: 'r3', task: 'Helps remove an impediment/blocker facing the team', correct: 'sm' },
              { id: 'r4', task: 'Works directly with stakeholders to define user needs', correct: 'po' },
            ].map((item) => {
              const assigned = roleAssignments[item.id];
              return (
                <div key={item.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <span className="text-slate-200">{item.task}</span>
                  <div className="flex items-center space-x-1.5 shrink-0">
                    <button
                      onClick={() => setRoleAssignments({ ...roleAssignments, [item.id]: 'po' })}
                      className={`px-2.5 py-1 rounded-lg border font-semibold ${assigned === 'po' ? 'bg-cyan-950 border-cyan-400 text-cyan-200 font-bold ring-2 ring-cyan-500' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                    >
                      👤 Product Owner
                    </button>
                    <button
                      onClick={() => setRoleAssignments({ ...roleAssignments, [item.id]: 'sm' })}
                      className={`px-2.5 py-1 rounded-lg border font-semibold ${assigned === 'sm' ? 'bg-indigo-950 border-indigo-400 text-indigo-200 font-bold ring-2 ring-indigo-500' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                    >
                      🧭 Scrum Master
                    </button>
                    <button
                      onClick={() => setRoleAssignments({ ...roleAssignments, [item.id]: 'dev' })}
                      className={`px-2.5 py-1 rounded-lg border font-semibold ${assigned === 'dev' ? 'bg-emerald-950 border-emerald-400 text-emerald-200 font-bold ring-2 ring-emerald-500' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                    >
                      💻 Developers
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {roleFeedback && (
            <div className="p-4 bg-rose-950/80 border border-rose-700 rounded-2xl text-xs text-rose-200 font-medium space-y-1">
              <div className="font-bold uppercase tracking-wider flex items-center gap-2 text-rose-300">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>DEVELOPMENTAL FEEDBACK</span>
              </div>
              <p>{roleFeedback}</p>
            </div>
          )}

          {!rolesSubmitted ? (
            <button
              onClick={handleVerifyRoles}
              disabled={Object.keys(roleAssignments).length < 4}
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl"
            >
              Verify Role Assignments
            </button>
          ) : (
            <div className="p-3 bg-emerald-950/80 border border-emerald-600 rounded-xl text-xs text-emerald-200 font-semibold">
              ✓ Excellent! Roles correctly assigned. Product Owner manages value, Scrum Master removes impediments, Developers build the Increment.
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: BUILD A SPRINT & CAPACITY MANAGEMENT */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">SPRINT PLANNING</span>
          <h2 className="text-xl font-extrabold text-white">BUILD A SPRINT (CAPACITY: 10 EFFORT POINTS)</h2>
          <p className="text-xs text-slate-400 mt-1">
            Select items from the Product Backlog to include in the Sprint Backlog. You cannot exceed team capacity!
          </p>
        </div>

        {/* Capacity Meter */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-400 uppercase font-bold">Team Capacity Meter</div>
            <div className="text-xl font-extrabold text-white">
              {totalSelectedPoints} / 10 Effort Points Selected
            </div>
          </div>

          <div className="w-full sm:w-64 bg-slate-900 h-4 rounded-full p-0.5 border border-slate-800 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all ${
                totalSelectedPoints > 10 ? 'bg-rose-500' : 'bg-emerald-400'
              }`}
              style={{ width: `${(totalSelectedPoints / 10) * 100}%` }}
            />
          </div>
        </div>

        {/* Item Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {PRODUCT_BACKLOG_ITEMS.map((item) => {
            const isSelected = selectedSprintItems.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleToggleSprintItem(item.id)}
                disabled={sprintStarted}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between h-28 ${
                  isSelected
                    ? 'bg-emerald-950 border-emerald-400 text-white font-bold ring-2 ring-emerald-500'
                    : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold truncate">{item.title}</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 bg-slate-900 text-cyan-300 rounded-md border border-slate-800 font-mono">
                    {item.points} pts
                  </span>
                  <span>{isSelected ? '✓ In Sprint' : '+ Add'}</span>
                </div>
              </button>
            );
          })}
        </div>

        {!sprintStarted && (
          <button
            onClick={handleStartSprint}
            disabled={selectedSprintItems.length === 0 || totalSelectedPoints > 10}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-extrabold text-xs rounded-2xl shadow-lg"
          >
            ▶ START SPRINT
          </button>
        )}
      </div>

      {/* SECTION 3: SPRINT SIMULATION & MID-SPRINT BLOCKER */}
      {sprintStarted && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <span>Sprint Execution Board</span>
              <span className="text-xs text-emerald-400 font-semibold animate-pulse">(SPRINT ACTIVE)</span>
            </h2>
          </div>

          {/* MID-SPRINT BLOCKER ALERT */}
          {!blockerResolved && (
            <div className="p-4 bg-rose-950/90 border border-rose-500 rounded-2xl space-y-3 animate-bounce-subtle">
              <div className="flex items-center space-x-2 text-rose-200 text-xs font-extrabold uppercase tracking-wider">
                <AlertCircle className="w-5 h-5 text-rose-400" />
                <span>🚨 MID-SPRINT IMPEDIMENT / BLOCKER DETECTED</span>
              </div>
              <p className="text-sm text-white font-semibold">
                "The test server is unavailable! Developers cannot execute automated test suites."
              </p>
              <div className="text-xs text-slate-300 font-bold">
                WHO SHOULD HELP THE TEAM DEAL WITH THIS IMPEDIMENT?
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  onClick={() => handleBlockerChoice('po')}
                  className={`px-3 py-2 rounded-xl border ${blockerChoice === 'po' ? 'bg-rose-950 border-rose-400 text-white font-bold' : 'bg-slate-900 border-slate-700 text-slate-200'}`}
                >
                  👤 Product Owner
                </button>
                <button
                  onClick={() => handleBlockerChoice('sm')}
                  className={`px-3 py-2 rounded-xl border font-bold ${blockerChoice === 'sm' ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-emerald-600/80 hover:bg-emerald-500 text-white'}`}
                >
                  🧭 Scrum Master (Removes Blockers!)
                </button>
                <button
                  onClick={() => handleBlockerChoice('dev')}
                  className={`px-3 py-2 rounded-xl border ${blockerChoice === 'dev' ? 'bg-rose-950 border-rose-400 text-white font-bold' : 'bg-slate-900 border-slate-700 text-slate-200'}`}
                >
                  💻 Developers alone
                </button>
              </div>

              {blockerChoice && blockerChoice !== 'sm' && (
                <div className="p-3 bg-rose-950/80 border border-rose-700 rounded-xl text-xs text-rose-200 font-medium space-y-1">
                  <div className="font-bold uppercase tracking-wider flex items-center gap-2 text-rose-300 text-[11px]">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                    <span>DEVELOPMENTAL FEEDBACK</span>
                  </div>
                  <p>
                    ✕ The Product Owner manages business value and backlog order. Developers write code. The <strong>Scrum Master</strong>'s specific accountability is removing team impediments and blockers so developers can work smoothly!
                  </p>
                </div>
              )}
            </div>
          )}

          {blockerResolved && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-600 rounded-xl text-xs text-emerald-200 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Blocker resolved by Scrum Master! Work is resuming across the Sprint Board...</span>
            </div>
          )}

          {/* Sprint Board Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            {['todo', 'doing', 'testing', 'done'].map((col) => (
              <div key={col} className="p-3 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <div className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">
                  {col === 'todo' ? 'TO DO' : col === 'doing' ? 'IN PROGRESS' : col === 'testing' ? 'TESTING' : 'DONE ✓'}
                </div>
                <div className="space-y-1.5">
                  {selectedSprintItems.map(id => {
                    const status = sprintProgress[id] || 'todo';
                    if (status !== col) return null;
                    const item = PRODUCT_BACKLOG_ITEMS.find(i => i.id === id);
                    return (
                      <div key={id} className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-[11px] font-medium text-slate-200 truncate">
                        {item?.title}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: SPRINT REVIEW & RETROSPECTIVE */}
      {blockerResolved && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">END OF SPRINT</span>
            <h2 className="text-xl font-extrabold text-white">SPRINT REVIEW & RETROSPECTIVE</h2>
          </div>

          {/* Sprint Review */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 text-xs">
            <div className="font-bold text-amber-300 uppercase tracking-wider">1. SPRINT REVIEW (PRODUCT FOCUS)</div>
            <p className="text-slate-300">
              The team demonstrates the usable Increment to stakeholders. Stakeholders give feedback:
            </p>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 italic text-cyan-200">
              "The room search feature is useful, but students need filters for quiet rooms."
            </div>
            {!reviewDone ? (
              <button
                onClick={() => setReviewDone(true)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl"
              >
                + Add "Search Filters" to Product Backlog
              </button>
            ) : (
              <div className="text-emerald-400 font-semibold">
                ✓ Search Filters added to Product Backlog for future Sprints!
              </div>
            )}
          </div>

          {/* Retrospective */}
          {reviewDone && (
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 text-xs">
              <div className="font-bold text-emerald-300 uppercase tracking-wider">2. SPRINT RETROSPECTIVE (PROCESS FOCUS)</div>
              <p className="text-slate-300">
                Select sensible process improvements for how the team works together:
              </p>
              <div className="space-y-2">
                {[
                  { id: 'communicate', label: 'Communicate testing server problems earlier to Scrum Master', correct: true },
                  { id: 'ignore', label: 'Ignore all stakeholder feedback in future Sprints', correct: false },
                  { id: 'coordination', label: 'Improve task coordination and continuous build testing', correct: true },
                ].map((item) => {
                  const isSel = retroSelections.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleRetroSelection(item.id)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between ${
                        isSel ? (item.correct ? 'bg-emerald-950 border-emerald-400 text-white font-bold ring-2 ring-emerald-500' : 'bg-rose-950 border-rose-400 text-white font-bold ring-2 ring-rose-500') : 'bg-slate-900 border-slate-800 text-slate-300'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span>{isSel ? (item.correct ? '✓' : '✕') : '○'}</span>
                    </button>
                  );
                })}
              </div>

              {retroFeedback && (
                <div className="p-3 bg-rose-950/80 border border-rose-700 rounded-xl text-xs text-rose-200 font-medium space-y-1">
                  <div className="font-bold uppercase tracking-wider flex items-center gap-2 text-rose-300 text-[11px]">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                    <span>DEVELOPMENTAL FEEDBACK</span>
                  </div>
                  <p>{retroFeedback}</p>
                </div>
              )}

              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-[11px] text-cyan-300 font-medium">
                <strong>CRITICAL DISTINCTION:</strong> Sprint Review inspects the <em>PRODUCT / Increment</em>. Sprint Retrospective inspects <em>HOW THE TEAM WORKS</em>.
              </div>
            </div>
          )}
        </div>
      )}

      {/* MISSION COMPLETION BANNER */}
      {isMissionFinished && (
        <div className="rounded-3xl bg-gradient-to-r from-emerald-900/90 to-teal-900/90 border border-emerald-500/50 p-6 text-center space-y-3 shadow-2xl animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 text-xs font-bold">
            ✓ MISSION ACCOMPLISHED
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            ✓ SCRUM LAB COMPLETE!
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl mx-auto">
            You successfully managed Sprint capacity, resolved mid-Sprint blockers, conducted a Sprint Review, and executed a process-improving Retrospective!
          </p>
          <div className="pt-2">
            <button
              onClick={handleFinishMission}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-2xl shadow-lg transition-all"
            >
              Continue to Mission 5: Project Consultant →
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

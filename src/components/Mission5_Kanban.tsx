import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  AlertTriangle
} from 'lucide-react';

interface Mission5Props {
  onComplete: () => void;
  onOpenQuickNotes: () => void;
}

interface KanbanTask {
  id: string;
  title: string;
  column: 'todo' | 'in_progress' | 'testing' | 'done';
}

const INITIAL_TASKS: KanbanTask[] = [
  { id: 'k1', title: '🔐 Login & Security', column: 'todo' },
  { id: 'k2', title: '🔎 Search Available Rooms', column: 'todo' },
  { id: 'k3', title: '📅 Room Booking Engine', column: 'todo' },
  { id: 'k4', title: '📱 Mobile Layout', column: 'todo' },
  { id: 'k5', title: '♿ Accessibility UI', column: 'todo' },
  { id: 'k6', title: '🔔 Push Notifications', column: 'todo' },
];

export const Mission5_Kanban: React.FC<Mission5Props> = ({ onComplete, onOpenQuickNotes }) => {
  // Step 1: Bottleneck simulation state
  const [tasks, setTasks] = useState<KanbanTask[]>(INITIAL_TASKS);
  const [wipLimitActive, setWipLimitActive] = useState<boolean>(false);
  const [showBottleneckAlert, setShowBottleneckAlert] = useState<boolean>(false);

  // Step 2: Kanban Decision Challenge State
  const [decisionChoice, setDecisionChoice] = useState<string | null>(null);

  // Step 3: Framework Sorting State
  const [sortingPlacements, setSortingPlacements] = useState<Record<string, 'scrum' | 'kanban' | 'both'>>({});
  const [selectedSortCardId, setSelectedSortCardId] = useState<string | null>(null);

  const inProgressCount = tasks.filter(t => t.column === 'in_progress').length;

  const moveTask = (taskId: string, targetCol: 'todo' | 'in_progress' | 'testing' | 'done') => {
    // Check WIP limit if active
    if (wipLimitActive && targetCol === 'in_progress') {
      const currentInProg = tasks.filter(t => t.column === 'in_progress' && t.id !== taskId).length;
      if (currentInProg >= 2) {
        alert('⚠️ WIP Limit Reached! (Max 2 tasks in In Progress). You must finish or move existing tasks before starting new ones!');
        return;
      }
    }

    const updated = tasks.map(t => t.id === taskId ? { ...t, column: targetCol } : t);
    setTasks(updated);

    const newInProgCount = updated.filter(t => t.column === 'in_progress').length;
    if (!wipLimitActive && newInProgCount >= 4) {
      setShowBottleneckAlert(true);
    }
  };

  const enableWipLimit = () => {
    setWipLimitActive(true);
    setShowBottleneckAlert(false);
    // Reset tasks
    setTasks(INITIAL_TASKS);
  };

  const SORT_ITEMS = [
    { id: 's_sprint', label: 'Sprint', correct: 'scrum', hint: 'Fixed timebox iteration in Scrum.' },
    { id: 's_po', label: 'Product Owner', correct: 'both', hint: 'Accountable for Product Backlog; can be used in Kanban too.' },
    { id: 's_wip', label: 'WIP Limit', correct: 'kanban', hint: 'Core Kanban practice to restrict work in progress.' },
    { id: 's_daily', label: 'Daily Scrum', correct: 'scrum', hint: 'Specific daily sync event in Scrum framework.' },
    { id: 's_flow', label: 'Continuous Flow', correct: 'kanban', hint: 'Kanban focuses on continuous flow rather than Sprints.' },
    { id: 's_board', label: 'Kanban Board', correct: 'both', hint: 'Visual board used in Kanban AND frequently by Scrum teams!' },
    { id: 's_backlog', label: 'Product Backlog', correct: 'both', hint: 'Ordered list of work used across many Agile approaches.' },
  ];

  const handlePlaceSortCard = (target: 'scrum' | 'kanban' | 'both') => {
    if (!selectedSortCardId) return;
    setSortingPlacements({ ...sortingPlacements, [selectedSortCardId]: target });
    setSelectedSortCardId(null);
  };

  const isSortingComplete = Object.keys(sortingPlacements).length === SORT_ITEMS.length;

  const isMissionComplete = 
    wipLimitActive &&
    tasks.filter(t => t.column === 'done').length >= 2 &&
    decisionChoice === 'help' &&
    isSortingComplete;

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
            <span className="text-3xl sm:text-4xl">📋</span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">MISSION 5 (~15 MINS)</span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white">KANBAN LAB: CONTROL THE FLOW OF WORK</h1>
            </div>
          </div>

          <button
            onClick={onOpenQuickNotes}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs rounded-xl border border-slate-700 flex items-center gap-2"
          >
            📚 View Quick Notes
          </button>
        </div>

        <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs space-y-2 text-slate-300">
          <p>
            Kanban focuses heavily on three core principles:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center font-bold text-purple-300">
            <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">1. VISUALISE WORK</div>
            <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">2. MANAGE FLOW</div>
            <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">3. LIMIT WORK IN PROGRESS (WIP)</div>
          </div>
        </div>
      </div>

      {/* SECTION 1: INTERACTIVE KANBAN BOARD & BOTTLENECK SIMULATION */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">LIVE WORKFLOW SIMULATION</span>
            <h2 className="text-xl font-extrabold text-white">INTERACTIVE KANBAN BOARD</h2>
          </div>

          {!wipLimitActive ? (
            <div className="text-xs text-amber-300 font-semibold bg-amber-950/60 p-2 rounded-xl border border-amber-800">
              ⚠️ Step 1: Move 4 or more tasks into "IN PROGRESS" to cause a bottleneck!
            </div>
          ) : (
            <div className="text-xs text-emerald-300 font-semibold bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800">
              ✓ WIP LIMIT ENFORCED: Maximum 2 tasks in "IN PROGRESS"
            </div>
          )}
        </div>

        {/* Bottleneck Warning Alert */}
        {showBottleneckAlert && !wipLimitActive && (
          <div className="p-5 bg-rose-950/90 border border-rose-500 rounded-2xl space-y-3 animate-fade-in">
            <div className="flex items-center space-x-2 text-rose-200 text-sm font-extrabold uppercase tracking-wider">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <span>⚠️ TOO MUCH WORK AT ONCE! BOTTLENECK CREATED</span>
            </div>
            <p className="text-xs text-white leading-relaxed">
              When too many tasks are started simultaneously, developers switch context constantly. Tasks queue up, testing becomes overwhelmed, and <strong>nothing reaches DONE efficiently!</strong>
            </p>
            <div>
              <button
                onClick={enableWipLimit}
                className="px-5 py-2.5 bg-purple-500 hover:bg-purple-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-all"
              >
                🔒 APPLY WIP LIMIT (MAX 2 IN PROGRESS)
              </button>
            </div>
          </div>
        )}

        {/* Board Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          
          {/* TO DO */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between font-bold text-slate-400 uppercase tracking-wider text-xs">
              <span>TO DO</span>
              <span className="px-2 py-0.5 bg-slate-900 rounded-md border border-slate-800">
                {tasks.filter(t => t.column === 'todo').length}
              </span>
            </div>

            <div className="space-y-2">
              {tasks.filter(t => t.column === 'todo').map(task => (
                <div key={task.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <div className="font-semibold text-slate-200">{task.title}</div>
                  <button
                    onClick={() => moveTask(task.id, 'in_progress')}
                    className="w-full py-1 bg-purple-600/80 hover:bg-purple-600 text-white font-bold rounded-lg text-[10px]"
                  >
                    Start Task →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* IN PROGRESS */}
          <div className={`p-4 bg-slate-950 border rounded-2xl space-y-3 ${
            wipLimitActive ? 'border-purple-500/80 shadow-md shadow-purple-950/40' : 'border-slate-800'
          }`}>
            <div className="flex items-center justify-between font-bold text-purple-300 uppercase tracking-wider text-xs">
              <span>IN PROGRESS</span>
              <span className={`px-2 py-0.5 rounded-md border font-mono ${
                wipLimitActive ? 'bg-purple-950 border-purple-600 text-purple-200' : 'bg-slate-900 border-slate-800'
              }`}>
                {inProgressCount} {wipLimitActive ? '/ 2 (MAX)' : ''}
              </span>
            </div>

            <div className="space-y-2">
              {tasks.filter(t => t.column === 'in_progress').map(task => (
                <div key={task.id} className="p-3 bg-slate-900 border border-purple-500/40 rounded-xl space-y-2">
                  <div className="font-semibold text-white">{task.title}</div>
                  <button
                    onClick={() => moveTask(task.id, 'testing')}
                    className="w-full py-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg text-[10px]"
                  >
                    Move to Testing →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* TESTING */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between font-bold text-cyan-400 uppercase tracking-wider text-xs">
              <span>TESTING</span>
              <span className="px-2 py-0.5 bg-slate-900 rounded-md border border-slate-800">
                {tasks.filter(t => t.column === 'testing').length}
              </span>
            </div>

            <div className="space-y-2">
              {tasks.filter(t => t.column === 'testing').map(task => (
                <div key={task.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <div className="font-semibold text-slate-200">{task.title}</div>
                  <button
                    onClick={() => moveTask(task.id, 'done')}
                    className="w-full py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-[10px]"
                  >
                    Pass Testing → DONE ✓
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* DONE */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between font-bold text-emerald-400 uppercase tracking-wider text-xs">
              <span>DONE ✓</span>
              <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded-md border border-emerald-800 font-bold">
                {tasks.filter(t => t.column === 'done').length}
              </span>
            </div>

            <div className="space-y-2">
              {tasks.filter(t => t.column === 'done').map(task => (
                <div key={task.id} className="p-3 bg-emerald-950/60 border border-emerald-700/60 rounded-xl">
                  <div className="font-semibold text-emerald-200 flex items-center gap-1.5">
                    <span>✓</span>
                    <span>{task.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {wipLimitActive && (
          <div className="p-3 bg-purple-950/80 border border-purple-600 rounded-xl text-xs text-purple-200 font-semibold text-center">
            💡 KEY KANBAN MOTTO: <strong>"STARTING WORK ≠ FINISHING WORK."</strong> WIP limits force team members to finish work before starting new tasks!
          </div>
        )}
      </div>

      {/* SECTION 2: KANBAN DECISION CHALLENGE */}
      {wipLimitActive && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">FLOW DECISION</span>
            <h2 className="text-xl font-extrabold text-white">KANBAN DECISION CHALLENGE</h2>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 text-xs">
            <div className="font-bold text-amber-300">BOARD STATE:</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
              <div className="p-2 bg-slate-900 rounded-lg">TO DO: 5</div>
              <div className="p-2 bg-purple-950 text-purple-200 rounded-lg font-bold">IN PROGRESS: 2/2 (MAX)</div>
              <div className="p-2 bg-slate-900 rounded-lg">TESTING: 1</div>
              <div className="p-2 bg-emerald-950 text-emerald-200 rounded-lg">DONE: 3</div>
            </div>

            <div className="font-bold text-white pt-2">
              SCENARIO: A developer finishes their current task and becomes free. What should they do?
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setDecisionChoice('new')}
                className={`p-3.5 rounded-xl border text-left ${decisionChoice === 'new' ? 'bg-rose-950 border-rose-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-300'}`}
              >
                Blindly pull another new task from TO DO (violating WIP limit).
              </button>
              <button
                onClick={() => setDecisionChoice('help')}
                className={`p-3.5 rounded-xl border text-left font-bold ${decisionChoice === 'help' ? 'bg-emerald-950 border-emerald-400 text-white ring-2 ring-emerald-500' : 'bg-slate-900 border-slate-800 text-slate-300'}`}
              >
                Help move existing work in TESTING towards completion!
              </button>
            </div>

            {decisionChoice === 'help' && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-600 rounded-xl text-emerald-200 font-semibold">
                ✓ SPOT ON! In Kanban, developers manage overall workflow rather than just personal activity. Swarming to finish existing work maintains high throughput!
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 3: FRAMEWORK SORTING CHALLENGE */}
      {decisionChoice === 'help' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">FRAMEWORK CLARITY</span>
            <h2 className="text-xl font-extrabold text-white">SCRUM OR KANBAN (OR BOTH?)</h2>
            <p className="text-xs text-slate-400 mt-1">
              Select a practice card below, then click whether it belongs to SCRUM, KANBAN, or BOTH:
            </p>
          </div>

          {/* Cards to sort */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SORT_ITEMS.map((item) => {
                const placed = sortingPlacements[item.id];
                const isSelected = selectedSortCardId === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSortCardId(item.id)}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                      placed
                        ? 'bg-slate-950 border-slate-800 text-slate-500 opacity-60'
                        : isSelected
                        ? 'bg-purple-600 text-white border-purple-300 shadow-md scale-105 ring-2 ring-purple-400'
                        : 'bg-slate-950 border-slate-700 text-slate-200 hover:border-purple-500'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{item.label}</span>
                      <span>{placed ? '✓' : isSelected ? '◉' : '○'}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Target Drop Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              <div
                onClick={() => handlePlaceSortCard('scrum')}
                className={`p-4 rounded-2xl border cursor-pointer space-y-2 ${
                  selectedSortCardId ? 'bg-indigo-950/60 border-indigo-500' : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="font-bold text-indigo-300 text-xs">🏃 SCRUM SPECIFIC</div>
                <div className="space-y-1">
                  {SORT_ITEMS.filter(i => sortingPlacements[i.id] === 'scrum').map(i => (
                    <div key={i.id} className="p-1.5 bg-slate-900 rounded border border-slate-800 text-[11px] text-slate-200">
                      {i.label}
                    </div>
                  ))}
                </div>
              </div>

              <div
                onClick={() => handlePlaceSortCard('kanban')}
                className={`p-4 rounded-2xl border cursor-pointer space-y-2 ${
                  selectedSortCardId ? 'bg-purple-950/60 border-purple-500' : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="font-bold text-purple-300 text-xs">📋 KANBAN SPECIFIC</div>
                <div className="space-y-1">
                  {SORT_ITEMS.filter(i => sortingPlacements[i.id] === 'kanban').map(i => (
                    <div key={i.id} className="p-1.5 bg-slate-900 rounded border border-slate-800 text-[11px] text-slate-200">
                      {i.label}
                    </div>
                  ))}
                </div>
              </div>

              <div
                onClick={() => handlePlaceSortCard('both')}
                className={`p-4 rounded-2xl border cursor-pointer space-y-2 ${
                  selectedSortCardId ? 'bg-cyan-950/60 border-cyan-500' : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="font-bold text-cyan-300 text-xs">🔀 BOTH / CAN COMBINE (SCRUMBAN)</div>
                <div className="space-y-1">
                  {SORT_ITEMS.filter(i => sortingPlacements[i.id] === 'both').map(i => (
                    <div key={i.id} className="p-1.5 bg-slate-900 rounded border border-slate-800 text-[11px] text-slate-200">
                      {i.label}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* MISSION COMPLETION BANNER */}
      {isMissionComplete && (
        <div className="rounded-3xl bg-gradient-to-r from-purple-900/90 to-pink-900/90 border border-purple-500/50 p-6 text-center space-y-3 shadow-2xl animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-700 text-xs font-bold">
            ✓ MISSION ACCOMPLISHED
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            ✓ KANBAN LAB COMPLETE!
          </h2>
          <p className="text-xs sm:text-sm text-purple-100 max-w-2xl mx-auto">
            You mastered visual workflow management, enforced WIP limits to eliminate bottlenecks, and learned how Scrum and Kanban practices can be harmoniously combined.
          </p>
          <div className="pt-2">
            <button
              onClick={handleFinishMission}
              className="px-6 py-3 bg-purple-500 hover:bg-purple-400 text-slate-950 font-extrabold rounded-2xl shadow-lg transition-all"
            >
              Continue to Final Mission: Project Consultant →
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

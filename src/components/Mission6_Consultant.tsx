import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { AlertCircle } from 'lucide-react';
import type { RiskItem } from '../types';

interface Mission6Props {
  onComplete: () => void;
  onOpenQuickNotes: () => void;
}

const STAKEHOLDERS = [
  { id: 'st_student', name: 'STUDENTS', icon: '🎓', care: 'Easy event booking & QR entry' },
  { id: 'st_admin', name: 'ADMIN STAFF', icon: '📋', care: 'Manage room capacities & attendee lists' },
  { id: 'st_mgmt', name: 'COLLEGE MANAGEMENT', icon: '🏛️', care: 'On-time delivery within £5,000 budget' },
  { id: 'st_dev', name: 'DEVELOPERS', icon: '💻', care: 'Clear requirements & technical feasibility' },
  { id: 'st_tourist', name: 'RANDOM TOURIST', icon: '🧳', care: 'Not a relevant stakeholder', isDistractor: true },
];

const RISKS: RiskItem[] = [
  {
    id: 'r_dev',
    title: 'Key lead developer unavailable due to illness',
    description: 'Loss of critical knowledge during main Sprint.',
    correctProbability: 'Medium',
    correctImpact: 'High',
    correctStrategy: 'Reduce',
    explanation: 'Cross-training and documentation reduces the impact of single-person dependence.',
  },
  {
    id: 'r_sec',
    title: 'Database security vulnerability exposing student data',
    description: 'Data breach violation under UK GDPR regulations.',
    correctProbability: 'Low',
    correctImpact: 'High',
    correctStrategy: 'Avoid',
    explanation: 'Security risks must be avoided through encryption and mandatory security audits.',
  },
  {
    id: 'r_test',
    title: 'Testing takes longer than planned due to bug backlog',
    description: 'Testing phase bottleneck delaying launch.',
    correctProbability: 'High',
    correctImpact: 'Medium',
    correctStrategy: 'Reduce',
    explanation: 'Integrating continuous automated testing during development mitigates testing delays.',
  },
];

export const Mission6_Consultant: React.FC<Mission6Props> = ({ onComplete, onOpenQuickNotes }) => {
  // Step 1: Stakeholder Identification
  const [selectedStakeholders, setSelectedStakeholders] = useState<string[]>([]);
  const [step1Done, setStep1Done] = useState<boolean>(false);
  const [step1Feedback, setStep1Feedback] = useState<string | null>(null);

  // Step 2: Triple Constraint Client Request
  const [scopeDecision, setScopeDecision] = useState<string | null>(null);

  // Step 3: Risk Matrix
  const [riskStrategies, setRiskStrategies] = useState<Record<string, string>>({});

  // Step 4: Building Blocks Strategy
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);
  const [strategyBuilt, setStrategyBuilt] = useState<boolean>(false);
  const [strategyFeedback, setStrategyFeedback] = useState<string | null>(null);

  // Step 5: Test Case Execution
  const [testAction, setTestAction] = useState<string | null>(null);

  const toggleStakeholder = (id: string) => {
    if (selectedStakeholders.includes(id)) {
      setSelectedStakeholders(selectedStakeholders.filter(s => s !== id));
    } else {
      setSelectedStakeholders([...selectedStakeholders, id]);
    }
    setStep1Feedback(null);
  };

  const handleVerifyStakeholders = () => {
    const hasStudent = selectedStakeholders.includes('st_student');
    const hasAdmin = selectedStakeholders.includes('st_admin');
    const hasMgmt = selectedStakeholders.includes('st_mgmt');
    const hasDev = selectedStakeholders.includes('st_dev');
    const hasTourist = selectedStakeholders.includes('st_tourist');

    if (hasStudent && hasAdmin && hasMgmt && hasDev && !hasTourist) {
      setStep1Done(true);
      setStep1Feedback(null);
    } else if (hasTourist) {
      setStep1Feedback('✕ Developmental Feedback: Random Tourist is not a project stakeholder. Stakeholders must have a direct interest, operational role, or financial stake in the system (Students, Admin Staff, Management, Developers).');
    } else {
      setStep1Feedback('✕ Developmental Feedback: You are missing key internal stakeholders. Make sure to select Students, Admin Staff, College Management, and Developers!');
    }
  };

  const toggleBlock = (block: string) => {
    if (selectedBlocks.includes(block)) {
      setSelectedBlocks(selectedBlocks.filter(b => b !== block));
    } else {
      setSelectedBlocks([...selectedBlocks, block]);
    }
    setStrategyBuilt(false);
    setStrategyFeedback(null);
  };

  const handleVerifyStrategy = () => {
    const hasUpfrontLock = selectedBlocks.includes('Detailed Upfront Lock');
    const hasSprints = selectedBlocks.includes('Short Iterations (Sprints)');

    if (hasUpfrontLock && hasSprints) {
      setStrategyFeedback('✕ Developmental Feedback: Selecting "Detailed Upfront Lock" alongside "Short Iterations (Sprints)" creates a methodology contradiction. Lock-in fits Waterfall, whereas Sprints require backlog flexibility. Select iterative building blocks for this project!');
      setStrategyBuilt(false);
    } else if (selectedBlocks.length < 3) {
      setStrategyFeedback('✕ Developmental Feedback: Please select at least 3 building blocks to define a robust development strategy.');
      setStrategyBuilt(false);
    } else {
      setStrategyBuilt(true);
      setStrategyFeedback(null);
    }
  };

  const getRiskFeedback = (riskId: string, selectedStrat: string) => {
    if (riskId === 'r_sec') {
      if (selectedStrat !== 'Avoid') {
        return '✕ Developmental Feedback: GDPR data security vulnerabilities cannot be Accepted, Reduced, or Transferred because data breaches carry severe legal, financial, and reputational penalties. Security risks must be AVOIDED through encryption and mandatory security audits.';
      }
    } else if (riskId === 'r_dev') {
      if (selectedStrat !== 'Reduce') {
        return '✕ Developmental Feedback: You cannot Avoid or Transfer an internal team member illness. Accepting it without action leaves the team stranded. The correct strategy is REDUCE / MITIGATE through cross-training and documentation so others can step in.';
      }
    } else if (riskId === 'r_test') {
      if (selectedStrat !== 'Reduce') {
        return '✕ Developmental Feedback: You cannot Avoid testing delays once development is underway. REDUCING / MITIGATING the risk via continuous automated integration testing throughout the sprint prevents testing bottlenecks at the end.';
      }
    }
    return null;
  };

  const isMissionFullyComplete = 
    step1Done &&
    scopeDecision === 'backlog' &&
    Object.keys(riskStrategies).length === RISKS.length &&
    RISKS.every(r => riskStrategies[r.id] === r.correctStrategy) &&
    strategyBuilt &&
    testAction === 'fix';

  const handleFinishConsultantMission = () => {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    onComplete();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Banner */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-3xl sm:text-4xl">👔</span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">MISSION 5 — CAPSTONE CONSULTANT (~25 MINS)</span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white">COLLEGE EVENT BOOKING SYSTEM</h1>
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
          <div className="font-bold text-white uppercase tracking-wider">PROJECT BRIEF & CONSTRAINTS</div>
          <p>
            The college needs a new <strong>Event Booking System</strong> (students view/register for events, staff host events, admins monitor bookings).
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
            <div className="p-2 bg-slate-900 rounded-lg">💷 Budget: £5,000</div>
            <div className="p-2 bg-slate-900 rounded-lg">⏱ Deadline: 12 Weeks</div>
            <div className="p-2 bg-slate-900 rounded-lg">🔐 Security: GDPR Data</div>
            <div className="p-2 bg-slate-900 rounded-lg">♿ Accessibility: Required</div>
          </div>
        </div>
      </div>

      {/* STEP 1 — IDENTIFY STAKEHOLDERS */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">STEP 1 OF 5</span>
          <h2 className="text-xl font-extrabold text-white">IDENTIFY PROJECT STAKEHOLDERS</h2>
          <p className="text-xs text-slate-400 mt-1">
            Select the relevant project stakeholders for the College Event Booking System:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {STAKEHOLDERS.map((st) => {
            const isSelected = selectedStakeholders.includes(st.id);
            return (
              <button
                key={st.id}
                onClick={() => toggleStakeholder(st.id)}
                className={`p-4 rounded-2xl border text-left transition-all space-y-1 ${
                  isSelected
                    ? 'bg-cyan-950 border-cyan-400 text-white font-bold ring-2 ring-cyan-500'
                    : 'bg-slate-950 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{st.icon}</span>
                    <span>{st.name}</span>
                  </span>
                  <span>{isSelected ? '✓' : '○'}</span>
                </div>
                <div className="text-[11px] text-slate-400 font-normal">{st.care}</div>
              </button>
            );
          })}
        </div>

        {step1Feedback && (
          <div className="p-4 bg-rose-950/80 border border-rose-700 rounded-2xl text-xs text-rose-200 font-medium space-y-1">
            <div className="font-bold uppercase tracking-wider flex items-center gap-2 text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>DEVELOPMENTAL FEEDBACK</span>
            </div>
            <p>{step1Feedback}</p>
          </div>
        )}

        {!step1Done ? (
          <button
            onClick={handleVerifyStakeholders}
            className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl"
          >
            Verify Stakeholder Choices
          </button>
        ) : (
          <div className="p-3 bg-emerald-950/80 border border-emerald-600 rounded-xl text-xs text-emerald-200 font-semibold">
            ✓ Stakeholders identified correctly! Students, Admin Staff, College Management, and Developers all have distinct interests in the solution.
          </div>
        )}
      </div>

      {/* STEP 2 — TRIPLE CONSTRAINT ANALYSIS */}
      {step1Done && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">STEP 2 OF 5</span>
            <h2 className="text-xl font-extrabold text-white">PROJECT CONSTRAINTS (TRIPLE CONSTRAINT)</h2>
            <p className="text-xs text-slate-400 mt-1">
              Scope, Time, Cost, and Quality are tightly linked. If scope increases while time & cost are fixed, quality faces extreme pressure!
            </p>
          </div>

          {/* Client Request Box */}
          <div className="p-4 bg-amber-950/40 border border-amber-500/50 rounded-2xl space-y-2 text-xs">
            <span className="font-bold text-amber-300 uppercase tracking-wider">📩 LATE CLIENT REQUEST</span>
            <p className="text-white font-semibold">
              "Add live video streaming & instant chat into the event app for next week!"
            </p>
            <div className="text-slate-300">
              How should the team handle this scope increase given the 12-week deadline and fixed £5,000 budget?
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <button
              onClick={() => setScopeDecision('add_now')}
              className={`p-3.5 rounded-xl border text-left ${scopeDecision === 'add_now' ? 'bg-rose-950 border-rose-400 text-white font-bold ring-2 ring-rose-500' : 'bg-slate-950 border-slate-800 text-slate-300'}`}
            >
              Add immediately now (Risk: Rush development, introduce critical bugs, miss deadline).
            </button>
            <button
              onClick={() => setScopeDecision('backlog')}
              className={`p-3.5 rounded-xl border text-left font-bold ${scopeDecision === 'backlog' ? 'bg-emerald-950 border-emerald-400 text-white ring-2 ring-emerald-500' : 'bg-slate-950 border-slate-800 text-slate-300'}`}
            >
              Add to Product Backlog for future evaluation & prioritise with Product Owner.
            </button>
          </div>

          {scopeDecision === 'add_now' && (
            <div className="p-4 bg-rose-950/80 border border-rose-700 rounded-2xl text-xs text-rose-200 font-medium space-y-1">
              <div className="font-bold uppercase tracking-wider flex items-center gap-2 text-rose-300">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>DEVELOPMENTAL FEEDBACK</span>
              </div>
              <p>
                ✕ Adding major new features (video streaming & chat) immediately during an active sprint with a fixed 12-week deadline will overload the team, compromise software Quality, and lead to missed deadlines and budget overruns. In project management, scope additions must be submitted to the Product Backlog for estimation and prioritization with stakeholders!
              </p>
            </div>
          )}

          {scopeDecision === 'backlog' && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-600 rounded-xl text-xs text-emerald-200 font-semibold">
              ✓ Professional Choice! Managing scope change via the Product Backlog prevents quality degradation and budget overruns.
            </div>
          )}
        </div>
      )}

      {/* STEP 3 — RISK BOARD */}
      {scopeDecision === 'backlog' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">STEP 3 OF 5</span>
            <h2 className="text-xl font-extrabold text-white">RISK ANALYSIS & MITIGATION</h2>
            <p className="text-xs text-slate-400 mt-1">
              Select the appropriate Risk Response Strategy (Avoid, Reduce/Mitigate, Accept, Transfer) for each technical risk:
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {RISKS.map((risk) => {
              const selectedStrat = riskStrategies[risk.id];
              const isCorrect = selectedStrat === risk.correctStrategy;
              const feedbackMsg = selectedStrat ? getRiskFeedback(risk.id, selectedStrat) : null;

              return (
                <div key={risk.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                  <div className="font-bold text-white flex justify-between">
                    <span>⚠️ {risk.title}</span>
                    <span className="text-cyan-400 font-mono text-[11px]">Probability: {risk.correctProbability} | Impact: {risk.correctImpact}</span>
                  </div>
                  <p className="text-slate-400">{risk.description}</p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {['Avoid', 'Reduce', 'Accept', 'Transfer'].map((strat) => (
                      <button
                        key={strat}
                        onClick={() => setRiskStrategies({ ...riskStrategies, [risk.id]: strat })}
                        className={`px-3 py-1.5 rounded-lg border font-semibold ${
                          selectedStrat === strat
                            ? isCorrect
                              ? 'bg-emerald-950 border-emerald-400 text-emerald-200 font-bold ring-2 ring-emerald-500'
                              : 'bg-rose-950 border-rose-400 text-rose-200 font-bold ring-2 ring-rose-500'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        {strat}
                      </button>
                    ))}
                  </div>

                  {isCorrect && (
                    <div className="text-[11px] text-emerald-300 font-semibold pt-1">
                      ✓ Correct strategy! {risk.explanation}
                    </div>
                  )}

                  {feedbackMsg && (
                    <div className="p-3 bg-rose-950/80 border border-rose-700 rounded-xl text-xs text-rose-200 font-medium space-y-1 mt-2">
                      <div className="font-bold uppercase tracking-wider flex items-center gap-2 text-rose-300 text-[11px]">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                        <span>DEVELOPMENTAL FEEDBACK</span>
                      </div>
                      <p>{feedbackMsg}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 4 — CHOOSE A DEVELOPMENT STRATEGY */}
      {Object.keys(riskStrategies).length === RISKS.length && RISKS.every(r => riskStrategies[r.id] === r.correctStrategy) && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">STEP 4 OF 5</span>
            <h2 className="text-xl font-extrabold text-white">BUILD A DEVELOPMENT STRATEGY</h2>
            <p className="text-xs text-slate-400 mt-1">
              Select the methodology building blocks that best fit the College Event Booking System:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {[
              'Detailed Upfront Lock',
              'Short Iterations (Sprints)',
              'Regular User Feedback',
              'Continuous Testing',
              'Incremental Releases',
              'Explicit Risk Reviews',
            ].map((block) => {
              const isSel = selectedBlocks.includes(block);
              return (
                <button
                  key={block}
                  onClick={() => toggleBlock(block)}
                  className={`p-3 rounded-xl border text-left font-semibold ${
                    isSel ? 'bg-cyan-950 border-cyan-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  {block} {isSel ? '✓' : '+'}
                </button>
              );
            })}
          </div>

          {strategyFeedback && (
            <div className="p-4 bg-rose-950/80 border border-rose-700 rounded-2xl text-xs text-rose-200 font-medium space-y-1">
              <div className="font-bold uppercase tracking-wider flex items-center gap-2 text-rose-300">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>DEVELOPMENTAL FEEDBACK</span>
              </div>
              <p>{strategyFeedback}</p>
            </div>
          )}

          {!strategyBuilt ? (
            <button
              onClick={handleVerifyStrategy}
              disabled={selectedBlocks.length === 0}
              className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl"
            >
              Analyze Custom Strategy
            </button>
          ) : (
            <div className="p-4 bg-slate-950 border border-cyan-500/50 rounded-2xl text-xs space-y-2">
              <div className="font-bold text-cyan-300">STRATEGY ANALYSIS REPORT:</div>
              <p className="text-slate-200">
                You selected: <strong>{selectedBlocks.join(', ')}</strong>.
              </p>
              <p className="text-emerald-300 font-semibold">
                This approach resembles an Agile delivery model incorporating Scrum iterations. It provides high adaptability for user feedback while maintaining quality through continuous testing.
              </p>
            </div>
          )}
        </div>
      )}

      {/* STEP 5 — TESTING BEFORE RELEASE */}
      {strategyBuilt && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">STEP 5 OF 5</span>
            <h2 className="text-xl font-extrabold text-white">TEST BEFORE RELEASE</h2>
            <p className="text-xs text-slate-400 mt-1">
              Verify software behavior against non-negotiable functional requirements.
            </p>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 text-xs">
            <div className="font-bold text-amber-300">REQUIREMENT:</div>
            <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 font-semibold text-white">
              "Students must NOT be able to book an event that is fully booked (Capacity = 10)."
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[11px]">
              <div className="p-2 bg-slate-900 rounded-lg">INPUT: Event at 10/10 capacity; 11th student clicks Book.</div>
              <div className="p-2 bg-slate-900 rounded-lg">EXPECTED: Error message "Event Full" shown.</div>
              <div className="p-2 bg-rose-950 text-rose-200 rounded-lg font-bold">ACTUAL: Bug! Booking succeeds for 11th student.</div>
            </div>

            <div className="font-bold text-white pt-2">WHAT SHOULD THE DEVELOPMENT TEAM DO?</div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() => setTestAction('release')}
                className={`p-3 rounded-xl border text-left ${testAction === 'release' ? 'bg-rose-950 border-rose-400 text-white font-bold ring-2 ring-rose-500' : 'bg-slate-900 border-slate-800 text-slate-300'}`}
              >
                Release anyway to meet deadline (✕ High Risk!)
              </button>
              <button
                onClick={() => setTestAction('fix')}
                className={`p-3 rounded-xl border text-left font-bold ${testAction === 'fix' ? 'bg-emerald-950 border-emerald-400 text-white ring-2 ring-emerald-500' : 'bg-slate-950 border-slate-800 text-slate-300'}`}
              >
                FIX BUG → RETEST → CONFIRM PASS ✓
              </button>
              <button
                onClick={() => setTestAction('delete')}
                className={`p-3 rounded-xl border text-left ${testAction === 'delete' ? 'bg-rose-950 border-rose-400 text-white font-bold ring-2 ring-rose-500' : 'bg-slate-950 border-slate-800 text-slate-300'}`}
              >
                Delete the capacity requirement (✕ Unacceptable!)
              </button>
            </div>

            {testAction === 'release' && (
              <div className="p-4 bg-rose-950/80 border border-rose-700 rounded-2xl text-xs text-rose-200 font-medium space-y-1">
                <div className="font-bold uppercase tracking-wider flex items-center gap-2 text-rose-300">
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  <span>DEVELOPMENTAL FEEDBACK</span>
                </div>
                <p>
                  ✕ Releasing software with known failing functional test cases (allowing overbooking) degrades user trust, causes administrative chaos, and breaches quality standards. Always FIX → RETEST → CONFIRM PASS before release!
                </p>
              </div>
            )}

            {testAction === 'delete' && (
              <div className="p-4 bg-rose-950/80 border border-rose-700 rounded-2xl text-xs text-rose-200 font-medium space-y-1">
                <div className="font-bold uppercase tracking-wider flex items-center gap-2 text-rose-300">
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  <span>DEVELOPMENTAL FEEDBACK</span>
                </div>
                <p>
                  ✕ Deleting a core functional requirement to hide a software bug violates acceptance criteria and fails stakeholder objectives. The bug must be fixed and retested!
                </p>
              </div>
            )}

            {testAction === 'fix' && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-600 rounded-xl text-xs text-emerald-200 font-semibold">
                ✓ CORRECT ACTION! Never release software with known failing functional test cases. Fix, retest, and verify before go-live!
              </div>
            )}
          </div>
        </div>
      )}

      {/* FINAL REFLECTION & CAPSTONE COMPLETION */}
      {isMissionFullyComplete && (
        <div className="rounded-3xl bg-gradient-to-r from-cyan-900 via-blue-900 to-indigo-900 border border-cyan-400/50 p-8 text-center space-y-6 shadow-2xl animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700 text-xs font-bold">
            ✓ CAPSTONE LAB COMPLETED
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ✓ PROJECT CONSULTANT MISSION COMPLETE!
          </h2>

          <p className="text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Congratulations! You have successfully managed an end-to-end software development project lifecycle, balancing stakeholders, constraints, risks, Scrum framework, and quality assurance!
          </p>

          {/* Completed Journey Pipeline */}
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 font-mono text-xs text-cyan-300 flex flex-wrap items-center justify-center gap-2">
            <span>✓ STAKEHOLDERS</span> → 
            <span>✓ REQUIREMENTS</span> → 
            <span>✓ DEVELOPMENT APPROACH</span> → 
            <span>✓ RISK MANAGEMENT</span> → 
            <span>✓ TESTING</span> → 
            <span>✓ DELIVERY</span>
          </div>

          <div className="pt-2">
            <button
              onClick={handleFinishConsultantMission}
              className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl transition-all scale-105"
            >
              Return to Toolkit Dashboard ✓
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

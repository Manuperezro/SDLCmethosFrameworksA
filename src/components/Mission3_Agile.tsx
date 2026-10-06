import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  ArrowUp, 
  ArrowDown, 
  MessageSquare
} from 'lucide-react';
import type { BacklogItem } from '../types';

interface Mission3Props {
  onComplete: () => void;
  onOpenQuickNotes: () => void;
}

const INITIAL_BACKLOG: BacklogItem[] = [
  { id: 'b1', title: '🔐 Login & Security', priority: 1 },
  { id: 'b2', title: '📅 Book Study Room', priority: 2 },
  { id: 'b3', title: '🔎 Search Available Rooms', priority: 3 },
  { id: 'b4', title: '📱 Mobile Responsive Layout', priority: 4 },
  { id: 'b5', title: '❌ Cancel Booking', priority: 5 },
  { id: 'b6', title: '🔔 Push Notifications', priority: 6 },
  { id: 'b7', title: '♿ Accessibility Improvements', priority: 7 },
  { id: 'b8', title: '📊 Admin Dashboard', priority: 8 },
];

export const Mission3_Agile: React.FC<Mission3Props> = ({ onComplete, onOpenQuickNotes }) => {
  // Step 1: Change Scenario State
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [step1Submitted, setStep1Submitted] = useState<boolean>(false);

  // Step 2: Practical Agile Values Comparisons
  const [comparisonAnswers, setComparisonAnswers] = useState<Record<string, string>>({});

  // Step 3: Product Backlog Reordering State
  const [backlogItems, setBacklogItems] = useState<BacklogItem[]>(INITIAL_BACKLOG);
  const [hasReorderedSearch, setHasReorderedSearch] = useState<boolean>(false);
  const [showAccessibilityMsg, setShowAccessibilityMsg] = useState<boolean>(false);
  const [hasReorderedAccessibility, setHasReorderedAccessibility] = useState<boolean>(false);

  // Step 4: User Story Builder State
  const [storyRole, setStoryRole] = useState<string>('');
  const [storyAction, setStoryAction] = useState<string>('');
  const [storyBenefit, setStoryBenefit] = useState<string>('');
  const [builtStorySuccess, setBuiltStorySuccess] = useState<boolean>(false);

  // Step 5: Requirement Quality Inspection
  const [requirementChoice, setRequirementChoice] = useState<string | null>(null);

  const toggleActionCard = (actionId: string) => {
    if (selectedActions.includes(actionId)) {
      setSelectedActions(selectedActions.filter(a => a !== actionId));
    } else {
      setSelectedActions([...selectedActions, actionId]);
    }
  };

  const moveBacklogItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...backlogItems];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIdx];
    newItems[targetIdx] = temp;
    setBacklogItems(newItems);

    // Check if Search is in top 2
    const searchIndex = newItems.findIndex(i => i.id === 'b3');
    if (searchIndex <= 1 && !hasReorderedSearch) {
      setHasReorderedSearch(true);
      setShowAccessibilityMsg(true);
    }

    // Check if Accessibility is top 2 when message is shown
    const accessIndex = newItems.findIndex(i => i.id === 'b7');
    if (showAccessibilityMsg && accessIndex <= 1 && !hasReorderedAccessibility) {
      setHasReorderedAccessibility(true);
    }
  };

  const isAllStepsDone = 
    step1Submitted &&
    Object.keys(comparisonAnswers).length === 3 &&
    hasReorderedSearch &&
    hasReorderedAccessibility &&
    builtStorySuccess &&
    requirementChoice === 'specific';

  const handleCompleteMission = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    onComplete();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Banner */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-3xl sm:text-4xl">⚡</span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">MISSION 3 (~15 MINS)</span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white">THINK AGILE!</h1>
            </div>
          </div>

          <button
            onClick={onOpenQuickNotes}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs rounded-xl border border-slate-700 flex items-center gap-2"
          >
            📚 View Quick Notes
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-300">
          Agile is a set of values and principles focused on customer collaboration, working software, and responding to change. Experience backlog prioritisation and user story creation firsthand.
        </p>
      </div>

      {/* SECTION 1: THE CLIENT CHANGED THEIR MIND! */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
          <span className="text-3xl">📩</span>
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">REALISTIC CLIENT SCENARIO</span>
            <h2 className="text-xl font-extrabold text-white">CLIENT MESSAGE INCOMING!</h2>
          </div>
        </div>

        {/* Incoming Client Alert */}
        <div className="p-4 bg-amber-950/40 border border-amber-500/50 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-amber-300 text-xs font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>COLLEGE MANAGEMENT TO DEVELOPMENT TEAM</span>
            </span>
            <span>PRIORITY UPDATE</span>
          </div>
          <p className="text-sm font-semibold text-white">
            "Students are mainly accessing college services from mobile phones. Mobile usability is now a priority for the launch!"
          </p>
        </div>

        {/* Action Selection */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-200">
            WHAT SHOULD THE AGILE TEAM DO? (Select all sensible actions)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { id: 'ignore', label: '🔒 Ignore the change because development started', correct: false },
              { id: 'future', label: '📋 Add the requirement to future backlog work', correct: true },
              { id: 'discuss', label: '👥 Discuss priority with Product Owner & client', correct: true },
              { id: 'delete', label: '🗑 Delete everything built so far and restart', correct: false },
              { id: 'reprioritise', label: '📱 Re-prioritise mobile improvements', correct: true },
              { id: 'testmobile', label: '🧪 Test the mobile experience with students', correct: true },
            ].map((card) => {
              const isSelected = selectedActions.includes(card.id);
              return (
                <button
                  key={card.id}
                  onClick={() => toggleActionCard(card.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between text-xs ${
                    isSelected
                      ? 'bg-amber-950 border-amber-400 text-white font-bold ring-2 ring-amber-500'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span>{card.label}</span>
                  <span>{isSelected ? '✓' : '○'}</span>
                </button>
              );
            })}
          </div>

          {!step1Submitted ? (
            <button
              onClick={() => setStep1Submitted(true)}
              disabled={selectedActions.length === 0}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl transition-all"
            >
              Submit Response
            </button>
          ) : (
            <div className="p-4 bg-slate-950 border border-amber-500/40 rounded-2xl space-y-2 text-xs text-slate-200">
              <div className="font-bold text-amber-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>AGILE LOGIC: RESPONDING TO CHANGE</span>
              </div>
              <p>
                Agile teams welcome changing requirements — even late in development! Rather than ignoring changes or restarting completely, Agile teams collaborate with the Product Owner to reprioritise the Product Backlog, delivering the highest value to users first.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: AGILE VALUES — PRACTICAL COMPARISONS */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">PRACTICAL VALUES</span>
          <h2 className="text-xl font-extrabold text-white">AGILE VALUES IN PRACTICE</h2>
          <p className="text-xs text-slate-400 mt-1">
            Read each realistic team situation and select what an Agile team would prioritize:
          </p>
        </div>

        <div className="space-y-4">
          
          {/* Situation 1 */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-amber-300">
              SITUATION 1: A team has produced 80 pages of documentation, but has no working software prototype.
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setComparisonAnswers({ ...comparisonAnswers, s1: 'doc' })}
                className={`p-3 rounded-xl border text-left ${comparisonAnswers.s1 === 'doc' ? 'bg-rose-950 border-rose-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-300'}`}
              >
                Write 50 more pages of specifications first.
              </button>
              <button
                onClick={() => setComparisonAnswers({ ...comparisonAnswers, s1: 'working' })}
                className={`p-3 rounded-xl border text-left font-bold ${comparisonAnswers.s1 === 'working' ? 'bg-emerald-950 border-emerald-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-300'}`}
              >
                Focus on building a WORKING SOFTWARE prototype.
              </button>
            </div>
            {comparisonAnswers.s1 === 'working' && (
              <p className="text-[11px] text-emerald-300 font-semibold bg-emerald-950/40 p-2 rounded-lg">
                ✓ AGILE VALUE: Working software over comprehensive documentation.
              </p>
            )}
          </div>

          {/* Situation 2 */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-amber-300">
              SITUATION 2: The team followed the original plan, but users now need something different.
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setComparisonAnswers({ ...comparisonAnswers, s2: 'plan' })}
                className={`p-3 rounded-xl border text-left ${comparisonAnswers.s2 === 'plan' ? 'bg-rose-950 border-rose-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-300'}`}
              >
                Force users to accept the original plan.
              </button>
              <button
                onClick={() => setComparisonAnswers({ ...comparisonAnswers, s2: 'change' })}
                className={`p-3 rounded-xl border text-left font-bold ${comparisonAnswers.s2 === 'change' ? 'bg-emerald-950 border-emerald-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-300'}`}
              >
                Adapt the backlog by RESPONDING TO CHANGE.
              </button>
            </div>
            {comparisonAnswers.s2 === 'change' && (
              <p className="text-[11px] text-emerald-300 font-semibold bg-emerald-950/40 p-2 rounded-lg">
                ✓ AGILE VALUE: Responding to change over following a plan.
              </p>
            )}
          </div>

          {/* Situation 3 */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-amber-300">
              SITUATION 3: Developers have not spoken to the customer for three months.
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setComparisonAnswers({ ...comparisonAnswers, s3: 'collab' })}
                className={`p-3 rounded-xl border text-left font-bold ${comparisonAnswers.s3 === 'collab' ? 'bg-emerald-950 border-emerald-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-300'}`}
              >
                Increase CUSTOMER COLLABORATION through frequent demos.
              </button>
              <button
                onClick={() => setComparisonAnswers({ ...comparisonAnswers, s3: 'contract' })}
                className={`p-3 rounded-xl border text-left ${comparisonAnswers.s3 === 'contract' ? 'bg-rose-950 border-rose-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-300'}`}
              >
                Wait until project sign-off before speaking.
              </button>
            </div>
            {comparisonAnswers.s3 === 'collab' && (
              <p className="text-[11px] text-emerald-300 font-semibold bg-emerald-950/40 p-2 rounded-lg">
                ✓ AGILE VALUE: Customer collaboration over contract negotiation.
              </p>
            )}
          </div>

        </div>
      </div>

      {/* SECTION 3: PRODUCT BACKLOG CHALLENGE */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">DYNAMIC ORDERING</span>
          <h2 className="text-xl font-extrabold text-white">PRODUCT BACKLOG CHALLENGE</h2>
          <p className="text-xs text-slate-400 mt-1">
            A Product Backlog is an <strong>ordered list of work that may be needed for the product</strong>. It changes as priorities evolve!
          </p>
        </div>

        {/* Task 1 Scenario */}
        <div className="p-4 bg-cyan-950/40 border border-cyan-800/50 rounded-2xl space-y-2 text-xs">
          <span className="font-bold text-cyan-300 uppercase tracking-wider">FEEDBACK SCENARIO #1</span>
          <p className="text-white font-medium">
            "Students say searching for available rooms is their biggest problem."
          </p>
          <p className="text-slate-300">
            Use the <strong>UP ▲ / DOWN ▼</strong> controls to move <strong>🔎 Search Available Rooms</strong> into position 1 or 2!
          </p>
        </div>

        {/* Dynamic Backlog List */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex justify-between">
            <span>COLLEGE BOOKING APP BACKLOG ORDER</span>
            <span>HIGHEST VALUE AT TOP ↑</span>
          </div>

          {backlogItems.map((item, idx) => (
            <div
              key={item.id}
              className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                item.id === 'b3' && hasReorderedSearch
                  ? 'bg-emerald-950/80 border-emerald-500 font-bold text-emerald-200'
                  : item.id === 'b7' && hasReorderedAccessibility
                  ? 'bg-amber-950/80 border-amber-500 font-bold text-amber-200'
                  : 'bg-slate-900 border-slate-800 text-slate-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 rounded-lg bg-slate-800 text-cyan-300 flex items-center justify-center font-bold font-mono text-[11px]">
                  #{idx + 1}
                </span>
                <span>{item.title}</span>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() => moveBacklogItem(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded-lg text-slate-200"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => moveBacklogItem(idx, 'down')}
                  disabled={idx === backlogItems.length - 1}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded-lg text-slate-200"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Task 2 Scenario message */}
        {showAccessibilityMsg && (
          <div className="p-4 bg-amber-950/60 border border-amber-500/60 rounded-2xl space-y-2 text-xs animate-fade-in">
            <span className="font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>📩 NEW INFORMATION</span>
            </span>
            <p className="text-white font-medium">
              "The college needs accessibility improvements before launch."
            </p>
            <p className="text-slate-300">
              Now move <strong>♿ Accessibility Improvements</strong> into the top 2 positions as well!
            </p>
          </div>
        )}

        {hasReorderedSearch && hasReorderedAccessibility && (
          <div className="p-4 bg-emerald-950/80 border border-emerald-600 rounded-2xl text-xs text-emerald-200 space-y-1">
            <div className="font-bold uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>KEY LEARNING POINT</span>
            </div>
            <p>
              A Product Backlog is <strong>never frozen</strong>. Priorities change as new stakeholder needs, feedback, or legal constraints emerge!
            </p>
          </div>
        )}
      </div>

      {/* SECTION 4: USER STORIES & REQUIREMENTS */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">REQUIREMENT FORMATTING</span>
          <h2 className="text-xl font-extrabold text-white">USER STORY BUILDER</h2>
          <p className="text-xs text-slate-400 mt-1">
            Agile requirements are frequently written as <strong>User Stories</strong> using the formula:
          </p>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-amber-300 mt-2">
            AS A [role], I WANT [action], SO THAT [benefit].
          </div>
        </div>

        {/* Builder Palette */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            
            {/* Roles */}
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <span className="font-bold text-cyan-400 uppercase tracking-wider">1. AS A... (ROLE)</span>
              <div className="space-y-1">
                {['student', 'administrator'].map(role => (
                  <button
                    key={role}
                    onClick={() => setStoryRole(role)}
                    className={`w-full p-2 rounded-lg border text-left capitalize ${storyRole === role ? 'bg-cyan-950 border-cyan-400 text-white font-bold' : 'bg-slate-900 border-slate-800 text-slate-300'}`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <span className="font-bold text-amber-400 uppercase tracking-wider">2. I WANT TO... (ACTION)</span>
              <div className="space-y-1">
                {['search available study rooms by date', 'delete all college databases', 'view live room availability'].map(action => (
                  <button
                    key={action}
                    onClick={() => setStoryAction(action)}
                    className={`w-full p-2 rounded-lg border text-left ${storyAction === action ? 'bg-amber-950 border-amber-400 text-white font-bold' : 'bg-slate-900 border-slate-800 text-slate-300'}`}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <span className="font-bold text-emerald-400 uppercase tracking-wider">3. SO THAT... (BENEFIT)</span>
              <div className="space-y-1">
                {['I can quickly find somewhere to study', 'the server crashes', 'I can manage room bookings efficiently'].map(benefit => (
                  <button
                    key={benefit}
                    onClick={() => setStoryBenefit(benefit)}
                    className={`w-full p-2 rounded-lg border text-left ${storyBenefit === benefit ? 'bg-emerald-950 border-emerald-400 text-white font-bold' : 'bg-slate-900 border-slate-800 text-slate-300'}`}
                  >
                    {benefit}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Constructed Story Display */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">CONSTRUCTED USER STORY</span>
            <div className="text-sm font-semibold text-white leading-relaxed">
              {storyRole && storyAction && storyBenefit ? (
                <span>
                  "As a <strong className="text-cyan-300">{storyRole}</strong>, I want to <strong className="text-amber-300">{storyAction}</strong>, so that <strong className="text-emerald-300">{storyBenefit}</strong>."
                </span>
              ) : (
                <span className="text-slate-500 italic">Select a Role, Action, and Benefit above to construct a user story...</span>
              )}
            </div>

            {storyRole === 'student' && storyAction.includes('search') && storyBenefit.includes('find somewhere') && (
              <div className="pt-2">
                <button
                  onClick={() => setBuiltStorySuccess(true)}
                  className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl"
                >
                  ✓ Validate User Story
                </button>
              </div>
            )}

            {builtStorySuccess && (
              <div className="p-2.5 bg-emerald-950/80 border border-emerald-600 rounded-xl text-xs text-emerald-200 font-semibold">
                ✓ Sensible, clear User Story constructed successfully!
              </div>
            )}
          </div>
        </div>

        {/* Requirement Inspector: Good vs Vague */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white">
            WHY IS "MAKE THE WEBSITE GOOD" A POOR REQUIREMENT?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            
            <button
              onClick={() => setRequirementChoice('vague')}
              className={`p-4 rounded-2xl border text-left space-y-1 ${
                requirementChoice === 'vague' ? 'bg-rose-950 border-rose-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}
            >
              <div className="font-bold text-rose-300">❌ "Make the website good"</div>
              <p>Vague, subjective, unclear, and impossible to test objectively.</p>
            </button>

            <button
              onClick={() => setRequirementChoice('specific')}
              className={`p-4 rounded-2xl border text-left space-y-1 ${
                requirementChoice === 'specific' ? 'bg-emerald-950 border-emerald-400 text-white font-bold ring-2 ring-emerald-500' : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}
            >
              <div className="font-bold text-emerald-300">✓ "Users can search available rooms by date"</div>
              <p>Specific, understandable, and objectively testable.</p>
            </button>

          </div>
        </div>

      </div>

      {/* MISSION COMPLETION BANNER */}
      {isAllStepsDone && (
        <div className="rounded-3xl bg-gradient-to-r from-amber-900/90 to-yellow-900/90 border border-amber-500/50 p-6 text-center space-y-3 shadow-2xl animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-700 text-xs font-bold">
            ✓ MISSION ACCOMPLISHED
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            ✓ THINK AGILE MISSION COMPLETE!
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 max-w-2xl mx-auto">
            You have mastered Agile principles in action, experienced dynamic Product Backlog reordering, constructed structured User Stories, and analyzed requirement clarity.
          </p>
          <div className="pt-2">
            <button
              onClick={handleCompleteMission}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-2xl shadow-lg transition-all"
            >
              Continue to Mission 4: Scrum Lab →
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

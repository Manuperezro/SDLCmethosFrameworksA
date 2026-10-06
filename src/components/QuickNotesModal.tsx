import React, { useState } from 'react';
import { X, BookOpen, AlertTriangle, PenTool, Layers, CheckCircle2, Search } from 'lucide-react';

interface QuickNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickNotesModal: React.FC<QuickNotesModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'concepts' | 'scaffolds' | 'confusions' | 'hierarchy'>('concepts');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>('sdlc');

  if (!isOpen) return null;

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                📚 QUICK NOTES & REVISION GUIDE
              </h2>
              <p className="text-xs text-slate-400">
                Permanent Coursework Reference & Writing Scaffolds for BTEC Level 3 Computing
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-3 bg-slate-900 border-b border-slate-800 flex flex-wrap gap-2 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('concepts')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'concepts'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Core Concepts & Notes</span>
            </button>
            <button
              onClick={() => setActiveTab('scaffolds')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'scaffolds'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <PenTool className="w-4 h-4" />
              <span>✍️ Assignment Writing Scaffolds</span>
            </button>
            <button
              onClick={() => setActiveTab('confusions')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'confusions'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>⚠️ Don't Mix These Up</span>
            </button>
            <button
              onClick={() => setActiveTab('hierarchy')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'hierarchy'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Software Hierarchy</span>
            </button>
          </div>

          {activeTab === 'concepts' && (
            <div className="relative w-full sm:w-64 mt-2 sm:mt-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
              />
            </div>
          )}
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-slate-200 text-sm">

          {/* TAB 1: CORE CONCEPTS */}
          {activeTab === 'concepts' && (
            <div className="space-y-3">

              {/* SDLC */}
              <div className="border border-slate-800 bg-slate-950/60 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection('sdlc')}
                  className="w-full px-4 py-3 bg-slate-800/80 hover:bg-slate-800 flex items-center justify-between text-left font-bold text-slate-100"
                >
                  <span className="flex items-center gap-2">🔄 1. Software Development Lifecycle (SDLC)</span>
                  <span className="text-cyan-400 text-xs">{expandedSection === 'sdlc' ? 'Collapse ▲' : 'Expand ▼'}</span>
                </button>
                {expandedSection === 'sdlc' && (
                  <div className="p-4 space-y-3 border-t border-slate-800 text-xs sm:text-sm">
                    <p className="text-slate-300">
                      <strong>Definition:</strong> The structured sequence of stages involved in building, testing, deploying, and maintaining software solutions from initial concept to retirement.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="font-bold text-cyan-300">1. Idea:</span> Problem identification or opportunity.
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="font-bold text-cyan-300">2. Planning:</span> Feasibility, timeline, budget, resource allocation.
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="font-bold text-cyan-300">3. Analysis / Requirements:</span> Interviews, user stories, functional & non-functional requirements.
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="font-bold text-cyan-300">4. Design:</span> Wireframes, ERD, UML, pseudocode, UI/DB designs.
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="font-bold text-cyan-300">5. Development:</span> Coding, source control, modular implementation.
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="font-bold text-cyan-300">6. Testing:</span> Unit, integration, user acceptance testing, bug logging.
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="font-bold text-cyan-300">7. Deployment:</span> Installation, release, user training, go-live.
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="font-bold text-cyan-300">8. Maintenance / Evaluation:</span> Bug fixes, updates, user feedback review.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* WATERFALL */}
              <div className="border border-slate-800 bg-slate-950/60 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection('waterfall')}
                  className="w-full px-4 py-3 bg-slate-800/80 hover:bg-slate-800 flex items-center justify-between text-left font-bold text-slate-100"
                >
                  <span className="flex items-center gap-2">💧 2. Waterfall Model</span>
                  <span className="text-cyan-400 text-xs">{expandedSection === 'waterfall' ? 'Collapse ▲' : 'Expand ▼'}</span>
                </button>
                {expandedSection === 'waterfall' && (
                  <div className="p-4 space-y-3 border-t border-slate-800 text-xs sm:text-sm">
                    <p className="text-slate-300">
                      <strong>Structure:</strong> Sequential progression where each phase must be fully completed and signed off before the next phase begins.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-lg">
                        <h4 className="font-bold text-emerald-300">Advantages</h4>
                        <ul className="list-disc list-inside text-slate-300 space-y-1 mt-1 text-xs">
                          <li>Clear structure, milestones, and documentation.</li>
                          <li>Easy to manage with fixed scopes and budgets.</li>
                          <li>Works well when requirements are completely stable.</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-rose-950/30 border border-rose-800/40 rounded-lg">
                        <h4 className="font-bold text-rose-300">Disadvantages / Limitations</h4>
                        <ul className="list-disc list-inside text-slate-300 space-y-1 mt-1 text-xs">
                          <li>Inflexible to changing user needs.</li>
                          <li>Working software appears late in the lifecycle.</li>
                          <li>High risk if initial requirements were inaccurate.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* V-MODEL */}
              <div className="border border-slate-800 bg-slate-950/60 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection('vmodel')}
                  className="w-full px-4 py-3 bg-slate-800/80 hover:bg-slate-800 flex items-center justify-between text-left font-bold text-slate-100"
                >
                  <span className="flex items-center gap-2">V 3. V-Model (Verification & Validation)</span>
                  <span className="text-cyan-400 text-xs">{expandedSection === 'vmodel' ? 'Collapse ▲' : 'Expand ▼'}</span>
                </button>
                {expandedSection === 'vmodel' && (
                  <div className="p-4 space-y-3 border-t border-slate-800 text-xs sm:text-sm">
                    <p className="text-slate-300">
                      <strong>Structure:</strong> Maps every development phase directly to a corresponding testing/validation phase early in the project.
                    </p>
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-1">
                      <p><strong className="text-cyan-300">Requirements Phase</strong> ↔ Acceptance Testing</p>
                      <p><strong className="text-cyan-300">System Design</strong> ↔ System Testing</p>
                      <p><strong className="text-cyan-300">Architecture Design</strong> ↔ Integration Testing</p>
                      <p><strong className="text-cyan-300">Module Design</strong> ↔ Unit Testing</p>
                    </div>
                  </div>
                )}
              </div>

              {/* SPIRAL */}
              <div className="border border-slate-800 bg-slate-950/60 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection('spiral')}
                  className="w-full px-4 py-3 bg-slate-800/80 hover:bg-slate-800 flex items-center justify-between text-left font-bold text-slate-100"
                >
                  <span className="flex items-center gap-2">🌀 4. Spiral Model</span>
                  <span className="text-cyan-400 text-xs">{expandedSection === 'spiral' ? 'Collapse ▲' : 'Expand ▼'}</span>
                </button>
                {expandedSection === 'spiral' && (
                  <div className="p-4 space-y-3 border-t border-slate-800 text-xs sm:text-sm">
                    <p className="text-slate-300">
                      <strong>Key Idea:</strong> Risk-driven model combining iterative development with systematic risk analysis at every turn of the spiral (Determine objectives → Risk Analysis → Engineering → Planning next phase).
                    </p>
                    <p className="text-amber-300 text-xs">
                      <strong>Best Used For:</strong> High-budget, mission-critical projects with major technical or financial risks.
                    </p>
                  </div>
                )}
              </div>

              {/* AGILE PHILOSOPHY */}
              <div className="border border-slate-800 bg-slate-950/60 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection('agile')}
                  className="w-full px-4 py-3 bg-slate-800/80 hover:bg-slate-800 flex items-center justify-between text-left font-bold text-slate-100"
                >
                  <span className="flex items-center gap-2">⚡ 5. Agile Values & Philosophy</span>
                  <span className="text-cyan-400 text-xs">{expandedSection === 'agile' ? 'Collapse ▲' : 'Expand ▼'}</span>
                </button>
                {expandedSection === 'agile' && (
                  <div className="p-4 space-y-3 border-t border-slate-800 text-xs sm:text-sm">
                    <p className="text-slate-300">
                      Agile is an umbrella <strong>philosophy/mindset</strong> defined by 4 core values:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-cyan-300 font-bold">1. Individuals & interactions</span> over processes and tools
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-cyan-300 font-bold">2. Working software</span> over comprehensive documentation
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-cyan-300 font-bold">3. Customer collaboration</span> over contract negotiation
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-cyan-300 font-bold">4. Responding to change</span> over following a plan
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SCRUM */}
              <div className="border border-slate-800 bg-slate-950/60 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection('scrum')}
                  className="w-full px-4 py-3 bg-slate-800/80 hover:bg-slate-800 flex items-center justify-between text-left font-bold text-slate-100"
                >
                  <span className="flex items-center gap-2">🏃 6. Scrum Framework</span>
                  <span className="text-cyan-400 text-xs">{expandedSection === 'scrum' ? 'Collapse ▲' : 'Expand ▼'}</span>
                </button>
                {expandedSection === 'scrum' && (
                  <div className="p-4 space-y-3 border-t border-slate-800 text-xs sm:text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                        <h4 className="font-bold text-cyan-300 mb-1">Scrum Roles</h4>
                        <ul className="text-xs space-y-1 text-slate-300">
                          <li><strong>Product Owner:</strong> Manages & orders Product Backlog; maximizes product value.</li>
                          <li><strong>Scrum Master:</strong> Facilitates Scrum, removes blockers/impediments.</li>
                          <li><strong>Developers:</strong> Build the usable Increment.</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                        <h4 className="font-bold text-cyan-300 mb-1">Scrum Events</h4>
                        <ul className="text-xs space-y-1 text-slate-300">
                          <li><strong>Sprint:</strong> Time-boxed iteration (1–4 weeks).</li>
                          <li><strong>Sprint Planning:</strong> Select work & set Sprint Goal.</li>
                          <li><strong>Daily Scrum:</strong> 15-min daily sync.</li>
                          <li><strong>Sprint Review:</strong> Demo Increment & gather feedback.</li>
                          <li><strong>Retrospective:</strong> Reflect & improve team processes.</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                        <h4 className="font-bold text-cyan-300 mb-1">Scrum Artifacts</h4>
                        <ul className="text-xs space-y-1 text-slate-300">
                          <li><strong>Product Backlog:</strong> Prioritised master feature list.</li>
                          <li><strong>Sprint Backlog:</strong> Items selected for current Sprint + delivery plan.</li>
                          <li><strong>Increment:</strong> Tested, usable working software build.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* KANBAN */}
              <div className="border border-slate-800 bg-slate-950/60 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection('kanban')}
                  className="w-full px-4 py-3 bg-slate-800/80 hover:bg-slate-800 flex items-center justify-between text-left font-bold text-slate-100"
                >
                  <span className="flex items-center gap-2">📋 7. Kanban Framework</span>
                  <span className="text-cyan-400 text-xs">{expandedSection === 'kanban' ? 'Collapse ▲' : 'Expand ▼'}</span>
                </button>
                {expandedSection === 'kanban' && (
                  <div className="p-4 space-y-3 border-t border-slate-800 text-xs sm:text-sm">
                    <p className="text-slate-300">
                      <strong>Core Focus:</strong> Visualising workflow, managing flow, and enforcing Work In Progress (WIP) Limits to prevent multi-tasking bottlenecks.
                    </p>
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-1">
                      <p><strong className="text-cyan-300">WIP Limits:</strong> Restricts the number of active tasks in a column (e.g. In Progress Max: 2). Forces team members to finish tasks before pulling new ones.</p>
                      <p><strong className="text-cyan-300">Key Motto:</strong> "Stop Starting, Start Finishing!"</p>
                    </div>
                  </div>
                )}
              </div>

              {/* PROJECT MANAGEMENT CONNECTIONS */}
              <div className="border border-slate-800 bg-slate-950/60 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection('pm')}
                  className="w-full px-4 py-3 bg-slate-800/80 hover:bg-slate-800 flex items-center justify-between text-left font-bold text-slate-100"
                >
                  <span className="flex items-center gap-2">👔 8. Project Management Concepts (Unit 3)</span>
                  <span className="text-cyan-400 text-xs">{expandedSection === 'pm' ? 'Collapse ▲' : 'Expand ▼'}</span>
                </button>
                {expandedSection === 'pm' && (
                  <div className="p-4 space-y-3 border-t border-slate-800 text-xs sm:text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
                        <strong className="text-cyan-300">Triple Constraint (Scope, Time, Cost):</strong> Changing one constraint impacts the others. Quality sits at the centre.
                      </div>
                      <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
                        <strong className="text-cyan-300">Risk Management:</strong> Identifying potential events, evaluating Probability & Impact, and planning responses (Avoid, Mitigate, Accept, Transfer).
                      </div>
                      <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
                        <strong className="text-cyan-300">Stakeholders:</strong> Individuals or groups affected by or with an interest in the project outcome.
                      </div>
                      <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
                        <strong className="text-cyan-300">Milestones:</strong> Key reference points marking the completion of major deliverables.
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: ASSIGNMENT WRITING SCAFFOLDS */}
          {activeTab === 'scaffolds' && (
            <div className="space-y-4">
              <div className="p-4 bg-cyan-950/40 border border-cyan-800/50 rounded-xl">
                <h3 className="font-bold text-cyan-300 text-base flex items-center gap-2">
                  <PenTool className="w-5 h-5 text-cyan-400" />
                  ✍️ Sentence Starters & Writing Prompts for Coursework
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Use these scaffolds to structure high-grade technical explanations and justifications in your Unit 3 assignments.
                </p>
              </div>

              {/* Scaffold 1 */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <h4 className="font-bold text-amber-300 text-sm">1. Explaining a Development Model</h4>
                <div className="bg-slate-900 p-3 rounded-lg text-xs font-mono text-cyan-200 border border-slate-800 space-y-1">
                  <p>• "[Model Name] follows a __________ structure where development activities progress by..."</p>
                  <p>• "A major advantage of using this approach for this specific project is __________ because..."</p>
                  <p>• "However, a key limitation of this model in this scenario is __________ which could lead to..."</p>
                </div>
              </div>

              {/* Scaffold 2 */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <h4 className="font-bold text-amber-300 text-sm">2. Comparing Approaches</h4>
                <div className="bg-slate-900 p-3 rounded-lg text-xs font-mono text-cyan-200 border border-slate-800 space-y-1">
                  <p>• "Unlike Waterfall, an Agile approach allows the team to..."</p>
                  <p>• "While both approaches require requirement gathering, they differ significantly in how..."</p>
                  <p>• "This distinction is critical for the project because..."</p>
                </div>
              </div>

              {/* Scaffold 3 */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <h4 className="font-bold text-amber-300 text-sm">3. Justifying a Methodology Choice</h4>
                <div className="bg-slate-900 p-3 rounded-lg text-xs font-mono text-cyan-200 border border-slate-800 space-y-1">
                  <p>• "An Agile / Scrum approach is suitable for this project because the project characteristics include..."</p>
                  <p>• "Since the client expects requirement changes during development, selecting [Approach] mitigates the risk of..."</p>
                  <p>• "A potential disadvantage to manage when using this methodology would be..."</p>
                </div>
              </div>

              {/* Scaffold 4 */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <h4 className="font-bold text-amber-300 text-sm">4. Discussing Scrum & Sprint Execution</h4>
                <div className="bg-slate-900 p-3 rounded-lg text-xs font-mono text-cyan-200 border border-slate-800 space-y-1">
                  <p>• "Scrum supports iterative development by organising work into short time-boxed Sprints where..."</p>
                  <p>• "The Product Owner prioritises the Product Backlog based on business value, ensuring that..."</p>
                  <p>• "The Sprint Review focuses on inspecting the Increment with stakeholders, whereas the Retrospective focuses on..."</p>
                </div>
              </div>

              {/* Scaffold 5 */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <h4 className="font-bold text-amber-300 text-sm">5. Project Management & Trade-offs</h4>
                <div className="bg-slate-900 p-3 rounded-lg text-xs font-mono text-cyan-200 border border-slate-800 space-y-1">
                  <p>• "If the project scope increases without additional budget or time, the quality of development may be compromised because..."</p>
                  <p>• "A significant technical risk is __________, which the team can mitigate by..."</p>
                  <p>• "The Product Owner can manage stakeholder expectations regarding deadlines by..."</p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: DON'T MIX THESE UP */}
          {activeTab === 'confusions' && (
            <div className="space-y-4">
              <div className="p-4 bg-rose-950/40 border border-rose-800/50 rounded-xl">
                <h3 className="font-bold text-rose-300 text-base flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-400" />
                  ⚠️ Don't Mix These Up! (Common Exam & Coursework Mistakes)
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Avoid these frequent misconceptions when writing your coursework analysis.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                
                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex items-center justify-between font-bold text-amber-300">
                    <span>SDLC ≠ WATERFALL</span>
                    <span className="text-rose-400 text-[10px] uppercase font-semibold">Different Concepts</span>
                  </div>
                  <p className="text-slate-300">
                    <strong>SDLC</strong> describes the <em>stages</em> that happen (Requirements → Design → Test). <strong>Waterfall</strong> is just <em>one particular way</em> of organising progression through those stages.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex items-center justify-between font-bold text-amber-300">
                    <span>AGILE ≠ SCRUM</span>
                    <span className="text-rose-400 text-[10px] uppercase font-semibold">Philosophy vs Framework</span>
                  </div>
                  <p className="text-slate-300">
                    <strong>Agile</strong> is the overarching set of values and principles. <strong>Scrum</strong> is a specific framework that teams use to implement Agile principles.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex items-center justify-between font-bold text-amber-300">
                    <span>SCRUM ≠ KANBAN</span>
                    <span className="text-rose-400 text-[10px] uppercase font-semibold">Time-boxed vs Flow</span>
                  </div>
                  <p className="text-slate-300">
                    <strong>Scrum</strong> works in fixed time-boxed Sprints with assigned roles. <strong>Kanban</strong> focuses on continuous workflow visualization and WIP limits.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex items-center justify-between font-bold text-amber-300">
                    <span>PRODUCT BACKLOG ≠ SPRINT BACKLOG</span>
                    <span className="text-rose-400 text-[10px] uppercase font-semibold">Master List vs Sprint Plan</span>
                  </div>
                  <p className="text-slate-300">
                    <strong>Product Backlog</strong> is the master ordered list of everything that might be needed. <strong>Sprint Backlog</strong> is the subset of items selected for the current Sprint.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex items-center justify-between font-bold text-amber-300">
                    <span>SPRINT REVIEW ≠ RETROSPECTIVE</span>
                    <span className="text-rose-400 text-[10px] uppercase font-semibold">Product vs Process</span>
                  </div>
                  <p className="text-slate-300">
                    <strong>Sprint Review</strong> inspects the <em>product Increment</em> with stakeholders. The <strong>Retrospective</strong> inspects <em>how the team worked</em> to improve internal processes.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex items-center justify-between font-bold text-amber-300">
                    <span>REQUIREMENT ≠ USER STORY</span>
                    <span className="text-rose-400 text-[10px] uppercase font-semibold">Need vs Format</span>
                  </div>
                  <p className="text-slate-300">
                    A <strong>requirement</strong> is any condition/capability needed. A <strong>user story</strong> is one specific format (`As a... I want... so that...`) used to express a requirement.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl md:col-span-2 space-y-1">
                  <div className="flex items-center justify-between font-bold text-amber-300">
                    <span>TESTING ≠ EVALUATION</span>
                    <span className="text-rose-400 text-[10px] uppercase font-semibold">Verification vs Validation/Impact</span>
                  </div>
                  <p className="text-slate-300">
                    <strong>Testing</strong> verifies whether the software works correctly according to technical specs without bugs. <strong>Evaluation</strong> reviews how effectively the solution solves the user's real business problem.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: SOFTWARE HIERARCHY */}
          {activeTab === 'hierarchy' && (
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
              <h3 className="font-bold text-cyan-300 text-base">
                📐 Software Development Terminology Hierarchy
              </h3>
              <p className="text-xs text-slate-300">
                Keep this mental map in mind when explaining software engineering terms:
              </p>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto">
                <pre className="text-cyan-300">
{`SOFTWARE DEVELOPMENT
│
├── SDLC (Software Development Lifecycle)
│   └── What activities happen during development?
│       (Requirements → Design → Build → Test → Deploy → Maintain)
│
├── DEVELOPMENT APPROACH / MODEL
│   └── How is development organised over time?
│       ├── Waterfall 💧 (Sequential)
│       ├── V-Model V (Dev ↔ Testing pairs)
│       ├── Spiral 🌀 (Risk-driven loops)
│       ├── Iterative 🔁 (Repeated versions)
│       └── Agile ⚡ (Incremental philosophy)
│
└── FRAMEWORK / PRACTICES
    └── How does the team organise and manage day-to-day work?
        ├── Scrum 🏃 (Sprints, Product Backlog, PO, SM, Devs)
        └── Kanban 📋 (Workflow board, WIP Limits, Continuous Flow)`}
                </pre>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span>Tip: Access Quick Notes anytime during any mission.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all"
          >
            Close Notes
          </button>
        </div>

      </div>
    </div>
  );
};

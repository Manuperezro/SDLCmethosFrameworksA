import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';
import type { ProjectScenario } from '../types';

interface Mission2Props {
  onComplete: () => void;
  onOpenQuickNotes: () => void;
}

const VISUAL_MODELS = [
  {
    id: 'waterfall',
    name: 'WATERFALL',
    icon: '💧',
    pipeline: ['PLAN', 'DESIGN', 'BUILD', 'TEST', 'DEPLOY'],
    keyIdea: 'Sequential progression through defined stages.',
    usefulWhen: 'Requirements are relatively stable, well-understood, and regulatory compliance requires formal documentation.',
    challenge: 'Late changes may affect significant completed work and cause high rework costs.',
    color: 'from-blue-900/40 to-cyan-950/40 border-blue-700/50',
    accentColor: 'text-cyan-400',
  },
  {
    id: 'vmodel',
    name: 'V-MODEL',
    icon: 'V',
    pipeline: ['REQ ↔ ACCEPTANCE TEST', 'SYS DESIGN ↔ SYS TEST', 'MODULE ↔ UNIT TEST', 'CODE'],
    keyIdea: 'Development activities have corresponding testing/validation activities designed early.',
    usefulWhen: 'High-reliability systems where testing needs to be planned alongside design.',
    challenge: 'Like Waterfall, it can be rigid if initial requirements change drastically.',
    color: 'from-indigo-900/40 to-blue-950/40 border-indigo-700/50',
    accentColor: 'text-indigo-400',
  },
  {
    id: 'spiral',
    name: 'SPIRAL',
    icon: '🌀',
    pipeline: ['PLAN', 'RISK ANALYSIS', 'PROTOTYPE & DEVELOP', 'EVALUATE ↻'],
    keyIdea: 'Repeated cycles with strong, explicit attention to risk management.',
    usefulWhen: 'High uncertainty, expensive, mission-critical projects with high technical risk.',
    challenge: 'Requires deep risk assessment expertise and can be costly/complex to administer.',
    color: 'from-purple-900/40 to-pink-950/40 border-purple-700/50',
    accentColor: 'text-purple-400',
  },
  {
    id: 'iterative',
    name: 'ITERATIVE',
    icon: '🔁',
    pipeline: ['VERSION 1', 'REVIEW', 'VERSION 2', 'REVIEW', 'VERSION 3 ↻'],
    keyIdea: 'Improve the solution through repeated versions and feature expansion over time.',
    usefulWhen: 'Building large applications where core features can be released first.',
    challenge: 'System architecture can become messy without careful refactoring across versions.',
    color: 'from-emerald-900/40 to-teal-950/40 border-emerald-700/50',
    accentColor: 'text-emerald-400',
  },
  {
    id: 'agile',
    name: 'AGILE',
    icon: '⚡',
    pipeline: ['BACKLOG', 'SMALL INCREMENT', 'TEST', 'FEEDBACK', 'ADAPT ↻'],
    keyIdea: 'Deliver useful work incrementally and adapt continuously to user feedback and change.',
    usefulWhen: 'Dynamic projects where requirements evolve and fast customer feedback is vital.',
    challenge: 'Requires active stakeholder involvement and clear prioritization discipline.',
    color: 'from-amber-900/40 to-yellow-950/40 border-amber-700/50',
    accentColor: 'text-amber-400',
  },
];

const SCENARIOS: ProjectScenario[] = [
  {
    id: 'projA',
    title: 'PROJECT A — DEFRA ENVIRONMENTAL REPORTING SYSTEM',
    description: 'A government agency needs a compliance reporting system with strict legal mandates.',
    characteristics: [
      '📋 Requirements clearly agreed and locked by law',
      '📑 Formal documentation & audit trail required',
      '🔒 Very limited expected requirement change',
      '📅 Fixed sequential approval stages required',
    ],
    options: [
      {
        id: 'opt-waterfall',
        label: 'Waterfall Approach',
        model: 'Waterfall',
        isCorrect: true,
        justification: 'Stable requirements, strict compliance, and mandatory formal sign-offs make sequential progression through defined stages suitable here.',
      },
      {
        id: 'opt-agile',
        label: 'Agile Approach',
        model: 'Agile',
        isCorrect: false,
        justification: 'While Agile is great for evolving requirements, Project A has fixed legal requirements and strict audit constraints that favor formal sequential sign-offs.',
      },
    ],
  },
  {
    id: 'projB',
    title: 'PROJECT B — CAMPUS EVENT TICKETING MOBILE APP',
    description: 'A new startup app for college students to discover and book live campus events.',
    characteristics: [
      '📱 New mobile application aimed at tech-savvy students',
      '👥 Users need to test working prototypes quickly',
      '🔄 Requirements will evolve based on early user feedback',
      '📦 Features can be delivered incrementally in small releases',
    ],
    options: [
      {
        id: 'opt-waterfall-b',
        label: 'Waterfall Approach',
        model: 'Waterfall',
        isCorrect: false,
        justification: 'Waterfall locks requirements early, making it hard to pivot when mobile users request changes after testing prototypes.',
      },
      {
        id: 'opt-agile-b',
        label: 'Agile Approach',
        model: 'Agile',
        isCorrect: true,
        justification: 'Evolving requirements, user testing, and incremental feature delivery make an Agile approach highly suitable for fast feedback and adaptation.',
      },
    ],
  },
  {
    id: 'projC',
    title: 'PROJECT C — AIR TRAFFIC CONTROL RADAR INTEGRATION',
    description: 'A £50M aerospace project integrating next-gen radar hardware with high failure risks.',
    characteristics: [
      '⚠️ High technical uncertainty and life-critical safety impact',
      '💰 Expensive £50M project with severe failure costs',
      '🔐 Major technical risks in hardware-software interfacing',
      '🧪 Prototypes and simulations needed specifically to investigate risk',
    ],
    options: [
      {
        id: 'opt-spiral-c',
        label: 'Spiral Model',
        model: 'Spiral',
        isCorrect: true,
        justification: 'The Spiral model focuses heavily on risk analysis and prototyping at every cycle, making it ideal for high-cost, high-risk aerospace engineering.',
      },
      {
        id: 'opt-agile-c',
        label: 'Agile Approach',
        model: 'Agile',
        isCorrect: false,
        justification: 'While Agile uses iterations, the explicit, structured risk analysis phases of the Spiral model make Spiral superior for high-risk safety-critical hardware.',
      },
    ],
  },
];

export const Mission2_Models: React.FC<Mission2Props> = ({ onComplete, onOpenQuickNotes }) => {
  const [selectedModelSignature, setSelectedModelSignature] = useState<string>('waterfall');
  const [userChoices, setUserChoices] = useState<Record<string, string>>({});
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);

  const handleSelectRecommendation = (scenarioId: string, optionId: string) => {
    const updated = { ...userChoices, [scenarioId]: optionId };
    setUserChoices(updated);

    const scenario = SCENARIOS.find(s => s.id === scenarioId);
    const selectedOpt = scenario?.options.find(o => o.id === optionId);

    if (selectedOpt?.isCorrect) {
      if (!completedScenarios.includes(scenarioId)) {
        const nextCompleted = [...completedScenarios, scenarioId];
        setCompletedScenarios(nextCompleted);

        if (nextCompleted.length === SCENARIOS.length) {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          onComplete();
        }
      }
    }
  };

  const activeSignature = VISUAL_MODELS.find(m => m.id === selectedModelSignature) || VISUAL_MODELS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Mission Banner */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-3xl sm:text-4xl">🗺️</span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">MISSION 2 (~10 MINS)</span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white">METHODS & MODELS REFRESH</h1>
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
          Review the visual signatures of the five key development models, then analyze real project scenarios to build and justify your methodology recommendations.
        </p>
      </div>

      {/* SECTION 1: THE 5 VISUAL SIGNATURES */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>1️⃣ THE 5 DEVELOPMENT MODEL SIGNATURES</span>
          <span className="text-xs text-slate-400 font-normal">(Click a model to inspect its flow and trade-offs)</span>
        </h2>

        {/* Model Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {VISUAL_MODELS.map((model) => {
            const isSelected = model.id === selectedModelSignature;
            return (
              <button
                key={model.id}
                onClick={() => setSelectedModelSignature(model.id)}
                className={`p-3.5 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? 'bg-indigo-950 border-indigo-400 shadow-lg scale-105 font-bold'
                    : 'bg-slate-900/70 border-slate-800 hover:bg-slate-800 text-slate-300'
                }`}
              >
                <div className="text-2xl mb-1">{model.icon}</div>
                <div className={`text-xs font-extrabold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {model.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Signature Card */}
        <div className={`rounded-3xl bg-gradient-to-b ${activeSignature.color} border p-6 sm:p-8 space-y-6 shadow-2xl`}>
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
            <span className="text-4xl">{activeSignature.icon}</span>
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider ${activeSignature.accentColor}`}>
                MODEL VISUAL SIGNATURE
              </span>
              <h3 className="text-2xl font-extrabold text-white">{activeSignature.name} MODEL</h3>
            </div>
          </div>

          {/* Visual Pipeline */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">DEVELOPMENT PROGRESSION FLOW</div>
            <div className="flex flex-wrap items-center gap-2">
              {activeSignature.pipeline.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs font-mono font-bold text-cyan-300 shadow-sm">
                    {step}
                  </div>
                  {idx < activeSignature.pipeline.length - 1 && (
                    <span className="text-slate-500 font-bold">↓</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-1">
              <span className="font-extrabold text-cyan-400 uppercase tracking-wider">💡 KEY IDEA</span>
              <p className="text-slate-200 leading-relaxed">{activeSignature.keyIdea}</p>
            </div>
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-1">
              <span className="font-extrabold text-emerald-400 uppercase tracking-wider">✓ USEFUL WHEN</span>
              <p className="text-slate-200 leading-relaxed">{activeSignature.usefulWhen}</p>
            </div>
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-1">
              <span className="font-extrabold text-rose-400 uppercase tracking-wider">⚠️ POTENTIAL CHALLENGE</span>
              <p className="text-slate-200 leading-relaxed">{activeSignature.challenge}</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: METHOD MATCHING CHALLENGE */}
      <div className="space-y-6 pt-4 border-t border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>2️⃣ METHOD MATCHING CHALLENGE — BUILD THE RECOMMENDATION</span>
          </h2>
          <p className="text-xs text-slate-400">
            Read each project scenario, inspect its characteristics, and select the approach you would justify to the client.
          </p>
        </div>

        <div className="space-y-6">
          {SCENARIOS.map((scenario) => {
            const chosenOptionId = userChoices[scenario.id];
            const chosenOption = scenario.options.find(o => o.id === chosenOptionId);
            const isFinished = completedScenarios.includes(scenario.id);

            return (
              <div
                key={scenario.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">SCENARIO ANALYSIS</span>
                    <h3 className="text-lg font-bold text-white">{scenario.title}</h3>
                  </div>
                  {isFinished && (
                    <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-700 rounded-full text-xs font-bold self-start sm:self-auto">
                      ✓ RECOMMENDATION JUSTIFIED
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300">{scenario.description}</p>

                {/* Characteristics Cards */}
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">PROJECT CHARACTERISTICS</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {scenario.characteristics.map((char, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 flex items-center gap-2"
                      >
                        <span>{char}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Option Buttons */}
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">RECOMMEND AN APPROACH</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {scenario.options.map((opt) => {
                      const isSelected = chosenOptionId === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectRecommendation(scenario.id, opt.id)}
                          className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                            isSelected
                              ? opt.isCorrect
                                ? 'bg-emerald-950 border-emerald-400 text-white font-bold ring-2 ring-emerald-500'
                                : 'bg-rose-950 border-rose-400 text-white font-bold'
                              : 'bg-slate-950 border-slate-700 hover:border-cyan-500 text-slate-200'
                          }`}
                        >
                          <span className="text-sm font-bold">{opt.label}</span>
                          <span className="text-xs">
                            {isSelected ? (opt.isCorrect ? '✓' : '✕') : '○'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Justification Box */}
                {chosenOption && (
                  <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1.5 transition-all ${
                    chosenOption.isCorrect
                      ? 'bg-emerald-950/70 border-emerald-700 text-emerald-200'
                      : 'bg-rose-950/70 border-rose-700 text-rose-200'
                  }`}>
                    <div className="font-bold uppercase tracking-wider flex items-center gap-2">
                      {chosenOption.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-rose-400" />}
                      <span>{chosenOption.isCorrect ? 'RECOMMENDATION JUSTIFICATION' : 'UNSUITABLE RECOMMENDATION'}</span>
                    </div>
                    <p>{chosenOption.justification}</p>
                    <p className="text-[11px] font-semibold text-cyan-300 pt-1">
                      💡 Important: We never say a project "MUST" use a model without context. Methodology selection always requires structured JUSTIFICATION based on project characteristics!
                    </p>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>

      {/* MISSION COMPLETION BANNER */}
      {completedScenarios.length === SCENARIOS.length && (
        <div className="rounded-3xl bg-gradient-to-r from-indigo-900/90 to-blue-900/90 border border-indigo-500/50 p-6 text-center space-y-3 shadow-2xl animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700 text-xs font-bold">
            ✓ MISSION ACCOMPLISHED
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            ✓ METHODS & MODELS REFRESH COMPLETE!
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100 max-w-2xl mx-auto">
            Excellent reasoning! You have refreshed your understanding of Waterfall, V-Model, Spiral, Iterative, and Agile, and successfully justified methodology recommendations based on project constraints.
          </p>
          <div className="pt-2">
            <button
              onClick={onComplete}
              className="px-6 py-3 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-extrabold rounded-2xl shadow-lg transition-all"
            >
              Continue to Mission 3: Think Agile →
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

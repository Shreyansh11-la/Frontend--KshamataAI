import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SimulationScenario, SimulatorChoice } from '../types';
import {
  SlidersHorizontal,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Award,
  Layers
} from 'lucide-react';

export const WorkSimulatorView: React.FC = () => {
  const { simulations, updateCompetencyLevel, addToast } = useApp();
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<SimulatorChoice | null>(null);
  const [hasCommitted, setHasCommitted] = useState(false);

  const scenario = simulations[activeScenarioIndex] || simulations[0];

  const handleSelectChoice = (choice: SimulatorChoice) => {
    if (hasCommitted) return;
    setSelectedChoice(choice);
  };

  const handleCommitDecision = () => {
    if (!selectedChoice) return;
    setHasCommitted(true);

    if (selectedChoice.isOptimal) {
      updateCompetencyLevel('comp_sampling_method', 15);
      addToast('Optimal Statistical Protocol Executed', 'Non-response adjustment multiplier successfully calibrated! (+15% Competency)', 'success');
    } else {
      updateCompetencyLevel('comp_sampling_method', -5);
      addToast('Methodological Violation Detected', 'Unsound adjustment flagged. Review the statistical rationale.', 'warning');
    }
  };

  const handleReset = () => {
    setSelectedChoice(null);
    setHasCommitted(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-white via-teal-50/50 to-white p-7 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#0B1F3A] uppercase tracking-wider">
            <SlidersHorizontal className="w-4 h-4 text-teal-700" />
            <span>Interactive Laboratory • Statistics Work Simulator</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-1.5 tracking-tight">
            Workplace Scenario Simulator
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
            Experience realistic high-stakes field challenges. Every decision ripples through statistical weight adjustments,
            sample variance, and publication integrity.
          </p>
        </div>

        {/* Scenario Selector */}
        <div className="flex items-center gap-2.5 shrink-0">
          {simulations.map((sim, idx) => (
            <button
              key={sim.id}
              onClick={() => {
                setActiveScenarioIndex(idx);
                handleReset();
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                activeScenarioIndex === idx
                  ? 'bg-[#0B1F3A] text-white shadow-xs font-black'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              Scenario #{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Simulation Stage */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Scenario Card */}
        <div className="p-7 sm:p-9 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-black px-3 py-1 rounded-full bg-teal-50 text-[#0B1F3A] uppercase tracking-wider border border-teal-200">
              {scenario.division} • {scenario.difficulty} Challenge
            </span>
            <span className="text-xs font-bold text-slate-500">Related: {scenario.relatedCompetency}</span>
          </div>

          <h2 className="text-2xl font-black text-slate-900">{scenario.title}</h2>
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <strong className="text-slate-900 font-bold block mb-1">Field Context:</strong>
            {scenario.context}
          </div>

          <div className="pt-2">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
              <span>{scenario.prompt}</span>
            </h3>
          </div>

          {/* Branching Decision Options */}
          <div className="space-y-3 pt-2">
            {scenario.options.map(option => {
              const isSelected = selectedChoice?.id === option.id;

              return (
                <div
                  key={option.id}
                  onClick={() => handleSelectChoice(option)}
                  className={`p-4 sm:p-5 rounded-2xl border-2 transition cursor-pointer flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-teal-50/80 border-teal-500 ring-2 ring-[#0B1F3A]/10 shadow-xs'
                      : 'bg-white border-slate-200/80 hover:border-teal-400'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'border-[#0B1F3A] bg-[#0B1F3A] text-white' : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <span className="w-2 h-2 rounded-full bg-white"></span>}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">{option.text}</span>
                </div>
              );
            })}
          </div>

          {/* Commit Button */}
          {!hasCommitted ? (
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={handleCommitDecision}
                disabled={!selectedChoice}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#0B1F3A] to-[#123B63] hover:from-[#123B63] disabled:opacity-40 text-white text-xs sm:text-sm font-black transition flex items-center gap-2 shadow-sm active:scale-95"
              >
                <span>Commit Statistical Decision</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Try Another Strategy</span>
              </button>
            </div>
          )}
        </div>

        {/* DECISION → CONSEQUENCE → WHY Feedback Breakdown */}
        {hasCommitted && selectedChoice && (
          <div className="p-7 sm:p-9 rounded-3xl bg-white border-2 border-slate-900 shadow-xl space-y-6 animate-in slide-in-from-bottom-3 fade-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                {selectedChoice.isOptimal ? (
                  <CheckCircle2 className="w-6 h-6 text-teal-600 shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                )}
                <h3 className="text-base font-black text-slate-900">
                  {selectedChoice.isOptimal ? 'Optimal Methodological Protocol' : 'Methodologically Flawed Action'}
                </h3>
              </div>
              <span
                className={`text-xs font-black px-3 py-1 rounded-full ${
                  selectedChoice.isOptimal ? 'bg-teal-100 text-[#0B1F3A] border border-teal-200' : 'bg-rose-100 text-rose-800 border border-rose-200'
                }`}
              >
                {selectedChoice.decisionImpact}
              </span>
            </div>

            {/* 3 Step Story: Decision -> Consequence -> Why */}
            <div className="space-y-4">
              {/* 1. Decision */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                  1. YOUR DECISION
                </span>
                <p className="font-bold text-slate-800">{selectedChoice.text}</p>
              </div>

              {/* 2. Consequence */}
              <div
                className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                  selectedChoice.isOptimal ? 'bg-teal-50/70 border-teal-200 text-[#0B1F3A] font-medium' : 'bg-rose-50/70 border-rose-200 text-rose-950 font-medium'
                }`}
              >
                <span className="text-[10px] font-black uppercase tracking-widest block mb-1">
                  2. WORKPLACE CONSEQUENCE & IMPACT
                </span>
                <p>{selectedChoice.consequence}</p>
              </div>

              {/* 3. Statistical Rationale (Why) */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white text-xs leading-relaxed">
                <div className="flex items-center gap-1.5 text-teal-300 font-black text-[11px] mb-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>3. STATISTICAL RATIONALE (WHY THIS OCCURS)</span>
                </div>
                <p className="text-slate-200">{selectedChoice.statisticalRationale}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

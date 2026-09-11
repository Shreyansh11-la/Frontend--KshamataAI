import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const GuidedDemoModal: React.FC = () => {
  const { isDemoActive, demoStep, nextDemoStep, prevDemoStep, exitGuidedDemo } = useApp();

  if (!isDemoActive) return null;

  const steps = [
    {
      step: 1,
      title: 'Officer Dashboard & Competency Readiness',
      highlight: 'Understand What Matters Today',
      description:
        'Meet Ananya Sharma, Statistical Officer in NSSO. Instead of a generic course catalog, her morning begins with her overall workplace readiness score (74%), targeted competency highlights, and prioritized skill gaps.',
      takeaway: 'Personalized to cadre & role, not a generic LMS.'
    },
    {
      step: 2,
      title: 'AI Competency Gap Engine',
      highlight: 'Diagnosing the WHY behind the Gap',
      description:
        'See why Data Quality is flagged as HIGH priority (54% vs 85% required). The system explains: "Your role involves validating primary field survey datasets, but recent diagnostic assessments indicate gaps in missing-value handling and cross-variable consistency logic."',
      takeaway: 'Explainable diagnosis instead of opaque percentages.'
    },
    {
      step: 3,
      title: 'Explainable Learning Map',
      highlight: 'Connecting Need to Action',
      description:
        'Traces: You Need This (Sampling / Data Quality) → WHY (Survey Officer role requirements) → WHAT you will learn (imputation, bounds, non-response) → RECOMMENDED practical actions.',
      takeaway: 'Zero ungrounded recommendations.'
    },
    {
      step: 4,
      title: 'Personalized Learning Journey',
      highlight: 'Visual Milestone Path',
      description:
        'Interactive stage nodes from Institutional Foundations through Field Cadre Collection to Core Diagnostic Gap, Methodological Rigor, and Capstone Certification.',
      takeaway: 'Clear trajectory with live competency delta.'
    },
    {
      step: 5,
      title: 'Signature: Data Quality Clinic',
      highlight: 'Real Work Mistake → AI Identifies → Learner Fixes',
      description:
        'Inspect the loaded rural household survey sample. The AI flagged 14 issues including Row 48: Age = 187 (Impossible value!). Click "Rectify" or inspect row details to fix it and watch the data quality score rise from 72 to 100.',
      takeaway: 'Directly mirrors real-world statistical verification work.'
    },
    {
      step: 6,
      title: 'Statistics Work Simulator',
      highlight: 'Branching Decisions with Consequences',
      description:
        'Experience the District 14 crisis: 30% missing responses in rural cluster B. Pick an option: deleting records causes severe bias, while propensity re-weighting protects unbiased national estimates.',
      takeaway: 'Active decision simulation over multiple-choice guessing.'
    },
    {
      step: 7,
      title: 'Learning-to-Work Proof',
      highlight: 'Proving Capability, Not Mere Attendance',
      description:
        'KshamataAI requires learners to prove their skill on real data deliverables. Review the audit scorecard evaluating Knowledge, Application, and Workplace Readiness (78%).',
      takeaway: 'Transforms learning directly into verified capability.'
    },
    {
      step: 8,
      title: 'Department Skill-Risk Map',
      highlight: 'Executive Intelligence for Leadership',
      description:
        'Switches to Dr. Rajiv Menon (Joint Director General). View enterprise-wide competency vulnerabilities across Field Operations, National Accounts, and Methodology divisions with drill-down and intervention recommendations.',
      takeaway: 'Provides top-down institutional workforce visibility.'
    }
  ];

  const current = steps[demoStep];

  return (
    <div className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-3 sm:px-4 pointer-events-auto animate-in slide-in-from-bottom-4 fade-in duration-200">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-[#123B63]/20 p-4 sm:p-5 ring-4 ring-[#0B1F3A]/5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#0B1F3A] text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
              {current.step}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0B1F3A] truncate">
                  SIH Demo Journey • Step {demoStep + 1} of {steps.length}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping shrink-0"></span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 truncate">{current.title}</h3>
            </div>
          </div>

          <button
            onClick={exitGuidedDemo}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition shrink-0"
            title="Exit Demo Journey"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="py-2.5 sm:py-3">
          <div className="inline-block px-2.5 py-0.5 rounded-md bg-teal-50 border border-teal-200 text-[#0B1F3A] text-[11px] font-bold mb-2">
            Key Feature: {current.highlight}
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-normal">{current.description}</p>
          <div className="mt-2 text-[11px] text-slate-800 bg-teal-50/70 px-2.5 py-1 rounded-lg border border-teal-200 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>Core Takeaway: {current.takeaway}</span>
          </div>
        </div>

        {/* Progress Bar & Buttons */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100 gap-2">
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === demoStep ? 'w-4 sm:w-6 bg-[#0B1F3A]' : i < demoStep ? 'w-1.5 sm:w-2 bg-teal-400' : 'w-1.5 sm:w-2 bg-slate-200'
                }`}
              ></div>
            ))}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={prevDemoStep}
              disabled={demoStep === 0}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Back</span>
            </button>

            <button
              onClick={nextDemoStep}
              className="px-3 sm:px-4 py-1.5 rounded-xl bg-[#0B1F3A] hover:bg-[#123B63] text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5 active:scale-95"
            >
              <span>{demoStep === steps.length - 1 ? 'Finish Tour' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

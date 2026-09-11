import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockProofChallenges } from '../data/mockData';
import {
  Award,
  CheckCircle2,
  FileCheck,
  Check,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  Clock,
  BarChart3
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LearningProofView: React.FC = () => {
  const { addToast } = useApp();
  const challenge = mockProofChallenges[0];

  const [stepChecked, setStepChecked] = useState<boolean[]>([true, true, false, false]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    knowledgeScore: number;
    applicationScore: number;
    workplaceReadiness: number;
    feedback: string;
  } | null>(null);

  const toggleCheck = (idx: number) => {
    setStepChecked(prev => {
      const copy = [...prev];
      copy[idx] = !copy[idx];
      return copy;
    });
  };

  const handleSubmitProof = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setEvaluationResult({
        knowledgeScore: 94,
        applicationScore: 82,
        workplaceReadiness: 78,
        feedback:
          'Demonstrated exemplary outlier boundary identification and correctly executed hot-deck donor matching without artificially suppressing sample variance. Certified for district microdata release clearance.'
      });
      addToast('Capstone Proof Evaluated', 'Workplace Readiness certified at 78%! Official audit certificate logged.', 'success');
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // silent
      }
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-white via-teal-50/50 to-white p-7 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#0B1F3A] uppercase tracking-wider">
            <Award className="w-4 h-4 text-teal-700" />
            <span>Mission Karmayogi • Learning-to-Work Practical Proof</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-1.5 tracking-tight">
            Learning-to-Work Proof Sandbox
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
            Never just: "Course completed, here is a generic certificate." Prove your capability on real deliverables: audit
            corrupted records, calculate non-response multipliers, and certify survey readiness.
          </p>
        </div>

        <div className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-2xl border-2 border-teal-200 shadow-xs shrink-0">
          <ShieldCheck className="w-4 h-4 text-teal-700" />
          <span className="text-xs font-black text-slate-800">Mission Karmayogi Proof Standard</span>
        </div>
      </div>

      {/* Main Proof Workspace */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="p-7 sm:p-9 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-black px-3 py-1 rounded-full bg-teal-50 text-[#0B1F3A] uppercase tracking-wider border border-teal-200">
                Capstone Challenge: {challenge.competency}
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">{challenge.title}</h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
              <Clock className="w-4 h-4 text-teal-700" />
              <span>Est. Effort: {challenge.timeEstimate}</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <strong className="text-slate-900 font-bold block mb-1">Official Scenario Brief:</strong>
            {challenge.context}
          </div>

          {/* Interactive Steps Checklist */}
          <div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
              Deliverable Verification Checklist:
            </h3>
            <div className="space-y-2.5">
              {challenge.instructions.map((step, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  className={`p-4 rounded-2xl border-2 transition cursor-pointer flex items-center gap-3.5 ${
                    stepChecked[idx]
                      ? 'bg-teal-50/70 border-teal-300 font-bold text-[#0B1F3A]'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-teal-300'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 ${
                      stepChecked[idx] ? 'bg-[#0B1F3A] border-[#0B1F3A] text-white' : 'border-slate-300'
                    }`}
                  >
                    {stepChecked[idx] && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>
                  <span className="text-xs sm:text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Evaluation Metrics Schema */}
          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80">
            <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2.5">
              Automated Evaluation Weight Matrix:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {challenge.evaluatedMetrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
                  <div className="text-slate-500 text-xs font-medium">{m.name}</div>
                  <div className="font-black text-slate-900 mt-1">{m.weight}% Weight</div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          {!evaluationResult && (
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={handleSubmitProof}
                disabled={isSubmitting}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#0B1F3A] to-[#123B63] hover:from-[#123B63] disabled:opacity-50 text-white text-xs sm:text-sm font-black transition flex items-center gap-2 shadow-sm active:scale-95"
              >
                <FileCheck className="w-4 h-4" />
                <span>{isSubmitting ? 'Evaluating Deliverable & Imputation Log...' : 'Submit Deliverable for Workplace Audit'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Evaluated Scorecard Result (Knowledge + Application + Workplace Readiness) */}
        {evaluationResult && (
          <div className="p-7 sm:p-9 rounded-3xl bg-white border-2 border-teal-500 shadow-xl space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-7 h-7 text-teal-600 shrink-0" />
                <div>
                  <span className="text-[10px] font-black text-[#0B1F3A] uppercase tracking-wider">
                    Official Workplace Readiness Certified
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-0.5">
                    Capstone Verification Completed Successfully
                  </h3>
                </div>
              </div>
              <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-teal-100 text-[#0B1F3A] border border-teal-200">
                PASSED (≥ 80 Threshold)
              </span>
            </div>

            {/* 3 Metrics: Knowledge, Application, Workplace Readiness */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  1. Knowledge
                </span>
                <div className="mt-2 text-3xl font-black text-slate-900">{evaluationResult.knowledgeScore}%</div>
                <div className="mt-1 text-xs text-teal-700 font-bold">✓ Principle verified</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  2. Application
                </span>
                <div className="mt-2 text-3xl font-black text-slate-900">{evaluationResult.applicationScore}%</div>
                <div className="mt-1 text-xs text-teal-700 font-bold">✓ Hands-on verified</div>
              </div>

              <div className="p-5 rounded-2xl bg-teal-50 border-2 border-teal-300 text-center ring-4 ring-[#0B1F3A]/5">
                <span className="text-[10px] font-black text-[#0B1F3A] uppercase tracking-wider block">
                  3. Workplace Readiness
                </span>
                <div className="mt-2 text-3xl font-black text-[#0B1F3A]">
                  {evaluationResult.workplaceReadiness}%
                </div>
                <div className="mt-1 text-xs text-[#0B1F3A] font-black">Official Clearance Awarded</div>
              </div>
            </div>

            {/* Qualitative Feedback */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong className="text-slate-900 font-bold block mb-1">Cadre Auditor Notes:</strong>
              {evaluationResult.feedback}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

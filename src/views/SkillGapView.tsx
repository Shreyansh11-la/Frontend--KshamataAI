import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  AlertTriangle,
  ArrowRight,
  Stethoscope,
  BookOpen,
  Award,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  CheckCircle2,
  RefreshCw,
  Target
} from 'lucide-react';

export const SkillGapView: React.FC = () => {
  const { competencies, setSelectedCompetencyId, setCurrentView, currentUser, addToast } = useApp();
  const [isRecomputing, setIsRecomputing] = useState(false);

  const sortedGaps = [...competencies].sort((a, b) => b.gap - a.gap);

  const handleRecompute = () => {
    setIsRecomputing(true);
    setTimeout(() => {
      setIsRecomputing(false);
      addToast('Diagnostic Engine Refreshed', 'Synthesized 18 latest survey schedule logs and recent quiz results.', 'success');
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-white via-teal-50/50 to-white p-7 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#0B1F3A] uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-teal-700" />
            <span>AI Competency Gap Engine • Diagnostic Intelligence</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-1.5 tracking-tight">
            Ranked Skill Gaps & Root Causes
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
            Answers: <strong className="text-slate-900 font-bold">"What am I missing — and WHY?"</strong>.
            Grounded in your official cadre requirements as {currentUser.roleTitle} in {currentUser.division}.
          </p>
        </div>

        <button
          onClick={handleRecompute}
          disabled={isRecomputing}
          className="px-5 py-3 rounded-2xl bg-white hover:bg-teal-50 border-2 border-teal-200 text-slate-700 hover:text-[#0B1F3A] text-xs font-bold transition flex items-center gap-2 shadow-xs active:scale-95 disabled:opacity-50 shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${isRecomputing ? 'animate-spin text-teal-700' : ''}`} />
          <span>{isRecomputing ? 'Recomputing...' : 'Re-run Diagnostic Scan'}</span>
        </button>
      </div>

      {/* Gaps List with Full 4-Tier Blueprint: WHY → RECOMMENDED → PRACTICE → PROOF */}
      <div className="space-y-5">
        {sortedGaps.map((item, index) => {
          const isHigh = item.priority === 'HIGH';

          return (
            <div
              key={item.id}
              className={`p-7 rounded-3xl bg-white border-2 transition shadow-xs ${
                isHigh ? 'border-teal-200 ring-2 ring-[#0B1F3A]/5' : 'border-slate-200/80'
              }`}
            >
              {/* Gap Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <span
                    className={`w-9 h-9 rounded-2xl font-black text-xs flex items-center justify-center ${
                      index === 0
                        ? 'bg-[#0B1F3A] text-white shadow-xs'
                        : index === 1
                        ? 'bg-teal-100 text-[#0B1F3A]'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    #{index + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black text-slate-900">{item.name}</h3>
                      <span className="text-[10px] font-mono text-slate-400 font-bold">{item.code}</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{item.category} Competency</p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                      Target vs Current
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      Req: {item.requiredLevel}% | Cur: {item.currentLevel}%
                    </span>
                  </div>

                  <div className="text-right pl-4 border-l border-slate-200">
                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                        isHigh
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : item.priority === 'MEDIUM'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-teal-100 text-[#0B1F3A] border border-teal-200'
                      }`}
                    >
                      {item.priority} PRIORITY
                    </span>
                    <div className="text-sm font-black text-rose-700 mt-0.5">-{item.gap}% Gap</div>
                  </div>
                </div>
              </div>

              {/* WHY Explanation Block */}
              <div className="mt-5 p-4 rounded-2xl bg-teal-50/60 border border-slate-200">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#0B1F3A] mb-1">
                  <Sparkles className="w-4 h-4 text-teal-700" />
                  <span>DIAGNOSTIC EXPLANATION (WHY THIS GAP EXISTS)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">{item.gapReason}</p>
              </div>

              {/* 3-Tier Recommended Action Blueprint: RECOMMENDED → PRACTICE → PROOF */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* 1. Recommended Learning */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                      1. RECOMMENDED LEARNING
                    </span>
                    <h4 className="text-xs font-extrabold text-slate-900 mt-1">{item.recommendedCourseId || 'Foundation Module'}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Structured theoretical frameworks</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCompetencyId(item.id);
                      setCurrentView('courses');
                    }}
                    className="mt-4 text-xs font-black text-[#0B1F3A] hover:text-[#0B1F3A] flex items-center gap-1 text-left"
                  >
                    <span>Start Learning</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 2. Practice Clinic */}
                <div className="p-4 rounded-2xl bg-teal-50/40 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black text-[#0B1F3A] uppercase tracking-wider block">
                      2. HANDS-ON PRACTICE
                    </span>
                    <h4 className="text-xs font-extrabold text-slate-900 mt-1">{item.practiceModule || 'Interactive Clinic'}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Diagnose and resolve real errors</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCompetencyId(item.id);
                      setCurrentView('data-clinic');
                    }}
                    className="mt-4 text-xs font-black text-[#0B1F3A] hover:text-[#0B1F3A] flex items-center gap-1 text-left"
                  >
                    <span>Launch Clinic</span>
                    <Stethoscope className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 3. Workplace Proof */}
                <div className="p-4 rounded-2xl bg-teal-50/40 border border-teal-100 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black text-teal-800 uppercase tracking-wider block">
                      3. CAPSTONE PROOF
                    </span>
                    <h4 className="text-xs font-extrabold text-slate-900 mt-1">{item.proofRequired || 'Deliverable Audit'}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Certifies workplace readiness</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCompetencyId(item.id);
                      setCurrentView('proof');
                    }}
                    className="mt-4 text-xs font-black text-teal-800 hover:text-teal-950 flex items-center gap-1 text-left"
                  >
                    <span>Prove Capability</span>
                    <Award className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

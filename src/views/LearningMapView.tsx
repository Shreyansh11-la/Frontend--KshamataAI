import React from 'react';
import { useApp } from '../context/AppContext';
import { mockExplainableLearningMap } from '../data/mockData';
import {
  GitFork,
  ArrowDown,
  Sparkles,
  BookOpen,
  Stethoscope,
  SlidersHorizontal,
  Award,
  CheckCircle2,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export const LearningMapView: React.FC = () => {
  const { selectedCompetencyId, setSelectedCompetencyId, competencies, setCurrentView } = useApp();

  // Find active node in mockExplainableLearningMap or fallback to data quality
  const mapData =
    mockExplainableLearningMap[selectedCompetencyId] || mockExplainableLearningMap['comp_data_quality'];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-white via-teal-50/50 to-white p-7 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#0B1F3A] uppercase tracking-wider">
            <GitFork className="w-4 h-4 text-teal-700" />
            <span>Official Statistical Framework • Explainable Learning Map Architecture</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-1.5 tracking-tight">
            Explainable Learning Map
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
            Never just "take this course". We map exactly why your role requires this competency, what core capabilities
            you will acquire, and how it impacts actual government survey outputs.
          </p>
        </div>

        {/* Competency Selector */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Focus:</span>
          <select
            value={selectedCompetencyId}
            onChange={e => setSelectedCompetencyId(e.target.value)}
            className="text-xs font-bold px-4 py-2.5 rounded-xl bg-white border-2 border-teal-200 focus:outline-none focus:border-teal-500 shadow-xs"
          >
            {competencies.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.priority} Gap)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Visual Map Flow: YOU NEED THIS → WHY? → WHAT YOU WILL LEARN → RECOMMENDED ACTION */}
      <div className="max-w-4xl mx-auto space-y-5">
        {/* Node 1: YOU NEED THIS */}
        <div className="p-7 rounded-3xl bg-white border-2 border-teal-500 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#0B1F3A] bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              STEP 1: YOU NEED THIS
            </span>
            <span className="text-xs font-bold text-slate-500">{mapData.roleContext}</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mt-2">{mapData.competencyName}</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Core functional competency required for official data validation and release clearance.
          </p>
        </div>

        {/* Connecting Arrow */}
        <div className="flex justify-center text-teal-700">
          <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center shadow-xs">
            <ArrowDown className="w-5 h-5 text-teal-700" />
          </div>
        </div>

        {/* Node 2: WHY? (Role Rationale) */}
        <div className="p-7 rounded-3xl bg-teal-50/70 border-2 border-teal-200 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-teal-700" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#0B1F3A]">
              STEP 2: WHY DO YOU NEED IT?
            </span>
          </div>
          <h3 className="text-lg font-black text-slate-900">Institutional Cadre Mandate</h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">{mapData.whyNeeded}</p>
        </div>

        {/* Connecting Arrow */}
        <div className="flex justify-center text-teal-700">
          <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center shadow-xs">
            <ArrowDown className="w-5 h-5 text-teal-700" />
          </div>
        </div>

        {/* Node 3: WHAT YOU WILL LEARN */}
        <div className="p-7 rounded-3xl bg-white border-2 border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              STEP 3: WHAT YOU WILL LEARN
            </span>
            <span className="text-xs text-slate-500 font-bold">Methodological Skills</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            {mapData.whatYouWillLearn.map((skill, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span className="text-xs font-bold text-slate-800 leading-snug">{skill}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 text-xs text-slate-600">
            <strong className="text-slate-900">Workplace Application: </strong>
            {mapData.workplaceApplication}
          </div>
        </div>

        {/* Connecting Arrow */}
        <div className="flex justify-center text-teal-700">
          <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center shadow-xs">
            <ArrowDown className="w-5 h-5 text-teal-700" />
          </div>
        </div>

        {/* Node 4: RECOMMENDED PRACTICAL ACTIONS */}
        <div className="p-7 rounded-3xl bg-white border-2 border-teal-200 shadow-sm">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#0B1F3A] bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            STEP 4: RECOMMENDED NEXT ACTIONS
          </span>
          <h3 className="text-lg font-black text-slate-900 mt-2">Closed-Loop Learning Pipeline</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            {mapData.recommendedActions.map((action, idx) => {
              const Icon =
                action.type === 'Course'
                  ? BookOpen
                  : action.type === 'Clinic'
                  ? Stethoscope
                  : action.type === 'Simulation'
                  ? SlidersHorizontal
                  : Award;

              const targetView =
                action.type === 'Course'
                  ? 'courses'
                  : action.type === 'Clinic'
                  ? 'data-clinic'
                  : action.type === 'Simulation'
                  ? 'simulations'
                  : 'proof';

              return (
                <div
                  key={idx}
                  onClick={() => setCurrentView(targetView)}
                  className="p-5 rounded-2xl bg-[#F8FAFC] hover:bg-teal-50/70 border border-slate-200/80 hover:border-teal-400 transition cursor-pointer group flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-9 h-9 rounded-xl bg-white text-[#0B1F3A] border border-teal-200 flex items-center justify-center group-hover:bg-[#0B1F3A] group-hover:text-white transition">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-500">{action.duration}</span>
                  </div>
                  <div className="mt-4">
                    <span className="text-[10px] font-black text-[#0B1F3A] uppercase tracking-wider">{action.type}</span>
                    <h4 className="text-xs font-black text-slate-900 group-hover:text-[#0B1F3A] mt-0.5">
                      {action.title}
                    </h4>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-black text-[#0B1F3A]">
                    <span>Launch</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

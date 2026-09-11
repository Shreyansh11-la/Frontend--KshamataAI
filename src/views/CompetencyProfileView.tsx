import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CompetencyCategory } from '../types';
import {
  Target,
  ArrowRight,
  TrendingUp,
  Layers,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BarChart3
} from 'lucide-react';

export const CompetencyProfileView: React.FC = () => {
  const { competencies, setSelectedCompetencyId, setCurrentView, currentUser } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<CompetencyCategory | 'All'>('All');

  const categories: (CompetencyCategory | 'All')[] = ['All', 'Domain', 'Functional', 'Technical', 'Behavioural'];

  const filteredCompetencies = competencies.filter(c => {
    if (selectedCategory === 'All') return true;
    return c.category === selectedCategory;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-white via-teal-50/40 to-white p-7 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#0B1F3A] uppercase tracking-wider">
            <Target className="w-4 h-4 text-teal-700" />
            <span>Official Competency Architecture • NSSCF Standard</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-1.5 tracking-tight">
            Competency Profile & Matrix
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
            Mapped to your cadre role: <strong className="text-slate-900">{currentUser.roleTitle}</strong> ({currentUser.division}).
            Click any competency card to open its deep Explainable Learning Map.
          </p>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-2xl border-2 border-teal-200 shadow-xs shrink-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCategory === cat
                  ? 'bg-[#0B1F3A] text-white shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Competencies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCompetencies.map(comp => {
          const isHigh = comp.priority === 'HIGH';
          const isMedium = comp.priority === 'MEDIUM';

          return (
            <div
              key={comp.id}
              onClick={() => {
                setSelectedCompetencyId(comp.id);
                setCurrentView('learning-map');
              }}
              className="p-7 rounded-3xl bg-white border-2 border-slate-200/80 hover:border-teal-400 hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Card Top */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-slate-400">{comp.code}</span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {comp.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-[#0B1F3A] transition mt-2">
                      {comp.name}
                    </h3>
                  </div>

                  <span
                    className={`text-[10px] font-black px-3 py-1 rounded-full shrink-0 ${
                      isHigh
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : isMedium
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-teal-100 text-[#0B1F3A] border border-teal-200'
                    }`}
                  >
                    {comp.priority} PRIORITY
                  </span>
                </div>

                <p className="mt-3 text-xs text-slate-600 leading-relaxed font-normal">{comp.description}</p>

                {/* Progress Bar & Benchmark */}
                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Current Capability</span>
                    <div className="space-x-2">
                      <span className="font-black text-slate-900">{comp.currentLevel}%</span>
                      <span className="text-slate-400 font-medium">/ Required {comp.requiredLevel}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden relative">
                    {/* Required level marker line */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-slate-400 z-10"
                      style={{ left: `${comp.requiredLevel}%` }}
                      title={`Target: ${comp.requiredLevel}%`}
                    ></div>
                    {/* Current level bar */}
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isHigh ? 'bg-gradient-to-r from-[#0B1F3A] to-teal-600' : 'bg-teal-500'
                      }`}
                      style={{ width: `${comp.currentLevel}%` }}
                    ></div>
                  </div>
                </div>

                {/* Gap Reason Snippet */}
                <div className="mt-4 p-4 rounded-2xl bg-teal-50/50 border border-teal-200 text-xs text-slate-700 leading-relaxed">
                  <strong className="text-[#0B1F3A] font-bold">Why the gap exists: </strong>
                  {comp.gapReason}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-[#0B1F3A] group-hover:text-[#0B1F3A]">
                <span>View Explainable Learning Map</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

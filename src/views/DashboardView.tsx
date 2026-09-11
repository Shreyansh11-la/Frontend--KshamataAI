import React from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Award,
  Stethoscope,
  SlidersHorizontal,
  Clock,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  BookOpen,
  Compass,
  FileCheck,
  ShieldCheck,
  FileText,
  Building2,
  GraduationCap,
  Download,
  ExternalLink,
  Users
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { currentUser, competencies, setCurrentView, setSelectedCompetencyId, setShowAIAssistant } = useApp();

  // Find top priority gaps
  const sortedGaps = [...competencies].sort((a, b) => b.gap - a.gap);
  const topGaps = sortedGaps.slice(0, 3);
  const highestGap = sortedGaps[0];

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      {/* 1. Grand Officer Welcome & Mission Directive Hero */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 border border-slate-200/90 shadow-sm relative overflow-hidden">
        {/* Soft background tint */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-50/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-8">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-black text-[#0B1F3A] uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse shrink-0"></span>
              <span>{currentUser.division}</span>
              <span className="text-slate-300">•</span>
              <span>{currentUser.cadre} ({currentUser.level})</span>
              <span className="text-slate-300">•</span>
              <span className="bg-teal-50 text-[#0B1F3A] border border-teal-200/80 px-3 py-1 rounded-full font-bold">
                SSO Grid Verified
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Good day, {currentUser.name}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
              Your certified workplace readiness benchmark stands at{' '}
              <strong className="text-[#0B1F3A] font-extrabold">{currentUser.overallReadiness}%</strong>. 
              Closing your <strong className="text-slate-900 font-bold">{highestGap.name}</strong> deficit will grant final field clearance for the upcoming <strong>NSSO 80th Round District Scrutiny</strong>.
            </p>

            {/* Survey Season Milestone Countdown Banner */}
            <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-slate-700">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 shadow-2xs">
                <Calendar className="w-4 h-4 text-[#0B1F3A]" />
                <span>NSSO 80th Round Kickoff: <strong>18 Days Remaining</strong></span>
              </div>
              <span className="text-slate-500 font-medium">District 74 Field Scrutiny Window</span>
            </div>
          </div>

          {/* Hero Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setSelectedCompetencyId(highestGap.id);
                setCurrentView('learning-map');
              }}
              className="px-6 py-3.5 rounded-2xl bg-[#0B1F3A] hover:bg-[#123B63] text-white text-xs sm:text-sm font-extrabold shadow-md shadow-[#0B1F3A]/15 hover:shadow-lg transition flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Diagnose Priority Gap</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentView('data-clinic')}
              className="px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 hover:text-[#0B1F3A] text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 active:scale-95 shadow-2xs"
            >
              <Stethoscope className="w-4 h-4 text-teal-600" />
              <span>Launch Data Clinic</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Performance Metrics - Spacious & Uncrowded */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1: Overall Workplace Readiness */}
        <div className="p-5 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between hover:border-teal-200 transition">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overall Readiness</span>
              <span className="text-xs font-black text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">
                +{currentUser.readinessDelta}% this cycle
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-900 tracking-tight">{currentUser.overallReadiness}%</span>
              <span className="text-xs text-slate-400 font-bold">/ 100 benchmark</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-teal-600 h-full rounded-full transition-all duration-700"
                style={{ width: `${currentUser.overallReadiness}%` }}
              ></div>
            </div>
            <div className="mt-2 text-xs text-slate-500 flex items-center justify-between font-medium">
              <span>Cadre Average: 68%</span>
              <span className="font-extrabold text-[#0B1F3A]">+6% Ahead</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Highest Operational Gap */}
        <div className="p-5 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between hover:border-amber-200 transition">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Primary Gap</span>
              <span className="text-[10px] font-black text-[#F59E0B] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                CRITICAL
              </span>
            </div>
            <div className="mt-3">
              <h4 className="text-sm font-extrabold text-slate-900 leading-snug">{highestGap.name}</h4>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#F59E0B]">-{highestGap.gap}%</span>
                <span className="text-xs text-slate-500 font-medium">
                  (Target: {highestGap.requiredLevel}%)
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedCompetencyId(highestGap.id);
              setCurrentView('skill-gaps');
            }}
            className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-[#0B1F3A] hover:text-teal-700 flex items-center gap-1.5 transition"
          >
            <span>View Root Cause Analysis</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Metric 3: Practical Proofs Completed */}
        <div className="p-5 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between hover:border-teal-200 transition">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Workplace Capstones</span>
              <Award className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-900 tracking-tight">{currentUser.completedProofs}</span>
              <span className="text-xs text-slate-400 font-bold">of 7 completed</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-[#0B1F3A] font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
            <span className="truncate">Rural Microdata Capstone Verified</span>
          </div>
        </div>

        {/* Metric 4: Dedicated Practice Hours */}
        <div className="p-5 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between hover:border-teal-200 transition">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Practice Hours</span>
              <Clock className="w-5 h-5 text-[#0B1F3A]" />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-900 tracking-tight">{currentUser.learningHoursThisMonth}</span>
              <span className="text-xs text-slate-400 font-bold">hrs this month</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between font-semibold">
            <span>Mission Karmayogi Target</span>
            <span className="text-[#0B1F3A] font-extrabold">20 hrs / month</span>
          </div>
        </div>
      </div>

      {/* 3. Section: Focus Action Today (Clean Banner) */}
      <div className="p-5 sm:p-8 rounded-3xl bg-[#0B1F3A] text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-teal-300 bg-white/10 px-3 py-1 rounded-full border border-white/15">
                Priority Diagnostic • 25 Min Laboratory
              </span>
              <span className="text-xs text-teal-400">•</span>
              <span className="text-xs text-slate-300">HCES Schedule 1.0</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Rectify Corrupted Microdata Outliers & Test Hot-Deck Imputation
            </h3>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              Your Data Quality competency (54%) is your highest shortfall. Practice on authentic household microdata schedules in the Data Quality Clinic to detect impossible biological values (such as <strong>Age 187</strong>) and calibrate donor imputation algorithms.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => setCurrentView('data-clinic')}
              className="px-7 py-3.5 rounded-2xl bg-white text-[#0B1F3A] hover:bg-slate-100 text-xs sm:text-sm font-black transition shadow-lg flex items-center gap-2 active:scale-95"
            >
              <Stethoscope className="w-4 h-4 text-teal-600" />
              <span>Enter Quality Clinic</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Main Diagnostic Workspace (Less Crowded, Spacious 2-Col Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Cols: Top Priority Gaps & Weekly Cadre Sprint */}
        <div className="lg:col-span-8 space-y-8">
          {/* Priority Skill Gaps */}
          <div className="p-5 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-slate-100 gap-2">
              <div>
                <h3 className="text-lg font-black text-slate-900">Priority Competency Deficits</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Calculated against NSSCF statutory benchmarks for your cadre grade.
                </p>
              </div>
              <button
                onClick={() => setCurrentView('skill-gaps')}
                className="text-xs font-black text-[#0B1F3A] hover:text-teal-700 flex items-center gap-1"
              >
                <span>View All 12 Competencies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {topGaps.map(gap => (
                <div
                  key={gap.id}
                  onClick={() => {
                    setSelectedCompetencyId(gap.id);
                    setCurrentView('learning-map');
                  }}
                  className="p-5 rounded-2xl bg-slate-50/70 hover:bg-teal-50/30 border border-slate-200/70 hover:border-teal-200 transition cursor-pointer group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white text-[#0B1F3A] border border-slate-200 flex items-center justify-center font-black text-xs group-hover:bg-[#0B1F3A] group-hover:text-white transition">
                        {gap.category[0]}
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-900 group-hover:text-[#0B1F3A] transition">
                          {gap.name}
                        </h4>
                        <p className="text-[11px] text-slate-400">{gap.category} Competency</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:text-right">
                      <span
                        className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                          gap.priority === 'HIGH'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {gap.priority} PRIORITY
                      </span>
                      <span className="text-sm font-black text-[#F59E0B]">
                        -{gap.gap}% Deficit
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-slate-600 leading-relaxed font-normal">
                    {gap.gapReason}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between text-xs gap-2">
                    <span className="text-slate-500 font-medium">
                      Current: <strong className="text-slate-900">{gap.currentLevel}%</strong> / Target:{' '}
                      <strong className="text-slate-900">{gap.requiredLevel}%</strong>
                    </span>
                    <span className="font-bold text-[#0B1F3A] group-hover:text-teal-700 group-hover:underline flex items-center gap-1">
                      Inspect Learning Map <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Micro-Learning Weekly Cadre Sprint */}
          <div className="p-5 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#0B1F3A]">
                  Micro-Learning Cadre Sprint
                </span>
                <h3 className="text-base font-black text-slate-900 mt-0.5">
                  Week 36: Data Cleaning & Sampling Protocol
                </h3>
              </div>
              <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                4 / 5 Days Completed
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {[
                { day: 'Mon', topic: 'Sampling Weights', done: true },
                { day: 'Tue', topic: 'Hot-Deck Imputation', done: true },
                { day: 'Wed', topic: 'Non-Response Logic', done: true },
                { day: 'Thu', topic: 'DPDP PII Anonymizer', done: true },
                { day: 'Fri (Today)', topic: 'Microdata Scrutiny', done: false, active: true }
              ].map((drill, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border text-center transition ${
                    drill.active
                      ? 'bg-[#0B1F3A] text-white border-[#123B63] shadow-xs font-bold'
                      : drill.done
                      ? 'bg-teal-50/70 border-teal-200 text-slate-900 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  <div className="text-[10px] uppercase tracking-wider font-extrabold opacity-80">{drill.day}</div>
                  <div className="text-xs font-extrabold mt-1 leading-snug">{drill.topic}</div>
                  <div className="mt-2">
                    {drill.done ? (
                      <CheckCircle2 className="w-4 h-4 text-teal-600 mx-auto" />
                    ) : drill.active ? (
                      <span className="text-[9px] bg-white text-[#0B1F3A] px-2 py-0.5 rounded-full font-black">
                        Active Today
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400">Scheduled</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Domain Breakdown & Rapid Labs */}
        <div className="lg:col-span-4 space-y-8">
          {/* Cadre Competency Domain Radar */}
          <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Cadre Domain Distribution</h3>
              <span className="text-[11px] font-bold text-slate-400">NSSCF v3.2</span>
            </div>

            <div className="space-y-4">
              {[
                { name: 'Survey Design & Sampling', score: 76, color: 'bg-[#0B1F3A]' },
                { name: 'Data Quality & Imputation', score: 54, color: 'bg-[#F59E0B]', isCritical: true },
                { name: 'CAPI Validation & Scrutiny', score: 92, color: 'bg-teal-600' },
                { name: 'DPDP Data Sovereignty', score: 88, color: 'bg-[#123B63]' },
                { name: 'Non-Response Multipliers', score: 64, color: 'bg-amber-500' }
              ].map((domain, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">{domain.name}</span>
                    <span className={`font-black ${domain.isCritical ? 'text-[#F59E0B]' : 'text-[#0B1F3A]'}`}>
                      {domain.score}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className={`${domain.color} h-full rounded-full`} style={{ width: `${domain.score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Practice Laboratories */}
          <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
              Cadre Practice Laboratories
            </h3>

            <button
              onClick={() => setCurrentView('data-clinic')}
              className="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-teal-50/50 border border-slate-200 text-left transition flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 group-hover:bg-[#0B1F3A] group-hover:text-white transition">
                <Stethoscope className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-black text-slate-900 group-hover:text-[#0B1F3A]">Data Quality Clinic</h4>
                <p className="text-[11px] text-slate-400 truncate">Detect impossible bounds & missing data</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
            </button>

            <button
              onClick={() => setCurrentView('simulations')}
              className="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-amber-50/50 border border-slate-200 text-left transition flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 group-hover:bg-[#F59E0B] group-hover:text-white transition">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-black text-slate-900 group-hover:text-[#0B1F3A]">Survey Simulator</h4>
                <p className="text-[11px] text-slate-400 truncate">Resolve village non-response resistance</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
            </button>

            <button
              onClick={() => setCurrentView('safe-guard')}
              className="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-teal-50/50 border border-slate-200 text-left transition flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center shrink-0 group-hover:bg-teal-700 group-hover:text-white transition">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-black text-slate-900 group-hover:text-[#0B1F3A]">DPDP Privacy Guard</h4>
                <p className="text-[11px] text-slate-400 truncate">Audit k-anonymity & microdata masking</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. NEW SECTION: Official Gazette & Circulars Digest */}
      <div className="p-5 sm:p-8 lg:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#0B1F3A] bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                Official MoSPI Gazettes
              </span>
              <span className="text-xs text-slate-400 font-semibold">• Active Directives</span>
            </div>
            <h3 className="text-lg font-black text-slate-900">Latest Circulars & Technical Directives</h3>
          </div>
          <button
            onClick={() => setCurrentView('circulars')}
            className="text-xs font-black text-[#0B1F3A] hover:text-teal-700 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Open Full Gazettes Archive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-teal-300 transition space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-mono font-bold text-[#0B1F3A] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                GZ-04/2026
              </span>
              <span className="text-slate-400 font-semibold">14 Jan 2026</span>
            </div>
            <h4 className="text-xs font-black text-slate-900 leading-snug">
              Notification of National Statistical System Competency Framework v3.2
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-2">
              Mandatory digital passport integration and diagnostic appraisal standards for all ISS and SSS cadres.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-teal-300 transition space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-mono font-bold text-[#0B1F3A] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                DQAD/CAPI-14
              </span>
              <span className="text-slate-400 font-semibold">03 Dec 2025</span>
            </div>
            <h4 className="text-xs font-black text-slate-900 leading-snug">
              Technical Protocol for CAPI Microdata Scrutiny and Outlier Detection
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-2">
              Hard biological bounds, skip-pattern integrity, and constrained nearest-neighbor hot-deck imputation.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-teal-300 transition space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-mono font-bold text-[#0B1F3A] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                DPDP/MOSPI/25
              </span>
              <span className="text-slate-400 font-semibold">18 Oct 2025</span>
            </div>
            <h4 className="text-xs font-black text-slate-900 leading-snug">
              Mandatory Microdata Anonymization Protocols under DPDP Act 2023
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-2">
              Guidelines on k-anonymity (k &ge; 5), permanent redaction of direct identifiers, and spatial blurring.
            </p>
          </div>
        </div>
      </div>

      {/* 6. NEW SECTION: National Training Academies Nomination Digest */}
      <div className="p-5 sm:p-8 lg:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#0B1F3A] bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                Institutional Network
              </span>
              <span className="text-xs text-slate-400 font-semibold">• NSSTA & ISI Network</span>
            </div>
            <h3 className="text-lg font-black text-slate-900">Upcoming Residential Officer Academies</h3>
          </div>
          <button
            onClick={() => setCurrentView('academies')}
            className="text-xs font-black text-[#0B1F3A] hover:text-teal-700 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All RTCs & Nominations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-teal-300 transition flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#0B1F3A] bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-md">
                  NSSTA Greater Noida
                </span>
                <span className="text-xs font-bold text-amber-700">8 seats left</span>
              </div>
              <h4 className="text-sm font-black text-slate-900 mt-2">
                Advanced Microdata Scrutiny & CAPI Validation in NSS 80th Round
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Target Cadre: Senior Statistical Officers (SSO). Residential 2-week intensive at Knowledge Park-II.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs">
              <span className="text-slate-500 font-medium">14 - 25 April 2026</span>
              <button
                onClick={() => setCurrentView('academies')}
                className="font-bold text-[#0B1F3A] hover:text-teal-700"
              >
                Apply Nomination &rarr;
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-teal-300 transition flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#0B1F3A] bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-md">
                  Indian Statistical Institute (ISI Kolkata)
                </span>
                <span className="text-xs font-bold text-amber-700">11 seats left</span>
              </div>
              <h4 className="text-sm font-black text-slate-900 mt-2">
                Stochastic Modeling & Complex Survey Weight Calibration
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Target Cadre: ISS / Senior SSS Cadres. Methodological campus residency at Barrackpore Trunk Road.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs">
              <span className="text-slate-500 font-medium">01 - 12 June 2026</span>
              <button
                onClick={() => setCurrentView('academies')}
                className="font-bold text-[#0B1F3A] hover:text-teal-700"
              >
                Apply Nomination &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

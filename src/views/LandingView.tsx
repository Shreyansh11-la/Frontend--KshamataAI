import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Target,
  Stethoscope,
  SlidersHorizontal,
  Route,
  CheckCircle2,
  TrendingUp,
  BarChart2,
  Award,
  BookOpen,
  Cpu,
  Layers,
  ChevronRight,
  Database,
  Building2,
  Users,
  WifiOff,
  Scale,
  HelpCircle,
  Clock,
  FileCheck,
  AlertTriangle,
  RefreshCw,
  Zap,
  Globe,
  Compass,
  FileSpreadsheet,
  ChevronDown
} from 'lucide-react';

export const LandingView: React.FC = () => {
  const { setCurrentView, startGuidedDemo, addToast } = useApp();

  // Interactive Persona Explorer State
  const [selectedPersona, setSelectedPersona] = useState<'enumerator' | 'sso' | 'director'>('sso');

  // Interactive Live Mini Data Clinic on Landing Page
  const [miniClinicFixed, setMiniClinicFixed] = useState(false);
  const [miniClinicScanned, setMiniClinicScanned] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleScanMiniClinic = () => {
    setMiniClinicScanned(true);
    addToast('Diagnostic Scan Completed', 'AI Flagged 2 Impossible Values in Household #104 microdata.', 'info');
  };

  const handleFixMiniClinic = () => {
    setMiniClinicFixed(true);
    addToast('Hot-Deck Imputation Applied', 'Age rectified to 47 (Census median), Consumption normalized. Quality score: 98/100.', 'success');
  };

  const resetMiniClinic = () => {
    setMiniClinicScanned(false);
    setMiniClinicFixed(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-teal-100 selection:text-[#0B1F3A]">
      {/* 1. National Statistical Cadre Operations Live Ticker */}
      <div className="bg-[#0B1F3A]/90 border-b border-[#123B63] text-teal-100 text-xs py-2 px-3 sm:px-4 overflow-hidden">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 font-semibold min-w-0">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-300"></span>
            </span>
            <span className="tracking-wide uppercase text-[10px] bg-[#123B63] px-2 py-0.5 rounded text-teal-200 shrink-0">
              National Cadre Live
            </span>
            <span className="hidden sm:inline truncate">Active Survey Cycles: HCES 2026, PLFS Q3, ASI 2024-25 Scrutiny</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-6 text-[11px] text-teal-200 shrink-0">
            <span>766 Districts Operational</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">14,850+ Statistical Officers</span>
            <span className="hidden md:inline">•</span>
            <span className="text-teal-300 font-bold">100% CAPI Tablet Validation Ready</span>
          </div>
        </div>
      </div>

      {/* 2. Grand Hero Section - Spacious, Bold & Authoritative */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 md:pt-24 md:pb-36 bg-gradient-to-b from-white via-[#F1F5F9] to-[#F8FAFC] border-b border-slate-200">
        {/* Subtle geometric navy grid pattern */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none [background-image:radial-gradient(#0B1F3A_1.2px,transparent_1.2px)] [background-size:28px_28px]"></div>

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* National Cadre Badge */}
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl sm:rounded-full bg-teal-50 border border-teal-200/80 shadow-xs mb-8 text-[#0B1F3A] text-xs font-black tracking-wide max-w-full">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse shrink-0"></span>
              <span>Next-Generation Statistical Competency Operating System</span>
              <span className="hidden sm:inline text-teal-300">•</span>
              <span className="text-teal-700">MoSPI, NSSO & State DES Cadres</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.08]">
              From Skill Gaps to <br />
              <span className="bg-gradient-to-r from-[#0B1F3A] via-[#123B63] to-teal-600 bg-clip-text text-transparent">
                Real-World Statistical Capability.
              </span>
            </h1>

            {/* Tagline & Core Philosophy */}
            <p className="mt-7 text-lg sm:text-xl text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto">
              India’s official statistical foundation is built on accurate field data. KshamataAI is purpose-built to diagnose exactly{' '}
              <strong className="text-slate-900 font-bold">WHY</strong> officers have skill deficits, practice fixing authentic survey errors in the{' '}
              <strong className="text-[#0B1F3A] font-bold">Data Quality Clinic</strong>, and evaluate true workplace readiness before national statistical releases.
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setCurrentView('dashboard')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r bg-[#0B1F3A] hover:bg-[#123B63] text-white text-base font-extrabold shadow-lg shadow-[#0B1F3A]/20 hover:shadow-xl transition flex items-center justify-center gap-2.5 active:scale-95"
              >
                <span>Enter Officer Workspace</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={startGuidedDemo}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-teal-50/50 text-slate-900 hover:text-[#0B1F3A] text-base font-bold border-2 border-teal-200 hover:border-teal-400 shadow-sm transition flex items-center justify-center gap-2.5 active:scale-95"
              >
                <Compass className="w-5 h-5 text-teal-700 animate-spin-slow" />
                <span>Explore Guided 8-Step Journey</span>
              </button>
            </div>

            {/* Massive Key Metrics Highlight Bar */}
            <div className="mt-14 pt-10 border-t border-teal-200/60 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="p-4 rounded-2xl bg-white/70 border border-slate-200 shadow-xs">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">100%</div>
                <div className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">Explainable AI Recommendations</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/70 border border-slate-200 shadow-xs">
                <div className="text-3xl sm:text-4xl font-black text-teal-700 tracking-tight">12 Labs</div>
                <div className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">Authentic Statistical Tools</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/70 border border-slate-200 shadow-xs">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">DPDP 2023</div>
                <div className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">Sovereign Privacy Masking</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/70 border border-slate-200 shadow-xs">
                <div className="text-3xl sm:text-4xl font-black text-teal-700 tracking-tight">FRAC Ready</div>
                <div className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">Mission Karmayogi Architecture</div>
              </div>
            </div>
          </div>

          {/* Expanded 5-Stage Closed-Loop Capability Engine */}
          <div className="mt-20 max-w-6xl mx-auto bg-white rounded-3xl border-2 border-slate-200 p-8 sm:p-10 shadow-xl shadow-slate-900/5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-slate-100 gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#0B1F3A]">
                  The Closed-Loop Capability Engine
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">How KshamataAI Guarantees Workplace Readiness</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Connecting role profiles to verified data quality outputs with zero opaque recommendations.
                </p>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-teal-50 text-[#0B1F3A] border border-teal-200 text-xs font-extrabold shrink-0 self-start sm:self-auto">
                Government Statistical Framework (NSSCF)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  step: '01',
                  label: 'OFFICER ROLE',
                  detail: 'Statistical Officer (NSSO FOD)',
                  desc: 'Mapped to FRAC competency standards & district survey schedules.',
                  icon: Building2,
                  bg: 'bg-slate-50',
                  color: 'text-slate-800'
                },
                {
                  step: '02',
                  label: 'COMPETENCY TARGET',
                  detail: 'Data Quality & Validation (85% Target)',
                  desc: 'Evaluates required proficiency for CAPI household scrutinies.',
                  icon: Target,
                  bg: 'bg-teal-50/70',
                  color: 'text-[#0B1F3A]'
                },
                {
                  step: '03',
                  label: 'AI GAP ENGINE',
                  detail: '31% Gap with Diagnostic Root Cause',
                  desc: 'Identifies why: recurrent outliers & imputation errors in field returns.',
                  icon: Layers,
                  bg: 'bg-amber-50/70',
                  color: 'text-amber-800'
                },
                {
                  step: '04',
                  label: 'DATA QUALITY CLINIC',
                  detail: 'Hands-on correction of Age 187',
                  desc: 'Officers practice fixing impossible values on authentic microdata.',
                  icon: Stethoscope,
                  bg: 'bg-teal-100/70',
                  color: 'text-[#0B1F3A]'
                },
                {
                  step: '05',
                  label: 'WORKPLACE PROOF',
                  detail: 'Verified Capstone Deliverable Audit',
                  desc: '94% Knowledge, 82% Application, certified survey readiness.',
                  icon: Award,
                  bg: 'bg-teal-50',
                  color: 'text-teal-900'
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className={`relative p-5 rounded-2xl border border-slate-200/80 ${item.bg} flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-black text-slate-400 tracking-wider">{item.step}</span>
                        <Icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <h4 className="text-xs font-black tracking-tight text-slate-900">{item.label}</h4>
                      <div className="text-xs font-bold text-[#0B1F3A] mt-1">{item.detail}</div>
                      <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
                    </div>

                    {idx < 4 && (
                      <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-teal-200 items-center justify-center text-teal-700 shadow-xs">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. National Statistical Ecosystem Coverage Bar */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-8">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-700">
              National Statistical System Architecture
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1">Ecosystem-Wide Competency Coverage</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'NSSO (FOD)', desc: 'Field Operations Division' },
              { name: 'NSSO (SDRD)', desc: 'Survey Design & Research' },
              { name: 'NSSO (DPD)', desc: 'Data Processing Division' },
              { name: 'CSO Accounts', desc: 'National Accounts Division' },
              { name: 'State DES', desc: 'Directorates of Economics & Stats' },
              { name: 'SSS / ISS Cadres', desc: 'Ministry Statistical Services' }
            ].map((eco, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center hover:border-teal-400 hover:bg-teal-50/30 transition">
                <div className="text-sm font-black text-slate-900">{eco.name}</div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">{eco.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Live Data Quality Clinic Demo on Landing Page! */}
      <section className="py-20 bg-gradient-to-b from-[#f8faf9] to-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Try It Live • Signature Innovation
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
              Test the Data Quality Clinic Right Here
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Traditional courses test theory through passive videos. Here, officers practice on real corrupted field microdata schedules.
              Try running an auto-scan and applying imputation below:
            </p>
          </div>

          <div className="bg-white rounded-3xl border-2 border-teal-200 shadow-xl overflow-hidden">
            {/* Clinic Mini Header */}
            <div className="bg-slate-900 text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">NSSO 79th Round Schedule: Rural Cluster Microdata #104</h3>
                  <p className="text-xs text-slate-400">Sample Household Data Verification in Progress</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Schedule Quality Score</div>
                  <div className="text-2xl font-black text-teal-400">
                    {miniClinicFixed ? '98/100 (Certified)' : miniClinicScanned ? '58/100 (Corrupted)' : '72/100 (Unverified)'}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Data Table Preview */}
            <div className="p-4 sm:p-6 overflow-x-auto w-full max-w-full">
              <table className="w-full min-w-[640px] text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold">
                  <tr>
                    <th className="p-3 rounded-l-xl">Record ID</th>
                    <th className="p-3">Member Name</th>
                    <th className="p-3">Reported Age</th>
                    <th className="p-3">Primary Activity</th>
                    <th className="p-3">Monthly Consumption (₹)</th>
                    <th className="p-3 rounded-r-xl">Diagnostic Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold">HH-104-01</td>
                    <td className="p-3 font-semibold">Ramesh Kumar (Head)</td>
                    <td className="p-3 font-medium">52</td>
                    <td className="p-3">Self-Employed (Agriculture)</td>
                    <td className="p-3 font-mono">₹14,500</td>
                    <td className="p-3 text-teal-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Validated
                    </td>
                  </tr>

                  {/* Corrupted Row */}
                  <tr className={miniClinicFixed ? 'bg-teal-50/50' : miniClinicScanned ? 'bg-rose-50/80 animate-pulse' : 'bg-amber-50/40'}>
                    <td className="p-3 font-mono font-bold text-slate-900">HH-104-02</td>
                    <td className="p-3 font-semibold">Sunita Devi</td>
                    <td className="p-3 font-black">
                      {miniClinicFixed ? (
                        <span className="text-[#0B1F3A] bg-teal-100 px-2 py-0.5 rounded font-bold">47 (Imputed)</span>
                      ) : miniClinicScanned ? (
                        <span className="text-rose-700 bg-rose-100 px-2 py-0.5 rounded font-black">187 (IMPOSSIBLE!)</span>
                      ) : (
                        <span>187</span>
                      )}
                    </td>
                    <td className="p-3">
                      {miniClinicFixed ? (
                        <span className="text-[#0B1F3A]">Agricultural Wage Labor</span>
                      ) : miniClinicScanned ? (
                        <span className="text-rose-700 font-bold">[BLANK - Missing Value]</span>
                      ) : (
                        <span className="text-slate-400">Not recorded</span>
                      )}
                    </td>
                    <td className="p-3 font-mono">
                      {miniClinicFixed ? (
                        <span className="text-[#0B1F3A] font-bold">₹8,400 (Median Normalized)</span>
                      ) : miniClinicScanned ? (
                        <span className="text-rose-700 font-bold">-₹4,500 (Negative Value!)</span>
                      ) : (
                        <span>-₹4,500</span>
                      )}
                    </td>
                    <td className="p-3 font-bold">
                      {miniClinicFixed ? (
                        <span className="text-teal-700 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Rectified & Logged
                        </span>
                      ) : miniClinicScanned ? (
                        <span className="text-rose-700 flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4" /> 2 Critical Biological & Logical Violations
                        </span>
                      ) : (
                        <span className="text-amber-700">Audit Required</span>
                      )}
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold">HH-104-03</td>
                    <td className="p-3 font-semibold">Amit Kumar</td>
                    <td className="p-3 font-medium">19</td>
                    <td className="p-3">Regular Wage / Salaried</td>
                    <td className="p-3 font-mono">₹11,200</td>
                    <td className="p-3 text-teal-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Validated
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Action Controls for visitors */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-slate-600">
                  {!miniClinicScanned && !miniClinicFixed && (
                    <span>Click <strong>Run AI Sanity Scan</strong> to analyze microdata violations across biological and cross-variable bounds.</span>
                  )}
                  {miniClinicScanned && !miniClinicFixed && (
                    <span className="text-rose-700 font-bold">
                      Violations Identified: Age 187 violates Census mortality bounds. Negative consumption violates economic logic.
                    </span>
                  )}
                  {miniClinicFixed && (
                    <span className="text-[#0B1F3A] font-bold">
                      Success: Applied Hot-Deck donor matching protocol from similar demographic cluster. Quality score boosted to 98/100!
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {!miniClinicScanned && !miniClinicFixed && (
                    <button
                      onClick={handleScanMiniClinic}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs"
                    >
                      <Sparkles className="w-4 h-4 text-teal-400" />
                      <span>Run AI Sanity Scan</span>
                    </button>
                  )}

                  {miniClinicScanned && !miniClinicFixed && (
                    <button
                      onClick={handleFixMiniClinic}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0B1F3A] to-[#123B63] hover:from-[#123B63] text-white font-extrabold text-xs flex items-center gap-2 shadow-md"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Apply Hot-Deck Imputation Protocol</span>
                    </button>
                  )}

                  {miniClinicFixed && (
                    <>
                      <button
                        onClick={resetMiniClinic}
                        className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reset Mini-Lab</span>
                      </button>

                      <button
                        onClick={() => setCurrentView('data-clinic')}
                        className="px-5 py-2 rounded-xl bg-[#0B1F3A] hover:bg-[#123B63] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-xs"
                      >
                        <span>Open Full Data Clinic with 14 Datasets</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive Cadre Persona Explorer */}
      <section className="py-20 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-wider text-[#0B1F3A]">Multi-Cadre Architecture</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight">
            Tailored for Every Level of the Statistical Hierarchy
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            From field investigators using CAPI devices in remote tribal hamlets to Joint Director Generals planning national rounds.
          </p>

          {/* Persona Switcher Tabs */}
          <div className="mt-8 flex flex-col sm:inline-flex sm:flex-row p-1.5 rounded-2xl bg-slate-100 border border-slate-200/80 gap-1 sm:gap-0 max-w-full">
            {[
              { id: 'enumerator', label: '1. Field Investigator / Enumerator' },
              { id: 'sso', label: '2. Senior Statistical Officer (SSO)' },
              { id: 'director', label: '3. Joint Director General / Leadership' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedPersona(tab.id as any)}
                className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition text-center sm:text-left ${
                  selectedPersona === tab.id
                    ? 'bg-white text-[#0B1F3A] shadow-sm font-black border border-teal-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Persona Card Detail */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-8 sm:p-10 shadow-sm">
          {selectedPersona === 'enumerator' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-2 text-xs font-black text-[#0B1F3A] uppercase">
                  <span>Field Operations Cadre • Primary Collection Level</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  Field Investigator: Accurate CAPI Entry & Zero Non-Response Impasse
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Field enumerators operate under intense rural conditions with intermittent internet. KshamataAI equips them with 
                  <strong> Field Offline Mode</strong>, instant biological outlier prompts, and non-response conversion protocols during harvest migration periods.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-2xl bg-teal-50/60 border border-slate-200">
                    <h5 className="text-xs font-bold text-[#0B1F3A]">Core Focus Competencies:</h5>
                    <p className="text-xs text-slate-600 mt-1">CAPI Device Validation, Household Listing Protocols, Informed Citizen Consent under DPDP.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-teal-50/60 border border-slate-200">
                    <h5 className="text-xs font-bold text-[#0B1F3A]">Primary Practice Sandbox:</h5>
                    <p className="text-xs text-slate-600 mt-1">Offline Micro-Drills & Voice Field Prompts in regional Indian languages.</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-teal-100 text-[#0B1F3A] flex items-center justify-center font-black text-xl mx-auto">
                  FI
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900">Field Investigator Profile</h4>
                  <p className="text-xs text-slate-500">10,200+ Officers Across India</p>
                </div>
                <button
                  onClick={() => setCurrentView('offline-mode')}
                  className="w-full py-2.5 rounded-xl bg-[#0B1F3A] hover:bg-[#123B63] text-white font-bold text-xs transition"
                >
                  Try Field Offline Mode
                </button>
              </div>
            </div>
          )}

          {selectedPersona === 'sso' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-2 text-xs font-black text-[#0B1F3A] uppercase">
                  <span>Methodological Cadre • Supervisory & Validation Level</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  Senior Statistical Officer: Rigorous Scrutiny, Outlier Detection & Imputation
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Supervisory officers are the quality firewall of the Indian Statistical System. KshamataAI provides them with 
                  <strong> Data Quality Clinic micro-labs</strong>, <strong>Work Simulator branching crises</strong>, and <strong>Learning-to-Work Proof</strong> capstones.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-2xl bg-teal-50/60 border border-slate-200">
                    <h5 className="text-xs font-bold text-[#0B1F3A]">Core Focus Competencies:</h5>
                    <p className="text-xs text-slate-600 mt-1">Hot-deck Imputation, Sampling Weight Design, Cross-Schedule Consistency Logic.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-teal-50/60 border border-slate-200">
                    <h5 className="text-xs font-bold text-[#0B1F3A]">Primary Practice Sandbox:</h5>
                    <p className="text-xs text-slate-600 mt-1">Data Quality Clinic & Capstone Rural Microdata Certification.</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-teal-50 border border-teal-200 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#0B1F3A] text-white flex items-center justify-center font-black text-xl mx-auto shadow-md">
                  AS
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900">Ananya Sharma (Learner)</h4>
                  <p className="text-xs text-[#0B1F3A] font-semibold">Statistical Officer (NSSO)</p>
                </div>
                <button
                  onClick={() => setCurrentView('data-clinic')}
                  className="w-full py-2.5 rounded-xl bg-[#0B1F3A] hover:bg-[#123B63] text-white font-bold text-xs transition"
                >
                  Explore SSO Learning Map
                </button>
              </div>
            </div>
          )}

          {selectedPersona === 'director' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-2 text-xs font-black text-[#0B1F3A] uppercase">
                  <span>Executive Leadership • Cadre Control & Policy Governance</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  Joint Director General: Cadre Skill-Risk Heatmaps & Strategic Policy Lab
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Senior directors ensure statistical integrity on the national stage. KshamataAI equips them with 
                  <strong> Institutional Skill-Risk Heatmaps</strong> across divisions and the <strong>Senior Officer Policy Lab</strong> to test budget, audit intensity, and schedule release timelines.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-2xl bg-teal-50/60 border border-slate-200">
                    <h5 className="text-xs font-bold text-[#0B1F3A]">Core Focus Competencies:</h5>
                    <p className="text-xs text-slate-600 mt-1">Cadre Allocation Strategy, Statistical Release Scheduling, DPDP Legal Compliance Oversight.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-teal-50/60 border border-slate-200">
                    <h5 className="text-xs font-bold text-[#0B1F3A]">Primary Leadership Tool:</h5>
                    <p className="text-xs text-slate-600 mt-1">Division Skill-Risk Heatmap & Interactive Policy Tradeoff Simulator.</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900 text-white text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-teal-500 text-slate-900 flex items-center justify-center font-black text-xl mx-auto">
                  RM
                </div>
                <div>
                  <h4 className="font-extrabold text-white">Dr. Rajiv Menon</h4>
                  <p className="text-xs text-teal-300">Joint Director General (Admin View)</p>
                </div>
                <button
                  onClick={() => setCurrentView('admin-risk-map')}
                  className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-500 text-slate-950 font-bold text-xs transition"
                >
                  View Department Risk Heatmap
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. Signature 12-Tool Innovation Lab Bento Grid */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-wider text-[#0B1F3A]">
              12 Purpose-Built Statistical Differentiators
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-2 tracking-tight">
              Engineered for Official Statistical Reality
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              Standard consumer LMS tools fail in government statistical work because they lack domain reality. 
              KshamataAI delivers 12 specialized practical tools mapped to real MoSPI field workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              {
                title: 'Data Quality Clinic',
                badge: 'Signature',
                icon: Stethoscope,
                desc: 'Upload practice schedules to detect missing values, impossible data (Age 187), and duplicates. Rectify errors with targeted statistical imputations.',
                action: () => setCurrentView('data-clinic')
              },
              {
                title: 'Statistics Work Simulator',
                badge: 'Branching AI',
                icon: SlidersHorizontal,
                desc: 'Encounter authentic field crises such as 30% rural non-response. Every choice models mathematical sample weight distortion in real-time.',
                action: () => setCurrentView('simulations')
              },
              {
                title: 'Explainable Learning Map',
                badge: 'AI Clarity',
                icon: Route,
                desc: 'Reveals exactly WHY each skill is required for your role, what capabilities you will acquire, and how it impacts district data confidence intervals.',
                action: () => setCurrentView('learning-map')
              },
              {
                title: 'Trusted AI Quiz Maker',
                badge: '100% Cited',
                icon: BookOpen,
                desc: 'Generates MCQs grounded strictly in official MoSPI documentation with exact chapter and page citations, plus mandatory trainer review approval.',
                action: () => setCurrentView('quiz-maker')
              },
              {
                title: 'Safe AI Sovereign Guard',
                badge: 'DPDP 2023',
                icon: ShieldCheck,
                desc: 'Reassuring privacy checkpoint. Automatically scans and redacts Aadhaar numbers, citizen phone contacts, and geo-coordinates before AI ingestion.',
                action: () => setCurrentView('safe-guard')
              },
              {
                title: 'Field Officer Offline Mode',
                badge: 'Field Ready',
                icon: WifiOff,
                desc: 'Designed for remote enumerators in low-connectivity blocks. Caches micro-lessons and validation checklists, syncing automatically when reconnected.',
                action: () => setCurrentView('offline-mode')
              },
              {
                title: 'Senior Officer Policy Lab',
                badge: 'Executive',
                icon: Scale,
                desc: 'Interactive decision laboratory for directors. Model resource reallocations, spot audit intensity, and schedule release timelines under crisis.',
                action: () => setCurrentView('policy-lab')
              },
              {
                title: 'Learning-to-Work Proof',
                badge: 'Capstone Audit',
                icon: Award,
                desc: 'Replaces passive course certificates with verified deliverable sandboxes evaluating Knowledge, Application, and Workplace Readiness.',
                action: () => setCurrentView('proof')
              },
              {
                title: 'Cadre Skill-Risk Heatmap',
                badge: 'Analytics',
                icon: TrendingUp,
                desc: 'Bird’s-eye administrative visibility across divisions (Field Operations, National Accounts, Social Stats) to prevent survey release compromises.',
                action: () => setCurrentView('admin-risk-map')
              },
              {
                title: 'Ask an Official Cadre Expert',
                badge: 'Mentorship',
                icon: Users,
                desc: 'Direct peer consultation network pairing young field officers with veteran MoSPI directors and methodology authors for complex field dilemmas.',
                action: () => setCurrentView('expert-match')
              },
              {
                title: 'AI Competency Gap Engine',
                badge: 'Diagnostic',
                icon: Target,
                desc: 'Ranks institutional skill deficits with data-grounded justifications and a 3-tier pipeline: Recommended Learning → Practice → Workplace Proof.',
                action: () => setCurrentView('skill-gaps')
              },
              {
                title: 'Personalized Milestone Path',
                badge: 'Journey',
                icon: Layers,
                desc: 'Sequential visual competency milestones from foundational survey concepts to operational microdata cleaning and capstone certification.',
                action: () => setCurrentView('learning-path')
              }
            ].map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-teal-400 shadow-xs hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-2xl bg-teal-50 text-[#0B1F3A] flex items-center justify-center group-hover:bg-[#0B1F3A] group-hover:text-white transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 group-hover:bg-teal-100 group-hover:text-[#0B1F3A] transition-colors">
                        {tool.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-slate-900 group-hover:text-[#0B1F3A] transition-colors">
                      {tool.title}
                    </h3>
                    <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>

                  <button
                    onClick={tool.action}
                    className="mt-6 pt-3 border-t border-slate-100 text-xs font-black text-[#0B1F3A] group-hover:text-teal-700 flex items-center gap-1.5 transition"
                  >
                    <span>Launch Module</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Comparison Table: Generic LMS vs KshamataAI */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-wider text-[#0B1F3A]">The Paradigm Shift</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
              Why KshamataAI is NOT Just Another LMS
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Comparing standard video-centric e-learning platforms with KshamataAI’s closed-loop statistical capability operating system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Generic LMS Card */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Conventional Approach</span>
                <h3 className="text-xl font-extrabold text-slate-700 mt-1">Generic Course Catalog (Passive LMS)</h3>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 font-bold">✕</span>
                  <span><strong>Static Video Catalog:</strong> 300+ hours of generic lectures with zero connection to the officer’s active field district.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 font-bold">✕</span>
                  <span><strong>Opaque Recommendations:</strong> AI suggests courses without explaining <em>why</em> the officer needs them.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 font-bold">✕</span>
                  <span><strong>Rote Memorization Quizzes:</strong> Generic multiple-choice questions easily guessed without applying logic.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 font-bold">✕</span>
                  <span><strong>Watch-Time Certificates:</strong> Completion certified purely by video playback length rather than demonstrated capability.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 font-bold">✕</span>
                  <span><strong>Blind to Field Errors:</strong> Leadership has zero visibility into actual district microdata scrutiny failure rates.</span>
                </li>
              </ul>
            </div>

            {/* KshamataAI Card */}
            <div className="p-8 rounded-3xl bg-white border-2 border-teal-300 shadow-xl shadow-slate-900/5 ring-4 ring-teal-600/5 space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <span className="text-xs font-black text-[#0B1F3A] uppercase tracking-wider">KshamataAI Capability OS</span>
                <h3 className="text-xl font-black text-[#0B1F3A] mt-1">Closed-Loop Statistical Intelligence</h3>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-slate-800">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <span><strong>Role-Specific Diagnostic Gaps:</strong> Identifies exact deficits (e.g. 54% vs 85% required in CAPI validation).</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <span><strong>Explainable Learning Map:</strong> Explicitly reveals <em>You Need This → Why → What You Learn → Actions</em>.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <span><strong>Data Quality Clinic:</strong> Practice fixing authentic impossible values (Age 187) and testing hot-deck imputations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <span><strong>Learning-to-Work Proof:</strong> Real sandbox capstone deliverable auditing Knowledge (94%), Application (82%), Readiness (78%).</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <span><strong>Predictive Cadre Risk Map:</strong> Leadership can pinpoint division skill bottlenecks before national survey releases.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Mission Karmayogi & iGOT Alignment Architecture */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="bg-gradient-to-r from-[#0B1F3A] via-[#123B63] to-teal-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 space-y-4">
                <span className="text-xs font-black uppercase tracking-wider text-teal-300 bg-[#123B63] px-3 py-1 rounded-full border border-teal-500/50">
                  Mission Karmayogi Bharat Blueprint
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                  Seamlessly Anchored in the National FRAC Framework
                </h2>
                <p className="text-sm sm:text-base text-teal-100/90 leading-relaxed max-w-2xl">
                  KshamataAI is architected directly around the <strong>Framework for Roles, Activities and Competencies (FRAC)</strong>, 
                  translating statutory civil service mandates into daily operational skills across <strong>Domain, Behavioral, and Functional</strong> pillars.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/15">
                    <div className="font-extrabold text-teal-200">Domain Competencies</div>
                    <p className="text-teal-100/80 mt-1">Sampling designs, microdata imputation, price index formulation.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/15">
                    <div className="font-extrabold text-teal-200">Functional Competencies</div>
                    <p className="text-teal-100/80 mt-1">CAPI tablet operation, supervisory spot audits, village listing.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/15">
                    <div className="font-extrabold text-teal-200">Behavioral Competencies</div>
                    <p className="text-teal-100/80 mt-1">Citizen empathy, DPDP data confidentiality, interview persuasion.</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white/10 border border-white/20 text-center space-y-4">
                <div className="text-3xl font-black text-teal-300">FRAC v3.0</div>
                <div className="text-xs text-teal-100 font-semibold">100% Alignment with Capacity Building Commission (CBC)</div>
                <button
                  onClick={() => setCurrentView('competencies')}
                  className="w-full py-3 rounded-xl bg-white text-[#0B1F3A] font-black text-xs hover:bg-teal-50 transition shadow-lg"
                >
                  Inspect Competency Taxonomy
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Real Cadre Transformation Case Studies */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-wider text-[#0B1F3A]">Documented Field Impact</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
              Transforming Survey Operations Across India’s Districts
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Real scenarios demonstrating how targeted competency intervention directly elevates national data quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                region: 'Ranchi Cluster, Jharkhand',
                survey: 'HCES 79th Round',
                issue: 'Overcoming 38% Rural Non-Response',
                solution: 'Officers trained in non-response substitution protocols and local seasonal harvest adjustment.',
                impact: 'Non-response plummeted to 4.2%; confidence intervals restored to within ±1.8% target.'
              },
              {
                region: 'Surat Industrial Belt, Gujarat',
                survey: 'Annual Survey of Industries (ASI)',
                issue: 'Machine-Generated Yield Outliers',
                solution: 'Data Quality Clinic training on cross-variable fuel vs. gross output consistency checks.',
                impact: 'Schedule rejection by Central Processing Division reduced by 64% in first cycle.'
              },
              {
                region: 'Baramulla District, J&K',
                survey: 'Periodic Labour Force Survey (PLFS)',
                issue: 'Remote Hilly Block Connectivity Loss',
                solution: 'Field Offline Mode deployed on 140 CAPI devices with encrypted offline verification.',
                impact: 'Zero schedule data loss over 90-day winter cycle; 100% sync achieved on return.'
              }
            ].map((cs, idx) => (
              <div key={idx} className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#0B1F3A]">
                    <span>{cs.region}</span>
                    <span className="bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">{cs.survey}</span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 mt-2.5">{cs.issue}</h3>
                  <div className="mt-3 space-y-2 text-xs text-slate-600">
                    <p><strong>Cadre Intervention:</strong> {cs.solution}</p>
                    <p className="text-[#0B1F3A] font-semibold bg-teal-50/70 p-3 rounded-xl border border-slate-200">
                      <strong>Statutory Outcome:</strong> {cs.impact}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Institutional FAQ Accordion */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-[#0B1F3A]">Ministry Questions & Answers</span>
            <h2 className="text-3xl font-black text-slate-900 mt-1">Frequently Asked Institutional Queries</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How does KshamataAI comply with India’s Digital Personal Data Protection (DPDP) Act 2023?',
                a: 'KshamataAI features a built-in Sovereign Safe AI Guard that intercepts microdata inputs. It performs local programmatic pattern recognition to detect and automatically mask direct citizen identifiers (12-digit Aadhaar numbers, 10-digit telephone contacts, personal names, and precise GPS coordinates) before any model processing occurs.'
              },
              {
                q: 'Can field enumerators use KshamataAI in remote tribal or border districts with no internet?',
                a: 'Yes. KshamataAI includes a fully functional Field Offline Mode built on local device caching. Field enumerators can complete micro-training modules, study CAPI validation checklists, and solve practice exercises offline. All activity is cryptographically stored in a local encrypted queue and automatically synchronized with the central MoSPI grid upon cellular reconnection.'
              },
              {
                q: 'Are the AI recommendations explainable to senior administrative leadership?',
                a: 'Completely. Unlike black-box recommendation algorithms, KshamataAI utilizes an Explainable Learning Map that renders a transparent 4-tier causal chain: You Need This (Skill standard) → Why Do You Need It (Cadre & district survey mandate) → What You Will Learn (Operational techniques) → Recommended Actions.'
              },
              {
                q: 'How does this integrate with the existing iGOT Karmayogi civil service platform?',
                a: 'KshamataAI is designed as an intelligent domain competency copilot that directly imports role profiles from the FRAC (Framework for Roles, Activities and Competencies) dictionary and exports verified Learning-to-Work Proof transcripts back to official personnel service books.'
              },
              {
                q: 'What prevents AI models from hallucinating false statistical formulas or survey rules?',
                a: 'Our Trusted AI Quiz Maker and Copilot are strictly document-grounded. The AI is constrained to synthesize queries exclusively from official MoSPI source manuals (e.g. NSSO Instructions to Field Staff, National Accounts Manual), citing exact manual names and page numbers, and requires human trainer approval before publication.'
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 overflow-hidden transition"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      activeFaq === idx ? 'rotate-180 text-teal-700' : ''
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Final Grand Call to Action Banner */}
      <section className="py-24 bg-gradient-to-br from-[#0B1F3A] via-[#123B63] to-teal-950 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-teal-200 text-xs font-black mb-6 border border-white/20">
            Official Statistical System of India • Smart India Hackathon Prototype
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Ready to Experience the Future of Statistical Competency?
          </h2>
          <p className="mt-5 text-base sm:text-lg text-teal-100/90 max-w-2xl mx-auto leading-relaxed">
            Step into the official workspace as an NSSO Statistical Officer or Joint Director General. 
            Diagnose real skill gaps, rectify live survey microdata, and simulate national statistical policies.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-white hover:bg-teal-50 text-[#0B1F3A] text-base font-black shadow-xl transition active:scale-95"
            >
              Launch Platform Experience
            </button>
            <button
              onClick={startGuidedDemo}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#123B63] hover:bg-[#123B63] text-white text-base font-bold border border-teal-400/40 transition active:scale-95"
            >
              Start 8-Step Evaluator Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

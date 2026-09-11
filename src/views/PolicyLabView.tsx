import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Scale,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  RotateCcw,
  Sliders
} from 'lucide-react';

export const PolicyLabView: React.FC = () => {
  const { addToast } = useApp();

  // Slider parameters
  const [budgetAllocationCrores, setBudgetAllocationCrores] = useState<number>(4.5); // 1.0 to 12.0
  const [spotAuditIntensity, setSpotAuditIntensity] = useState<number>(15); // 5% to 35%
  const [timeExtensionWeeks, setTimeExtensionWeeks] = useState<number>(2); // 0 to 8 weeks
  const [trainingInterventionLevel, setTrainingInterventionLevel] = useState<number>(75); // 0 to 100%

  // Real-time computed policy outcomes
  const projectedDataQuality = Math.min(
    98,
    Math.round(62 + spotAuditIntensity * 0.65 + (trainingInterventionLevel / 100) * 14 - timeExtensionWeeks * 0.4)
  );

  const citizenTrustIndex = Math.min(
    99,
    Math.round(70 + (projectedDataQuality - 70) * 0.6 - (timeExtensionWeeks > 4 ? (timeExtensionWeeks - 4) * 3 : 0))
  );

  const workforceFatigueIndex = Math.min(
    100,
    Math.round(40 + spotAuditIntensity * 1.4 - (timeExtensionWeeks * 2.5) + (budgetAllocationCrores > 6 ? -8 : 10))
  );

  const totalExpenditureCrores = (
    budgetAllocationCrores +
    (spotAuditIntensity * 0.08) +
    (timeExtensionWeeks * 0.35)
  ).toFixed(2);

  const handleApplyPolicy = () => {
    addToast(
      'Executive Policy Order Committed',
      `Allocated ₹${totalExpenditureCrores} Cr. Projected Data Quality: ${projectedDataQuality}%. Citizen Trust: ${citizenTrustIndex}/100.`,
      'success'
    );
  };

  const handleReset = () => {
    setBudgetAllocationCrores(4.5);
    setSpotAuditIntensity(15);
    setTimeExtensionWeeks(2);
    setTrainingInterventionLevel(75);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-white via-teal-50/50 to-white p-7 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#0B1F3A] uppercase tracking-wider">
            <Scale className="w-4 h-4 text-teal-700" />
            <span>Leadership Sandbox • Executive Decision Laboratory</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-1.5 tracking-tight">
            Senior Officer Policy Lab
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
            Simulate administrative interventions when district statistical quality falters. Balance financial budget,
            field workforce burnout, delivery deadlines, and public data credibility.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-5 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition flex items-center gap-2 shrink-0 shadow-xs"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Parameters</span>
        </button>
      </div>

      {/* Active Executive Dilemma Banner */}
      <div className="p-7 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-teal-300">
            Current Executive Mandate • Scenario #2026-B
          </span>
          <span className="text-xs font-black px-3 py-1 rounded-full bg-[#0B1F3A] text-white">
            High-Stakes Policy Dilemma
          </span>
        </div>
        <h2 className="text-xl font-black text-white">
          Major Data-Quality Failure Detected in District 74 Periodic Labor Survey
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl font-normal">
          An automated audit shows 28% of household records failed logic consistency checks. The quarterly GDP
          employment input is due in 30 days. As Joint Director General, adjust your resource levers below to achieve
          scientific validity without triggering excessive field burnout or public release delays.
        </p>
      </div>

      {/* Controls & Projection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Policy Levers / Sliders */}
        <div className="p-7 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-teal-700" />
              <span>Policy Resource Sliders</span>
            </h3>
            <span className="text-xs text-slate-400 font-bold">Real-time dynamic modeling</span>
          </div>

          {/* Slider 1: Budget Allocation */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700">Emergency Supervisory Budget Allocation:</span>
              <span className="text-[#0B1F3A] text-sm font-black">₹{budgetAllocationCrores.toFixed(1)} Crores</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="12.0"
              step="0.5"
              value={budgetAllocationCrores}
              onChange={e => setBudgetAllocationCrores(parseFloat(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>₹1.0 Cr (Austerity)</span>
              <span>₹6.0 Cr (Moderate)</span>
              <span>₹12.0 Cr (Full Surge)</span>
            </div>
          </div>

          {/* Slider 2: Spot Audit Intensity */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700">Supervisory Re-Interview Intensity:</span>
              <span className="text-[#0B1F3A] text-sm font-black">{spotAuditIntensity}% of Households</span>
            </div>
            <input
              type="range"
              min="5"
              max="35"
              step="5"
              value={spotAuditIntensity}
              onChange={e => setSpotAuditIntensity(parseInt(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>5% (Routine Spot)</span>
              <span>20% (Intense Verification)</span>
              <span>35% (Exhaustive Recount)</span>
            </div>
          </div>

          {/* Slider 3: Timeline Extension */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700">Statutory Release Timeline Extension:</span>
              <span className="text-[#0B1F3A] text-sm font-black">+{timeExtensionWeeks} Weeks Delay</span>
            </div>
            <input
              type="range"
              min="0"
              max="8"
              step="1"
              value={timeExtensionWeeks}
              onChange={e => setTimeExtensionWeeks(parseInt(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>0 Weeks (Hard Deadline)</span>
              <span>4 Weeks (Standard Extension)</span>
              <span>8 Weeks (Severe Delay)</span>
            </div>
          </div>

          {/* Slider 4: Training & Clinic Adoption */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700">Data Quality Clinic Mandate for Field Cadre:</span>
              <span className="text-[#0B1F3A] text-sm font-black">{trainingInterventionLevel}% Cadre Enrolled</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={trainingInterventionLevel}
              onChange={e => setTrainingInterventionLevel(parseInt(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>0% (No Training)</span>
              <span>50% (Targeted)</span>
              <span>100% (Cadre-Wide Deployment)</span>
            </div>
          </div>

          <button
            onClick={handleApplyPolicy}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#0B1F3A] to-[#123B63] hover:from-[#123B63] text-white text-xs font-black transition shadow-sm flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Commit Policy Directive to Official Bulletin</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Projected Multi-Variable Consequences */}
        <div className="p-7 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="text-base font-black text-slate-900">Projected System-Wide Outcomes</h3>
            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0B1F3A] border border-teal-200">
              SIMULATED TELEMETRY
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Metric 1: Projected Quality */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Projected Quality Score
              </span>
              <div className="mt-2 text-3xl font-black text-[#0B1F3A]">{projectedDataQuality}/100</div>
              <p className="text-[10px] text-slate-500 mt-1 font-semibold">
                {projectedDataQuality >= 90 ? '✓ Exceeds statutory release threshold' : '⚠ Below MoSPI standard'}
              </p>
            </div>

            {/* Metric 2: Citizen & Media Trust */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Citizen & Media Trust Index
              </span>
              <div className="mt-2 text-3xl font-black text-slate-900">{citizenTrustIndex}/100</div>
              <p className="text-[10px] text-slate-500 mt-1 font-semibold">
                {timeExtensionWeeks > 4 ? 'Compromised by delayed publication' : 'High institutional credibility'}
              </p>
            </div>

            {/* Metric 3: Total Cost Impact */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Fiscal Expenditure
              </span>
              <div className="mt-2 text-3xl font-black text-slate-900">₹{totalExpenditureCrores} Cr</div>
              <p className="text-[10px] text-slate-500 mt-1 font-semibold">Direct supervisory & field logistical costs</p>
            </div>

            {/* Metric 4: Field Workforce Fatigue */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Workforce Fatigue Index
              </span>
              <div
                className={`mt-2 text-3xl font-black ${
                  workforceFatigueIndex > 75 ? 'text-rose-700' : 'text-slate-900'
                }`}
              >
                {workforceFatigueIndex}%
              </div>
              <p className="text-[10px] text-slate-500 mt-1 font-semibold">
                {workforceFatigueIndex > 75 ? 'Risk of field staff attrition' : 'Sustainable field workload'}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs text-slate-700 leading-relaxed space-y-1.5">
            <div className="font-bold text-[#0B1F3A] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-700" />
              <span>Policy Lab Synthesis:</span>
            </div>
            <p className="font-normal">
              By combining a modest 15% spot audit with mandatory Data Quality Clinic micro-labs, you achieve a{' '}
              <strong className="text-[#0B1F3A] font-bold">{projectedDataQuality}% Quality Score</strong> while preserving public release trust and avoiding
              extreme staff burnout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

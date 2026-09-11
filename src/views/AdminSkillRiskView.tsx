import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockDepartmentRisks } from '../data/mockData';
import { DepartmentRiskItem } from '../types';
import {
  ShieldAlert,
  AlertTriangle,
  Building2,
  Users,
  TrendingDown,
  ArrowRight,
  Filter,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Layers,
  FileSpreadsheet
} from 'lucide-react';

export const AdminSkillRiskView: React.FC = () => {
  const { addToast } = useApp();
  const [selectedDept, setSelectedDept] = useState<DepartmentRiskItem>(mockDepartmentRisks[0]); // default Field Operations

  const handleMandateIntervention = (deptName: string) => {
    addToast(
      'Administrative Training Directive Issued',
      `Mandatory Data Quality Clinic intervention issued for all personnel in ${deptName}.`,
      'success'
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-white via-teal-50/50 to-white p-7 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#0B1F3A] uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-teal-700" />
            <span>Executive Oversight • Senior Leadership Competency Intelligence</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-1.5 tracking-tight">
            Department Skill-Risk Heatmap
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
            Executive bird’s-eye visibility for Joint Director Generals and Cadre Controllers. Pinpoint institutional
            skill bottlenecks across divisions before national survey releases are compromised.
          </p>
        </div>

        <div className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-2xl border-2 border-teal-200 shadow-xs shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping"></span>
          <span className="text-xs font-black text-slate-800">1 Critical Cadre Risk Detected</span>
        </div>
      </div>

      {/* Top Department Risk Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {mockDepartmentRisks.map(dept => {
          const isSelected = selectedDept.id === dept.id;
          const isHigh = dept.riskLevel === 'HIGH';
          const isMedium = dept.riskLevel === 'MEDIUM';

          return (
            <div
              key={dept.id}
              onClick={() => setSelectedDept(dept)}
              className={`p-6 rounded-3xl border-2 transition cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-teal-500 ring-4 ring-[#0B1F3A]/5 shadow-md'
                  : 'bg-white border-slate-200/80 hover:border-teal-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                      isHigh
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : isMedium
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-teal-100 text-[#0B1F3A] border border-teal-200'
                    }`}
                  >
                    {dept.riskLevel} RISK
                  </span>
                  <span className="text-xs font-bold text-slate-400">{dept.headcount} Officers</span>
                </div>

                <h3 className="text-sm font-black text-slate-900 mt-3 leading-snug">{dept.departmentName}</h3>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-[#0B1F3A]">{dept.avgReadiness}%</span>
                  <span className="text-xs text-slate-400 font-bold">Avg Cadre Score</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-[#0B1F3A]">
                <span>Inspect Division Drilldown</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Drilldown Section: Department -> Team -> Role -> Competency */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Drilldown Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border-2 border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black text-[#0B1F3A] uppercase tracking-wider">
                Cadre Breakdown
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-0.5">
                {selectedDept.departmentName} ({selectedDept.division})
              </h3>
            </div>
            <button
              onClick={() => handleMandateIntervention(selectedDept.departmentName)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0B1F3A] to-[#123B63] hover:from-[#123B63] text-white text-xs font-bold transition shadow-xs active:scale-95"
            >
              Mandate Division Clinic
            </button>
          </div>

          <div className="p-6 space-y-5">
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h4 className="text-xs font-black text-slate-900">Priority Competency Vulnerabilities</h4>
                  <p className="text-xs text-slate-500 font-medium">{selectedDept.headcount} Total Cadre Members</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-[#0B1F3A]">{selectedDept.avgReadiness}% Readiness</span>
                </div>
              </div>

              {/* Sub-competencies progress bars */}
              <div className="space-y-3 pt-2 border-t border-slate-200/60">
                {selectedDept.topAtRiskCompetencies.map((g, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700">{g.name}</span>
                      <span className="font-black text-[#0B1F3A]">
                        {g.gap}% Deficit ({g.risk} Risk)
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#0B1F3A] h-full rounded-full"
                        style={{ width: `${Math.max(10, 100 - g.gap)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs text-[#0B1F3A] font-medium">
              <strong className="block mb-1 font-black">Official Recommended Intervention:</strong>
              <p>{selectedDept.recommendedIntervention}</p>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Institutional Blind Spot Synthesis */}
        <div className="space-y-6">
          <div className="p-7 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <Sparkles className="w-4 h-4 text-teal-700" />
              <h3 className="text-base font-black text-slate-900">Cadre Blind Spot Synthesis</h3>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs leading-relaxed space-y-2">
              <div className="font-black text-[#0B1F3A] flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Survey Schedule Risk:</span>
              </div>
              <p className="text-slate-700">
                In <strong>{selectedDept.departmentName}</strong>, field data entry errors in CAPI devices represent a
                systemic vulnerability. Rectifying this through the Data Quality Clinic will improve national release
                accuracy.
              </p>
            </div>

            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-2.5">
                Executive Action Protocols:
              </span>
              <ul className="text-xs space-y-2.5 text-slate-700 font-medium">
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#0B1F3A] mt-1.5 shrink-0"></span>
                  <span>Mandate Data Quality Clinic micro-labs for all district field supervisors.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#0B1F3A] mt-1.5 shrink-0"></span>
                  <span>Deploy spot supervisory audits to verify consistency checks.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#0B1F3A] mt-1.5 shrink-0"></span>
                  <span>Schedule peer mentoring sessions with senior SSO methodologists.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

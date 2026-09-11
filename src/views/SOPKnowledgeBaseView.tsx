import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  Shield,
  Layers,
  ArrowRight,
  Sparkles,
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const SOPKnowledgeBaseView: React.FC = () => {
  const { setCurrentView, setShowAIAssistant } = useApp();
  const [activeTopic, setActiveTopic] = useState<string>('capi-scrutiny');

  const topics = [
    { id: 'capi-scrutiny', title: 'CAPI Field Scrutiny & Biological Bounds', icon: Layers },
    { id: 'sampling-weights', title: 'Stratified Design Weights & Multipliers', icon: BookOpen },
    { id: 'imputation-protocols', title: 'Constrained Hot-Deck Imputation Rules', icon: FileCode },
    { id: 'dpdp-safeguards', title: 'DPDP Act Microdata De-Identification', icon: Shield },
    { id: 'cpi-price-audit', title: 'CPI Market Quotation & Specification Audit', icon: CheckCircle2 }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-teal-100 text-[#0B1F3A] rounded-full text-xs font-black uppercase tracking-wider">
                Cadre Operational Manuals
              </span>
              <span className="text-xs text-slate-500 font-semibold">• NSSCF v3.2 Certified</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Standard Operating Procedures (SOPs) & Field Manuals
            </h1>
            <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
              Step-by-step statutory protocols, mathematical specifications, and cross-variable verification algorithms prescribed for Field Operations Division (FOD) and Data Quality Assurance Division (DQAD).
            </p>
          </div>

          <button
            onClick={() => setShowAIAssistant(true)}
            className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#0B1F3A] hover:bg-[#123B63] text-white font-extrabold text-xs shadow-md shadow-teal-700/20 transition shrink-0"
          >
            <Sparkles className="w-4 h-4 text-teal-200" />
            <span>Consult AI on Specific SOP</span>
          </button>
        </div>
      </div>

      {/* Main Content: Left Topics Nav & Right Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Topic Selector */}
        <div className="lg:col-span-4 space-y-2">
          <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider px-2 mb-3">
            Operational SOP Chapters
          </p>
          {topics.map(t => {
            const Icon = t.icon;
            const isSelected = activeTopic === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTopic(t.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl text-left transition border ${
                  isSelected
                    ? 'bg-teal-50 text-[#0B1F3A] font-black border-teal-300 shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-[#0B1F3A] text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-extrabold leading-tight">{t.title}</span>
                </div>
                <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-teal-700' : 'text-slate-400'}`} />
              </button>
            );
          })}

          <div className="p-4 bg-[#0B1F3A] text-white rounded-3xl mt-6 space-y-3">
            <h4 className="font-extrabold text-xs text-teal-200 uppercase tracking-wider">
              Practice in Real Time
            </h4>
            <p className="text-xs text-teal-100/90 leading-relaxed">
              Test your understanding of these SOP rules on realistic survey records in our interactive clinic.
            </p>
            <button
              onClick={() => setCurrentView('data-clinic')}
              className="w-full py-2.5 bg-white text-[#0B1F3A] rounded-xl font-black text-xs hover:bg-teal-50 transition shadow-sm"
            >
              Open Data Quality Clinic
            </button>
          </div>
        </div>

        {/* Right Topic Detailed Content */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          {activeTopic === 'capi-scrutiny' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-mono font-bold text-[#0B1F3A] bg-teal-50 px-2.5 py-1 rounded-md">
                  SOP-FOD-2026-01
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-2">
                  CAPI Electronic Schedule Field Scrutiny & Biological Bounds Check
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Applicable to all NSS Socio-Economic Rounds, Periodic Labour Force Survey (PLFS), and ASHE schedules.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  1. Biological Range Hard Bounds
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
                    <thead className="bg-slate-50 text-slate-700 font-extrabold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Variable Name</th>
                        <th className="p-3">Hard Allowable Bound</th>
                        <th className="p-3">Soft Outlier Warning</th>
                        <th className="p-3">Mandatory Immediate Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr>
                        <td className="p-3 font-mono font-bold">Respondent Age</td>
                        <td className="p-3 text-rose-700 font-bold">0 to 115 years</td>
                        <td className="p-3">&gt; 90 years</td>
                        <td className="p-3">Fatal Error Code E-04 if &gt; 115 (e.g. 187). Block schedule release.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold">Monthly Consumption</td>
                        <td className="p-3 text-rose-700 font-bold">&ge; ₹0.00</td>
                        <td className="p-3">&gt; ₹1,50,000 per capita</td>
                        <td className="p-3">Negative value rejected immediately. Check loan/debt blocks.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold">Hours Worked / Week</td>
                        <td className="p-3 text-rose-700 font-bold">0 to 112 hours</td>
                        <td className="p-3">&gt; 84 hours</td>
                        <td className="p-3">Requires enumerator justification code if exceeding 84 hours.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  2. Cross-Schedule Relationship Consistency Rules
                </h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span><strong>Spouse Age Difference:</strong> If marital status is "Currently Married" with spouse in household, absolute age difference should not exceed 45 years without supervisor sign-off.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span><strong>Parent-Child Age Gap:</strong> Age difference between biological mother and child must be $\ge 14$ years.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span><strong>Literacy vs Educational Level:</strong> If code indicates "Illiterate", highest level completed must be recorded as code \`01\` (Not literate).</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTopic === 'sampling-weights' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-mono font-bold text-[#0B1F3A] bg-teal-50 px-2.5 py-1 rounded-md">
                  SOP-SDRD-2026-02
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-2">
                  Multi-Stage Stratified Sampling Weight Calibration & Multipliers
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Design weight derivation, post-stratification, and non-response multiplier calculation.
                </p>
              </div>

              <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-2xl space-y-2">
                <h4 className="font-extrabold text-xs text-[#0B1F3A]">Design Weight Formulation</h4>
                <div className="bg-white p-3 rounded-xl font-mono text-xs text-[#0B1F3A] text-center border border-teal-200">
                  W_hij = ( 1 / P_hi ) * ( H_hi / h_hi )
                </div>
                <p className="text-[11px] text-[#0B1F3A]">
                  Where P_hi is the selection probability of the i-th FSU under PPSWR or Circular Systematic Sampling, H_hi is listed households, and h_hi is surveyed households.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Non-Response Adjustment Rule
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Never delete non-responding units from the sample frame. Instead, adjust weights at the stratum level by multiplying surviving respondents by the ratio of total sampled households to responding households.
                </p>
              </div>
            </div>
          )}

          {activeTopic === 'imputation-protocols' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-mono font-bold text-[#0B1F3A] bg-teal-50 px-2.5 py-1 rounded-md">
                  SOP-DQAD-2026-03
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-2">
                  Constrained Nearest-Neighbor Hot-Deck Imputation
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Preserving variance and distribution shape in official survey microdata.
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <p>
                  <strong>Why Mean Substitution is Prohibited:</strong> Replacing missing values with the arithmetic mean artificially reduces sample variance and deflates standard errors, producing invalid confidence intervals.
                </p>
                <p>
                  <strong>Hot-Deck Matching Dimensions:</strong> Donors are selected from the same First Stage Unit (Village/Block) matching on:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Household Size and Social Group (ST/SC/OBC/Others)</li>
                  <li>Primary Household Occupation (NIC 2-digit)</li>
                  <li>Land Possessed / Asset Decile</li>
                </ul>
              </div>
            </div>
          )}

          {activeTopic === 'dpdp-safeguards' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-mono font-bold text-[#0B1F3A] bg-teal-50 px-2.5 py-1 rounded-md">
                  SOP-GOV-2026-04
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-2">
                  Digital Personal Data Protection (DPDP) Act 2023 Protocols
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Mandatory de-identification, k-anonymity, and statistical disclosure control.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                  <h4 className="font-extrabold text-slate-900">Direct Identifiers (Zero Tolerance)</h4>
                  <p className="text-slate-600">Aadhaar numbers, mobile numbers, citizen names, and voter IDs must be permanently expunged before central repository upload.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                  <h4 className="font-extrabold text-slate-900">k-Anonymity (k &ge; 5)</h4>
                  <p className="text-slate-600">Quasi-identifiers (Age, Gender, Sub-district, Social Group) must group at least 5 distinct individuals in any published tabulations.</p>
                </div>
              </div>
            </div>
          )}

          {activeTopic === 'cpi-price-audit' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-mono font-bold text-[#0B1F3A] bg-teal-50 px-2.5 py-1 rounded-md">
                  SOP-CPD-2026-05
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-2">
                  Consumer Price Index (CPI) Quotation Scrutiny & Substitution
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Price collection scrutiny for 1,181 rural markets and 1,114 urban markets.
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <p>
                  <strong>Price Relative Tolerance (0.80 to 1.25):</strong> If current price relative to previous month is outside this band, price collectors must provide a mandatory market reason code (e.g. seasonal supply disruption, local mandi closure, quality specification upgrade).
                </p>
                <p>
                  <strong>Specification Overlap Pricing:</strong> If an exact brand is permanently out of stock, simultaneous collection of old and replacement brand prices for 2 consecutive cycles is mandatory before base-price splicing.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

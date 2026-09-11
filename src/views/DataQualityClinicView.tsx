import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Stethoscope,
  AlertTriangle,
  CheckCircle2,
  Upload,
  RefreshCw,
  Search,
  Filter,
  ArrowRight,
  BookOpen,
  Sparkles,
  Info,
  ShieldCheck,
  Check,
  X,
  FileSpreadsheet,
  Database,
  Layers
} from 'lucide-react';

export const DataQualityClinicView: React.FC = () => {
  const { datasets, resolveDatasetIssue, setCurrentView, setSelectedCompetencyId } = useApp();
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>('ds_rural_employment');
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>('iss_1'); // default to Row 48 Age 187
  const [filterSeverity, setFilterSeverity] = useState<'All' | 'Critical' | 'Moderate' | 'Minor'>('All');
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const currentDataset = datasets.find(d => d.id === selectedDatasetId) || datasets[0];

  const filteredIssues = currentDataset.issues.filter(issue => {
    if (filterSeverity === 'All') return true;
    return issue.severity === filterSeverity;
  });

  const selectedIssue = currentDataset.issues.find(i => i.id === selectedIssueId);

  const handleSimulateUpload = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Signature Clinic Header - Spacious & Elegant Emerald */}
      <div className="bg-gradient-to-r from-white via-teal-50/50 to-white p-5 sm:p-7 md:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#0B1F3A] uppercase tracking-wider">
            <Stethoscope className="w-4 h-4 text-teal-700" />
            <span>Signature Capability Differentiator • Interactive Diagnostic Lab</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-1.5 tracking-tight">
            Data Quality Clinic
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            Real Work Mistake → AI Identifies It → AI Explains It → You Learn How to Fix It.
            Upload or inspect authentic practice datasets to detect impossible values (e.g. <strong>Age = 187</strong>), 
            logic anomalies, and illegal outliers before national statistical tabulation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={handleSimulateUpload}
            disabled={isScanning}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#0B1F3A] to-[#123B63] hover:from-[#123B63] text-white text-xs font-extrabold shadow-sm transition flex items-center gap-2 active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Running Diagnostic Rules...' : 'Re-Scan Dataset Rules'}</span>
          </button>
        </div>
      </div>

      {/* Dataset Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Active Survey File:</span>
        {datasets.map(ds => (
          <button
            key={ds.id}
            onClick={() => {
              setSelectedDatasetId(ds.id);
              setSelectedIssueId(ds.issues[0]?.id || null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
              selectedDatasetId === ds.id
                ? 'bg-[#0B1F3A] text-white border-[#123B63] shadow-xs'
                : 'bg-white hover:bg-teal-50/50 text-slate-700 border-slate-200'
            }`}
          >
            {ds.name} ({ds.issues.filter(i => i.status === 'unresolved').length} unresolved)
          </button>
        ))}
      </div>

      {/* Dataset Overview & Scorecard Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Data Quality Score Card */}
        <div className="p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Data Quality Score</span>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0B1F3A] border border-teal-200">
                OFFICIAL METRIC
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#0B1F3A]">{currentDataset.qualityScore}</span>
              <span className="text-xs text-slate-400 font-bold">/ 100</span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Target for certification: ≥ 95/100</p>
          </div>

          <div className="w-full bg-slate-100 h-2.5 rounded-full mt-4 overflow-hidden border border-slate-200/50">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                currentDataset.qualityScore >= 90 ? 'bg-teal-500' : 'bg-gradient-to-r from-[#0B1F3A] to-teal-600'
              }`}
              style={{ width: `${currentDataset.qualityScore}%` }}
            ></div>
          </div>
        </div>

        {/* Critical Issues */}
        <div className="p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Critical Anomalies</span>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping"></span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-rose-700">{currentDataset.criticalIssues}</span>
            <span className="text-xs text-slate-500 font-semibold">unresolved</span>
          </div>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            Blocks central ingestion into the NSSO repository until rectified.
          </p>
        </div>

        {/* Moderate Issues */}
        <div className="p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Moderate Issues</span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-600">{currentDataset.moderateIssues}</span>
            <span className="text-xs text-slate-500 font-semibold">unresolved</span>
          </div>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            Cross-variable bounds, date inconsistencies, outlier ratios.
          </p>
        </div>

        {/* Active Dataset Identity */}
        <div className="p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-sm">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Active Test File</span>
          <div className="mt-3 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-teal-700 shrink-0" />
            <span className="text-xs font-black text-slate-900 truncate">{currentDataset.name}</span>
          </div>
          <div className="mt-3 text-xs text-slate-500 space-y-1 font-medium">
            <div>Sector: <strong className="text-slate-700">{currentDataset.sector}</strong></div>
            <div>Records: <strong className="text-slate-700">{currentDataset.recordsCount}</strong> | Fields: <strong className="text-slate-700">{currentDataset.fieldsCount}</strong></div>
          </div>
        </div>
      </div>

      {/* Main Clinic Workspace: Table + Inspection Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Issues Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border-2 border-slate-200 shadow-sm overflow-hidden">
          {/* Filter toolbar */}
          <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-black text-slate-900">Detected Survey Errors & Outliers</h3>
              <p className="text-xs text-slate-500 mt-0.5">Click any row to view statistical diagnosis and apply approved fixes</p>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200 text-xs font-semibold">
              {(['All', 'Critical', 'Moderate', 'Minor'] as const).map(sev => (
                <button
                  key={sev}
                  onClick={() => setFilterSeverity(sev)}
                  className={`px-3 py-1 rounded-lg transition ${
                    filterSeverity === sev ? 'bg-white text-[#0B1F3A] shadow-xs font-extrabold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto w-full max-w-full">
            <table className="w-full min-w-[650px] text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 border-b border-slate-200/70">
                  <th className="py-3.5 px-5 font-bold">Row</th>
                  <th className="py-3.5 px-5 font-bold">Field / Variable</th>
                  <th className="py-3.5 px-5 font-bold">Observed Value</th>
                  <th className="py-3.5 px-5 font-bold">Error Type</th>
                  <th className="py-3.5 px-5 font-bold">Severity</th>
                  <th className="py-3.5 px-5 font-bold">Status</th>
                  <th className="py-3.5 px-5 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredIssues.map(issue => {
                  const isSelected = selectedIssueId === issue.id;
                  const isFixed = issue.status === 'fixed';

                  return (
                    <tr
                      key={issue.id}
                      onClick={() => setSelectedIssueId(issue.id)}
                      className={`cursor-pointer transition ${
                        isSelected
                          ? 'bg-teal-50/70 font-semibold'
                          : 'hover:bg-slate-50/80'
                      }`}
                    >
                      <td className="py-3.5 px-5 font-bold text-slate-900">#{issue.rowNumber}</td>
                      <td className="py-3.5 px-5 font-semibold text-slate-800">{issue.fieldName}</td>
                      <td className="py-3.5 px-5">
                        <code
                          className={`px-2.5 py-1 rounded text-xs font-mono ${
                            isFixed ? 'bg-teal-50 text-[#0B1F3A]' : 'bg-rose-50 text-rose-800 font-bold'
                          }`}
                        >
                          {issue.currentValue}
                        </code>
                      </td>
                      <td className="py-3.5 px-5 text-slate-600">{issue.issueType}</td>
                      <td className="py-3.5 px-5">
                        <span
                          className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                            issue.severity === 'Critical'
                              ? 'bg-rose-100 text-rose-800'
                              : issue.severity === 'Moderate'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {issue.severity}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        {isFixed ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Fixed</span>
                          </span>
                        ) : (
                          <span className="text-xs text-rose-700 font-bold">Unresolved</span>
                        )}
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        {!isFixed ? (
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              resolveDatasetIssue(currentDataset.id, issue.id);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-[#0B1F3A] hover:bg-[#123B63] text-white text-xs font-bold transition shadow-xs"
                          >
                            Rectify
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400 font-semibold">Logged</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Detailed Diagnostic Inspection & Learn Connection */}
        <div className="space-y-6">
          {selectedIssue ? (
            <div className="p-5 sm:p-7 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-black text-[#0B1F3A] uppercase tracking-wider">
                    Diagnostic Inspection
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-0.5">
                    Row {selectedIssue.rowNumber}: {selectedIssue.fieldName}
                  </h3>
                </div>
                <span
                  className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                    selectedIssue.status === 'fixed'
                      ? 'bg-teal-100 text-[#0B1F3A]'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {selectedIssue.status.toUpperCase()}
                </span>
              </div>

              {/* Observed vs Problem */}
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 block uppercase tracking-wider">
                  Observed Problem:
                </span>
                <div className="mt-1.5 p-3.5 rounded-2xl bg-rose-50/70 border border-rose-100 text-xs text-rose-900 font-medium leading-relaxed">
                  <strong>{selectedIssue.issueType}:</strong> {selectedIssue.explanation}
                </div>
              </div>

              {/* Recommended Action */}
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 block uppercase tracking-wider">
                  Recommended Official Action:
                </span>
                <p className="mt-1.5 text-xs text-slate-700 leading-relaxed">
                  {selectedIssue.recommendedAction}
                </p>
              </div>

              {/* Action Button */}
              {selectedIssue.status !== 'fixed' ? (
                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => resolveDatasetIssue(currentDataset.id, selectedIssue.id)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0B1F3A] to-[#123B63] hover:from-[#123B63] text-white text-xs font-black transition flex items-center justify-center gap-2 shadow-sm active:scale-95"
                  >
                    <Check className="w-4 h-4" />
                    <span>Apply Statistically Valid Fix ({selectedIssue.fixedValue})</span>
                  </button>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-[#0B1F3A] text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Verified and logged into official audit trail.</span>
                </div>
              )}

              {/* What You Should Learn next */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-2.5">
                  What You Should Learn Next:
                </span>
                <div className="space-y-2">
                  {currentDataset.recommendedLearning.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedCompetencyId('comp_data_quality');
                        setCurrentView('learning-map');
                      }}
                      className="p-3 rounded-2xl bg-slate-50 hover:bg-teal-50/70 text-slate-700 hover:text-[#0B1F3A] text-xs font-bold border border-slate-200/70 hover:border-teal-300 flex items-center justify-between cursor-pointer transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <BookOpen className="w-4 h-4 text-teal-700" />
                        <span>{item}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center text-slate-400">
              Select a row in the table to inspect data quality issues.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

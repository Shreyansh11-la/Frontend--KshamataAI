import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { scanTextForPii, PiiScanResult } from '../services/aiService';
import {
  ShieldCheck,
  AlertTriangle,
  Lock,
  Eye,
  CheckCircle2,
  RefreshCw,
  Copy,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export const SafeAIGuardView: React.FC = () => {
  const { addToast } = useApp();

  const sampleRawSnippet = `Respondent Schedule 10.2:
Interview conducted for Ramesh Kumar (Head of Household).
Contact Mobile: +91 9876543210.
Aadhaar Identifier Reference: 4829 1920 8374.
Location: Lat 28.6139° N, Long 77.2090° E.
Household reported Monthly Consumption of ₹14,500 with 4 family members.`;

  const [inputText, setInputText] = useState(sampleRawSnippet);
  const [scanResult, setScanResult] = useState<PiiScanResult | null>(() => scanTextForPii(sampleRawSnippet));
  const [isScanning, setIsScanning] = useState(false);

  const handleRunScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const res = scanTextForPii(inputText);
      setScanResult(res);
      if (res.hasPii) {
        addToast('Safe AI Check Alert', `Detected ${res.detectedEntities.length} direct or indirect identifiers under DPDP guidelines.`, 'warning');
      } else {
        addToast('Safe AI Check Passed', 'Zero citizen identifiers detected. Safe for AI ingestion.', 'success');
      }
    }, 600);
  };

  const handleApplyRedaction = () => {
    if (scanResult) {
      setInputText(scanResult.redactedText);
      setScanResult(scanTextForPii(scanResult.redactedText));
      addToast('Data Redacted & Anonymized', 'Personal identifiers replaced with DPDP-compliant pseudo-tokens.', 'success');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-white via-teal-50/50 to-white p-7 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#0B1F3A] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            <span>DPDP & Sovereignty Module • Safe AI Privacy Guard</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-1.5 tracking-tight">
            Safe AI Sovereign Guard
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
            A reassuring privacy checkpoint before datasets or schedules reach AI models. Aligned with India’s Digital
            Personal Data Protection (DPDP) Act to guarantee zero citizen personal data leakage.
          </p>
        </div>

        {/* Status Indicator Badge */}
        <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border-2 border-teal-200 shadow-xs shrink-0">
          <div
            className={`w-3.5 h-3.5 rounded-full ${
              scanResult?.hasPii ? 'bg-amber-500 animate-pulse' : 'bg-teal-500'
            }`}
          ></div>
          <div className="text-xs font-black text-slate-800">
            {scanResult?.hasPii ? 'Privacy Attention Required' : 'Certified Sovereign Clean'}
          </div>
        </div>
      </div>

      {/* Main Grid: Input + Scan Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Data Input & Scanner */}
        <div className="p-7 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="text-base font-black text-slate-900">Survey Schedule / Microdata Text</h3>
            <button
              onClick={() => {
                setInputText(sampleRawSnippet);
                setScanResult(scanTextForPii(sampleRawSnippet));
              }}
              className="text-xs font-bold text-[#0B1F3A] hover:text-[#0B1F3A] underline"
            >
              Reset Sample Record
            </button>
          </div>

          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            rows={8}
            className="w-full text-xs font-mono p-4 rounded-2xl bg-[#F8FAFC] border-2 border-slate-200 focus:outline-none focus:border-teal-500 leading-relaxed"
            placeholder="Paste survey microdata or physical schedule transcription here..."
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={handleRunScan}
              disabled={isScanning}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#0B1F3A] to-[#123B63] hover:from-[#123B63] text-white text-xs font-black transition flex items-center gap-2 shadow-sm active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Scanning Security Rules...' : 'Execute Safe AI Check'}</span>
            </button>

            {scanResult?.hasPii && (
              <button
                onClick={handleApplyRedaction}
                className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-2 shadow-xs"
              >
                <Lock className="w-4 h-4 text-teal-400" />
                <span>Auto-Redact All Identifiers</span>
              </button>
            )}
          </div>
        </div>

        {/* Right: Detected Entities & Safety Summary */}
        <div className="p-7 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="text-base font-black text-slate-900">Diagnostic Privacy Audit</h3>
            <span
              className={`text-xs font-black px-3 py-1 rounded-full ${
                scanResult?.hasPii ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-teal-100 text-[#0B1F3A] border border-teal-200'
              }`}
            >
              Safety Score: {scanResult?.score}/100
            </span>
          </div>

          <div
            className={`p-5 rounded-2xl border-2 text-xs leading-relaxed ${
              scanResult?.hasPii
                ? 'bg-amber-50/70 border-amber-200 text-amber-950 font-medium'
                : 'bg-teal-50/70 border-teal-200 text-[#0B1F3A] font-medium'
            }`}
          >
            <div className="flex items-center gap-2 font-black text-sm mb-1.5">
              {scanResult?.hasPii ? (
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
              )}
              <span>{scanResult?.summary}</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Direct and indirect identifiers are monitored against DPDP Section 6 guidelines to ensure sovereign compliance before any LLM processing.
            </p>
          </div>

          {/* Detected List */}
          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
              Detected Identifiers ({scanResult?.detectedEntities.length || 0}):
            </h4>

            {scanResult && scanResult.detectedEntities.length > 0 ? (
              <div className="space-y-2.5">
                {scanResult.detectedEntities.map((ent, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{ent.type}</span>
                        <span
                          className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${
                            ent.risk === 'Critical' ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {ent.risk} Risk
                        </span>
                      </div>
                      <div className="font-mono text-slate-500 text-xs mt-1">
                        Raw: <span className="line-through text-rose-700 font-semibold">{ent.rawSnippet}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 font-bold block">Masked Target:</span>
                      <code className="text-xs font-mono font-black text-[#0B1F3A]">{ent.maskedSnippet}</code>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-[#F8FAFC] text-center text-xs text-slate-500 font-semibold">
                ✓ No sensitive citizen personal information currently detected. Clean for safe AI.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

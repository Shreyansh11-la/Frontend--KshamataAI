import React from 'react';
import { useApp } from '../context/AppContext';
import {
  WifiOff,
  Wifi,
  Database,
  RefreshCw,
  CheckCircle2,
  Mic,
  BookOpen,
  ClipboardCheck,
  ShieldCheck,
  DownloadCloud,
  Layers,
  ArrowRight
} from 'lucide-react';

export const OfflineModeView: React.FC = () => {
  const { isOffline, toggleOffline, offlineQueueCount, syncOfflineData, isSyncing } = useApp();

  const offlineActivities = [
    { title: 'Micro-Lesson: CAPI Tablet In-Field Validation Checks', type: 'Lesson', size: '2.4 MB', status: 'Available Offline' },
    { title: 'Voice Question Prompt: Hindi / Bengali Audio Clarifications', type: 'Voice Prompt', size: '4.8 MB', status: 'Available Offline' },
    { title: 'Quiz Batch: Field Non-Response Recording & Callbacks', type: 'Assessment', size: '1.1 MB', status: 'Available Offline' },
    { title: 'Saved Offline Schedule Frame: District 74 Rural Block 3', type: 'Data Frame', size: '6.2 MB', status: 'Available Offline' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-white via-teal-50/50 to-white p-7 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#0B1F3A] uppercase tracking-wider">
            <WifiOff className="w-4 h-4 text-teal-700" />
            <span>Field Cadre Resilience • Remote District Offline Support</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-1.5 tracking-tight">
            Field Officer Offline Mode
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
            Statistical field enumeration takes place in remote blocks with low or zero cellular coverage.
            KshamataAI keeps micro-lessons, field validation checklists, and voice prompts locally accessible on officer tablets.
          </p>
        </div>

        {/* Network Toggle Button */}
        <button
          onClick={toggleOffline}
          className={`px-5 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-2 shadow-xs active:scale-95 shrink-0 ${
            isOffline
              ? 'bg-amber-500 hover:bg-amber-600 text-white font-black'
              : 'bg-white border-2 border-teal-200 hover:border-teal-400 text-slate-800'
          }`}
        >
          {isOffline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4 text-teal-600" />}
          <span>{isOffline ? 'Simulating Remote Block (Offline)' : 'Network Online (Connected)'}</span>
        </button>
      </div>

      {/* Sync Status Banner */}
      <div
        className={`p-7 rounded-3xl border-2 transition shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5 ${
          isOffline
            ? 'bg-amber-50/70 border-amber-200'
            : offlineQueueCount > 0
            ? 'bg-teal-50/80 border-teal-300'
            : 'bg-teal-50/60 border-teal-200'
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-xs shrink-0 ${
              isOffline ? 'bg-amber-500' : offlineQueueCount > 0 ? 'bg-[#0B1F3A]' : 'bg-teal-500'
            }`}
          >
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">
              {isOffline
                ? 'Field Device Operating in Autonomous Local Mode'
                : offlineQueueCount > 0
                ? `${offlineQueueCount} Field Activities Stored Locally (Pending Sync)`
                : 'Central SSS Grid Synchronized: Everything Up to Date'}
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {isOffline
                ? 'All quiz completions and dataset audit tags are stored securely in local SQLite/IndexedDB encrypted cache.'
                : offlineQueueCount > 0
                ? 'Device has detected an official network connection. Syncing will securely transmit encrypted batch logs to MoSPI server.'
                : 'Zero pending records. All field supervisory audit logs committed.'}
            </p>
          </div>
        </div>

        {offlineQueueCount > 0 && !isOffline && (
          <button
            onClick={syncOfflineData}
            disabled={isSyncing}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#0B1F3A] to-[#123B63] hover:from-[#123B63] disabled:opacity-50 text-white text-xs font-black transition flex items-center gap-2 shadow-sm shrink-0 active:scale-95"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing Progress...' : 'Sync Local Activities Now'}</span>
          </button>
        )}
      </div>

      {/* Available Offline Modules List */}
      <div className="bg-white p-7 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-slate-900">Cached Offline Training Assets</h3>
            <p className="text-xs text-slate-500 mt-0.5">Stored on field tablet for offline review during household visits</p>
          </div>
          <span className="text-xs font-black text-[#0B1F3A] bg-teal-50 px-3 py-1.5 rounded-full border border-teal-200">
            ✓ 14.5 MB Cached Locally
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {offlineActivities.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white text-[#0B1F3A] border border-teal-200 flex items-center justify-center shrink-0">
                  {item.type === 'Lesson' ? (
                    <BookOpen className="w-5 h-5 text-teal-700" />
                  ) : item.type === 'Voice Prompt' ? (
                    <Mic className="w-5 h-5 text-teal-700" />
                  ) : item.type === 'Assessment' ? (
                    <ClipboardCheck className="w-5 h-5 text-teal-700" />
                  ) : (
                    <Database className="w-5 h-5 text-teal-700" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 leading-snug">{item.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    {item.type} • {item.size}
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-black text-[#0B1F3A] bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200 shrink-0">
                Ready Offline
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

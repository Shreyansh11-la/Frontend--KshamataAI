import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockExperts } from '../data/mockData';
import { ExpertProfile } from '../types';
import {
  Users,
  MessageSquare,
  Sparkles,
  Search,
  CheckCircle2,
  Calendar,
  Send,
  X,
  Building,
  GraduationCap
} from 'lucide-react';

export const AskExpertView: React.FC = () => {
  const { addToast } = useApp();
  const [selectedExpert, setSelectedExpert] = useState<ExpertProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [inquiryTopic, setInquiryTopic] = useState('Household Outlier Resolution Protocol');
  const [inquiryDetails, setInquiryDetails] = useState('');
  const [isSending, setIsSending] = useState(false);

  const filteredExperts = mockExperts.filter(e => {
    const q = searchQuery.toLowerCase();
    return (
      e.name.toLowerCase().includes(q) ||
      e.department.toLowerCase().includes(q) ||
      e.specializations.some(t => t.toLowerCase().includes(q)) ||
      e.competencyFocus.some(t => t.toLowerCase().includes(q))
    );
  });

  const handleSendInquiry = () => {
    if (!selectedExpert) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      addToast(
        'Formal Cadre Inquiry Dispatched',
        `Routed to ${selectedExpert.name} (${selectedExpert.roleTitle}). Expected response: within 24 hours.`,
        'success'
      );
      setSelectedExpert(null);
      setInquiryDetails('');
    }, 900);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-white via-teal-50/50 to-white p-7 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#0B1F3A] uppercase tracking-wider">
            <Users className="w-4 h-4 text-teal-700" />
            <span>Cadre Wisdom • Senior Cadre Expert Mentorship Network</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-1.5 tracking-tight">
            Ask an Official Cadre Expert
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
            AI provides instant diagnostic assistance, but complex institutional jurisprudence and field dilemmas
            benefit from seasoned wisdom. Connect directly with senior MoSPI directors and methodologists.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by topic or cadre..."
            className="w-full text-xs pl-10 pr-4 py-3 rounded-2xl bg-white border-2 border-slate-200 focus:outline-none focus:border-teal-500 shadow-xs"
          />
        </div>
      </div>

      {/* Experts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredExperts.map(expert => (
          <div
            key={expert.id}
            className="p-7 rounded-3xl bg-white border-2 border-slate-200/80 hover:border-teal-400 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 text-[#0B1F3A] flex items-center justify-center font-black text-lg">
                  {expert.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <span className="text-[10px] font-black px-3 py-1 rounded-full bg-teal-100 text-[#0B1F3A] border border-teal-200">
                  {expert.availableSlot}
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900 mt-4">{expert.name}</h3>
              <p className="text-xs text-[#0B1F3A] font-black">{expert.roleTitle}</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">{expert.department}</p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  <span>{expert.experienceYears}+ Years Statistical Cadre Service</span>
                </div>
              </div>

              {/* Topics / Specializations Pills */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {expert.specializations.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedExpert(expert)}
              className="mt-6 w-full py-3 rounded-2xl bg-gradient-to-r from-[#0B1F3A] to-[#123B63] hover:from-[#123B63] text-white text-xs font-black transition flex items-center justify-center gap-2 shadow-xs active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Request Peer Consultation</span>
            </button>
          </div>
        ))}
      </div>

      {/* Structured Cadre Inquiry Modal */}
      {selectedExpert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-7 sm:p-8 shadow-2xl border-2 border-slate-200 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-black text-[#0B1F3A] uppercase tracking-wider">
                  Official Cadre Consultation Protocol
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">Consult with {selectedExpert.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  {selectedExpert.roleTitle} • {selectedExpert.department}
                </p>
              </div>
              <button
                onClick={() => setSelectedExpert(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Subject / Methodological Query:</label>
              <input
                type="text"
                value={inquiryTopic}
                onChange={e => setInquiryTopic(e.target.value)}
                className="w-full text-xs px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500 font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Detailed Technical Context:</label>
              <textarea
                value={inquiryDetails}
                onChange={e => setInquiryDetails(e.target.value)}
                placeholder="Describe the field anomaly, non-response impasse, or complex GDP deflator issue encountered..."
                rows={4}
                className="w-full text-xs p-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500 leading-relaxed font-normal"
              />
            </div>

            <div className="pt-3 flex justify-end gap-3">
              <button
                onClick={() => setSelectedExpert(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSendInquiry}
                disabled={isSending}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0B1F3A] to-[#123B63] hover:from-[#123B63] disabled:opacity-50 text-white text-xs font-black transition flex items-center gap-2 shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>{isSending ? 'Routing Query...' : 'Submit Cadre Query'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

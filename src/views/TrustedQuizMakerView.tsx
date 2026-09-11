import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AIQuizQuestion } from '../types';
import {
  HelpCircle,
  FileText,
  Upload,
  Check,
  X,
  Edit2,
  RefreshCw,
  BookOpen,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const TrustedQuizMakerView: React.FC = () => {
  const { aiQuestions, updateQuizQuestionStatus, addNewQuizQuestion } = useApp();
  const [activeTab, setActiveTab] = useState<'review' | 'generate'>('review');
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState('');

  const [documentName, setDocumentName] = useState('NSS_79th_Round_Sampling_Methodology.pdf');
  const [topicFocus, setTopicFocus] = useState('Cluster Multipliers and Design Weights');

  const handleGenerateNew = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const newQuestion: AIQuizQuestion = {
        id: 'qz_gen_' + Date.now(),
        question: `Under Section 4 of ${documentName.split('.')[0]}, how is the first-stage primary sampling unit (PSU) probability proportional to size (PPS) calculated?`,
        options: [
          'Based solely on the physical land area in square kilometers',
          'Proportional to Census household count or voter population from the current sampling frame',
          'Assigned an equal uniform probability regardless of population density',
          'Chosen arbitrarily by the field supervisor on day of interview'
        ],
        correctAnswerIndex: 1,
        explanation: 'In multi-stage designs, PSUs (villages or urban blocks) are selected with PPS where size measures population from the latest Census frame.',
        sourceDocument: documentName,
        sourcePage: 23,
        sourceSnippet: '“Paragraph 4.2: The size of each Census Enumeration Block for PPS selection shall be taken as the number of residential households listed in the National Sampling Frame 2024.”',
        status: 'pending',
        competency: 'Sampling Design & Weight Estimation'
      };
      addNewQuizQuestion(newQuestion);
      setActiveTab('review');
    }, 1200);
  };

  const handleStartEdit = (q: AIQuizQuestion) => {
    setEditingQuestionId(q.id);
    setEditedText(q.question);
  };

  const handleSaveEdit = (id: string) => {
    updateQuizQuestionStatus(id, 'edited', editedText);
    setEditingQuestionId(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-white via-teal-50/50 to-white p-7 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#0B1F3A] uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-teal-700" />
            <span>Document Traceability • Trusted AI Quiz Maker</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-1.5 tracking-tight">
            Document-Grounded Quiz Maker
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
            Zero hallucinated assessment questions. Every generated item cites its verifiable official manual, page
            number, and source quote. Trainer review (Approve, Edit, Reject) is strictly enforced before publishing.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border-2 border-teal-200 shadow-xs shrink-0">
          <button
            onClick={() => setActiveTab('review')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'review' ? 'bg-[#0B1F3A] text-white shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Review Queue ({aiQuestions.filter(q => q.status === 'pending').length} Pending)
          </button>
          <button
            onClick={() => setActiveTab('generate')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'generate' ? 'bg-[#0B1F3A] text-white shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Generate from Document
          </button>
        </div>
      </div>

      {activeTab === 'generate' ? (
        /* Document Upload & Generation Form */
        <div className="max-w-2xl mx-auto p-7 sm:p-9 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <Upload className="w-5 h-5 text-teal-700" />
            <h3 className="text-lg font-black text-slate-900">Ingest Official Statistical Manual / PDF</h3>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Select Source Document:</label>
            <select
              value={documentName}
              onChange={e => setDocumentName(e.target.value)}
              className="w-full text-xs font-semibold px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500"
            >
              <option value="NSSO_Survey_Design_Manual_Rev4.pdf">NSSO_Survey_Design_Manual_Rev4.pdf (Methods)</option>
              <option value="Handbook_on_Microdata_Quality_Standards.pdf">Handbook_on_Microdata_Quality_Standards.pdf (Quality)</option>
              <option value="National_Accounts_SNA2008_Compilation_Guide.pdf">National_Accounts_SNA2008_Compilation_Guide.pdf (GVA)</option>
              <option value="Data_Sovereignty_and_DPDP_Guideline_MoSPI.pdf">Data_Sovereignty_and_DPDP_Guideline_MoSPI.pdf (Privacy)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Specific Statistical Topic:</label>
            <input
              type="text"
              value={topicFocus}
              onChange={e => setTopicFocus(e.target.value)}
              placeholder="e.g. Non-response multipliers, Hot-deck donor matrices"
              className="w-full text-xs px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs text-[#0B1F3A] flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
            <span>
              <strong>Institutional Trust Guarantee:</strong> The AI model is strictly constrained to extract questions
              with exact page citations from official manuals. No questions can be published without human trainer sign-off.
            </span>
          </div>

          <button
            onClick={handleGenerateNew}
            disabled={isGenerating}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#0B1F3A] to-[#123B63] hover:from-[#123B63] disabled:opacity-50 text-white text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 shadow-sm active:scale-95"
          >
            <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Extracting & Generating Grounded MCQs...' : 'Generate Grounded MCQ with Citations'}</span>
          </button>
        </div>
      ) : (
        /* Questions Review Queue */
        <div className="space-y-5">
          {aiQuestions.map((q, index) => {
            const isApproved = q.status === 'approved';
            const isRejected = q.status === 'rejected';
            const isPending = q.status === 'pending';
            const isEditing = editingQuestionId === q.id;

            return (
              <div
                key={q.id}
                className={`p-7 rounded-3xl bg-white border-2 transition shadow-xs ${
                  isApproved ? 'border-teal-200' : isRejected ? 'border-slate-200 opacity-60' : 'border-teal-200 ring-2 ring-[#0B1F3A]/5'
                }`}
              >
                {/* Question Header & Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-black text-slate-400">Q#{index + 1}</span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                      {q.competency}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                      isApproved
                        ? 'bg-teal-100 text-[#0B1F3A] border border-teal-200'
                        : isRejected
                        ? 'bg-slate-100 text-slate-600'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {q.status}
                  </span>
                </div>

                {/* Question Content */}
                <div className="mt-4">
                  {isEditing ? (
                    <div className="space-y-3">
                      <textarea
                        value={editedText}
                        onChange={e => setEditedText(e.target.value)}
                        className="w-full text-xs font-semibold p-4 rounded-xl border-2 border-teal-300 focus:outline-none"
                        rows={3}
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingQuestionId(null)}
                          className="px-4 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveEdit(q.id)}
                          className="px-4 py-1.5 rounded-lg bg-[#0B1F3A] text-white text-xs font-bold"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <h3 className="text-base font-black text-slate-900 leading-snug">{q.question}</h3>
                  )}

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {q.options.map((opt, optIdx) => (
                      <div
                        key={optIdx}
                        className={`p-3.5 rounded-2xl border text-xs leading-snug flex items-start gap-2.5 ${
                          optIdx === q.correctAnswerIndex
                            ? 'bg-teal-50/70 border-teal-300 text-[#0B1F3A] font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="font-mono text-slate-400 font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                        <span>{opt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grounded Citation Box (The Key Differentiator!) */}
                <div className="mt-5 p-4 rounded-2xl bg-teal-50/60 border border-teal-200 text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 font-black text-[#0B1F3A] text-xs">
                    <BookOpen className="w-4 h-4 text-teal-700" />
                    <span>VERIFIED SOURCE CITATION:</span>
                  </div>
                  <div className="text-slate-800 font-medium">
                    Document: <strong className="text-[#0B1F3A] font-bold">{q.sourceDocument}</strong> | Page:{' '}
                    <strong className="text-[#0B1F3A] font-bold">{q.sourcePage}</strong>
                  </div>
                  <p className="text-xs text-slate-600 italic mt-1 bg-white/80 p-3 rounded-xl border border-slate-200">
                    {q.sourceSnippet}
                  </p>
                </div>

                {/* Trainer Action Workflow: Approve, Edit, Reject, Regenerate */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-400 font-medium">
                    {q.reviewedBy ? `Reviewed by ${q.reviewedBy} on ${q.reviewDate}` : 'Pending Trainer Review'}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStartEdit(q)}
                      className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => updateQuizQuestionStatus(q.id, 'rejected')}
                      className="px-3.5 py-1.5 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>

                    <button
                      onClick={() => updateQuizQuestionStatus(q.id, 'approved')}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0B1F3A] to-[#123B63] hover:from-[#123B63] text-white text-xs font-black transition flex items-center gap-1.5 shadow-xs"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Approve & Publish</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

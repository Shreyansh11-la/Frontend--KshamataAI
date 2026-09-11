import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ClipboardCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Award,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AssessmentsView: React.FC = () => {
  const { updateCompetencyLevel, addToast, setCurrentView } = useApp();
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sampleAssessment = {
    id: 'asmt_1',
    title: 'NSS 79th Round Data Validation Benchmark',
    competency: 'Data Quality & Validation',
    questionsCount: 1,
    timeLimit: '5 mins',
    question: 'When an enumerator notes zero consumption of staple cereals in an occupied rural household with 5 members over 30 days, what is the mandatory statistical validation protocol?',
    options: [
      'Accept the entry as-is without question to respect respondent autonomy.',
      'Trigger an automatic high-severity validation flag for re-interview or explicit supervisory justification.',
      'Silently impute the state average value without logging a donor trace.',
      'Delete the entire household questionnaire from the district dataset.'
    ],
    correctAnswer: 1,
    explanation: 'Zero consumption of staple food items over a 30-day recall period represents an extreme physiological anomaly that must be flagged for immediate field supervisor verification.'
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setIsSubmitted(true);
    if (selectedAnswer === sampleAssessment.correctAnswer) {
      updateCompetencyLevel('comp_data_quality', 12);
      addToast('Assessment Passed!', 'Data Quality competency increased by +12%.', 'success');
      try {
        confetti({ particleCount: 70, spread: 60 });
      } catch {}
    } else {
      addToast('Incorrect Protocol Choice', 'Review the statistical rationale to rectify the gap.', 'warning');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-white via-teal-50/50 to-white p-7 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#0B1F3A] uppercase tracking-wider">
            <ClipboardCheck className="w-4 h-4 text-teal-700" />
            <span>Cadre Competency Assessments</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-1.5 tracking-tight">
            Diagnostic & Certification Tests
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
            Short, focused assessments mapped to NSSCF standards. Results directly calibrate your competency scores and
            identify specific learning recommendations.
          </p>
        </div>
      </div>

      {/* Main Assessment Container */}
      <div className="max-w-3xl mx-auto">
        <div className="p-7 sm:p-9 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-black px-3 py-1 rounded-full bg-teal-50 text-[#0B1F3A] uppercase tracking-wider border border-teal-200">
                {sampleAssessment.competency}
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-2">{sampleAssessment.title}</h2>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
              <Clock className="w-4 h-4 text-teal-700" />
              <span>{sampleAssessment.timeLimit}</span>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900 leading-relaxed mb-5">
              {sampleAssessment.question}
            </h3>

            <div className="space-y-3">
              {sampleAssessment.options.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (!isSubmitted) setSelectedAnswer(idx);
                    }}
                    className={`p-4 rounded-2xl border-2 transition cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-teal-50/80 border-teal-500 ring-2 ring-[#0B1F3A]/10'
                        : 'bg-white border-slate-200 hover:border-teal-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'border-[#0B1F3A] bg-[#0B1F3A] text-white' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">{opt}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {!isSubmitted ? (
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="px-7 py-3 rounded-2xl bg-gradient-to-r from-[#0B1F3A] to-[#123B63] hover:from-[#123B63] disabled:opacity-40 text-white text-xs sm:text-sm font-black transition shadow-xs active:scale-95"
              >
                Submit Diagnostic Response
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div
                className={`p-5 rounded-2xl border-2 text-xs sm:text-sm leading-relaxed ${
                  selectedAnswer === sampleAssessment.correctAnswer
                    ? 'bg-teal-50 border-teal-200 text-[#0B1F3A]'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                <strong className="font-black">
                  {selectedAnswer === sampleAssessment.correctAnswer ? 'Correct Evaluation:' : 'Incorrect Evaluation:'}
                </strong>{' '}
                {sampleAssessment.explanation}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setCurrentView('data-clinic')}
                  className="px-6 py-2.5 rounded-xl bg-[#0B1F3A] hover:bg-[#123B63] text-white text-xs font-bold transition shadow-xs active:scale-95"
                >
                  Practice in Data Clinic
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

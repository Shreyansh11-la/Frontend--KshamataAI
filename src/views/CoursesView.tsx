import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Course } from '../types';
import {
  BookOpen,
  ArrowRight,
  Sparkles,
  Clock,
  Star,
  Users,
  CheckCircle2,
  Play,
  X,
  Award
} from 'lucide-react';

export const CoursesView: React.FC = () => {
  const { courses, completeCourseModule, setCurrentView } = useApp();
  const [activeCoursePlayer, setActiveCoursePlayer] = useState<Course | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-white via-teal-50/50 to-white p-7 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#0B1F3A] uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-teal-700" />
            <span>Targeted Curricula • Competency-Driven Learning</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-1.5 tracking-tight">
            Targeted Learning Hub
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
            Every module addresses an active competency shortfall. We show transparently why you are seeing each course
            and how many percentage points it will elevate your workplace capability.
          </p>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map(course => {
          return (
            <div
              key={course.id}
              className="p-7 rounded-3xl bg-white border-2 border-slate-200/80 hover:border-teal-400 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                    {course.category} • {course.level}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-black text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <h3 className="text-lg font-black text-slate-900 leading-snug">{course.title}</h3>

                {/* Why recommended highlight */}
                <div className="mt-4 p-4 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs text-[#0B1F3A]">
                  <div className="flex items-center gap-1.5 font-black mb-1 text-xs text-[#0B1F3A]">
                    <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                    <span>WHY RECOMMENDED:</span>
                  </div>
                  <p className="font-medium text-slate-700 leading-relaxed">{course.whyRecommended}</p>
                </div>

                {/* Practical Application */}
                <p className="mt-4 text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-800 font-bold">Workplace Impact: </strong>
                  {course.practicalApplication}
                </p>

                {/* Competency Impact Pill */}
                <div className="mt-4 flex items-center justify-between text-xs py-2.5 px-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <span className="text-slate-500 font-medium">Competency Lift:</span>
                  <span className="font-black text-[#0B1F3A]">
                    {course.competencyName} (+{course.competencyDelta}%)
                  </span>
                </div>
              </div>

              {/* Action Button & Meta */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="text-xs text-slate-500 flex items-center gap-3 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {course.duration}
                  </span>
                  <span>{course.modulesCount} modules</span>
                </div>

                <button
                  onClick={() => setActiveCoursePlayer(course)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0B1F3A] to-[#123B63] hover:from-[#123B63] text-white text-xs font-black transition flex items-center gap-2 shadow-xs active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{course.progress ? 'Continue Module' : 'Start Learning'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Course Player Modal */}
      {activeCoursePlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-7 sm:p-8 shadow-2xl border-2 border-slate-200 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-black text-[#0B1F3A] uppercase tracking-wider">
                  Interactive Micro-Lesson
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">{activeCoursePlayer.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">{activeCoursePlayer.instructors}</p>
              </div>
              <button
                onClick={() => setActiveCoursePlayer(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lesson Simulation Content */}
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-xs leading-relaxed space-y-3.5">
              <h4 className="font-black text-slate-900 text-sm">
                Module 2: Diagnostic Verification and Cross-Variable Logic Bounds
              </h4>
              <p className="text-slate-700 font-normal">
                In official socioeconomic surveys (NSS Rounds), raw schedules contain both human enumerator recording errors
                and systemic non-sampling errors. A core protocol is checking logical relationships:
              </p>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 font-mono text-xs text-slate-800 space-y-1">
                <div>1. IF age &lt; 5 AND literacy == 'Literate' -&gt; FLAG FOR VERIFICATION</div>
                <div>2. IF monthly_expenditure &lt; 0 -&gt; FLAG CRITICAL (Impossible negative)</div>
                <div>3. IF respondent_age &gt; 115 -&gt; FLAG CRITICAL (Biological outlier)</div>
              </div>
              <p className="text-slate-700 font-normal">
                Rather than discarding incomplete questionnaires, apply Hot-Deck Imputation using verified donor cells within the
                same rural district stratum to preserve natural economic distributions.
              </p>
            </div>

            <div className="pt-3 flex items-center justify-between">
              <div className="text-xs font-bold text-slate-500">
                Earn: <span className="text-[#0B1F3A] font-black">+{activeCoursePlayer.competencyDelta}% Competency</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    completeCourseModule(activeCoursePlayer.id);
                    setActiveCoursePlayer(null);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0B1F3A] to-[#123B63] hover:from-[#123B63] text-white text-xs font-black transition flex items-center gap-2 shadow-xs active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Complete Lesson & Log Capability Lift</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

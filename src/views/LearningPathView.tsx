import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockLearningPath } from '../data/mockData';
import { LearningPathNode } from '../types';
import {
  Route,
  CheckCircle2,
  Lock,
  Play,
  Sparkles,
  Clock,
  ArrowRight,
  Target,
  BookOpen
} from 'lucide-react';

export const LearningPathView: React.FC = () => {
  const { setCurrentView, setSelectedCompetencyId } = useApp();
  const [selectedNode, setSelectedNode] = useState<LearningPathNode>(mockLearningPath[2]); // default to Stage 3 Recommended Next

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-white via-teal-50/50 to-white p-7 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#0B1F3A] uppercase tracking-wider">
            <Route className="w-4 h-4 text-teal-700" />
            <span>Visual Progression • Visual Competency Journey</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-1.5 tracking-tight">
            Personalized Learning Path
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
            A dynamic sequence connecting institutional fundamentals with targeted skill-gap resolution and capstone
            certification.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-slate-700 bg-white p-3 rounded-2xl border-2 border-teal-200 shadow-xs shrink-0">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span> Completed
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0B1F3A] animate-ping"></span> Recommended Next
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Locked
          </span>
        </div>
      </div>

      {/* Main Layout: Journey Pipeline + Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Journey Pipeline */}
        <div className="lg:col-span-2 space-y-5">
          {mockLearningPath.map((node, index) => {
            const isSelected = selectedNode.id === node.id;
            const isCompleted = node.status === 'completed';
            const isRecommended = node.status === 'recommended_next';
            const isInProgress = node.status === 'in_progress';
            const isLocked = node.status === 'locked';

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`relative p-6 sm:p-7 rounded-3xl border-2 transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-5 ${
                  isRecommended
                    ? 'bg-teal-50/70 border-teal-400 ring-4 ring-[#0B1F3A]/5 shadow-md'
                    : isSelected
                    ? 'bg-white border-teal-300 shadow-sm'
                    : 'bg-white border-slate-200/80 hover:border-teal-300'
                }`}
              >
                {/* Left Node Indicator & Info */}
                <div className="flex items-start gap-4">
                  {/* Status Icon */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-bold text-sm ${
                      isCompleted
                        ? 'bg-teal-100 text-[#0B1F3A] border border-teal-200'
                        : isRecommended
                        ? 'bg-[#0B1F3A] text-white shadow-sm ring-4 ring-teal-200'
                        : isInProgress
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-700" />
                    ) : isRecommended ? (
                      <Play className="w-5 h-5 fill-white" />
                    ) : isLocked ? (
                      <Lock className="w-5 h-5" />
                    ) : (
                      <span>#{node.stepNumber}</span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        {node.stageName}
                      </span>
                      {isRecommended && (
                        <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#0B1F3A] text-white uppercase tracking-wide">
                          RECOMMENDED NEXT
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-black text-slate-900 mt-1">{node.title}</h3>
                    <p className="text-xs text-[#0B1F3A] font-bold mt-0.5">{node.competency}</p>
                  </div>
                </div>

                {/* Right Progress Stats */}
                <div className="flex items-center sm:flex-col sm:items-end justify-between gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                  <div className="text-xs font-bold text-slate-700">
                    <span>Target: </span>
                    <strong className="text-[#0B1F3A] font-black">{node.targetLevel}%</strong>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{node.effort}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 1 Col: Stage Detail Inspector */}
        <div className="space-y-6">
          <div className="p-7 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  {selectedNode.stageName}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">{selectedNode.title}</h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-normal">{selectedNode.description}</p>

            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Current Capability:</span>
                <span className="font-bold text-slate-900">{selectedNode.currentLevel}%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Milestone Goal:</span>
                <span className="font-black text-[#0B1F3A]">{selectedNode.targetLevel}%</span>
              </div>
              <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-teal-200">
                <div
                  className="bg-[#0B1F3A] h-full rounded-full"
                  style={{ width: `${(selectedNode.currentLevel / selectedNode.targetLevel) * 100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-2.5">
                Core Capabilities Gained:
              </span>
              <div className="space-y-2">
                {selectedNode.skillsGained.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-[#0B1F3A] shrink-0"></span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  if (selectedNode.id === 'step_3') {
                    setCurrentView('data-clinic');
                  } else {
                    setCurrentView('courses');
                  }
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#0B1F3A] to-[#123B63] hover:from-[#123B63] text-white text-xs font-black transition flex items-center justify-center gap-2 shadow-xs active:scale-95"
              >
                <span>Launch Stage Learning & Practice</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

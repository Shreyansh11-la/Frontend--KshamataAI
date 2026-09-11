import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { ToastContainer } from './components/layout/ToastContainer';
import { ContextualAIAssistant } from './components/ai/ContextualAIAssistant';
import { GuidedDemoModal } from './components/demo/GuidedDemoModal';

// Views
import { LandingView } from './views/LandingView';
import { DashboardView } from './views/DashboardView';
import { CompetencyProfileView } from './views/CompetencyProfileView';
import { SkillGapView } from './views/SkillGapView';
import { LearningMapView } from './views/LearningMapView';
import { LearningPathView } from './views/LearningPathView';
import { DataQualityClinicView } from './views/DataQualityClinicView';
import { WorkSimulatorView } from './views/WorkSimulatorView';
import { CoursesView } from './views/CoursesView';
import { AssessmentsView } from './views/AssessmentsView';
import { TrustedQuizMakerView } from './views/TrustedQuizMakerView';
import { SafeAIGuardView } from './views/SafeAIGuardView';
import { OfflineModeView } from './views/OfflineModeView';
import { PolicyLabView } from './views/PolicyLabView';
import { LearningProofView } from './views/LearningProofView';
import { AskExpertView } from './views/AskExpertView';
import { AdminSkillRiskView } from './views/AdminSkillRiskView';
import { ProfileView } from './views/ProfileView';
import { LoginView } from './views/LoginView';
import { CircularsView } from './views/CircularsView';
import { SOPKnowledgeBaseView } from './views/SOPKnowledgeBaseView';
import { AcademiesView } from './views/AcademiesView';
import { Footer } from './components/layout/Footer';

const MainLayout: React.FC = () => {
  const {
    currentView,
    sidebarCollapsed,
    sidebarMobileOpen,
    setSidebarMobileOpen
  } = useApp();

  // If on landing view, render grand full-bleed portal layout
  if (currentView === 'landing') {
    return (
      <div id="kshamata-app" className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans w-full max-w-full overflow-x-hidden">
        <Navbar />
        <main className="flex-1 w-full max-w-full overflow-x-hidden">
          <LandingView />
        </main>
        <Footer />
        <ToastContainer />
        <ContextualAIAssistant />
        <GuidedDemoModal />
      </div>
    );
  }

  // If on login view, render clean institutional single sign-on layout
  if (currentView === 'login') {
    return (
      <div id="kshamata-app" className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans w-full max-w-full overflow-x-hidden">
        <Navbar />
        <main className="flex-1 w-full max-w-full overflow-x-hidden">
          <LoginView />
        </main>
        <Footer />
        <ToastContainer />
        <ContextualAIAssistant />
        <GuidedDemoModal />
      </div>
    );
  }

  // Workspaces layout: expansive width with persistent dynamic Sidebar
  return (
    <div id="kshamata-app" className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans w-full max-w-full overflow-x-hidden">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row max-w-[1600px] w-full mx-auto px-3 sm:px-6 lg:px-10 py-4 sm:py-8 gap-6 lg:gap-8 min-w-0">
        {/* Persistent Left Sidebar - Supports full w-72 or collapsed mini w-20 */}
        <div
          className={`hidden lg:block shrink-0 transition-all duration-300 ${
            sidebarCollapsed ? 'w-20' : 'w-72'
          }`}
        >
          <div className="sticky top-24">
            <Sidebar />
          </div>
        </div>

        {/* Mobile Slide-In Sidebar Drawer */}
        {sidebarMobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
              onClick={() => setSidebarMobileOpen(false)}
            />
            <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl p-4 overflow-y-auto z-10 animate-in slide-in-from-left duration-200">
              <Sidebar isMobile onClose={() => setSidebarMobileOpen(false)} />
            </div>
          </div>
        )}

        {/* Expansive Main Content Workspace */}
        <main className="flex-1 min-w-0 pb-12 w-full max-w-full">
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'competencies' && <CompetencyProfileView />}
          {currentView === 'skill-gaps' && <SkillGapView />}
          {currentView === 'learning-map' && <LearningMapView />}
          {currentView === 'learning-path' && <LearningPathView />}
          {currentView === 'data-clinic' && <DataQualityClinicView />}
          {currentView === 'simulations' && <WorkSimulatorView />}
          {currentView === 'courses' && <CoursesView />}
          {currentView === 'assessments' && <AssessmentsView />}
          {currentView === 'quiz-maker' && <TrustedQuizMakerView />}
          {currentView === 'safe-guard' && <SafeAIGuardView />}
          {currentView === 'offline-mode' && <OfflineModeView />}
          {currentView === 'policy-lab' && <PolicyLabView />}
          {currentView === 'proof' && <LearningProofView />}
          {currentView === 'expert-match' && <AskExpertView />}
          {currentView === 'admin-risk-map' && <AdminSkillRiskView />}
          {currentView === 'profile' && <ProfileView />}
          {currentView === 'circulars' && <CircularsView />}
          {currentView === 'sop-library' && <SOPKnowledgeBaseView />}
          {currentView === 'academies' && <AcademiesView />}
        </main>
      </div>

      <Footer />
      <ToastContainer />
      <ContextualAIAssistant />
      <GuidedDemoModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

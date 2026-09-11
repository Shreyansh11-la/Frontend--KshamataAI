import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  UserProfile,
  CompetencyItem,
  DataQualityDataset,
  DataQualityIssue,
  SimulationScenario,
  AIQuizQuestion,
  Course
} from '../types';
import {
  mockLearnerProfile,
  mockAdminProfile,
  mockCompetencies,
  mockDataQualityDatasets,
  mockSimulations,
  mockAIQuizQuestions,
  mockCourses
} from '../data/mockData';
import confetti from 'canvas-confetti';

export type AppView =
  | 'landing'
  | 'about'
  | 'how-it-works'
  | 'why-kshamata'
  | 'features'
  | 'impact'
  | 'login'
  | 'dashboard'
  | 'competencies'
  | 'skill-gaps'
  | 'learning-map'
  | 'learning-path'
  | 'courses'
  | 'assessments'
  | 'data-clinic'
  | 'simulations'
  | 'quiz-maker'
  | 'safe-guard'
  | 'offline-mode'
  | 'policy-lab'
  | 'proof'
  | 'expert-match'
  | 'admin-risk-map'
  | 'profile'
  | 'circulars'
  | 'sop-library'
  | 'academies';

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  switchUserRole: (role: 'learner' | 'admin') => void;
  isAuthenticated: boolean;
  login: (role?: 'learner' | 'admin', customData?: Partial<UserProfile>) => void;
  logout: () => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  sidebarMobileOpen: boolean;
  setSidebarMobileOpen: (open: boolean) => void;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedCompetencyId: string;
  setSelectedCompetencyId: (id: string) => void;
  competencies: CompetencyItem[];
  updateCompetencyLevel: (id: string, delta: number) => void;
  datasets: DataQualityDataset[];
  resolveDatasetIssue: (datasetId: string, issueId: string, resolvedValue?: string) => void;
  simulations: SimulationScenario[];
  aiQuestions: AIQuizQuestion[];
  updateQuizQuestionStatus: (id: string, status: 'approved' | 'rejected' | 'edited', newQuestionText?: string) => void;
  addNewQuizQuestion: (question: AIQuizQuestion) => void;
  courses: Course[];
  completeCourseModule: (courseId: string) => void;
  isOffline: boolean;
  toggleOffline: () => void;
  offlineQueueCount: number;
  syncOfflineData: () => Promise<void>;
  isSyncing: boolean;
  toasts: ToastNotification[];
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  showAIAssistant: boolean;
  setShowAIAssistant: (show: boolean) => void;
  aiContext: string;
  setAIContext: (ctx: string) => void;
  // Guided Demo Journey
  isDemoActive: boolean;
  demoStep: number;
  startGuidedDemo: () => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
  exitGuidedDemo: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(mockLearnerProfile);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState<boolean>(false);
  const [selectedCompetencyId, setSelectedCompetencyId] = useState<string>('comp_data_quality');
  const [competencies, setCompetencies] = useState<CompetencyItem[]>(mockCompetencies);
  const [datasets, setDatasets] = useState<DataQualityDataset[]>(mockDataQualityDatasets);
  const [simulations] = useState<SimulationScenario[]>(mockSimulations);
  const [aiQuestions, setAiQuestions] = useState<AIQuizQuestion[]>(mockAIQuizQuestions);
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [offlineQueueCount, setOfflineQueueCount] = useState<number>(12);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [showAIAssistant, setShowAIAssistant] = useState<boolean>(false);
  const [aiContext, setAIContext] = useState<string>('General Competency Overview');

  // Guided demo state
  const [isDemoActive, setIsDemoActive] = useState<boolean>(false);
  const [demoStep, setDemoStep] = useState<number>(0);

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setCurrentUser(prev => ({
      ...prev,
      ...updates
    }));
    addToast('Profile Updated', 'Official cadre record details updated successfully.', 'success');
  };

  const login = (role: 'learner' | 'admin' = 'learner', customData?: Partial<UserProfile>) => {
    setIsAuthenticated(true);
    if (role === 'admin') {
      setCurrentUser({ ...mockAdminProfile, ...customData });
      setCurrentView('admin-risk-map');
      addToast('Parichay SSO Success', 'Authenticated as Dr. Rajiv Menon (Joint Director General, ISS)', 'success');
    } else {
      setCurrentUser({ ...mockLearnerProfile, ...customData });
      setCurrentView('dashboard');
      addToast('Parichay SSO Success', 'Authenticated as Ananya Sharma (Statistical Officer, NSSO)', 'success');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentView('login');
    addToast('Securely Signed Out', 'Your session has been terminated in compliance with DPDP standards.', 'info');
  };

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = 'toast_' + Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const switchUserRole = (role: 'learner' | 'admin') => {
    if (role === 'admin') {
      setCurrentUser(mockAdminProfile);
      setCurrentView('admin-risk-map');
      addToast('Role Switched', 'Viewing platform as Dr. Rajiv Menon (Joint Director General, ISS)', 'info');
    } else {
      setCurrentUser(mockLearnerProfile);
      setCurrentView('dashboard');
      addToast('Role Switched', 'Viewing platform as Ananya Sharma (Statistical Officer, NSSO)', 'info');
    }
  };

  const updateCompetencyLevel = (id: string, delta: number) => {
    setCompetencies(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newLevel = Math.min(100, Math.max(0, item.currentLevel + delta));
          const newGap = Math.max(0, item.requiredLevel - newLevel);
          const newPriority = newGap > 25 ? 'HIGH' : newGap > 10 ? 'MEDIUM' : 'LOW';
          return {
            ...item,
            currentLevel: newLevel,
            gap: newGap,
            priority: newPriority
          };
        }
        return item;
      })
    );

    // Also update user's overall readiness
    setCurrentUser(prev => {
      const newReadiness = Math.min(100, prev.overallReadiness + Math.round(delta * 0.4));
      return {
        ...prev,
        overallReadiness: newReadiness,
        readinessDelta: prev.readinessDelta + 2
      };
    });

    if (delta > 0) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#b91c1c', '#dc2626', '#f87171', '#ffffff']
        });
      } catch {
        // silent fail if canvas not ready
      }
    }
  };

  const resolveDatasetIssue = (datasetId: string, issueId: string, resolvedValue?: string) => {
    setDatasets(prev =>
      prev.map(ds => {
        if (ds.id === datasetId) {
          const updatedIssues: DataQualityIssue[] = ds.issues.map(iss => {
            if (iss.id === issueId) {
              return {
                ...iss,
                status: 'fixed' as const,
                currentValue: resolvedValue || iss.fixedValue || iss.currentValue
              };
            }
            return iss;
          });

          const fixedCount = updatedIssues.filter(i => i.status === 'fixed').length;
          const scoreDelta = Math.round((fixedCount / updatedIssues.length) * 28);
          const newScore = Math.min(100, 72 + scoreDelta);

          return {
            ...ds,
            qualityScore: newScore,
            criticalIssues: updatedIssues.filter(i => i.severity === 'Critical' && i.status !== 'fixed').length,
            moderateIssues: updatedIssues.filter(i => i.severity === 'Moderate' && i.status !== 'fixed').length,
            minorIssues: updatedIssues.filter(i => i.severity === 'Minor' && i.status !== 'fixed').length,
            issues: updatedIssues
          };
        }
        return ds;
      })
    );

    // Boost competency slightly
    updateCompetencyLevel('comp_data_quality', 4);
    addToast('Data Quality Issue Rectified', 'Imputation logged with audit trail. Data Quality score updated!', 'success');
  };

  const updateQuizQuestionStatus = (id: string, status: 'approved' | 'rejected' | 'edited', newQuestionText?: string) => {
    setAiQuestions(prev =>
      prev.map(q => {
        if (q.id === id) {
          return {
            ...q,
            status,
            question: newQuestionText || q.question,
            reviewedBy: currentUser.name,
            reviewDate: new Date().toISOString().split('T')[0]
          };
        }
        return q;
      })
    );
    addToast('Quiz Item Audited', `Question status marked as "${status.toUpperCase()}" with document citation preserved.`, 'info');
  };

  const addNewQuizQuestion = (question: AIQuizQuestion) => {
    setAiQuestions(prev => [question, ...prev]);
    addToast('New AI Question Generated', `Grounded in ${question.sourceDocument} (Page ${question.sourcePage})`, 'success');
  };

  const completeCourseModule = (courseId: string) => {
    setCourses(prev =>
      prev.map(c => {
        if (c.id === courseId) {
          const newProgress = Math.min(100, (c.progress || 0) + 35);
          const isDone = newProgress >= 100;
          return {
            ...c,
            progress: newProgress,
            completed: isDone
          };
        }
        return c;
      })
    );
    updateCompetencyLevel('comp_data_quality', 8);
    addToast('Module Completed', 'Progress recorded. Competency level updated by +8%.', 'success');
  };

  const toggleOffline = () => {
    setIsOffline(prev => {
      const next = !prev;
      if (next) {
        addToast('Offline Mode Activated', 'Simulating low/zero remote connectivity in Field Block.', 'warning');
      } else {
        addToast('Network Reconnected', 'Field device restored to central official network.', 'info');
      }
      return next;
    });
  };

  const syncOfflineData = async () => {
    setIsSyncing(true);
    addToast('Syncing Field Microdata', 'Encrypting and transmitting 12 local activity logs...', 'info');
    await new Promise(r => setTimeout(r, 2200));
    setIsSyncing(false);
    setOfflineQueueCount(0);
    addToast('Field Data Synchronized', 'All local schedules, micro-lessons, and quiz answers safely committed to MoSPI server.', 'success');
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 }
      });
    } catch {
      // silent
    }
  };

  // Guided demo journey steps
  const demoStepsList: { view: AppView; title: string; subtitle: string }[] = [
    { view: 'dashboard', title: '1. Intelligent Dashboard', subtitle: 'Personalized competency pulse, gap priorities, and daily readiness for Officer Ananya Sharma.' },
    { view: 'skill-gaps', title: '2. AI Competency Gap Engine', subtitle: 'Diagnoses exact missing capabilities with crystal-clear explanations of WHY the gap exists.' },
    { view: 'learning-map', title: '3. Explainable Learning Map', subtitle: 'Connects role needs to what will be learned and how it translates into workplace application.' },
    { view: 'learning-path', title: '4. Visual Personalized Journey', subtitle: 'Step-by-step progress nodes from foundations to real-world capstone.' },
    { view: 'data-clinic', title: '5. Signature: Data Quality Clinic', subtitle: 'Hands-on practice fixing impossible values (e.g. Age 187), missing entries, and outlier spikes.' },
    { view: 'simulations', title: '6. Statistics Work Simulator', subtitle: 'Branching decisions on real district challenges (e.g. 30% missing responses in rural cluster).' },
    { view: 'proof', title: '7. Learning-to-Work Proof', subtitle: 'Going beyond course certificates: proving workplace readiness on real data.' },
    { view: 'admin-risk-map', title: '8. Department Skill-Risk Map', subtitle: 'Executive visibility into institutional risks across divisions, cadres, and districts.' }
  ];

  const startGuidedDemo = () => {
    setIsDemoActive(true);
    setDemoStep(0);
    setCurrentView(demoStepsList[0].view);
    addToast('Guided Demo Started', 'Navigating the end-to-end KshamataAI narrative for SIH / Judges.', 'info');
  };

  const nextDemoStep = () => {
    if (demoStep < demoStepsList.length - 1) {
      const next = demoStep + 1;
      setDemoStep(next);
      setCurrentView(demoStepsList[next].view);
      // Switch user if admin step
      if (demoStepsList[next].view === 'admin-risk-map') {
        setCurrentUser(mockAdminProfile);
      } else {
        setCurrentUser(mockLearnerProfile);
      }
    } else {
      exitGuidedDemo();
    }
  };

  const prevDemoStep = () => {
    if (demoStep > 0) {
      const prev = demoStep - 1;
      setDemoStep(prev);
      setCurrentView(demoStepsList[prev].view);
      if (demoStepsList[prev].view === 'admin-risk-map') {
        setCurrentUser(mockAdminProfile);
      } else {
        setCurrentUser(mockLearnerProfile);
      }
    }
  };

  const exitGuidedDemo = () => {
    setIsDemoActive(false);
    setDemoStep(0);
    addToast('Guided Demo Finished', 'Feel free to explore all 12 differentiators independently!', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        updateUserProfile,
        switchUserRole,
        isAuthenticated,
        login,
        logout,
        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar,
        sidebarMobileOpen,
        setSidebarMobileOpen,
        currentView,
        setCurrentView,
        selectedCompetencyId,
        setSelectedCompetencyId,
        competencies,
        updateCompetencyLevel,
        datasets,
        resolveDatasetIssue,
        simulations,
        aiQuestions,
        updateQuizQuestionStatus,
        addNewQuizQuestion,
        courses,
        completeCourseModule,
        isOffline,
        toggleOffline,
        offlineQueueCount,
        syncOfflineData,
        isSyncing,
        toasts,
        addToast,
        removeToast,
        showAIAssistant,
        setShowAIAssistant,
        aiContext,
        setAIContext,
        isDemoActive,
        demoStep,
        startGuidedDemo,
        nextDemoStep,
        prevDemoStep,
        exitGuidedDemo
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

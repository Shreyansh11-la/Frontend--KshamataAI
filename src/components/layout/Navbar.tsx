import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Wifi,
  WifiOff,
  ShieldCheck,
  Compass,
  UserCheck,
  ChevronDown,
  Stethoscope,
  TrendingUp,
  Award,
  Building2,
  BookOpen,
  User,
  LogOut,
  KeyRound,
  MoreHorizontal,
  Menu
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    switchUserRole,
    currentView,
    setCurrentView,
    isOffline,
    toggleOffline,
    offlineQueueCount,
    startGuidedDemo,
    showAIAssistant,
    setShowAIAssistant,
    setSidebarMobileOpen,
    toggleSidebar,
    logout
  } = useApp();

  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const isPublicView = [
    'landing',
    'about',
    'how-it-works',
    'why-kshamata',
    'features',
    'impact'
  ].includes(currentView);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-md transition-all shadow-xs">
      {/* Top micro-bar for official institutional trust - Deep Navy #0B1F3A */}
      <div className="bg-[#0B1F3A] px-3 sm:px-8 py-1.5 text-xs text-slate-200 flex items-center justify-between border-b border-[#123B63] overflow-hidden">
        <div className="flex items-center gap-2 font-medium min-w-0">
          <span className="inline-block w-2 h-2 rounded-full bg-teal-400 animate-pulse shrink-0"></span>
          <span className="font-bold tracking-wide text-white truncate text-[11px] sm:text-xs">भारत सरकार | Government of India</span>
          <span className="hidden md:inline text-slate-400">•</span>
          <span className="hidden md:inline text-slate-200 font-semibold truncate">Ministry of Statistics & Programme Implementation (MoSPI)</span>
          <span className="hidden xl:inline text-slate-400">•</span>
          <span className="hidden xl:inline text-teal-300 text-[11px] font-mono">NSSCF Platform Active Since 2019</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-[11px] shrink-0">
          {/* Accessibility controls */}
          <div className="hidden sm:flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded border border-white/10 text-[10px] font-bold">
            <span className="text-slate-300 mr-1">Text:</span>
            <button className="px-1 hover:text-white transition">A-</button>
            <button className="px-1 text-white font-black underline">A</button>
            <button className="px-1 hover:text-white transition">A+</button>
          </div>

          <span className="hidden sm:inline px-2 py-0.5 bg-white/10 rounded font-bold text-[10px] border border-white/10 text-slate-200">
            हिन्दी / English
          </span>

          <button
            onClick={toggleOffline}
            className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold transition shrink-0 ${
              isOffline
                ? 'bg-amber-400/20 text-amber-200 border border-amber-400/40'
                : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10'
            }`}
            title="Toggle field offline simulation"
          >
            {isOffline ? <WifiOff className="w-3 h-3 text-amber-300" /> : <Wifi className="w-3 h-3 text-teal-300" />}
            <span>{isOffline ? `Offline (${offlineQueueCount})` : 'Grid: Online'}</span>
          </button>
        </div>
      </div>

      {/* Main navigation bar - spacious and clean */}
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand identity + Mobile sidebar toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Mobile sidebar opener */}
          <button
            onClick={() => setSidebarMobileOpen(true)}
            className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition shrink-0"
            title="Open Cadre Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => setCurrentView(isPublicView ? 'landing' : 'dashboard')}
            className="flex items-center gap-2.5 sm:gap-3.5 group text-left shrink-0"
          >
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#0B1F3A] hover:bg-[#123B63] text-white shadow-md shadow-slate-900/15 ring-2 ring-[#0B1F3A]/20 group-hover:scale-105 transition-transform shrink-0">
              {/* Geometric Indian Statistical Monogram */}
              <span className="font-black text-base sm:text-xl tracking-tight text-white">क्ष</span>
              <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white flex items-center justify-center shadow-xs">
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-teal-500"></span>
              </div>
            </div>
            <div className="shrink-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0F172A] whitespace-nowrap">
                  Kshamata<span className="text-teal-600">AI</span>
                </span>
                <span className="hidden md:inline-block px-2 py-0.5 bg-teal-50 text-[#0B1F3A] border border-teal-200 text-[10px] font-extrabold rounded-full tracking-wider uppercase shrink-0">
                  v3.0 Official
                </span>
              </div>
              <p className="hidden 2xl:block text-xs text-slate-500 font-medium tracking-tight truncate max-w-xs">
                Official Statistical Competency & Workplace Readiness Engine
              </p>
            </div>
          </button>
        </div>

        {/* Navigation center links for quick switching */}
        <div className="hidden xl:flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/70 text-xs font-bold text-slate-600">
          <button
            onClick={() => setCurrentView('landing')}
            className={`px-4 py-2 rounded-xl transition ${
              currentView === 'landing'
                ? 'bg-white text-[#0B1F3A] shadow-xs font-extrabold border border-slate-200'
                : 'hover:text-slate-900'
            }`}
          >
            National Portal
          </button>
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`px-4 py-2 rounded-xl transition ${
              !isPublicView && currentView !== 'profile' && currentView !== 'login'
                ? 'bg-white text-[#0B1F3A] shadow-xs font-extrabold border border-slate-200'
                : 'hover:text-slate-900'
            }`}
          >
            Officer Workspace
          </button>
          <button
            onClick={() => setCurrentView('data-clinic')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
              currentView === 'data-clinic'
                ? 'bg-[#0B1F3A] text-white shadow-xs font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            <Stethoscope className="w-4 h-4 text-teal-400" />
            <span>Data Clinic</span>
          </button>
          <button
            onClick={() => setCurrentView('circulars')}
            className={`px-4 py-2 rounded-xl transition ${
              currentView === 'circulars'
                ? 'bg-white text-[#0B1F3A] shadow-xs font-extrabold border border-slate-200'
                : 'hover:text-slate-900'
            }`}
          >
            Gazettes & OMs
          </button>
          <button
            onClick={() => setCurrentView('sop-library')}
            className={`px-4 py-2 rounded-xl transition ${
              currentView === 'sop-library'
                ? 'bg-white text-[#0B1F3A] shadow-xs font-extrabold border border-slate-200'
                : 'hover:text-slate-900'
            }`}
          >
            Field SOPs
          </button>
          <button
            onClick={() => setCurrentView('academies')}
            className={`px-4 py-2 rounded-xl transition ${
              currentView === 'academies'
                ? 'bg-white text-[#0B1F3A] shadow-xs font-extrabold border border-slate-200'
                : 'hover:text-slate-900'
            }`}
          >
            Academies
          </button>
        </div>

        {/* Right side actions & official profile */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Quick Guided Demo Launcher */}
          <button
            onClick={startGuidedDemo}
            className="hidden sm:flex items-center gap-1.5 sm:gap-2 p-2 sm:px-3.5 sm:py-2 rounded-xl bg-[#0B1F3A] hover:bg-[#123B63] text-white text-xs font-extrabold shadow-sm shadow-slate-900/20 transition active:scale-95 shrink-0"
            title="Start automated platform walkthrough"
          >
            <Compass className="w-4 h-4 text-[#F59E0B]" />
            <span className="hidden md:inline">Guided Demo</span>
          </button>

          {/* AI Copilot toggle button */}
          <button
            onClick={() => setShowAIAssistant(!showAIAssistant)}
            className={`flex items-center gap-1.5 sm:gap-2 p-2 sm:px-3.5 sm:py-2 rounded-xl border-2 text-xs font-extrabold transition shrink-0 ${
              showAIAssistant
                ? 'bg-teal-50 border-teal-300 text-teal-950 shadow-xs'
                : 'bg-white border-slate-200 text-slate-800 hover:border-teal-300 hover:bg-teal-50/50 shadow-xs'
            }`}
            title="Open AI Statistical Assistant"
          >
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span className="hidden md:inline">AI Copilot</span>
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-teal-500 animate-pulse"></span>
          </button>

          {/* Dedicated Three Dots (...) Quick Actions Menu Button */}
          <button
            onClick={() => setSidebarMobileOpen(true)}
            className="hidden sm:flex p-2 sm:p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-800 transition items-center justify-center shadow-xs shrink-0"
            title="More Options & Sections"
          >
            <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
          </button>

          {/* Cadre Persona Switcher Dropdown */}
          <div className="relative shrink-0">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1.5 sm:gap-2.5 pl-1.5 pr-2 py-1 sm:pl-2 sm:pr-3 sm:py-1.5 rounded-xl sm:rounded-2xl border border-slate-200 hover:border-slate-300 bg-white transition text-left shadow-xs shrink-0"
            >
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl object-cover ring-2 ring-[#0B1F3A]/30 shrink-0"
              />
              <div className="hidden md:block text-left leading-tight">
                <div className="text-xs font-black text-slate-900">{currentUser.name}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  {currentUser.roleType === 'admin' ? 'Joint Director General' : 'Statistical Officer'}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 shrink-0" />
            </button>

            {/* Persona Switcher Dropdown Menu */}
            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-1.5rem)] rounded-3xl bg-white border border-slate-200 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-2 border-b border-slate-100 mb-2">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Official Persona Selection</p>
                  <p className="text-xs text-slate-600 font-medium">Switch between learner and cadre administrator</p>
                </div>

                <div className="space-y-1.5">
                  <button
                    onClick={() => {
                      switchUserRole('learner');
                      setShowRoleMenu(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left transition ${
                      currentUser.roleType === 'learner'
                        ? 'bg-teal-50 text-teal-950 font-black border-2 border-teal-300'
                        : 'hover:bg-slate-50 text-slate-700 font-bold'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-black text-xs">
                      AS
                    </div>
                    <div>
                      <div className="text-xs font-extrabold">Ananya Sharma</div>
                      <div className="text-[11px] text-slate-500">Statistical Officer (Learner)</div>
                    </div>
                    {currentUser.roleType === 'learner' && <UserCheck className="w-4 h-4 text-teal-700 ml-auto" />}
                  </button>

                  <button
                    onClick={() => {
                      switchUserRole('admin');
                      setShowRoleMenu(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left transition ${
                      currentUser.roleType === 'admin'
                        ? 'bg-[#0B1F3A]/5 text-[#0B1F3A] font-black border-2 border-[#0B1F3A]/30'
                        : 'hover:bg-slate-50 text-slate-700 font-bold'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#0B1F3A] text-white flex items-center justify-center font-black text-xs">
                      RM
                    </div>
                    <div>
                      <div className="text-xs font-extrabold">Dr. Rajiv Menon</div>
                      <div className="text-[11px] text-slate-500">Joint Director General (Admin)</div>
                    </div>
                    {currentUser.roleType === 'admin' && <UserCheck className="w-4 h-4 text-teal-700 ml-auto" />}
                  </button>
                </div>

                <div className="border-t border-slate-100 mt-2 pt-2 space-y-1">
                  <button
                    onClick={() => {
                      setCurrentView('profile');
                      setShowRoleMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-xl font-bold"
                  >
                    <User className="w-4 h-4 text-slate-500" />
                    <span>Officer Competency Passport</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentView('login');
                      setShowRoleMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-xl font-bold"
                  >
                    <KeyRound className="w-4 h-4 text-slate-500" />
                    <span>Parichay SSO Gateway</span>
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setShowRoleMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-700 hover:bg-rose-50 rounded-xl font-bold"
                  >
                    <LogOut className="w-4 h-4 text-rose-600" />
                    <span>Sign Out from Terminal</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

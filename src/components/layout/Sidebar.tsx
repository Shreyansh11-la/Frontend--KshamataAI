import React, { useState } from 'react';
import { useApp, AppView } from '../../context/AppContext';
import {
  LayoutDashboard,
  Target,
  AlertTriangle,
  GitFork,
  Route,
  BookOpen,
  ClipboardCheck,
  Stethoscope,
  SlidersHorizontal,
  HelpCircle,
  ShieldCheck,
  WifiOff,
  Scale,
  Award,
  Users,
  TrendingUp,
  Sparkles,
  ChevronRight,
  MoreHorizontal,
  User,
  LogOut,
  ChevronLeft,
  X,
  FileBadge,
  KeyRound,
  Check,
  FileText,
  Building2,
  Layers
} from 'lucide-react';

interface NavItem {
  id: AppView;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeType?: 'primary' | 'warning' | 'success' | 'new';
  roleRestricted?: 'admin' | 'learner';
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobile = false, onClose }) => {
  const {
    currentView,
    setCurrentView,
    currentUser,
    competencies,
    datasets,
    sidebarCollapsed,
    toggleSidebar,
    switchUserRole,
    logout
  } = useApp();

  const [showThreeDotsMenu, setShowThreeDotsMenu] = useState(false);

  // In mobile view, don't collapse to mini rail
  const isMini = sidebarCollapsed && !isMobile;

  // Calculate high gaps count and unresolved data issues count
  const highGapsCount = competencies.filter(c => c.priority === 'HIGH').length;
  const dataIssuesCount = datasets[0]?.issues.filter(i => i.status === 'unresolved').length || 0;

  const sections: NavSection[] = [
    {
      title: 'Competency Intelligence',
      items: [
        { id: 'dashboard', label: 'Officer Dashboard', icon: LayoutDashboard },
        { id: 'competencies', label: 'Competency Profile', icon: Target },
        {
          id: 'skill-gaps',
          label: 'Skill Gap Engine',
          icon: AlertTriangle,
          badge: `${highGapsCount} Critical`,
          badgeType: 'warning'
        },
        { id: 'learning-map', label: 'Explainable Map', icon: GitFork, badge: 'Map', badgeType: 'new' },
        { id: 'learning-path', label: 'Personalized Path', icon: Route }
      ]
    },
    {
      title: 'Practice & Workplace Proof',
      items: [
        {
          id: 'data-clinic',
          label: 'Data Quality Clinic',
          icon: Stethoscope,
          badge: `${dataIssuesCount} issues`,
          badgeType: 'primary'
        },
        { id: 'simulations', label: 'Work Simulator', icon: SlidersHorizontal },
        { id: 'assessments', label: 'Assessments Center', icon: ClipboardCheck },
        { id: 'proof', label: 'Learning-to-Work Proof', icon: Award, badge: 'Capstone', badgeType: 'success' },
        { id: 'courses', label: 'Targeted Learning', icon: BookOpen }
      ]
    },
    {
      title: 'Trust & Safe AI Innovations',
      items: [
        { id: 'quiz-maker', label: 'Trusted Quiz Maker', icon: HelpCircle, badge: 'AI', badgeType: 'new' },
        { id: 'safe-guard', label: 'Safe AI Guard (DPDP)', icon: ShieldCheck },
        { id: 'offline-mode', label: 'Field Offline Mode', icon: WifiOff },
        { id: 'expert-match', label: 'Ask Cadre Expert', icon: Users }
      ]
    },
    {
      title: 'Governance & Leadership',
      items: [
        { id: 'policy-lab', label: 'Senior Officer Policy Lab', icon: Scale },
        {
          id: 'admin-risk-map',
          label: 'Department Skill-Risk Map',
          icon: TrendingUp,
          badge: 'Executive',
          badgeType: 'primary'
        }
      ]
    },
    {
      title: 'Statutory Standards & SOPs',
      items: [
        { id: 'circulars', label: 'Gazettes & Circulars', icon: FileText, badge: 'MoSPI', badgeType: 'new' },
        { id: 'sop-library', label: 'Field SOP Manuals', icon: Layers },
        { id: 'academies', label: 'Training Academies & RTCs', icon: Building2 }
      ]
    }
  ];

  const handleNavClick = (viewId: AppView) => {
    setCurrentView(viewId);
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <aside
      className={`relative transition-all duration-300 rounded-3xl border border-slate-200/90 bg-white p-4 shadow-sm select-none ${
        isMini ? 'w-20' : 'w-full'
      }`}
    >
      {/* Top Controls: Mobile close or Desktop Collapse + Three Dots Section Toggle */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        {!isMini ? (
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse"></span>
            <span className="text-[11px] font-black uppercase tracking-wider text-[#0B1F3A]">
              Cadre Navigation
            </span>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
          </div>
        )}

        <div className="flex items-center gap-1">
          {/* THREE DOTS SECTION BUTTON */}
          <div className="relative">
            <button
              onClick={() => setShowThreeDotsMenu(!showThreeDotsMenu)}
              className={`p-1.5 rounded-xl border transition ${
                showThreeDotsMenu
                  ? 'bg-[#0B1F3A] text-white border-[#0B1F3A] shadow-xs'
                  : 'text-slate-500 hover:text-[#0B1F3A] hover:bg-slate-100 border-slate-200'
              }`}
              title="Three Dots Cadre Actions Menu"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {/* THREE DOTS DROPDOWN POPOVER */}
            {showThreeDotsMenu && (
              <div className="absolute left-0 lg:left-auto lg:right-0 mt-2 w-72 rounded-2xl bg-white border border-slate-200 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 px-2">
                  <div className="text-[10px] font-black text-[#0B1F3A] uppercase tracking-wider">
                    Three Dots Section • Quick Actions
                  </div>
                  <button
                    onClick={() => setShowThreeDotsMenu(false)}
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => {
                      handleNavClick('profile');
                      setShowThreeDotsMenu(false);
                    }}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-[#0B1F3A] transition text-left"
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-100 text-[#0B1F3A] flex items-center justify-center shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900">Officer Cadre Profile</div>
                      <div className="text-[10px] text-slate-500 font-normal">Dossier, Contact & Postings</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      handleNavClick('profile');
                      setShowThreeDotsMenu(false);
                    }}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-teal-50 hover:text-teal-950 transition text-left"
                  >
                    <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                      <FileBadge className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900">Digital Competency Passport</div>
                      <div className="text-[10px] text-slate-500 font-normal">Printable Transcript & QR</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      handleNavClick('circulars');
                      setShowThreeDotsMenu(false);
                    }}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-[#0B1F3A] transition text-left"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900">Gazettes & Circulars Archive</div>
                      <div className="text-[10px] text-slate-500 font-normal">Official OMs & Notifications</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      handleNavClick('sop-library');
                      setShowThreeDotsMenu(false);
                    }}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-[#0B1F3A] transition text-left"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#0B1F3A]/10 text-[#0B1F3A] flex items-center justify-center shrink-0">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900">Field SOP Knowledge Base</div>
                      <div className="text-[10px] text-slate-500 font-normal">CAPI & Multiplier Manuals</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      handleNavClick('academies');
                      setShowThreeDotsMenu(false);
                    }}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-amber-50 hover:text-amber-900 transition text-left"
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900">Training Academies & RTCs</div>
                      <div className="text-[10px] text-slate-500 font-normal">NSSTA & ISI Nominations</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      handleNavClick('login');
                      setShowThreeDotsMenu(false);
                    }}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-[#0B1F3A] transition text-left"
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900">Parichay SSO Gateway</div>
                      <div className="text-[10px] text-slate-500 font-normal">Government Login & 2FA</div>
                    </div>
                  </button>

                  <div className="pt-2 border-t border-slate-100 mt-1">
                    <div className="px-2 py-1 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      Switch Cadre Persona
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 pt-1">
                      <button
                        onClick={() => {
                          switchUserRole('learner');
                          setShowThreeDotsMenu(false);
                        }}
                        className={`p-2 rounded-xl text-[11px] font-bold text-center border transition ${
                          currentUser.roleType === 'learner'
                            ? 'bg-[#0B1F3A] text-white border-[#0B1F3A] font-black'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        Ananya (SO)
                      </button>
                      <button
                        onClick={() => {
                          switchUserRole('admin');
                          setShowThreeDotsMenu(false);
                        }}
                        className={`p-2 rounded-xl text-[11px] font-bold text-center border transition ${
                          currentUser.roleType === 'admin'
                            ? 'bg-[#0B1F3A] text-white border-[#0B1F3A] font-black'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        Dr. Rajiv (JDG)
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 mt-2">
                    <button
                      onClick={() => {
                        logout();
                        setShowThreeDotsMenu(false);
                      }}
                      className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-bold text-rose-700 hover:bg-rose-50 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out from Terminal</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Collapse / Expand Toggle */}
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-xl border border-slate-200 text-slate-500 hover:text-[#0B1F3A] hover:bg-slate-100 transition"
              title={isMini ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isMini ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          )}

          {/* Mobile Close Button */}
          {isMobile && onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Officer mini identity card */}
      {!isMini ? (
        <div className="mb-5 p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/80">
          <div className="flex items-center justify-between">
            <div
              onClick={() => handleNavClick('profile')}
              className="flex items-center gap-3 min-w-0 cursor-pointer group"
            >
              <div className="relative shrink-0">
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-2xl object-cover ring-2 ring-[#0B1F3A]/20 group-hover:scale-105 transition-transform"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-teal-500 border-2 border-white shadow-xs"></span>
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-black text-slate-900 truncate group-hover:text-[#0B1F3A] transition">
                  {currentUser.name}
                </h4>
                <p className="text-[11px] text-slate-500 font-semibold truncate">{currentUser.roleTitle}</p>
              </div>
            </div>

            <button
              onClick={() => handleNavClick('profile')}
              className="p-1.5 rounded-xl hover:bg-slate-200/60 text-slate-400 hover:text-[#0B1F3A] transition"
              title="View Profile"
            >
              <User className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium text-[11px]">Workplace Readiness</span>
            <span className="font-black text-[#0B1F3A]">{currentUser.overallReadiness}%</span>
          </div>
          <div className="w-full bg-slate-200/80 h-2 rounded-full mt-1.5 overflow-hidden">
            <div
              className="bg-[#0B1F3A] h-full rounded-full transition-all duration-700"
              style={{ width: `${currentUser.overallReadiness}%` }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="mb-4 flex flex-col items-center">
          <button
            onClick={() => handleNavClick('profile')}
            className="relative group p-1"
            title={`${currentUser.name} - View Profile`}
          >
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-10 h-10 rounded-2xl object-cover ring-2 ring-[#0B1F3A]/20 group-hover:scale-105 transition"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-teal-500 border-2 border-white"></span>
          </button>
        </div>
      )}

      {/* Navigation list */}
      <div className="space-y-5">
        {/* Quick Profile Link in main rail */}
        <div className="space-y-1">
          <button
            onClick={() => handleNavClick('profile')}
            className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-xs font-bold transition group text-left ${
              currentView === 'profile'
                ? 'bg-[#0B1F3A] text-white shadow-xs font-extrabold'
                : 'text-slate-700 hover:text-[#0B1F3A] hover:bg-slate-100 border border-transparent hover:border-slate-200'
            }`}
            title="Cadre Profile & Passport"
          >
            <div className="flex items-center gap-3 min-w-0">
              <User
                className={`w-4 h-4 shrink-0 ${
                  currentView === 'profile' ? 'text-white' : 'text-[#0B1F3A]'
                }`}
              />
              {!isMini && <span className="truncate">Officer Profile</span>}
            </div>
            {!isMini && (
              <span className="text-[9px] font-black px-2 py-0.5 rounded-md uppercase bg-slate-100 text-slate-800">
                Record
              </span>
            )}
          </button>

          {/* Dedicated Three Dots Section Item in Sidebar Rail */}
          <button
            onClick={() => setShowThreeDotsMenu(!showThreeDotsMenu)}
            className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-xs font-bold transition group text-left ${
              showThreeDotsMenu
                ? 'bg-slate-100 text-[#0B1F3A] border border-slate-300'
                : 'text-slate-600 hover:text-[#0B1F3A] hover:bg-slate-50'
            }`}
            title="More Cadre Actions & Three Dots Menu"
          >
            <div className="flex items-center gap-3 min-w-0">
              <MoreHorizontal className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-[#0B1F3A]" />
              {!isMini && <span className="truncate font-black">More Cadre Actions</span>}
            </div>
            {!isMini && (
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 font-mono">
                •••
              </span>
            )}
          </button>
        </div>

        {sections.map(section => (
          <div key={section.title} className="space-y-1.5">
            {!isMini && (
              <div className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                {section.title}
              </div>
            )}
            <div className="space-y-1">
              {section.items.map(item => {
                const Icon = item.icon;
                const isActive = currentView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-xs font-bold transition group text-left ${
                      isActive
                        ? 'bg-[#0B1F3A] text-white shadow-xs font-extrabold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                    title={isMini ? item.label : undefined}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#0B1F3A]'
                        }`}
                      />
                      {!isMini && <span className="truncate">{item.label}</span>}
                    </div>

                    {!isMini && item.badge && (
                      <span
                        className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wide shrink-0 ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : item.badgeType === 'warning'
                            ? 'bg-amber-50 text-amber-800 border border-amber-300'
                            : item.badgeType === 'primary'
                            ? 'bg-[#123B63]/10 text-[#0B1F3A] border border-[#123B63]/25'
                            : item.badgeType === 'success'
                            ? 'bg-teal-50 text-teal-800 border border-teal-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Institutional Assurance Badge (only when full width) */}
      {!isMini && (
        <div className="mt-6 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 font-extrabold text-[#0B1F3A]">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>NSSCF Certified Cadre</span>
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
            MoSPI field validation protocols & CAPI quality standards.
          </p>
        </div>
      )}
    </aside>
  );
};

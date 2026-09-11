import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  ExternalLink,
  Award,
  BookOpen,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  FileText,
  Lock,
  Compass
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <footer className="bg-[#0B1F3A] text-slate-300 border-t-4 border-[#123B63] mt-20 pt-16 pb-12">
      {/* Top Credentials Bar */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pb-12 border-b border-[#123B63]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#123B63] border border-[#1A4D7C] flex items-center justify-center shrink-0 text-teal-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-sm">Established Since 2019</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                National Statistical System Competency Platform upgraded to NSSCF v3.2 Gazette standard.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#123B63] border border-[#1A4D7C] flex items-center justify-center shrink-0 text-teal-400">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-sm">STQC Audited & ISO 27001</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Empaneled by MeitY, hosted on National Informatics Centre (NIC) GovCloud Tier-IV facility.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#123B63] border border-[#1A4D7C] flex items-center justify-center shrink-0 text-teal-400">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-sm">DPDP Act 2023 Compliant</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Automated deterministic microdata masking, k-anonymity verification, and cryptographic audit logs.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#123B63] border border-[#1A4D7C] flex items-center justify-center shrink-0 text-teal-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-sm">Mission Karmayogi Aligned</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Endorsed by National Statistical Commission (NSC) for in-service ISS and SSS cadre advancement.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Links */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 border-b border-[#123B63] text-xs">
        {/* Col 1: Government Identity */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-sm">
              <div className="w-full h-full rounded-lg bg-[#0B1F3A] text-white flex items-center justify-center font-black text-sm">
                GOI
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">Government of India</p>
              <h3 className="font-extrabold text-white text-sm">Ministry of Statistics & Programme Implementation</h3>
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed max-w-md">
            KshamataAI is the official competency diagnostic, AI-assisted verification, and microdata quality enhancement platform for India's National Statistical System, bridging skill gaps from theoretical knowledge into field precision.
          </p>

          <div className="space-y-2 pt-2 text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Sankhyiki Bhawan, GPOA Building, CBD Shahdara, Delhi - 110032</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Cadre Grievance & Technical Helpline: 1800-11-MOSPI (Toll Free)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-teal-400 shrink-0" />
              <span>kshamata-support@mospi.gov.in | training.nssta@nic.in</span>
            </div>
          </div>
        </div>

        {/* Col 2: Cadre Workspaces */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px] text-teal-400">
            Cadre Workspaces
          </h4>
          <ul className="space-y-2 text-slate-300 font-medium">
            <li>
              <button onClick={() => setCurrentView('dashboard')} className="hover:text-teal-300 transition">
                Officer Performance Command
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('data-clinic')} className="hover:text-teal-300 transition">
                CAPI Data Quality Clinic
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('simulations')} className="hover:text-teal-300 transition">
                Survey Emergency Simulator
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('quiz-maker')} className="hover:text-teal-300 transition">
                Trusted Assessment Engine
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('profile')} className="hover:text-teal-300 transition">
                Digital Competency Passport
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('admin-risk-map')} className="hover:text-teal-300 transition">
                Executive Cadre Risk Heatmap
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Knowledge & Statutory Archives */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px] text-teal-400">
            Official Archives & SOPs
          </h4>
          <ul className="space-y-2 text-slate-300 font-medium">
            <li>
              <button onClick={() => setCurrentView('circulars')} className="hover:text-teal-300 transition">
                Gazette Notifications & OMs
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('sop-library')} className="hover:text-teal-300 transition">
                Standard Operating Procedures (SOPs)
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('academies')} className="hover:text-teal-300 transition">
                NSSTA & ISI Training Centers
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('safe-guard')} className="hover:text-teal-300 transition">
                DPDP Privacy Guard Engine
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('offline-mode')} className="hover:text-teal-300 transition">
                Disconnected Field CAPI Cache
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: National Portals & Legal */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px] text-teal-400">
            National Portals
          </h4>
          <ul className="space-y-2 text-slate-300 font-medium">
            <li>
              <a href="https://www.mospi.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-teal-300 transition">
                <span>MoSPI Official Portal</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </li>
            <li>
              <a href="https://www.india.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-teal-300 transition">
                <span>National Portal of India</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </li>
            <li>
              <a href="https://dopt.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-teal-300 transition">
                <span>DoPT / Mission Karmayogi</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </li>
            <li>
              <span className="text-slate-400">RTI Act 2005 Online Disclosures</span>
            </li>
            <li>
              <span className="text-slate-400">Citizen's Charter & Grievance Redressal</span>
            </li>
            <li>
              <span className="text-slate-400">National Web Guidelines (GIGW 3.0)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright & Audit Notice */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between text-xs text-slate-400 gap-4">
        <div>
          <p>© {new Date().getFullYear()} Ministry of Statistics and Programme Implementation (MoSPI), Government of India.</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Content managed by National Statistical Academy (NSSTA) & Data Quality Assurance Division (DQAD).</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] text-slate-400">
          <span>Security Audit: <strong className="text-slate-200">Passed (STQC/2026/08)</strong></span>
          <span className="hidden sm:inline">•</span>
          <span>Last Updated: <strong className="text-slate-200">10 September 2026</strong></span>
          <span className="hidden sm:inline">•</span>
          <span>Version: <strong className="text-slate-200">NSSCF 3.2.4 Production</strong></span>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Building,
  Award,
  Calendar,
  ShieldCheck,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  FileBadge,
  QrCode,
  Download,
  Printer,
  Edit3,
  Save,
  X,
  LogOut,
  ExternalLink,
  Lock,
  Clock,
  Check,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { currentUser, switchUserRole, competencies, updateUserProfile, logout, setCurrentView } = useApp();

  const [activeTab, setActiveTab] = useState<'dossier' | 'competencies' | 'certifications' | 'postings' | 'security'>('dossier');
  const [isEditing, setIsEditing] = useState(false);
  const [editPhone, setEditPhone] = useState(currentUser.phone || '+91 98112 40918');
  const [editOffice, setEditOffice] = useState(currentUser.officeLocation || 'Room 412, Sankhyiki Bhawan, New Delhi');
  const [editBio, setEditBio] = useState(currentUser.bio || '');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      phone: editPhone,
      officeLocation: editOffice,
      bio: editBio
    });
    setIsEditing(false);
  };

  const handlePrintPassport = () => {
    window.print();
  };

  const initials = currentUser.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner & Officer Cadre Header */}
      <div className="bg-gradient-to-r from-white via-teal-50/50 to-white p-7 sm:p-9 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="relative">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-teal-600/20 shadow-md"
            />
            <span className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-teal-500 border-3 border-white flex items-center justify-center text-white shadow-sm" title="Active Parichay SSO Session">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{currentUser.name}</h1>
              <span className="text-[10px] font-black px-3 py-1 rounded-full bg-teal-100 text-[#0B1F3A] border border-teal-200 uppercase tracking-wide">
                {currentUser.cadre}
              </span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono">
                {currentUser.employeeCode || 'CADRE-OFFICIAL'}
              </span>
            </div>
            <p className="text-sm text-[#0B1F3A] font-black">{currentUser.roleTitle}</p>
            <p className="text-xs text-slate-500 font-medium flex flex-wrap items-center gap-2">
              <span>{currentUser.department}</span>
              <span>•</span>
              <span>{currentUser.division}</span>
              <span>•</span>
              <span className="text-slate-600 font-semibold">{currentUser.level}</span>
            </p>
            <div className="flex items-center gap-4 text-xs pt-1 text-slate-600 font-medium">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-teal-700" />
                {currentUser.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-teal-700" />
                {currentUser.phone || '+91 98112 40918'}
              </span>
            </div>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border-2 border-teal-200 shadow-xs">
            <button
              onClick={() => switchUserRole('learner')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                currentUser.roleType === 'learner' ? 'bg-[#0B1F3A] text-white shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Officer View
            </button>
            <button
              onClick={() => switchUserRole('admin')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                currentUser.roleType === 'admin' ? 'bg-[#0B1F3A] text-white shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Director View
            </button>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2.5 rounded-2xl border-2 border-rose-200 text-rose-700 hover:bg-rose-50 font-bold text-xs transition flex items-center gap-2 shrink-0"
            title="Sign out of government session"
          >
            <LogOut className="w-4 h-4 text-rose-600" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border-2 border-slate-200 shadow-xs">
        <button
          onClick={() => setActiveTab('dossier')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'dossier'
              ? 'bg-[#0B1F3A] text-white shadow-xs font-black'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Cadre Record & Dossier</span>
        </button>
        <button
          onClick={() => setActiveTab('competencies')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'competencies'
              ? 'bg-[#0B1F3A] text-white shadow-xs font-black'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Competency Passport</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0B1F3A]/20 text-[#0B1F3A] font-black">
            {currentUser.overallReadiness}%
          </span>
        </button>
        <button
          onClick={() => setActiveTab('certifications')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'certifications'
              ? 'bg-[#0B1F3A] text-white shadow-xs font-black'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <FileBadge className="w-4 h-4" />
          <span>Certifications & Micro-Credentials</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 font-bold">
            {currentUser.certifications?.length || 3}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('postings')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'postings'
              ? 'bg-[#0B1F3A] text-white shadow-xs font-black'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Postings & Service History</span>
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'security'
              ? 'bg-[#0B1F3A] text-white shadow-xs font-black'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Security & DPDP Governance</span>
        </button>
      </div>

      {/* TAB CONTENT */}

      {/* 1. Official Cadre Record & Dossier */}
      {activeTab === 'dossier' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Details & Bio */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-7 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Administrative Cadre Details</h3>
                  <p className="text-xs text-slate-500">Government service record verified under Ministry of Statistics (MoSPI)</p>
                </div>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 rounded-xl border-2 border-teal-200 hover:bg-teal-50 text-[#0B1F3A] text-xs font-black transition flex items-center gap-2"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-teal-700" />
                    <span>Edit Details</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-xl border-2 border-slate-200 text-slate-600 text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Cancel</span>
                  </button>
                )}
              </div>

              {!isEditing ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Employee Service Code</span>
                    <p className="text-sm font-black font-mono text-slate-900">{currentUser.employeeCode || 'SSS-2023-4921'}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Cadre & Service Group</span>
                    <p className="text-sm font-black text-slate-900">{currentUser.cadre}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Current Division</span>
                    <p className="text-sm font-bold text-slate-900">{currentUser.division}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Reporting Officer</span>
                    <p className="text-sm font-bold text-slate-900">{currentUser.reportingOfficer || 'Dr. Rajiv Menon, Joint Director General'}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Office Room / Location</span>
                    <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-teal-700 shrink-0" />
                      <span>{currentUser.officeLocation || 'Sankhyiki Bhawan, New Delhi'}</span>
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Induction Date</span>
                    <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-teal-700 shrink-0" />
                      <span>{currentUser.joinedDate}</span>
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Official Contact Phone</label>
                      <input
                        type="text"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none text-xs font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Office Room & Location</label>
                      <input
                        type="text"
                        value={editOffice}
                        onChange={(e) => setEditOffice(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none text-xs font-bold text-slate-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Cadre Profile & Specialization Summary</label>
                    <textarea
                      rows={3}
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none text-xs font-medium text-slate-900"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#0B1F3A] hover:bg-[#123B63] text-white text-xs font-black transition flex items-center gap-2 shadow-xs"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Bio & Focus Areas */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Statistical Focus & Specialization</h4>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {currentUser.bio || 'Statistical Officer specializing in rural household microdata scrutiny, CAPI field verification, and logic-based imputation protocols under NSS rounds.'}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {(currentUser.specializations || ['Household Surveys', 'CAPI Protocols', 'Data Quality Imputation', 'PLFS Scrutiny']).map((spec, i) => (
                    <span key={i} className="text-xs font-bold px-3 py-1 rounded-xl bg-teal-50 text-[#0B1F3A] border border-teal-200">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Readiness & Quick Stats */}
          <div className="space-y-6">
            <div className="p-7 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-5">
              <h3 className="text-base font-black text-slate-900 pb-3 border-b border-slate-100">
                Workplace Capability Summary
              </h3>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-50/50 border border-teal-200 text-center space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#0B1F3A]">
                  Overall Workplace Readiness
                </span>
                <div className="text-4xl font-black text-[#0B1F3A]">
                  {currentUser.overallReadiness}%
                </div>
                <p className="text-xs text-teal-700 font-bold">
                  +{currentUser.readinessDelta}% increase this quarter
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="text-slate-600 font-medium">Evaluated Competencies:</span>
                  <span className="font-black text-slate-900">{competencies.length} standards</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="text-slate-600 font-medium">Completed Capstone Proofs:</span>
                  <span className="font-black text-[#0B1F3A]">{currentUser.completedProofs} verified</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="text-slate-600 font-medium">Learning Hours (This Month):</span>
                  <span className="font-black text-slate-900">{currentUser.learningHoursThisMonth} hrs</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setCurrentView('data-clinic')}
                  className="w-full py-3 rounded-2xl bg-[#0B1F3A] hover:bg-[#123B63] text-white text-xs font-black transition flex items-center justify-center gap-2 shadow-xs"
                >
                  <Sparkles className="w-4 h-4 text-teal-300" />
                  <span>Practice in Data Clinic</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Official Competency Passport */}
      {activeTab === 'competencies' && (
        <div className="space-y-6">
          <div className="p-7 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-black text-[#0B1F3A] uppercase tracking-wider">
                  <Award className="w-4 h-4 text-teal-700" />
                  <span>National Statistical Competency Framework (NSSCF v3.2)</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 mt-1">Official Digital Competency Passport</h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrintPassport}
                  className="px-4 py-2.5 rounded-xl border-2 border-teal-200 hover:bg-teal-50 text-[#0B1F3A] text-xs font-black transition flex items-center gap-2 shadow-xs"
                >
                  <Printer className="w-4 h-4 text-teal-700" />
                  <span>Print / Save PDF</span>
                </button>
              </div>
            </div>

            {/* Verification Hash & QR Stamp */}
            <div className="p-5 rounded-2xl bg-[#0B1F3A] text-white flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white p-1.5 flex items-center justify-center text-[#0B1F3A] shrink-0">
                  <QrCode className="w-full h-full" />
                </div>
                <div>
                  <div className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                    Official Cryptographic Credential
                  </div>
                  <div className="text-sm font-black text-white mt-0.5">
                    NSSCF Digital Competency Passport • Verifiable ID
                  </div>
                  <div className="text-[11px] font-mono text-teal-200 mt-1">
                    SHA256: 8f9b207a51c4e92a...e04d7c81b (Certified by MoSPI Academy)
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-black px-3 py-1.5 rounded-xl bg-[#0B1F3A] text-teal-100 border border-[#0B1F3A] shrink-0 uppercase tracking-wide">
                MISSION KARMAYOGI VERIFIED
              </span>
            </div>

            {/* Standards List */}
            <div className="space-y-4 pt-2">
              <h4 className="text-sm font-black text-slate-900">Evaluated Standards Transcript ({competencies.length} Competencies)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {competencies.map(comp => (
                  <div key={comp.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono text-[10px] font-bold text-slate-400 block">{comp.code}</span>
                        <span className="font-black text-slate-900">{comp.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-[#0B1F3A] text-sm">{comp.currentLevel}%</span>
                        <span className="text-slate-400 block text-[10px]">Target: {comp.requiredLevel}%</span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#0B1F3A] h-full rounded-full transition-all duration-500"
                        style={{ width: `${comp.currentLevel}%` }}
                      ></div>
                    </div>

                    <div className="text-[11px] text-slate-600 line-clamp-1">
                      <strong className="text-slate-700">Protocol:</strong> {comp.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Certifications & Micro-Credentials */}
      {activeTab === 'certifications' && (
        <div className="space-y-6">
          <div className="p-7 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="text-xl font-black text-slate-900">Official Government Certifications</h3>
              <p className="text-xs text-slate-500 mt-0.5">Formal accreditations issued by MoSPI, ISI Kolkata, and Mission Karmayogi</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(currentUser.certifications || []).map(cert => (
                <div
                  key={cert.id}
                  className="p-6 rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-white to-teal-50/30 shadow-xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-[10px] font-black px-3 py-1 rounded-full bg-teal-100 text-[#0B1F3A] border border-teal-200 uppercase tracking-wide">
                        {cert.status}
                      </span>
                      <span className="text-xs font-black text-[#0B1F3A] bg-white px-2.5 py-1 rounded-lg border border-teal-200">
                        Score: {cert.score}%
                      </span>
                    </div>
                    <h4 className="text-base font-black text-slate-900 leading-snug">{cert.title}</h4>
                    <p className="text-xs text-slate-600 font-medium">Issued by: <strong className="text-slate-800">{cert.issuer}</strong></p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>ID: {cert.credentialId}</span>
                    <span>{cert.issueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Postings & Service History */}
      {activeTab === 'postings' && (
        <div className="p-7 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-xl font-black text-slate-900">Official Cadre Postings Chronology</h3>
            <p className="text-xs text-slate-500 mt-0.5">Service postings history maintained under Cadre Management Portal (CMP)</p>
          </div>

          <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-teal-300">
            {(currentUser.postings || []).map((post, idx) => (
              <div key={idx} className="relative space-y-2">
                <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#0B1F3A] ring-4 ring-teal-100"></div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-black text-[#0B1F3A] bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                    {post.period}
                  </span>
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-700" />
                    {post.location}
                  </span>
                </div>
                <h4 className="text-base font-black text-slate-900">{post.role}</h4>
                <p className="text-xs text-slate-600 font-medium">{post.unit}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Security & DPDP Governance */}
      {activeTab === 'security' && (
        <div className="p-7 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-xl font-black text-slate-900">National Security & DPDP Compliance Log</h3>
            <p className="text-xs text-slate-500 mt-0.5">Audit log under Digital Personal Data Protection Act 2023</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-[#0B1F3A] font-bold">
                <ShieldCheck className="w-5 h-5 text-teal-700" />
                <span>Single Sign-On Authentication</span>
              </div>
              <div className="space-y-1 text-slate-600">
                <p>Status: <strong className="text-teal-700">Authenticated via Parichay (NIC)</strong></p>
                <p>Two-Factor Token: <strong className="text-slate-800">Mobile OTP + PKI Enabled</strong></p>
                <p>Confidentiality Level: <strong className="text-slate-800">Official Cadre Internal</strong></p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-[#0B1F3A] font-bold">
                <Lock className="w-5 h-5 text-teal-700" />
                <span>Microdata DPDP Masking Protocol</span>
              </div>
              <div className="space-y-1 text-slate-600">
                <p>PII Shield: <strong className="text-teal-700">Active (Deterministic SHA-256)</strong></p>
                <p>Audit Trail: <strong className="text-slate-800">Logged to Sankhyiki Audit Log</strong></p>
                <p>Session Timeout: <strong className="text-slate-800">45 minutes idle</strong></p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Need security assistance? Contact MoSPI Computer Centre (CC) at helpdesk@mospi.gov.in</span>
            <button
              onClick={logout}
              className="px-5 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-black transition flex items-center gap-2 shadow-xs"
            >
              <LogOut className="w-4 h-4" />
              <span>Terminate Active Session</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

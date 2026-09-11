import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Lock,
  Mail,
  User,
  KeyRound,
  RefreshCw,
  ArrowRight,
  Sparkles,
  Building2,
  CheckCircle2,
  AlertCircle,
  FileText,
  BadgeCheck,
  ExternalLink,
  Fingerprint,
  Smartphone
} from 'lucide-react';

export const LoginView: React.FC = () => {
  const { login, setCurrentView } = useApp();

  const [activeTab, setActiveTab] = useState<'sso' | 'cadre' | 'demo'>('sso');
  
  // Parichay SSO form state
  const [govEmail, setGovEmail] = useState('ananya.sharma@mospi.gov.in');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [otpTimer, setOtpTimer] = useState(45);

  // Cadre Credentials form state
  const [cadreService, setCadreService] = useState('SSS');
  const [employeeCode, setEmployeeCode] = useState('SSS-2023-4921');
  const [password, setPassword] = useState('••••••••••••');
  
  // Captcha state
  const [num1, setNum1] = useState(7);
  const [num2, setNum2] = useState(5);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  const refreshCaptcha = () => {
    setNum1(Math.floor(Math.random() * 9) + 1);
    setNum2(Math.floor(Math.random() * 9) + 1);
    setCaptchaInput('');
    setCaptchaError(false);
  };

  const handleSendOtp = () => {
    if (!govEmail.includes('@')) return;
    setOtpSent(true);
    setOtpTimer(45);
  };

  const handleSsoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (govEmail.toLowerCase().includes('rajiv') || govEmail.toLowerCase().includes('menon')) {
      login('admin', { email: govEmail });
    } else {
      login('learner', { email: govEmail });
    }
  };

  const handleCadreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(captchaInput, 10) !== num1 + num2) {
      setCaptchaError(true);
      return;
    }
    if (cadreService === 'ISS') {
      login('admin', { employeeCode });
    } else {
      login('learner', { employeeCode });
    }
  };

  return (
    <div className="min-h-[88vh] flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center space-y-3">
        {/* National Emblem & Monogram Emblem */}
        <div className="inline-flex items-center justify-center gap-3 bg-white p-3 rounded-3xl border-2 border-slate-200 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0B1F3A] to-teal-900 text-white flex items-center justify-center font-black text-xl shadow-md">
            क्ष
          </div>
          <div className="text-left">
            <div className="text-[11px] font-black text-[#0B1F3A] tracking-wider uppercase">
              Government of India • भारत सरकार
            </div>
            <div className="text-xs font-bold text-slate-700">
              Ministry of Statistics & Programme Implementation (MoSPI)
            </div>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          National Statistical Cadre Single Sign-On (SSO)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Secure, authenticated gateway for Indian Statistical Service (ISS) and Subordinate Statistical Service (SSS) personnel.
        </p>
      </div>

      {/* Main Authentication Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border-2 border-slate-200 shadow-xl space-y-6">
          {/* Method Tabs */}
          <div className="flex rounded-2xl bg-slate-100 p-1.5 border border-slate-200/80">
            <button
              onClick={() => setActiveTab('sso')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                activeTab === 'sso'
                  ? 'bg-[#0B1F3A] text-white shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Fingerprint className="w-4 h-4" />
              <span>Parichay SSO</span>
            </button>
            <button
              onClick={() => setActiveTab('cadre')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                activeTab === 'cadre'
                  ? 'bg-[#0B1F3A] text-white shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <KeyRound className="w-4 h-4" />
              <span>Cadre ID & Token</span>
            </button>
            <button
              onClick={() => setActiveTab('demo')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                activeTab === 'demo'
                  ? 'bg-[#0B1F3A] text-white shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-teal-300" />
              <span>Fast Demo</span>
            </button>
          </div>

          {/* TAB 1: Parichay Govt SSO */}
          {activeTab === 'sso' && (
            <form onSubmit={handleSsoSubmit} className="space-y-4">
              <div className="p-3 rounded-2xl bg-teal-50/70 border border-teal-200 flex items-start gap-2.5 text-xs text-[#0B1F3A]">
                <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-black">NIC Parichay SSO Integration: </span>
                  Authenticate with your authorized institutional Government email (<code className="font-bold">@gov.in</code> or <code className="font-bold">@nic.in</code>).
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Institutional Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={govEmail}
                    onChange={(e) => setGovEmail(e.target.value)}
                    required
                    placeholder="officer.name@mospi.gov.in"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none text-xs sm:text-sm font-semibold text-slate-900 transition"
                  />
                </div>
              </div>

              {otpSent ? (
                <div className="space-y-3 animate-in fade-in">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Enter 6-Digit Parichay OTP
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        maxLength={6}
                        value={otpValue}
                        onChange={(e) => setOtpValue(e.target.value)}
                        placeholder="e.g. 749201"
                        className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none text-sm font-mono font-black text-slate-900 tracking-widest transition"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium px-1">
                    <span>Sent to registered NIC mobile (+91 ••••• ••918)</span>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="text-teal-700 hover:text-teal-700 font-bold hover:underline"
                    >
                      Resend OTP ({otpTimer}s)
                    </button>
                  </div>
                </div>
              ) : null}

              {!otpSent ? (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full py-3.5 rounded-2xl bg-[#0B1F3A] hover:bg-[#123B63] text-white text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 shadow-xs active:scale-95"
                >
                  <span>Request Parichay 2FA OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#0B1F3A] to-[#123B63] hover:from-[#123B63] text-white text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 shadow-xs active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4 text-teal-200" />
                  <span>Verify Parichay Session & Access Workspace</span>
                </button>
              )}
            </form>
          )}

          {/* TAB 2: Cadre ID & Password */}
          {activeTab === 'cadre' && (
            <form onSubmit={handleCadreSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Service Cadre
                  </label>
                  <select
                    value={cadreService}
                    onChange={(e) => setCadreService(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-2xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none text-xs sm:text-sm font-bold text-slate-900 bg-white"
                  >
                    <option value="SSS">Subordinate Statistical Service (SSS)</option>
                    <option value="ISS">Indian Statistical Service (ISS)</option>
                    <option value="NSSO">NSSO Field Operations Division</option>
                    <option value="CSO">Central Statistics Office</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Cadre Employee Code
                  </label>
                  <input
                    type="text"
                    value={employeeCode}
                    onChange={(e) => setEmployeeCode(e.target.value)}
                    required
                    placeholder="e.g. SSS-2023-4921"
                    className="w-full px-3.5 py-3 rounded-2xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none text-xs sm:text-sm font-bold font-mono text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Official Cadre Passphrase / e-Token Pin
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none text-xs sm:text-sm font-semibold text-slate-900"
                  />
                </div>
              </div>

              {/* Math Captcha */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Mandatory Security Captcha:</span>
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    className="flex items-center gap-1 text-teal-700 hover:text-teal-700 font-bold"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Refresh</span>
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2.5 rounded-xl bg-slate-200/90 text-slate-900 font-mono font-black text-sm tracking-wider select-none">
                    {num1} + {num2} = ?
                  </div>
                  <input
                    type="number"
                    value={captchaInput}
                    onChange={(e) => {
                      setCaptchaInput(e.target.value);
                      setCaptchaError(false);
                    }}
                    placeholder="Enter sum"
                    className={`flex-1 px-3.5 py-2.5 rounded-xl border-2 text-xs sm:text-sm font-mono font-bold focus:outline-none ${
                      captchaError
                        ? 'border-rose-400 bg-rose-50 text-rose-900'
                        : 'border-slate-200 focus:border-teal-500 text-slate-900'
                    }`}
                  />
                </div>
                {captchaError && (
                  <p className="text-[11px] text-rose-600 font-bold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Incorrect captcha answer. Please solve {num1} + {num2}.</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#0B1F3A] hover:bg-[#123B63] text-white text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 shadow-xs active:scale-95"
              >
                <span>Sign In with Cadre Token</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* TAB 3: Instant Demo Logins */}
          {activeTab === 'demo' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 font-medium">
                Select an authorized persona to test the platform instantly:
              </div>

              {/* Ananya Sharma */}
              <div
                onClick={() => login('learner')}
                className="p-4 rounded-2xl border-2 border-slate-200 hover:border-teal-500 hover:bg-teal-50/40 transition cursor-pointer flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80"
                    alt="Ananya Sharma"
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-teal-600/20 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-900">Ananya Sharma</span>
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-teal-100 text-[#0B1F3A] uppercase">
                        Learner View
                      </span>
                    </div>
                    <p className="text-[11px] font-bold text-[#0B1F3A] mt-0.5">Statistical Officer (SSS)</p>
                    <p className="text-[10px] text-slate-500">NSSO Survey & Data Division • 74% Readiness</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-3.5 py-1.5 rounded-xl bg-[#0B1F3A] text-white text-xs font-bold group-hover:bg-[#0B1F3A] transition shrink-0"
                >
                  Log In
                </button>
              </div>

              {/* Dr. Rajiv Menon */}
              <div
                onClick={() => login('admin')}
                className="p-4 rounded-2xl border-2 border-slate-200 hover:border-teal-500 hover:bg-teal-50/40 transition cursor-pointer flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80"
                    alt="Dr. Rajiv Menon"
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-teal-600/20 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-900">Dr. Rajiv Menon</span>
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-slate-900 text-white uppercase">
                        Admin / Director View
                      </span>
                    </div>
                    <p className="text-[11px] font-bold text-[#0B1F3A] mt-0.5">Joint Director General (ISS)</p>
                    <p className="text-[10px] text-slate-500">Central Statistics Operations • Executive Heatmap</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-3.5 py-1.5 rounded-xl bg-[#0B1F3A] text-white text-xs font-bold group-hover:bg-[#0B1F3A] transition shrink-0"
                >
                  Log In
                </button>
              </div>
            </div>
          )}

          {/* Guest / Public link */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              onClick={() => setCurrentView('landing')}
              className="text-slate-600 hover:text-teal-700 font-semibold transition flex items-center gap-1.5"
            >
              <span>Explore Public National Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] text-slate-400 font-mono">NIC-SEC-2026-v3</span>
          </div>
        </div>

        {/* Security Seals & Certifications Footer */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-[11px] text-slate-500 font-semibold">
          <div className="flex items-center gap-1.5">
            <BadgeCheck className="w-4 h-4 text-teal-600" />
            <span>STQC Certified Security</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>DPDP Act 2023 Compliant</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-teal-600" />
            <span>256-bit TLS Gov Encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

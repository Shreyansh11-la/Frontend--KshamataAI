import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  Search,
  Download,
  Filter,
  Calendar,
  Building2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface CircularItem {
  id: string;
  orderNumber: string;
  title: string;
  date: string;
  category: 'Gazette Notification' | 'Technical Standard' | 'Cadre Order' | 'DPDP Directive' | 'Training Circular';
  issuingDivision: string;
  summary: string;
  effectiveDate: string;
  fileSize: string;
  status: 'In Force' | 'Superseded' | 'Advisory';
}

export const CircularsView: React.FC = () => {
  const { addToast, setShowAIAssistant } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const circulars: CircularItem[] = [
    {
      id: 'circ-01',
      orderNumber: 'MoSPI/NSSCF/2026/GZ-04',
      title: 'Notification of National Statistical System Competency Framework (NSSCF v3.2)',
      date: '14 January 2026',
      effectiveDate: '01 April 2026',
      category: 'Gazette Notification',
      issuingDivision: 'National Statistical Commission (NSC) & Cadre Directorate',
      summary: 'Mandatory competency benchmarks, digital passport integration, and diagnostic appraisal standards for all Indian Statistical Service (ISS) and Subordinate Statistical Service (SSS) cadres.',
      fileSize: '1.8 MB (PDF)',
      status: 'In Force'
    },
    {
      id: 'circ-02',
      orderNumber: 'F.No. 14/08/2025-DQAD/CAPI',
      title: 'Technical Protocol for CAPI Microdata Scrutiny and Outlier Detection (NSS 80th Round)',
      date: '03 December 2025',
      effectiveDate: 'Immediate',
      category: 'Technical Standard',
      issuingDivision: 'Data Quality Assurance Division (DQAD), Kolkata',
      summary: 'Standard operating algorithms for hard biological bounds, skip-pattern integrity, and constrained nearest-neighbor hot-deck imputation in household socio-economic schedules.',
      fileSize: '2.4 MB (PDF)',
      status: 'In Force'
    },
    {
      id: 'circ-03',
      orderNumber: 'OM No. 12015/02/2026-ISS-Trg',
      title: 'Annual In-Service Residential Training Calendar 2026-27 at NSSTA Greater Noida',
      date: '28 February 2026',
      effectiveDate: 'May 2026 - March 2027',
      category: 'Training Circular',
      issuingDivision: 'Training Division, NSSTA Greater Noida',
      summary: 'Nomination quotas, continuous professional development (CPD) credit requirements, and mandatory modules on Big Data Analytics and Spatial Sampling for Senior Statistical Officers.',
      fileSize: '890 KB (PDF)',
      status: 'In Force'
    },
    {
      id: 'circ-04',
      orderNumber: 'Directive No. DPDP/MOSPI/2025-01',
      title: 'Mandatory Microdata Anonymization Protocols under Digital Personal Data Protection Act 2023',
      date: '18 October 2025',
      effectiveDate: '01 November 2025',
      category: 'DPDP Directive',
      issuingDivision: 'Data Governance & IT Division, MoSPI New Delhi',
      summary: 'Guidelines on k-anonymity (k >= 5), l-diversity on survey clusters, permanent redaction of direct identifiers (Aadhaar, Phone), and spatial blurring to sub-district centroids.',
      fileSize: '1.2 MB (PDF)',
      status: 'In Force'
    },
    {
      id: 'circ-05',
      orderNumber: 'F.No. 31/04/2025-SDRD/WGT',
      title: 'Guidelines on Non-Response Weight Adjustments in Multi-Stage Stratified Sampling',
      date: '05 August 2025',
      effectiveDate: 'Immediate',
      category: 'Technical Standard',
      issuingDivision: 'Survey Design & Research Division (SDRD), Mahalanobis Bhavan',
      summary: 'Mathematical formulation of stratum-level non-response multipliers, avoidance of row deletion bias, and sub-sample multiplier publishing requirements.',
      fileSize: '1.5 MB (PDF)',
      status: 'In Force'
    },
    {
      id: 'circ-06',
      orderNumber: 'OM No. 11012/01/2026-SSS-Admin',
      title: 'Cadre Allocation & Field Posting Guidelines for Statistical Officers (NSSO FOD)',
      date: '12 January 2026',
      effectiveDate: '01 March 2026',
      category: 'Cadre Order',
      issuingDivision: 'Field Operations Division (FOD) Headquarters',
      summary: 'Rotational transfer policy between Regional Hubs and Sub-Regional Offices, tenure norms for hard-duty survey stations, and digital attendance verification.',
      fileSize: '740 KB (PDF)',
      status: 'In Force'
    }
  ];

  const categories = ['All', 'Gazette Notification', 'Technical Standard', 'Cadre Order', 'DPDP Directive', 'Training Circular'];

  const filteredCirculars = circulars.filter(c => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.issuingDivision.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (c: CircularItem) => {
    addToast('Gazette Download Initiated', `Fetching authentic authenticated PDF for ${c.orderNumber}`, 'info');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-teal-100 text-[#0B1F3A] rounded-full text-xs font-black uppercase tracking-wider">
                Official Ministry Archive
              </span>
              <span className="text-xs text-slate-500 font-semibold">• Updated Weekly</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Gazette Notifications, Circulars & Technical Standards
            </h1>
            <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
              Authoritative repository of official MoSPI gazettes, National Statistical Commission directives, cadre office memorandums, and data scrutiny standards governing the Indian Statistical System.
            </p>
          </div>

          <button
            onClick={() => setShowAIAssistant(true)}
            className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#0B1F3A] hover:bg-[#123B63] text-white font-extrabold text-xs shadow-md shadow-teal-700/20 transition self-start md:self-auto shrink-0"
          >
            <Sparkles className="w-4 h-4 text-teal-200" />
            <span>Search via AI Copilot</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by order number, title, keyword..."
            className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500 focus:bg-white transition"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-[#0B1F3A] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Circulars List */}
      <div className="space-y-4">
        {filteredCirculars.map(c => (
          <div
            key={c.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:border-teal-400 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-extrabold text-[#0B1F3A] bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                    {c.orderNumber}
                  </span>
                  <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 font-bold rounded-lg">
                    {c.category}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-teal-50 text-[#0B1F3A] font-extrabold rounded-md flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-teal-700" />
                    <span>{c.status}</span>
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#0B1F3A] transition">
                  {c.title}
                </h3>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => handleDownload(c)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-teal-50 hover:text-[#0B1F3A] text-slate-700 font-extrabold text-xs border border-slate-200 hover:border-teal-300 transition active:scale-95"
                >
                  <Download className="w-3.5 h-3.5 text-teal-700" />
                  <span>Download PDF ({c.fileSize})</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-3.5 leading-relaxed">
              {c.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                <span className="truncate"><strong>Division:</strong> {c.issuingDivision}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                <span><strong>Issued:</strong> {c.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                <span><strong>Enforcement:</strong> {c.effectiveDate}</span>
              </div>
            </div>
          </div>
        ))}

        {filteredCirculars.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-extrabold text-slate-800 text-sm">No official circulars matched your filter</h3>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your keywords or clearing the category selection.</p>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  GraduationCap,
  MapPin,
  Calendar,
  Users,
  Award,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface AcademyItem {
  id: string;
  name: string;
  shortName: string;
  location: string;
  type: 'Apex Central Academy' | 'Statutory Institute of National Importance' | 'Regional Training Centre (RTC)';
  establishedYear: number;
  director: string;
  contactEmail: string;
  phone: string;
  upcomingCourses: {
    title: string;
    targetCadre: string;
    dates: string;
    capacity: number;
    seatsLeft: number;
  }[];
  facilities: string[];
}

export const AcademiesView: React.FC = () => {
  const { addToast } = useApp();
  const [selectedType, setSelectedType] = useState<string>('All');

  const academies: AcademyItem[] = [
    {
      id: 'nssta',
      name: 'National Statistical Systems Training Academy (NSSTA)',
      shortName: 'NSSTA Greater Noida',
      location: 'Plot No. 22, Knowledge Park-II, Greater Noida, Uttar Pradesh - 201310',
      type: 'Apex Central Academy',
      establishedYear: 2009,
      director: 'Dr. Alok Kumar, ISS (Director General)',
      contactEmail: 'dg.nssta@nic.in',
      phone: '+91-120-2328014',
      upcomingCourses: [
        {
          title: 'Advanced Microdata Scrutiny & CAPI Validation in NSS 80th Round',
          targetCadre: 'Senior Statistical Officers (SSO)',
          dates: '14 - 25 April 2026',
          capacity: 35,
          seatsLeft: 8
        },
        {
          title: 'National Accounts Statistics & Supply-Use Tables (SUT) Calibration',
          targetCadre: 'ISS Officers (JTS / STS Grades)',
          dates: '05 - 16 May 2026',
          capacity: 25,
          seatsLeft: 4
        }
      ],
      facilities: ['High-Performance Computing Lab', '120-Bed Residential Officers Hostel', 'Spatial GIS Survey Simulator', 'International Delegates Hall']
    },
    {
      id: 'isi-kolkata',
      name: 'Indian Statistical Institute (ISI Kolkata)',
      shortName: 'ISI Kolkata',
      location: '203 Barrackpore Trunk Road, Kolkata, West Bengal - 700108',
      type: 'Statutory Institute of National Importance',
      establishedYear: 1931,
      director: 'Prof. S. Bandyopadhyay (Director)',
      contactEmail: 'training@isical.ac.in',
      phone: '+91-33-25752001',
      upcomingCourses: [
        {
          title: 'Stochastic Modeling & Complex Survey Weight Calibration',
          targetCadre: 'ISS / Senior SSS Cadres',
          dates: '01 - 12 June 2026',
          capacity: 30,
          seatsLeft: 11
        }
      ],
      facilities: ['P.C. Mahalanobis Memorial Archives', 'Theoretical Statistics Computing Cluster', 'Central Statistical Reference Library']
    },
    {
      id: 'rtc-hyderabad',
      name: 'Regional Training Centre (RTC Hyderabad)',
      shortName: 'RTC Hyderabad (South Zone)',
      location: 'Kendriya Sadan, Sultan Bazar, Koti, Hyderabad, Telangana - 500095',
      type: 'Regional Training Centre (RTC)',
      establishedYear: 1978,
      director: 'Shri P. Venkateswara Rao, ISS (Director)',
      contactEmail: 'rtc.hyd@mospi.gov.in',
      phone: '+91-40-24651234',
      upcomingCourses: [
        {
          title: 'Field Level CAPI Operations & Non-Response Remediation',
          targetCadre: 'Junior Statistical Officers (JSO)',
          dates: '21 - 25 April 2026',
          capacity: 40,
          seatsLeft: 14
        }
      ],
      facilities: ['Regional CAPI Tablet Diagnostics Room', 'Air-conditioned Classrooms', 'Language Lab for Southern States']
    },
    {
      id: 'rtc-lucknow',
      name: 'Regional Training Centre (RTC Lucknow)',
      shortName: 'RTC Lucknow (North Zone)',
      location: 'Hall No. 2, Kendriya Bhawan, Sector H, Aliganj, Lucknow, UP - 226024',
      type: 'Regional Training Centre (RTC)',
      establishedYear: 1982,
      director: 'Smt. Vandana Srivastava, ISS (Joint Director)',
      contactEmail: 'rtc.lko@mospi.gov.in',
      phone: '+91-522-2329871',
      upcomingCourses: [
        {
          title: 'Consumer Price Index (Rural/Urban) Price Scrutiny Workshop',
          targetCadre: 'SSS Statistical Investigators',
          dates: '12 - 16 May 2026',
          capacity: 35,
          seatsLeft: 6
        }
      ],
      facilities: ['Price Index Compilation Lab', 'Northern Zone Training Annex', 'Video Conferencing Facility']
    }
  ];

  const filteredAcademies = academies.filter(a => {
    if (selectedType === 'All') return true;
    return a.type === selectedType;
  });

  const handleNominate = (courseTitle: string, academyName: string) => {
    addToast('Nomination Submitted', `Your official nomination for "${courseTitle}" at ${academyName} has been routed to your Controlling Officer.`, 'success');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-teal-100 text-[#0B1F3A] rounded-full text-xs font-black uppercase tracking-wider">
                Cadre Training Infrastructure
              </span>
              <span className="text-xs text-slate-500 font-semibold">• All-India Network</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              National Statistical Training Academies & RTC Network
            </h1>
            <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
              Permanent institutional network delivering continuous professional education, residential officer training, and specialized methodological workshops across India.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-teal-50 border border-teal-200 px-4 py-3 rounded-2xl">
            <GraduationCap className="w-5 h-5 text-[#0B1F3A] shrink-0" />
            <div className="text-xs">
              <div className="font-extrabold text-[#0B1F3A]">Mission Karmayogi Quota</div>
              <div className="text-[11px] text-[#0B1F3A]">50 Annual CPD Training Hours</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['All', 'Apex Central Academy', 'Statutory Institute of National Importance', 'Regional Training Centre (RTC)'].map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition whitespace-nowrap ${
              selectedType === type
                ? 'bg-[#0B1F3A] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Academies Grid */}
      <div className="space-y-6">
        {filteredAcademies.map(a => (
          <div
            key={a.id}
            className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xs hover:border-teal-400 hover:shadow-md transition-all duration-200 space-y-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-slate-100 pb-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs px-3 py-1 bg-teal-100 text-[#0B1F3A] font-extrabold rounded-lg">
                    {a.type}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">Est. {a.establishedYear}</span>
                </div>
                <h2 className="text-xl font-black text-slate-900">{a.name}</h2>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <MapPin className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>{a.location}</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70 text-xs space-y-1.5 shrink-0 min-w-[260px]">
                <div className="font-extrabold text-slate-800">{a.director}</div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Mail className="w-3.5 h-3.5 text-teal-700" />
                  <span>{a.contactEmail}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Phone className="w-3.5 h-3.5 text-teal-700" />
                  <span>{a.phone}</span>
                </div>
              </div>
            </div>

            {/* Upcoming Residential Courses */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-teal-700" />
                <span>Upcoming Residential Nominations</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {a.upcomingCourses.map((c, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-5 rounded-2xl bg-teal-50/40 border border-teal-200/80 hover:bg-teal-50 transition space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-[#0B1F3A] bg-teal-100 px-2 py-0.5 rounded-md">
                          {c.targetCadre}
                        </span>
                        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          {c.seatsLeft} seats left
                        </span>
                      </div>
                      <h4 className="font-black text-sm text-slate-900 mt-2">{c.title}</h4>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200 text-slate-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-teal-700" />
                        <span>{c.dates}</span>
                      </div>
                      <button
                        onClick={() => handleNominate(c.title, a.shortName)}
                        className="px-3 py-1.5 bg-[#0B1F3A] hover:bg-[#123B63] text-white rounded-xl font-bold text-xs transition active:scale-95 shadow-xs"
                      >
                        Apply for Nomination
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Facilities Bar */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mr-2">Campus Facilities:</span>
              {a.facilities.map((fac, fIdx) => (
                <span
                  key={fIdx}
                  className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium"
                >
                  {fac}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Badge } from '@/components/atoms/badge';
import { Button } from '@/components/atoms/button';
import { Internship } from '@/types/internship';
import { 
  PlayCircle, 
  Calendar, 
  IndianRupee, 
  Clock, 
  ArrowUpRight,
  Sparkles,
  X
} from 'lucide-react';

interface InternshipDetailModalProps {
  internship: Internship;
  isOpen: boolean;
  onClose: (e?: React.MouseEvent) => void;
  onApply: (e?: React.MouseEvent) => void;
}

export function InternshipDetailModal({ 
  internship, 
  isOpen, 
  onClose, 
  onApply 
}: InternshipDetailModalProps) {
  const [availability, setAvailability] = useState('Yes, I am available to join immediately');
  const [commit6Months, setCommit6Months] = useState('Yes');
  const [shiftComfortable, setShiftComfortable] = useState('Yes');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Helper to get initials if company logo is missing or errors
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  // Dynamic corporate brand logo generation based on company name
  const renderCompanyLogo = () => {
    const companyLower = (internship.company_name || '').toLowerCase();

    // 1. Google
    if (companyLower.includes('google')) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-white">
          <svg className="w-7 h-7" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        </div>
      );
    }

    // 2. Microsoft
    if (companyLower.includes('microsoft')) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-white">
          <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
            <div className="bg-[#F25022] w-2.5 h-2.5" />
            <div className="bg-[#7FBA00] w-2.5 h-2.5" />
            <div className="bg-[#00A4EF] w-2.5 h-2.5" />
            <div className="bg-[#FFB900] w-2.5 h-2.5" />
          </div>
        </div>
      );
    }

    // 3. Swiggy
    if (companyLower.includes('swiggy')) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-[#FC8019] text-white font-black text-lg select-none">
          S
        </div>
      );
    }

    // 4. Zomato
    if (companyLower.includes('zomato')) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-[#CB202D] text-white font-black text-lg select-none">
          Z
        </div>
      );
    }

    // 5. Infosys
    if (companyLower.includes('infosys')) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-[#007CC3] text-white font-black text-lg select-none">
          I
        </div>
      );
    }

    // 6. Meta / Facebook
    if (companyLower.includes('meta') || companyLower.includes('facebook')) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-white">
          <svg className="w-[26px] h-[26px] text-[#0064E0] fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
        </div>
      );
    }

    // 7. Amazon
    if (companyLower.includes('amazon')) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-[#191919] text-[#FF9900] font-black text-lg select-none">
          A
        </div>
      );
    }

    // 9. Apple
    if (companyLower.includes('apple')) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-white">
          <svg className="w-6.5 h-6.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.49-.62.71-1.16 1.85-1.01 2.96 1.12.09 2.27-.58 2.94-1.39" />
          </svg>
        </div>
      );
    }

    // Default char gradient logo
    const firstChar = internship.company_name.trim().charAt(0).toUpperCase();
    const code = firstChar.charCodeAt(0) || 65;
    let gradient = 'from-blue-500 to-sky-500';
    if (code >= 65 && code <= 68) {
      gradient = 'from-blue-500 to-sky-500';
    } else if (code >= 69 && code <= 72) {
      gradient = 'from-sky-500 to-blue-600';
    } else if (code >= 73 && code <= 76) {
      gradient = 'from-teal-500 to-emerald-500';
    } else if (code >= 77 && code <= 80) {
      gradient = 'from-amber-500 to-orange-500';
    } else if (code >= 81 && code <= 84) {
      gradient = 'from-rose-500 to-red-500';
    } else {
      gradient = 'from-cyan-500 to-blue-600';
    }

    return (
      <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-extrabold text-base tracking-wider shadow-inner select-none`}>
        {getInitials(internship.company_name)}
      </div>
    );
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div 
      onClick={(e) => {
        e.stopPropagation();
        onClose(e);
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 cursor-default"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-gray-100 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200 cursor-default"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Sticky Header */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center shrink-0">
          <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider">
            Applying to {internship.title} internship
          </h2>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClose(e);
            }}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {/* Job Primary Card Detail Header */}
          <div className="flex justify-between items-start gap-4 pb-6 border-b border-gray-100">
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-gray-900">
                {internship.title}
              </h3>
              <p className="text-sm font-semibold text-gray-500">
                {internship.company_name}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Badge variant="secondary" className="bg-[#00A5EC]/10 text-[#00A5EC] font-bold border-none">
                  Actively hiring
                </Badge>
                {internship.is_ppo && (
                  <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 font-bold">
                    With Job Offer (PPO)
                  </Badge>
                )}
              </div>
            </div>
            <div className="w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center bg-gray-50 shadow-inner">
              {renderCompanyLogo()}
            </div>
          </div>

          {/* Four-Column Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50/50 p-4 rounded-xl border border-gray-100/50 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <PlayCircle className="w-4.5 h-4.5 text-[#00A5EC] shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Start Date</span>
                <span className="font-bold text-gray-700">{internship.start_date}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4.5 h-4.5 text-[#00A5EC] shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Duration</span>
                <span className="font-bold text-gray-700">{internship.duration}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <IndianRupee className="w-4.5 h-4.5 text-[#00A5EC] shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Stipend</span>
                <span className="font-bold text-gray-700">{internship.stipend.salary}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4.5 h-4.5 text-[#00A5EC] shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Apply By</span>
                <span className="font-bold text-gray-700">
                  {internship.application_deadline || internship.expiring_in || 'Apply Immediately'}
                </span>
              </div>
            </div>
          </div>

          {/* About the internship section */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5">
              <h4 className="text-base font-bold text-gray-900">About the internship</h4>
              <Badge variant="outline" className="text-[10px] font-bold text-[#00A5EC] border-[#00A5EC]/30 bg-[#00A5EC]/5 flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5" /> Summarized by AI
              </Badge>
            </div>
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed bg-sky-50/20 p-5 rounded-xl border border-sky-100/30">
              <div>
                <h5 className="font-bold text-gray-900 text-xs uppercase tracking-wider pb-1">Role Overview:</h5>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Deliver exceptional support and work closely with team leaders to execute day-to-day deliverables.</li>
                  <li>Handle client requirements, document workflow items, and coordinate cross-functional milestones.</li>
                  <li>Ensure strict adherence to quality assurance metrics and company operational key results (KPIs).</li>
                </ul>
              </div>

              <div>
                <h5 className="font-bold text-gray-900 text-xs uppercase tracking-wider pb-1">Requirements:</h5>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Undergraduate or graduate with relevant domain interest or 3-6 months equivalent academic/professional exposure.</li>
                  <li>Vibrant problem-solving orientation, eager-to-learn attitude, and dynamic written/verbal expression.</li>
                  <li>Required Skills: <span className="font-semibold text-gray-800">{internship.profile_name || 'Operations, Teamwork, Communication'}</span></li>
                </ul>
              </div>

              <div>
                <h5 className="font-bold text-gray-900 text-xs uppercase tracking-wider pb-1">Additional Information & Working Model:</h5>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Working Model: 6 days working (Rotational shifts).</li>
                  <li>Female Shift Window: 7:00 AM – 7:00 PM (any 9-hour rotational block).</li>
                  <li>Male Shift Window: 7:00 AM – 2:00 AM (any 9-hour block, including rotational night shifts).</li>
                </ul>
              </div>
            </div>
          </div>

          {/* About the company section */}
          <div className="space-y-2 pb-6 border-b border-gray-100">
            <h4 className="text-base font-bold text-gray-900">About {internship.company_name}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {internship.company_name} is a global tech & solutions leader assisting marquee corporate clients across worldwide consumer and enterprise markets.
            </p>
            <div className="bg-gray-50 p-3 rounded-lg text-xs font-semibold text-gray-500 space-x-4">
              <span>Hiring since: July 2024</span>
              <span>•</span>
              <span>Opportunities posted: 19</span>
              <span>•</span>
              <span>Candidates hired: 3</span>
            </div>
          </div>

          {/* Interactive Form - Confirm Availability */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-gray-900">Confirm your availability</h4>
            <div className="space-y-2">
              {[
                'Yes, I am available to join immediately',
                'No, I am currently on notice period',
                'No, I will have to serve notice period',
                'Other (Please specify your availability)'
              ].map((option) => (
                <label key={option} className="flex items-start space-x-3 text-sm font-medium text-gray-700 cursor-pointer group">
                  <input 
                    type="radio" 
                    name={`availability-${internship.id}`} 
                    value={option} 
                    checked={availability === option}
                    onChange={() => setAvailability(option)}
                    className="mt-1 h-4 w-4 text-[#00A5EC] border-gray-300 focus:ring-[#00A5EC]" 
                  />
                  <span className="group-hover:text-gray-900 transition-colors">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Questions */}
          <div className="space-y-4 pt-2">
            <h4 className="text-base font-bold text-gray-900">Additional question(s)</h4>
            
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-700">
                Would you be comfortable committing to a full-time 6-months apprenticeship?
              </p>
              <div className="flex gap-4">
                {['Yes', 'No'].map((opt) => (
                  <label key={opt} className="flex items-center space-x-2 text-sm font-medium text-gray-700 cursor-pointer">
                    <input 
                      type="radio" 
                      name={`commit6Months-${internship.id}`} 
                      value={opt} 
                      checked={commit6Months === opt}
                      onChange={() => setCommit6Months(opt)}
                      className="h-4 w-4 text-[#00A5EC] border-gray-300 focus:ring-[#00A5EC]" 
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <p className="text-sm font-semibold text-gray-700 leading-snug">
                Are you comfortable working within the following shift timings based on your availability and eligibility? (Rotational shifts as detailed above)
              </p>
              <div className="flex gap-4">
                {['Yes', 'No'].map((opt) => (
                  <label key={opt} className="flex items-center space-x-2 text-sm font-medium text-gray-700 cursor-pointer">
                    <input 
                      type="radio" 
                      name={`shiftComfortable-${internship.id}`} 
                      value={opt} 
                      checked={shiftComfortable === opt}
                      onChange={() => setShiftComfortable(opt)}
                      className="h-4 w-4 text-[#00A5EC] border-gray-300 focus:ring-[#00A5EC]" 
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 shrink-0">
          <Button 
            variant="ghost" 
            onClick={(e) => {
              e.stopPropagation();
              onClose(e);
            }}
            className="text-sm h-10 px-5 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-200 font-semibold border-none"
          >
            Cancel
          </Button>
          <Button 
            onClick={(e) => onApply(e)}
            className="text-sm h-10 px-6 rounded-xl bg-[#00A5EC] hover:bg-[#00A5EC]/90 text-white font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            Apply now
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}

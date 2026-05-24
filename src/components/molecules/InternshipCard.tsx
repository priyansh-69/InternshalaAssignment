'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/atoms/card';
import { Badge } from '@/components/atoms/badge';
import { Button } from '@/components/atoms/button';
import { Internship } from '@/types/internship';
import { 
  MapPin, 
  PlayCircle, 
  Calendar, 
  IndianRupee, 
  Clock, 
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';
import { Separator } from '@/components/atoms/separator';
import { InternshipDetailModal } from './InternshipDetailModal';

interface InternshipCardProps {
  internship: Internship;
}

export function InternshipCard({ internship }: InternshipCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleApplyClick = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    let slug = internship.url || '';
    if (!slug.includes('/internship/detail/')) {
      const cleanSlug = slug.startsWith('/') ? slug.substring(1) : slug;
      slug = `/internship/detail/${cleanSlug}`;
    }
    window.open(`https://internshala.com${slug}`, '_blank');
  };


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

    // 8. Netflix
    if (companyLower.includes('netflix')) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-[#E50914] text-white font-black text-lg select-none">
          N
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

    // 10. Default: Brand char-code dynamic gradient avatar
    const firstChar = internship.company_name.trim().charAt(0).toUpperCase();
    const code = firstChar.charCodeAt(0) || 65;

    let gradient = 'from-blue-500 to-sky-500';
    if (code >= 65 && code <= 68) { // A-D
      gradient = 'from-blue-500 to-sky-500';
    } else if (code >= 69 && code <= 72) { // E-H
      gradient = 'from-sky-500 to-blue-600';
    } else if (code >= 73 && code <= 76) { // I-L
      gradient = 'from-teal-500 to-emerald-500';
    } else if (code >= 77 && code <= 80) { // M-P
      gradient = 'from-amber-500 to-orange-500';
    } else if (code >= 81 && code <= 84) { // Q-T
      gradient = 'from-rose-500 to-red-500';
    } else if (code >= 85 && code <= 90) { // U-Z
      gradient = 'from-cyan-500 to-blue-600';
    }

    return (
      <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-extrabold text-base tracking-wider shadow-inner select-none`}>
        {getInitials(internship.company_name)}
      </div>
    );
  };

  return (
    <Card 
      onClick={() => setIsDetailOpen(true)}
      className="w-full hover:shadow-xl hover:-translate-y-1.5 hover:border-blue-200 transition-all duration-300 bg-white border border-gray-100 rounded-2xl overflow-hidden group cursor-pointer"
    >
      <CardHeader className="pb-3 px-6 pt-6">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-2 flex-1">
            
            {/* Actively Hiring Badge + Live Applicant Counter from Backend */}
            <div className="flex flex-wrap items-center gap-2">
              {internship.is_active && (
                <Badge 
                  variant="secondary" 
                  className="text-[11px] font-bold text-[#00A5EC] bg-[#00A5EC]/10 border border-[#00A5EC]/25 px-2.5 py-0.5 rounded-md inline-flex items-center gap-1"
                >
                  <PlayCircle className="w-3.5 h-3.5" /> Actively hiring
                </Badge>
              )}
              {internship.application_status_message?.message && (
                <span className="text-xs font-semibold text-gray-400 flex items-center gap-1 bg-gray-50 border border-gray-100/50 px-2 py-0.5 rounded-md">
                  <TrendingUp className="w-3 h-3 text-blue-400" />
                  {internship.application_status_message.message}
                </span>
              )}
            </div>

            <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-[#00A5EC] transition-colors">
              {internship.title}
            </h3>
            <p className="text-sm font-semibold text-gray-500">
              {internship.company_name}
            </p>
          </div>

          {/* Dynamic Brand Logo / Initials Avatar */}
          {/* We use our local premium dynamic generator to prevent Internshala CDN 403 Forbidden network errors! */}
          <div className="w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center bg-gray-50 shadow-inner">
            {renderCompanyLogo()}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-5 px-6 pb-4">
        {/* Location Info */}
        <div className="flex items-center text-sm text-gray-600 font-medium">
          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
          <span>
            {internship.work_from_home 
              ? 'Work from Home' 
              : internship.location_names && internship.location_names.length > 0
                ? internship.location_names.join(', ')
                : 'India'}
          </span>
        </div>
        
        {/* Four-Column Internship Details Row (Perfect alignment including dynamic deadline!) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50/50 p-4 rounded-xl border border-gray-100/50 text-sm text-gray-600">
          {/* Column 1: Start Date */}
          <div className="flex items-center space-x-2.5">
            <PlayCircle className="w-4 h-4 text-[#00A5EC]" />
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Start Date</span>
              <span className="font-semibold text-gray-700">{internship.start_date}</span>
            </div>
          </div>
          
          {/* Column 2: Duration */}
          <div className="flex items-center space-x-2.5">
            <Calendar className="w-4 h-4 text-[#00A5EC]" />
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Duration</span>
              <span className="font-semibold text-gray-700">{internship.duration}</span>
            </div>
          </div>
          
          {/* Column 3: Stipend */}
          <div className="flex items-center space-x-2.5">
            <IndianRupee className="w-4 h-4 text-[#00A5EC]" />
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Stipend</span>
              <span className="font-semibold text-gray-700">{internship.stipend.salary}</span>
            </div>
          </div>

          {/* Column 4: Apply By / Urgency Indicator */}
          <div className="flex items-center space-x-2.5">
            <Clock className="w-4 h-4 text-[#00A5EC]" />
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Apply By</span>
              <span className="font-semibold text-gray-700">
                {internship.application_deadline || internship.expiring_in || 'Apply Immediately'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Dynamic Badges / Meta Info from API */}
        <div className="flex flex-wrap gap-2">
          {internship.is_ppo && (
            <Badge 
              variant="outline" 
              className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-200 font-semibold rounded-lg px-2.5 py-0.5"
            >
              {internship.ppo_label_value || 'With job offer'}
            </Badge>
          )}
          {internship.part_time && (
            <Badge 
              variant="outline" 
              className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200 font-semibold rounded-lg px-2.5 py-0.5"
            >
              Part time
            </Badge>
          )}

          {internship.eligible_for_easy_apply && (
            <Badge 
              variant="outline" 
              className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200 font-semibold rounded-lg px-2.5 py-0.5"
            >
              Easy Apply
            </Badge>
          )}
        </div>
      </CardContent>
      
      <Separator className="border-gray-50" />
      
      <CardFooter className="px-6 py-4 flex justify-between items-center bg-gray-50/30">
        <div className="flex items-center text-xs text-gray-400 font-medium">
          <Clock className="w-3.5 h-3.5 mr-1" />
          <span>{internship.posted_by_label || internship.posted_on}</span>
        </div>
        <div className="space-x-2 flex">
          <Button 
            variant="ghost" 
            onClick={(e) => {
              e.stopPropagation();
              setIsDetailOpen(true);
            }}
            className="text-xs h-9 px-4 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-semibold border-none"
          >
            View details
          </Button>
          <Button 
            onClick={(e) => handleApplyClick(e)}
            className="text-xs h-9 px-4 rounded-xl bg-[#00A5EC] hover:bg-[#00A5EC]/90 text-white font-semibold flex items-center gap-1 shadow-sm transition-all duration-200 hover:shadow"
          >
            Apply now
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </CardFooter>

      {/* Premium Detail Modal POPUP */}
      <InternshipDetailModal
        internship={internship}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onApply={(e) => handleApplyClick(e)}
      />
    </Card>
  );
}

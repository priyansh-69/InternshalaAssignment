'use client';

import { useDispatch, useSelector } from 'react-redux';
import { selectFilters, selectTotalFilteredResults } from '@/features/internships/selectors';
import { updateFilter, clearFilters } from '@/features/internships/slice';
import { Button } from '@/components/atoms/button';
import { Badge } from '@/components/atoms/badge';
import { 
  ChevronDown, 
  MessageSquare, 
  X, 
  SlidersHorizontal 
} from 'lucide-react';

export function SearchHeader() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const totalResults = useSelector(selectTotalFilteredResults);

  const removeChip = (key: 'profile' | 'location' | 'duration' | 'stipend', valueToRemove?: string) => {
    if (key === 'profile') {
      dispatch(updateFilter({ key: 'profile', value: '' }));
    } else if (key === 'location') {
      dispatch(updateFilter({ key: 'location', value: '' }));
    } else if (key === 'stipend') {
      dispatch(updateFilter({ key: 'stipend', value: 0 }));
    } else if (key === 'duration' && valueToRemove) {
      const remainingDurations = filters.duration.filter((d) => d !== valueToRemove);
      dispatch(updateFilter({ key: 'duration', value: remainingDurations }));
    }
  };

  // Check if any filter is active
  const hasActiveFilters = 
    !!filters.profile || 
    !!filters.location || 
    filters.duration.length > 0 || 
    filters.stipend > 0;

  return (
    <div className="w-full space-y-6">
      {/* Full-Width Brand Navigation Bar */}
      <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-[72px] flex items-center justify-between">
          
          {/* Left: Pixel-Perfect Internshala Logo with Paper Plane */}
          <div className="flex items-center space-x-1 font-extrabold text-[21px] tracking-[0.02em] select-none cursor-pointer">
            <span className="text-[#00A5EC]">INTERN</span>
            <span className="text-[#484848] relative">
              SHALA
              {/* Paper Plane SVG flying upwards above SHALA */}
              <svg className="absolute -top-3.5 -right-[15px] w-[15px] h-[15px] text-[#00A5EC] fill-current transform rotate-[15deg]" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </span>
          </div>

          {/* Right: Navigation Items */}
          <div className="hidden lg:flex items-center space-x-7 h-full text-[14px] font-semibold text-gray-700">
            {/* Internships Link (Active state with blue border-bottom) */}
            <div className="relative h-full flex items-center space-x-1 cursor-pointer text-gray-900 border-b-[3px] border-[#00A5EC] px-1 pt-[3px]">
              <span>Internships</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </div>

            {/* Courses Link (with custom orange Offer badge) */}
            <div className="flex items-center space-x-1.5 cursor-pointer hover:text-[#00A5EC] transition-colors py-2 px-1">
              <span>Courses</span>
              <span className="bg-[#f97316] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider scale-[0.85] origin-left">
                OFFER
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </div>

            {/* Jobs Link */}
            <div className="flex items-center space-x-1 cursor-pointer hover:text-[#00A5EC] transition-colors py-2 px-1">
              <span>Jobs</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </div>

            {/* IS PRO Link */}
            <div className="cursor-pointer hover:text-[#00A5EC] transition-colors py-2 px-1 font-bold text-gray-800 tracking-wide">
              IS PRO
            </div>

            {/* Chat Icon Link */}
            <div className="cursor-pointer hover:text-[#00A5EC] transition-colors p-1.5 rounded-full hover:bg-gray-50 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-gray-500" />
            </div>

            {/* User Profile Avatar Circle Dropdown */}
            <div className="flex items-center space-x-1.5 cursor-pointer group py-2">
              <div className="w-[30px] h-[30px] rounded-full border border-gray-300 flex items-center justify-center font-bold text-[#00A5EC] text-[13px] bg-blue-50/50 shadow-inner group-hover:border-[#00A5EC] transition-colors">
                P
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-700 transition-colors" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Centered Result Counter Banner (Contained inside layout container) */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="py-8 flex flex-col items-center justify-center text-center bg-blue-50/20 border border-blue-100/30 rounded-3xl p-6 md:p-8 shadow-inner">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {totalResults} {totalResults === 1 ? 'internship' : 'internships'} matching
          </h1>
        </div>
      </div>

      {/* Active Filter Chips (Contained inside layout container) */}
      {hasActiveFilters && (
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-wrap items-center gap-2 bg-white border border-gray-100 rounded-2xl shadow-sm px-5 py-3">
            <span className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3 h-3" /> Active:
            </span>

            {filters.profile && (
              <Badge 
                variant="secondary" 
                className="pl-2.5 pr-1.5 py-1 text-xs text-blue-700 bg-blue-50 rounded-lg flex items-center gap-1 border border-blue-100/50 font-medium"
              >
                Profile: {filters.profile}
                <Button 
                  onClick={() => removeChip('profile')}
                  className="h-4 w-4 p-0 rounded-full hover:bg-blue-100 flex items-center justify-center border-none"
                >
                  <X className="w-2.5 h-2.5" />
                </Button>
              </Badge>
            )}

            {filters.location && (
              <Badge 
                variant="secondary" 
                className="pl-2.5 pr-1.5 py-1 text-xs text-blue-700 bg-blue-50 rounded-lg flex items-center gap-1 border border-blue-100/50 font-medium"
              >
                Location: {filters.location}
                <Button 
                  onClick={() => removeChip('location')}
                  className="h-4 w-4 p-0 rounded-full hover:bg-blue-100 flex items-center justify-center border-none"
                >
                  <X className="w-2.5 h-2.5" />
                </Button>
              </Badge>
            )}

            {filters.duration.map((dur) => (
              <Badge 
                key={`chip-${dur}`}
                variant="secondary" 
                className="pl-2.5 pr-1.5 py-1 text-xs text-blue-700 bg-blue-50 rounded-lg flex items-center gap-1 border border-blue-100/50 font-medium"
              >
                Duration: {dur} {parseInt(dur) === 1 ? 'Month' : 'Months'}
                <Button 
                  onClick={() => removeChip('duration', dur)}
                  className="h-4 w-4 p-0 rounded-full hover:bg-blue-100 flex items-center justify-center border-none"
                >
                  <X className="w-2.5 h-2.5" />
                </Button>
              </Badge>
            ))}

            {filters.stipend > 0 && (
              <Badge 
                variant="secondary" 
                className="pl-2.5 pr-1.5 py-1 text-xs text-blue-700 bg-blue-50 rounded-lg flex items-center gap-1 border border-blue-100/50 font-medium"
              >
                Stipend: ≥ ₹{filters.stipend}/mo
                <Button 
                  onClick={() => removeChip('stipend')}
                  className="h-4 w-4 p-0 rounded-full hover:bg-blue-100 flex items-center justify-center border-none"
                >
                  <X className="w-2.5 h-2.5" />
                </Button>
              </Badge>
            )}

            <Button
              onClick={() => dispatch(clearFilters())}
              variant="ghost"
              className="text-xs h-7 px-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Clear all
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

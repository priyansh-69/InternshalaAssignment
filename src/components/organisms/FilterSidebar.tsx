'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilters, updateFilter } from '@/features/internships/slice';
import { RootState } from '@/store/redux/store';
import { Input } from '@/components/atoms/input';
import { Card, CardContent } from '@/components/atoms/card';
import { Button } from '@/components/atoms/button';
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  HelpCircle,
  Filter 
} from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

export function FilterSidebar() {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.internships.filters);

  // Toggle state for expanded "View more filters"
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Local state for profile (for standard keyword search) and location
  const [profileInput, setProfileInput] = useState(filters.profile);
  const [locationInput, setLocationInput] = useState(filters.location);
  const [keywordSearch, setKeywordSearch] = useState(filters.profile);

  // Debounced inputs
  const debouncedProfile = useDebounce(profileInput, 300);
  const debouncedLocation = useDebounce(locationInput, 300);

  // Sync inputs if filters are cleared externally (e.g., via Clear All)
  useEffect(() => {
    setProfileInput(filters.profile);
    setKeywordSearch(filters.profile);
  }, [filters.profile]);

  useEffect(() => {
    setLocationInput(filters.location);
  }, [filters.location]);

  // Dispatch debounced filter updates
  useEffect(() => {
    dispatch(updateFilter({ key: 'profile', value: debouncedProfile }));
  }, [debouncedProfile, dispatch]);

  useEffect(() => {
    dispatch(updateFilter({ key: 'location', value: debouncedLocation }));
  }, [debouncedLocation, dispatch]);

  const handleKeywordSearchSubmit = () => {
    dispatch(updateFilter({ key: 'profile', value: keywordSearch }));
  };

  const handleKeywordSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleKeywordSearchSubmit();
    }
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <aside className="w-full space-y-6">
      {/* Main Filter Card */}
      <Card className="border border-gray-200 bg-white rounded-xl shadow-sm transition-all duration-300 relative z-30">
        <CardContent className="p-6 space-y-5">
          {/* Centered Funnel Icon + Filters Header */}
          <div className="flex items-center justify-center space-x-2 text-[#484848] font-bold text-[17px] border-b border-gray-100 pb-3 select-none">
            <Filter className="w-[18px] h-[18px] text-[#00A5EC]" />
            <span>Filters</span>
          </div>

          {/* 1. As per my preferences Checkbox */}
          <div className="flex items-center space-x-3 py-1">
            <input
              type="checkbox"
              id="isPreferences"
              checked={filters.isPreferences}
              onChange={(e) => dispatch(updateFilter({ key: 'isPreferences', value: e.target.checked }))}
              className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500 bg-white accent-[#00A5EC] cursor-pointer"
            />
            <label htmlFor="isPreferences" className="text-sm font-semibold text-gray-700 cursor-pointer select-none">
              As per my <span className="text-[#00A5EC] hover:underline">preferences</span>
            </label>
          </div>

          {/* Profile Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Profile
            </label>
            <Input
              value={profileInput}
              onChange={(e) => setProfileInput(e.target.value)}
              placeholder="e.g. Marketing"
              className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white text-sm"
            />
          </div>

          {/* Location Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Location
            </label>
            <Input
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder="e.g. Delhi"
              className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white text-sm"
            />
          </div>

          {/* Location Checklist (Internships in my city, Work from home, Part-time) */}
          <div className="space-y-2.5 pt-1">
            {/* Internships in my city */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="inMyCity"
                checked={filters.inMyCity}
                onChange={(e) => dispatch(updateFilter({ key: 'inMyCity', value: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-300 text-[#00A5EC] focus:ring-[#00A5EC] bg-white accent-[#00A5EC] cursor-pointer"
              />
              <label htmlFor="inMyCity" className="text-sm font-medium text-[#484848] cursor-pointer select-none">
                Internships in my city
              </label>
            </div>

            {/* Work from home */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isWfh"
                checked={filters.isWfh}
                onChange={(e) => dispatch(updateFilter({ key: 'isWfh', value: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-300 text-[#00A5EC] focus:ring-[#00A5EC] bg-white accent-[#00A5EC] cursor-pointer"
              />
              <label htmlFor="isWfh" className="text-sm font-medium text-[#484848] cursor-pointer select-none">
                Work from home
              </label>
            </div>

            {/* Part-time */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isPartTime"
                checked={filters.isPartTime}
                onChange={(e) => dispatch(updateFilter({ key: 'isPartTime', value: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-300 text-[#00A5EC] focus:ring-[#00A5EC] bg-white accent-[#00A5EC] cursor-pointer"
              />
              <label htmlFor="isPartTime" className="text-sm font-medium text-[#484848] cursor-pointer select-none">
                Part-time
              </label>
            </div>
          </div>

          {/* Stipend Filter */}
          <div className="space-y-4 pt-2">
            <label className="text-sm font-semibold text-gray-700">
              Desired minimum monthly stipend (₹)
            </label>
            
            <div className="pt-2 px-1">
              <input
                type="range"
                min="0"
                max="10000"
                step="2000"
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#00A5EC]"
                value={filters.stipend}
                onChange={(e) => dispatch(updateFilter({ key: 'stipend', value: parseInt(e.target.value, 10) }))}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                <span>0</span>
                <span>2K</span>
                <span>4K</span>
                <span>6K</span>
                <span>8K</span>
                <span>10K</span>
              </div>
            </div>
          </div>

          {/* Action triggers bottom row */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            {/* View More Filters Toggle Link */}
            <button
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className="inline-flex items-center text-sm font-bold text-[#00A5EC] hover:underline transition-colors focus:outline-none"
            >
              {showMoreFilters ? 'View less filters' : 'View more filters'}
              {showMoreFilters ? (
                <ChevronUp className="w-4 h-4 ml-1" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-1" />
              )}
            </button>

            {/* Clear All Link */}
            <button
              onClick={handleClearFilters}
              className="text-sm font-bold text-[#00A5EC] hover:underline transition-colors focus:outline-none cursor-pointer"
            >
              Clear all
            </button>
          </div>

          {/* Expanded view more filters drawer */}
          {showMoreFilters && (
            <div className="pt-4 border-t border-gray-100 space-y-5 animate-in fade-in slide-in-from-top-4 duration-300">
              {/* Date picker */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Starting from (or after)
                </label>
                <Input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => dispatch(updateFilter({ key: 'startDate', value: e.target.value }))}
                  className="w-full h-10 px-3 border border-gray-200 rounded-lg bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Max duration select */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Max. duration (months)
                </label>
                <select
                  value={filters.maxDuration}
                  onChange={(e) => dispatch(updateFilter({ key: 'maxDuration', value: e.target.value }))}
                  className="w-full h-10 px-3 border border-gray-200 rounded-lg bg-white text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Choose duration</option>
                  <option value="1">1 Month</option>
                  <option value="2">2 Months</option>
                  <option value="3">3 Months</option>
                  <option value="4">4 Months</option>
                  <option value="6">6 Months</option>
                  <option value="12">12 Months</option>
                </select>
              </div>

              {/* Additional Accordion Checkboxes with custom hover tooltips */}
              <div className="space-y-3.5 pt-2">
                {/* 1. Job Offer PPO */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isPpo"
                    checked={filters.isPpo}
                    onChange={(e) => dispatch(updateFilter({ key: 'isPpo', value: e.target.checked }))}
                    className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500 bg-white accent-[#00A5EC] cursor-pointer"
                  />
                  <div className="flex items-center">
                    <label htmlFor="isPpo" className="text-sm font-medium text-gray-600 cursor-pointer select-none">
                      Internships with job offer
                    </label>
                    <div className="relative group flex items-center">
                      <HelpCircle className="w-3.5 h-3.5 ml-1.5 text-gray-400 cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 hidden group-hover:block w-64 bg-zinc-800 text-white text-[11px] rounded-lg p-2.5 shadow-lg z-50 text-center leading-normal animate-in fade-in zoom-in-95 duration-100">
                        Will show internships which will offer a full-time job to the intern at the end of internship depending on performance
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-zinc-800" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Fast Response */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="fastResponse"
                    checked={filters.fastResponse}
                    onChange={(e) => dispatch(updateFilter({ key: 'fastResponse', value: e.target.checked }))}
                    className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500 bg-white accent-[#00A5EC] cursor-pointer"
                  />
                  <div className="flex items-center">
                    <label htmlFor="fastResponse" className="text-sm font-medium text-gray-600 cursor-pointer select-none">
                      Fast response
                    </label>
                    <div className="relative group flex items-center">
                      <HelpCircle className="w-3.5 h-3.5 ml-1.5 text-gray-400 cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 hidden group-hover:block w-60 bg-zinc-800 text-white text-[11px] rounded-lg p-2.5 shadow-lg z-50 text-center leading-normal animate-in fade-in zoom-in-95 duration-100">
                        Internships where you are likely to get faster response from employers
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-zinc-800" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Early Applicant */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="earlyApplicant"
                    checked={filters.earlyApplicant}
                    onChange={(e) => dispatch(updateFilter({ key: 'earlyApplicant', value: e.target.checked }))}
                    className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500 bg-white accent-[#00A5EC] cursor-pointer"
                  />
                  <div className="flex items-center">
                    <label htmlFor="earlyApplicant" className="text-sm font-medium text-gray-600 cursor-pointer select-none">
                      Early applicant
                    </label>
                    <div className="relative group flex items-center">
                      <HelpCircle className="w-3.5 h-3.5 ml-1.5 text-gray-400 cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 hidden group-hover:block w-64 bg-zinc-800 text-white text-[11px] rounded-lg p-2.5 shadow-lg z-50 text-center leading-normal animate-in fade-in zoom-in-95 duration-100">
                        Internships where you will be among first ones to apply and have 3X chances of getting hired
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-zinc-800" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Internships for women */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="forWomen"
                    checked={filters.forWomen}
                    onChange={(e) => dispatch(updateFilter({ key: 'forWomen', value: e.target.checked }))}
                    className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500 bg-white accent-[#00A5EC] cursor-pointer"
                  />
                  <div className="flex items-center">
                    <label htmlFor="forWomen" className="text-sm font-medium text-gray-600 cursor-pointer select-none">
                      Internships for women
                    </label>
                    <div className="relative group flex items-center">
                      <HelpCircle className="w-3.5 h-3.5 ml-1.5 text-gray-400 cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 hidden group-hover:block w-60 bg-zinc-800 text-white text-[11px] rounded-lg p-2.5 shadow-lg z-50 text-center leading-normal animate-in fade-in zoom-in-95 duration-100">
                        Will show internships which are also open to women (re)starting their careers
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-zinc-800" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Separate Keyword Search Card */}
      <Card className="border border-gray-200 bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300">
        <CardContent className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-center text-[#484848] select-none">
            Keyword Search
          </h3>
          <div className="flex gap-2">
            <Input
              value={keywordSearch}
              onChange={(e) => setKeywordSearch(e.target.value)}
              onKeyDown={handleKeywordSearchKeyDown}
              placeholder="e.g. Design, Mumbai, Infosys"
              className="flex-1 h-10 px-3 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
            />
            <Button
              onClick={handleKeywordSearchSubmit}
              className="h-10 w-10 p-0 bg-[#00A5EC] hover:bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-sm"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}

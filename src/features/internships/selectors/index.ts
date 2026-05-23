import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/redux/store';

// These are simple selectors to grab our internships array and current active filters from Redux!
const selectInternshipsData = (state: RootState) => state.internships.data;
export const selectFilters = (state: RootState) => state.internships.filters;

// This helper parses duration strings like "3 Months" or "6 Months" into numbers.
// Since the API returns a string, we extract the digit so we can compare it easily!
function parseDuration(durationString: string | undefined | null): number {
  if (!durationString) return 0;
  const match = durationString.match(/\d+/);
  if (!match) return 0; // Return 0 if there are no numbers in the string
  return parseInt(match[0], 10);
}

// Master selector to handle frontend filtering! Memoized using createSelector to keep the app super fast!
export const selectFilteredInternships = createSelector(
  [selectInternshipsData, selectFilters],
  (internships, filters) => {
    return internships.filter((internship) => {
      // 1. Profile / Keyword Search Filter (looks for matches in titles, company name, profile, or locations)
      if (filters.profile && filters.profile.trim() !== '') {
        const query = filters.profile.toLowerCase().trim();
        const titleMatch = internship.title?.toLowerCase().includes(query);
        const profileMatch = internship.profile_name?.toLowerCase().includes(query);
        const companyMatch = internship.company_name?.toLowerCase().includes(query);
        const locationMatch = internship.location_names?.some(loc => loc.toLowerCase().includes(query)) || false;
        
        if (!titleMatch && !profileMatch && !companyMatch && !locationMatch) {
          return false;
        }
      }

      // 2. Location Filter (Case insensitive partial match)
      if (filters.location && filters.location.trim() !== '') {
        const locationQuery = filters.location.toLowerCase();
        // Check location names array or if it's WFH
        const matchesLocation = internship.location_names.some((loc) => loc.toLowerCase().includes(locationQuery));
        const isWfhQuery = locationQuery.includes('work from home') || locationQuery.includes('remote');
        if (!matchesLocation && !(isWfhQuery && internship.work_from_home)) {
          return false;
        }
      }

      // 3. Multi-checkbox Duration Filter (Legacy sidebar durations)
      if (filters.duration && filters.duration.length > 0) {
        const maxDurationAllowed = Math.max(...filters.duration.map(d => parseInt(d, 10)));
        const internshipDuration = parseDuration(internship.duration);
        if (internshipDuration > maxDurationAllowed) {
          return false;
        }
      }

      // 4. Stipend Filter (Minimum Stipend)
      if (filters.stipend > 0) {
        const internshipStipend = internship.stipend?.salaryValue1 || 0;
        if (internshipStipend < filters.stipend) {
          return false;
        }
      }

      // 5. "Starting from (or after)" Date Filter
      if (filters.startDate && filters.startDate.trim() !== '') {
        const filterDate = new Date(filters.startDate);
        // Find a valid date string from the backend data
        const internshipDateStr = internship.start_date1 || internship.posted_on || internship.expires_at;
        if (internshipDateStr) {
          const internshipDate = new Date(internshipDateStr);
          if (!isNaN(internshipDate.getTime()) && internshipDate < filterDate) {
            return false;
          }
        }
      }

      // 6. "Max. duration (months)" Dropdown Filter
      if (filters.maxDuration && filters.maxDuration.trim() !== '') {
        const maxDurVal = parseInt(filters.maxDuration, 10);
        if (!isNaN(maxDurVal)) {
          const internshipDuration = parseDuration(internship.duration);
          if (internshipDuration > maxDurVal) {
            return false;
          }
        }
      }

      // 7. "Internships with job offer" Checkbox Filter (PPO)
      if (filters.isPpo && !internship.is_ppo) {
        return false;
      }

      // 8. "Fast response" Checkbox Filter
      if (filters.fastResponse) {
        const hasFastLabel = internship.to_show_extra_label && 
                              (internship.extra_label_value?.toLowerCase().includes('fast') || 
                               internship.extra_label_value?.toLowerCase().includes('active'));
        const hasFastStatus = internship.application_status_message?.type?.toLowerCase().includes('fast') || 
                               internship.application_status_message?.message?.toLowerCase().includes('response') || 
                               internship.posted_by_label?.toLowerCase().includes('responsive');
        if (!hasFastLabel && !hasFastStatus) {
          return false;
        }
      }

      // 9. "Early applicant" Checkbox Filter
      if (filters.earlyApplicant) {
        const appMessage = internship.application_status_message?.message?.toLowerCase() || '';
        const isEarly = appMessage.includes('early') || 
                        appMessage.includes('0 applicants') || 
                        appMessage.includes('1 applicant') || 
                        appMessage.includes('2 applicant') || 
                        appMessage.includes('3 applicant');
        const isEasy = internship.eligible_for_easy_apply;
        if (!isEarly && !isEasy) {
          return false;
        }
      }

      // 10. "Internships for women" Checkbox Filter
      if (filters.forWomen) {
        const extraLabel = (internship.extra_label_value || '').toLowerCase();
        const campaignLabel = (internship.campaign_name || '').toLowerCase();
        const titleText = (internship.title || '').toLowerCase();
        const isForWomen = extraLabel.includes('women') || 
                           campaignLabel.includes('women') || 
                           titleText.includes('women') || 
                           titleText.includes('female');
        if (!isForWomen) {
          return false;
        }
      }

      // 11. "As per my preferences" Checkbox Filter
      if (filters.isPreferences) {
        const isPreferred = internship.is_active || 
                            internship.eligible_for_easy_apply || 
                            (internship.stipend?.salaryValue1 && internship.stipend.salaryValue1 > 5000);
        if (!isPreferred) {
          return false;
        }
      }

      // 12. "Internships in my city" Checkbox Filter (Targeting 'delhi' or WFH)
      if (filters.inMyCity) {
        const userCity = 'delhi';
        const matchesCity = internship.location_names?.some(loc => loc.toLowerCase().includes(userCity)) || false;
        const isWfh = internship.work_from_home;
        if (!matchesCity && !isWfh) {
          return false;
        }
      }

      // 13. "Work from home" Checkbox Filter
      if (filters.isWfh && !internship.work_from_home) {
        return false;
      }

      // 14. "Part-time" Checkbox Filter
      if (filters.isPartTime && !internship.part_time) {
        return false;
      }

      return true;
    });
  }
);

export const selectCurrentPage = (state: RootState) => state.internships.currentPage;
export const selectItemsPerPage = (state: RootState) => state.internships.itemsPerPage;

export const selectPaginatedInternships = createSelector(
  [selectFilteredInternships, selectCurrentPage, selectItemsPerPage],
  (filteredInternships, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredInternships.slice(startIndex, endIndex);
  }
);

export const selectTotalFilteredResults = createSelector(
  [selectFilteredInternships],
  (filteredInternships) => filteredInternships.length
);

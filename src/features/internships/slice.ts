import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Internship } from '@/types/internship';

// This interface defines all the filters we support in our app.
// I grouped them all in one clean place so it is easy to update!
export interface Filters {
  profile: string; // The search text for profile roles (like Developer, Designer)
  location: string; // Target location entered by the user
  duration: string[]; // For our legacy checkboxes of durations
  stipend: number; // The minimum monthly stipend chosen on our slider
  startDate: string; // "Starting from (or after)" date value from calendar
  maxDuration: string; // Selected option from the duration dropdown selector
  isPpo: boolean; // Checkbox for "Internships with job offer"
  fastResponse: boolean; // Checkbox for "Fast response"
  earlyApplicant: boolean; // Checkbox for "Early applicant"
  forWomen: boolean; // Checkbox for "Internships for women"
  isPreferences: boolean; // Checkbox for "As per my preferences"
  inMyCity: boolean; // Checkbox for "Internships in my city" (Delhi)
  isWfh: boolean; // Checkbox for "Work from home" (remote)
  isPartTime: boolean; // Checkbox for "Part-time"
}

// Defining our main Redux state structure
interface InternshipsState {
  data: Internship[]; // The full un-filtered list of internships loaded from the backend API
  filters: Filters; // The current active filter settings
  currentPage: number; // Current active page number for pagination
  itemsPerPage: number; // How many jobs we want to show per page
}

// These are the default values when the app starts or when "Clear all" is clicked
const initialState: InternshipsState = {
  data: [],
  filters: {
    profile: '',
    location: '',
    duration: [],
    stipend: 0,
    startDate: '',
    maxDuration: '',
    isPpo: false,
    fastResponse: false,
    earlyApplicant: false,
    forWomen: false,
    isPreferences: false,
    inMyCity: false,
    isWfh: false,
    isPartTime: false,
  },
  currentPage: 1,
  itemsPerPage: 5, // 5 items per page makes pagination really easy to test and play with!
};

// Creating my slice to manage all internship state actions
const internshipsSlice = createSlice({
  name: 'internships',
  initialState,
  reducers: {
    // Save the fetched internships in our global state
    setInternships: (state, action: PayloadAction<Internship[]>) => {
      state.data = action.payload;
    },
    // Replace all filters at once
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = action.payload;
      state.currentPage = 1; // Remember to reset back to page 1 so we don't get stuck on empty pages!
    },
    // Update a single filter field (like profile or stipend) dynamically
    updateFilter: <K extends keyof Filters>(
      state: InternshipsState,
      action: PayloadAction<{ key: K; value: Filters[K] }>
    ) => {
      state.filters[action.payload.key] = action.payload.value;
      state.currentPage = 1; // Reset page to 1 on every filter change!
    },
    // Clear all filters back to their initial state
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.currentPage = 1; // Reset page to 1
    },
    // Set the current pagination page
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    // Dynamically change items per page if needed
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1; // Reset to page 1
    },
  },
});

export const { 
  setInternships, 
  setFilters, 
  updateFilter, 
  clearFilters, 
  setCurrentPage, 
  setItemsPerPage 
} = internshipsSlice.actions;

export default internshipsSlice.reducer;

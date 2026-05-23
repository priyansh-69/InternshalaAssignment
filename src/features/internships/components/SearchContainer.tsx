'use client';

import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Internship } from '@/types/internship';
import { setInternships } from '@/features/internships/slice';
import { SearchLayout } from '@/components/templates/SearchLayout';
import { SearchHeader } from '@/components/organisms/SearchHeader';
import { FilterSidebar } from '@/components/organisms/FilterSidebar';
import { InternshipList } from '@/components/organisms/InternshipList';
import { ReduxProvider } from '@/store/redux/provider';
import { LoadingSkeleton } from '@/components/organisms/LoadingSkeleton';

interface SearchContainerProps {
  initialData: Internship[];
}

// This is the inner part of my container which handles loading initial data and putting it in Redux.
// I split it into a separate inner component so I can use the useDispatch hook easily!
function SearchContainerInner({ initialData }: SearchContainerProps) {
  const dispatch = useDispatch();
  
  // Using a ref as a flag so we only load the internships data into Redux once when the page first loads
  const initialized = useRef(false);
  
  // State variable to check if the component has fully mounted in the browser.
  // This is a life-saver for preventing hydration errors with Next.js App Router!
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // If we haven't loaded the data yet, let's dispatch it to the Redux store!
    if (!initialized.current) {
      dispatch(setInternships(initialData));
      initialized.current = true; // Set to true so it never runs again on state changes
    }
    // Component is finally mounted on the client side, so we are safe to render!
    setMounted(true);
  }, [dispatch, initialData]);

  // Show a nice loading skeleton page while we wait for the client side to mount!
  if (!mounted) {
    return <LoadingSkeleton />;
  }

  // Render my search layout and slot in my Header, Sidebar and Internship list components!
  return (
    <SearchLayout
      header={<SearchHeader />}
      sidebar={<FilterSidebar />}
      content={<InternshipList />}
    />
  );
}

// Main container that wraps the inner search layout with the Redux provider
export function SearchContainer({ initialData }: SearchContainerProps) {
  return (
    <ReduxProvider>
      <SearchContainerInner initialData={initialData} />
    </ReduxProvider>
  );
}

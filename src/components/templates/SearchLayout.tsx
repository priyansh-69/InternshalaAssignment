import { ReactNode } from 'react';

interface SearchLayoutProps {
  header: ReactNode;
  sidebar: ReactNode;
  content: ReactNode;
}

export function SearchLayout({ header, sidebar, content }: SearchLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F0F7FF] flex flex-col">
      {/* Full-width sticky header container */}
      {header}

      {/* Centered main content area */}
      <div className="container mx-auto px-4 py-8 max-w-[1200px] flex-grow">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[270px_minmax(0,1fr)] items-start">
          <aside className="w-full min-w-0 lg:sticky lg:top-[96px] lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto pr-1">
            {sidebar}
          </aside>
          <main className="w-full min-w-0">
            {content}
          </main>
        </div>
      </div>
    </div>
  );
}

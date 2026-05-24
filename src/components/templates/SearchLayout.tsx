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
      <div className="container mx-auto px-4 py-8 max-w-7xl flex-grow">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)] items-start">
          <aside className="w-full min-w-0">
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

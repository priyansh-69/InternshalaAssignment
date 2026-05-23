import { SearchContainer } from '@/features/internships/components/SearchContainer';
import { Internship } from '@/types/internship';

async function getInternships(): Promise<Internship[]> {
  try {
    const res = await fetch('https://internshala.com/hiring/search', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) throw new Error(`Failed to fetch internships: ${res.statusText}`);
    
    const data = await res.json();
    const internshipsMeta = data.internships_meta || {};
    
    // The API returns a dictionary of { id: internship_object }
    // Convert it to an array of Internship objects
    return Object.values(internshipsMeta) as Internship[];
  } catch (error) {
    console.error('API Error:', error);
    return []; // Return empty array on error
  }
}

export default async function Home() {
  const data = await getInternships();

  return (
    <main>
      <SearchContainer initialData={data} />
    </main>
  );
}

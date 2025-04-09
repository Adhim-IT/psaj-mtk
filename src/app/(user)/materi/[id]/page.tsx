import { getCategoryById } from '@/lib/categorise';
import { getMaterisByCategory } from '@/lib/materi';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Await the params object before accessing its properties
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const { category, error: categoryError } = await getCategoryById(id);
  const { materis, error: materisError } = await getMaterisByCategory(id);

  if (categoryError || !category) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
      <p className="text-gray-600 mb-8">{category.description || `Materi pembelajaran untuk kategori ${category.name}`}</p>

      {materisError && <p className="text-red-600 mb-4">{materisError}</p>}

      {materis && materis.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materis.map((materi) => (
            <div key={materi.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-3 text-gray-800">{materi.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{materi.content.replace(/<[^>]*>/g, '').substring(0, 150)}...</p>
                <Link href={`/materi/detail/${materi.id}`} className="inline-block px-4 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors duration-300">
                  Baca Materi
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-amber-50 p-6 rounded-lg">
          <p className="text-amber-800">Belum ada materi untuk kategori ini.</p>
        </div>
      )}
    </div>
  );
}

import { getMateriById } from '@/lib/materi';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface MateriDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MateriDetailPage({ params }: MateriDetailPageProps) {
  // Await the params object before accessing its properties
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const { materi, error } = await getMateriById(id);

  if (error || !materi) {
    notFound();
  }
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-amber-500">
            Beranda
          </Link>
          <span className="mx-2">/</span>
          <Link href="/materi" className="hover:text-amber-500">
            Materi
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/materi/${materi.category_id}`} className="hover:text-amber-500">
            {materi.categories.name}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{materi.title}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{materi.title}</h1>

        {/* Category Badge */}
        <div className="mb-6">
          <Link href={`/materi/${materi.category_id}`} className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors duration-300">
            {materi.categories.name}
          </Link>
        </div>

        {/* Content */}
        <div className="prose prose-amber max-w-none">
          <div dangerouslySetInnerHTML={{ __html: materi.content }} />
        </div>

        {/* Quizzes Section */}
        {materi.quizzes && materi.quizzes.length > 0 && (
          <div className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Quiz Terkait</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {materi.quizzes.map((quiz) => (
                <div key={quiz.id} className="bg-white border border-amber-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{quiz.title}</h3>
                  <p className="text-gray-600 mb-4">{quiz.questions.length} Pertanyaan</p>
                  <Link href={`/quiz/${quiz.id}`} className="inline-block px-4 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors duration-300">
                    Mulai Quiz
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

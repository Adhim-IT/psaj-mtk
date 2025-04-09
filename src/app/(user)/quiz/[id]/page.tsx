import { getQuizById } from '@/lib/quiz';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface QuizPageProps {
  params: Promise<{ id: string }>;
}

export default async function QuizDetailPage({ params }: QuizPageProps) {
  // Await the params object before accessing its properties
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const { quiz, error } = await getQuizById(id);

  if (error || !quiz) {
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
          <Link href="/quiz" className="hover:text-amber-500">
            Quiz
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{quiz.title}</span>
        </div>

        {/* Quiz Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{quiz.title}</h1>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="bg-amber-50 px-4 py-2 rounded-lg">
              <span className="text-amber-700 font-medium">Materi: </span>
              <Link href={`/materi/detail/${quiz.materi_id}`} className="text-amber-500 hover:underline">
                {quiz.materis.title}
              </Link>
            </div>
            <div className="bg-emerald-50 px-4 py-2 rounded-lg">
              <span className="text-emerald-700 font-medium">Kategori: </span>
              <span className="text-emerald-600">{quiz.materis.categories.name}</span>
            </div>
            <div className="bg-gray-50 px-4 py-2 rounded-lg">
              <span className="text-gray-700 font-medium">Jumlah Soal: </span>
              <span className="text-gray-600">{quiz.questions.length}</span>
            </div>
          </div>
          <p className="text-gray-600 mb-6">Uji pemahaman Anda tentang {quiz.materis.title} dengan menjawab pertanyaan-pertanyaan berikut.</p>
          <div className="flex justify-center">
            <Link href={`/quiz/${quiz.id}/start`} className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition-colors duration-300">
              Mulai Quiz
            </Link>
          </div>
        </div>

        {/* Quiz Preview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Pratinjau Soal</h2>
          <div className="space-y-4">
            {quiz.questions.slice(0, 2).map((question, index) => (
              <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                <p className="font-medium text-gray-800 mb-3">
                  {index + 1}. {question.question_text}
                </p>
                <div className="pl-4 space-y-2">
                  {question.options.slice(0, 2).map((option, optIndex) => (
                    <div key={option.id} className="flex items-center">
                      <div className="w-5 h-5 rounded-full border border-gray-300 mr-3"></div>
                      <span className="text-gray-600">{option.option_text}</span>
                      {optIndex === 1 && <span className="text-gray-400 ml-2">(dan lainnya...)</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {quiz.questions.length > 2 && <p className="text-center text-gray-500 italic">...dan {quiz.questions.length - 2} soal lainnya</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

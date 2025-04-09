import { getQuizzes } from '@/lib/quiz';
import Link from 'next/link';

export default async function QuizPage() {
  const { quizzes, error } = await getQuizzes();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
        <span className="text-amber-500">Quiz</span> Matematika
      </h1>

      {error ? (
        <div className="max-w-3xl mx-auto bg-red-50 p-4 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      ) : quizzes && quizzes.length > 0 ? (
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz : any) => (
              <div key={quiz.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">{quiz.materis.categories.name}</span>
                    <span className="text-gray-500 text-sm">{quiz.questionCount} Soal</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{quiz.title}</h3>
                  <p className="text-gray-600 mb-4">Materi: {quiz.materis.title}</p>
                  <Link href={`/quiz/${quiz.id}`} className="inline-block w-full text-center px-4 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors duration-300">
                    Mulai Quiz
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <p className="text-gray-600 text-center mb-8">Belum ada quiz tersedia saat ini. Silakan cek kembali nanti.</p>
        </div>
      )}
    </div>
  );
}

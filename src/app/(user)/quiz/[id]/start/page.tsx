"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Option {
  id: string;
  question_id: string;
  option_text: string;
  is_correct: boolean;
}

interface Question {
  id: string;
  quiz_id: string;
  question_text: string;
  options: Option[];
}

interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

interface QuizStartPageProps {
  params: Promise<{ id: string }>;
}

export default function QuizStartPage({ params }: QuizStartPageProps) {
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        // Even in client components, we need to await params for type compatibility
        const resolvedParams = await params;
        const id = resolvedParams.id;

        const response = await fetch(`/api/quiz/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch quiz");
        }
        const data = await response.json();
        setQuiz(data.quiz);
      } catch (err) {
        setError("Failed to load quiz. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [params]);

  const handleOptionSelect = (questionId: string, optionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      calculateScore();
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    if (!quiz) return;

    let correctAnswers = 0;
    quiz.questions.forEach((question) => {
      const selectedOptionId = selectedOptions[question.id];
      if (selectedOptionId) {
        const selectedOption = question.options.find(
          (option) => option.id === selectedOptionId
        );
        if (selectedOption?.is_correct) {
          correctAnswers++;
        }
      }
    });

    const calculatedScore = Math.round(
      (correctAnswers / quiz.questions.length) * 100
    );
    setScore(calculatedScore);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-red-50 p-6 rounded-lg text-center">
          <p className="text-red-600 mb-4">{error || "Quiz not found"}</p>
          <Link
            href="/quiz"
            className="px-4 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors duration-300"
          >
            Back to Quizzes
          </Link>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Quiz Results
          </h1>

          <div className="flex justify-center mb-8">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-amber-500">
                  {score}%
                </span>
              </div>
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-gray-200"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-amber-500"
                  strokeWidth="8"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - score / 100)}`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-xl mb-2">
              You answered {Object.keys(selectedOptions).length} out of{" "}
              {quiz.questions.length} questions
            </p>
            <p className="text-lg text-gray-600">
              {score >= 80
                ? "Excellent! You have a great understanding of this topic."
                : score >= 60
                ? "Good job! You have a solid grasp of this material."
                : "Keep practicing! You'll improve with more study."}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Link
              href={`/quiz/${quiz.id}`}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors duration-300"
            >
              Review Quiz
            </Link>
            <Link
              href="/quiz"
              className="px-4 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors duration-300"
            >
              More Quizzes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </span>
            <span>
              {Math.round(
                ((currentQuestionIndex + 1) / quiz.questions.length) * 100
              )}
              % Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-amber-500 h-2.5 rounded-full"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / quiz.questions.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {currentQuestion.question_text}
          </h2>
          <div className="space-y-3">
            {currentQuestion.options.map((option: any) => (
              <div
                key={option.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${
                  selectedOptions[currentQuestion.id] === option.id
                    ? "border-amber-500 bg-amber-50"
                    : "border-gray-200 hover:border-amber-300 hover:bg-amber-50/50"
                }`}
                onClick={() =>
                  handleOptionSelect(currentQuestion.id, option.id)
                }
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center border ${
                      selectedOptions[currentQuestion.id] === option.id
                        ? "border-amber-500 bg-amber-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedOptions[currentQuestion.id] === option.id && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="text-gray-700">{option.option_text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`px-4 py-2 rounded-full ${
              currentQuestionIndex === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition-colors duration-300`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className={`px-4 py-2 rounded-full bg-amber-500 text-white hover:bg-amber-600 transition-colors duration-300 ${
              !selectedOptions[currentQuestion.id]
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={!selectedOptions[currentQuestion.id]}
          >
            {currentQuestionIndex === quiz.questions.length - 1
              ? "Finish Quiz"
              : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

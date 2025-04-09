import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getQuizzes() {
  try {
    const quizzes = await prisma.quizzes.findMany({
      include: {
        materis: {
          include: {
            categories: true,
          },
        },
        questions: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    // Convert BigInt IDs to strings for frontend compatibility
    const serializedQuizzes = quizzes.map((quiz: any) => ({
      ...quiz,
      id: quiz.id.toString(),
      materi_id: quiz.materi_id.toString(),
      materis: {
        ...quiz.materis,
        id: quiz.materis.id.toString(),
        category_id: quiz.materis.category_id.toString(),
        categories: {
          ...quiz.materis.categories,
          id: quiz.materis.categories.id.toString(),
        },
      },
      questions: quiz.questions.map((question: any) => ({
        ...question,
        id: question.id.toString(),
      })),
      questionCount: quiz.questions.length,
    }));

    return { quizzes: serializedQuizzes };
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return { error: 'Failed to fetch quizzes' };
  }
}

export async function getQuizById(id: string) {
  try {
    const quiz = await prisma.quizzes.findUnique({
      where: {
        id: BigInt(id),
      },
      include: {
        materis: {
          include: {
            categories: true,
          },
        },
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!quiz) {
      return { error: 'Quiz not found' };
    }

    const serializedQuiz = {
      ...quiz,
      id: quiz.id.toString(),
      materi_id: quiz.materi_id.toString(),
      materis: {
        ...quiz.materis,
        id: quiz.materis.id.toString(),
        category_id: quiz.materis.category_id.toString(),
        categories: {
          ...quiz.materis.categories,
          id: quiz.materis.categories.id.toString(),
        },
      },
      questions: quiz.questions.map((question: any) => ({
        ...question,
        id: question.id.toString(),
        quiz_id: question.quiz_id.toString(),
        options: question.options.map((option: any) => ({
          ...option,
          id: option.id.toString(),
          question_id: option.question_id.toString(),
        })),
      })),
    };

    return { quiz: serializedQuiz };
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return { error: 'Failed to fetch quiz' };
  }
}

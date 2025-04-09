import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getMateris() {
  try {
    const materis = await prisma.materis.findMany({
      include: {
        categories: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    // Convert BigInt IDs to strings for frontend compatibility
    const serializedMateris = materis.map((materi: any) => ({
      ...materi,
      id: materi.id.toString(),
      category_id: materi.category_id.toString(),
      categories: {
        ...materi.categories,
        id: materi.categories.id.toString(),
      },
    }));

    return { materis: serializedMateris };
  } catch (error) {
    console.error('Error fetching materis:', error);
    return { error: 'Failed to fetch materis' };
  }
}

export async function getMaterisByCategory(categoryId: string) {
  try {
    const materis = await prisma.materis.findMany({
      where: {
        category_id: BigInt(categoryId),
      },
      include: {
        categories: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    // Convert BigInt IDs to strings for frontend compatibility
    const serializedMateris = materis.map((materi: any) => ({
      ...materi,
      id: materi.id.toString(),
      category_id: materi.category_id.toString(),
      categories: {
        ...materi.categories,
        id: materi.categories.id.toString(),
      },
    }));

    return { materis: serializedMateris };
  } catch (error) {
    console.error('Error fetching materis by category:', error);
    return { error: 'Failed to fetch materis for this category' };
  }
}

export async function getMateriById(id: string) {
  try {
    const materi = await prisma.materis.findUnique({
      where: {
        id: BigInt(id),
      },
      include: {
        categories: true,
        quizzes: {
          include: {
            questions: {
              include: {
                options: true,
              },
            },
          },
        },
      },
    });

    if (!materi) {
      return { error: 'Materi not found' };
    }

    // Convert BigInt IDs to strings for frontend compatibility
    const serializedMateri = {
      ...materi,
      id: materi.id.toString(),
      category_id: materi.category_id.toString(),
      categories: {
        ...materi.categories,
        id: materi.categories.id.toString(),
      },
      quizzes: materi.quizzes.map((quiz: any) => ({
        ...quiz,
        id: quiz.id.toString(),
        materi_id: quiz.materi_id.toString(),
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
      })),
    };

    return { materi: serializedMateri };
  } catch (error) {
    console.error('Error fetching materi:', error);
    return { error: 'Failed to fetch materi' };
  }
}

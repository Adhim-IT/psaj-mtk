import { prisma } from './prisma';
import { z } from 'zod';

// Define the Option schema for validation
export const OptionSchema = z.object({
  question_id: z.string().min(1, 'Question is required'),
  option_text: z.string().min(1, 'Option text is required'),
  is_correct: z.boolean().optional().default(false),
});

export type OptionFormValues = z.infer<typeof OptionSchema>;

// Get all options for a question
export async function getOptionsByQuestionId(questionId: string) {
  try {
    const options = await prisma.options.findMany({
      where: {
        question_id: BigInt(questionId),
      },
      orderBy: {
        created_at: 'asc',
      },
    });

    // Convert BigInt IDs to strings
    const serializedOptions = options.map((option: any) => ({
      ...option,
      id: option.id.toString(),
      question_id: option.question_id.toString(),
    }));

    return { options: serializedOptions };
  } catch (error) {
    console.error('Error fetching options:', error);
    return { error: 'Failed to fetch options' };
  }
}

// Get a single option by ID
export async function getOptionById(id: string) {
  try {
    const option = await prisma.options.findUnique({
      where: {
        id: BigInt(id),
      },
      include: {
        questions: true,
      },
    });

    if (!option) {
      return { error: 'Option not found' };
    }

    // Convert BigInt IDs to strings
    const serializedOption = {
      ...option,
      id: option.id.toString(),
      question_id: option.question_id.toString(),
      questions: {
        ...option.questions,
        id: option.questions.id.toString(),
        quiz_id: option.questions.quiz_id.toString(),
      },
    };

    return { option: serializedOption };
  } catch (error) {
    console.error('Error fetching option:', error);
    return { error: 'Failed to fetch option' };
  }
}

// Create a new option
export async function createOption(data: OptionFormValues) {
  try {
    const option = await prisma.options.create({
      data: {
        question_id: BigInt(data.question_id),
        option_text: data.option_text,
        is_correct: data.is_correct,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    // Convert BigInt IDs to strings
    const serializedOption = {
      ...option,
      id: option.id.toString(),
      question_id: option.question_id.toString(),
    };

    return { option: serializedOption };
  } catch (error) {
    console.error('Error creating option:', error);
    return { error: 'Failed to create option' };
  }
}

// Update an existing option
export async function updateOption(id: string, data: Omit<OptionFormValues, 'question_id'>) {
  try {
    const option = await prisma.options.update({
      where: {
        id: BigInt(id),
      },
      data: {
        option_text: data.option_text,
        is_correct: data.is_correct,
        updated_at: new Date(),
      },
    });

    // Convert BigInt IDs to strings
    const serializedOption = {
      ...option,
      id: option.id.toString(),
      question_id: option.question_id.toString(),
    };

    return { option: serializedOption };
  } catch (error) {
    console.error('Error updating option:', error);
    return { error: 'Failed to update option' };
  }
}

// Delete an option
export async function deleteOption(id: string) {
  try {
    await prisma.options.delete({
      where: {
        id: BigInt(id),
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error deleting option:', error);
    return { error: 'Failed to delete option' };
  }
}

// Ensure only one correct option per question
export async function ensureOneCorrectOption(questionId: string, optionId: string, isCorrect: boolean) {
  // If setting to false, no need to check
  if (!isCorrect) return { success: true };

  try {
    // If setting to true, update all other options to false
    await prisma.options.updateMany({
      where: {
        question_id: BigInt(questionId),
        id: {
          not: BigInt(optionId),
        },
      },
      data: {
        is_correct: false,
        updated_at: new Date(),
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating other options:', error);
    return { error: 'Failed to update other options' };
  }
}

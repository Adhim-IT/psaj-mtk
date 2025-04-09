import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getCategories() {
  try {
    const categories = await prisma.categories.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    // Convert BigInt IDs to strings for frontend compatibility
    const serializedCategories = categories.map((category: any) => ({
      ...category,
      id: category.id.toString(),
    }));

    return { categories: serializedCategories };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { error: 'Failed to fetch categories' };
  }
}

// Get a single category by ID
export async function getCategoryById(id: string) {
  try {
    const category = await prisma.categories.findUnique({
      where: {
        id: BigInt(id),
      },
    });

    if (!category) {
      return { error: 'Category not found' };
    }

    // Convert BigInt ID to string
    const serializedCategory = {
      ...category,
      id: category.id.toString(),
    };

    return { category: serializedCategory };
  } catch (error) {
    console.error('Error fetching category:', error);
    return { error: 'Failed to fetch category' };
  }
}

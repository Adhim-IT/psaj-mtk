import { getQuizById } from '@/lib/quiz';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Await the params object before accessing its properties
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const { quiz, error } = await getQuizById(id);

    if (error) {
      return NextResponse.json({ error }, { status: 404 });
    }

    return NextResponse.json({ quiz });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

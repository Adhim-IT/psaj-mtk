import { NextResponse } from 'next/server';

// Define the interface for the request body
interface RequestBody {
  prompt: string;
  history?: Array<{
    role: string;
    parts: Array<{ text: string }>;
  }>;
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    const { prompt, history = [] } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key is not configured' }, { status: 500 });
    }

    // Prepare the request to Gemini API
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

    // Format the conversation for Gemini API
    const contents = [
      ...history,
      {
        role: 'user',
        parts: [{ text: `Tolong jawab pertanyaan matematika ini dengan detail dan langkah-langkah yang jelas: ${prompt}` }],
      },
    ];

    const response = await fetch(`${url}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API Error:', errorData);

      // Check for specific error types
      if (errorData.error?.code === 403) {
        return NextResponse.json(
          {
            error: 'API key tidak memiliki izin yang cukup. Pastikan API key sudah diaktifkan dan terdaftar dengan benar.',
          },
          { status: 403 }
        );
      }

      return NextResponse.json(
        {
          error: `Error from Gemini API: ${errorData.error?.message || 'Unknown error'}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Extract the response text from Gemini API
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Maaf, saya tidak dapat menjawab pertanyaan tersebut saat ini.';

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// app/api/text-to-speech/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request) {
  const { text } = await request.json();

  try {
    const response = await openai.createSpeech({
      input: {
        text,
      },
      voice: 'en-US_Wavenet-D', // Puedes seleccionar la voz que prefieras
    });

    const audioContent = response.data.audioContent;
    return NextResponse.json({ audioContent });
  } catch (error) {
    return NextResponse.json({ error: 'Error in text-to-speech' }, { status: 500 });
  }
}

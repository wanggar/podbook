import { NextResponse } from 'next/server';
import ytdl from 'ytdl-core';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    // Validate YouTube URL
    if (!ytdl.validateURL(url)) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    // Generate a unique filename
    const filename = `audio_${Date.now()}.mp3`;
    const audioPath = path.join(process.cwd(), 'public', 'audio', filename);

    // Ensure the audio directory exists
    const audioDir = path.dirname(audioPath);
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }

    // Download audio
    await new Promise((resolve, reject) => {
      ytdl(url, { 
        filter: 'audioonly',
        quality: 'highestaudio',
        // Remove the format option
      })
        .pipe(fs.createWriteStream(audioPath))
        .on('finish', resolve)
        .on('error', reject);
    });

    // After downloading audio
    const stats = fs.statSync(audioPath);
    console.log(`Downloaded file size: ${stats.size} bytes`);
    if (stats.size === 0) {
      fs.unlinkSync(audioPath); // Delete empty file
      throw new Error('Downloaded audio file is empty');
    }

    // Return the path to the audio file
    return NextResponse.json({ audioUrl: `/audio/${filename}` });
  } catch (error) {
    console.error('Error in POST /api/transcribe-translate:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
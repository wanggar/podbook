import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { filename: string } }
) {
  const filename = params.filename;
  const filePath = path.join(process.cwd(), 'public', 'audio', filename);

  // Log file details
  console.log(`Attempting to serve file: ${filePath}`);

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  try {
    const fileStats = fs.statSync(filePath);
    console.log(`File size: ${fileStats.size} bytes`);

    const fileBuffer = fs.readFileSync(filePath);
    
    // Log content type and length
    console.log(`Serving file with Content-Type: audio/mpeg, Content-Length: ${fileBuffer.length}`);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': fileBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error(`Error reading file: ${error}`);
    return NextResponse.json({ error: 'Error reading file' }, { status: 500 });
  }
}
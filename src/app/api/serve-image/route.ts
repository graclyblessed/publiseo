import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DOWNLOAD_DIR = '/home/z/my-project/download';

export async function GET(request: NextRequest) {
  const filename = request.nextUrl.searchParams.get('filename');
  
  if (!filename) {
    return NextResponse.json({ error: 'Filename parameter is required' }, { status: 400 });
  }

  // Security: prevent directory traversal
  const safeFilename = path.basename(filename);
  if (safeFilename !== filename) {
    return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
  }

  const filePath = path.join(DOWNLOAD_DIR, safeFilename);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }

  try {
    const imageBuffer = fs.readFileSync(filePath);
    const ext = path.extname(safeFilename).toLowerCase();
    
    let contentType = 'image/png';
    if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    if (ext === '.gif') contentType = 'image/gif';
    if (ext === '.webp') contentType = 'image/webp';

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
        'Content-Disposition': `inline; filename="${safeFilename}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to read image' }, { status: 500 });
  }
}

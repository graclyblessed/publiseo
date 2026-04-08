import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { WP_CONFIG, getAuthHeader } from '@/lib/wordpress';

const DOWNLOAD_DIR = '/home/z/my-project/download';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const filename = formData.get('filename') as string;

    if (!filename) {
      return NextResponse.json(
        { error: 'Le nom du fichier est requis' },
        { status: 400 }
      );
    }

    const safeFilename = path.basename(filename);
    const imagePath = path.join(DOWNLOAD_DIR, safeFilename);

    if (!fs.existsSync(imagePath)) {
      return NextResponse.json(
        { error: 'Fichier image introuvable' },
        { status: 404 }
      );
    }

    const imageBuffer = fs.readFileSync(imagePath);

    const mediaResponse = await fetch(`${WP_CONFIG.apiUrl}media`, {
      method: 'POST',
      headers: {
        Authorization: getAuthHeader(),
        'Content-Disposition': `attachment; filename="${safeFilename}"`,
        'Content-Type': 'image/png',
      },
      body: imageBuffer,
    });

    if (!mediaResponse.ok) {
      const errorText = await mediaResponse.text();
      console.error('Media upload error:', errorText);
      return NextResponse.json(
        { error: `Échec de l'upload: ${mediaResponse.status}` },
        { status: 500 }
      );
    }

    const mediaData = await mediaResponse.json();

    return NextResponse.json({
      success: true,
      media: {
        id: mediaData.id,
        url: mediaData.source_url,
        title: mediaData.title?.rendered,
        altText: mediaData.alt_text,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur lors de l'upload" },
      { status: 500 }
    );
  }
}

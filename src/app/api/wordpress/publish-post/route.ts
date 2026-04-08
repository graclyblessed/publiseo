import { NextRequest, NextResponse } from 'next/server';
import { fetchWordPress, getAuthHeader, WP_CONFIG } from '@/lib/wordpress';
import { getPostData } from '@/lib/post-data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      filename,
      title,
      content,
      status,
      category_id,
    } = body;

    if (!title || !filename) {
      return NextResponse.json(
        { error: 'Le titre et le nom du fichier sont requis' },
        { status: 400 }
      );
    }

    // Get post content from data if not provided
    const postData = getPostData(filename);
    const postContent = content || postData?.contentTemplate || '';

    // Convert markdown-like content to HTML
    const htmlContent = convertToHtml(postContent);

    // 1. Upload image to WordPress media
    const fs = await import('fs');
    const path = await import('path');
    const DOWNLOAD_DIR = '/home/z/my-project/download';
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
        { error: `Échec de l'upload de l'image: ${mediaResponse.status}` },
        { status: 500 }
      );
    }

    const mediaData = await mediaResponse.json();
    const featuredMediaId = mediaData.id;

    // 2. Create the post
    const postDataWp: Record<string, unknown> = {
      title,
      content: htmlContent,
      status: status || 'publish',
      featured_media: featuredMediaId,
    };

    if (category_id && !isNaN(Number(category_id))) {
      postDataWp.categories = [Number(category_id)];
    }

    const postResponse = await fetchWordPress('posts', {
      method: 'POST',
      body: JSON.stringify(postDataWp),
    });

    if (!postResponse.id) {
      throw new Error('Échec de la création du post');
    }

    return NextResponse.json({
      success: true,
      post: {
        id: postResponse.id,
        link: postResponse.link,
        status: postResponse.status,
        title: postResponse.title?.rendered,
      },
      media: {
        id: featuredMediaId,
        url: mediaData.source_url,
      },
    });
  } catch (error) {
    console.error('Error publishing post:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur lors de la publication" },
      { status: 500 }
    );
  }
}

function convertToHtml(text: string): string {
  return text
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^- ✅/gm, '<br>✅')
    .replace(/^- /gm, '<br>• ')
    .replace(/^(\d+)\. /gm, '<br>$1. ')
    .replace(/<li>(.+?)<\/li>/g, '<ul><li>$1</li></ul>')
    .replace(/<\/ul><ul>/g, '')
    .replace(/^<(h[1-3])>(.+?)<\/\1>$/gm, '<$1>$2</$1>')
    .split('\n')
    .map(line => {
      if (line.startsWith('<h') || line.startsWith('<ul') || line.startsWith('<li') || line.startsWith('</')) {
        return line;
      }
      if (line.trim() === '') return '';
      return `<p>${line}</p>`;
    })
    .join('\n')
    .replace(/<p><\/p>/g, '')
    .replace(/\n{2,}/g, '\n');
}

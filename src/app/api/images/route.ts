import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getPostData } from '@/lib/post-data';

const DOWNLOAD_DIR = '/home/z/my-project/download';

export async function GET() {
  try {
    const files = fs.readdirSync(DOWNLOAD_DIR);
    
    const postImages = files.filter(
      (file) =>
        file.match(/^post_\d+.*\.png$/) || file.match(/^sample_post_\d+.*\.png$/)
    );

    const imageData = postImages
      .map((filename) => {
        const filePath = path.join(DOWNLOAD_DIR, filename);
        const stats = fs.statSync(filePath);
        const postData = getPostData(filename);

        return {
          filename,
          caption: postData?.title || filename.replace(/\.png$/, '').replace(/_/g, ' '),
          color: postData?.backgroundColor || '#F5F0EB',
          path: `/api/serve-image?filename=${encodeURIComponent(filename)}`,
          size: stats.size,
          lastModified: stats.mtime.toISOString(),
          hasPostData: !!postData,
        };
      })
      .sort((a, b) => a.filename.localeCompare(b.filename));

    return NextResponse.json({ images: imageData, total: imageData.length });
  } catch (error) {
    console.error('Error scanning images:', error);
    return NextResponse.json(
      { error: 'Failed to scan images' },
      { status: 500 }
    );
  }
}

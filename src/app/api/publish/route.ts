import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { WP_CONFIG, getAuthHeader, fetchWordPress } from '@/lib/wordpress';

const DOWNLOAD_DIR = '/home/z/my-project/download';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      content,
      image_filename,
      status,
      category_id,
      tags,
      scheduled_date,
    } = body;

    if (!title || !content || !image_filename) {
      return NextResponse.json(
        { error: 'Title, content, and image_filename are required' },
        { status: 400 }
      );
    }

    // 1. Read the image from disk
    const safeFilename = path.basename(image_filename);
    const imagePath = path.join(DOWNLOAD_DIR, safeFilename);

    if (!fs.existsSync(imagePath)) {
      return NextResponse.json(
        { error: 'Image file not found' },
        { status: 404 }
      );
    }

    const imageBuffer = fs.readFileSync(imagePath);
    const imageBlob = new Blob([imageBuffer], { type: 'image/png' });

    // 2. Upload image to WordPress Media
    const mediaFormData = new FormData();
    mediaFormData.append(
      'file',
      imageBlob,
      safeFilename
    );
    mediaFormData.append('title', title);
    mediaFormData.append('alt_text', title);

    const mediaResponse = await fetch(`${WP_CONFIG.apiUrl}media`, {
      method: 'POST',
      headers: {
        Authorization: getAuthHeader(),
        // Note: do NOT set Content-Type when using FormData (browser sets boundary)
        'Content-Disposition': `attachment; filename="${safeFilename}"`,
      },
      body: mediaFormData,
    });

    if (!mediaResponse.ok) {
      const errorText = await mediaResponse.text();
      console.error('Media upload error:', errorText);
      return NextResponse.json(
        { error: `Failed to upload image: ${mediaResponse.status}` },
        { status: 500 }
      );
    }

    const mediaData = await mediaResponse.json();
    const featuredMediaId = mediaData.id;
    const mediaUrl = mediaData.source_url;

    // 3. Create the post
    const postData: Record<string, unknown> = {
      title,
      content,
      status: status || 'draft',
      featured_media: featuredMediaId,
      lang: 'fr',
    };

    if (category_id && !isNaN(Number(category_id))) {
      postData.categories = [Number(category_id)];
    }

    if (tags && Array.isArray(tags) && tags.length > 0) {
      // Create tags first if needed, then get their IDs
      const tagIds: number[] = [];
      for (const tag of tags) {
        try {
          // Try to find existing tag
          const existingTags = await fetchWordPress(
            `tags?search=${encodeURIComponent(tag)}`
          );
          if (existingTags.length > 0) {
            tagIds.push(existingTags[0].id);
          } else {
            // Create new tag
            const newTag = await fetchWordPress('tags', {
              method: 'POST',
              body: JSON.stringify({ name: tag, slug: tag.toLowerCase().replace(/\s+/g, '-') }),
            });
            tagIds.push(newTag.id);
          }
        } catch {
          // Skip failed tags
        }
      }
      if (tagIds.length > 0) {
        postData.tags = tagIds;
      }
    }

    if (scheduled_date && status === 'future') {
      postData.date = scheduled_date;
    }

    const postResponse = await fetchWordPress('posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });

    if (!postResponse.id) {
      throw new Error('Failed to create post');
    }

    return NextResponse.json({
      success: true,
      post: {
        id: postResponse.id,
        link: postResponse.link,
        status: postResponse.status,
        title: postResponse.title.rendered,
      },
      media: {
        id: featuredMediaId,
        url: mediaUrl,
      },
    });
  } catch (error) {
    console.error('Error publishing post:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to publish post' },
      { status: 500 }
    );
  }
}

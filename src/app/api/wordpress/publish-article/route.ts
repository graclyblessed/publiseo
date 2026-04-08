import { NextRequest, NextResponse } from 'next/server';
import { fetchWordPress } from '@/lib/wordpress';
import { ARTICLES } from '@/data/articles';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      article_id,
      title,
      content,
      excerpt,
      status,
      category_id,
    } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Le titre et le contenu sont requis' },
        { status: 400 }
      );
    }

    // Find article default category if not specified
    let finalCategoryId = category_id;
    if (!finalCategoryId && article_id) {
      const article = ARTICLES.find(a => a.id === article_id);
      if (article) {
        finalCategoryId = article.defaultCategoryId;
      }
    }

    const postData: Record<string, unknown> = {
      title,
      content,
      status: status || 'publish',
    };

    if (excerpt) {
      postData.excerpt = excerpt;
    }

    if (finalCategoryId && !isNaN(Number(finalCategoryId))) {
      postData.categories = [Number(finalCategoryId)];
    }

    const postResponse = await fetchWordPress('posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });

    if (!postResponse.id) {
      throw new Error('Échec de la création de l\'article');
    }

    return NextResponse.json({
      success: true,
      post: {
        id: postResponse.id,
        link: postResponse.link,
        status: postResponse.status,
        title: postResponse.title?.rendered,
      },
    });
  } catch (error) {
    console.error('Error publishing article:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur lors de la publication de l'article" },
      { status: 500 }
    );
  }
}

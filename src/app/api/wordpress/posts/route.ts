import { NextRequest, NextResponse } from 'next/server';
import { fetchWordPress } from '@/lib/wordpress';

export async function GET(request: NextRequest) {
  try {
    const perPage = request.nextUrl.searchParams.get('per_page') || '20';
    const page = request.nextUrl.searchParams.get('page') || '1';
    const status = request.nextUrl.searchParams.get('status') || 'any';

    const posts = await fetchWordPress(
      `posts?per_page=${perPage}&page=${page}&_embed&orderby=date&order=desc&status=${status}`
    );

    const formattedPosts = posts.map(
      (post: {
        id: number;
        title: { rendered: string };
        link: string;
        status: string;
        date: string;
        modified: string;
        _embedded?: {
          'wp:featuredmedia'?: Array<{
            source_url: string;
            alt_text: string;
          }>;
          'wp:term'?: Array<Array<{ name: string; slug: string }>>;
        };
      }) => {
        const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
        const terms = post._embedded?.['wp:term']?.[0] || [];

        return {
          id: post.id,
          title: post.title.rendered,
          link: post.link,
          status: post.status,
          date: post.date,
          modified: post.modified,
          featuredImageUrl: featuredMedia?.source_url || null,
          categories: terms.map((t: { name: string }) => t.name),
        };
      }
    );

    const totalHeader = await fetchWordPress(
      `posts?per_page=${perPage}&page=${page}&status=${status}`
    ).catch(() => null);

    // Get total posts count
    const totalPosts = await fetchWordPress('posts?per_page=1&status=publish')
      .then(() => {
        // Try to get total from headers by fetching directly
        return null;
      })
      .catch(() => null);

    return NextResponse.json({
      posts: formattedPosts,
      total: formattedPosts.length,
      page: Number(page),
      perPage: Number(perPage),
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Impossible de récupérer les articles' },
      { status: 500 }
    );
  }
}

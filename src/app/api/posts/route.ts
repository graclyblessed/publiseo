import { NextResponse } from 'next/server';
import { fetchWordPress } from '@/lib/wordpress';

export async function GET() {
  try {
    const posts = await fetchWordPress(
      'posts?per_page=10&_embed&orderby=date&order=desc'
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
          categories: terms
            .filter((t: { slug: string }) => t.slug !== 'uncategorized')
            .map((t: { name: string }) => t.name),
        };
      }
    );

    return NextResponse.json({ posts: formattedPosts, total: formattedPosts.length });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

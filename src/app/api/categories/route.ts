import { NextResponse } from 'next/server';
import { fetchWordPress } from '@/lib/wordpress';

export async function GET() {
  try {
    const categories = await fetchWordPress('categories?per_page=100');
    
    const formattedCategories = categories.map(
      (cat: { id: number; name: string; slug: string; count: number }) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        postCount: cat.count,
      })
    );

    return NextResponse.json({ categories: formattedCategories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

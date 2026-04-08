import { NextResponse } from 'next/server';
import { fetchWordPress } from '@/lib/wordpress';

export async function GET() {
  try {
    const categories = await fetchWordPress('categories?per_page=100&hide_empty=false');

    const formattedCategories = categories.map(
      (cat: { id: number; name: string; slug: string; count: number; parent: number }) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        postCount: cat.count,
        parentId: cat.parent,
      })
    );

    return NextResponse.json({ categories: formattedCategories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Impossible de récupérer les catégories' },
      { status: 500 }
    );
  }
}

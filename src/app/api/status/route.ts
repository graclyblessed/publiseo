import { NextResponse } from 'next/server';
import { testConnection } from '@/lib/wordpress';

export async function GET() {
  try {
    const connected = await testConnection();
    return NextResponse.json({ connected });
  } catch {
    return NextResponse.json({ connected: false });
  }
}

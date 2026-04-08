import { NextResponse } from 'next/server';
import { testConnection } from '@/lib/wordpress';

export async function GET() {
  try {
    const connected = await testConnection();
    if (connected) {
      return NextResponse.json({ connected: true, message: 'Connexion réussie' });
    }
    return NextResponse.json({ connected: false, message: 'Échec de la connexion' }, { status: 502 });
  } catch {
    return NextResponse.json({ connected: false, message: 'Erreur de connexion' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const connected = await testConnection();
    if (connected) {
      return NextResponse.json({ connected: true, message: 'Connexion réussie' });
    }
    return NextResponse.json({ connected: false, message: 'Échec de la connexion' }, { status: 502 });
  } catch {
    return NextResponse.json({ connected: false, message: 'Erreur de connexion' }, { status: 500 });
  }
}

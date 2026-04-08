// Server-side only WordPress configuration
// NEVER import this file on the client side

export const WP_CONFIG = {
  siteUrl: 'https://roisdumenage.fr/',
  apiUrl: 'https://roisdumenage.fr/wp-json/wp/v2/',
  username: 'roisdumenageparfait',
  appPassword: 'LlI2danvFp44yGzKs7xpZcBc',
  siteName: 'Trucs Malins pour la Maison',
} as const;

export function getAuthHeader(): string {
  const credentials = Buffer.from(
    `${WP_CONFIG.username}:${WP_CONFIG.appPassword}`
  ).toString('base64');
  return `Basic ${credentials}`;
}

export async function fetchWordPress(endpoint: string, options: RequestInit = {}) {
  const url = `${WP_CONFIG.apiUrl}${endpoint}`;
  const headers: Record<string, string> = {
    ...getHeaders(),
    ...(options.headers as Record<string, string>),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`WordPress API Error (${response.status}): ${errorText}`);
  }

  return response.json();
}

function getHeaders(): Record<string, string> {
  return {
    Authorization: getAuthHeader(),
    'Content-Type': 'application/json',
  };
}

export async function testConnection(): Promise<boolean> {
  try {
    const data = await fetchWordPress('users/me');
    return !!data && !!data.id;
  } catch {
    return false;
  }
}

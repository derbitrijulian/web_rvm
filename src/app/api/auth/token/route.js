import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = cookies();
    const firebaseToken = cookieStore.get('firebase_token')?.value;

    if (!firebaseToken) {
      return new Response(JSON.stringify({ message: 'Token not found' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({
        message: 'Token retrieved successfully',
        token: firebaseToken,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'Error retrieving token',
        error: error.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

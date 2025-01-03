import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const cookies = req.cookies;
    const token = cookies.get('firebase_token'); 

    if (!token) {
      return NextResponse.json(
        { message: 'No token found in cookies' },
        { status: 400 }
      );
    }

    const isProduction = process.env.NODE_ENV === 'production';
    const cookie = `firebase_token=; HttpOnly; ${
      isProduction ? 'Secure;' : ''
    } SameSite=Strict; Max-Age=0; Path=/`;

    return NextResponse.json(
      { message: 'Logout successful' },
      {
        status: 200,
        headers: {
          'Set-Cookie': cookie,
        },
      }
    );
  } catch (error) {
    console.error('Logout error:', error.message);
    return NextResponse.json(
      { message: 'Logout failed', error: error.message },
      { status: 500 }
    );
  }
}

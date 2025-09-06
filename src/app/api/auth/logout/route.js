import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Clear the authentication cookie
    const response = NextResponse.json(
      { message: 'Logout berhasil' },
      { status: 200 }
    );

    // Remove the token cookie
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // Immediately expire the cookie
      path: '/',
    });

    // Also clear firebase_token if exists (for backward compatibility)
    response.cookies.set('firebase_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}

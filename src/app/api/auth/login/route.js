import { auth } from '@/app/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (
      !email ||
      !password ||
      typeof email !== 'string' ||
      typeof password !== 'string'
    ) {
      return new Response(
        JSON.stringify({ message: 'Email dan Password harus diisi' }),
        { status: 400 }
      );
    }

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const token = await user.getIdToken();

    const response = new NextResponse(
      JSON.stringify({ message: 'Login berhasil' }),
      { status: 200 }
    );

    response.cookies.set('firebase_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    return response;
  } catch (error) {
    console.error('Login error:', error.message);

    return new Response(
      JSON.stringify({
        message: 'Login failed',
        error: 'Invalid credentials or server error',
      }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

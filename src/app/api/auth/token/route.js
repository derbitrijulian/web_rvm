import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return new Response(JSON.stringify({ message: 'Token not found' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verify the JWT token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      return new Response(
        JSON.stringify({
          message: 'Token retrieved successfully',
          token: token,
          user: {
            userId: decoded.userId,
            email: decoded.email,
          },
          isValid: true,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (jwtError) {
      return new Response(
        JSON.stringify({
          message: 'Invalid token',
          isValid: false,
        }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
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

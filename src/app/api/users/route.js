import { adminAuth } from '@/utils/admin-firebase';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';



export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('firebase_token');

    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: 'Unauthirized: Tidak ada token' })
      );
    }

    const decodeToken = await adminAuth.verifyIdToken(token.value);
    const uid = decodeToken.uid;
    const userRecord = await adminAuth.getUser(uid);

    const userDetails = {
      uid: userRecord.uid,
      email: userRecord.email,
      emailVerified: userRecord.emailVerified,
      fullName: userRecord.customClaims?.fullName || null,
      phone: userRecord.customClaims?.phone || null,
    };

    return new NextResponse(JSON.stringify(userDetails), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

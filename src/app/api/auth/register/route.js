// import { auth, db } from '@/app/firebase';
// import {
//   createUserWithEmailAndPassword,
//   sendEmailVerification,
// } from 'firebase/auth';
// import {
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   query,
//   setDoc,
//   where,
// } from 'firebase/firestore';
// import { adminAuth } from '@/utils/admin-firebase';

import { auth, db } from '@/app/firebase';
import { adminAuth } from '@/utils/admin-firebase';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

// export async function POST(req) {
//   try {
//     const { fullName, email, password, phone } = await req.json();
//     const useRef = collection(db, 'users');
//     const emailQuery = query(useRef, where('email', '==', email));
//     const phoneQuery = query(useRef, where('phone', '==', phone));

//     const emailSnapshot = await getDocs(emailQuery);
//     const phoneSnapshot = await getDocs(phoneQuery);

//     if (!emailSnapshot.empty) {
//       return new Response(
//         JSON.stringify({ error: 'Email sudah digunakan oleh pengguna lain' }),
//         { status: 400 }
//       );
//     }
//     if (!phoneSnapshot.empty) {
//       return new Response(
//         JSON.stringify({
//           error: 'Nomor telepon sudah digunakan oleh pengguna lain',
//         }),
//         { status: 400 }
//       );
//     }

//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const user = userCredential.user;

//     // Tambahkan data pengguna ke Firestore
//     await setDoc(doc(db, 'users', user.uid), {
//       fullName,
//       email,
//       phone,
//       createdAt: new Date(),
//     });

//     await adminAuth.setCustomUserClaims(user.uid, {
//       fullName,
//       email,
//       phone,
//     });

//     await sendEmailVerification(user);

//     return new Response(
//       JSON.stringify({
//         message: 'Registrasi berhasil! Email verifikasi telah dikirim.',
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 400,
//     });
//   }
// }

// export async function updateVerificationStatus(uid) {
//   try {
//     const user = await adminAuth.getUser(uid);

//     if (user.emailVerified) {
//       // await setDoc(
//       //   doc(db, 'users', uid),
//       //   {
//       //     isVerified: true,
//       //   },
//       //   { merge: true }
//       // );

//       const existingClaims = user.customClaims || {};

//       await adminAuth.setCustomUserClaims(uid, {
//         ...existingClaims,
//         isVerified: true,
//       });
//     }
//   } catch (error) {
//     console.error('Error updating verification status:', error);
//   }
// }

export async function POST(req) {
  try {
    const { email, password, confirmPassword, fullName, phone } =
      await req.json();
    if (!email || !password || !confirmPassword || !fullName || !phone) {
      return new NextResponse(
        JSON.stringify({ message: 'Semua Field Harus Di isi' }),
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return new NextResponse(
        JSON.stringify({ message: 'Password harus sama' })
      );
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    await updateProfile(user, {
      displayName: fullName,
    });

    await adminAuth.setCustomUserClaims(user.uid, { phone, fullName });
    const token = await user.getIdToken();
    const response = new NextResponse(
      JSON.stringify({ message: 'Registrasi Berhasil Cek Email Anda' }),
      { status: 201 }
    );

    sendEmailVerification(user);
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
    });

    return response;
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

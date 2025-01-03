import { db } from '@/app/firebase';
import { collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { bottleCount, uid } = await req.json();

    // Validasi input
    if (typeof bottleCount !== 'number' || bottleCount < 0) {
      return new NextResponse(
        JSON.stringify({
          error: 'Invalid bottle count. Must be a non-negative number.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const points = bottleCount * 50;
    const rvmCollection = collection(db, 'rvm-bottle-data');
    const documentRef = doc(rvmCollection, uid || `data-${Date.now()}`);

    // Ambil data yang ada (jika ada)
    const existingDoc = await getDoc(documentRef);
    const existingData = existingDoc.exists() ? existingDoc.data() : {};

    // Gabungkan data baru dengan data lama (jika ada)
    const bottleData = {
      bottleCount: bottleCount + (existingData.bottleCount || 0),
      points: points + (existingData.points || 0),
      timestamp: new Date().toISOString(),
    };

    // Simpan data
    await setDoc(documentRef, bottleData, { merge: true });

    return new NextResponse(
      JSON.stringify({
        message: 'Bottle data successfully recorded.',
        bottleData,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: 'Failed to save bottle data. Please check server logs.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function GET() {
  try {
    // Ambil referensi koleksi
    const rvmCollection = collection(db, 'rvm-bottle-data');

    // Query untuk mengambil dokumen terbaru
    const latestDocQuery = query(
      rvmCollection,
      orderBy('timestamp', 'desc'),
      limit(1)
    );

    // Jalankan query
    const querySnapshot = await getDocs(latestDocQuery);

    // Cek apakah ada dokumen
    if (querySnapshot.empty) {
      return new NextResponse(
        JSON.stringify({ error: 'No data found in the collection.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Ambil data dari dokumen terbaru
    const latestDoc = querySnapshot.docs[0];
    const bottleData = latestDoc.data();

    return new NextResponse(JSON.stringify({ uid: latestDoc.id, bottleData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching the latest bottle data:', error);

    // Return error response with the error message
    return new NextResponse(
      JSON.stringify({
        error: `Failed to fetch the latest bottle data. Error: ${error.message}`,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

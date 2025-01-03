import { db } from '@/app/firebase';
import {
  collection,
  setDoc,
  doc,
  getDocs,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';

export async function POST(req) {
  try {
    const data = await req.json();
    const { markers } = data;
    if (!Array.isArray(markers)) {
      return new Response(
        JSON.stringify({
          error: 'Invalid data format. Expected an array of markers.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const rvmCollection = collection(db, 'rvm-locations');
    const savedMarkers = [];

    for (const marker of markers) {
      const { id, name, position, capacity } = marker;
      if (!id || !name || !position || capacity === undefined) {
        return new Response(
          JSON.stringify({
            error: 'Each marker must include id, name, and position.',
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      if (typeof capacity != 'number' || capacity < 0 || capacity > 100) {
        return new Response(
          JSON.stringify({
            error: 'Capacity must be a number between 0 and 100.',
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const capacityStatus =
        capacity >= 90 ? 'full' : capacity >= 50 ? 'almost-full' : 'not-full';

      const markerData = {
        id: id,
        name: name,
        capacity: marker,
        capacityStatus,
        position: position,
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(rvmCollection, `rvm-${marker.id}`), markerData);
      savedMarkers.push(markerData);
    }

    return new Response(
      JSON.stringify({
        message: 'RVM data successfully saved to Firestore.',
        savedMarkers,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error saving data:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to save data. Please check the server logs.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
export async function GET(req) {
  try {
    const rvmCollection = collection(db, 'rvm-locations');
    const snapshot = await getDocs(rvmCollection);

    const locations = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: data.id,
        name: data.name,
        capacity: data.capacity,
        capacityStatus: data.capacityStatus,
        position: data.position,
        image: data.image,
        createdAt: data.createdAt,
      };
    });

    return new Response(JSON.stringify({ locations }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching RVM locations:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch RVM locations' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// delete by id rvm
export async function DELETEBYID(req) {
  try {
    const { id } = await req.json();
    if (!id) {
      return new Response(
        JSON.stringify({ error: 'ID is required to delete a marker.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const markerDoc = doc(db, 'rvm-locations', `rvm-${id}`);
    const markerSnapshot = await getDoc(markerDoc);

    if (!markerSnapshot.exists()) {
      return new Response(
        JSON.stringify({ error: 'Marker with this ID does not exists' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await deleteDoc(markerDoc);

    return new Response(
      JSON.stringify({
        message: `RVM location with ID ${id} successfully deleted`,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error deleting RVM location:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to delete RVM location' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// delete all rvm
export async function DELETE(req) {
  try {
    const rvmCollection = collection(db, 'rvm-locations');
    const snapshot = await getDocs(rvmCollection);

    const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    return new Response(
      JSON.stringify({ message: 'All RVM locations successfully deleted.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error deleting RVM locations:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to delete RVM locations' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

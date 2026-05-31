# News Management API

## Overview

News sekarang sudah dinamis dan diambil dari Supabase database. Kedua aplikasi (WEB_RVM dan WEB_RVM_ADMIN) menggunakan database yang sama.

## API Endpoints

### 1. GET All News

**URL:** `/api/news`
**Method:** GET
**Response:**

```json
[
  {
    "id": "uuid",
    "title": "Judul Berita",
    "content": "Isi berita...",
    "imageUrl": "https://...",
    "category": "Kategori",
    "isPublished": true,
    "publishedAt": "2024-02-28T10:00:00Z",
    "createdBy": "admin-id",
    "createdAt": "2024-02-28T09:00:00Z",
    "updatedAt": "2024-02-28T10:00:00Z"
  }
]
```

### 2. GET Single News by ID

**URL:** `/api/news?id={newsId}`
**Method:** GET
**Response:** Single news object

### 3. CREATE News

**URL:** `/api/news`
**Method:** POST
**Body:**

```json
{
  "title": "Judul Berita",
  "content": "Isi berita lengkap...",
  "imageUrl": "https://...",
  "category": "Kategori",
  "createdBy": "admin-id",
  "isPublished": false
}
```

### 4. UPDATE News

**URL:** `/api/news`
**Method:** PUT
**Body:**

```json
{
  "id": "news-uuid",
  "title": "Judul Berita Baru",
  "content": "Isi berita baru...",
  "imageUrl": "https://...",
  "category": "Kategori",
  "isPublished": true
}
```

### 5. DELETE News

**URL:** `/api/news?id={newsId}`
**Method:** DELETE
**Response:**

```json
{
  "message": "News deleted successfully"
}
```

## Frontend Usage Example

### Create News Component

```javascript
import { useState } from 'react';

export default function CreateNewsForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: e.target.title.value,
          content: e.target.content.value,
          imageUrl: e.target.imageUrl.value,
          category: e.target.category.value,
          createdBy: currentUserId,
          isPublished: e.target.isPublished.checked,
        }),
      });

      if (response.ok) {
        alert('Berita berhasil dibuat!');
        e.target.reset();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal membuat berita');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Judul" required />
      <textarea name="content" placeholder="Isi berita" required />
      <input type="url" name="imageUrl" placeholder="URL gambar" />
      <input type="text" name="category" placeholder="Kategori" required />
      <label>
        <input type="checkbox" name="isPublished" />
        Publish sekarang
      </label>
      <button type="submit" disabled={loading}>
        {loading ? 'Menyimpan...' : 'Simpan'}
      </button>
    </form>
  );
}
```

### Display News List (User)

Already implemented in:

- `/src/app/news/page.js` - Shows all published news
- `/src/app/view-news/page.js` - Shows news detail by ID

### Date Formatting

Menggunakan utility `getRelativeTime()` dari `@/utils/dateFormatter.js`:

- "Baru saja" - kurang dari 1 menit
- "X menit yang lalu" - kurang dari 1 jam
- "X jam yang lalu" - kurang dari 24 jam
- "Kemarin" - 1 hari lalu
- "X hari yang lalu" - kurang dari 7 hari
- "X minggu yang lalu" - kurang dari 4 minggu
- Format tanggal normal untuk yang lebih lama

## Database Schema

```prisma
model News {
  id          String    @id @default(uuid())
  title       String
  content     String    @db.Text
  imageUrl    String?
  category    String
  isPublished Boolean   @default(false)
  publishedAt DateTime?
  createdBy   String
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@map("news")
}
```

## Notes

- Database shared antara WEB_RVM dan WEB_RVM_ADMIN
- News hanya ditampilkan di user app jika `isPublished = true`
- Admin bisa melihat semua news (published dan unpublished)
- Waktu ditampilkan dalam bahasa Indonesia dengan relative time

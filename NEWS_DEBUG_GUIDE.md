# News Debug Guide

## Masalah: News tidak tampil di user app meskipun sudah di-upload

### Step 1: Cek Semua Data via Debug API

Buka browser dan akses:

```
http://localhost:3000/api/news-debug
```

Response akan menunjukkan:

- Total berita di database
- Jumlah published vs unpublished
- Detail semua berita

### Step 2: Cek Server Console Logs

Saat halaman `/news` di-load, cek console server untuk debug logs:

```
DEBUG - All news count: X
DEBUG - All news: [...]
DEBUG - Published news count: Y
```

Jika count = 0, berarti:

- Data tidak tersimpan di database, atau
- Ada error query Prisma

### Step 3: Cek Status Publish

Jika di debug API terlihat `isPublished: false`, news tidak akan tampil di user app.

**Solusi 1: Publish via API**

```bash
curl -X POST http://localhost:3000/api/news-publish \
  -H "Content-Type: application/json" \
  -d '{
    "id": "news-id-dari-debug-api",
    "isPublished": true
  }'
```

**Solusi 2: Publish via Supabase UI**

1. Buka Supabase Dashboard
2. Pilih table `news`
3. Update record: `isPublished = true`
4. Pastikan `publishedAt` tidak null (set ke current time)

### Step 4: Verify Data Structure

Pastikan data di database memiliki field:

- `id` (uuid)
- `title` (tidak kosong)
- `content` (tidak kosong)
- `imageUrl` (bisa kosong)
- `category` (tidak kosong)
- `isPublished` (true)
- `publishedAt` (datetime, tidak null)
- `createdBy` (admin id)

### Step 5: Clear Cache & Restart

Jika sudah fix:

```bash
# Clear .next cache
rm -r .next

# Restart server
npm run dev
```

## API Endpoints untuk Debug

### 1. Get All News (Published Only)

```
GET /api/news
```

### 2. Get All News with Debug Info (Published + Unpublished)

```
GET /api/news-debug
```

### 3. Get Specific News by ID

```
GET /api/news?id={newsId}
```

### 4. Publish/Unpublish News

```
POST /api/news-publish
Body: {
  "id": "news-uuid",
  "isPublished": true/false
}
```

### 5. Create News (Admin)

```
POST /api/news
Body: {
  "title": "Judul",
  "content": "Isi",
  "imageUrl": "url",
  "category": "Kategori",
  "createdBy": "admin-id",
  "isPublished": true
}
```

## Common Issues

### ❌ "Tidak ada berita saat ini" padahal ada data

**Cause:** `isPublished = false` atau `publishedAt` = null
**Fix:** Publish via API atau Supabase UI

### ❌ Total berita = 0 di debug API

**Cause:** Data tidak tersimpan atau connection error
**Fix:** Cek apakah form submit berhasil, cek Supabase connection

### ❌ Image tidak tampil

**Cause:** ImageUrl invalid atau CORS issue
**Fix:** Cek URL image di browser, pastikan accessible

### ❌ Error di console: "Error fetching news"

**Cause:** Database connection error atau schema mismatch
**Fix:** Cek DATABASE_URL di .env, cek Prisma schema

## Next Steps

Setelah publish news:

1. Reload halaman `/news`
2. Data seharusnya tampil
3. Klik "Selengkapnya" untuk lihat detail

Jika masih tidak tampil, collect logs dari:

- Browser console
- Server console
- `/api/news-debug` response
- Supabase table view

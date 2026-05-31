# News Testing Steps

## ✅ Error sudah di-fix!

Hapus error: "Event handlers cannot be passed to Client Component props"

## 🧪 Cara Test:

### Step 1: Cek Data di Database

Buka di browser:

```
http://localhost:3000/api/news-debug
```

Akan menampilkan semua data news (published & unpublished) dengan detail lengkap.

### Step 2: Lihat Server Console Logs

Saat akses `/news` page, perhatikan server console:

```
[NEWS SERVICE] Total news in DB: 1
[NEWS SERVICE] First news: {
  id: '...',
  title: 'Sinar Mas Resmikan...',
  isPublished: false,
  publishedAt: null
}
[NEWS PAGE] Rendered with 1 news items
```

### Step 3: Publish News jika Belum

Jika `isPublished: false`, news tidak akan tampil di production nanti. Untuk sekarang return semua data (untuk testing).

**Publish via API:**

```bash
curl -X POST http://localhost:3000/api/news-publish \
  -H "Content-Type: application/json" \
  -d '{
    "id": "COPY-ID-DARI-DEBUG-API",
    "isPublished": true
  }'
```

### Step 4: Buka Halaman News

```
http://localhost:3000/news
```

Data seharusnya tampil. Jika tidak tampil:

1. Cek console logs (Step 2)
2. Cek `/api/news-debug` response (Step 1)
3. Lihat browser console untuk errors

### Step 5: Klik Detail News

Klik "Selengkapnya" untuk lihat detail berita di halaman `/view-news?id={newsId}`

## 📊 Struktur Data

Data news di database harus memiliki:

```json
{
  "id": "uuid-string",
  "title": "Judul Berita",
  "content": "Isi berita...",
  "imageUrl": "https://...",
  "category": "Kategori",
  "isPublished": true,
  "publishedAt": "2026-05-30T10:00:00Z",
  "createdBy": "admin-uuid",
  "createdAt": "2026-05-30T09:00:00Z",
  "updatedAt": "2026-05-30T09:00:00Z"
}
```

## 🔧 Quick Checklist

- [ ] Data ada di database (`/api/news-debug`)
- [ ] Server logs menunjukkan data di-fetch
- [ ] Halaman `/news` render tanpa error
- [ ] News items tampil di halaman
- [ ] Klik detail news berhasil

## 🆘 Troubleshooting

| Issue                                   | Solusi                                            |
| --------------------------------------- | ------------------------------------------------- |
| "Tidak ada berita saat ini"             | Cek `/api/news-debug` - apakah ada data?          |
| News ada di debug API tapi tidak tampil | Check `isPublished` status, refresh page          |
| Image tidak tampil                      | Cek URL image di browser, pastikan accessible     |
| Server error                            | Cek database connection di `.env`, restart server |
| Console error                           | Cek server console logs                           |

## 📝 Notes

- Untuk development: return semua news (tidak filter published)
- Untuk production: filter hanya published news
- Relative time formatter: Bahasa Indonesia
- Database shared: WEB_RVM dan WEB_RVM_ADMIN

Ready untuk test! 🚀

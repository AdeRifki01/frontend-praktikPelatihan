# Frontend Siswa - React.js (Vite)

Aplikasi antarmuka web modern (*Frontend*) untuk pengelolaan **Data Siswa** (CRUD) yang dibangun menggunakan **React.js (Vite)** dan terhubung ke backend Express.js serta PostgreSQL.

## 📌 Fitur Utama
- **Menampilkan Data Siswa**: Tabel responsif menampilkan Kode Siswa, Nama Siswa, Tanggal Siswa, Jurusan Siswa, dan Alamat Siswa.
- **Tambah Data Siswa**: Modal formulir untuk menginput siswa baru dengan validasi field.
- **Edit / Update Data Siswa**: Modal edit untuk mengubah informasi siswa.
- **Hapus Data Siswa**: Fitur hapus data siswa dilengkapi dengan modal konfirmasi keamanan.
- **Pencarian Real-Time**: Fitur pencarian berdasarkan Nama, Kode Siswa, atau Jurusan.
- **Filter Jurusan**: Memfilter tampilan data berdasarkan jurusan siswa.
- **Notifikasi Toast**: Memberikan respons visual (sukses/gagal) pada setiap operasi CRUD.

---

## 🛠️ Persyaratan Sistem
- Node.js (v18 atau lebih baru)
- Backend `backend-siswa` berjalan di `http://localhost:5000`

---

## 🚀 Panduan Menjalankan

1. **Instal Dependensi:**
   ```bash
   npm install
   ```

2. **Jalankan Server Development:**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173`.

3. **Build untuk Produksi:**
   ```bash
   npm run build
   ```

---

## 🔗 Endpoint Backend yang Digunakan

| Aksi | Method | URL |
| :--- | :--- | :--- |
| Ambil semua siswa | `GET` | `http://localhost:5000/api/siswa` |
| Cari siswa | `GET` | `http://localhost:5000/api/siswa?search={keyword}` |
| Tambah siswa | `POST` | `http://localhost:5000/api/siswa` |
| Edit siswa | `PUT` | `http://localhost:5000/api/siswa/:id` |
| Hapus siswa | `DELETE` | `http://localhost:5000/api/siswa/:id` |

import React from 'react';
import { Edit2, Trash2, Calendar, MapPin, Tag } from 'lucide-react';

export default function SiswaTable({ siswaList, loading, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="table-loading">
        <div className="spinner"></div>
        <p>Memuat data siswa...</p>
      </div>
    );
  }

  if (siswaList.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-title">Belum ada data siswa</p>
        <p className="empty-subtitle">Silakan klik tombol "Tambah Siswa" untuk menambahkan data baru.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="custom-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Kode Siswa</th>
            <th>Nama Siswa</th>
            <th>Tgl Siswa</th>
            <th>Jurusan Siswa</th>
            <th>Alamat Siswa</th>
            <th className="text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {siswaList.map((item, index) => (
            <tr key={item.id}>
              <td className="text-muted">{index + 1}</td>
              <td>
                <span className="badge badge-kode">{item.kode_siswa}</span>
              </td>
              <td className="font-semibold text-primary-dark">{item.nama_siswa}</td>
              <td>
                <span className="inline-flex-item text-muted">
                  <Calendar size={14} />
                  <span>{formatDate(item.tgl_siswa)}</span>
                </span>
              </td>
              <td>
                <span className="badge badge-jurusan">
                  <Tag size={12} />
                  <span>{item.jurusan_siswa}</span>
                </span>
              </td>
              <td className="text-muted alamat-cell">
                <span className="inline-flex-item">
                  <MapPin size={14} />
                  <span>{item.alamat_siswa}</span>
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    className="btn-action btn-action-edit"
                    title="Edit Data"
                    onClick={() => onEdit(item)}
                  >
                    <Edit2 size={15} />
                    <span>Edit</span>
                  </button>
                  <button
                    className="btn-action btn-action-delete"
                    title="Hapus Data"
                    onClick={() => onDelete(item)}
                  >
                    <Trash2 size={15} />
                    <span>Hapus</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

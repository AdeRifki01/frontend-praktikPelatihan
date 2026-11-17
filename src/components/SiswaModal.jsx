import React, { useState, useEffect } from 'react';
import { X, Save, AlertTriangle } from 'lucide-react';

const JURUSAN_OPTIONS = [
  'Rekayasa Perangkat Lunak',
  'Teknik Komputer dan Jaringan',
  'Multimedia',
  'Sistem Informasi Jaringan & Aplikasi',
  'Teknik Otomasi Industri',
  'Akuntansi dan Keuangan',
  'Manajemen Perkantoran',
];

export default function SiswaModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    kode_siswa: '',
    nama_siswa: '',
    alamat_siswa: '',
    tgl_siswa: '',
    jurusan_siswa: '',
  });

  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      // Format tgl_siswa to YYYY-MM-DD for date input
      let formattedDate = '';
      if (initialData.tgl_siswa) {
        formattedDate = initialData.tgl_siswa.split('T')[0];
      }
      setFormData({
        kode_siswa: initialData.kode_siswa || '',
        nama_siswa: initialData.nama_siswa || '',
        alamat_siswa: initialData.alamat_siswa || '',
        tgl_siswa: formattedDate,
        jurusan_siswa: initialData.jurusan_siswa || '',
      });
    } else {
      setFormData({
        kode_siswa: '',
        nama_siswa: '',
        alamat_siswa: '',
        tgl_siswa: '',
        jurusan_siswa: '',
      });
    }
    setFormError('');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validasi sederhana
    if (
      !formData.kode_siswa.trim() ||
      !formData.nama_siswa.trim() ||
      !formData.alamat_siswa.trim() ||
      !formData.tgl_siswa ||
      !formData.jurusan_siswa.trim()
    ) {
      setFormError('Harap lengkapi semua field yang wajib diisi.');
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan data');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{initialData ? '✏️ Edit Data Siswa' : '➕ Tambah Data Siswa'}</h3>
          <button className="btn-icon-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {formError && (
          <div className="form-error-banner">
            <AlertTriangle size={18} />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="kode_siswa">
              Kode Siswa <span className="text-red">*</span>
            </label>
            <input
              id="kode_siswa"
              type="text"
              name="kode_siswa"
              value={formData.kode_siswa}
              onChange={handleChange}
              placeholder="Contoh: SIS-001"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nama_siswa">
              Nama Siswa <span className="text-red">*</span>
            </label>
            <input
              id="nama_siswa"
              type="text"
              name="nama_siswa"
              value={formData.nama_siswa}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap siswa"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="tgl_siswa">
                Tgl Siswa <span className="text-red">*</span>
              </label>
              <input
                id="tgl_siswa"
                type="date"
                name="tgl_siswa"
                value={formData.tgl_siswa}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group flex-1">
              <label htmlFor="jurusan_siswa">
                Jurusan Siswa <span className="text-red">*</span>
              </label>
              <select
                id="jurusan_siswa"
                name="jurusan_siswa"
                value={formData.jurusan_siswa}
                onChange={handleChange}
                required
              >
                <option value="">-- Pilih Jurusan --</option>
                {JURUSAN_OPTIONS.map((jurusan) => (
                  <option key={jurusan} value={jurusan}>
                    {jurusan}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="alamat_siswa">
              Alamat Siswa <span className="text-red">*</span>
            </label>
            <textarea
              id="alamat_siswa"
              name="alamat_siswa"
              rows={3}
              value={formData.alamat_siswa}
              onChange={handleChange}
              placeholder="Masukkan alamat lengkap siswa"
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              <Save size={16} />
              <span>{submitting ? 'Menyimpan...' : initialData ? 'Simpan Perubahan' : 'Tambah Siswa'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

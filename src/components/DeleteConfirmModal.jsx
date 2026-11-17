import React from 'react';
import { AlertCircle, Trash2, X } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, siswa, loading }) {
  if (!isOpen || !siswa) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card modal-delete" onClick={(e) => e.stopPropagation()}>
        <div className="modal-delete-icon-wrapper">
          <AlertCircle size={36} className="text-red" />
        </div>

        <h3 className="modal-delete-title">Konfirmasi Hapus Data</h3>
        <p className="modal-delete-desc">
          Apakah Anda yakin ingin menghapus siswa <strong>{siswa.nama_siswa}</strong> ({siswa.kode_siswa})? Tindakan ini tidak dapat dibatalkan.
        </p>

        <div className="modal-actions justify-center">
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
            Batal
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onConfirm(siswa.id)}
            disabled={loading}
          >
            <Trash2 size={16} />
            <span>{loading ? 'Menghapus...' : 'Ya, Hapus Data'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

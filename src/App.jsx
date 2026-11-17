import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import SiswaTable from './components/SiswaTable';
import SiswaModal from './components/SiswaModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import { fetchSiswa, createSiswa, updateSiswa, deleteSiswa } from './services/api';
import { Plus, Search, RefreshCw, Users, BookOpen, UserCheck, Filter } from 'lucide-react';
import './App.css';

export default function App() {
  const [siswaList, setSiswaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterJurusan, setFilterJurusan] = useState('Semua');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSiswa, setSelectedSiswa] = useState(null);

  // Delete Confirm Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [siswaToDelete, setSiswaToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const loadData = async (query = '') => {
    try {
      setLoading(true);
      const data = await fetchSiswa(query);
      setSiswaList(data);
    } catch (err) {
      showToast(err.message || 'Gagal memuat data dari server backend', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadData(searchTerm);
  };

  const handleOpenAdd = () => {
    setSelectedSiswa(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (siswa) => {
    setSelectedSiswa(siswa);
    setModalOpen(true);
  };

  const handleOpenDelete = (siswa) => {
    setSiswaToDelete(siswa);
    setDeleteModalOpen(true);
  };

  const handleSubmitForm = async (formData) => {
    if (selectedSiswa) {
      // Update
      const res = await updateSiswa(selectedSiswa.id, formData);
      showToast(res.message || 'Data siswa berhasil diperbarui!');
    } else {
      // Create
      const res = await createSiswa(formData);
      showToast(res.message || 'Data siswa baru berhasil ditambahkan!');
    }
    loadData(searchTerm);
  };

  const handleConfirmDelete = async (id) => {
    try {
      setDeleting(true);
      const res = await deleteSiswa(id);
      showToast(res.message || 'Data siswa berhasil dihapus!');
      setDeleteModalOpen(false);
      setSiswaToDelete(null);
      loadData(searchTerm);
    } catch (err) {
      showToast(err.message || 'Gagal menghapus data siswa', 'error');
    } finally {
      setDeleting(false);
    }
  };

  // Extract unique jurusan for filter
  const jurusanList = useMemo(() => {
    const set = new Set(siswaList.map((s) => s.jurusan_siswa).filter(Boolean));
    return ['Semua', ...Array.from(set)];
  }, [siswaList]);

  // Filtered by jurusan in frontend
  const filteredList = useMemo(() => {
    if (filterJurusan === 'Semua') return siswaList;
    return siswaList.filter((s) => s.jurusan_siswa === filterJurusan);
  }, [siswaList, filterJurusan]);

  return (
    <div className="app-layout">
      <Navbar />

      <Toast toast={toast} onClose={() => setToast(null)} />

      <main className="main-content">
        {/* Top Summary Widgets */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon stat-icon-blue">
              <Users size={24} />
            </div>
            <div>
              <p className="stat-label">Total Siswa Terdaftar</p>
              <h2 className="stat-number">{siswaList.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-icon-green">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="stat-label">Jumlah Jurusan Aktif</p>
              <h2 className="stat-number">{jurusanList.length > 1 ? jurusanList.length - 1 : 0}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-icon-purple">
              <UserCheck size={24} />
            </div>
            <div>
              <p className="stat-label">Data Ditampilkan</p>
              <h2 className="stat-number">{filteredList.length}</h2>
            </div>
          </div>
        </section>

        {/* Data Card Section */}
        <div className="content-card">
          {/* Card Header & Controls */}
          <div className="card-header-bar">
            <div>
              <h2 className="card-title">Daftar Data Siswa</h2>
              <p className="card-subtitle">Kelola informasi data siswa sekolah secara real-time</p>
            </div>

            <button className="btn btn-primary" onClick={handleOpenAdd}>
              <Plus size={18} />
              <span>Tambah Siswa</span>
            </button>
          </div>

          {/* Filter & Search Bar */}
          <div className="filter-bar">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <div className="search-input-wrapper">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama, kode, atau jurusan..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-input"
                />
              </div>
              <button type="submit" className="btn btn-secondary">
                Cari
              </button>
            </form>

            <div className="filter-controls">
              <div className="select-wrapper">
                <Filter size={16} className="select-icon" />
                <select
                  value={filterJurusan}
                  onChange={(e) => setFilterJurusan(e.target.value)}
                  className="filter-select"
                >
                  {jurusanList.map((jur) => (
                    <option key={jur} value={jur}>
                      {jur === 'Semua' ? 'Semua Jurusan' : jur}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="btn btn-icon-only"
                title="Muat Ulang Data"
                onClick={() => {
                  setSearchTerm('');
                  setFilterJurusan('Semua');
                  loadData('');
                }}
              >
                <RefreshCw size={18} className={loading ? 'spin-icon' : ''} />
              </button>
            </div>
          </div>

          {/* Table */}
          <SiswaTable
            siswaList={filteredList}
            loading={loading}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Tugas Praktik Singkat - FullStack Web Developer (Node.js Express + React.js + PostgreSQL)</p>
      </footer>

      {/* Modals */}
      <SiswaModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitForm}
        initialData={selectedSiswa}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        siswa={siswaToDelete}
        loading={deleting}
      />
    </div>
  );
}

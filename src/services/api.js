const API_BASE_URL = 'http://localhost:5000/api/siswa';

export const fetchSiswa = async (search = '') => {
  const url = search ? `${API_BASE_URL}?search=${encodeURIComponent(search)}` : API_BASE_URL;
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Gagal memuat data siswa');
  }
  return data.data;
};

export const createSiswa = async (siswaData) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(siswaData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Gagal menambahkan data siswa');
  }
  return data;
};

export const updateSiswa = async (id, siswaData) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(siswaData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Gagal memperbarui data siswa');
  }
  return data;
};

export const deleteSiswa = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Gagal menghapus data siswa');
  }
  return data;
};

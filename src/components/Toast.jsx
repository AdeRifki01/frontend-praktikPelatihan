import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div className={`toast-container ${isSuccess ? 'toast-success' : 'toast-error'}`}>
      <div className="toast-content">
        {isSuccess ? (
          <CheckCircle2 size={20} className="toast-icon" />
        ) : (
          <AlertCircle size={20} className="toast-icon" />
        )}
        <span className="toast-message">{toast.message}</span>
      </div>
      <button onClick={onClose} className="toast-close" title="Tutup">
        <X size={16} />
      </button>
    </div>
  );
}

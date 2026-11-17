import React from 'react';
import { GraduationCap, Database, Code } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="main-navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="navbar-logo">
            <GraduationCap size={28} />
          </div>
          <div>
            <h1 className="navbar-title">Sistem Informasi Siswa</h1>
            <p className="navbar-subtitle">FullStack CRUD Node.js (Express) & React.js</p>
          </div>
        </div>

        <div className="navbar-badges">
          <span className="tech-badge">
            <Code size={14} /> Express.js + React.js
          </span>
          <span className="tech-badge">
            <Database size={14} /> PostgreSQL
          </span>
        </div>
      </div>
    </header>
  );
}

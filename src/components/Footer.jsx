import React from 'react';
import { Wand2, Github, Heart, Shield } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer style={{
      background: 'rgba(4, 7, 17, 0.95)',
      borderTop: '1px solid var(--border)',
      padding: '3rem 1.5rem 2rem 1.5rem',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2rem',
          marginBottom: '2.5rem'
        }}>
          {/* Brand Info */}
          <div>
            <div className="logo" style={{ marginBottom: '1rem' }}>
              <div className="logo-icon">
                <Wand2 size={20} />
              </div>
              <span>Cyber <span className="text-cyan glow-cyan">Wizard</span></span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Comprehensive portal for computer technicians and IT students covering hardware architecture, software download tools, network diagnostics, and CLI cheatsheets.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--cyan)' }}>Quick Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
              <li>
                <button onClick={() => setActiveTab('fundamentals')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  Computer Fundamentals
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('software')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  Software Download Hub
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('commands')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  CLI Cheatsheet
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('wizard')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  Tech Diagnostic Troubleshooter
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('quiz')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  Tech Knowledge Quiz
                </button>
              </li>
            </ul>
          </div>


        </div>

        <div style={{
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justify: 'space-between',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-dim)'
        }}>
          <div>
            &copy; {new Date().getFullYear()} Cyber Wizard. Designed for Computer Technicians & IT Students.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>Built with</span>
            <Heart size={14} className="text-pink" fill="var(--pink)" />
            <span>& React + Vite</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

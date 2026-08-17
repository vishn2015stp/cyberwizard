import React from 'react';
import { Wand2, Download, BookOpen, Terminal, Sparkles, Shield, Cpu, Zap } from 'lucide-react';

export default function Hero({ setActiveTab }) {
  return (
    <section className="glass-card" style={{ padding: '3rem 2rem', marginBottom: '2.5rem', position: 'relative', overflow: 'hidden' }}>
      {/* Background Ambient Lights */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(0,243,255,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
        borderRadius: '50%'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        left: '-10%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
        borderRadius: '50%'
      }} />

      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div className="badge badge-cyan" style={{ marginBottom: '1.25rem', padding: '0.4rem 1rem' }}>
          <Sparkles size={14} />
          <span>The Ultimate Computer Technician & Student Portal</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem' }}>
          Master Computer <span className="text-cyan glow-cyan">Fundamentals</span> & Access <span className="text-purple glow-purple">Technician Tools</span>
        </h1>

        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '680px', margin: '0 auto 2rem auto' }}>
          Cyber Wizard empowers IT students, system administrators, and PC technicians with interactive computer hardware guides, diagnostic utilities, direct software downloads, and CLI cheatsheets.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <button className="btn btn-primary" onClick={() => setActiveTab('fundamentals')}>
            <BookOpen size={18} />
            <span>Explore Fundamentals</span>
          </button>
          <button className="btn btn-secondary" onClick={() => setActiveTab('software')}>
            <Download size={18} />
            <span>Download Technician Tools</span>
          </button>
          <button className="btn btn-outline" onClick={() => setActiveTab('commands')}>
            <Terminal size={18} />
            <span>CLI Cheatsheet</span>
          </button>
        </div>

        {/* Feature Highlights Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
            <Cpu className="text-cyan" size={24} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Hardware & OS</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Architecture Guides</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
            <Download className="text-purple" size={24} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Direct Software</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Verified Safe Downloads</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
            <Zap className="text-green" size={24} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Troubleshooter</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Guided Diagnostics</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
            <Shield className="text-pink" size={24} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Interactive Quiz</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Test Tech Knowledge</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
